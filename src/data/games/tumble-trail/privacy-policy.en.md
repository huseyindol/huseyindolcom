# Offroad Trail 4x4 — Privacy Policy

_Effective date: November 3, 2026_

## In short

- Offroad Trail 4x4 does **not ask for** an account, sign-up, email address, phone number, real name, photos, camera or microphone permission.
- Your coin balance, garage upgrades, personal category records and settings are stored **locally on your device** (iOS UserDefaults / browser localStorage).
- **Global Leaderboard & Optional Apple Game Center Backup:** Starting with version 1.1.0, the game assigns a random, account-free anonymous identifier (**Firebase Anonymous Auth**) per device or browser and syncs your highest distance record under your permanently locked nickname (chosen nickname up to 16 characters, distance, coins, vehicle color and difficulty category) to the global leaderboard hosted on **Google Cloud Firestore** (`eur3` — Europe). On iPhone and iPad, you may optionally link **Apple Game Center** to back up and restore your locked global driver nickname and personal leaderboard records across your iOS devices (no email, real name or friend list is collected; the Web version uses anonymous auth only).
- **Anonymous gameplay analytics:** To balance gameplay and improve stability, both the iOS and Web versions log anonymous in-game events (screen views, run start/end reason, garage upgrades, seasonal theme preference) via **Google Analytics for Firebase**.
- **Advertising (iOS app only):** The iOS app shows interstitial ads and optional rewarded ads ("Watch Ad · 2X–10X Coin Multiplier") through **Google AdMob**. In the European Economic Area (EEA) and the UK, Google's User Messaging Platform (**UMP**) consent form is presented; on iOS, Apple's **App Tracking Transparency (ATT)** permission is requested before loading ads. If permission is declined, ad requests are sent as non-personalized (`npa=1`). The web version has no ads.
- **Optional "Remove Ads" purchase (iOS app only):** You may optionally make a one-time in-app purchase to permanently remove mandatory run-end interstitial ads (optional rewarded multiplier ads remain available). Payment processing and entitlement verification are handled anonymously through Apple (**App Store / StoreKit**) and **RevenueCat**; we never receive or store your payment or billing details.
- **Push notifications & version check (iOS app only):** Optional game announcements use **Firebase Cloud Messaging (FCM)** and **Apple Push Notification service (APNs)** device push tokens; declining permission never restricts the game, and notifications can be turned off anytime in iOS **Settings**. Launch version checks (`/config/app`) are performed without sending personal data.

## 1. Who we are

Offroad Trail 4x4 is a 2.5D mountain and offroad driving game developed by independent developer **Hüseyin DOL**. This policy applies to the iPhone/iPad app and the web version (`huseyindol.com/games/tumble-trail`). Contact: [huseyindol@gmail.com](mailto:huseyindol@gmail.com).

## 2. What the game itself handles

**Information stored locally on your device.** The following progress and preference data stays on your device (iOS UserDefaults or browser localStorage):

- Your permanently locked driver nickname (2–16 characters; or local profile before locking a global name), vehicle color and difficulty mode (Hobby, Easy, Auto)
- Your coin balance, garage upgrade levels (Engine, Tires, Suspension, Fuel Tank) and local best distances and run history across each difficulty category (Hobby, Easy, Auto)
- Settings: sound, vibration, language preference (System / Türkçe / English) and seasonal theme preference (Auto / On / Off)
- Ad frequency counters (iOS only): total completed runs and runs since the last interstitial ad

**Global Leaderboard (Firebase Anonymous Auth, iOS Apple Game Center and Cloud Firestore).** The Scores screen globally ranks the highest distances across all players in each of the Hobby, Easy and Auto categories:

