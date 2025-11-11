import { isJSON, decodeString } from 'type-decoder';

/**
 * @type { Environment }
 * @description Available environments for the Blaze SDK
 */
export type Environment = 'beta' | 'release' | 'smbBeta' | 'smbRelease';

export function decodeEnvironment(rawInput: unknown): Environment | null {
  switch (rawInput) {
    case 'beta':
    case 'release':
    case 'smbBeta':
    case 'smbRelease':
      return rawInput;
  }
  return null;
}

export function _decodeEnvironment(rawInput: unknown): Environment | undefined {
  switch (rawInput) {
    case 'beta':
    case 'release':
    case 'smbBeta':
    case 'smbRelease':
      return rawInput;
  }
}

/**
 * @type { SDKPayload }
 */
export type SDKPayload = {
  /**
   * @description Unique request identifier
   * @type { string }
   * @memberof SDKPayload
   */
  requestId: string;
  /**
   * @description Service identifier
   * @type { string }
   * @memberof SDKPayload
   */
  service: string;
  /**
   * @description Environment
   * @type { Environment }
   * @memberof SDKPayload
   */
  environment: Environment | null;
  /**
   * @description Flexible payload for any SDK operation
   * @type { SDKPayloadPayload }
   * @memberof SDKPayload
   */
  payload: SDKPayloadPayload;
};

export function decodeSDKPayload(rawInput: unknown): SDKPayload | null {
  if (isJSON(rawInput)) {
    const decodedRequestId = decodeString(rawInput['requestId']);
    const decodedService = decodeString(rawInput['service']);
    const decodedEnvironment = decodeEnvironment(rawInput['environment']);
    const decodedPayload = decodeSDKPayloadPayload(rawInput['payload']);

    if (decodedRequestId === null || decodedService === null || decodedPayload === null) {
      return null;
    }

    return {
      requestId: decodedRequestId,
      service: decodedService,
      environment: decodedEnvironment,
      payload: decodedPayload
    };
  }
  return null;
}

/**
 * @type { SDKPayloadPayload }
 * @description Flexible payload for any SDK operation
 */
export type SDKPayloadPayload = Record<string, unknown>;

export function decodeSDKPayloadPayload(rawInput: unknown): SDKPayloadPayload | null {
  if (isJSON(rawInput)) {
    return {
      ...rawInput
    };
  }
  return null;
}

/**
 * @type { EventName }
 * @description SDK event lifecycle stages
 */
export type EventName = 'initiate' | 'process' | 'terminate';

export function decodeEventName(rawInput: unknown): EventName | null {
  switch (rawInput) {
    case 'initiate':
    case 'process':
    case 'terminate':
      return rawInput;
  }
  return null;
}

export function _decodeEventName(rawInput: unknown): EventName | undefined {
  switch (rawInput) {
    case 'initiate':
    case 'process':
    case 'terminate':
      return rawInput;
  }
}

/**
 * @type { SDKResponse }
 */
export type SDKResponse = {
  /**
   * @description Request identifier
   * @type { string }
   * @memberof SDKResponse
   */
  requestId: string;
  /**
   * @description Service identifier
   * @type { string }
   * @memberof SDKResponse
   */
  service: string;
  /**
   * @description Response payload
   * @type { SDKResponsePayload }
   * @memberof SDKResponse
   */
  payload: SDKResponsePayload;
};

export function decodeSDKResponse(rawInput: unknown): SDKResponse | null {
  if (isJSON(rawInput)) {
    const decodedRequestId = decodeString(rawInput['requestId']);
    const decodedService = decodeString(rawInput['service']);
    const decodedPayload = decodeSDKResponsePayload(rawInput['payload']);

    if (decodedRequestId === null || decodedService === null || decodedPayload === null) {
      return null;
    }

    return {
      requestId: decodedRequestId,
      service: decodedService,
      payload: decodedPayload
    };
  }
  return null;
}

/**
 * @type { SDKResponsePayload }
 * @description Response payload
 */
export type SDKResponsePayload = Record<string, unknown>;

export function decodeSDKResponsePayload(rawInput: unknown): SDKResponsePayload | null {
  if (isJSON(rawInput)) {
    return {
      ...rawInput
    };
  }
  return null;
}
