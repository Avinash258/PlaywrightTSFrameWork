export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  viewport: {
    width: number;
    height: number;
  };
}

export const environments = {
  dev: {
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://www.saucedemo.com/api',
    timeout: 30000,
    retries: 0,
    headless: false,
    viewport: { width: 1280, height: 720 }
  },
  staging: {
    baseUrl: 'https://staging.saucedemo.com',
    apiUrl: 'https://staging.saucedemo.com/api',
    timeout: 30000,
    retries: 1,
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  prod: {
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://www.saucedemo.com/api',
    timeout: 30000,
    retries: 2,
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  ci: {
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://www.saucedemo.com/api',
    timeout: 30000,
    retries: 2,
    headless: true,
    viewport: { width: 1280, height: 720 }
  }
} as const;

export const getEnvironment = (): EnvironmentConfig => {
  // Auto-detect CI environment
  if (process.env.CI) {
    return environments.ci;
  }
  
  const env = process.env.ENVIRONMENT || 'dev';
  return environments[env as keyof typeof environments] || environments.dev;
};
