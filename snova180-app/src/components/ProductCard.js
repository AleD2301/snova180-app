import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';

export default function ProductCard({ product, onPress, onAdd }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.media}>
        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}
        <Ionicons name="battery-charging-outline" size={44} color={colors.brand} />
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.specs} numberOfLines={1}>
        {product.specs[0]}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={typography.price}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={(e) => {
            e.stopPropagation?.();
            onAdd(product);
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="add" size={20} color={colors.bg} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.m,
    margin: spacing.xs,
    gap: 6,
  },
  media: {
    aspectRatio: 1,
    backgroundColor: colors.surface2,
    borderRadius: radius.s,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.volt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: colors.bg },
  category: { fontSize: 11, color: colors.muted },
  title: { ...typography.productTitle },
  specs: { fontSize: 11, color: colors.muted },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
