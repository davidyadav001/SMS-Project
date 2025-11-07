#!/usr/bin/env node

/**
 * Script to ensure the database container is running before starting the backend
 * This prevents the "Can't reach database server" error
 */

const { execSync } = require('child_process');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CONTAINER_NAME = 'sms_db';

function checkDockerRunning() {
  try {
    execSync('docker ps', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkContainerRunning() {
  try {
    const output = execSync(
      `docker ps --filter "name=${CONTAINER_NAME}" --format "{{.Status}}"`,
      { encoding: 'utf-8', cwd: PROJECT_ROOT }
    );
    return output.trim().includes('Up');
  } catch {
    return false;
  }
}

function checkContainerHealthy() {
  try {
    const output = execSync(
      `docker inspect --format='{{.State.Health.Status}}' ${CONTAINER_NAME} 2>/dev/null || echo "none"`,
      { encoding: 'utf-8', cwd: PROJECT_ROOT }
    );
    const status = output.trim();
    return status === 'healthy' || status === 'none'; // 'none' means no healthcheck or container doesn't exist
  } catch {
    return false;
  }
}

function startDatabase() {
  console.log('📦 Starting database container...');
  try {
    execSync('docker compose up -d db', {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
    });
    console.log('✅ Database container started');
    return true;
  } catch (error) {
    console.error('❌ Failed to start database container');
    console.error(error.message);
    return false;
  }
}

function waitForDatabase(maxAttempts = 30) {
  console.log('⏳ Waiting for database to be ready...');
  for (let i = 0; i < maxAttempts; i++) {
    if (checkContainerHealthy()) {
      // Give it a moment to fully initialize
      try {
        execSync('sleep 2', { stdio: 'ignore' });
      } catch {}
      console.log('✅ Database is ready!');
      return true;
    }
    process.stdout.write('.');
    try {
      execSync('sleep 1', { stdio: 'ignore' });
    } catch {}
  }
  console.log('\n⚠️  Database may still be starting. Continuing anyway...');
  return false;
}

function main() {
  console.log('🔍 Checking database status...\n');

  // Check if Docker is running
  if (!checkDockerRunning()) {
    console.error('❌ Docker is not running. Please start Docker and try again.');
    process.exit(1);
  }

  // Check if container exists and is running
  const isRunning = checkContainerRunning();
  
  if (!isRunning) {
    console.log('📦 Database container is not running.');
    if (!startDatabase()) {
      process.exit(1);
    }
    waitForDatabase();
  } else {
    const isHealthy = checkContainerHealthy();
    if (isHealthy) {
      console.log('✅ Database container is already running and healthy!');
    } else {
      console.log('⏳ Database container is running but may still be initializing...');
      waitForDatabase(10); // Shorter wait if already running
    }
  }

  console.log('\n🚀 Database is ready. You can now start the backend.\n');
}

if (require.main === module) {
  main();
}

module.exports = { main };

