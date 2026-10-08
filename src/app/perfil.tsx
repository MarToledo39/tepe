// A7 Perfil: vacía por ahora. Se arma en la fase 3.

import { ScrollView, StyleSheet, Text } from 'react-native';

import { spacing, type } from '@/constants/tokens';
import { currentUser } from '@/data/demo';

export default function ProfileScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={type.title}>{currentUser}</Text>
      <Text style={type.caption}>El perfil se arma en la fase 3.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.gutter,
    gap: spacing.md,
  },
});
