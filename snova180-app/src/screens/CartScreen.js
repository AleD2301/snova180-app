import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { colors, radius, spacing, typography } from '../theme';
import { sendOrderToWhatsApp } from '../utils/whatsapp';

export default function CartScreen() {
  const { items, setQuantity, removeItem, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={48} color={colors.muted} />
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.product.id}
        contentContainerStyle={{ padding: spacing.m, gap: spacing.s }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowMedia}>
              <Ionicons name="battery-charging-outline" size={26} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.rowPrice}>${item.product.price.toFixed(2)}</Text>
              <View style={styles.qtyControls}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(item.product.id, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={16} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(item.product.id, item.quantity + 1)}
                >
                  <Ionicons name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.product.id)} hitSlop={{top:8,bottom:8,left:8,right:8}}>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => sendOrderToWhatsApp(items, totalPrice)}
        >
          <Ionicons name="logo-whatsapp" size={18} color={colors.bg} />
          <Text style={styles.checkoutText}>Coordinar pedido por WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearCart} style={{ marginTop: 10 }}>
          <Text style={styles.clearText}>Vaciar carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  emptyContainer: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyText: { color: colors.muted, fontSize: 14 },
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.m,
    alignItems: 'center',
  },
  rowMedia: {
    width: 52,
    height: 52,
    borderRadius: radius.s,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { fontSize: 13.5, fontWeight: '700', color: colors.text },
  rowPrice: { fontSize: 13, color: colors.muted, marginTop: 2, marginBottom: 6 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: { color: colors.text, fontWeight: '700', minWidth: 16, textAlign: 'center' },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    padding: spacing.m,
    backgroundColor: colors.surface,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.m },
  totalLabel: { fontSize: 14, color: colors.muted },
  totalValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  checkoutBtn: {
    backgroundColor: '#25D366',
    borderRadius: radius.s,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkoutText: { color: '#052E14', fontWeight: '700', fontSize: 14.5 },
  clearText: { color: colors.muted, fontSize: 12.5, textAlign: 'center' },
});
