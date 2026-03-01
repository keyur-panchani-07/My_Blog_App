'use client';

import { useGetCategoriesQuery } from '@/redux/services/blogApi';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { data, isLoading } = useGetCategoriesQuery({});
  const categories = data?.data || [];

  return (
    <div className="flex flex-wrap gap-2 mb-8 items-center">
      <span className="text-slate-500 font-medium mr-2">Filters:</span>
      <button
        onClick={() => onSelectCategory('')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
          selectedCategory === ''
            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
            : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
      >
        All
      </button>
      {isLoading ? (
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 bg-slate-200 animate-pulse rounded-full" />
          ))}
        </div>
      ) : (
        categories.map((cat: any) => (
          <button
            key={cat._id}
            onClick={() => onSelectCategory(cat.name)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat.name
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat.name}
          </button>
        ))
      )}
    </div>
  );
}
