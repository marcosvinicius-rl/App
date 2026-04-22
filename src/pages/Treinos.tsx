import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Play, X, Trash2, Plus, Bell, Zap, User, MoreVertical, Check, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface SetEntry { weight: number; targetWeight: number; reps: number; targetReps: number; done: boolean; }
interface Exercise {
  id: string;
  num: string;
  name: string;
  focus: string;
  scheme: string;       // e.g. "4 X 8-10"
  sets: SetEntry[];
  history: { prevLoad: string; prevReps: string; status: 'progression' | 'maintenance'; delta?: string };
}
interface Category {
  id: string;
  title: string;
  duration: number;
  exercises: number;
  active: boolean;
}

const categories: Category[] = [
  { id: '1', title: 'PEITO + TRÍCEPS + ABS', duration: 75, exercises: 8, active: true },
  { id: '2', title: 'COSTAS + BÍCEPS',        duration: 60, exercises: 7, active: false },
  { id: '3', title: 'PERNAS COMPLETO',        duration: 90, exercises: 10, active: false },
  { id: '4', title: 'OMBROS + TRAPÉZIO',      duration: 50, exercises: 6, active: false },
];

const exercises: Exercise[] = [
  {
    id: 'e1', num: '01', name: 'Supino Reto com Barra', focus: 'Peitoral Maior (Fibras Médias)', scheme: '4 X 8-10',
    sets: [
      { weight: 80, targetWeight: 75, reps: 10, targetReps: 8, done: false },
      { weight: 80, targetWeight: 75, reps: 10, targetReps: 8, done: false },
      { weight: 80, targetWeight: 75, reps: 8,  targetReps: 8, done: false },
    ],
    history: { prevLoad: '80 KG', prevReps: '10/10/8/8', status: 'progression', delta: '+5%' },
  },
  {
    id: 'e2', num: '02', name: 'Supino Inclinado com Halteres', focus: 'Peitoral Superior', scheme: '3 X 12',
    sets: [
      { weight: 24, targetWeight: 24, reps: 12, targetReps: 12, done: false },
    ],
    history: { prevLoad: '24 KG', prevReps: '12/12/11', status: 'maintenance' },
  },
  {
    id: 'e3', num: '04', name: 'Tríceps Corda', focus: 'Cabeça Lateral do Tríceps', scheme: '3 X 8',
    sets: [
      { weight: 42, targetWeight: 40, reps: 8, targetReps: 8, done: false },
      { weight: 42, targetWeight: 40, reps: 8, targetReps: 8, done: false },
      { weight: 42, targetWeight: 40, reps: 8, targetReps: 8, done: false },
    ],
    history: { prevLoad: '20 KG', prevReps: '12/12/12/10', status: 'maintenance' },
  },
];

