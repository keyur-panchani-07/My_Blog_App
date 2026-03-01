export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
          <div className="aspect-[16/9] bg-slate-200" />
          <div className="p-6">
            <div className="h-4 w-32 bg-slate-200 rounded mb-4" />
            <div className="h-6 w-full bg-slate-200 rounded mb-3" />
            <div className="h-6 w-2/3 bg-slate-200 rounded mb-6" />
            <div className="h-4 w-full bg-slate-100 rounded mb-2" />
            <div className="h-4 w-full bg-slate-100 rounded mb-2" />
            <div className="h-4 w-1/2 bg-slate-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
