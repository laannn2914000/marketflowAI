import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import StatCard from '../components/StatCard.jsx'
import { ArrowRight, CheckCircle2, Clock3, Layers3, Sparkles, TrendingUp } from 'lucide-react'
import { formatMetric, getContentMetrics, getReachValue } from '../utils/analytics.js'

export default function Dashboard({ crawlResult, analysisComplete, planSent, onOpenCrawler }) {
  const items = crawlResult?.items || []
  const { totalReach, averageEngagement, platforms } = getContentMetrics(items)
  const selectedCount = items.filter((item) => item.selected).length
  const platformCount = platforms.length || crawlResult?.platforms?.length || 0
  const trafficData = items.length ? items.slice(0, 6).map((item, index) => ({ month: `Post ${index + 1}`, visits: getReachValue(item.views) })) : []
  return (
    <div className="min-w-0 space-y-5 p-4 sm:space-y-6 sm:p-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Dashboard</h1>
        <p className="text-sm text-ink-500 mt-1">
          Your marketing intelligence overview and the next best growth actions.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-ink-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500"><Sparkles size={18} /></span>
          <div><h2 className="text-sm font-semibold">Discover what is trending in your market</h2><p className="mt-1 text-sm text-ink-300">Crawl social content and turn viral signals into a focused marketing plan.</p></div>
        </div>
        <button onClick={onOpenCrawler} className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-brand-50">Start a crawl <ArrowRight size={16} /></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Crawled content" value={items.length || '—'} delta={crawlResult ? `${selectedCount} selected` : 'Run a crawl'} positive={Boolean(crawlResult)} />
        <StatCard label="Total reach" value={items.length ? formatMetric(totalReach) : '—'} delta={crawlResult ? `${platformCount} platforms` : 'No data yet'} positive={Boolean(crawlResult)} />
        <StatCard label="Avg. engagement" value={items.length ? `${averageEngagement.toFixed(1)}%` : '—'} delta={crawlResult ? 'Across results' : 'No data yet'} positive={Boolean(crawlResult)} />
        <StatCard label="Workflow status" value={planSent ? 'Plan sent' : analysisComplete ? 'AI ready' : crawlResult ? 'Crawl ready' : 'Not started'} delta={planSent ? 'Delivered' : 'Next step'} positive={planSent || analysisComplete || Boolean(crawlResult)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="min-w-0 lg:col-span-2 bg-white rounded-xl border border-ink-100 p-4 sm:p-5">
          <h2 className="text-sm font-medium text-ink-700 mb-1">Reach by crawled content</h2>
          <p className="mb-4 text-xs text-ink-500">Views collected from the latest crawl</p>
          <div className="h-56 sm:h-64">
            {trafficData.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={trafficData}><CartesianGrid strokeDasharray="3 3" stroke="#e7e9f2" /><XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9aa0b5" /><YAxis tick={{ fontSize: 12 }} stroke="#9aa0b5" tickFormatter={formatMetric} /><Tooltip formatter={(value) => formatMetric(value)} /><Line type="monotone" dataKey="visits" stroke="#3660f5" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer> : <div className="flex h-full flex-col items-center justify-center text-center"><TrendingUp size={24} className="text-ink-300" /><p className="mt-2 text-sm font-medium text-ink-700">No crawl data yet</p><p className="mt-1 text-xs text-ink-500">Start a crawl to populate this chart.</p></div>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-ink-100 p-4 sm:p-5">
          <h2 className="text-sm font-medium text-ink-700 mb-4">Crawl summary</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-ink-500"><Layers3 size={15} />Platforms</span><span className="font-medium">{platformCount || '—'}</span></li>
            <li className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-ink-500"><CheckCircle2 size={15} />Selected content</span><span className="font-medium">{items.length ? selectedCount : '—'}</span></li>
            <li className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-ink-500"><Clock3 size={15} />Time range</span><span className="font-medium">{crawlResult?.timeRange || '—'}</span></li>
            <li className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-ink-500"><Sparkles size={15} />AI analysis</span><span className={`font-medium ${analysisComplete ? 'text-green-600' : 'text-ink-400'}`}>{analysisComplete ? 'Complete' : 'Pending'}</span></li>
            <li className="flex items-center justify-between gap-3"><span className="text-ink-500">Crawl tokens</span><span className="font-medium">{crawlResult?.tokensUsed?.toLocaleString() || '—'}</span></li>
            <li className="flex items-center justify-between gap-3"><span className="text-ink-500">Results returned</span><span className="font-medium">{crawlResult?.resultCount || '—'}</span></li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-ink-100 overflow-hidden">
        <div className="p-5 border-b border-ink-100">
          <h2 className="text-sm font-medium text-ink-700">Top crawled content</h2>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead>
            <tr className="text-left text-ink-500 border-b border-ink-100">
              <th className="px-5 py-3 font-medium">Content</th>
              <th className="px-5 py-3 font-medium">Platform</th>
              <th className="px-5 py-3 font-medium">Reach</th>
              <th className="px-5 py-3 font-medium">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {items.length ? items.slice(0, 4).map((item) => (
              <tr key={item.id} className="border-b border-ink-100 last:border-0">
                <td className="max-w-[360px] truncate px-5 py-3 font-medium text-ink-700">{item.title}</td>
                <td className="px-5 py-3 text-ink-500">{item.platform}</td>
                <td className="px-5 py-3">{item.views}</td>
                <td className="px-5 py-3 font-medium text-green-600">{item.engagement}</td>
              </tr>
            )) : <tr><td colSpan="4" className="px-5 py-8 text-center text-sm text-ink-500">No crawled content yet. Start a crawl to see results here.</td></tr>}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