export default function Treinos() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white relative">
      {/* Top bar */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-zinc-900">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-kinetic-orange">FICHA DE TREINOS</h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Bell className="w-4 h-4 text-zinc-500" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-kinetic-orange" />
          </div>
          <Zap className="w-4 h-4 text-zinc-500" />
          <User className="w-4 h-4 text-zinc-500" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 px-10 py-10 max-w-[1800px]">
        {/* LEFT — Categories */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">CATEGORIAS</h3>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 px-4 py-2 bg-kinetic-orange text-black text-[10px] font-bold uppercase tracking-widest rounded-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="w-3 h-3" /> NOVO TREINO
            </button>
          </div>

          <div className="space-y-3">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>

        {/* RIGHT — Active training sheet */}
        <div className="col-span-12 lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[32px] p-10 relative overflow-hidden">
          {/* Radial ray background */}
          <div className="absolute inset-x-0 top-0 h-80 opacity-15 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-conic-gradient(from 180deg at 50% 0%, transparent 0deg 4deg, rgba(255,255,255,0.15) 4deg 5deg)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,transparent,#09090b_70%)]" />
          </div>

          <header className="relative z-10 mb-8">
            <h1 className="text-[40px] font-bold tracking-tight leading-none">PEITO + TRÍCEPS + ABS</h1>
            <p className="text-kinetic-orange text-[11px] font-bold uppercase tracking-[0.25em] mt-3">
              SESSÃO DE ALTA INTENSIDADE · PROTOCOLO HYPERTROPHY V2
            </p>
          </header>

          {/* Session stats */}
          <div className="grid grid-cols-3 gap-8 py-6 relative z-10">
            <HeaderStat label="VOLUME TOTAL"        value="3.450 KG" />
            <HeaderStat label="DESCANSO MÉDIO"      value="90 SEG" />
            <HeaderStat label="TEMPO MÉDIO DE TREINO" value="68 MIN" />
          </div>

          {/* Exercise rows */}
          <div className="space-y-4 mt-4 relative z-10">
            {exercises.map((ex) => <ExerciseCard key={ex.id} exercise={ex} />)}
          </div>

          {/* Floating CTA */}
          <button className="absolute bottom-10 right-10 flex items-center gap-3 bg-kinetic-orange text-black font-bold text-sm uppercase tracking-[0.2em] pl-5 pr-7 py-4 rounded-full shadow-[0_10px_40px_rgba(255,106,0,0.4)] hover:brightness-110 active:scale-95 transition-all">
            <Play className="w-4 h-4 fill-current" />
            INICIAR TREINO
          </button>
        </div>
      </div>

      <AnimatePresence>{showModal && <NewWorkoutModal onClose={() => setShowModal(false)} />}</AnimatePresence>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div
      className={cn(
        'relative rounded-2xl px-6 py-5 cursor-pointer border transition-all',
        category.active
          ? 'bg-zinc-900 border-zinc-800'
          : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
      )}
    >
      {category.active && (
        <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-kinetic-orange rounded-r" />
      )}
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-sm font-bold tracking-wide">{category.title}</h4>
        {category.active && (
          <span className="px-3 py-1 bg-kinetic-orange text-black text-[9px] font-bold uppercase tracking-widest rounded-md">
            ATIVO
          </span>
        )}
      </div>
      <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-3">
        <span className="flex items-center gap-1.5">
          <TimerIcon /> {category.duration} MIN
        </span>
        <span className="flex items-center gap-1.5">
          <DumbbellMini /> {category.exercises} EXERCÍCIOS
        </span>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [sets, setSets] = useState(exercise.sets);
  const toggle = (i: number) =>
    setSets((prev) => prev.map((s, idx) => (idx === i ? { ...s, done: !s.done } : s)));

  return (
    <div className="bg-black/40 border border-zinc-900 rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-5">
        <span className="text-2xl font-bold text-zinc-700 leading-none pt-1">{exercise.num}</span>
        <div className="flex-1">
          <h4 className="text-base font-bold">{exercise.name}</h4>
          <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Foco: {exercise.focus}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] font-bold text-zinc-400">
            {exercise.scheme}
          </span>
          <button className="text-zinc-600 hover:text-white p-1"><MoreVertical className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Sets */}
      <div className="space-y-2">
        {sets.map((s, i) => (
          <div key={i} className="grid grid-cols-[24px_1fr_1fr_40px] items-center gap-3">
            <span className="text-xs font-bold text-zinc-500">{i + 1}</span>
            <InputCell value={s.weight} target={s.targetWeight} />
            <InputCell value={s.reps} target={s.targetReps} />
            <button
              onClick={() => toggle(i)}
              className={cn(
                'w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all',
                s.done ? 'bg-kinetic-orange border-kinetic-orange text-black' : 'border-zinc-800 text-zinc-700 hover:border-zinc-600'
              )}
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* History */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-900">
        <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-kinetic-orange">HISTÓRICO:</span>
          <span className="text-zinc-500">CARGA ANTERIOR <span className="text-white">{exercise.history.prevLoad}</span></span>
          <span className="text-zinc-500">REPS <span className="text-white">{exercise.history.prevReps}</span></span>
        </div>
        {exercise.history.status === 'progression' ? (
          <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-md text-[10px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {exercise.history.delta} PROGRESSÃO
          </span>
        ) : (
          <span className="px-3 py-1.5 bg-kinetic-orange/10 border border-kinetic-orange/30 rounded-md text-[10px] font-bold text-kinetic-orange uppercase tracking-wider">
            — MANUTENÇÃO
          </span>
        )}
      </div>
    </div>
  );
}

function InputCell({ value, target }: { value: number; target: number }) {
  const [v, setV] = useState(value);
  return (
    <div className="relative">
      <input
        type="number"
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-kinetic-orange"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-medium">{target}</span>
    </div>
  );
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-2">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function TimerIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M9 2h6" strokeLinecap="round" />
    </svg>
  );
}
function DumbbellMini() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6v12M3 9v6M18 6v12M21 9v6M6 12h12" strokeLinecap="round" />
    </svg>
  );
}

// ===================== NEW WORKOUT MODAL =====================

interface ExerciseInput { name: string; sets: string; reps: string; weight: string; }

function NewWorkoutModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('Segunda-feira');
  const [items, setItems] = useState<ExerciseInput[]>([
    { name: 'Supino Reto',       sets: '4', reps: '12',    weight: '60' },
    { name: 'Crucifixo Inclinado', sets: '3', reps: '10-12', weight: '22' },
  ]);

  const addItem = () => setItems([...items, { name: '', sets: '3', reps: '10', weight: '' }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, k: keyof ExerciseInput, v: string) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-[28px] p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold tracking-wider">NOVO TREINO COMPLETO</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Name + Day */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block">NOME DO TREINO</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Hipertrofia A"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-kinetic-orange placeholder:text-zinc-600"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block">DIA DA SEMANA</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-kinetic-orange"
            >
              {['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'].map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Exercises header */}
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">ADICIONAR EXERCÍCIOS</label>
          <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-bold text-zinc-500 uppercase">MÍNIMO 1</span>
        </div>

        <div className="space-y-3 mb-4">
          {items.map((it, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="grid grid-cols-[1fr_60px_70px_80px_30px] gap-3 items-end">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">NOME</label>
                  <input value={it.name} onChange={(e) => updateItem(i, 'name', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:border-kinetic-orange" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">SÉRIES</label>
                  <input value={it.sets} onChange={(e) => updateItem(i, 'sets', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:border-kinetic-orange" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">REPS</label>
                  <input value={it.reps} onChange={(e) => updateItem(i, 'reps', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:border-kinetic-orange" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">CARGA (KG)</label>
                  <input value={it.weight} onChange={(e) => updateItem(i, 'weight', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:border-kinetic-orange" />
                </div>
                <button onClick={() => removeItem(i)} className="text-zinc-600 hover:text-red-500 pb-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-kinetic-orange hover:border-zinc-600 transition-all flex items-center justify-center gap-2 mb-8"
        >
          <Plus className="w-4 h-4" /> ADICIONAR MAIS UM EXERCÍCIO
        </button>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
          >
            CANCELAR
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-kinetic-orange text-black font-bold uppercase tracking-[0.25em] text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,106,0,0.3)]"
          >
            CRIAR TREINO COMPLETO
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
