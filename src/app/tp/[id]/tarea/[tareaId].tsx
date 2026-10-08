// 09 Tarea: por ahora muestra los datos básicos. Se completa en la fase 3.

import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { spacing, type } from '@/constants/tokens';
import { findTp } from '@/data/demo';

export default function TaskScreen() {
  const { id, tareaId } = useLocalSearchParams<{ id: string; tareaId: string }>();
  const tp = findTp(id);
  const task = tp?.tasks.find((t) => t.id === tareaId);

  if (!tp || !task) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={type.body}>No encontramos esta tarea.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Tarea' }} />
      <Text style={type.title}>{task.title}</Text>
      <Text style={type.body}>Responsable: {task.assignee}</Text>
      <Text style={type.body}>Estado: {task.status}</Text>
      <Text style={type.body}>
        Fase {task.phase}: {tp.phases[task.phase - 1]}
      </Text>
      <Text style={type.caption}>Historial, comentarios y cambio de estado llegan en la fase 3.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.gutter,
    gap: spacing.md,
  },
});
