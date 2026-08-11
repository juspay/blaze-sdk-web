import type { SDKResponse, EventName } from '$generated/types';
import type { ActionEnum } from '$generated/Backend';
import { nanoid } from 'nanoid';

export function incorrectPayloadResp(
  requestId: string | null,
  service: string = 'in.breeze.onecco',
  eventName: EventName
): SDKResponse {
  return toSdkResponse(requestId, service, eventName, null, {
    error: true,
    errorDetails: 'Incorrect payload'
  });
}

export function toSdkResponse(
  requestId: string | null,
  service: string = 'in.breeze.onecco',
  eventName: EventName,
  action: ActionEnum | null = null,
  data: Record<string, unknown> = {}
): SDKResponse {
  return {
    requestId: requestId ?? 'unknown',
    service,
    payload: {
      eventName,
      action,
      ...data
    }
  };
}

export function _nanoid(): string {
  const nanoId = nanoid();
  const firstChar = nanoId.charAt(0);
  if (firstChar === '_' || firstChar === '-') {
    const randomCharacter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    return randomCharacter + nanoId.substring(1);
  }
  return nanoId;
}
