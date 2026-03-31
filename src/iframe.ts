import type { CallbackFn } from './types';

let initiateQueue: Array<Record<string, unknown>> = [];
let processQueue: Array<Record<string, unknown>> = [];
let container: HTMLDivElement | null = null;
let isScriptLoaded = false;

function initiate(
  payload: Record<string, unknown>,
  callbackFn: CallbackFn,
  containerLayout: HTMLDivElement | null = null
): void {
  try {
    const existingElement = document.getElementById('breeze-script-tag');
    const script: HTMLScriptElement =
      existingElement instanceof HTMLScriptElement
        ? existingElement
        : document.createElement('script');
    script.type = 'module';
    script.id = 'breeze-script-tag';
    script.async = true;

    initiateQueue.push(payload);

    const payloadData: Record<string, unknown> =
      isJSON(payload) && isJSON(payload.payload) ? payload.payload : {};

    const merchantId = typeof payloadData.merchantId === 'string' ? payloadData.merchantId : null;
    const shopUrl = typeof payloadData.shopUrl === 'string' ? payloadData.shopUrl : null;
    const shopId = typeof payloadData.shopId === 'string' ? payloadData.shopId : null;
    const platform = typeof payloadData.platform === 'string' ? payloadData.platform : null;

    let environment: string;
    let scriptSrc: string;

    switch (payloadData.environment) {
      case 'smbBeta':
      case 'smbRelease':
        scriptSrc = 'https://sdk.breezesdk.store/electron/232.0.0/index.js';
        environment = payloadData.environment === 'smbBeta' ? 'beta' : 'release';
        break;
      default:
        scriptSrc = 'https://sdk.breeze.in/electron/232.0.0/index.js';
        environment = payloadData.environment === 'beta' ? 'beta' : 'release';
        break;
    }
    script.src = scriptSrc;

    if (merchantId !== null) {
      script.setAttribute('data-merchantid', merchantId);
    }

    if (shopUrl !== null) {
      script.setAttribute('data-shopurl', shopUrl);
    }

    if (shopId !== null) {
      script.setAttribute('data-shopid', shopId);
    }

    if (platform !== null) {
      script.setAttribute('data-platform', platform);
    }

    script.setAttribute('data-environment', environment);
    script.setAttribute('data-disable-overlay-events', 'true');
    script.onload = () => {
      try {
        const hiddenElement = document.createElement('breeze-button');
        hiddenElement.style.display = 'none';
        document.body.appendChild(hiddenElement);
        drainQueue(callbackFn);
        isScriptLoaded = true;
      } catch (e) {
        console.error('Error creating Breeze button', e);
      }
    };

    container = containerLayout;

    if (isScriptLoaded) {
      drainQueue(callbackFn);
    }

    if (!(existingElement instanceof HTMLScriptElement)) {
      document.body.appendChild(script);
    }
  } catch {}
}

function process(payload: Record<string, unknown>): void {
  if (typeof window.BlazeSDK === 'object' && typeof window.BlazeSDK.process === 'function') {
    window.BlazeSDK.process(payload);
  } else {
    processQueue.push(payload);
  }
}

function terminate(): void {
  if (typeof window.BlazeSDK === 'object' && typeof window.BlazeSDK.terminate === 'function') {
    window.BlazeSDK.terminate();
  }

  initiateQueue = [];
  processQueue = [];
  container = null;
}

function drainQueue(callbackFn: CallbackFn): boolean {
  const isSDKLoaded =
    typeof window.BlazeSDK === 'object' &&
    typeof window.BlazeSDK.initiate === 'function' &&
    typeof window.BlazeSDK.process === 'function';

  if (isSDKLoaded) {
    if (initiateQueue.length > 0) {
      window.BlazeSDK.initiate(initiateQueue.at(0), callbackFn, container);
      initiateQueue = [];
    }

    if (processQueue.length > 0) {
      const processQueueData = processQueue;
      processQueue = [];
      processQueueData.forEach((payload) => {
        window.BlazeSDK.process(payload);
      });
    }
    return true;
  } else {
    let attempts = 0;
    const intervalId = setInterval(() => {
      if (attempts > 5) {
        clearInterval(intervalId);
      }
      const drainStatus = drainQueue(callbackFn);

      if (drainStatus) {
        clearInterval(intervalId);
      }
      attempts++;
    });
  }
  return false;
}

function isJSON(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export default { initiate, process, terminate };
