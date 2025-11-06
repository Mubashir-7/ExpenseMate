# Smoov Mobile – Project Flow & Architecture

## Overview
Smoov is a React Native app built with Expo SDK 53 and Expo Router v5. It uses NativeWind (Tailwind CSS for RN) for styling, Zustand for state management, Zod for validation, and integrates with third-party services like Plaid, RevenueCat, PostHog, Facebook SDK, and Expo Notifications. The app targets iOS and Android with the new architecture enabled.

## Tech Stack
- Framework: Expo (React Native 0.79, React 19)
- Navigation: Expo Router (file-based routing)
- State: Zustand stores in `store/`
- Styling: NativeWind + Tailwind (`global.css`, `tailwind.config.js`)
- Forms & Validation: `react-hook-form`, `zod`
- Networking: `fetch` wrapper in `utils/request.ts` with token refresh
- Realtime & Push: WebSocket manager + Expo Notifications
- Analytics: PostHog (with session replay)
- Monetization: RevenueCat (paywall UI + user eligibility)

## App Entry & Routing
- Entry point: `expo-router/entry` (from `package.json`)
- Global layout: `app/_layout.tsx`
  - Loads fonts, initializes user state, checks OTA updates, wires Toast, WebSocketManager, PushNotificationManager, and PayWall.
  - Navigation guard logic uses `useSegments()`:
    - Splash and Options always render once without redirects.
    - If user authenticated, redirect to `/private/(tabs)` when visiting auth or other public routes.
    - If unauthenticated and splash not seen, redirect to `/splash`.
    - If unauthenticated after splash, normalize to `/options`.
- Public routes
  - `app/splash.tsx` – launch splash screen (JS route)
  - `app/options.tsx` – entry choice screen; routes to `(auth)` group
  - `app/(auth)/_layout.tsx` – auth stack (index, sign-up, forgot/reset)
- Private routes
  - `app/private/(tabs)` – main tab navigator
    - `index.tsx` (home), `shared.tsx`, `spending.tsx`, `wallet.tsx`
  - `app/private/notifications.tsx`
  - `app/private/create-settlement.tsx`
  - `app/private/manual-payment.tsx` (modal presentation)
  - `app/private/settlements/index.tsx`
  - `app/private/settlement-details/[id].tsx`
  - `app/private/(settings)` – settings stack (profile, partners, transactions, astra validation)

## Auth & User Lifecycle
- Tokens stored in `AsyncStorage` as `access_token` and `refresh_token`.
- Sign-in flows in `store/user.store.ts`:
  - `signInUser` gets tokens, stores them, fetches user, and onboarding status.
  - `signInForTokens` stores tokens only (used after signup to enable patching in wizards).
  - `getUser` loads the current user from `ENDPOINTS.USER_URL.BASE`.
  - `deleteAccount` posts to deactivate endpoint and clears tokens.
- Guard logic in `app/_layout.tsx` decides which route group to show based on `user?.id`.

## Networking Layer
- Endpoints: `endpoints.ts`
  - Chooses BASE_URL by `__DEV__` flag (staging vs production). WebSocket base is `WS_BASE_URL`.
  - Groups for auth, users, partners, transactions, cards, settlements, metrics, notifications, plaid, analytics.
- Request util: `utils/request.ts`
  - Adds `Authorization: Bearer <token>` automatically; supports JSON bodies.
  - On 401/403, attempts refresh via `AUTH_URL.REFRESH_TOKEN` then retries original request.
  - Returns `status` (HTTP), `ok`, `jsonStatus` (if response includes a status field), and JSON fields.

## Realtime & Notifications
- WebSocketManager: `components/websocket-manager.tsx`
  - Fetches `connection_id` from `notifications/connection-id/` for the logged-in user.
  - Opens `wss://.../<connection_id>/` and listens for events, triggering store refreshes:
    - plaid.account_added → refresh onboarding status and cards
    - plaid.transaction_update → refresh transactions
    - partner-related & shared-transaction events → refresh transactions, amount owed, shared transactions
  - Displays `Toast` notifications; deep-links via `Linking` when `meta.url` is provided.
- PushNotificationManager: `components/push-notification-manager.tsx`
  - Requests permissions and registers for Expo push token (physical device required).
  - PATCHes token to backend via `users/push-token/`.
  - Handles notification responses: external URLs via `Linking`, internal routes via `router.push()`.

## State Management (Zustand)
- `store/` contains feature stores, including:
  - `user.store.ts` – auth, profile, signup/login, delete account
  - `notifications.store.ts` – notifications fetching and bulk read
  - `transaction.store.ts`, `shared-transaction.store.ts` – transactions domains
  - `cards.store.ts` – bank cards via Plaid
  - `settlements.store.ts` – settlements & details
  - `revenue-cat.store.ts` – RevenueCat integration
  - `get-onboarding-status.ts`, `get-amount-owed.store.ts` – derived data
  - Each store uses `createResettableStore` with a common `reset()` helper.

## Styling & UI
- Tailwind config in `tailwind.config.js` with Inter font families, colors, sizes.
- NativeWind preset; global styles in `global.css`. Components in `components/` and screens in `modules/` and `app/`.

## Build & Release
- App config: `app.json`
  - iOS/Android identifiers, icons, splash, deep link scheme `smoovapp`.
  - Plugins: Facebook SDK, expo-notifications, expo-build-properties (iOS deployment target), router, web-browser, localization.
  - OTA updates: `expo-updates` using `runtimeVersion: appVersion`.
- EAS config: `eas.json`
  - Three profiles: development (internal dev client), preview (internal), production (auto-increment, channels). Env vars expose API URLs but current code uses `__DEV__`-based BASE_URL.

## Data Contracts & Validation
- `types/` contains TypeScript interfaces for API models (users, transactions, settlements, etc.).
- `zod-shema/` contains Zod schemas for form validation (signup, login, manual transaction, edit user, etc.).

## Error Handling & Logging
- Global `LogBox.ignoreAllLogs()` suppresses RN warnings (consider revisiting in dev).
- Critical network and update errors are logged to console and PostHog events.

## Development Notes
- Start: `npm start` (expo), then `i` or `a` for iOS/Android.
- Native modules in use (FB SDK, RevenueCat, Plaid, Notifications) require prebuild or EAS builds.
- New Architecture enabled in app config.
