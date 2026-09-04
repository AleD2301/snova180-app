import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { colors, spacing, typography } from '../theme';
import ProductCard from '../components/ProductCard';

export default function CatalogScreen({ navigation }) {
  const { addItem, totalItems } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.brand}>S'NOVA 180</Text>
            <Text style={styles.tagline}>Tecnología sin vueltas</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Carrito')}
        >
          <Ionicons name="cart-outline" size={24} color={colors.text} />
          {totalItems > 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Catálogo</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Producto', { productId: item.id })}
            onAdd={(p) => addItem(p, 1)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: spacing.l },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 34, height: 34, borderRadius: 8 },
  brand: { fontSize: 16, fontWeight: '800', color: colors.text, letterSpacing: -0.3 },
  tagline: { fontSize: 11, color: colors.muted },
  cartBtn: { padding: 6 },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.volt,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: { fontSize: 10, fontWeight: '700', color: colors.bg },
  sectionTitle: {
    ...typography.title,
    fontSize: 20,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.s,
  },
  grid: { paddingHorizontal: spacing.xs, paddingBottom: spacing.xl },
});
