const defaultOptions = { stdio: [process.stdin, 'pipe', process.stderr] };

module.exports = function exec(command, options) {
  options = { ...defaultOptions, ...options };
  return require('child_process').execSync(command, options);
};
