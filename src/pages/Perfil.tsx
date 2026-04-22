import { motion } from 'motion/react';
import { Flame, MapPin, Dumbbell, CheckCircle2, Trophy, Lock, Bell, User, Medal, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';

// 14-day consistency — true = active (orange), middle one slightly dimmer to match image
const consistency = [true, true, true, true, true, true, true, true, true, true, 'dim', true, true, true] as const;

const volumeBars = [
  { week: 'SEMANA 1', value: 62 },
  { week: 'SEMANA 2', value: 68 },
  { week: 'SEMANA 3', value: 74 },
  { week: 'SEMANA 4', value: 72 },
  { week: 'SEMANA 5', value: 70 },
  { week: 'SEMANA 6', value: 68 },
  { week: 'SEMANA 7', value: 76 },
  { week: 'HOJE',     value: 84.2, highlight: true },
];

const badges = [
  { label: 'ALFA STREAK',   icon: Medal,    unlocked: true },
  { label: 'MARATONISTA',   icon: Runner,   unlocked: true },
  { label: 'STARTUP SPEED', icon: Rocket,   unlocked: true },
  { label: 'IRON MIND',     icon: Lock,     unlocked: false },
  { label: '100 SESSÕES',   icon: Lock,     unlocked: false },
  { label: '7% BF CLUB',    icon: Lock,     unlocked: false },
];

function Runner(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2" />
      <path d="M4 22l5-7 2-4 5 1 4 6" />
      <path d="M9 15l-3-2" />
    </svg>
  );
}

