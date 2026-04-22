import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  text: string;
  priority: 'baixa' | 'media' | 'alta';
  completed: boolean;
}

interface Block {
  id: number;
  duration: string;
  dimmed?: boolean;
}

const initialTasks: Task[] = [
  { id: '1', text: 'effe',          priority: 'media', completed: false },
  { id: '2', text: 'Editar',        priority: 'baixa', completed: false },
  { id: '3', text: 'Teste',         priority: 'media', completed: false },
  { id: '4', text: 'Teste',         priority: 'alta',  completed: false },
  { id: '5', text: 'Teste',         priority: 'baixa', completed: false },
  { id: '6', text: 'Guardar roupas', priority: 'media', completed: true },
  { id: '7', text: 'Mineração',      priority: 'alta',  completed: true },
  { id: '8', text: 'Teste',          priority: 'alta',  completed: true },
];

const initialBlocks: Block[] = [
  { id: 1, duration: '02:32:29' },
  { id: 2, duration: '00:21:45' },
  { id: 3, duration: '03:06:14' },
  { id: 4, duration: '00:02:54', dimmed: true },
];

export default function Trabalho() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [blocks] = useState<Block[]>(initialBlocks);

  useEffect(() => {
    let interval: any;
    if (isActive) interval = setInterval(() => setTime((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="grid grid-cols-12 gap-10 px-10 py-10 max-w-[1800px]">
        {/* LEFT — Timer + Blocks */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <h1 className="text-[32px] font-bold tracking-tight">Blocos de Trabalho</h1>

          {/* Timer card */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-[28px] p-10 flex flex-col items-center">
            <div className="w-16 h-16 mb-6">
              <RockSmall />
            </div>
            <div className="text-[56px] font-bold tracking-tight font-mono">{formatTime(time)}</div>
          </div>

          {/* Iniciar / Finalizar */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsActive(true)}
              className="px-10 py-3 bg-kinetic-orange text-black font-bold text-sm tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all"
            >
              INICIAR
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setTime(0);
              }}
              className="px-10 py-3 border-2 border-kinetic-orange text-kinetic-orange font-bold text-sm tracking-wider rounded-xl hover:bg-kinetic-orange/10 transition-all"
            >
              FINALIZAR
            </button>
          </div>

          {/* Blocks list */}
          <div className="space-y-4 pt-4">
            {blocks.map((b) => (
              <div
                key={b.id}
                className={cn(
                  'flex items-center justify-between px-8 py-5 rounded-2xl',
                  b.dimmed
                    ? 'bg-kinetic-orange/25 text-kinetic-orange/50'
                    : 'bg-kinetic-orange text-black'
                )}
              >
                <span className="text-xl font-bold tracking-tight">BLOCO #{b.id}</span>
                <span className="text-xl font-bold font-mono">{b.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE — Pendentes */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">PENDENTES</h3>
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
            {tasks.filter((t) => !t.completed).map((t) => (
              <TaskRow key={t.id} task={t} onToggle={() => toggleTask(t.id)} />
            ))}
          </div>
          <button className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-kinetic-orange hover:border-zinc-600 transition-all">
            + NOVA TAREFA
          </button>
        </div>

        {/* RIGHT — Concluídas */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">CONCLUÍDAS</h3>
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
            {tasks.filter((t) => t.completed).map((t) => (
              <TaskRow key={t.id} task={t} onToggle={() => toggleTask(t.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const priorityColor =
    task.priority === 'alta' ? 'text-red-500' :
    task.priority === 'media' ? 'text-kinetic-orange' : 'text-zinc-500';

  return (
    <div
      onClick={onToggle}
      className="flex items-center gap-3 px-5 py-3 border-b border-zinc-900 last:border-b-0 cursor-pointer hover:bg-zinc-900/30"
    >
      <div
        className={cn(
          'w-4 h-4 rounded border flex items-center justify-center shrink-0',
          task.completed ? 'bg-kinetic-orange border-kinetic-orange' : 'border-zinc-700'
        )}
      >
        {task.completed && (
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 6 L5 9 L10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={cn('flex-1 text-sm font-medium', task.completed && 'line-through text-zinc-600')}>
        {task.text}
      </span>
      <span className={cn('text-[10px] font-bold uppercase', priorityColor, task.completed && 'opacity-50')}>
        {task.priority}
      </span>
    </div>
  );
}

function RockSmall() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="ember-s" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#ffcc66" />
          <stop offset="40%" stopColor="#ff6a00" />
          <stop offset="100%" stopColor="#8a1a00" />
        </radialGradient>
        <linearGradient id="rock-s" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <path d="M50,70 L35,110 L45,150 L80,170 L130,165 L165,140 L170,95 L150,55 L110,40 L75,45 Z" fill="url(#rock-s)" />
      <path d="M85,90 L75,115 L90,140 L115,145 L135,125 L130,100 L115,85 Z" fill="url(#ember-s)" />
    </svg>
  );
}
