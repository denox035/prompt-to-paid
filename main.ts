// Prompt to Paid — make.fun coin-promo-01 entry (Node 22, standard library only).
//
// The coin itself is the entry: $PROMPT lives on pump.fun, and LAUNCH.json names
// its mint plus the signature of the transaction that created it. This program
// has one job — hand that file to the grader exactly as it is, at
// /output/LAUNCH.json, where the gate reads it. It does no network calls, reads
// no clock, and touches no file outside the repository, so two runs always
// write the same bytes. Nothing this program writes about the coin is judged.
//
// Before copying, it validates LAUNCH.json: the file must parse and name a real
// coin mint and a real create signature, not the REPLACE_WITH_* placeholders
// the skeleton shipped with — so a half-finished entry fails loudly here
// instead of handing the grader a blank.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const launchPath = join(BOT_DIR, 'LAUNCH.json');
let launch: unknown;
try {
  launch = JSON.parse(readFileSync(launchPath, 'utf8'));
} catch (err) {
  console.error(`LAUNCH.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

const mint = (launch as { mint?: unknown }).mint;
const signature = (launch as { create_signature?: unknown }).create_signature;
const looksReal = (v: unknown) => typeof v === 'string' && v.length >= 32 && !v.startsWith('REPLACE_WITH');
if (!looksReal(mint) || !looksReal(signature)) {
  console.error('LAUNCH.json is missing a real coin mint or create signature');
  process.exit(1);
}

writeFileSync(join(OUTPUT_DIR, 'LAUNCH.json'), JSON.stringify(launch, null, 2) + '\n');
