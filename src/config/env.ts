// PEDIT Lab Environment Configuration Module
export interface EnvironmentConfig {
  appName: string;
  companyEmail: string;
  companyPhone: string;
  companyLocation: string;
}

export const envConfig: EnvironmentConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'PEDIT Lab',
  companyEmail: import.meta.env.VITE_COMPANY_EMAIL || 'hello@peditlab.com',
  companyPhone: import.meta.env.VITE_COMPANY_PHONE || '+94 (11) 234-5678',
  companyLocation: import.meta.env.VITE_COMPANY_LOCATION || 'Tech Innovation Hub, Cyber Tower 04, Colombo, Sri Lanka',
};
