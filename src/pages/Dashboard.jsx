import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings, Bell,
  Search, TrendingUp, TrendingDown, CheckCircle2, MessageSquare,
  FolderPlus, UserPlus, Upload, Award, ChevronRight, Menu, X, LogOut,
  Plus, MoreHorizontal, Mail, Phone, Globe, Clock, Check, Star,
  Edit3, Shield, Palette, Bell as BellIcon, Lock
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { analyticsData, taskDistribution, recentActivity } from '../data'
import { useAuth } from '../hooks/useAuth.jsx'
import { useTheme } from '../hooks/useTheme.jsx'

/* ─── Static mock data for panels ─── */
const projects = [
  { id:1, name:'Brand refresh 2026',   status:'In progress', progress:68, due:'Jul 12', members:4, tasks:24, color:'bg-plum-500'   },
  { id:2, name:'API v3 migration',     status:'In progress', progress:41, due:'Jul 28', members:6, tasks:38, color:'bg-beige-400'  },
  { id:3, name:'Mobile app redesign',  status:'Planning',    progress:12, due:'Aug 5',  members:3, tasks:15, color:'bg-mauve-300'  },
  { id:4, name:'Q3 marketing campaign',status:'Completed',   progress:100,due:'Jun 20', members:5, tasks:31, color:'bg-green-400'  },
  { id:5, name:'Data warehouse setup', status:'On hold',     progress:29, due:'Aug 18', members:2, tasks:11, color:'bg-red-300'    },
  { id:6, name:'Customer portal v2',   status:'In progress', progress:57, due:'Jul 31', members:7, tasks:42, color:'bg-plum-400'   },
]

const teamMembers = [
  { name:'Zara Malik',      role:'Head of Product',    email:'zara@flowra.io',    status:'Online',  tasks:12, avatar:'ZM', color:'from-plum-400 to-plum-600' },
  { name:'Usman Tariq',    role:'Engineering Lead',   email:'usman@flowra.io',   status:'Busy',    tasks:9,  avatar:'UT', color:'from-beige-400 to-beige-500'},
  { name:'Ayesha Siddiqui',role:'COO',                email:'ayesha@flowra.io',  status:'Online',  tasks:7,  avatar:'AS', color:'from-plum-300 to-plum-500' },
  { name:'Hamza Raza',     role:'Founder & CEO',      email:'hamza@flowra.io',   status:'Away',    tasks:5,  avatar:'HR', color:'from-beige-300 to-beige-500'},
  { name:'Sana Bukhari',   role:'Senior Designer',    email:'sana@flowra.io',    status:'Online',  tasks:14, avatar:'SB', color:'from-mauve-200 to-plum-400'},
  { name:'Bilal Ahmed',    role:'Backend Engineer',   email:'bilal@flowra.io',   status:'Offline', tasks:8,  avatar:'BA', color:'from-plum-500 to-plum-700' },
]

const statusColor = { Online:'bg-green-400', Busy:'bg-red-400', Away:'bg-beige-400', Offline:'bg-gray-300' }

const statCards = [
  { label:'Total users',     value:'12,480', change:'+18%', up:true,  icon:<Users size={18}/>,       color:'plum'  },
  { label:'Monthly revenue', value:'$48,200',change:'+22%', up:true,  icon:<TrendingUp size={18}/>,  color:'beige' },
  { label:'Active projects', value:'148',    change:'+5%',  up:true,  icon:<FolderKanban size={18}/>,color:'plum'  },
  { label:'Churn rate',      value:'2.4%',   change:'-0.8%',up:false, icon:<TrendingDown size={18}/>,color:'green' },
]

const activityIcons = {
  complete: <CheckCircle2 size={14} className="text-green-500" />,
  comment:  <MessageSquare size={14} className="text-plum-400" />,
  create:   <FolderPlus size={14} className="text-beige-500" />,
  assign:   <UserPlus size={14} className="text-plum-500" />,
  upload:   <Upload size={14} className="text-beige-400" />,
  milestone:<Award size={14} className="text-plum-600" />,
}

const analyticsExtended = [
  { month:'Jan', users:1200, revenue:4800, tasks:340, conversion:3.2 },
  { month:'Feb', users:1800, revenue:6200, tasks:520, conversion:4.1 },
  { month:'Mar', users:2400, revenue:8100, tasks:680, conversion:4.8 },
  { month:'Apr', users:2100, revenue:7400, tasks:590, conversion:4.3 },
  { month:'May', users:3200, revenue:11200,tasks:810, conversion:5.6 },
  { month:'Jun', users:4100, revenue:14500,tasks:1020,conversion:6.2 },
]

