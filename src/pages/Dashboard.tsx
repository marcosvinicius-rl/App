import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

// 35-day performance curve (matches image 1 shape)
const performanceData = [
  { day: '01/35', v: 100 }, { day: '02/35', v: 100 }, { day: '03/35', v: 100 },
  { day: '04/35', v: 85 },  { day: '05/35', v: 68 },  { day: '06/35', v: 58 },
  { day: '07/35', v: 75 },  { day: '08/35', v: 92 },  { day: '09/35', v: 100 },
  { day: '10/35', v: 98 },  { day: '11/35', v: 82 },  { day: '12/35', v: 80 },
  { day: '13/35', v: 88 },  { day: '14/35', v: 96 },  { day: '15/35', v: 100 },
  { day: '16/35', v: 85 },  { day: '17/35', v: 80 },  { day: '18/35', v: 82 },
  { day: '19/35', v: 100 }, { day: '20/35', v: null }, { day: '21/35', v: null },
  { day: '22/35', v: null }, { day: '23/35', v: null }, { day: '24/35', v: null },
  { day: '25/35', v: null }, { day: '26/35', v: null }, { day: '27/35', v: null },
  { day: '28/35', v: null }, { day: '29/35', v: null }, { day: '30/35', v: null },
  { day: '31/35', v: null }, { day: '32/35', v: null }, { day: '33/35', v: null },
  { day: '34/35', v: null }, { day: '35/35', v: null },
];

// Activity completion per grid — booleans for each of 35 cells
const GRID_5AM = [
  false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,
  true,true,true,true,true,false,false,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
];
const GRID_FLOW = [
  false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,
  true,true,true,false,true,true,true,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
];
const GRID_EMPRESA = [
  false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,
  true,true,false,true,true,true,false,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
];
const GRID_TREINO = [
  false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,
  true,true,true,false,true,false,true,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
];
const GRID_ALIM = [
  false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
];
const GRID_ESTUDO = [
  false,false,false,false,false,false,false,
  false,false,false,false,false,false,false,
  true,true,false,true,true,true,true,
  true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,
];

export default function Dashboard() {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="grid grid-cols-12 gap-10 px-10 py-10 max-w-[1800px]">
        {/* LEFT COLUMN — greeting + rock + stats */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-[44px] font-bold leading-tight tracking-tight">Boa noite, Marcos.</h1>
            <p className="text-zinc-500 text-xs font-semibold mt-1">Quarta, 1 de Abril de 2026</p>
          </div>

          {/* Rock / Ember visual */}
          <div className="flex flex-col items-center py-6">
            <RockVisual />
            <div className="mt-8 text-center">
              <div className="text-[56px] font-bold tracking-tight leading-none">83h 32m</div>
              <p className="text-lg font-bold mt-2">Sem errar</p>
            </div>
          </div>

          {/* Stats grid 2 cols x 3 rows */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Inicio da sessão" value="05:17am" sub="Hoje" />
            <StatCard label="Horas Trabalhadas" value="7h 52m" sub="Hoje" />
            <StatCard label="Tarefas Feitas" value="9/12" sub="Hoje" />
            <StatCard label="Tarefas Chave" value="1/2" sub="Hoje" />
            <StatCard label="Tarefas Personalizada" value="XXX" sub="Hoje" />
            <StatCard label="Tarefas Personalizada" value="XXX" sub="Hoje" />
          </div>
        </div>

        {/* RIGHT COLUMN — Resumo Desafio + Performance */}
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <div>
            <h2 className="text-[32px] font-bold tracking-tight">Resumo Desafio</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-1">Dia 01/35</p>
          </div>

          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            <ActivityGrid title="5AM" cells={GRID_5AM} />
            <ActivityGrid title="TRABALHO FLOW" cells={GRID_FLOW} />
            <ActivityGrid title="1% EMPRESA" cells={GRID_EMPRESA} />
            <ActivityGrid title="TREINO" cells={GRID_TREINO} />
            <ActivityGrid title="ALIMENTAÇÃO" cells={GRID_ALIM} />
            <ActivityGrid title="ESTUDO" cells={GRID_ESTUDO} />
          </div>

          {/* Performance Geral */}
          <div className="pt-4">
            <h2 className="text-[32px] font-bold tracking-tight">Performance Geral</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-1 mb-6">Mensal</p>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="day" hide />
                  <YAxis
                    ticks={[0, 20, 40, 60, 80, 100]}
                    domain={[0, 100]}
                    stroke="#52525b"
                    tick={{ fontSize: 10, fill: '#71717a' }}
                    tickLine={false}
                    axisLine={false}
                    width={28}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 11 }}
                    labelStyle={{ color: '#a1a1aa' }}
                  />
                  <Line
                    type="linear"
                    dataKey="v"
                    stroke="#ff6a00"
                    strokeWidth={2.5}
                    dot={{ fill: '#ff6a00', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, stroke: '#fff', strokeWidth: 1 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Custom axis labels */}
            <div className="flex justify-between mt-2 pl-7 text-[8px] font-semibold text-zinc-600 tracking-tight">
              {performanceData.map((d) => (
                <span key={d.day} className="rotate-[-45deg] origin-top-left">{d.day}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
      <p className="text-[10px] text-zinc-500 font-medium mb-2">{label}</p>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-[10px] text-zinc-600 font-medium mt-1">{sub}</p>
    </div>
  );
}

function ActivityGrid({ title, cells }: { title: string; cells: boolean[] }) {
  return (
    <div>
      <h4 className="text-[13px] font-bold text-white mb-3">{title}</h4>
      <div className="grid grid-cols-7 gap-[5px]">
        {cells.map((active, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square rounded-[4px]',
              active ? 'bg-kinetic-orange' : 'bg-[#3a1a05]'
            )}
          />
        ))}
      </div>
    </div>
  );
}

function RockVisual() {
  // SVG-based abstract ember rock (replaces the Unsplash image that didn't match)
  return (
    <div className="relative w-56 h-56">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,0,0.25),transparent_60%)]" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative">
        <defs>
          <radialGradient id="ember" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#ffcc66" />
            <stop offset="40%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#8a1a00" />
          </radialGradient>
          <linearGradient id="rock" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* outer rock silhouette */}
        <path
          d="M50,70 L35,110 L45,150 L80,170 L130,165 L165,140 L170,95 L150,55 L110,40 L75,45 Z"
          fill="url(#rock)"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
        {/* inner rock crack */}
        <path
          d="M70,75 L55,110 L70,140 L100,150 L130,145 L145,120 L140,85 L115,70 Z"
          fill="#111"
        />
        {/* ember core */}
        <path
          d="M85,90 L75,115 L90,140 L115,145 L135,125 L130,100 L115,85 Z"
          fill="url(#ember)"
          filter="url(#glow)"
        />
        {/* cracks */}
        <path d="M90,95 L100,115 L95,135" stroke="#ffaa44" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M115,100 L120,120" stroke="#ffaa44" strokeWidth="1" fill="none" opacity="0.7" />
      </svg>
    </div>
  );
}
