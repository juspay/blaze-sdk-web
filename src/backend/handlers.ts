import { APICaller, type APIRequest, APISuccess } from 'typesafe-api-call';
import type { Environment, SDKPayload, SDKResponse } from '$generated/types';
import type {
  GeneratePaymentLinkResponse,
  ErrorResponse,
  InitiatePayloadData
} from '$generated/Backend';
import {
  decodeGeneratePaymentLinkResponse,
  decodeInitiatePaymentsPayload,
  decodeErrorResponse,
  decodeActionEnum
} from '$generated/Backend';
import { environmentUrls, paymentEndpoint } from './constants';
import { toSdkResponse, incorrectPayloadResp } from './utils';
import type { CallbackFn } from '$types';
import type { NetworkOverrides } from './types';

export async function handleProcess(
  decodedParams: SDKPayload,
  callback: CallbackFn,
  environment: Environment,
  initiateData: InitiatePayloadData,
  networkOverrides?: NetworkOverrides
): Promise<void> {
  const action = decodeActionEnum(decodedParams.payload.action);

  let response: SDKResponse;

  switch (action) {
    case 'initiatePayments':
      response = await processInitiatePayments(
        decodedParams,
        environment,
        initiateData,
        networkOverrides
      );
      break;
    default:
      response = incorrectPayloadResp(decodedParams.requestId, decodedParams.service, 'process');
  }
  callback(response);
}

async function processInitiatePayments(
  params: SDKPayload,
  environment: Environment,
  initiateData: InitiatePayloadData,
  networkOverrides?: NetworkOverrides
): Promise<SDKResponse> {
  const paymentsData = decodeInitiatePaymentsPayload(params.payload);

  if (paymentsData === null) {
    return toSdkResponse(params.requestId, params.service, 'process', 'initiatePayments', {
      status: 'error',
      message: 'Invalid process payload'
    });
  }

  const fullUrl = `${environmentUrls[environment]}${paymentEndpoint}`;
  const token = initiateData.authToken.startsWith('Bearer ')
    ? initiateData.authToken
    : `Bearer ${initiateData.authToken}`;

  try {
    const requestOptions: APIRequest = {
      url: new URL(fullUrl),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        cart: paymentsData.cart,
        customer: {
          ...(paymentsData.customer ?? {}),
          address: paymentsData.address ?? {}
        },
        shopUrl: initiateData.shopUrl,
        additionalParams: paymentsData.additionalParams
      }),
      agent: networkOverrides?.proxyAgent
    };

    const result = await APICaller.call<GeneratePaymentLinkResponse, ErrorResponse>(
      requestOptions,
      decodeGeneratePaymentLinkResponse,
      decodeErrorResponse,
      networkOverrides?.fetchOverride
    );

    if (result instanceof APISuccess) {
      return toSdkResponse(params.requestId, params.service, 'process', 'initiatePayments', {
        status: 'success',
        message: 'Payment initiated successfully',
        redirectionUrl: result.response.redirectionUrl
      });
    }

    return toSdkResponse(params.requestId, params.service, 'process', 'initiatePayments', {
      status: result.response?.status ?? 'error',
      message: result.response?.message ?? result.errorMessage ?? 'API request failed'
    });
  } catch (error) {
    return toSdkResponse(params.requestId, params.service, 'process', 'initiatePayments', {
      status: 'error',
      message:
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : 'UnknownError: Unknown error occurred'
    });
  }
}