- Without requiring any registration or password, the app generates a random anonymous user identifier (**Firebase Anonymous Auth UID**) for your device or browser, used solely to reserve your unique nickname and maintain a single personal-record entry per global category board.
- **Optional Apple Game Center linking (iOS only):** On iPhone and iPad, if you are signed in to Apple Game Center (or choose **Connect Game Center** in the driver-name modal or **ⓘ → Game Center**), Apple's `GameKit` verification is used solely to link your Firebase UID with your Game Center player identifier (`gc.apple.com`) and suggest your Game Center alias if you have not picked a nickname yet. This allows your locked global driver nickname and personal category records to restore automatically after reinstalling or switching to another iPhone/iPad. Game Center linking is completely optional; we never access your friend list, email address or Apple Account details, and it is never used for advertising tracking.
- When you choose and confirm an available nickname (2–16 characters, filtered against inappropriate terms — please avoid entering your real name or personal details) in the global driver-name prompt at launch (or via the main-menu driver plate / leaderboard screen), that nickname is **permanently and uniquely locked** to your anonymous device ID on Cloud Firestore (`/players/{uid}` and `/usernames/{key}`). If you have no internet connection, you can choose **Play Offline** to play locally without locking a name; no scores are uploaded while unlocked.
- Once your nickname is locked, setting a new personal distance record (or migrating up to 2 prior local category records during nickname confirmation) writes only 6 fields to **Google Cloud Firestore** (`eur3` — European region): your locked nickname, distance (meters), coins earned in that run, vehicle color, difficulty mode (`hobby`, `easy` or `auto`) and a server timestamp.
- Global leaderboard entries are visible to other players inside the game (Top 50 list and global rank). Unlimited-coin test/VIP nicknames are excluded from the global board for fair play. There is no chat, private messaging or friend list in the game.

## 3. Advertising, consent and tracking (Google AdMob, UMP and ATT — iOS only)

Offroad Trail 4x4 is free to play; development of the iOS app is supported by ads served by **Google AdMob** (Google Mobile Ads SDK). The web version shows no ads.

**Consent and tracking choices (UMP and ATT).**

- **European user consent (Google UMP):** For users in the European Economic Area (EEA), the United Kingdom and Switzerland, Google's IAB TCF-compliant consent form is shown before ad requests are made. You can view or change your privacy choices at any time from the main menu via **ⓘ (Info and settings) → Ad privacy options** (shown whenever required in your region).
- **Apple App Tracking Transparency (ATT):** On iOS, the system tracking permission prompt is shown before the first ad request. If you allow tracking, Google may use the device's advertising identifier (IDFA) to serve personalized ads and measure ad performance. If you **ask the app not to track** (or if tracking is restricted on your device), iOS zeroes out the advertising identifier and the app sends all ad requests as **non-personalized ads** (`nonPersonalizedAds / npa=1`); all game features continue to work without restriction. You can change your ATT permission at any time in iPhone/iPad **Settings → Privacy & Security → Tracking**.
- **Content rating:** Ad requests are configured with a maximum ad content rating of `PG` (parental guidance suggested).

**Information Google may process for ads.** According to Google's App Store data disclosure guidance and the Google Mobile Ads SDK privacy manifest, the SDK may process the following data types from the device to serve and measure ads, prevent fraud and improve its service:

- **Coarse Location:** general geographic region estimated from the IP address (the app never requests GPS or precise location permission)
- **Device ID:** the advertising identifier (IDFA, only if ATT permission is granted) and app- or developer-scoped identifiers
- **Product Interaction:** app launches and interactions with ads (views, dismissals, taps, rewarded video completions)
- **Advertising Data:** information about the ads shown in the app
- **Diagnostics:** crash logs and performance metrics related to the SDK

