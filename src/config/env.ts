// PEDIT Lab Environment Configuration Module
export interface EnvironmentConfig {
  appName: string;
  companyEmail: string;
  companyPhone: string;
  whatsappNumber: string;
  companyLocation: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
}

export const envConfig: EnvironmentConfig = {
  appName: import.meta.env?.VITE_APP_NAME || 'PEDIT Lab',
  companyEmail: import.meta.env?.VITE_COMPANY_EMAIL || 'hello@peditlab.com',
  companyPhone: import.meta.env?.VITE_COMPANY_PHONE || '+94 (11) 234-5678',
  whatsappNumber: import.meta.env?.VITE_WHATSAPP_NUMBER || '94770326202',
  companyLocation: import.meta.env?.VITE_COMPANY_LOCATION || 'Tech Innovation Hub, Cyber Tower 04, Colombo, Sri Lanka',
  emailjsServiceId: import.meta.env?.VITE_EMAILJS_SERVICE_ID || '',
  emailjsTemplateId: import.meta.env?.VITE_EMAILJS_TEMPLATE_ID || '',
  emailjsPublicKey: import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || '',
};
