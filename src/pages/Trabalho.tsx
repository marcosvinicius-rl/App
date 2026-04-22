import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Square, CheckCircle2, Clock, Plus, Bell, User, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  text: string;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  completed: boolean;
}

export default function Trabalho() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tasks] = useState<Task[]>([
    { id: '1', text: 'effe', priority: 'MEDIA', completed: false },
    { id: '2', text: 'Editar', priority: 'BAIXA', completed: false },
    { id: '3', text: 'Teste', priority: 'MEDIA', completed: false },
    { id: '4', text: 'Teste', priority: 'ALTA', completed: false },
    { id: '5', text: 'Teste', priority: 'BAIXA', completed: false },
    { id: '6', text: 'Guardar roupas', priority: 'MEDIA', completed: true },
    { id: '7', text: 'Mineração', priority: 'ALTA', completed: true },
    { id: '8', text: 'Teste', priority: 'ALTA', completed: true },
  ]);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black min-h-screen">
      <header className="px-12 py-8 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-20">
         <div className="flex items-center gap-4">
            <h2 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">PRODUTIVIDADE</h2>
         </div>
      </header>

      <div className="p-12 space-y-12 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-12 gap-12">
          {/* Main Content: Timer & Blocks */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
             <h1 className="text-5xl font-black tracking-tight text-white">Blocos de Trabalho</h1>

             <div className="bg-zinc-950 border border-zinc-900 rounded-[40px] p-20 text-center relative overflow-hidden space-y-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,0,0.05),transparent_70%)]" />
                
                <div className="relative">
                   <div className="w-32 h-32 mx-auto relative mb-8">
                     <img 
                       src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&q=80" 
                       alt="Kinetic Asset" 
                       className="w-full h-full object-contain filter hue-rotate-[320deg] contrast-150 drop-shadow-[0_0_20px_rgba(255,106,0,0.5)]"
                     />
                   </div>
                   <div className="text-[160px] font-black tracking-[-0.05em] leading-none text-white font-mono drop-shadow-2xl">
                      {formatTime(time)}
                   </div>
                </div>

                <div className="flex justify-center gap-8 relative z-10">
                   <button 
                     onClick={() => setIsActive(!isActive)}
                     className="w-80 py-8 bg-kinetic-orange text-black font-black uppercase tracking-[0.3em] text-lg rounded-[24px] hover:brightness-110 active:scale-95 transition-all shadow-[0_15px_40px_rgba(255,106,0,0.3)]"
                   >
                     {isActive ? 'PAUSAR' : 'INICIAR'}
                   </button>
                   <button 
                     onClick={() => { setIsActive(false); setTime(0); }}
                     className="w-80 py-8 border-4 border-kinetic-orange text-kinetic-orange font-black uppercase tracking-[0.3em] text-lg rounded-[24px] hover:bg-kinetic-orange/5 transition-all"
                   >
                     FINALIZAR
                   </button>
                </div>
             </div>

             <div className="space-y-6">
                <SessionBlock id="#1" duration="02:32:29" />
                <SessionBlock id="#2" duration="00:21:45" />
                <SessionBlock id="#3" duration="03:06:14" />
                <SessionBlock id="#4" duration="00:02:54" dimmed />
             </div>
          </div>

          {/* Sidebar: Tasks */}
          <div className="col-span-12 lg:col-span-4 space-y-16">
             <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">PENDENTES</h3>
                <div className="bg-zinc-950/30 border border-zinc-900 rounded-[32px] overflow-hidden">
                   {tasks.filter(t => !t.completed).map(task => (
                     <TaskRow key={task.id} task={task} />
                   ))}
                   <button className="w-full py-8 border-t border-zinc-900 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-kinetic-orange transition-colors">
                      + NOVA TAREFA
                   </button>
                </div>
             </div>

             <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">CONCLUÍDAS</h3>
                <div className="bg-zinc-950/30 border border-zinc-900 rounded-[32px] overflow-hidden opacity-40">
                   {tasks.filter(t => t.completed).map(task => (
                     <TaskRow key={task.id} task={task} />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionBlock({ id, duration, dimmed }: { id: string, duration: string, dimmed?: boolean }) {
  return (
    <div className={cn(
      "w-full py-12 px-12 bg-kinetic-orange rounded-[40px] flex items-center justify-between text-black group transition-all cursor-pointer hover:translate-y-[-4px]",
      dimmed && "bg-kinetic-orange/20 text-kinetic-orange/60 border-2 border-kinetic-orange/20"
    )}>
       <h3 className="text-5xl font-black italic uppercase tracking-tighter">BLOCO {id}</h3>
       <div className="text-5xl font-mono font-black">{duration}</div>
    </div>
  );
}

interface TaskRowProps {
  task: Task;
  key?: any;
}

function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="px-8 py-6 border-b border-zinc-900 flex items-center gap-6 group">
       <div className={cn(
         "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
         task.completed ? "bg-kinetic-orange border-kinetic-orange" : "border-zinc-800"
       )}>
          {task.completed && <CheckCircle2 className="w-4 h-4 text-black" />}
       </div>
       <span className={cn("flex-1 font-black text-sm uppercase italic tracking-wide", task.completed && "line-through text-zinc-600")}>
          {task.text}
       </span>
       <div className={cn(
          "px-4 py-1 rounded-md text-[9px] font-black uppercase tracking-widest",
          task.priority === 'ALTA' ? "bg-red-500/20 text-red-500" : 
          task.priority === 'MEDIA' ? "bg-zinc-800 text-zinc-500" : "bg-zinc-900 text-zinc-700"
       )}>
          {task.priority}
       </div>
    </div>
  );
}
