# Remix of Remix of TaskEther: Your Crypto Tasks

App: TaskEther — a Telegram Mini App (mobile-only web app that runs inside 

Telegram's in-app browser). Build the full app shell plus the Home screen.

BRAND

Name: "TaskEther". Logo: attached image — an abstract blue-to-purple 

gradient pinwheel mark, no text in the mark itself, use it as the app icon.

DESIGN SYSTEM

Match the attached reference screenshot's layout, spacing, and visual style 

exactly — this is a different app so all copy and numbers will change, but 

keep the visual language:

- Background: soft lavender-white

- Primary gradient: deep blue to purple/indigo, used on hero cards, primary 

  buttons, and the active bottom-nav icon

- Cards: large rounded corners, soft drop shadow, no hard borders, white/

  near-white fill

- Typography: bold for large numbers and headings, medium weight for labels, 

  clear visual hierarchy

- Bottom nav: 5 tabs, icon + label, active tab filled/colored, inactive 

  tabs gray outline

APP SHELL

Bottom navigation with 5 tabs. Build Home fully. For the other 4, just create 

the route with a simple centered "Coming soon" placeholder for now:

🏠 Home (build fully, see below)

✅ Tasks (placeholder)

⭐ Level (placeholder)

👥 Referral (placeholder)

🙍 Profile (placeholder)

HOME SCREEN — build fully

1. Header: app name + logo top-left, small notification bell icon, 

   three-dot overflow menu top-right

2. Hero wallet card (gradient, large, rounded):

   - Label "Total Balance"

   - Large number: mock "42.50" + "USDT"

   - Small subtext: "Min. withdrawal 10 USDT · TRC20 network"

3. Two side-by-side buttons under the hero card:

   - "Send" — filled gradient button, paper-plane icon, navigates to a 

     Send screen (create as a simple stub screen for now)

   - "Withdraw" — light/outline button, up-arrow icon, navigates to a 

     Withdraw screen (stub for now)

4. "Overview" section header, 2x2 stat card grid below it:

   - Total Earned: mock "58.20 USDT" (dollar-sign icon)

   - Tasks Done: mock "12" (checkmark icon)

   - Level: mock "Pro" (star icon)

   - Available: mock "42.50 USDT" (card icon)

5. A "View history →" row below the grid, navigates to a History screen 

   (stub for now)

6. Bottom nav bar, Home tab shown as active

TECHNICAL NOTE

Use a single local mock data object for all the numbers above — do not 

connect to Supabase or any backend yet. Keep the mock data clearly separated 

from the UI components so it's easy to swap for real API calls in a later 

step.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/26ff146b-cfc7-4668-bf94-f948a0f58214).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
