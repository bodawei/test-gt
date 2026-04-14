const assert = require('node:assert');
const { test } = require('node:test');
const app = require('./server.js');
const http = require('node:http');

function request(server, path) {
  return new Promise((resolve, reject) => {
    const addr = server.address();
    const options = {
      hostname: '127.0.0.1',
      port: addr.port,
      path,
      method: 'GET',
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('GET /health returns ok', async () => {
  const server = app.listen(0);
  try {
    const res = await request(server, '/health');
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.body, { status: 'ok' });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /version returns version', async () => {
  const server = app.listen(0);
  try {
    const res = await request(server, '/version');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof res.body.version, 'string');
    assert.ok(res.body.version.length > 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
