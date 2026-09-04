import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { colors, radius, spacing, typography } from '../theme';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>Producto no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <View style={styles.media}>
        <Ionicons name="battery-charging-outline" size={90} color={colors.brand} />
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.specsBox}>
          {product.specs.map((s, idx) => (
            <View key={idx} style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={16} color={colors.volt} />
              <Text style={styles.specText}>{s}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.descTitle}>Descripción</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Cantidad</Text>
          <View style={styles.qtyControls}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
            >
              <Ionicons name="remove" size={18} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty((q) => q + 1)}>
              <Ionicons name="add" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            addItem(product, qty);
            navigation.navigate('Carrito');
          }}
        >
          <Text style={styles.addToCartText}>Agregar al carrito — ${(product.price * qty).toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  media: {
    height: 240,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: spacing.m },
  category: { fontSize: 12, color: colors.muted, marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 6 },
  price: { fontSize: 26, fontWeight: '800', color: colors.brand, marginBottom: spacing.m },
  specsBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.m,
    gap: 10,
    marginBottom: spacing.m,
  },
  specRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  specText: { color: colors.text, fontSize: 13.5, flex: 1 },
  descTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 6 },
  desc: { fontSize: 13.5, color: colors.muted, lineHeight: 20, marginBottom: spacing.l },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  qtyLabel: { fontSize: 14, color: colors.text, fontWeight: '600' },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: { fontSize: 16, fontWeight: '700', color: colors.text, minWidth: 20, textAlign: 'center' },
  addToCartBtn: {
    backgroundColor: colors.brand,
    borderRadius: radius.s,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addToCartText: { color: colors.bg, fontWeight: '700', fontSize: 15 },
});
