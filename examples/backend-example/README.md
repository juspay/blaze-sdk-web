# Blaze Backend SDK Example

This example demonstrates how to use the Blaze Backend SDK in a Node.js application to initiate payments server-side.

## Prerequisites

- Node.js 16.x or higher
- npm or pnpm package manager

## Setup

1. **Install dependencies:**

```sh
npm install
```

2. **Configure environment variables:**

Copy `.env.example` to `.env` and update with your credentials:

```sh
cp .env.example .env
```

Update the following values in `.env`:

- `BLAZE_AUTH_TOKEN`: Your authentication token from Breeze
- `MERCHANT_ID`: Your merchant ID
- `SHOP_URL`: Your shop URL
- `BLAZE_ENVIRONMENT`: Environment (`beta` or `production`)

## Running the Example

```sh
node index.js
```

## What It Does

1. **Initializes the SDK** with merchant credentials from environment variables
2. **Creates a payment request** with sample cart, customer, and address data
3. **Processes the payment** using the `initiatePayments` action
4. **Outputs the payment redirection URL** that can be used to complete the payment

On success, you'll see:

```
✓ SDK initialized
✓ Payment initiated
Redirection URL: https://...
```

## Learn More

For detailed API documentation, see the [main README](../../README.md#backend-sdk-integration).
