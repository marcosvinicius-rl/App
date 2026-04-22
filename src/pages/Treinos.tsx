import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Clock, Dumbbell, ChevronRight, X, Trash2, CheckCircle2, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Treinos() {
  const [workouts] = useState([
    { id: '1', title: 'PEITO + TRÍCEPS + ABS', duration: 75, exercises: 8, active: true },
    { id: '2', title: 'COSTAS + BÍCEPS', duration: 60, exercises: 7 },
    { id: '3', title: 'PERNAS COMPLETO', duration: 90, exercises: 10 },
  ]);

  return (
    <div className="bg-black min-h-screen">
      <header className="px-12 py-8 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-20">
         <div className="flex items-center gap-4">
            <h2 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">TREINAMENTOS</h2>
         </div>
      </header>

      <div className="p-12 space-y-12 max-w-[1700px] mx-auto">
        <div className="grid grid-cols-12 gap-12">
          {/* Categories */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">CATEGORIAS</h3>
             <div className="space-y-4">
                {workouts.map(w => (
                  <div 
                    key={w.id}
                    className={cn(
                      "p-8 rounded-[40px] border transition-all cursor-pointer relative overflow-hidden group",
                      w.active ? "bg-zinc-950 border-kinetic-orange" : "bg-zinc-950 border-zinc-900 hover:border-zinc-700"
                    )}
                  >
                     <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4 leading-tight">{w.title}</h4>
                     <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {w.duration} MIN</span>
                        <span className="flex items-center gap-1.5"><Dumbbell className="w-3 h-3" /> {w.exercises} EXERCÍCIOS</span>
                     </div>
                  </div>
                ))}
                <button className="w-full py-8 border-4 border-dashed border-zinc-900 rounded-[40px] text-zinc-700 text-xs font-black uppercase tracking-[0.4em] hover:border-zinc-700 hover:text-zinc-500 transition-all">
                   + ADICIONAR TREINO
                </button>
             </div>
          </div>

          {/* Training Sheet */}
          <div className="col-span-12 lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[60px] p-16 relative overflow-hidden space-y-12">
             {/* Radial Background Effect */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[repeating-conic-gradient(from_0deg,#fff_0deg_1deg,transparent_1deg_10deg)]" />
             </div>

             <header className="relative z-10 space-y-6">
                <h1 className="text-8xl font-black italic tracking-tighter text-white leading-none drop-shadow-2xl">PEITO + TRÍCEPS + ABS</h1>
                <div className="flex gap-6 text-xs font-black uppercase tracking-[0.4em] text-kinetic-orange items-center">
                   <span>SESSÃO DE ALTA INTENSIDADE</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-kinetic-orange" />
                   <span className="text-white opacity-40">PROTOCOLO HYPERTROPHY v2</span>
                </div>
             </header>

             <div className="grid grid-cols-3 gap-12 relative z-10 py-12 border-y border-zinc-900">
                <SheetStat label="VOLUME TOTAL" value="3.450 KG" />
                <SheetStat label="DESCANSO MÉDIO" value="90 SEG" />
                <SheetStat label="TEMPO MÉDIO" value="68 MIN" />
             </div>

             <div className="space-y-6 relative z-10">
                <ExerciseRow 
                  id="01" 
                  name="Supino Reto com Barra" 
                  sets={4} 
                  reps="10-12" 
                  weight={80} 
                  muscles="Peitoral Maior (Fibras Médias)"
                />
                <ExerciseRow 
                  id="02" 
                  name="Supino Inclinado com Halteres" 
                  sets={3} 
                  reps="12" 
                  weight={28} 
                  muscles="Peitoral Superior"
                />
                <ExerciseRow 
                  id="03" 
                  name="Crucifixo Reto com Halteres" 
                  sets={3} 
                  reps="15" 
                  weight={16} 
                  muscles="Peitoral Externo"
                />
             </div>

             <div className="pt-12 relative z-10">
                <button className="w-full py-10 bg-kinetic-orange text-black font-black uppercase tracking-[0.4em] text-2xl rounded-[40px] hover:brightness-110 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-6">
                   <Play className="fill-current w-8 h-8" />
                   INICIAR TREINO
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SheetStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
       <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">{label}</p>
       <p className="text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function ExerciseRow({ id, name, muscles, weight, reps, sets }: { id: string, name: string, muscles: string, weight: number, reps: string, sets: number }) {
  return (
    <div className="bg-black/40 border border-zinc-900 rounded-[40px] p-10 flex items-center gap-12 group hover:border-zinc-700 transition-all">
       <span className="text-6xl font-black italic text-zinc-800 leading-none">{id}</span>
       <div className="flex-1 space-y-1">
          <h4 className="text-2xl font-black uppercase tracking-tight text-white">{name}</h4>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{muscles}</p>
       </div>
       <div className="flex items-center gap-8">
          <div className="text-center space-y-2">
             <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">CARGA</p>
             <div className="bg-zinc-900 px-6 py-3 rounded-2xl text-xl font-black text-white font-mono">{weight}kg</div>
          </div>
          <div className="text-center space-y-2">
             <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">REPS</p>
             <div className="bg-zinc-900 px-6 py-3 rounded-2xl text-xl font-black text-white font-mono">{reps}</div>
          </div>
          <div className="w-14 h-14 rounded-2xl border-4 border-zinc-900 flex items-center justify-center text-zinc-900 group-hover:border-kinetic-orange group-hover:text-kinetic-orange transition-all cursor-pointer">
             <CheckCircle2 className="w-7 h-7" />
          </div>
       </div>
    </div>
  );
}
