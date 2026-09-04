import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CartProvider } from './src/context/CartContext';
import { colors } from './src/theme';
import CatalogScreen from './src/screens/CatalogScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.line,
    primary: colors.brand,
  },
};

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" backgroundColor={colors.bg} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.text,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen
            name="Catálogo"
            component={CatalogScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Producto" component={ProductDetailScreen} />
          <Stack.Screen name="Carrito" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
