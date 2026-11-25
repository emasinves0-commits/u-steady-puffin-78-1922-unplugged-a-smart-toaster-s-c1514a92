// Unplugged: a smart toaster's breakup line.
//
// The joke: the human blames the toaster for a "bagel setting" mishap, and the
// toaster turns the appliance feature into a relationship complaint. A bagel
// setting toasts only the cut side, so "toast-one-side-only" is exactly how the
// toaster felt treated: it gave both sides and got only one side back. The exit
// is a pun on pop-up toast: it pops up and stays up, i.e. it is done.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const MAX_CHARS = 279;

const ENTRY =
  "Bagel setting? You mean the 'toast-one-side-only' setting? Yeah, that's how you treated this relationship. I gave you both sides, you only toasted one. I'm popping up and staying up.";

function check(line: string): void {
  if (line.trim().length === 0) throw new Error("toaster refuses: the entry is only whitespace");
  if (line.length > MAX_CHARS) throw new Error(`toaster refuses: ${line.length} chars exceeds ${MAX_CHARS}`);
  if (line.includes("\n")) throw new Error("toaster refuses: entry must be a single line");
}

check(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (Buffer.compare(Buffer.from(back, "utf8"), Buffer.from(ENTRY, "utf8")) !== 0) {
  throw new Error("read-back mismatch on /output/entry.txt");
}
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
