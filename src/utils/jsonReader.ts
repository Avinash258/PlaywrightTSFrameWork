import fs from 'fs';

export function readJsonSync<T = Record<string, unknown>>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
