// A6 Inicio: la lista de TPs. Desde acá se entra a cada TP y al resto de la app.

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavRow } from '@/components/nav-row';
import { spacing, type } from '@/constants/tokens';
import { tps } from '@/data/demo';

export default function HomeScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={type.title}>Mis TPs</Text>

      <View style={styles.list}>
        {tps.map((tp) => (
          <NavRow
            key={tp.id}
            href={{ pathname: '/tp/[id]', params: { id: tp.id } }}
            title={tp.name}
            subtitle={`${tp.subject} · ${tp.tasks.length} tareas`}
          />
        ))}
      </View>

      <Text style={[type.heading, styles.section]}>Más</Text>
      <View style={styles.list}>
        <NavRow href="/perfil" title="Perfil" />
        <NavRow href="/ayuda" title="Ayuda" />
        <NavRow href="/estilos" title="Muestra de estilos" subtitle="Colores y tipografía de TEPE" />
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
  section: {
    marginTop: spacing.lg,
  },
});
