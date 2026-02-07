import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaDownload } from 'react-icons/fa';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVideos();
    }
  }, [user]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/videos/history`);
      setVideos(res.data.videos || []);
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`${API_URL}/videos/${videoId}`);
      setVideos(videos.filter(v => v._id !== videoId));
      toast.success('Video deleted');
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>My Downloads</h1>
        <p className="dashboard-subtitle">Your downloaded video history</p>

        {videos.length === 0 ? (
          <div className="empty-state">
            <p>No videos downloaded yet</p>
            <p className="empty-hint">Start downloading videos to see them here</p>
          </div>
        ) : (
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video._id} className="video-card">
                {video.thumbnail && (
                  <img src={video.thumbnail} alt={video.title} />
                )}
                <div className="video-card-content">
                  <h3>{video.title}</h3>
                  <div className="video-meta">
                    <span className="platform-badge">{video.platform}</span>
                    <span>{video.quality}</span>
                    <span>{new Date(video.downloadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="video-actions">
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <FaDownload /> View Original
                    </a>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleDelete(video._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
