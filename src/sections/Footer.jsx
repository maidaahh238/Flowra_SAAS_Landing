import { Link } from 'react-router-dom'

const links = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Integrations'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-plum-700">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-beige-300 to-beige-500 flex items-center justify-center shadow-beige">
                <span className="text-plum-900 text-sm font-display font-bold">F</span>
              </div>
              <span className="font-display font-semibold text-xl text-white">Flowra</span>
            </Link>
            <p className="text-sm font-body text-plum-300 leading-relaxed max-w-xs mb-6">
              Where teams truly flourish. The workspace that adapts to you, not the other way around.
            </p>
            <div className="flex gap-3">
              {['Tw','Gh','Li','Yt'].map(s => (
                <div key={s} className="w-8 h-8 rounded-lg bg-plum-700 hover:bg-plum-600 flex items-center justify-center text-plum-300 hover:text-white text-xs font-mono cursor-pointer transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>
          {/* Nav */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-xs font-mono font-semibold text-plum-400 uppercase tracking-widest mb-4">{cat}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-body text-plum-300 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs font-body text-plum-400">© 2026 Flowra Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-body text-plum-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