How Google processes this information is governed by its own policies: [Google Privacy Policy](https://policies.google.com/privacy) · [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites).

**When ads appear.**

- **Interstitial ads:** Never appear while driving, at launch, in the garage, on the leaderboard or when resuming from pause. They may appear only after a run ends (leaving the game-over screen in Easy/Auto, or leaving/restarting from the pause menu in Hobby mode). The first **3 runs** are completely ad-free; after that, interstitial ads appear at most once every **2 runs** and no more than **6 times per session**.
- **Rewarded ads ("Watch Ad · 2X–10X Coin Multiplier"):** Offered strictly as an optional button on the Easy/Auto game-over screen. Watching the video multiplies the coins earned in that run (collected coins plus distance bonus) by the multiplier stopped on the symmetric bar (2X, 3X, 5X or 10X) and skips any interstitial ad when leaving that screen.
- Without an internet connection, no ads are shown and the game plays offline without interruption.

## 4. In-app purchases ("Remove Ads" — iOS only)

The iOS app offers a single optional non-consumable in-app purchase: **Remove Ads** (`com.huseyindol.tumbleTrail.removeads`). Purchasing Remove Ads permanently disables mandatory run-end interstitial ads, while optional game-over rewarded multiplier ads remain available whenever you choose to watch them. All payment, entitlement verification and restore (**Restore Purchases**) transactions are processed anonymously through Apple's **App Store / StoreKit** and **RevenueCat**; the app never accesses or stores your credit card or billing information (only the local boolean entitlement flag is saved on your device). There are no in-app purchases in the web version.

## 5. Analytics, push notifications, version check and crash reports (Firebase, APNs and Apple)

To understand gameplay balance (such as where runs end due to fuel or flipping, and which garage upgrades are used) and improve stability, both the iOS and Web versions use **Google Analytics for Firebase**:

- Logged events consist strictly of anonymous gameplay interactions: active screen (`menu`, `game`, `garage`, `leaderboard`, `info_sheet`), run start and end reason (`flipped`, `out_of_fuel`, `quit_pause`), distance and coins reached, garage upgrade levels, rewarded 2X–10X coin multiplier usage and seasonal theme preference.
- Firebase Analytics may process an app-instance identifier, device model, OS version and coarse country/region derived from the IP address; it collects no real-world personal identity (name, email, phone) and is not used for cross-app advertising tracking. Details: [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).
- **Push Notifications & Version Check (iOS only):** On iOS, the app uses **Firebase Cloud Messaging (FCM)** and **Apple Push Notification service (APNs)** to deliver optional announcements about new features and events. Notification permission is completely optional; if granted, your device's anonymous push token is used solely to deliver general broadcasts (`all_players`) and is never used for advertising tracking or personal profiling. Declining permission does not restrict any game feature, and you can disable notifications at any time in iPhone/iPad **Settings → Notifications → Offroad Trail**. At launch, the app also performs a read-only check against `/config/app` without sending personal data to verify the minimum and latest app version.
- In addition, if "Share With App Developers" is enabled on your iOS device, Apple may provide us with anonymous crash and performance reports containing no personal information; you can manage this in **Settings → Privacy & Security → Analytics & Improvements**.

## 6. Data retention and deletion

- **Local game records:** Deleting the app from your device (or clearing site data in your browser on the web version) removes all local records (coins, garage levels, local records and settings).
- **Global leaderboard and nickname reservation:** Your claimed global nickname is permanently bound to your device's anonymous UID to prevent impersonation. If you want your device's anonymous nickname reservation and global leaderboard rows deleted completely, email [huseyindol@gmail.com](mailto:huseyindol@gmail.com) with the displayed nickname, difficulty tab and distance/coin score, and we will delete those records within a reasonable time.
- **Google AdMob and Firebase data:** Data processed by Google for advertising and Firebase Analytics is retained according to Google and Firebase retention policies. You can manage your ad personalization and consent choices through **ⓘ → Ad privacy options** inside the game (where applicable) or in iOS **Settings → Privacy & Security → Tracking / Apple Advertising**.

## 7. Children's privacy

Offroad Trail 4x4 is a general-audience (4+) game; it is not a "Made for Kids" app, and the in-game "Hobby" mode is simply a relaxed driving mode where the vehicle does not flip over. We do not knowingly collect real-world identity or contact data from players of any age, and we encourage using a non-personal nickname on the leaderboard. If you notice personal information entered as a leaderboard nickname or sent by email, please contact us and we will promptly remove it.

## 8. Your rights

Depending on where you live (e.g. GDPR, KVKK), you may have the right to access, correct, delete or restrict your data, to object to processing and to withdraw consent. You are welcome to contact us at the address below with any questions or requests, including removal of an anonymous global leaderboard entry. You also have the right to lodge a complaint with your local data protection authority.

## 9. Changes

We may update this policy when the app or applicable regulations change. The current version is always published on this page with its effective date. Significant changes will also be noted in the app update notes.

## 10. Contact

Hüseyin DOL (independent developer) · Email: [huseyindol@gmail.com](mailto:huseyindol@gmail.com) · Web: [huseyindol.com](https://huseyindol.com) · Support page: [https://huseyindol.com/games/tumble-trail/support](https://huseyindol.com/games/tumble-trail/support)
