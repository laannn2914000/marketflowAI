import { CalendarDays, FileText, HelpCircle, LayoutDashboard, Link2, NotebookPen, Search, Settings, Users, X } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Data Crawler', icon: Search, view: 'crawler' },
  { label: 'AI Analysis', icon: FileText, view: 'analysis' },
  { label: 'Marketing Plan', icon: Link2, view: 'plan' },
  { label: 'Crawl Calendar', icon: CalendarDays, view: 'calendar' },
  { label: 'Collaborators', icon: Users, view: 'collaborators' },
  { label: 'Notes', icon: NotebookPen, view: 'notes' },
  { label: 'Settings', icon: Settings, view: 'settings' },
]

export default function Sidebar({ activeView, isOpen, onNavigate, onToggleSidebar }) {
  return (
    <aside className={`${isOpen ? 'block md:w-64' : 'hidden md:flex md:w-0 md:overflow-hidden'} bg-brand-gradient fixed inset-y-0 left-0 z-40 flex w-64 flex-col text-black md:sticky md:top-0 md:h-screen md:shrink-0 md:justify-between`}>
      <div className="flex-1 md:flex-none">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-white">
          <div className="w-7 h-7 text-black rounded-md bg-brand-500 flex items-center justify-center font-bold text-sm">S</div>
          <span className="font-bold tracking-tight">SmartSEO</span>
          <button onClick={onToggleSidebar} className="ml-auto rounded-lg p-1 text-black hover:bg-black/10 hover:text-white md:hidden" title="Hide sidebar" aria-label="Hide sidebar"><X size={18} /></button>
        </div>

        <nav className="block px-3 py-4 space-y-1">
          {navItems.map(({ label, icon: Icon, view }) => (
            <button
              key={label}
              type="button"
              onClick={() => onNavigate(view)}
              title={label}
              className={`font-semibold flex h-auto w-full items-center justify-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                activeView === view 
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-black hover:bg-white hover:text-black'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/60 hover:text-white">
          <HelpCircle size={18} /> <span>Help</span>
        </button>
      </div>
    </aside>
  )
}
