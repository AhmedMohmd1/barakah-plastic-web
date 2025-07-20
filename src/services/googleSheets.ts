
interface FormSubmission {
  timestamp: string;
  type: 'contact' | 'quote';
  data: Record<string, any>;
}

class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private webhookUrl: string | null = null;

  private constructor() {}

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  setWebhookUrl(url: string) {
    this.webhookUrl = url;
    localStorage.setItem('googleSheetsWebhook', url);
  }

  getWebhookUrl(): string | null {
    if (!this.webhookUrl) {
      this.webhookUrl = localStorage.getItem('googleSheetsWebhook');
    }
    return this.webhookUrl;
  }

  async submitForm(submission: FormSubmission): Promise<boolean> {
    const webhook = this.getWebhookUrl();
    
    if (!webhook) {
      console.warn('No Google Sheets webhook configured');
      return false;
    }

    try {
      await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          timestamp: submission.timestamp,
          type: submission.type,
          ...submission.data,
          source: 'barakah-plastic-website'
        }),
      });

      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return false;
    }
  }

  async submitContactForm(data: {
    name: string;
    phone: string;
    email?: string;
    subject?: string;
    message: string;
  }): Promise<boolean> {
    return this.submitForm({
      timestamp: new Date().toISOString(),
      type: 'contact',
      data
    });
  }

  async submitQuoteRequest(data: {
    productName: string;
    name?: string;
    phone: string;
    note?: string;
    quantity?: string;
  }): Promise<boolean> {
    return this.submitForm({
      timestamp: new Date().toISOString(),
      type: 'quote',
      data
    });
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();
