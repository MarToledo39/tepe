# TEPE — asistente para organizar trabajos prácticos grupales

App móvil para que los grupos de estudio organicen sus trabajos prácticos (TPs). Es un proyecto personal de Mar para su portfolio: primero tiene que funcionar como demo completa y navegable, y después como app real.

**El problema que resuelve:** en los grupos siempre hay alguien que no trabaja, alguien que se olvida y alguien que hace mal las cosas. TEPE ordena la información, reparte el trabajo y hace visible el avance de cada persona.

---

## Cómo trabajar con Mar

- **Siempre en español rioplatense, con voseo.** Mar no entiende inglés: los mensajes, las explicaciones, los comentarios en el código y los mensajes de commit van en español. Los nombres de variables y funciones pueden ir en inglés.
- Explicá sin jerga. Si un término técnico es inevitable, aclaralo en una línea.
- **Antes de ejecutar algo grande, proponé un plan y esperá su ok.** Trabajamos de a una fase por vez (ver "Plan por fases").
- Si tenés dudas, preguntá **de a una pregunta por vez**, no en bloque.
- **Verificá la información técnica** (versiones, precios, límites, APIs) en la documentación oficial antes de afirmarla. No contestes de memoria.
- Dale feedback crítico y señalá errores, contradicciones o riesgos directamente, de a uno por vez. No le des la razón si no tiene fundamento.
- Al terminar cada paso: decí qué quedó hecho, cómo probarlo en el celular y guardá una versión en Git con un commit descriptivo.

---

## Reglas de la IA (no negociables)

1. **La IA organiza y estructura. Nunca responde ni resuelve el contenido del TP.** No escribe, no resume, no investiga, no contesta las preguntas de la consigna.
2. **Nada que genere la IA se publica sin revisión humana.** El plan llega como borrador y el reparto como propuesta. Lo publica el coordinador o un editor.
3. Toda salida de la IA es **estructurada** (listas, tareas, fechas), nunca texto libre para el usuario.
4. Hay que minimizar tokens: los recordatorios se resuelven con **reglas de código, sin IA**.

### Arquitectura de IA

- **Modelo de lenguaje barato** (a definir con una prueba en español entre GPT-5.6 Luna y DeepSeek Flash): lee la consigna y genera el borrador del plan (puntos, tareas, fases y fechas) en JSON con un esquema fijo. Se llama **una vez por TP**, o cuando se pide regenerar.
- **Jev (TypeSafe, System One):** no genera texto, solo devuelve decisiones tipadas (Choice, Score y Noul).
  - **Verificación:** para cada tarea generada, un Noul del tipo "¿esta tarea contiene contenido que responde la consigna?". Las que den positivo se reescriben o se marcan para revisión.
  - **Carga:** un Score por tarea (baja, media o alta) para repartir de forma pareja.
  - **Reparto con IA:** el código reparte usando las preferencias y la carga de cada tarea. Jev aporta los puntajes; las reglas de equidad están en el código.
  - Hay una skill oficial (`typesafe-ai`) y documentación en https://docs.typesafe.ai/llms.txt. **Leela antes de integrar.**
- **Riesgo conocido:** el SDK de JavaScript (`@typesafe-ai/sdk`) pide Node 20 o más. Si las funciones de servidor no corren en Node (por ejemplo, Supabase Edge Functions corre en Deno), llamar directo a la API HTTP: `POST https://api.typesafe.ai/v1/systemone`. Verificar antes de elegir.
- **Plan B:** si Jev no está disponible, las mismas decisiones las hace el modelo de lenguaje con salida JSON. El diseño no tiene que depender de Jev.
- Las claves de las IAs viven **solo en el servidor**, nunca dentro de la app.

### Consigna

- Se carga **pegando texto** (opción principal) o **subiendo un PDF**.
- El PDF se convierte a Markdown **en el servidor, sin IA** (por ejemplo, con `@opendocsg/pdf2md`). Todas las IAs trabajan siempre sobre ese Markdown.
- Si el PDF no tiene texto (es una imagen escaneada), se muestra un aviso y se pide pegar el texto. **No se usa IA para leer imágenes.**
- Después de convertir, el coordinador ve el texto, lo puede **editar en el momento** y lo confirma antes de seguir.

---

## Funcionamiento

### Estructura
- **Cada TP es independiente**, con sus propios integrantes. No hay "grupos" que agrupen varios TPs.
- Al invitar, se muestran los **compañeros recientes** (gente con la que ya hiciste otros TPs) para sumarlos con un toque.
- Jerarquía al estilo Notion: **TP → punto → tarea**, con páginas anidadas, propiedades visibles y varias vistas de los mismos datos.

### Roles (como en Google Drive)
| Rol | Puede |
|---|---|
| **Coordinador** | Quien crea el TP. Todo lo del editor, y además maneja roles, recordatorios y archivar el TP. |
| **Editor** | Edita todo: plan, puntos, tareas, fechas, asignaciones y links. |
| **Colaborador** | **Rol por defecto al entrar.** Solo cambia el estado de **sus** tareas y comenta. |
| **Lector** | Solo ve. Pensado para el docente. |

