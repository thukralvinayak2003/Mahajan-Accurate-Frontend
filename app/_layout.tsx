import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import "../global.css";
import { store } from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(auth)/login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(admin)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
