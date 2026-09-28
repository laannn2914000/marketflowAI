function parseMetric(value) {
  if (typeof value === 'number') return value
  const normalized = String(value).replace(/,/g, '').trim().toUpperCase()
  const multiplier = normalized.endsWith('M') ? 1000000 : normalized.endsWith('K') ? 1000 : 1
  return Number.parseFloat(normalized.replace(/[MK]/g, '')) * multiplier || 0
}

export function getContentMetrics(items = []) {
  const totalReach = items.reduce((sum, item) => sum + parseMetric(item.views), 0)
  const averageEngagement = items.length
    ? items.reduce((sum, item) => sum + (Number.parseFloat(item.engagement) || 0), 0) / items.length
    : 0

  return {
    totalReach,
    averageEngagement,
    platforms: [...new Set(items.map((item) => item.platform))],
  }
}

export function formatMetric(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`
  return value.toLocaleString('en-US')
}

export function getReachValue(value) {
  return parseMetric(value)
}