import type { Environment } from '$generated/types';
import { decodeSDKPayload } from '$generated/types';
import type { InitiatePayloadData } from '$generated/Backend';
import { decodeInitiatePayloadData } from '$generated/Backend';
import { handleProcess } from './handlers';
import { toSdkResponse, incorrectPayloadResp } from './utils';
import type { CallbackFn } from '$types';
import type { NetworkOverrides } from './types';

class BlazeBackendSDK {
  private static environment: Environment;
  private static initiateData: InitiatePayloadData;
  private static callback?: CallbackFn;
  private static networkOverrides?: NetworkOverrides;

  /**
   * @description Initialize the Blaze Backend SDK for server-side operations.
   * @param payload {Record<string, unknown>} - The initialization payload containing SDK configuration.
   * @param callback {CallbackFn} - Mandatory callback function to receive events and responses from the backend SDK.
   * @param networkOverrides {NetworkOverrides} - Optional network configuration to customize HTTP client behavior (e.g., proxy agents, custom fetch).
   * @returns void
   */
  static initiate(
    payload: Record<string, unknown>,
    callback: CallbackFn,
    networkOverrides?: NetworkOverrides
  ): void {
    this.callback = callback;

    const decodedParams = decodeSDKPayload(payload);
    const initiateData = decodeInitiatePayloadData(decodedParams?.payload);

    if (decodedParams === null || initiateData === null) {
      callback(
        incorrectPayloadResp(decodedParams?.requestId ?? null, 'in.breeze.onecco', 'initiate')
      );
      return;
    }

    this.environment = decodedParams.environment ?? 'release';
    this.initiateData = initiateData;
    this.networkOverrides = networkOverrides;

    callback(
      toSdkResponse(decodedParams.requestId, decodedParams.service, 'initiate', null, {
        status: 'success',
        message: 'SDK initialized successfully'
      })
    );
  }

  /**
   * @description Request Blaze Backend SDK to process your request.
   * @param payload {Record<string, unknown>} - The payload data required for the process request.
   * @returns void
   */
  static process(payload: Record<string, unknown>): void {
    if (typeof this.callback !== 'function') {
      console.error('BlazeBackendSDK not initialized. Call BlazeBackendSDK.initiate() first.');
      return;
    }

    const decodedParams = decodeSDKPayload(payload);

    if (decodedParams === null) {
      this.callback(incorrectPayloadResp(null, 'in.breeze.onecco', 'process'));
      return;
    }

    void handleProcess(
      decodedParams,
      this.callback,
      this.environment,
      this.initiateData,
      this.networkOverrides
    );
  }
}

export default BlazeBackendSDK;
