# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

-   [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

-   [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
-   [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

-   [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
-   [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Tabs

All tabs are located in the /app/(tabs) directory, with each .tsx file representing a separate page:

-   index.tsx corresponds to the event list page and uses the root route /
-   Other tab pages can be accessed via their respective routes (e.g. /jobs for the job page)

Note: The icons implementation differs between iOS and web platforms, with icon definitions located in the /components/ui/IconSymbol.tsx file.

## User Role Management & Logistics

The app asks users to choose from the following two user roles:

-   Volunteer (0)
-   Event Organizer (1)

### Key Components:

1. **Role Context**

    - Located in `/contexts/RoleContext.tsx`
    - Manages user role state across the app
    - Provides `useRole` hook for accessing and setting roles

2. **Role Selection Screen**

    - Located in `/app/role-select.tsx`
    - Initial screen for role selection
    - Redirects to events page after selection

3. **Layout Changes**
    - Modified `/app/_layout.tsx` to include role selection flow
    - Added RoleProvider wrapper for global state management

### Navigation Flow:

1. User starts at role selection screen
2. Upon selecting a role, user is redirected to events tab
3. Role information persists throughout the app session

### Example Usage

1. import { useRole } from "@/contexts/RoleContext";
2. const { role } = useRole();
3. Use role in the component as needed

### References

Roulette wheel: https://benhur-martins.medium.com/how-to-build-a-roulette-wheel-with-react-native-85516d36ce30
