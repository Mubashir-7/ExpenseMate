export const IS_DEV = __DEV__;
export const BASE_URL = __DEV__
  ? `https://staging.apis.smoov.app/api`
  : `https://production.apis.smoov.app/api`;
export const WS_BASE_URL = __DEV__
  ? `wss://staging.apis.smoov.app/ws/`
  : `wss://production.apis.smoov.app/ws/`;

// export const BASE_URL = `https://production.apis.smoov.app/api`
// export const WS_BASE_URL = `wss://production.apis.smoov.app/ws/`


export const AUTH_URL = `${BASE_URL}/auth/token`;
export const ENDPOINTS = {
  ASTRA_URL: {
    USER_INTENT: `${BASE_URL}/astra/user-intent/`,
    USER_INTENT_INITIAL: `${BASE_URL}/astra/initiate-transfer/`,
  },
  ANALYTICS_URL: {
    SEND_EVENT: `${BASE_URL}/analytics/`,
  },
  AUTH_URL: {
    GET_TOKEN: `${AUTH_URL}/`,
    REFRESH_TOKEN: `${AUTH_URL}/refresh/`,
    VERIFY_TOKEN: `${AUTH_URL}/verify/`,
  },
  USER_URL: {
    BASE: `${BASE_URL}/v1/users/`,
    DELETE_USER: `${BASE_URL}/v1/users/deactivate/`,
    SIGN_UP: `${BASE_URL}/v1/users/signup/`,
    GET_ONBOARDING_PROGRESS: `${BASE_URL}/v1/users/onboarding-checklist/`,
    UPDATE_PUSH_TOKEN: `${BASE_URL}/v1/users/push-token/`,
    RESET_PASSWORD: `${BASE_URL}/v1/users/password-reset/`,
    CONFIRM_RESET_PASSWORD: `${BASE_URL}/v1/users/password-reset-confirm/`,
    AMOUNT_OWED: `${BASE_URL}/v1/users/partner-amount-owed/`,
    PARTNER_INFO: `${BASE_URL}/v1/users/partner-info/`,
  },
  NOTIFICATIONS_URL: {
    CONNECTION_ID: `${BASE_URL}/v1/notifications/connection-id/`,
    GET_NOTIFICATIONS: `${BASE_URL}/v1/notifications/`,
    BULK_READ: `${BASE_URL}/v1/notifications/bulk-action/`,
  },
  PLAID_URL: {
    GET_LINK_TOKEN: `${BASE_URL}/plaid/link-token/`,
    EXCHANGE_PUBLIC_TOKEN: `${BASE_URL}/plaid/exchange-token/`,
  },
  PARTNERS_URL: {
    INVITE: `${BASE_URL}/v1/partners/accept-invite/`,
    BASE: `${BASE_URL}/v1/partners/`,
  },
  TRANSACTION_URL: {
    TRANSACTIONS: `${BASE_URL}/v1/transactions/`,
    SHARED_TRANSACTIONS: `${BASE_URL}/v1/shared-transactions/`,
  },
  CARD_URL: {
    CARDS: `${BASE_URL}/v1/cards/`,
  },
  SETTLEMENTS: {
    BASE: `${BASE_URL}/v1/settlements/`,
  },
  METRICS_URL: {
    SPEND_BY_CATEGORY: `${BASE_URL}/v1/metrics/spend-by-category/`,
  },
};