- Los permisos se controlan **en el servidor** (con políticas de la base de datos), no solo ocultando botones.
- La app es una herramienta interna del grupo. Al docente se lo invita como lector, y como colaborador si hace falta.

### Estados de una tarea
`pendiente` · `en curso` · `trabada` · `en revisión` · `hecha`, más **`vencida`**, que es una marca **automática** cuando pasa la fecha y la tarea no está hecha. Nadie la elige.
- "En revisión" es informativo: no bloquea ni requiere aprobación.
- Cada tarea tiene un **historial** del tipo "Tomás la marcó como hecha · mié 14, 19:02".
- Después de cambiar un estado aparece un aviso con **Deshacer**.

### Crear un TP (flujo)
1. Nombre y materia.
2. Integrantes (se puede hacer después).
3. Consigna (texto o PDF) y su revisión.
4. **Cuestionario fijo**, una pregunta por pantalla:
   1. Fechas de inicio y entrega (precargadas si la consigna las trae).
   2. Tipo de entrega: escrito, presentación oral, audiovisual, pieza gráfica o prototipo, u otro.
   3. Entregas intermedias (sí o no, y fechas).
   4. Organización principal: por puntos o por fases.
   5. Nivel de detalle: pocas tareas grandes o muchas chicas.
   6. Reparto: con IA o manual.
   7. Días de reunión (opcional).
   8. Observaciones (opcional, texto libre).
5. Generando el plan (o error, con Reintentar y Revisar la consigna).
6. **Borrador** con tareas y cronograma. Solo lo ven el coordinador y los editores. Se edita y se publica.

### Puntos y fases
- **Cada tarea pertenece a un punto de la consigna y a una fase del cronograma.**
- La respuesta "por puntos o por fases" del cuestionario define la **vista principal**. La otra queda como vista secundaria, y el calendario con las fases existe siempre.

### Reparto
- **Manual:** se asigna tarea por tarea, mostrando cuántas tareas tiene cada persona.
- **Con IA:** cada integrante elige **hasta 5 tareas preferidas**. El reparto no arranca solo: espera a que respondan todos. El coordinador o un editor puede tocar **"Repartir ahora"**, que reparte de forma equitativa respetando las preferencias de quienes respondieron y asignando lo que queda a quienes no.
- El resultado es una **propuesta** que solo ven el coordinador y los editores. Se publica con "Confirmar reparto".

### Recordatorios por mail (solo los configura el coordinador)
Cada regla se puede activar o desactivar, y para cada una se elige el destinatario: solo la persona asignada, la persona y el coordinador, o todo el grupo.
| Regla | Por defecto |
|---|---|
| Vence en 48 h y sigue pendiente | Solo la persona asignada |
| Tarea vencida | Solo la persona asignada |
| Fase por terminar con tareas sin hacer | Todo el grupo |
| Resumen semanal | Todo el grupo |

Se resuelve con una tarea programada diaria y reglas de código, **sin IA**.

### Links del trabajo
La app no guarda el trabajo en sí: lo enlaza. Cada TP tiene un **link principal** (el botón "Ir al trabajo") y una lista de **otros links**. La app reconoce el servicio por el dominio y muestra su ícono. Los editan el coordinador y los editores.

### Ayuda
Botón "?" en las pantallas más complejas y una sección de ayuda con artículos (por ejemplo, "Qué hace la IA y qué no").

---

## Sistema visual

- **Diseño:** neutral sobre frame de iPhone (393 × 852), inspirado en Notion: minimalista, mucho blanco, tipografía protagonista, con color solo donde distingue algo.
- **Tipografía:** Inter.
- **Archivo de Figma:** https://www.figma.com/design/quY3gdfsSPzM0rKARvtSP2. Tiene las páginas `Wireframes` y `Alta fidelidad`, con prototipo navegable. El conector de Figma de Mar está limitado (20 llamadas por mes en su plan): usalo poco y priorizá las capturas que te pase.

### Colores
**Fases y puntos** (pasteles; el color identifica el punto o la fase, nunca el estado ni la persona). Color 1 = punto/fase 1, y así:
`#F8B094` · `#FF83A4` · `#B262AA` · `#8D74B7` · `#5195C4`
- El texto sobre estos colores va en **negro puro `#000000`**, que da un contraste de 5:1 o más en los cinco.

**Personas** (solo avatares; versión saturada de la paleta):
`#F7875B` · `#F34472` · `#D53FC6` · `#8556D4` · `#1E9DF6`

**Neutros** (levemente azulados):
| Uso | Color |
|---|---|
| Texto principal | `#131B28` |
| Texto secundario | `#666E7B` |
| Borde | `#D9E1EE` |
| Superficie | `#E9F1FE` (confirmado por Mar) |
| Fondo | `#FFFFFF` |

