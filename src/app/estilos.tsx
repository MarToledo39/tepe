// Muestra de estilos: colores y tipografía de TEPE.
// En la fase 2 se convierte en el catálogo de componentes.

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, type } from '@/constants/tokens';

const neutrals = [
  { name: 'Texto principal', hex: colors.text },
  { name: 'Texto secundario', hex: colors.textSecondary },
  { name: 'Borde', hex: colors.border },
  { name: 'Superficie', hex: colors.surface },
  { name: 'Fondo', hex: colors.background },
];

export default function StylesScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={type.heading}>Puntos y fases</Text>
      <View style={styles.list}>
        {colors.phase.map((color, i) => (
          <View key={color} style={[styles.swatch, { backgroundColor: color }]}>
            <Text style={[type.label, { color: colors.onPhase }]}>Fase {i + 1}</Text>
            <Text style={[type.caption, { color: colors.onPhase }]}>{color}</Text>
          </View>
        ))}
      </View>

      <Text style={type.heading}>Personas</Text>
      <View style={styles.row}>
        {colors.person.map((color) => (
          <View key={color} style={styles.person}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={type.caption}>{color}</Text>
          </View>
        ))}
      </View>

      <Text style={type.heading}>Neutros</Text>
      <View style={styles.list}>
        {neutrals.map((n) => (
          <View key={n.name} style={styles.neutral}>
            <View style={[styles.dot, styles.bordered, { backgroundColor: n.hex }]} />
            <Text style={[type.label, styles.flex]}>{n.name}</Text>
            <Text style={type.caption}>{n.hex}</Text>
          </View>
        ))}
      </View>

      <Text style={type.heading}>Tipografía (Inter)</Text>
      <View style={styles.list}>
        <Text style={type.title}>Título · Bold 28</Text>
        <Text style={type.heading}>Encabezado · SemiBold 20</Text>
        <Text style={type.body}>Cuerpo · Regular 16</Text>
        <Text style={type.label}>Etiqueta · Medium 14</Text>
        <Text style={type.caption}>Nota · Regular 12</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.gutter,
    gap: spacing.lg,
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  swatch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.sm,
  },
  person: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  neutral: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  flex: {
    flex: 1,
  },
});
