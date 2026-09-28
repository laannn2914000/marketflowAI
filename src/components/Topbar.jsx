import { Search, Bell, LogOut, Menu, X } from 'lucide-react'

export default function Topbar({ user, onLogout, isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="h-16 border-b border-ink-100 bg-white flex items-center justify-between gap-3 px-4 sm:px-6 sticky top-0 z-10">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-80 sm:flex-none">
        <button onClick={onToggleSidebar} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900" title={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'} aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}>
          {isSidebarOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <div className="relative min-w-0 flex-1 sm:w-80 sm:flex-none">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
        <input
          type="text"
          placeholder="Search domains, keywords..."
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-ink-100/70 text-sm outline-none focus:ring-2 focus:ring-brand-400"
        />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-ink-100">
          <Bell size={18} className="text-ink-700" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-500" />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-semibold">
            {user?.name?.slice(0, 2).toUpperCase() || 'SS'}
          </div>
          <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
        </div>
        <button onClick={onLogout} className="p-2 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900" title="Sign out" aria-label="Sign out">
          <LogOut size={17} />
        </button>
      </div>
    </header>
  )
}
