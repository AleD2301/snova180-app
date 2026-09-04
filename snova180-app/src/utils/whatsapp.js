import { Linking, Alert } from 'react-native';

// TODO: reemplaza este número por el número real de WhatsApp Business de S'Nova 180,
// en formato internacional sin "+" ni espacios (ej: 521XXXXXXXXXX).
export const WHATSAPP_NUMBER = '00000000000';

export function buildOrderMessage(items, totalPrice) {
  const lines = [
    'Hola, quiero hacer un pedido en S\u2019Nova 180:',
    '',
    ...items.map(
      (i) =>
        `• ${i.quantity} x ${i.product.name} — $${(i.product.price * i.quantity).toFixed(2)}`
    ),
    '',
    `Total estimado: $${totalPrice.toFixed(2)}`,
    '',
    'Quedo al pendiente de la confirmación y el método de pago. ¡Gracias!',
  ];
  return lines.join('\n');
}

export async function sendOrderToWhatsApp(items, totalPrice) {
  const message = buildOrderMessage(items, totalPrice);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      'No se pudo abrir WhatsApp',
      'Verifica que WhatsApp esté instalado en este dispositivo.'
    );
  }
}
