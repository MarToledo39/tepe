// C1 Ayuda: vacía por ahora. Los artículos llegan en la fase 3.

import { ScrollView, StyleSheet, Text } from 'react-native';

import { spacing, type } from '@/constants/tokens';

export default function HelpScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={type.title}>Ayuda</Text>
      <Text style={type.caption}>Los artículos (por ejemplo, "Qué hace la IA y qué no") llegan en la fase 3.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.gutter,
    gap: spacing.md,
  },
});
