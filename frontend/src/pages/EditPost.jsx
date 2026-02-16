import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api/axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts/${id}`);
      if (res.data?.success) {
        const post = res.data.data;
        setTitle(post.title);
        setContent(post.content);
        setCurrentImage(post.image);
      }
    } catch (error) {
      console.error('Fetch post error:', error);
      toast.error('Failed to load post details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Title and content are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (newImageFile) {
      formData.append('image', newImageFile);
    }

    try {
      setSubmitting(true);
      const res = await api.put(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data?.success) {
        toast.success('Post updated successfully');
        navigate(`/posts/${id}`);
      }
    } catch (error) {
      console.error('Update post error:', error);
      const message =
        error.response?.data?.message || 'Failed to update post. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 text-sm">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Edit post</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="An engaging headline..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <ReactQuill value={content} onChange={setContent} theme="snow" />
        </div>

        {currentImage && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Current cover image</p>
            <img
              src={currentImage}
              alt="Current"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New cover image (optional)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
        >
          {submitting ? 'Saving changes...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;

