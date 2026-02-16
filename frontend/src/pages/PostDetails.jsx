import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts/${id}`);
      if (res.data?.success) {
        setPost(res.data.data);
      }
    } catch (error) {
      console.error('Fetch post error:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to delete a post');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      await api.delete(`/posts/${id}`);
      toast.success('Post deleted');
      navigate('/dashboard');
    } catch (error) {
      console.error('Delete post error:', error);
      const message = error.response?.data?.message || 'Failed to delete post';
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 text-sm">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Post not found.</p>
      </div>
    );
  }

  const isOwner = user?._id === post?.author?._id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {post.title}
          </h1>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-4 gap-2">
          <span>By {post.author?.name || 'Unknown'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>

        {post.image && (
          <div className="mb-4">
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-h-[420px] object-cover rounded-lg"
            />
          </div>
        )}

        <div
          className="prose-content text-sm text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Back to dashboard
          </Link>

          {isOwner && (
            <div className="flex items-center gap-2">
              <Link
                to={`/edit/${post._id}`}
                className="text-xs px-3 py-1 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-xs px-3 py-1 rounded-md border border-red-500 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

