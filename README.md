# TEPE

App móvil para que los grupos de estudio organicen sus trabajos prácticos (TPs): ordena la consigna, reparte las tareas y hace visible el avance de cada integrante.

La IA solo organiza y estructura el trabajo. Nunca resuelve el contenido del TP, y todo lo que propone lo revisa una persona antes de publicarse.

## Estado

Fase 1 terminada: proyecto base con navegación, colores y tipografía. El plan completo por fases está en [`CLAUDE.md`](CLAUDE.md).

## Cómo correrlo

Hace falta Node 22.13 o más y una cuenta de Expo (Expo Go en iPhone pide iniciar sesión).

```bash
npm install
npx expo login
npx expo start
```

Escaneá el código QR con la cámara del iPhone para abrir la app en Expo Go. El celular y la compu tienen que estar en la misma red Wi-Fi.

## Estructura

- `src/app/`: las pantallas. Cada archivo es una pantalla (Expo Router).
- `src/constants/tokens.ts`: colores, tipografía, espaciados y radios.
- `src/data/demo.ts`: datos de prueba para navegar sin servidor.
- `assets/`: marca, avatares e íconos de estado.

## Tecnología

- **App:** Expo SDK 57 (React Native), para iOS, Android y web.
- **Servidor:** Supabase (base de datos, login, funciones y tareas programadas).
- **Mails:** Resend.
- **IA:** un modelo de lenguaje para el borrador del plan y Jev (TypeSafe) para decisiones tipadas.

## Diseño

Proyecto de portfolio de Mar. Diseño en Figma, inspirado en Notion, con tipografía Inter.