export default function Perfil() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Top bar */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-zinc-900">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">PERFIL DO ATLETA</h2>
        <div className="flex items-center gap-5">
          <Bell className="w-4 h-4 text-zinc-500" />
          <User className="w-4 h-4 text-kinetic-orange" />
        </div>
      </header>

      <div className="px-10 py-10 space-y-8 max-w-[1800px]">
        {/* TOP — Profile card + 2 achievement cards */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[28px] p-10 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,0,0.08),transparent_70%)] pointer-events-none" />

            <div className="flex items-center gap-10 relative">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-full border-[3px] border-kinetic-orange p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                    <AvatarSilhouette />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-black border-2 border-kinetic-orange rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-kinetic-orange" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.4 7.4H22l-6.3 4.6 2.4 7.4L12 16.8 5.9 21.4l2.4-7.4L2 9.4h7.6z" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-5xl font-bold tracking-tight leading-none">MARCOS</h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Tag label="EMPREENDEDOR" active />
                      <Tag label="TRÁFEGO DIRETO" />
                      <Tag label="ATLETA" />
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-kinetic-orange text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg hover:brightness-110 active:scale-95 transition-all leading-tight text-center">
                    EDITAR<br />PERFIL
                  </button>
                </div>

                {/* 14-day consistency */}
                <div className="mt-8 pt-6 border-t border-zinc-900">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">14-DAY CONSISTENCY</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">100% COMPLETION</p>
                  </div>
                  <div className="flex gap-1.5">
                    {consistency.map((c, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex-1 h-2.5 rounded-sm',
                          c === true ? 'bg-kinetic-orange shadow-[0_0_8px_rgba(255,106,0,0.5)]' :
                          c === 'dim' ? 'bg-kinetic-orange/40' : 'bg-zinc-900'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two achievement cards */}
          <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
            <AchievementCard title="CONQUISTA PERSONALIZADA" value="X" sub="-X este mês" subClass="text-green-400" iconType="trophy" />
            <AchievementCard title="CONQUISTA PERSONALIZADA" value="X" sub="x" subClass="text-zinc-500" iconType="eye" />
          </div>
        </div>

        {/* MIDDLE — 4 small metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard icon={Flame}       iconColor="text-kinetic-orange" label="STREAK ATUAL"     value="42 DIAS"       sub="" progress={50} />
          <MetricCard icon={MapPin}      iconColor="text-kinetic-orange" label="KM RODADOS (MÊS)" value="128.5 KM"      sub="+12% vs. mês anterior" subColor="text-zinc-500" />
          <MetricCard icon={Dumbbell}    iconColor="text-kinetic-orange" label="TREINOS (MÊS)"    value="2 SESSÕES"     sub="Meta: 24 sessões" subColor="text-zinc-500" />
          <MetricCard icon={CheckCircle2} iconColor="text-kinetic-orange" label="TAREFAS HOJE"    value="08/12"         sub="Pendência Crítica: 01" subColor="text-kinetic-orange" />
        </div>

        {/* CHARTS — Volume evolution + Deep Work donut */}
        <div className="grid grid-cols-12 gap-6">
          {/* Volume bars */}
          <div className="col-span-12 lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-[28px] p-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-base font-bold">EVOLUÇÃO VOLUME DE TREINO</h3>
              <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                ÚLTIMOS 30 DIAS
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4.5L6 7.5 9 4.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="h-48 flex items-end gap-4 relative">
              {volumeBars.map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full flex flex-col items-center justify-end" style={{ height: '180px' }}>
                    {b.highlight && (
                      <span className="text-xl font-bold text-kinetic-orange leading-none mb-2">{b.value}</span>
                    )}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${b.value}%` }}
                      transition={{ duration: 0.7, delay: i * 0.05 }}
                      className={cn(
                        'w-full rounded-t-lg',
                        b.highlight
                          ? 'bg-kinetic-orange shadow-[0_0_20px_rgba(255,106,0,0.35)]'
                          : 'bg-gradient-to-t from-zinc-900 to-zinc-800'
                      )}
                    />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">{b.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Work donut */}
          <div className="col-span-12 lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-[28px] p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold">TEMPO DE FOCO (DEEP WORK)</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-kinetic-orange">RECORD: 8H 12M</span>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="66" fill="none" stroke="#18181b" strokeWidth="14" />
                  <circle
                    cx="80" cy="80" r="66" fill="none" stroke="#ff6a00" strokeWidth="14"
                    strokeDasharray={2 * Math.PI * 66}
                    strokeDashoffset={2 * Math.PI * 66 * (1 - 0.72)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold leading-none">6.5H</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mt-1">HOJE</span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <LegendRow color="#ff6a00" label="BLOCO MANHÃ" value="4.0H" />
                <LegendRow color="#52525b" label="BLOCO TARDE" value="2.5H" />
                <LegendRow color="#27272a" label="RESTANTE META" value="1.5H" muted />
              </div>
            </div>
          </div>
        </div>

        {/* BADGES */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[28px] p-10">
          <h3 className="text-base font-bold mb-8">CONQUISTAS & BADGES</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {badges.map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full border-2 flex items-center justify-center',
                    b.unlocked
                      ? 'border-kinetic-orange text-kinetic-orange bg-kinetic-orange/5'
                      : 'border-zinc-800 text-zinc-700 bg-transparent'
                  )}
                >
                  <b.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  'text-[10px] font-bold uppercase tracking-wider text-center',
                  b.unlocked ? 'text-white' : 'text-zinc-700'
                )}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================ subcomponents ================

function Tag({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider',
        active ? 'bg-kinetic-orange text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
      )}
    >
      {label}
    </span>
  );
}

function AchievementCard({
  title, value, sub, subClass, iconType,
}: { title: string; value: string; sub: string; subClass: string; iconType: 'trophy' | 'eye' }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6 flex flex-col justify-between relative">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{title}</p>
        <div className="text-zinc-700">
          {iconType === 'trophy' ? <Trophy className="w-4 h-4" /> : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-5xl font-bold">{value}</h4>
        <p className={cn('text-[11px] font-bold mt-2', subClass)}>{sub}</p>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon, iconColor, label, value, sub, subColor, progress,
}: {
  icon: any; iconColor: string; label: string; value: string;
  sub: string; subColor?: string; progress?: number;
}) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-[20px] p-6 space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={cn('w-4 h-4', iconColor)} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      </div>
      <h4 className="text-2xl font-bold">{value}</h4>
      {sub && <p className={cn('text-[10px] font-bold', subColor)}>{sub}</p>}
      {progress !== undefined && (
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-kinetic-orange"
          />
        </div>
      )}
    </div>
  );
}

function LegendRow({ color, label, value, muted }: { color: string; label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-zinc-500">
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className={cn('font-bold', muted ? 'text-zinc-600' : 'text-white')}>{value}</span>
    </div>
  );
}

function AvatarSilhouette() {
  // Stylized profile silhouette in orange/black — no external image
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1405" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a1a08" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" fill="url(#bg-grad)" />
      {/* head */}
      <ellipse cx="64" cy="52" rx="20" ry="24" fill="#1a1a1a" />
      {/* neck */}
      <rect x="55" y="70" width="18" height="14" fill="#0f0f0f" />
      {/* shoulders / torso */}
      <path d="M20,128 Q20,92 64,86 Q108,92 108,128 Z" fill="url(#body-grad)" />
      {/* subtle highlight */}
      <path d="M50,48 Q64,40 78,48" stroke="#ff6a00" strokeWidth="0.5" opacity="0.3" fill="none" />
    </svg>
  );
}
