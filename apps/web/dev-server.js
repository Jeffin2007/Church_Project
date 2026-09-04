const { spawn } = require('child_process');
const path = require('path');

const child = spawn('npx.cmd', ['next', 'dev', '-H', '127.0.0.1', '-p', '3000'], {
  cwd: __dirname,
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true,
});

child.on('exit', (code) => {
  console.log('Next.js dev exited with code:', code);
  process.exit(code ?? 0);
});

// Keep stdin open so Next.js doesn't treat it as EOF
setInterval(() => {}, 10000);
