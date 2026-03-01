'use client';

import { useState } from 'react';
import { useGetBlogsQuery } from '@/redux/services/blogApi';
import BlogCard from '@/components/blog/BlogCard';
import BlogSkeleton from '@/components/blog/BlogSkeleton';
import Pagination from '@/components/pagination/Pagination';
import CategoryFilter from '@/components/blog/CategoryFilter';

export default function BlogsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const limit = 6;

  const { data, isLoading, isError, isFetching } = useGetBlogsQuery({ 
    page, 
    limit, 
    category 
  });

  const blogs = data?.data?.blogs || [];
  const pagination = data?.data?.pagination || { totalPages: 1 };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    setPage(1); // Reset to first page when category changes
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Articles & Insights
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl">
          Discover the latest trends in technology, design, and business through our expert-led blog posts.
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <CategoryFilter 
          selectedCategory={category} 
          onSelectCategory={handleCategoryChange} 
        />
      </div>

      {(isLoading || isFetching) ? (
        <BlogSkeleton />
      ) : isError ? (
        <div className="py-20 text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-2">Error Loading Blogs</h3>
            <p className="text-slate-500">Something went wrong while fetching the latest posts. Please try again later.</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Found</h3>
            <p className="text-slate-500">We couldn't find any articles matching your current selection.</p>
            <button 
                onClick={() => handleCategoryChange('')}
                className="mt-6 text-indigo-600 font-semibold hover:underline"
            >
                Clear all filters
            </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          
          <Pagination 
            currentPage={page} 
            totalPages={pagination.totalPages} 
            onPageChange={setPage} 
          />
        </>
      )}
    </div>
  );
}
