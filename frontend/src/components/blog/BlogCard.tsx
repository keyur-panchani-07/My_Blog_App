import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: any;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-indigo-600 shadow-sm uppercase tracking-wider">
            {blog.category?.name || 'Uncategorized'}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{blog.author?.name}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          <Link href={`/blogs/${blog._id}`}>
            {blog.title}
          </Link>
        </h3>
        
        <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">
          {blog.content.replace(/<[^>]*>?/gm, '')}
        </p>
        
        <Link 
          href={`/blogs/${blog._id}`}
          className="inline-flex items-center text-indigo-600 font-bold group-hover:translate-x-1 transition-transform"
        >
          Read Article
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