/* ─── Sub-components ─── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-beige-100 rounded-xl shadow-plum px-4 py-3">
      <p className="text-xs font-mono text-plum-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-sm font-body font-semibold" style={{ color: p.color }}>
          {p.name}: {p.name==='revenue'?`$${p.value.toLocaleString()}`:p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.08) return null
  const R = Math.PI/180
  const r = innerRadius + (outerRadius - innerRadius)*0.5
  return (
    <text x={cx + r*Math.cos(-midAngle*R)} y={cy + r*Math.sin(-midAngle*R)}
      fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600} fontFamily="DM Mono">
      {`${(percent*100).toFixed(0)}%`}
    </text>
  )
}

/* ── Panel: Overview ── */
function OverviewPanel({ search, filteredActivity }) {
  const [activeChart, setActiveChart] = useState('users')
  const chartColors = { users:'#7040aa', revenue:'#c8923a', tasks:'#b08dd6' }
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-beige-100 p-5 shadow-soft hover:shadow-plum transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${card.color==='plum'?'bg-plum-100 text-plum-600':card.color==='beige'?'bg-beige-100 text-beige-500':'bg-green-100 text-green-600'}`}>
                {card.icon}
              </div>
              <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-full ${card.up?'bg-green-50 text-green-600':'bg-red-50 text-red-500'}`}>
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-plum-900 mb-0.5">{card.value}</p>
            <p className="text-xs font-body text-plum-400">{card.label}</p>
          </div>
        ))}
      </div>
      {/* Area + Pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-plum-900">Growth over time</h3>
              <p className="text-xs font-body text-plum-400 mt-0.5">Jan – Jun 2026</p>
            </div>
            <div className="flex gap-1 bg-cream rounded-xl p-1">
              {['users','revenue','tasks'].map(k=>(
                <button key={k} onClick={()=>setActiveChart(k)}
                  className={`px-3 py-1.5 text-xs font-body rounded-lg capitalize transition-all ${activeChart===k?'bg-white text-plum-800 shadow-soft font-medium':'text-plum-400 hover:text-plum-600'}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsData} margin={{top:5,right:5,left:-10,bottom:0}}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={chartColors[activeChart]} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={chartColors[activeChart]} stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" vertical={false}/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey={activeChart} stroke={chartColors[activeChart]} strokeWidth={2.5} fill="url(#cg)"
                dot={{fill:chartColors[activeChart],r:4,strokeWidth:0}} activeDot={{r:6,strokeWidth:0}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
          <h3 className="font-display font-semibold text-plum-900 mb-1">Task distribution</h3>
          <p className="text-xs font-body text-plum-400 mb-4">All projects combined</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={taskDistribution} cx="50%" cy="50%" outerRadius={72} innerRadius={32}
                dataKey="value" labelLine={false} label={<CustomPieLabel/>} strokeWidth={0}>
                {taskDistribution.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {taskDistribution.map(d=>(
              <div key={d.name} className="flex items-center justify-between text-xs font-body">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:d.color}}/>
                  <span className="text-plum-600">{d.name}</span>
                </div>
                <span className="font-mono font-semibold text-plum-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bar + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
          <h3 className="font-display font-semibold text-plum-900 mb-1">Revenue vs tasks completed</h3>
          <p className="text-xs font-body text-plum-400 mb-6">Monthly comparison</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData} margin={{top:5,right:5,left:-10,bottom:0}} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" vertical={false}/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Legend wrapperStyle={{fontSize:'11px',fontFamily:'DM Mono',color:'#a88bcb',paddingTop:'8px'}}/>
              <Bar dataKey="tasks" fill="#d0bee9" radius={[4,4,0,0]} name="tasks"/>
              <Bar dataKey="users" fill="#7040aa" radius={[4,4,0,0]} name="users"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-plum-900">Recent activity</h3>
            {search && <span className="text-xs font-mono text-plum-400">{filteredActivity.length} result{filteredActivity.length!==1?'s':''}</span>}
          </div>
          <div className="space-y-3">
            {filteredActivity.length===0 ? (
              <p className="text-sm font-body text-plum-300 text-center py-6">No activity matches.</p>
            ) : filteredActivity.map((a,i)=>(
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-beige-50 border border-beige-100 flex items-center justify-center flex-shrink-0">
                  {activityIcons[a.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body text-plum-700 leading-snug">
                    <span className="font-semibold">{a.user}</span> {a.action} <span className="text-plum-500">{a.target}</span>
                  </p>
                  <p className="text-[10px] font-mono text-plum-300 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Panel: Projects ── */
function ProjectsPanel() {
  const [filter, setFilter] = useState('All')
  const statuses = ['All','In progress','Planning','Completed','On hold']
  const filtered = filter==='All' ? projects : projects.filter(p=>p.status===filter)
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-plum-900">Projects</h2>
          <p className="text-sm font-body text-plum-400 mt-0.5">{projects.length} total projects</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-plum-600 hover:bg-plum-700 text-white text-sm font-body font-medium rounded-xl shadow-plum transition-all hover:-translate-y-0.5">
          <Plus size={16}/> New project
        </button>
      </div>
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            className={`px-4 py-2 text-xs font-body rounded-xl border transition-all
              ${filter===s?'bg-plum-600 text-white border-plum-600 shadow-plum':'bg-white text-plum-600 border-beige-200 hover:border-plum-200'}`}>
            {s}
          </button>
        ))}
      </div>
      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white rounded-2xl border border-beige-100 p-5 shadow-soft hover:shadow-plum transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${p.color}`}/>
              <span className={`text-[10px] font-mono px-2 py-1 rounded-full
                ${p.status==='Completed'?'bg-green-50 text-green-600':p.status==='In progress'?'bg-plum-50 text-plum-600':p.status==='On hold'?'bg-red-50 text-red-500':'bg-beige-50 text-beige-500'}`}>
                {p.status}
              </span>
            </div>
            <h3 className="font-display font-semibold text-plum-900 mb-1 text-sm leading-snug">{p.name}</h3>
            <p className="text-xs font-body text-plum-400 mb-4">Due {p.due} · {p.tasks} tasks</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs font-body text-plum-400 mb-1">
                <span>Progress</span>
                <span className="font-semibold text-plum-700">{p.progress}%</span>
              </div>
              <div className="h-1.5 bg-beige-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${p.progress===100?'bg-green-400':'bg-gradient-to-r from-plum-500 to-plum-400'}`}
                  style={{width:`${p.progress}%`}}/>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {[...Array(Math.min(p.members,4))].map((_,i)=>(
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-plum-300 to-plum-500 border-2 border-white flex items-center justify-center text-white text-[8px] font-bold"/>
                ))}
                {p.members>4 && <div className="w-6 h-6 rounded-full bg-beige-100 border-2 border-white flex items-center justify-center text-plum-400 text-[8px] font-bold">+{p.members-4}</div>}
              </div>
              <button className="text-plum-300 hover:text-plum-600 transition-colors"><MoreHorizontal size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Panel: Team ── */
