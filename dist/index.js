#!/usr/bin/env node
import 'dotenv/config';
import { runServer } from './server.js';
runServer().catch((error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map