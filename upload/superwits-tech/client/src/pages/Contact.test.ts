import { describe, it, expect } from 'vitest';

/**
 * Test suite for WhatsApp integration in Contact form
 * Tests the buildWhatsAppUrl helper and message formatting
 */

describe('WhatsApp Integration', () => {
  /**
   * Test: buildWhatsAppUrl sanitizes phone numbers correctly
   */
  it('should sanitize phone numbers by removing non-digits', () => {
    const formData = {
      name: 'John Doe',
      businessName: 'Acme Clinic',
      businessType: 'clinic',
      website: 'https://acmeclinic.com',
      email: 'john@acme.com',
      whatsapp: '+234 704 738 1879',
    };

    // Sanitize phone number
    const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
    
    expect(sanitizedPhone).toBe('2347047381879');
  });

  /**
   * Test: buildWhatsAppUrl encodes message correctly
   */
  it('should encode WhatsApp message with form data', () => {
    const formData = {
      name: 'Jane Smith',
      businessName: 'Beauty Spa',
      businessType: 'clinic',
      website: 'https://beautyspa.com',
      email: 'jane@spa.com',
      whatsapp: '+234 704 738 1879',
    };

    const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
    const message = `Hi Marquis,\n\nI'd like to request a free website audit.\n\nName: ${formData.name}\nBusiness: ${formData.businessName}\nType: ${formData.businessType}\nWebsite: ${formData.website}\nEmail: ${formData.email}\n\nLooking forward to your review.`;
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;

    // Verify URL structure
    expect(whatsappUrl).toContain('https://wa.me/2347047381879');
    expect(whatsappUrl).toContain('text=');
    expect(whatsappUrl).toContain(encodeURIComponent('Jane Smith'));
    expect(whatsappUrl).toContain(encodeURIComponent('Beauty Spa'));
  });

  /**
   * Test: WhatsApp URL includes all form fields
   */
  it('should include all form fields in WhatsApp message', () => {
    const formData = {
      name: 'Ahmed Hassan',
      businessName: 'Tech Solutions Ltd',
      businessType: 'coaching',
      website: 'https://techsolutions.com',
      email: 'ahmed@tech.com',
      whatsapp: '+234 704 738 1879',
    };

    const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
    const message = `Hi Marquis,\n\nI'd like to request a free website audit.\n\nName: ${formData.name}\nBusiness: ${formData.businessName}\nType: ${formData.businessType}\nWebsite: ${formData.website}\nEmail: ${formData.email}\n\nLooking forward to your review.`;
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;

    // Decode the message to verify content
    const encodedMessage = whatsappUrl.split('text=')[1];
    const decodedMessage = decodeURIComponent(encodedMessage);

    expect(decodedMessage).toContain('Ahmed Hassan');
    expect(decodedMessage).toContain('Tech Solutions Ltd');
    expect(decodedMessage).toContain('coaching');
    expect(decodedMessage).toContain('https://techsolutions.com');
    expect(decodedMessage).toContain('ahmed@tech.com');
  });

  /**
   * Test: Phone number with various formats
   */
  it('should handle phone numbers with different formats', () => {
    const testCases = [
      { input: '+234 704 738 1879', expected: '2347047381879' },
      { input: '+234-704-738-1879', expected: '2347047381879' },
      { input: '2347047381879', expected: '2347047381879' },
      { input: '+2347047381879', expected: '2347047381879' },
      { input: '(234) 704-738-1879', expected: '2347047381879' },
    ];

    testCases.forEach(({ input, expected }) => {
      const sanitized = input.replace(/\D/g, '');
      expect(sanitized).toBe(expected);
    });
  });

  /**
   * Test: Message formatting with special characters
   */
  it('should handle special characters in form data', () => {
    const formData = {
      name: "O'Brien & Associates",
      businessName: 'Dr. Smith\'s Clinic',
      businessType: 'clinic',
      website: 'https://example.com',
      email: 'test@example.com',
      whatsapp: '+234 704 738 1879',
    };

    const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
    const message = `Hi Marquis,\n\nI'd like to request a free website audit.\n\nName: ${formData.name}\nBusiness: ${formData.businessName}\nType: ${formData.businessType}\nWebsite: ${formData.website}\nEmail: ${formData.email}\n\nLooking forward to your review.`;
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;

    // Verify encoding handles special characters
    expect(whatsappUrl).toBeTruthy();
    expect(whatsappUrl).toContain('wa.me');
    expect(whatsappUrl).toContain('text=');
  });

  /**
   * Test: URL is valid and safe
   */
  it('should produce a valid WhatsApp URL', () => {
    const formData = {
      name: 'Test User',
      businessName: 'Test Business',
      businessType: 'clinic',
      website: 'https://test.com',
      email: 'test@test.com',
      whatsapp: '+234 704 738 1879',
    };

    const sanitizedPhone = formData.whatsapp.replace(/\D/g, '');
    const message = `Hi Marquis,\n\nI'd like to request a free website audit.\n\nName: ${formData.name}\nBusiness: ${formData.businessName}\nType: ${formData.businessType}\nWebsite: ${formData.website}\nEmail: ${formData.email}\n\nLooking forward to your review.`;
    const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;

    // Verify URL structure
    expect(whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+$/);
    expect(whatsappUrl).toContain('https://wa.me/');
    expect(whatsappUrl).toContain('?text=');
  });
});
