// 08 Página del TP: alterna entre Tareas (con el filtro Todas / Mías) y Cronograma.
// El selector es provisorio: el definitivo, con la diagonal a 45°, llega en la fase 2.

import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavRow } from '@/components/nav-row';
import { colors, radius, spacing, type } from '@/constants/tokens';
import { currentUser, findTp } from '@/data/demo';

type Section = 'tareas' | 'cronograma';
type Filter = 'todas' | 'mias';

export default function TpScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tp = findTp(id);
  const [view, setView] = useState<Section>('tareas');
  const [filter, setFilter] = useState<Filter>('todas');

  if (!tp) {
    return (
      <View style={styles.content}>
        <Text style={type.body}>No encontramos este TP.</Text>
      </View>
    );
  }

  const tasks = filter === 'mias' ? tp.tasks.filter((t) => t.assignee === currentUser) : tp.tasks;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: tp.name }} />
      <Text style={type.caption}>{tp.subject}</Text>

      <Segmented
        options={[
          { value: 'tareas', label: 'Tareas' },
          { value: 'cronograma', label: 'Cronograma' },
        ]}
        value={view}
        onChange={setView}
      />

      {view === 'tareas' ? (
        <>
          <Segmented
            options={[
              { value: 'todas', label: 'Todas' },
              { value: 'mias', label: 'Mías' },
            ]}
            value={filter}
            onChange={setFilter}
          />
          <View style={styles.list}>
            {tasks.map((task) => (
              <NavRow
                key={task.id}
                href={{ pathname: '/tp/[id]/tarea/[tareaId]', params: { id: tp.id, tareaId: task.id } }}
                title={task.title}
                subtitle={`${task.assignee} · ${task.status}`}
                markerColor={colors.phase[task.phase - 1]}
              />
            ))}
            {tasks.length === 0 && <Text style={type.caption}>No tenés tareas en este TP.</Text>}
          </View>
        </>
      ) : (
        <View style={styles.list}>
          <Text style={type.caption}>Acá va el calendario con las fases (fase 3).</Text>
          {tp.phases.map((phase, i) => (
            <View key={phase} style={[styles.phase, { backgroundColor: colors.phase[i] }]}>
              <Text style={[type.label, { color: colors.onPhase }]}>
                Fase {i + 1}: {phase}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// Selector de dos o más opciones (provisorio).
function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segmented}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.segment, selected && styles.segmentSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected }}>
            <Text style={[type.label, !selected && { color: colors.textSecondary }]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
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
  segmented: {
    flexDirection: 'row',
    padding: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  segmentSelected: {
    backgroundColor: colors.background,
  },
  phase: {
    padding: spacing.md,
    borderRadius: radius.sm,
  },
});
