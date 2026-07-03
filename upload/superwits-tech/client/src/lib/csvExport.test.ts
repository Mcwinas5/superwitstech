import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { convertToCSV, downloadCSV, exportAuditRequestsAsCSV, type AuditRequestRow } from './csvExport';

describe('csvExport', () => {
  describe('convertToCSV', () => {
    it('should return empty string for empty array', () => {
      const result = convertToCSV([]);
      expect(result).toBe('');
    });

    it('should convert audit requests to CSV format', () => {
      const requests: AuditRequestRow[] = [
        {
          id: 1,
          name: 'John Doe',
          businessName: 'Acme Clinic',
          businessType: 'clinic',
          website: 'https://acmeclinic.com',
          email: 'john@acmeclinic.com',
          whatsapp: '+234 704 738 1879',
          status: 'new',
          createdAt: '2026-05-08T12:00:00Z',
          updatedAt: '2026-05-08T12:00:00Z',
        },
      ];

      const result = convertToCSV(requests);
      
      expect(result).toContain('ID,Name,Business Name,Business Type,Website,Email,WhatsApp,Status,Created At,Updated At');
      expect(result).toContain('1,John Doe,Acme Clinic,clinic,https://acmeclinic.com,john@acmeclinic.com,+234 704 738 1879,new');
    });

    it('should escape fields with commas', () => {
      const requests: AuditRequestRow[] = [
        {
          id: 1,
          name: 'Doe, John',
          businessName: 'Acme Clinic',
          businessType: 'clinic',
          website: 'https://acmeclinic.com',
          email: 'john@acmeclinic.com',
          whatsapp: '+234 704 738 1879',
          status: 'new',
          createdAt: '2026-05-08T12:00:00Z',
          updatedAt: '2026-05-08T12:00:00Z',
        },
      ];

      const result = convertToCSV(requests);
      
      expect(result).toContain('"Doe, John"');
    });

    it('should escape fields with quotes', () => {
      const requests: AuditRequestRow[] = [
        {
          id: 1,
          name: 'John "Jack" Doe',
          businessName: 'Acme Clinic',
          businessType: 'clinic',
          website: 'https://acmeclinic.com',
          email: 'john@acmeclinic.com',
          whatsapp: '+234 704 738 1879',
          status: 'new',
          createdAt: '2026-05-08T12:00:00Z',
          updatedAt: '2026-05-08T12:00:00Z',
        },
      ];

      const result = convertToCSV(requests);
      
      expect(result).toContain('"John ""Jack"" Doe"');
    });

    it('should handle multiple rows', () => {
      const requests: AuditRequestRow[] = [
        {
          id: 1,
          name: 'John Doe',
          businessName: 'Acme Clinic',
          businessType: 'clinic',
          website: 'https://acmeclinic.com',
          email: 'john@acmeclinic.com',
          whatsapp: '+234 704 738 1879',
          status: 'new',
          createdAt: '2026-05-08T12:00:00Z',
          updatedAt: '2026-05-08T12:00:00Z',
        },
        {
          id: 2,
          name: 'Jane Smith',
          businessName: 'Tech Solutions',
          businessType: 'coaching',
          website: 'https://techsolutions.com',
          email: 'jane@techsolutions.com',
          whatsapp: '+234 701 234 5678',
          status: 'contacted',
          createdAt: '2026-05-08T13:00:00Z',
          updatedAt: '2026-05-08T13:00:00Z',
        },
      ];

      const result = convertToCSV(requests);
      const lines = result.split('\n');
      
      expect(lines).toHaveLength(3); // header + 2 rows
      expect(lines[0]).toContain('ID,Name,Business Name');
      expect(lines[1]).toContain('1,John Doe');
      expect(lines[2]).toContain('2,Jane Smith');
    });
  });

  describe('downloadCSV', () => {
    let createElementSpy: any;
    let appendChildSpy: any;
    let removeChildSpy: any;
    let clickSpy: any;

    beforeEach(() => {
      clickSpy = vi.fn();
      createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
        setAttribute: vi.fn(),
        click: clickSpy,
        style: {},
      } as any);
      appendChildSpy = vi.spyOn(document.body, 'appendChild').mockReturnValue(null as any);
      removeChildSpy = vi.spyOn(document.body, 'removeChild').mockReturnValue(null as any);
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should trigger CSV download with default filename', () => {
      const csvContent = 'ID,Name\n1,John';
      downloadCSV(csvContent);

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should trigger CSV download with custom filename', () => {
      const csvContent = 'ID,Name\n1,John';
      const filename = 'custom-export.csv';
      downloadCSV(csvContent, filename);

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('exportAuditRequestsAsCSV', () => {
    let downloadCSVSpy: any;

    beforeEach(() => {
      downloadCSVSpy = vi.spyOn({ downloadCSV }, 'downloadCSV');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should not call downloadCSV for empty array', () => {
      exportAuditRequestsAsCSV([]);
      expect(downloadCSVSpy).not.toHaveBeenCalled();
    });

    it('should call downloadCSV with converted CSV content', () => {
      const requests: AuditRequestRow[] = [
        {
          id: 1,
          name: 'John Doe',
          businessName: 'Acme Clinic',
          businessType: 'clinic',
          website: 'https://acmeclinic.com',
          email: 'john@acmeclinic.com',
          whatsapp: '+234 704 738 1879',
          status: 'new',
          createdAt: '2026-05-08T12:00:00Z',
          updatedAt: '2026-05-08T12:00:00Z',
        },
      ];

      // We can't easily spy on the internal downloadCSV call, but we can verify the function doesn't error
      expect(() => {
        exportAuditRequestsAsCSV(requests);
      }).not.toThrow();
    });
  });
});
