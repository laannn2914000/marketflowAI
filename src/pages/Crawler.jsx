import { useState } from 'react'
import { ArrowRight, Check, Clock3, Filter, Hash, Loader2, Play, Sparkles, Users } from 'lucide-react'

const platformOptions = ['TikTok', 'Instagram', 'YouTube', 'Facebook']

const sampleContent = [
  { id: 1, platform: 'TikTok', title: 'The 10-minute morning routine that changed my productivity', creator: '@mariahacks', format: 'Short video', published: '2 hours ago', views: '2.4M', likes: '184K', comments: '3,842', shares: '28.6K', engagement: '12.8%', sentiment: 'Positive', selected: true },
  { id: 2, platform: 'Instagram', title: '3 campaign ideas every growth team should test this quarter', creator: '@growthdaily', format: 'Carousel', published: '5 hours ago', views: '864K', likes: '62K', comments: '1,208', shares: '8,420', engagement: '10.4%', sentiment: 'Positive', selected: true },
  { id: 3, platform: 'YouTube', title: 'I tested 20 AI marketing tools so you do not have to', creator: 'The Marketing Lab', format: 'Long-form video', published: '1 day ago', views: '1.1M', likes: '91K', comments: '4,105', shares: '12.2K', engagement: '9.7%', sentiment: 'Positive', selected: false },
  { id: 4, platform: 'Facebook', title: 'What nobody tells you about scaling a content engine', creator: 'SaaS Founders', format: 'Text + image', published: '1 day ago', views: '428K', likes: '32K', comments: '980', shares: '6,180', engagement: '9.2%', sentiment: 'Mixed', selected: false },
]

