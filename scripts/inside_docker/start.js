const { spawn, spawnSync } = require("child_process");

/**
 * @typedef {import("child_process").ChildProcessWithoutNullStreams} SpawnedProcess
 */

function pipeToProcess(/** @type {SpawnedProcess} */ spawnedProcess) {
  spawnedProcess.stdout.pipe(process.stdout);
  spawnedProcess.stderr.pipe(process.stderr);
  return spawnedProcess;
}

async function convertProcessToPromise(
  /** @type {SpawnedProcess} */ spawnedProcess
) {
  return new Promise((resolve, reject) => {
    spawnedProcess.on("exit", () => void resolve());
    spawnedProcess.on("error", (err) => void reject(err.message));
  });
}

(async () => {
  const rootDir = process.cwd();

  // ionic
  console.log("switching to ionic...");
  process.chdir("ionic");
  await convertProcessToPromise(pipeToProcess(spawn("npm", ["ci"])));
  process.chdir(rootDir);

  // nestjs
  console.log("setting up nestjs...");
  process.chdir("nestjs");
  await convertProcessToPromise(pipeToProcess(spawn("npm", ["ci"])));
  await convertProcessToPromise(
    pipeToProcess(spawn("npx", ["task", "fa:checkStatus"]))
  );
  await convertProcessToPromise(
    pipeToProcess(spawn("npx", ["task", "fa:createTenant"]))
  );
  await convertProcessToPromise(
    pipeToProcess(spawn("npx", ["task", "fa:createApp"]))
  );

  console.log("starting nestjs in background for hasura...");
  const nextProc = pipeToProcess(spawn("npm", ["run", "start:dev"]));
  process.chdir(rootDir);

  // hasura
  console.log("setting up hasura...");
  process.chdir("hasura");
  await convertProcessToPromise(pipeToProcess(spawn("npm", ["ci"])));
  await convertProcessToPromise(
    pipeToProcess(spawn("npm", ["run", "migrate"]))
  );
  nextProc.kill("SIGINT");
  process.chdir(rootDir);

  // seed users
  console.log("seeding users...");
  process.chdir("nestjs");
  await convertProcessToPromise(
    pipeToProcess(spawn("npx", ["task", "fa:seedUsers"]))
  );
  process.chdir(rootDir);

  // complete
  console.log("done!\n");
  console.log("Commands to start:\n");
  console.log("Hasura: `npm start`");
  console.log("Ionic: `npm start`");
  console.log("Nestjs: `npm run start:dev`");
  process.exit();
})();
