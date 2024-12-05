# Climaid   
<img src="assets/images/climaid-logo.png" alt="Climaid Logo" width="100" />

Welcome to Climaid, an app designed to make Climate Activism Delightful!


## Contents

1. [Instructions](#instructions)
    - [For Heuristics Testers](#for-heuristics-testers)
    - [For Contributors](#for-contributors)
2. [Technology Stack](#technology-stack)
    - [Why Mobile Over Web](#why-mobile-over-web)
3. [Limitations](#limitations)
4. [Style Guide](#style-guide)
5. [References](#references)

## Instructions

If you want to explore the development version of the Climaid app, see the instructions under [**For Heuristics Testers**](#for-heuristics-testers).

To contribute to Climaid's development, follow the instructions in [**For Contributors**](#for-contributors).

### For Heuristics Testers

To test the Climaid App, you will need an iOS device and access to a Climaid development server on your Wi-Fi network. Follow these steps:

1. Download the [Expo Go app](https://apps.apple.com/us/app/expo-go/id982107779) on your iOS device.
2. Log in using these credentials:
    ```
    Username: test1233
    Password: test1233
    ```
3. After logging in, you should see the development server in Expo Go. Tap to connect.

Your iOS device will now download a native build of the Climaid app. Since no login flow is implemented, you will be prompted to select either "Event Organizer" or "Volunteer" before using the app. For the full feature set, choose "Event Organizer," as it offers additional privileges.

### For Contributors

To contribute to Climaid's development, follow these steps:

1. Install Node.js version 22+.
2. Clone the repository:
    ```bash
    git clone git@github.com:tianjuncS2023/Climaid.git
    ```
3. Install required npm modules:
    ```bash
    npm install
    ```
4. Create an Expo Go account. Alternatively, you can use the credentials provided in [**For Heuristics Testers**](#for-heuristics-testers).  
   Install the [Expo Go app](https://apps.apple.com/us/app/expo-go/id982107779) on your mobile device and log in.

5. Log in to Expo on your development computer using:

    ```bash
    npx expo login
    ```

    Enter your credentials when prompted.

6. Start the development server:

    ```bash
    npx expo start
    ```

    Options for testing the app include:

    - [Development builds](https://docs.expo.dev/develop/development-builds/introduction/)
    - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
    - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
    - [Expo Go](https://expo.dev/go), a sandbox for development.

For more details about the project structure and contributing guidelines, refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## Technology Stack

We selected a tech stack optimized for native mobile applications, as Climaid is designed for volunteers to use during climate action events. Learn more in [Why Mobile Over Web](#why-mobile-over-web).

### TypeScript

TypeScript is our primary programming language, extending JavaScript with static typing. It simplifies development by integrating seamlessly with the Expo framework.

### React Native

React Native enables cross-platform app development with a single codebase for iOS and Android. This approach ensures efficiency while maintaining a native app experience.

### Expo

Expo is our development environment and toolchain, providing:

-   Access to native device features
-   Simplified deployment and testing
-   Prototyping capabilities
-   Streamlined build and configuration

### Why Mobile Over Web?

A native mobile app offers distinct advantages for dynamic, on-site environments:

-   Immediate access to information without relying on browsers
-   Interfaces optimized for quick, on-the-go interactions
-   Camera integration for QR code scanning

These features make a mobile app more effective for climate activism than a general-purpose web application.

## Limitations

Our development focused on creating user-centric features, emphasizing UI and UX. Backend functionality is simplified or hard-coded in this demo version.

### Key Limitations

1. **Login Flow**: Users select a one-time role—"Volunteer" or "Event Organizer"—instead of using a full authentication system. Select "Event Organizer" for access to all features.
2. **Mobile-first Design**: The app is optimized for mobile use via Expo Go.
3. **Hard-coded Data**: Event details, volunteer lists, and spin-the-wheel content are pre-populated.
4. **QR Code Check-ins**: The check-in feature accepts any QR code but lacks validation.
5. **Job Quiz Logic**: The Job Quiz demonstrates user interaction but does not influence recommendations.
6. **User Profile Page**: Displays minimal information (e.g., experience points, level) and serves as a placeholder for future enhancements.

## Style Guide

Our style guide can be found here: [Climaid Style Guide](https://sasirekha3.github.io/srid-climaid-style-guide/).

## References

-   [TypeScript Reference](https://www.typescriptlang.org/docs/)
-   [NPM Documentation](https://docs.npmjs.com/)
-   [Expo Framework Documentation](https://docs.expo.dev/)
-   [React Native Documentation](https://reactnative.dev/docs/getting-started)
-   [Pure React Documentation](https://react.dev/)
-   [React Gestures Wheel Tutorial](https://benhur-martins.medium.com/how-to-build-a-roulette-wheel-with-react-native-85516d36ce30)
-   [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
-   [React Native Reanimated (Gesture Library)](https://docs.swmansion.com/react-native-reanimated/)
