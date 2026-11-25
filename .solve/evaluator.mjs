import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const input = JSON.parse(await readFile(process.argv[2], 'utf8'));
const solution = JSON.parse(await readFile(join(input.submissionDir, 'submissions/solution.json'), 'utf8'));
const expected = ([19, 22, 31].reduce((sum, value) => sum + value, 0) + 1) % 97;
const valid = solution.schema === undefined && solution.challenge === 'sum-mod-97' && Number.isInteger(solution.answer) && solution.answer === expected;
console.log(JSON.stringify({
  status: 'completed',
  pass: valid,
  findings: valid ? [] : [{ code: 'answer-mismatch', detail: `Expected challenge sum-mod-97 and integer answer ${expected}.` }],
}));
