#!/usr/bin/env node
import 'dotenv/config';
import { runServer } from './server.js';

// servidor
runServer().catch((error: Error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});
