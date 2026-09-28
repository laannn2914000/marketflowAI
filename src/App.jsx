import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Auth from './pages/Auth.jsx'
import Crawler from './pages/Crawler.jsx'
import Analysis from './pages/Analysis.jsx'
import MarketingPlan from './pages/MarketingPlan.jsx'
import Settings from './pages/Settings.jsx'
import Calendar from './pages/Calendar.jsx'
import Collaborators from './pages/Collaborators.jsx'
import Notes from './pages/Notes.jsx'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('smartseo_session') || 'null'))
  const [view, setView] = useState('dashboard')
  const [crawlResult, setCrawlResult] = useState(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [planSent, setPlanSent] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  function handleLogin(nextUser) {
    localStorage.setItem('smartseo_session', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function handleLogout() {
    localStorage.removeItem('smartseo_session')
    setUser(null)
  }

  function openView(nextView) {
    if (nextView === 'analysis') setAnalysisComplete(true)
    setView(nextView)
  }

  if (!user) return <Auth onLogin={handleLogin} />

  return (
    <div className="flex min-h-screen bg-ink-100/40">
      <Sidebar activeView={view} isOpen={isSidebarOpen} onNavigate={openView} onToggleSidebar={() => setIsSidebarOpen((current) => !current)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user} onLogout={handleLogout} isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((current) => !current)} />
        <main className="flex-1">
          {view === 'dashboard' && <Dashboard crawlResult={crawlResult} analysisComplete={analysisComplete} planSent={planSent} onOpenCrawler={() => openView('crawler')} />}
          {view === 'crawler' && <Crawler crawlResult={crawlResult} onCrawl={setCrawlResult} onOpenAnalysis={() => openView('analysis')} onAutoAnalyze={() => openView('analysis')} />}
          {view === 'analysis' && <Analysis crawlResult={crawlResult} onBack={() => openView('crawler')} onOpenPlan={() => openView('plan')} />}
          {view === 'plan' && <MarketingPlan user={user} onEmailSent={() => setPlanSent(true)} onBack={() => openView('analysis')} />}
          {view === 'calendar' && <Calendar />}
          {view === 'collaborators' && <Collaborators />}
          {view === 'notes' && <Notes />}
          {view === 'settings' && <Settings user={user} />}
        </main>
      </div>
    </div>
  )
}
