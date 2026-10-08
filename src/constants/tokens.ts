// Tokens de diseño de TEPE: colores, tipografía, espaciados y radios.
// Todas las pantallas y componentes toman los valores de acá, así un cambio se hace en un solo lugar.

import type { TextStyle } from 'react-native';

export const colors = {
  // Puntos y fases (pasteles). El color identifica el punto o la fase, nunca el estado ni la persona.
  // Color 1 = punto/fase 1, y así.
  // Pendiente con Mar: qué pasa cuando un TP tiene más de 5 puntos o fases.
  phase: ['#F8B094', '#FF83A4', '#B262AA', '#8D74B7', '#5195C4'],
  // Texto sobre los pasteles: negro puro (contraste de 5:1 o más en los cinco).
  onPhase: '#000000',

  // Personas: solo para avatares (versión saturada de la paleta).
  person: ['#F7875B', '#F34472', '#D53FC6', '#8556D4', '#1E9DF6'],

  // Neutros (levemente azulados).
  text: '#131B28',
  textSecondary: '#666E7B',
  border: '#D9E1EE',
  surface: '#E9F1FE',
  background: '#FFFFFF',
} as const;

// Nombres con los que se registran los pesos de Inter (ver src/app/_layout.tsx).
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

// Estilos de texto listos para usar: <Text style={type.body}>.
export const type = {
  title: { fontFamily: fonts.bold, fontSize: 28, lineHeight: 34, color: colors.text },
  heading: { fontFamily: fonts.semibold, fontSize: 20, lineHeight: 26, color: colors.text },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 22, color: colors.text },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.text },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, color: colors.textSecondary },
} satisfies Record<string, TextStyle>;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  // Margen lateral de las pantallas.
  gutter: 16,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;
