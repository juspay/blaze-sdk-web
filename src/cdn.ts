import BlazeSDK from '.';
import type { CallbackFn } from './types';

type RecordOrString = Record<string, unknown> | string;

function initiate(payload: RecordOrString, callbackFn: CallbackFn | null): void {
  const initiatePayload: Record<string, unknown> =
    typeof payload === 'string' ? safeParseJson(payload) : payload;

  const _callbackFn: CallbackFn | null =
    typeof callbackFn === 'function'
      ? callbackFn
      : typeof window.blazeCallback === 'function'
        ? window.blazeCallback
        : null;

  if (typeof _callbackFn === 'function') {
    BlazeSDK.initiate(initiatePayload, _callbackFn);
  } else {
    let readCount = 0;

    const intervalId = setInterval(() => {
      readCount++;
      if (typeof window.blazeCallback === 'function') {
        clearInterval(intervalId);
        BlazeSDK.initiate(initiatePayload, window.blazeCallback);
      }
      if (readCount > 10) {
        clearInterval(intervalId);
      }
    }, 100);
  }
}

function process(payload: RecordOrString): void {
  const processPayload: Record<string, unknown> =
    typeof payload === 'string' ? safeParseJson(payload) : payload;
  BlazeSDK.process(processPayload);
}

function terminate(): void {
  BlazeSDK.terminate();
}

function safeParseJson(payload: string): Record<string, unknown> {
  try {
    return JSON.parse(payload);
  } catch {
    return {};
  }
}

function injectMethods(): void {
  window.BlazeSDKWeb = {
    initiate,
    process,
    terminate
  };
}

injectMethods();
