import fs from 'fs';

export function readCsvSync(filePath: string): string[][] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => line.split(','));
}
