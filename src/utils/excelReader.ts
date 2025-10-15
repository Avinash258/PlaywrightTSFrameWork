import * as XLSX from 'xlsx';

export function readExcelSheet(filePath: string, sheetName?: string): Record<string, unknown>[] {
  const workbook = XLSX.readFile(filePath);
  const sheet = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheet];
  return XLSX.utils.sheet_to_json(worksheet, { defval: '' });
}
