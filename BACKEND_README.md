# Blaze Backend SDK

Blaze Backend SDK is a Node.js library that enables you to seamlessly integrate and use [Breeze 1 Click Checkout](https://breeze.in/) in your server-side applications.

## Overview

The Backend SDK is designed for server-side integration, allowing you to initiate and process payments securely from your Node.js backend. This SDK handles server-to-server communication with the Breeze platform.

## Installation

Run the following command in your Node.js project to install the Blaze SDK Web package:

```sh
npm install @juspay/blaze-sdk-web
```

_Note: You can use pnpm, yarn or any other package manager of your choice to install the package._

## Integration Guide

### Step 1: Import the Backend SDK

Import BlazeBackendSDK using the following code in your Node.js project:

```javascript
import BlazeBackendSDK from '@juspay/blaze-sdk-web/backend';
```

### Step 2: Initialize the SDK

#### 2.1: Construct the Initiate Payload

Create a payload with your merchant credentials to initialize the SDK:

```javascript
const initiatePayload = {
  merchantId: '<merchant-id-shared-by-breeze>',
  shopUrl: '<shop-url>',
  authToken: '<your-auth-token>',
  environment: 'production' // or 'sandbox' for testing
};

const initSDKPayload = {
  requestId: '<unique_request_id>',
  service: 'in.breeze.onecco',
  payload: initiatePayload
};
```

**Parameters:**

- `merchantId`: Your merchant ID provided by Breeze
- `shopUrl`: Your shop URL
- `authToken`: Your authentication token for secure server-to-server communication
- `environment`: Use `'production'` for live environment or `'sandbox'` for testing

#### 2.2: Construct the Callback Method

Create a callback method to handle responses from the SDK:

```javascript
const callbackMethod = (response) => {
  const { eventName, action, status, message, redirectionUrl } = response.payload;

  if (eventName === 'initiate') {
    console.log('SDK initialized successfully');
  } else if (eventName === 'process') {
    console.log('Response:', { status, message, redirectionUrl });
  }
};
```

#### 2.3: (Optional) Configure Network Overrides

If you need to customize the HTTP client (e.g., for proxy support or custom fetch), you can provide a `networkOverrides` object:

```javascript
// Example 1: Using a proxy agent (requires https-proxy-agent or similar library)
import { HttpsProxyAgent } from 'https-proxy-agent';

const networkOverrides = {
  proxyAgent: new HttpsProxyAgent('http://proxy.example.com:8080')
};

// Example 2: Using a custom fetch implementation
const networkOverrides = {
  fetchOverride: customFetch
};

// Example 3: Using a custom HTTPS agent with specific settings
import https from 'https';

const networkOverrides = {
  proxyAgent: new https.Agent({
    keepAlive: true,
    maxSockets: 50
  })
};
```

#### 2.4: Call the initiate method

Call the `initiate` method on BlazeBackendSDK with the initiate payload, callback, and optional network overrides:

```javascript
BlazeBackendSDK.initiate(initSDKPayload, callbackMethod);
```

### Step 3: Process Payment Requests

Once initialized, you can process payment requests using the SDK.

#### 3.1: Construct the Process Payload

Create a payload for the `initiatePayments` action:

```javascript
const processPayload = {
  action: 'initiatePayments',
  cart: {
    id: '<cart-id>',
    totalPrice: 10000, // Amount in smallest currency unit (e.g., paise for INR)
    currency: 'INR'
  },
  customer: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '9876543210',
    countryCode: '+91'
  },
  address: {
    name: 'John Doe',
    line1: '123, Main Street',
    line2: 'Apt 4B',
    city: 'Bengaluru',
    postalCode: '560001',
    district: '',
    state: 'Karnataka',
    country: 'IN',
    phoneNumber: '9876543210',
    countryCode: '+91'
  }
};

const processSDKPayload = {
  requestId: '<unique_request_id>',
  service: 'in.breeze.onecco',
  payload: processPayload
};
```

#### 3.2: Call the process method

Call the `process` method to initiate the payment:

```javascript
BlazeBackendSDK.process(processSDKPayload);
```

The callback will receive a response with `redirectionUrl` that can be used to redirect the user to complete the payment.

## Example Implementation

Here's a complete example of using the Backend SDK:

```javascript
import BlazeBackendSDK from '@juspay/blaze-sdk-web/backend';

// Initialize the SDK
const initiatePayload = {
  merchantId: 'your-merchant-id',
  shopUrl: 'https://yourshop.com',
  authToken: 'your-auth-token',
  environment: 'production'
};

const initSDKPayload = {
  requestId: 'init-' + Date.now(),
  service: 'in.breeze.onecco',
  payload: initiatePayload
};

const callbackMethod = (response) => {
  const { eventName, payload } = response;

  if (eventName === 'initiate') {
    console.log('SDK initialized successfully');

    // Process a payment
    const processPayload = {
      action: 'initiatePayments',
      cart: {
        id: 'cart-123',
        totalPrice: 10000,
        currency: 'INR'
      },
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '9876543210',
        countryCode: '+91'
      },
      address: {
        name: 'John Doe',
        line1: '123, Main Street',
        city: 'Bengaluru',
        postalCode: '560001',
        state: 'Karnataka',
        country: 'IN',
        phoneNumber: '9876543210',
        countryCode: '+91'
      }
    };

    const processSDKPayload = {
      requestId: 'process-' + Date.now(),
      service: 'in.breeze.onecco',
      payload: processPayload
    };

    BlazeBackendSDK.process(processSDKPayload);
  } else if (eventName === 'process') {
    const { status, message, redirectionUrl } = payload;
    console.log('Payment initiated:', { status, message });

    if (redirectionUrl) {
      // Send the redirection URL to the frontend
      console.log('Redirect user to:', redirectionUrl);
    }
  }
};

BlazeBackendSDK.initiate(initSDKPayload, callbackMethod);
```

## API Reference

### BlazeBackendSDK.initiate(payload, callback, networkOverrides?)

Initializes the Backend SDK with merchant credentials.

**Parameters:**

- `payload`: Object containing `requestId`, `service`, and initialization payload
- `callback`: Function to handle SDK responses
- `networkOverrides` (optional): Network configuration object with the following properties:
  - `fetchOverride?: typeof fetch` - Custom fetch implementation (e.g., node-fetch, native fetch)
  - `proxyAgent?: http.Agent | https.Agent | EventEmitter` - Custom agent for proxy or advanced networking

**Example NetworkOverrides:**

```typescript
{
  fetchOverride?: typeof fetch;
  proxyAgent?: http.Agent | https.Agent | EventEmitter;
}
```

### BlazeBackendSDK.process(payload)

Processes a payment request.

**Parameters:**

- `payload`: Object containing `requestId`, `service`, and process payload

## Network Configuration Examples

### Using Proxy Agents

You can use any proxy agent library that's compatible with Node.js agents:

```javascript
// Using https-proxy-agent
import { HttpsProxyAgent } from 'https-proxy-agent';

const networkOverrides = {
  proxyAgent: new HttpsProxyAgent('http://proxy.example.com:8080')
};

// Using socks-proxy-agent
import { SocksProxyAgent } from 'socks-proxy-agent';

const networkOverrides = {
  proxyAgent: new SocksProxyAgent('socks://proxy.example.com:1080')
};

// With authentication
import { HttpsProxyAgent } from 'https-proxy-agent';

const networkOverrides = {
  proxyAgent: new HttpsProxyAgent('http://username:password@proxy.example.com:8080')
};
```

### Using Custom Agents

```javascript
import https from 'https';

const networkOverrides = {
  proxyAgent: new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 50,
    maxFreeSockets: 10,
    timeout: 60000
  })
};
```

### Using Custom Fetch

```javascript
// Node 18+ native fetch
const networkOverrides = {
  fetchOverride: fetch
};

// Or with node-fetch
import fetch from 'node-fetch';

const networkOverrides = {
  fetchOverride: fetch
};
```

## Support

For more information or support, please refer to the [Breeze documentation](https://breeze.in/) or contact the Breeze support team.
