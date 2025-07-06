// app/(admin)/_layout.tsx
import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Admin Home", headerShown: false }}
      />
      <Stack.Screen
        name="dashboard"
        options={{ headerShown: false }} // Hides the stack header to let Tabs handle their own
      />
    </Stack>
  );
}
