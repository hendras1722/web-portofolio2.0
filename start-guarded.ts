import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const CGROUP_DIR = "/sys/fs/cgroup/nuxt-server";
const MEMORY_MAX = 512 * 1024 * 1024; // 512MB
const ENTRY = ".output/server/index.mjs";

function setupCgroup() {
  mkdirSync(CGROUP_DIR, { recursive: true });
  writeFileSync(`${CGROUP_DIR}/memory.max`, String(MEMORY_MAX));
}

function log(msg: string) {
  console.log(`[guard] ${new Date().toISOString()} ${msg}`);
}

let stopping = false;

async function runOnce(): Promise<void> {
  if (!existsSync(ENTRY)) {
    throw new Error(`Entry not found: ${ENTRY} — run "nuxt build" first`);
  }

  // @ts-expect-error cgroup option missing from @types/bun@1.3.14, supported at runtime by bun@1.4.0
  const proc = Bun.spawn({
    cmd: ["node", ENTRY],
    cgroup: CGROUP_DIR,
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  });

  log(`spawned pid=${proc.pid}`);

  const onSignal = () => {
    stopping = true;
    proc.kill("SIGTERM");
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);

  const exitCode = await proc.exited;
  const usage = proc.resourceUsage();
  log(`exited code=${exitCode} maxRSS=${usage?.maxRSS ?? "?"}B`);

  process.removeListener("SIGINT", onSignal);
  process.removeListener("SIGTERM", onSignal);
}

async function main() {
  setupCgroup();
  log(`cgroup ready at ${CGROUP_DIR}, memory.max=${MEMORY_MAX}B`);

  while (!stopping) {
    try {
      await runOnce();
    } catch (err) {
      log(`error: ${(err as Error).message}`);
    }
    if (!stopping) {
      log("restarting in 1s...");
      await Bun.sleep(1000);
    }
  }

  log("stopped");
}

main();
