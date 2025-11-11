import type { Environment } from '$generated/types';

export const environmentUrls: Record<Environment, string> = {
  beta: 'https://api.beta.breeze.in',
  release: 'https://api.breeze.in',
  smbBeta: 'https://api.beta.breezesdk.store',
  smbRelease: 'https://api.breezesdk.store'
};

export const paymentEndpoint = '/order/payment/independent/start';
