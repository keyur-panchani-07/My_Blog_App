import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user?._id === post?.author?._id;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {post.title}
          </h3>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-3 gap-2">
          <span>By {post.author?.name || 'Unknown'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {post.image && (
          <div className="mb-3">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        <p
          className="text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Read more
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
              onClick={() => onDelete && onDelete(post._id)}
              className="text-xs px-3 py-1 rounded-md border border-red-500 text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

