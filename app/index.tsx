import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Index() {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    if (user.role === "ADMIN") {
      return <Redirect href="/(admin)/dashboard/overview" />;
    }
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