### Diagonal (recurso gráfico de la marca)
- **Siempre a 45°**, el mismo ángulo del isotipo: el corte horizontal es igual a la altura de la pieza.
- **Se usa en:** el cronograma (las fases encastran como las piezas del logo), los marcadores de color de puntos y fases, la **pieza seleccionada** de los selectores (el contenedor queda redondeado y la pieza seleccionada corta a 45° hacia las otras opciones), la carga y la paginación.
- **No se usa en** botones ni tarjetas. No abusar del recurso.

### Avatares
- Forma abstracta con dos ojitos, generada a partir del ID de cada usuario, **siempre la misma** en todas las pantallas y dispositivos.
- 4 formas (`assets/avatares/`) × 5 colores de personas = 20 combinaciones. Elegir con un hash estable del ID. Siempre con el nombre al lado.

### Estados
Íconos con **forma distinta** para cada estado (`assets/iconos/`), nunca solo color.

---

## Tecnología (propuesta; verificar versiones al empezar)

- **App:** Expo (React Native), un solo código para iOS, Android y web. Se prueba en el celular con Expo Go. Para publicar en la App Store hace falta una cuenta paga de Apple Developer (no es necesaria para el portfolio).
- **Servidor:** Supabase: base de datos Postgres, login (mail; Google pendiente de confirmar), funciones de servidor y tareas programadas.
  - Plan gratis: **el proyecto se pausa después de 1 semana sin uso.** Hay que tenerlo en cuenta para la demo del portfolio.
- **Mails:** Resend. Plan gratis de 3.000 por mes y 100 por día. **Sin un dominio propio verificado solo envía a la dirección de la cuenta**, así que para mandarle mails al grupo hace falta un dominio.
- **Git + GitHub** desde el primer día.

### Datos (borrador)
`perfiles` · `tps` · `integrantes` (tp, persona, rol) · `invitaciones` · `puntos` · `fases` · `tareas` (punto, fase, responsable, estado, fecha, carga) · `preferencias` · `comentarios` · `historial` · `links` · `reglas_recordatorio` · `consignas` (texto Markdown confirmado)

---

## Pantallas (mismos códigos que en Figma)

**Flujo central:** 01 Datos · 02 Integrantes · 03 Consigna · 03b PDF sin texto · 04 Revisión de consigna · 05 Cuestionario · 06 Generando · 07 Borrador por puntos · 07b Borrador por fases · 08 Página del TP (por puntos) · 08b Cronograma · 08c Vista mes · 08d Mías · 08e Menú ··· · 08f Cambiar estado · 08g Aviso con Deshacer · 09 Tarea

**Acceso y gestión:** A1 Carga · A2 Presentación · A3 Crear cuenta · A4 Inicio de sesión · A5 Aceptar invitación · A6 Inicio · A7 Perfil · B1 Integrantes y roles · B2 Recordatorios · C1 Ayuda · C2 Artículo

**Reparto, links y estados:** R1 Elegir preferencias · R2 Propuesta de reparto · R3 Reparto manual · R3b Asignar a… · L1 Links del trabajo · E1 Inicio vacío · E2 Mías sin tareas · E3 Error al armar el plan

---

## Plan por fases

Una fase por sesión. Cada una termina cuando se puede probar en el celular y queda guardada en Git.

0. **Preparación:** Node LTS, Expo Go en el iPhone, cuenta de GitHub y repositorio, proyecto en Supabase, claves de TypeSafe y del modelo de lenguaje.
1. **Proyecto base:** crear el proyecto Expo, la navegación y los colores y la tipografía como variables (tokens).
2. **Componentes:** botón, chip, campo, fila de tarea, selector con diagonal, marcador diagonal, pipeline de fases, avatar generado, íconos de estado y aviso con Deshacer.
3. **Todas las pantallas con datos de prueba.** La app completa navegable, sin servidor. Esto ya es la demo de portfolio.
4. **Base de datos, login y permisos por rol** (políticas en la base de datos).
5. **Invitaciones** por mail, con link que abre la app.
6. **IA:** conversión de PDF a Markdown, generación del borrador, verificación con Jev, carga y reparto.
7. **Recordatorios:** tarea programada diaria más Resend (requiere dominio).
8. **Prueba con un TP real**, con estados de error y vacíos.
9. **Publicación para portfolio:** versión web con link y un video del flujo.

---

## Pendiente de decidir (preguntarle a Mar cuando llegue el momento)

- Qué pasa con los colores cuando un TP tiene más de 5 puntos o fases: ¿se repiten desde el primero o se usan variantes más claras?
- ¿Se mantiene el login con Google o solo mail?
- Qué modelo de lenguaje se usa (probar Luna y DeepSeek Flash con una consigna real).
- Dominio para los mails.

## Recursos en esta carpeta
- `assets/marca/`: isotipo y logotipo de TEPE (SVG).
- `assets/avatares/`: las 4 formas. Usan `currentColor` para el cuerpo; los ojos van en `#131B28`.
- `assets/iconos/`: íconos de los 5 estados (usan `currentColor`).
