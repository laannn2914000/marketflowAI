import { Bot, CheckCircle2, Send, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'

export default function AIChat({ context, onApplySuggestion }) {
  const [prompt, setPrompt] = useState('')
  const [appliedResult, setAppliedResult] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `I reviewed your ${context}. Ask me to refine, shorten, or make the result more actionable.` },
  ])

  function submitPrompt(event) {
    event.preventDefault()
    const question = prompt.trim()
    if (!question) return

    setMessages((current) => [...current, { role: 'user', text: question }, { role: 'assistant', text: `I can improve this ${context} by making the recommendations more specific, easier to execute, and better aligned with your audience. I have prepared an optimized version for you.` }])
    setPrompt('')
  }

  function applySuggestion() {
    setAppliedResult(`Optimized ${context}: the recommendations are now clearer, more actionable, and aligned with your selected audience.`)
    onApplySuggestion()
  }

  return (
    <section className="rounded-xl border border-ink-100 bg-white overflow-hidden">
      <div className="flex items-center gap-2 border-b border-ink-100 p-4"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Bot size={17} /></span><div><h2 className="text-sm font-semibold text-ink-800">Work with AI</h2><p className="text-xs text-ink-500">Ask for improvements to your {context}</p></div></div>
      <div className="max-h-72 space-y-3 overflow-y-auto p-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex w-full gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>{message.role === 'assistant' && <Sparkles size={15} className="mt-1 shrink-0 text-brand-500" />}<div className={`max-w-[85%] whitespace-pre-line break-words rounded-lg px-3 py-2 text-sm leading-5 ${message.role === 'user' ? 'bg-ink-900 text-white' : 'bg-brand-50 text-ink-700'}`}>{message.text}</div>{message.role === 'user' && <UserRound size={15} className="mt-1 shrink-0 text-ink-400" />}</div>)}</div>
      <div className="border-t border-ink-100 p-4"><form onSubmit={submitPrompt} className="space-y-2"><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask AI to optimize this result..." rows="3" className="block min-h-20 w-full resize-y rounded-lg border border-ink-100 px-3 py-2.5 text-sm leading-5 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" /><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Send size={16} /> Send message</button></form><button type="button" onClick={applySuggestion} className="mt-3 flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"><Sparkles size={13} /> Apply AI optimization</button></div>
      {appliedResult && <div className="border-t border-green-100 bg-green-50/70 p-4"><div className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" /><div><p className="text-xs font-semibold uppercase tracking-wide text-green-700">Updated result</p><p className="mt-1 whitespace-pre-line break-words text-sm leading-6 text-green-800">{appliedResult}</p></div></div></div>}
    </section>
  )
}