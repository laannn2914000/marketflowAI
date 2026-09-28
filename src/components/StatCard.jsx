import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function StatCard({ label, value, delta, positive = true }) {
  return (
    <div className="bg-white rounded-xl border border-ink-100 p-5">
      <p className="text-sm text-ink-500">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold text-ink-900">{value}</span>
        {delta && (
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}
          >
            {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {delta}
          </span>
        )}
      </div>
    </div>
  )
}
