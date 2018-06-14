const PROXY_CONFIG = [
  {
    context: ['/customers', '/accounts'],
    target: 'http://localhost:3000',
    secure: false
  }
];

module.exports = PROXY_CONFIG;
