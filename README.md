# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Major dependencies
- [React Native Background Upload](https://github.com/Vydia/react-native-background-upload) - React Native http post file uploader for android and iOS which supports foreground and background uploading.
- [React Native Document Picker](https://github.com/react-native-documents/document-picker?tab=readme-ov-file) - Used to Pick any type of files/documents like .pdf,.jpeg,.png etc.
- [React Native MMKV Storage](https://github.com/ammarahm-ed/react-native-mmkv-storage) - Used to store and get data locally.
- [Redux](https://github.com/reduxjs/redux) - Predictable and centralized state container
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Used to persist redux store data into local staorage(MMKV)

## List of features
- Pick documents and upload on the server.
- Allow users to upload the document with the help of react-native-background-upload.
- All the pending, error and completed document requests will be persisted using redux-persist.
- Upload document request will be stored in Error Reducer in redux store if any error detect while uploading and allow users to re-upload the document request from Error Reducer if network is available.
- User can remove document request from persisted reducer.

# Learn More
- [React Native Background Upload](https://github.com/Vydia/react-native-background-upload) - learn more about React Native Background Upload
- [React Native Document Picker](https://github.com/react-native-documents/document-picker?tab=readme-ov-file) - learn more about React Native Document Picker
- [React Native MMKV Storage](https://github.com/ammarahm-ed/react-native-mmkv-storage) - learn more about React Native MMKV Storage
- [Redux](https://github.com/reduxjs/redux) - learn more about Redux
- [Redux Persist](https://github.com/rt2zz/redux-persist) - learn more about Redux Persist