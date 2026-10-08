// Fila tocable que lleva a otra pantalla.
// Provisoria: en la fase 2 se reemplaza por los componentes definitivos (fila de tarea, tarjetas, etc.).

import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, type } from '@/constants/tokens';

type Props = {
  href: Href;
  title: string;
  subtitle?: string;
  // Color opcional del marcador a la izquierda (por ejemplo, el de la fase).
  markerColor?: string;
};

export function NavRow({ href, title, subtitle, markerColor }: Props) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(href)}
      accessibilityRole="link"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {markerColor && <View style={[styles.marker, { backgroundColor: markerColor }]} />}
      <View style={styles.texts}>
        <Text style={type.label}>{title}</Text>
        {subtitle && <Text style={type.caption}>{subtitle}</Text>}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  chevron: {
    ...type.heading,
    color: colors.textSecondary,
  },
});
