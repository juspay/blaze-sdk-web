import type { SDKResponse, EventName } from '$generated/types';
import type { ActionEnum } from '$generated/Backend';

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