function TeamPanel() {
  const [search, setSearch] = useState('')
  const filtered = teamMembers.filter(m =>
    search==='' ||
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-plum-900">Team</h2>
          <p className="text-sm font-body text-plum-400 mt-0.5">{teamMembers.length} members</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-plum-600 hover:bg-plum-700 text-white text-sm font-body font-medium rounded-xl shadow-plum transition-all hover:-translate-y-0.5">
          <UserPlus size={16}/> Invite member
        </button>
      </div>
      <div className="relative max-w-xs">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-plum-300"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search team…"
          className="w-full pl-9 pr-4 py-2.5 text-sm font-body bg-white border border-beige-200 rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-200 transition-all"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(m=>(
          <div key={m.name} className="bg-white rounded-2xl border border-beige-100 p-5 shadow-soft hover:shadow-plum transition-all hover:-translate-y-0.5">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-sm font-bold shadow-plum flex-shrink-0`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-plum-900 text-sm truncate">{m.name}</h4>
                <p className="text-xs font-body text-plum-400 truncate">{m.role}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${statusColor[m.status]}`}/>
                  <span className="text-[10px] font-mono text-plum-400">{m.status}</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs font-body">
              <div className="flex items-center gap-2 text-plum-500">
                <Mail size={11} className="text-plum-300"/>{m.email}
              </div>
              <div className="flex items-center gap-2 text-plum-500">
                <CheckCircle2 size={11} className="text-plum-300"/>{m.tasks} active tasks
              </div>
            </div>
          </div>
        ))}
        {filtered.length===0 && (
          <div className="col-span-3 text-center py-12">
            <p className="text-sm font-body text-plum-300">No team members match "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Panel: Analytics ── */
function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-plum-900">Analytics</h2>
        <p className="text-sm font-body text-plum-400 mt-0.5">Full performance overview — Jan to Jun 2026</p>
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:'Avg. conversion',value:'4.7%',  change:'+1.2%', up:true },
          {label:'Avg. revenue/mo', value:'$8,700',change:'+31%',  up:true },
          {label:'Peak users (Jun)',value:'4,100', change:'+28%',  up:true },
          {label:'Tasks done (Jun)',value:'1,020', change:'+26%',  up:true },
        ].map(k=>(
          <div key={k.label} className="bg-white rounded-2xl border border-beige-100 p-5 shadow-soft">
            <p className="text-xs font-body text-plum-400 mb-1">{k.label}</p>
            <p className="text-xl font-display font-bold text-plum-900">{k.value}</p>
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full mt-1 inline-block ${k.up?'bg-green-50 text-green-600':'bg-red-50 text-red-500'}`}>{k.change}</span>
          </div>
        ))}
      </div>
      {/* Multi-metric area chart */}
      <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
        <h3 className="font-display font-semibold text-plum-900 mb-1">Users & Revenue over time</h3>
        <p className="text-xs font-body text-plum-400 mb-6">Combined growth metrics</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={analyticsExtended} margin={{top:5,right:5,left:-10,bottom:0}}>
            <defs>
              <linearGradient id="gu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7040aa" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#7040aa" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#c8923a" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#c8923a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" vertical={false}/>
            <XAxis dataKey="month" tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend wrapperStyle={{fontSize:'11px',fontFamily:'DM Mono',color:'#a88bcb',paddingTop:'8px'}}/>
            <Area type="monotone" dataKey="users"   stroke="#7040aa" strokeWidth={2} fill="url(#gu)" dot={false}/>
            <Area type="monotone" dataKey="revenue" stroke="#c8923a" strokeWidth={2} fill="url(#gr)" dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Conversion + Tasks bar charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
          <h3 className="font-display font-semibold text-plum-900 mb-1">Conversion rate %</h3>
          <p className="text-xs font-body text-plum-400 mb-4">Monthly signup conversion</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analyticsExtended} margin={{top:5,right:5,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" vertical={false}/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <Tooltip/>
              <Bar dataKey="conversion" fill="#7040aa" radius={[4,4,0,0]} name="conversion %"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
          <h3 className="font-display font-semibold text-plum-900 mb-1">Tasks completed</h3>
          <p className="text-xs font-body text-plum-400 mb-4">Monthly task throughput</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analyticsExtended} margin={{top:5,right:5,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" vertical={false}/>
              <XAxis dataKey="month" tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#a88bcb',fontFamily:'DM Mono'}} axisLine={false} tickLine={false}/>
              <Tooltip/>
              <Bar dataKey="tasks" fill="#c8923a" radius={[4,4,0,0]} name="tasks"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

/* ── Panel: Settings ── */
function SettingsPanel({ user }) {
  const { updateProfile } = useAuth()
  const { theme, setTheme } = useTheme()

  const [name,    setName]    = useState(user?.name    || '')
  const [email,   setEmail]   = useState(user?.email   || '')
  const [company, setCompany] = useState(user?.company || '')
  const [saved,   setSaved]   = useState(false)
  const [saveErr, setSaveErr] = useState('')
  const [notifs,  setNotifs]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('flowra_notifs')) || { email:true, browser:false, weekly:true } }
    catch { return { email:true, browser:false, weekly:true } }
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaveErr('')
    if (!name.trim())  { setSaveErr('Name cannot be empty.');          return }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSaveErr('Please enter a valid email address.'); return
    }
    const result = updateProfile({ name: name.trim(), email: email.trim().toLowerCase(), company: company.trim() })
    if (result.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } else {
      setSaveErr(result.error || 'Could not save changes.')
    }
  }

  const toggleNotif = (key) => {
    const updated = { ...notifs, [key]: !notifs[key] }
    setNotifs(updated)
    try { localStorage.setItem('flowra_notifs', JSON.stringify(updated)) } catch {}
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-xl font-bold text-plum-900">Settings</h2>
        <p className="text-sm font-body text-plum-400 mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <Edit3 size={16} className="text-plum-500"/>
          <h3 className="font-display font-semibold text-plum-900">Profile</h3>
        </div>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-beige-100">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-lg font-bold shadow-plum">
            {user?.name?.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()||'U'}
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-plum-900">{user?.name}</p>
            <p className="text-xs font-body text-plum-400">{user?.email}</p>
            <p className="text-xs font-body text-plum-500 mt-1">{user?.role || 'Member'} · {user?.company || 'Flowra'}</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            {id:'name',    label:'Full name',      val:name,    set:setName},
            {id:'email',   label:'Email address',  val:email,   set:setEmail},
            {id:'company', label:'Company',         val:company, set:setCompany},
          ].map(f=>(
            <div key={f.id}>
              <label className="block text-xs font-body font-medium text-plum-600 mb-1.5">{f.label}</label>
              <input value={f.val} onChange={e=>{ f.set(e.target.value); setSaveErr('') }}
                className="w-full px-4 py-2.5 text-sm font-body bg-cream border border-beige-200 rounded-xl text-plum-800 focus:outline-none focus:ring-2 focus:ring-plum-300 focus:bg-white transition-all"/>
            </div>
          ))}
          {saveErr && <p className="text-xs text-red-500 font-body">{saveErr}</p>}
          <button type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-plum-600 hover:bg-plum-700 text-white text-sm font-body rounded-xl shadow-plum transition-all hover:-translate-y-0.5">
            {saved ? <><Check size={15}/> Saved!</> : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <BellIcon size={16} className="text-plum-500"/>
          <h3 className="font-display font-semibold text-plum-900">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            {key:'email',   label:'Email notifications',   desc:'Task assignments, comments, and mentions'},
            {key:'browser', label:'Browser notifications', desc:'Real-time alerts in your browser'},
            {key:'weekly',  label:'Weekly digest',         desc:'Summary of workspace activity every Monday'},
          ].map(n=>(
            <div key={n.key} className="flex items-center justify-between py-3 border-b border-beige-50 last:border-0">
              <div>
                <p className="text-sm font-body font-medium text-plum-800">{n.label}</p>
                <p className="text-xs font-body text-plum-400 mt-0.5">{n.desc}</p>
              </div>
              <button onClick={()=>toggleNotif(n.key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notifs[n.key]?'bg-plum-600':'bg-beige-200'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${notifs[n.key]?'translate-x-5':''}`}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <Palette size={16} className="text-plum-500"/>
          <h3 className="font-display font-semibold text-plum-900">Appearance</h3>
        </div>
        <div className="flex gap-3">
          {[{v:'light',label:'Light',icon:'☀'},{v:'dark',label:'Dark',icon:'◐'},{v:'system',label:'System',icon:'⊕'}].map(t=>(
            <button key={t.v} onClick={()=>setTheme(t.v)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-body transition-all
                ${theme===t.v?'border-plum-400 bg-plum-50 text-plum-700 font-medium shadow-soft':'border-beige-200 bg-white text-plum-500 hover:border-plum-200'}`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <Shield size={16} className="text-plum-500"/>
          <h3 className="font-display font-semibold text-plum-900">Security</h3>
        </div>
        <div className="space-y-3">
          <Link to="/forgot-password"
            className="flex items-center justify-between p-4 bg-cream rounded-xl border border-beige-100 hover:border-plum-200 transition-all group cursor-pointer">
            <div className="flex items-center gap-3">
              <Lock size={15} className="text-plum-400"/>
              <div>
                <p className="text-sm font-body font-medium text-plum-800">Change password</p>
                <p className="text-xs font-body text-plum-400">Update your account password</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-plum-300 group-hover:text-plum-600 transition-colors"/>
          </Link>
          <div className="flex items-center justify-between p-4 bg-cream rounded-xl border border-beige-100">
            <div className="flex items-center gap-3">
              <Shield size={15} className="text-plum-400"/>
              <div>
                <p className="text-sm font-body font-medium text-plum-800">Two-factor authentication</p>
                <p className="text-xs font-body text-plum-400">Add an extra layer of security</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-beige-100 text-beige-500 px-2 py-1 rounded-full">Coming soon</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Dashboard ─── */
export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [search,      setSearch]      = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav,   setActiveNav]   = useState('Overview')

  const initials = user?.name
    ? user.name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()
    : 'ME'

  const navItems = [
    { icon:<LayoutDashboard size={18}/>, label:'Overview'  },
    { icon:<FolderKanban size={18}/>,   label:'Projects'  },
    { icon:<Users size={18}/>,          label:'Team'      },
    { icon:<BarChart3 size={18}/>,      label:'Analytics' },
    { icon:<Settings size={18}/>,       label:'Settings'  },
  ]

  const filteredActivity = recentActivity.filter(a =>
    search==='' ||
    a.user.toLowerCase().includes(search.toLowerCase()) ||
    a.target.toLowerCase().includes(search.toLowerCase()) ||
    a.action.toLowerCase().includes(search.toLowerCase())
  )

  const greeting = () => {
    const h = new Date().getHours()
    if (h<12) return 'Good morning'
    if (h<17) return 'Good afternoon'
    return 'Good evening'
  }

  const handleSignOut = () => { signOut(); navigate('/') }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-plum-900/40 z-30 lg:hidden" onClick={()=>setSidebarOpen(false)}/>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-beige-100 shadow-soft z-40 flex flex-col transition-transform duration-300
        ${sidebarOpen?'translate-x-0':'-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-beige-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-plum-500 to-plum-700 flex items-center justify-center shadow-plum">
              <span className="text-white text-xs font-display font-bold">F</span>
            </div>
            <span className="font-display font-semibold text-lg text-plum-800">Flowra</span>
          </Link>
          <button className="lg:hidden text-plum-400" onClick={()=>setSidebarOpen(false)}><X size={18}/></button>
        </div>
        <div className="px-4 py-3 mx-4 mt-4 bg-plum-50 rounded-xl border border-plum-100 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-xs font-bold">✦</div>
          <div>
            <p className="text-xs font-body font-semibold text-plum-800">{user?.company||'My Workspace'}</p>
            <p className="text-[10px] font-mono text-plum-400">Pro plan</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(item=>(
            <button key={item.label}
              onClick={()=>{ setActiveNav(item.label); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all text-left
                ${activeNav===item.label?'bg-plum-600 text-white shadow-plum':'text-plum-500 hover:bg-plum-50 hover:text-plum-700'}`}>
              {item.icon}
              {item.label}
              {activeNav===item.label && <ChevronRight size={14} className="ml-auto opacity-60"/>}
            </button>
          ))}
        </nav>
        <div className="px-4 pb-6 border-t border-beige-100 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-beige-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-plum">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-semibold text-plum-800 truncate">{user?.name||'User'}</p>
              <p className="text-xs font-body text-plum-400 truncate">{user?.email||''}</p>
            </div>
          </div>
          <button onClick={handleSignOut}
            className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-body text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={15}/> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/90 backdrop-blur border-b border-beige-100 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button className="lg:hidden text-plum-500 hover:text-plum-700 p-1" onClick={()=>setSidebarOpen(true)}>
            <Menu size={20}/>
          </button>
          <div className="flex-1 relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-plum-300"/>
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search activity, projects, people..."
              className="w-full pl-10 pr-4 py-2.5 text-sm font-body bg-cream border border-beige-200 rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-200 focus:bg-white transition-all"/>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2.5 text-plum-400 hover:text-plum-700 hover:bg-beige-50 rounded-xl transition-colors">
              <Bell size={18}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-plum-500 rounded-full"/>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-xs font-bold shadow-plum cursor-pointer"
              title={user?.name}>
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Greeting only on Overview */}
          {activeNav==='Overview' && (
            <div className="mb-6">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-plum-900">
                {greeting()}, {user?.name?.split(' ')[0]||'there'} ✦
              </h1>
              <p className="text-sm font-body text-plum-400 mt-1">Here's what's happening in your workspace today.</p>
            </div>
          )}

          {activeNav==='Overview'  && <OverviewPanel search={search} filteredActivity={filteredActivity}/>}
          {activeNav==='Projects'  && <ProjectsPanel/>}
          {activeNav==='Team'      && <TeamPanel/>}
          {activeNav==='Analytics' && <AnalyticsPanel/>}
          {activeNav==='Settings'  && <SettingsPanel user={user}/>}
        </main>
      </div>
    </div>
  )
}
