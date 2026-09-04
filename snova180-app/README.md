# S'Nova 180 — App móvil

App de catálogo + carrito para S'Nova 180, hecha en **React Native con Expo** (un solo código para iOS y Android).
El checkout no cobra en línea: arma el pedido y lo envía por WhatsApp para que tú lo confirmes con tu sistema de facturación.

## 1. Antes de empezar (una sola vez)

Instala en tu computadora:
- [Node.js](https://nodejs.org) (versión 18 o más reciente)
- Una cuenta gratuita en [expo.dev](https://expo.dev)
- La app **Expo Go** en tu celular (para probar sin cables ni compilar nada)

## 2. Configurar tu número de WhatsApp

Abre `src/utils/whatsapp.js` y cambia esta línea por tu número real, en formato internacional sin "+" ni espacios:

```js
export const WHATSAPP_NUMBER = '00000000000'; // ej: 521XXXXXXXXXX
```

## 3. Probar la app en tu celular

```bash
npm install
npx expo start
```

Se abrirá un código QR en la terminal. Escanéalo con la app **Expo Go** (Android) o la cámara (iPhone) y la app cargará en tu celular al instante. Cada vez que edites el código, se actualiza sola.

## 4. Editar tu catálogo

Todo el catálogo vive en `src/data/products.js`. Agrega, quita o edita productos ahí — no necesitas tocar nada más.

Cuando quieras conectar la app a tu sistema de facturación (para que el catálogo se actualice solo), lo ideal es que ese sistema exponga una API o un endpoint que la app pueda consultar; si me dices qué sistema es exactamente, te ayudo a armar esa conexión.

## 5. Publicar en Google Play y App Store

Esto lo haces con **EAS Build**, el servicio de Expo que compila la app en la nube (no necesitas Mac ni Android Studio).

### 5.1 Crea las cuentas de desarrollador (si aún no las tienes)
- **Google Play Console**: [play.google.com/console](https://play.google.com/console) — pago único de $25 USD.
- **Apple Developer Program**: [developer.apple.com/programs](https://developer.apple.com/programs) — $99 USD/año.

### 5.2 Instala EAS CLI y compila

```bash
npm install -g eas-cli
eas login
eas build:configure
```

Para generar el instalable de Android (.aab, listo para subir a Play Console):
```bash
eas build --platform android
```

Para generar el instalable de iOS (.ipa, listo para subir a App Store Connect):
```bash
eas build --platform ios
```

EAS te guía paso a paso (incluyendo la generación automática de certificados de firma). Al terminar, te da un link de descarga del archivo compilado.

### 5.3 Enviar a las tiendas

```bash
eas submit --platform android
eas submit --platform ios
```

Esto sube el build directamente a Play Console / App Store Connect. Desde ahí completas la ficha de la tienda: capturas de pantalla, descripción, categoría y **política de privacidad** (obligatoria en ambas tiendas — cuéntame si quieres que te ayude a redactarla).

## 6. Íconos y splash

Ya incluidos en `/assets` (icon.png, adaptive-icon.png, splash-icon.png, favicon.png), generados a partir del logo de S'Nova 180. Si quieres una versión distinta, dímelo y los regenero.

## Estructura del proyecto

```
snova180-app/
├── App.js                  # Navegación y providers
├── app.json                 # Config de Expo (nombre, íconos, bundle id)
├── assets/                  # Íconos y splash
└── src/
    ├── theme.js              # Colores y estilos de marca
    ├── data/products.js      # Catálogo (edítalo aquí)
    ├── context/CartContext.js
    ├── utils/whatsapp.js     # Número de WhatsApp + mensaje de pedido
    ├── components/ProductCard.js
    └── screens/
        ├── CatalogScreen.js
        ├── ProductDetailScreen.js
        └── CartScreen.js
```
