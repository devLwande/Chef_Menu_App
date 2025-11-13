# Chef Menu App — Final PoE Submission (2025)

**Repository:** https://github.com/devLwande/Chef_Menu_App

**Author:** Lwande  
**Course / Module:** Rosebank College — MAST5112  
**Year:** 2025

---

## Submission checklist
1. **README / Changelog** (this file) — lists implemented changes since Part 2 and refactoring details.  
2. **GitHub repository** — repo link is above; ensure all files are pushed to `main`.  
3. **Video recording** — screen recording with voice-over showing app features in action. 

## App summary
A React Native (TypeScript) app that allows chefs or restaurant owners to create and manage a personalized digital menu with multiple courses — Starters, Mains, Desserts, and Drinks.

Key features:
- Add menu items: name, description, course, price.
- Remove menu items.
- Home screen shows full menu and **average price by course**.
- Separate screen for adding/removing menu items (chef).
- Filter view for guests to view menu by course.
- Persistent local storage using `AsyncStorage`.
- Refactored into multiple files and components.

---

## Changelog — *Since Part 2* (final PoE)
> Note: these entries summarize the functional changes implemented for the final submission and correspond to the commits in the repository (see commit history).

### Major functional changes
- **Moved "Add Menu Item" functionality off the Home screen**  
  - Created a new dedicated screen **AddMenuScreen** (Chef screen) where the chef can add new menu items and remove items. The home screen no longer hosts the add form.
- **Home screen displays average price by course**  
  - Home now computes and displays the **average price** for each course category (Starters, Mains, Desserts, Drinks). The averages update when items are added/removed.
- **Menu data stored in an array and persisted**  
  - Menu items are kept in an array in app state and saved to `AsyncStorage` for persistence between app runs.
- **Remove items from menu**  
  - Chef can remove items from the AddMenu screen (or from item controls); removed items no longer appear on the Home screen.
- **Guest filter screen**  
  - Added a separate screen for guests to **filter menu items by course** (e.g. show only Starters).
- **UI/UX improvements**  
  - Improved layout and responsive behavior; welcome screen shown only on first launch using `AsyncStorage`.
- **Refactoring and file re-organization**  
  - Split the code into multiple files and components to improve readability and maintainability (see *Refactor details* below).

### Minor/Support changes
- Fixed minor bugs in add/remove logic (edge cases where price was empty or non-numeric).
- Added basic input validation (required fields: name, price; numeric price enforcement).
- Cleaned up unused imports and removed dead code.
- Updated README and inline comments.

---

## Refactor details
During the refactor I focused on separation of concerns, readability, and maintainability:

- **Files created / reorganized**
  - `src/screens/AddMenuScreen.tsx` — new screen for chef to add/remove menu items.
  - `src/screens/HomeScreen.tsx` — main home screen showing full menu and average prices.
  - `src/screens/FilterScreen.tsx` — guest screen to filter by course.
  - `src/components/MenuItemCard.tsx` — small presentational component for menu items.
  - `src/hooks/useMenu.ts` — (optional) a custom hook to manage menu state + persistence (load/save).
  - `src/navigation/AppNavigator.tsx` — central place for app navigation (stack/tab).
  - `App.tsx` — slim bootstrap that wires the navigator and global providers.
- **Why these changes**  
  - Split screens into separate files to make each screen easier to understand and test.
  - Extracted repeated UI into components (`MenuItemCard`) so changes apply in one place.
  - Centralized menu state management (single source of truth) and persistence to avoid duplicated logic in multiple screens.
  - Added simple type definitions (TypeScript interfaces) for `MenuItem` to ensure type-safety across components.

---

## How the average price is computed
For each course, the app:
1. Filters the menu array for items with `course === '<courseName>'`.
2. Maps that subset to their numeric `price`.
3. Computes average: `sum(prices)/count` (if `count > 0`), otherwise shows `—` or `0.00`.

Example pseudo-code:
```ts
const courseItems = menu.filter(i => i.course === 'Starters');
const avg = courseItems.length ? courseItems.reduce((s, i) => s + Number(i.price), 0) / courseItems.length : 0;
```

---

## How to run the app (development)
1. Clone the repository:
   ```bash
   git clone https://github.com/devLwande/Chef_Menu_App.git
   cd Chef_Menu_App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run on Android emulator or device:
   ```bash
   npx react-native run-android
   ```
   Or for iOS (macOS):
   ```bash
   npx react-native run-ios
   ```

> Ensure you have React Native CLI and native toolchains installed. Replace commands with `expo` equivalents if you migrated to Expo.



**Video link:** 

---

## Notes for marker
- The home screen now purely presents the menu (no add form).
- All add/remove functionality lives in a separate screen for chef use.
- Guest filtering is a dedicated page.
- The code base is split into small focused files and components for clarity.
- If you prefer, you can run the app and inspect the `src/` directory to confirm the structure.


