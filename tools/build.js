const fs = require("fs");
const execSync = require("child_process").execSync;
const prettyBytes = require("pretty-bytes");
const gzipSize = require("gzip-size");

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv)
  });

console.log("Building CommonJS modules ...");

exec("babel modules -d . --ignore __tests__", {
  BABEL_ENV: "cjs"
});

console.log("\nBuilding ES modules ...");

exec("babel modules -d es --ignore __tests__", {
  BABEL_ENV: "es"
});

console.log("\nBuilding resize-render.js ...");

exec("rollup -c -f umd -o umd/resize-render.js", {
  BABEL_ENV: "umd",
  NODE_ENV: "development"
});

console.log("\nBuilding resize-render.min.js ...");

exec("rollup -c -f umd -o umd/resize-render.min.js", {
  BABEL_ENV: "umd",
  NODE_ENV: "production"
});

const size = gzipSize.sync(fs.readFileSync("umd/resize-render.min.js"));

console.log("\ngzipped, the UMD build is %s", prettyBytes(size));

exec("npm run build-storybook")

console.log("\nbuilding react storybook documentation");