export default function Crawler({ crawlResult, onCrawl, onOpenAnalysis, onAutoAnalyze }) {
  const [keyword, setKeyword] = useState('marketing optimization')
  const [platforms, setPlatforms] = useState(platformOptions.slice(0, 3))
  const [timeRange, setTimeRange] = useState('Last 7 days')
  const [quantity, setQuantity] = useState('50')
  const [isCrawling, setIsCrawling] = useState(false)
  const [autoAnalyze, setAutoAnalyze] = useState(true)
  const results = crawlResult?.items || sampleContent

  function togglePlatform(platform) {
    setPlatforms((current) => current.includes(platform) ? current.filter((item) => item !== platform) : [...current, platform])
  }

  function startCrawl(event) {
    event.preventDefault()
    setIsCrawling(true)
    window.setTimeout(() => {
      const resultCount = sampleContent.length
      const tokensUsed = Math.round(Number(quantity) * Math.max(platforms.length, 1) * 128)
      onCrawl({ keyword, platforms, timeRange, quantity: Number(quantity), autoAnalyze, resultCount, tokensUsed, items: sampleContent })
      setIsCrawling(false)
      if (autoAnalyze) onAutoAnalyze()
    }, 650)
  }

  return (
    <div className="min-w-0 space-y-5 p-4 sm:space-y-6 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><p className="text-sm font-semibold text-brand-600">Step 1 of 3</p><h1 className="mt-1 text-xl font-semibold text-ink-900">Social data crawler</h1><p className="mt-1 text-sm text-ink-500">Find high-performing content across the platforms your audience uses.</p></div>
        <div className="flex items-center gap-2 text-xs text-ink-500"><span className="h-2 w-2 rounded-full bg-green-500" /> Sources connected</div>
      </div>

      <form onSubmit={startCrawl} className="rounded-xl border border-ink-100 bg-white p-4 sm:p-5">
        <div className="mb-5 flex items-center gap-2"><Filter size={17} className="text-brand-500" /><h2 className="text-sm font-semibold text-ink-800">Crawler parameters</h2></div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_0.7fr]">
          <label className="block"><span className="text-xs font-medium text-ink-500">Keyword or topic</span><div className="relative mt-1.5"><Hash size={16} className="auth-field-icon" /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} className="auth-input" placeholder="e.g. sustainable fashion" required /></div></label>
          <label className="block"><span className="text-xs font-medium text-ink-500">Time range</span><select value={timeRange} onChange={(event) => setTimeRange(event.target.value)} className="mt-1.5 w-full rounded-lg border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-brand-400">{['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Custom range'].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="block"><span className="text-xs font-medium text-ink-500">Content limit</span><select value={quantity} onChange={(event) => setQuantity(event.target.value)} className="mt-1.5 w-full rounded-lg border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-brand-400">{['25', '50', '100', '250'].map((item) => <option key={item} value={item}>{item} posts</option>)}</select></label>
          <button disabled={isCrawling || !platforms.length} className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60">{isCrawling ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />} {isCrawling ? 'Crawling...' : 'Start crawl'}</button>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2"><span className="mr-1 text-xs font-medium text-ink-500">Platforms:</span>{platformOptions.map((platform) => <button type="button" key={platform} onClick={() => togglePlatform(platform)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${platforms.includes(platform) ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-100 text-ink-500 hover:border-ink-300'}`}>{platform}</button>)}</div>
        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-brand-100 bg-brand-50/60 p-3"><input type="checkbox" checked={autoAnalyze} onChange={(event) => setAutoAnalyze(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500" /><span><span className="block text-sm font-medium text-ink-800">Use AI after crawling and email me the report</span><span className="mt-1 block text-xs leading-5 text-ink-500">Automatically analyze selected content and prepare the full report for your account email.</span></span></label>
      </form>

      <div className="rounded-xl border border-ink-100 bg-white overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div><h2 className="text-sm font-semibold text-ink-800">Crawled content</h2><p className="mt-1 text-xs text-ink-500">{crawlResult ? `Results for “${crawlResult.keyword}”` : 'Run a crawl to refresh this dataset.'}</p></div><div className="flex flex-wrap items-center gap-3 text-xs text-ink-500"><span className="flex items-center gap-1"><Clock3 size={14} /> Updated just now</span><span className="flex items-center gap-1"><Users size={14} /> {crawlResult?.resultCount || results.length} results</span>{crawlResult && <span className="rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">{crawlResult.tokensUsed.toLocaleString()} tokens</span>}</div></div>
        <div className="overflow-x-auto"><table className="min-w-[980px] w-full text-sm"><thead><tr className="border-b border-ink-100 text-left text-xs text-ink-500"><th className="px-5 py-3 font-medium">Content</th><th className="px-4 py-3 font-medium">Reach</th><th className="px-4 py-3 font-medium">Engagement</th><th className="px-4 py-3 font-medium">Audience signals</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{results.map((item) => <tr key={item.id} className="border-b border-ink-100 last:border-0"><td className="max-w-[390px] px-5 py-4"><div className="flex items-start gap-3"><div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[10px] font-bold text-brand-700">{item.platform.slice(0, 2).toUpperCase()}</div><div><p className="font-medium leading-5 text-ink-800">{item.title}</p><p className="mt-1 text-xs text-ink-500">{item.creator} · {item.format} · {item.published}</p></div></div></td><td className="px-4 py-4"><p className="font-medium text-ink-800">{item.views}</p><p className="mt-1 text-xs text-ink-500">{item.likes} likes</p></td><td className="px-4 py-4"><p className="font-medium text-green-600">{item.engagement}</p><p className="mt-1 text-xs text-ink-500">{item.comments} comments</p></td><td className="px-4 py-4"><p className="text-xs text-ink-600">{item.shares} shares</p><p className="mt-1 text-xs text-ink-500">{item.sentiment} sentiment</p></td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${item.selected ? 'bg-brand-50 text-brand-700' : 'bg-ink-100 text-ink-500'}`}>{item.selected && <Check size={12} />}{item.selected ? 'Selected' : 'Available'}</span></td></tr>)}</tbody></table></div>
        <div className="flex flex-col gap-3 border-t border-ink-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><p className="text-xs text-ink-500"><Sparkles size={14} className="mr-1 inline text-brand-500" />Select content in the next step for deeper AI analysis.</p><button onClick={onOpenAnalysis} className="flex items-center justify-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-ink-800">Analyze selected content <ArrowRight size={16} /></button></div>
      </div>
    </div>
  )
}