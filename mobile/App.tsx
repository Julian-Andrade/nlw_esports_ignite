// Hook
import { useRef, useEffect } from "react";
// Status Bar
import { StatusBar } from "react-native";
// Fonts
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
// Components
import { Background } from "./src/components/Background";
// Screens
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
// Notifications
import "./src/services/notificationConfigs";
import { getPushNotificationsToken } from "./src/services/getPushNotificationToken";
import { Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationsToken();
  });

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseNotificationListener.current =
      Notifications.addNotificationReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Se existir as fontes, carregue Home, caso contrário, carregue Loading. */}
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
