// Datos de prueba para navegar la app sin servidor (fases 1 a 3).

export type TaskStatus = 'pendiente' | 'en curso' | 'trabada' | 'en revisión' | 'hecha';

export type Task = {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  // Número de fase (empieza en 1); define el color.
  phase: number;
};

export type Tp = {
  id: string;
  name: string;
  subject: string;
  phases: string[];
  tasks: Task[];
};

// Quién está usando la app en la demo (para el filtro "Mías").
export const currentUser = 'Mar';

export const tps: Tp[] = [
  {
    id: 'tp-historia',
    name: 'TP 2: Revolución Industrial',
    subject: 'Historia Social',
    phases: ['Investigación', 'Redacción', 'Revisión final'],
    tasks: [
      { id: 't1', title: 'Armar la línea de tiempo', assignee: 'Mar', status: 'en curso', phase: 1 },
      { id: 't2', title: 'Buscar tres fuentes primarias', assignee: 'Tomás', status: 'pendiente', phase: 1 },
      { id: 't3', title: 'Corregir el formato de las citas', assignee: 'Mar', status: 'pendiente', phase: 3 },
    ],
  },
  {
    id: 'tp-diseno',
    name: 'Prototipo de app',
    subject: 'Diseño de Interfaces',
    phases: ['Relevamiento', 'Wireframes', 'Prototipo'],
    tasks: [
      { id: 't1', title: 'Entrevistar a dos usuarios', assignee: 'Lucía', status: 'hecha', phase: 1 },
      { id: 't2', title: 'Dibujar los wireframes', assignee: 'Mar', status: 'trabada', phase: 2 },
      { id: 't3', title: 'Preparar la presentación', assignee: 'Tomás', status: 'pendiente', phase: 3 },
    ],
  },
];

export function findTp(id: string | undefined) {
  return tps.find((tp) => tp.id === id);
}
