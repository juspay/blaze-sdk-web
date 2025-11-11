import type { Agent as HttpAgent } from 'http';
import type { Agent as HttpsAgent } from 'https';
import type { EventEmitter } from 'events';

export type NetworkOverrides = {
  fetchOverride?: typeof fetch;
  proxyAgent?: EventEmitter | HttpAgent | HttpsAgent;
};
