import BlazeBackendSDK from '@juspay/blaze-sdk-web/backend';
import dotenv from 'dotenv';

dotenv.config();

function handleSDKResponse(response) {
  const { eventName, action, status, message, redirectionUrl } = response.payload;

  if (eventName === 'initiate') {
    console.log('✓ SDK initialized');

    BlazeBackendSDK.process({
      requestId: 'req-' + Date.now(),
      service: 'in.breeze.onecco',
      payload: {
        action: 'initiatePayments',
        cart: {
          id: 'cart-demo-' + Date.now(),
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
          line2: 'Apt 4B',
          city: 'Bengaluru',
          postalCode: '560001',
          district: '',
          state: 'Karnataka',
          country: 'IN',
          phoneNumber: '9876543210',
          countryCode: '+91'
        }
      }
    });
  } else if (eventName === 'process' && action === 'initiatePayments') {
    if (status === 'success') {
      console.log('✓ Payment initiated');
      console.log('Redirection URL:', redirectionUrl);
      process.exit(0);
    } else {
      console.error('✗ Payment failed:', message);
      process.exit(1);
    }
  }
}

function initiatePayment() {
  const { BLAZE_ENVIRONMENT, BLAZE_AUTH_TOKEN, SHOP_URL, MERCHANT_ID } = process.env;

  if (!BLAZE_AUTH_TOKEN) {
    console.error('Error: BLAZE_AUTH_TOKEN not found in .env file');
    process.exit(1);
  }

  try {
    BlazeBackendSDK.initiate(
      {
        requestId: 'req-' + Date.now(),
        service: 'in.breeze.onecco',
        environment: BLAZE_ENVIRONMENT,
        payload: {
          merchantId: MERCHANT_ID,
          shopUrl: SHOP_URL,
          authToken: BLAZE_AUTH_TOKEN
        }
      },
      handleSDKResponse
    );
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

initiatePayment();
