import SectionWrapper from '../components/SectionWrapper'

const steps = [
  { num: '01', title: 'Create your workspace', desc: 'Set up your team in under 2 minutes. Invite members, connect your tools, and start straight away.', icon: '⬡' },
  { num: '02', title: 'Organize your work', desc: 'Build projects, add tasks, set due dates and priorities. Flowra adapts to how your team already thinks.', icon: '◎' },
  { num: '03', title: 'Collaborate in real time', desc: 'Comment, assign, and get notified exactly when it matters. No more missed messages or lost context.', icon: '✦' },
  { num: '04', title: 'Track and improve', desc: 'Watch your analytics update live. Spot patterns, celebrate wins, and keep improving every sprint.', icon: '◈' },
]

export default function ProductOverview() {
  return (
    <SectionWrapper id="overview" bg="bg-cream">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left */}
        <div className="flex-1">
          <span className="inline-block mb-3 text-xs font-mono font-medium tracking-widest uppercase text-plum-500 bg-plum-50 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 mb-4 leading-tight">
            Up and running<br /><span className="text-gradient">in four steps</span>
          </h2>
          <p className="text-lg text-plum-600/80 font-body leading-relaxed mb-8">
            No lengthy onboarding. No steep learning curve. Flowra gets out of the way so your team can focus on shipping.
          </p>
          <div className="space-y-6">
            {steps.map(s => (
              <div key={s.num} className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-plum-500 to-plum-700 flex items-center justify-center text-white text-xs font-mono font-bold shadow-plum group-hover:scale-105 transition-transform">
                  {s.num}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-plum-900 mb-1">{s.title}</h4>
                  <p className="text-sm font-body text-plum-600/80 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: visual */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative bg-white rounded-3xl shadow-plum border border-beige-100 p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display font-semibold text-plum-800">Sprint board</h4>
              <span className="text-xs font-mono text-plum-400 bg-plum-50 px-2 py-1 rounded-lg">Week 24</span>
            </div>
            {/* Kanban-like columns */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: 'To do', color: 'bg-beige-50 border-beige-100', tasks: ['Auth redesign', 'DB migration', 'Unit tests'] },
                { title: 'In progress', color: 'bg-plum-50 border-plum-100', tasks: ['API v3 spec', 'Landing page'] },
                { title: 'Done', color: 'bg-green-50 border-green-100', tasks: ['CI pipeline', 'Code review', 'Deploy v2.1'] },
              ].map(col => (
                <div key={col.title} className={`rounded-xl border p-3 ${col.color}`}>
                  <p className="text-[10px] font-mono font-semibold text-plum-400 uppercase mb-2">{col.title}</p>
                  <div className="space-y-1.5">
                    {col.tasks.map(t => (
                      <div key={t} className="bg-white rounded-lg px-2 py-1.5 text-[10px] font-body text-plum-700 shadow-soft border border-beige-100">{t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Progress */}
            <div className="pt-2 border-t border-beige-100">
              <div className="flex justify-between text-xs font-body text-plum-400 mb-1">
                <span>Sprint progress</span>
                <span className="text-plum-600 font-semibold">73%</span>
              </div>
              <div className="h-2 bg-beige-100 rounded-full overflow-hidden">
                <div className="h-full w-[73%] bg-gradient-to-r from-plum-500 to-plum-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
