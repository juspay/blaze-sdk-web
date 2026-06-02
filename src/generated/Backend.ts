import { isJSON, decodeString, decodeUnknown } from 'type-decoder';

/**
 * @type { ActionEnum }
 * @description Action type
 */
export type ActionEnum = 'initiatePayments';

export function decodeActionEnum(rawInput: unknown): ActionEnum | null {
  switch (rawInput) {
    case 'initiatePayments':
      return rawInput;
  }
  return null;
}

/**
 * @type { InitiatePayloadData }
 */
export type InitiatePayloadData = {
  /**
   * @description Merchant identifier
   * @type { string }
   * @memberof InitiatePayloadData
   */
  merchantId: string;
  /**
   * @description Shop URL
   * @type { string }
   * @memberof InitiatePayloadData
   */
  shopUrl: string;
  /**
   * @description Authentication token
   * @type { string }
   * @memberof InitiatePayloadData
   */
  authToken: string;
};

export function decodeInitiatePayloadData(rawInput: unknown): InitiatePayloadData | null {
  if (isJSON(rawInput)) {
    const decodedMerchantId = decodeString(rawInput['merchantId']);
    const decodedShopUrl = decodeString(rawInput['shopUrl']);
    const decodedAuthToken = decodeString(rawInput['authToken']);

    if (decodedMerchantId === null || decodedShopUrl === null || decodedAuthToken === null) {
      return null;
    }

    return {
      merchantId: decodedMerchantId,
      shopUrl: decodedShopUrl,
      authToken: decodedAuthToken
    };
  }
  return null;
}

/**
 * @type { InitiatePaymentsPayload }
 */
export type InitiatePaymentsPayload = {
  /**
   * @description Cart information
   * @type { InitiatePaymentsPayloadCart }
   * @memberof InitiatePaymentsPayload
   */
  cart: InitiatePaymentsPayloadCart;
  /**
   * @description Customer information
   * @type { InitiatePaymentsPayloadCustomer }
   * @memberof InitiatePaymentsPayload
   */
  customer: InitiatePaymentsPayloadCustomer | null;
  /**
   * @description Address information
   * @type { InitiatePaymentsPayloadAddress }
   * @memberof InitiatePaymentsPayload
   */
  address: InitiatePaymentsPayloadAddress | null;
  /**
   * @description Additional parameters (e.g. subMerchantId) to pass along with the payment
   * @type { InitiatePaymentsPayloadAdditionalParams }
   * @memberof InitiatePaymentsPayload
   */
  additionalParams: InitiatePaymentsPayloadAdditionalParams | null;
};

export function decodeInitiatePaymentsPayload(rawInput: unknown): InitiatePaymentsPayload | null {
  if (isJSON(rawInput)) {
    const decodedCart = decodeInitiatePaymentsPayloadCart(rawInput['cart']);
    const decodedCustomer = decodeInitiatePaymentsPayloadCustomer(rawInput['customer']);
    const decodedAddress = decodeInitiatePaymentsPayloadAddress(rawInput['address']);
    const decodedAdditionalParams = decodeInitiatePaymentsPayloadAdditionalParams(
      rawInput['additionalParams']
    );

    if (decodedCart === null) {
      return null;
    }

    return {
      cart: decodedCart,
      customer: decodedCustomer,
      address: decodedAddress,
      additionalParams: decodedAdditionalParams
    };
  }
  return null;
}

/**
 * @type { InitiatePaymentsPayloadCart }
 * @description Cart information
 */
export type InitiatePaymentsPayloadCart = Record<string, unknown>;

export function decodeInitiatePaymentsPayloadCart(
  rawInput: unknown
): InitiatePaymentsPayloadCart | null {
  if (isJSON(rawInput)) {
    const decodedAdditionalProperties: InitiatePaymentsPayloadCart = {};
    for (const key in rawInput) {
      const decodedValue = decodeUnknown(rawInput[key]);
      decodedAdditionalProperties[key] = decodedValue;
    }
    return decodedAdditionalProperties;
  }
  return null;
}

/**
 * @type { InitiatePaymentsPayloadCustomer }
 * @description Customer information
 */
export type InitiatePaymentsPayloadCustomer = Record<string, unknown>;

export function decodeInitiatePaymentsPayloadCustomer(
  rawInput: unknown
): InitiatePaymentsPayloadCustomer | null {
  if (isJSON(rawInput)) {
    const decodedAdditionalProperties: InitiatePaymentsPayloadCustomer = {};
    for (const key in rawInput) {
      const decodedValue = decodeUnknown(rawInput[key]);
      decodedAdditionalProperties[key] = decodedValue;
    }
    return decodedAdditionalProperties;
  }
  return null;
}

/**
 * @type { InitiatePaymentsPayloadAddress }
 * @description Address information
 */
export type InitiatePaymentsPayloadAddress = Record<string, unknown>;

export function decodeInitiatePaymentsPayloadAddress(
  rawInput: unknown
): InitiatePaymentsPayloadAddress | null {
  if (isJSON(rawInput)) {
    const decodedAdditionalProperties: InitiatePaymentsPayloadAddress = {};
    for (const key in rawInput) {
      const decodedValue = decodeUnknown(rawInput[key]);
      decodedAdditionalProperties[key] = decodedValue;
    }
    return decodedAdditionalProperties;
  }
  return null;
}

/**
 * @type { InitiatePaymentsPayloadAdditionalParams }
 * @description Additional parameters (e.g. subMerchantId) to pass along with the payment
 */
export type InitiatePaymentsPayloadAdditionalParams = Record<string, unknown>;

export function decodeInitiatePaymentsPayloadAdditionalParams(
  rawInput: unknown
): InitiatePaymentsPayloadAdditionalParams | null {
  if (isJSON(rawInput)) {
    const decodedAdditionalProperties: InitiatePaymentsPayloadAdditionalParams = {};
    for (const key in rawInput) {
      const decodedValue = decodeUnknown(rawInput[key]);
      decodedAdditionalProperties[key] = decodedValue;
    }
    return decodedAdditionalProperties;
  }
  return null;
}

/**
 * @type { GeneratePaymentLinkResponse }
 */
export type GeneratePaymentLinkResponse = {
  /**
   * @description URL to redirect user for payment
   * @type { string }
   * @memberof GeneratePaymentLinkResponse
   */
  redirectionUrl: string;
};

export function decodeGeneratePaymentLinkResponse(
  rawInput: unknown
): GeneratePaymentLinkResponse | null {
  if (isJSON(rawInput)) {
    const decodedRedirectionUrl = decodeString(rawInput['redirectionUrl']);

    if (decodedRedirectionUrl === null) {
      return null;
    }

    return {
      redirectionUrl: decodedRedirectionUrl
    };
  }
  return null;
}

/**
 * @type { ErrorResponse }
 */
export type ErrorResponse = {
  /**
   * @description Error status
   * @type { string }
   * @memberof ErrorResponse
   */
  status: string;
  /**
   * @description Error message
   * @type { string }
   * @memberof ErrorResponse
   */
  message: string;
};

export function decodeErrorResponse(rawInput: unknown): ErrorResponse | null {
  if (isJSON(rawInput)) {
    const decodedStatus = decodeString(rawInput['status']);
    const decodedMessage = decodeString(rawInput['message']);

    if (decodedStatus === null || decodedMessage === null) {
      return null;
    }

    return {
      status: decodedStatus,
      message: decodedMessage
    };
  }
  return null;
}
