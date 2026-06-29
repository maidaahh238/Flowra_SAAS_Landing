import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-24 w-80 h-80 bg-plum-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-beige-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mauve-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-beige-200 rounded-full px-4 py-2 mb-8 shadow-soft animate-fade-in">
              <div className="flex -space-x-1">
                {['ZM','UT','AS'].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-[9px] font-bold border-2 border-white">{i}</div>
                ))}
              </div>
              <span className="text-xs font-body text-plum-700">Join <strong>12,000+</strong> teams already using Flowra</span>
              <div className="flex">
                {[...Array(5)].map((_,i)=><Star key={i} size={10} className="text-beige-400 fill-beige-400"/>)}
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-plum-900 leading-[1.1] mb-6 animate-fade-up">
              Where teams<br />
              <em className="not-italic text-gradient">truly flourish.</em>
            </h1>

            <p className="text-lg sm:text-xl text-plum-600/80 font-body leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-up delay-100">
              Flowra brings projects, people, and insights into one beautifully simple workspace — so your team can do its best work, every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-up delay-200">
              <Link to="/onboarding"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-plum-600 hover:bg-plum-700 rounded-2xl shadow-plum hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Start for free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-plum-700 bg-white/80 hover:bg-white border border-beige-200 rounded-2xl shadow-soft transition-all duration-200 hover:-translate-y-0.5">
                See how it works
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-up delay-300">
              {[
                { icon: <Users size={15} />, text: '12k+ teams' },
                { icon: <Zap size={15} />, text: '99.9% uptime' },
                { icon: <Star size={15} />, text: '4.9/5 rating' },
              ].map(s => (
                <div key={s.text} className="flex items-center gap-1.5 text-sm text-plum-500">
                  <span className="text-plum-400">{s.icon}</span>
                  {s.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: dashboard mock */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none animate-float">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-plum-300/30 to-beige-300/20 rounded-3xl blur-2xl scale-110" />
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-plum border border-beige-100 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-beige-100 bg-cream/60">
                  <div className="flex gap-1.5">
                    {['bg-red-300','bg-beige-300','bg-green-300'].map(c=>(
                      <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                    ))}
                  </div>
                  <div className="flex-1 bg-beige-100 rounded-lg h-6 mx-4 flex items-center px-3">
                    <span className="text-[10px] text-plum-400 font-mono">app.flowra.io/dashboard</span>
                  </div>
                </div>
                {/* Mock content */}
                <div className="p-5 space-y-4">
                  <div className="flex gap-3">
                    {[
                      { label: 'Active tasks', val: '148', color: 'bg-plum-50 border-plum-100' },
                      { label: 'Completed', val: '94%', color: 'bg-beige-50 border-beige-100' },
                      { label: 'Team members', val: '12', color: 'bg-mauve-100/50 border-mauve-200/50' },
                    ].map(c => (
                      <div key={c.label} className={`flex-1 rounded-xl border p-3 ${c.color}`}>
                        <p className="text-xs text-plum-400 font-body mb-1">{c.label}</p>
                        <p className="text-xl font-display font-bold text-plum-800">{c.val}</p>
                      </div>
                    ))}
                  </div>
                  {/* Mini chart bars */}
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs font-body text-plum-400 mb-3">Weekly progress</p>
                    <div className="flex items-end gap-2 h-16">
                      {[40,65,50,80,72,90,60].map((h,i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-md transition-all"
                            style={{ height:`${h}%`, background: i===5 ? 'linear-gradient(to top, #7040aa, #b08dd6)' : '#e8dff4' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {['M','T','W','T','F','S','S'].map((d,i)=>(
                        <span key={i} className="flex-1 text-center text-[9px] text-plum-300 font-mono">{d}</span>
                      ))}
                    </div>
                  </div>
                  {/* Tasks list */}
                  <div className="space-y-2">
                    {[
                      { task: 'Design system update', done: true },
                      { task: 'API integration review', done: false },
                      { task: 'User research session', done: false },
                    ].map(t => (
                      <div key={t.task} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-cream transition-colors">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${t.done ? 'border-plum-500 bg-plum-500' : 'border-beige-300'}`}>
                          {t.done && <span className="text-white text-[8px]">✓</span>}
                        </div>
                        <span className={`text-xs font-body ${t.done ? 'line-through text-plum-300' : 'text-plum-700'}`}>{t.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-plum border border-beige-100 px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">↑</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-plum-800">+34%</p>
                  <p className="text-[10px] text-plum-400 font-body">this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
