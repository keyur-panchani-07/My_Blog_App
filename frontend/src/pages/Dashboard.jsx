import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [authorSearch, setAuthorSearch] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    totalPosts: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1, author = '') => {
    try {
      setLoading(true);
      const res = await api.get('/posts', {
        params: {
          page,
          limit: pagination.limit,
          author: author || undefined
        }
      });

      if (res.data?.success) {
        setPosts(res.data.data.posts);
        setPagination(res.data.data.pagination);
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPosts(1, authorSearch);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    fetchPosts(newPage, authorSearch);
  };

  const handleDelete = async (postId) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to delete a post');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      await api.delete(`/posts/${postId}`);
      toast.success('Post deleted');
      fetchPosts(pagination.currentPage, authorSearch);
    } catch (error) {
      console.error('Delete post error:', error);
      const message = error.response?.data?.message || 'Failed to delete post';
      toast.error(message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Latest posts</h1>
          <p className="text-sm text-gray-500">
            Browse posts from all authors, or filter by author name.
          </p>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            type="text"
            placeholder="Search by author name"
            value={authorSearch}
            onChange={(e) => setAuthorSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-600 text-sm">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
          <p className="text-gray-600 text-sm mb-1">No posts found.</p>
          <p className="text-xs text-gray-400">
            Try adjusting the search or be the first to create a post.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onDelete={handleDelete} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

