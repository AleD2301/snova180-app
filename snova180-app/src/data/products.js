// Catálogo inicial de S'Nova 180.
// Reemplaza o conecta esto a tu sistema de facturación (API) cuando esté listo.
// Cada producto necesita: id, nombre, categoria, precio, specs (array corto), descripcion, imagen (opcional, ver README).

export const PRODUCTS = [
  {
    id: 'ups-10400',
    name: 'Mini UPS 10,400 mAh',
    category: 'Respaldo de energía',
    price: 50.0,
    specs: ['10,400 mAh', 'Salida 5V/9V/12V/15V/24V', 'Para enrutador, módem, POE, cámara, Raspberry Pi'],
    description:
      'Batería de respaldo Mini UPS de 10,400 mAh. Fuente de alimentación ininterrumpida con salida multivoltaje (5V/9V/12V/15V/24V), ideal para enrutador, módem, dispositivos POE, cámaras de seguridad y Raspberry Pi.',
    badge: null,
  },
  {
    id: 'ups-20000',
    name: 'Mini UPS 20,000 mAh',
    category: 'Respaldo de energía',
    price: 70.0,
    specs: ['20,000 mAh', 'Protección de 6 vías', 'Multivoltaje 5V/9V/12V · 100-240V'],
    description:
      'Batería de respaldo Mini UPS de 20,000 mAh para enrutador y cámara de seguridad. Fuente de alimentación ininterrumpida con protección de 6 vías y salida multivoltaje de 5V/9V/12V (entrada 100-240V).',
    badge: 'Más vendido',
  },
  {
    id: 'ups-4050',
    name: 'Mini UPS 4,050 mAh',
    category: 'Respaldo de energía',
    price: 42.0,
    specs: ['4,050 mAh', 'Salida 3A', 'Uso doméstico'],
    description:
      'Mini UPS de 4,050 mAh con salida de 3A. Fuente de alimentación ininterrumpida compacta para enrutador, módem, cámara de seguridad y más — ideal para uso doméstico.',
    badge: null,
  },
];
