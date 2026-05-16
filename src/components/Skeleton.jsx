export function SkeletonLine({ className = '' }) {
  return <div className={`h-3 rounded bg-slate-700/50 animate-pulse ${className}`} />
}

export function SkeletonBlock({ className = '' }) {
  return <div className={`rounded-lg bg-slate-800/50 animate-pulse ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-slate-800/30 border border-slate-700/20 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-700/50 animate-pulse" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-2/3" />
          <SkeletonLine className="w-1/2" />
        </div>
      </div>
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-3/4" />
    </div>
  )
}

export function SkeletonTopicRow() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-slate-700/50 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonLine className="w-1/2" />
        <SkeletonLine className="w-3/4" />
      </div>
    </div>
  )
}

export function SkeletonNftGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg bg-slate-800/30 border border-slate-700/20 p-3 space-y-2">
          <div className="w-8 h-8 rounded bg-slate-700/50 animate-pulse" />
          <SkeletonLine className="w-3/4" />
          <SkeletonLine className="w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonProgress() {
  return (
    <div className="space-y-3">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-slate-700/50 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <SkeletonLine className="w-20" />
              <SkeletonLine className="w-8" />
            </div>
            <div className="h-1.5 rounded-full bg-slate-700/50 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
