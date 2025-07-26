import { Tabs } from "expo-router";
import React from "react";

export default function DashboardTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="overview"
        options={{
          title: "Overview",
          tabBarIcon: () => null, // Add icon if needed
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: () => null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
