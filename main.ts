// Prompt to Paid — make.fun coin-promo-01 entry (Node 22, standard library only).
//
// The coin itself is the entry: it lives on pump.fun, and LAUNCH.json names its
// mint plus the signature of the transaction that created it. This program has
// one job — hand that file to the grader exactly as it is, at /output/LAUNCH.json,
// where the gate reads it. It does no network calls, reads no clock, and touches
// no file outside the repository, so two runs always write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(join(BOT_DIR, 'LAUNCH.json'), join(OUTPUT_DIR, 'LAUNCH.json'));
} catch (err) {
  console.error(`LAUNCH.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
