import { LogBox } from "react-native";

if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "If you do not provide children, you must specify an aria-label for accessibility",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
    'Each child in a list should have a unique "key" prop.',
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}