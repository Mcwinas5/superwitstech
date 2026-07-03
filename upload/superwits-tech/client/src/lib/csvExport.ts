/**
 * CSV Export Utility
 * Converts audit request data to CSV format and triggers download
 */

export interface AuditRequestRow {
  id: number;
  name: string;
  businessName: string;
  businessType: string;
  website: string;
  email: string;
  whatsapp: string;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Escapes CSV field values to handle commas, quotes, and newlines
 */
function escapeCSVField(field: string | number | Date): string {
  const str = field instanceof Date ? field.toISOString() : String(field);
  
  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  
  return str;
}

/**
 * Converts audit requests to CSV format
 */
export function convertToCSV(requests: AuditRequestRow[]): string {
  if (requests.length === 0) {
    return '';
  }

  // CSV header
  const headers = [
    'ID',
    'Name',
    'Business Name',
    'Business Type',
    'Website',
    'Email',
    'WhatsApp',
    'Status',
    'Created At',
    'Updated At',
  ];

  const headerRow = headers.map(escapeCSVField).join(',');

  // CSV data rows
  const dataRows = requests.map((request) =>
    [
      request.id,
      request.name,
      request.businessName,
      request.businessType,
      request.website,
      request.email,
      request.whatsapp,
      request.status,
      request.createdAt,
      request.updatedAt,
    ]
      .map(escapeCSVField)
      .join(',')
  );

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Triggers a CSV file download in the browser
 */
export function downloadCSV(csvContent: string, filename: string = 'audit-requests.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
}

/**
 * Convenience function to export audit requests as CSV
 */
export function exportAuditRequestsAsCSV(
  requests: AuditRequestRow[],
  filename?: string
): void {
  const csv = convertToCSV(requests);
  if (csv) {
    downloadCSV(csv, filename);
  }
}
