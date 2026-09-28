import { ArrowLeft, ArrowRight, BrainCircuit, CheckCircle2, Lightbulb, Target, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import AIChat from '../components/AIChat.jsx'

const insights = [
  { title: 'Strong problem-first hook', text: 'The highest-performing posts name a specific pain point in the first three seconds, creating immediate relevance.', score: '92%', icon: Target, color: 'text-brand-600 bg-brand-50' },
  { title: 'Practical proof beats promotion', text: 'Audiences engage more when advice is backed by a concrete workflow, example, or measurable result.', score: '87%', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
  { title: 'Conversation drives distribution', text: 'Questions and opinion-led captions generate more comments, which expands organic reach across feeds.', score: '81%', icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
]

export default function Analysis({ crawlResult, onBack, onOpenPlan }) {
  const [editableInsights, setEditableInsights] = useState(insights)

  function updateInsight(index, field, value) {
    setEditableInsights((current) => current.map((insight, insightIndex) => insightIndex === index ? { ...insight, [field]: value } : insight))
  }

  function applyOptimization() {
    setEditableInsights((current) => current.map((insight) => ({ ...insight, title: insight.title.replace(/strong|practical|conversation/i, 'High-impact') })))
  }

  return <div className="min-w-0 space-y-5 p-4 sm:space-y-6 sm:p-6">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"><ArrowLeft size={16} /> Back to crawler</button>
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-brand-600">Step 2 of 3</p><h1 className="mt-1 text-xl font-semibold text-ink-900">AI content analysis</h1><p className="mt-1 text-sm text-ink-500">Understand why the crawled content went viral and what to repeat.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"><BrainCircuit size={14} /> Analysis complete</span></div>
    <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-xl border border-ink-100 bg-white p-5"><p className="text-xs text-ink-500">Content analyzed</p><p className="mt-2 text-2xl font-semibold text-ink-900">{crawlResult?.items?.length || 4}</p><p className="mt-1 text-xs text-ink-500">Across {crawlResult?.platforms?.length || 3} platforms</p></div><div className="rounded-xl border border-ink-100 bg-white p-5"><p className="text-xs text-ink-500">Average viral score</p><p className="mt-2 text-2xl font-semibold text-ink-900">86.4</p><p className="mt-1 text-xs text-green-600">+18.2% vs. benchmark</p></div><div className="rounded-xl border border-ink-100 bg-white p-5"><p className="text-xs text-ink-500">Primary audience</p><p className="mt-2 text-2xl font-semibold text-ink-900">Growth teams</p><p className="mt-1 text-xs text-ink-500">Based on content signals</p></div></div>
    <div className="rounded-xl border border-ink-100 bg-white p-4 sm:p-5"><div className="mb-5 flex items-center gap-2"><Lightbulb size={18} className="text-brand-500" /><div><h2 className="text-sm font-semibold text-ink-800">Why this content performed</h2><p className="mt-1 text-xs text-ink-500">Edit any insight directly before building your plan.</p></div></div><div className="grid gap-4 lg:grid-cols-3">{editableInsights.map(({ title, text, score, icon: Icon, color }, index) => <article key={`${title}-${index}`} className="rounded-lg border border-ink-100 p-4"><div className="flex items-start justify-between gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}><Icon size={18} /></span><span className="text-sm font-semibold text-ink-800">{score} match</span></div><input value={title} onChange={(event) => updateInsight(index, 'title', event.target.value)} className="mt-4 w-full border-b border-transparent bg-transparent text-sm font-semibold text-ink-800 outline-none focus:border-brand-300" /><textarea value={text} onChange={(event) => updateInsight(index, 'text', event.target.value)} rows="4" className="mt-2 w-full resize-none rounded-md border border-transparent bg-ink-100/40 p-2 text-sm leading-6 text-ink-500 outline-none focus:border-brand-200 focus:bg-white" /></article>)}</div></div>
    <AIChat context="AI analysis" onApplySuggestion={applyOptimization} />
    <div className="flex flex-col gap-3 rounded-xl bg-ink-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="text-sm font-semibold">Turn these insights into action</p><p className="mt-1 text-sm text-ink-300">Generate a channel-by-channel marketing plan from this analysis.</p></div><button onClick={onOpenPlan} className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium hover:bg-brand-400">Build marketing plan <ArrowRight size={16} /></button></div>
  </div>
}