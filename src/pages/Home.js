import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaYoutube, FaTiktok, FaInstagram, FaFacebook, 
  FaTwitter, FaVimeo, FaDownload 
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Downloader from '../components/Downloader';
import './Home.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const platforms = [
    { name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
    { name: 'TikTok', icon: FaTiktok, color: '#000000' },
    { name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
    { name: 'Facebook', icon: FaFacebook, color: '#1877F2' },
    { name: 'Twitter', icon: FaTwitter, color: '#1DA1F2' },
    { name: 'Vimeo', icon: FaVimeo, color: '#1AB7EA' },
  ];

  const handleGetInfo = async () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    setLoading(true);
    setVideoInfo(null);
    try {
      const res = await axios.post(`${API_URL}/download/info`, { url: videoUrl });
      setVideoInfo(res.data);
      toast.success('Video information loaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to get video information');
      setVideoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (quality, format) => {
    setDownloading(true);
    try {
      const res = await axios.post(
        `${API_URL}/download/video`,
        { url: videoUrl, quality, format },
        { responseType: 'blob' }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      const extension = format === 'mp3' ? 'mp3' : 'mp4';
      link.setAttribute('download', `${videoInfo?.title || 'video'}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Save to user's history if logged in
      if (user && videoInfo) {
        try {
          await axios.post(`${API_URL}/videos/save`, {
            url: videoUrl,
            title: videoInfo.title,
            thumbnail: videoInfo.thumbnail,
            platform: videoInfo.platform,
            quality,
            format
          });
        } catch (err) {
          console.error('Failed to save video:', err);
        }
      }

      toast.success('Download started!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">{t('hero.title', 'Download Videos from Any Platform')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle', 'Fast, free, and easy video downloader supporting YouTube, TikTok, Instagram and more')}
          </p>

          <div className="url-input-container">
            <input
              type="text"
              className="url-input"
              placeholder={t('input.placeholder', 'Paste video URL here...')}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleGetInfo()}
              disabled={loading}
            />
            <button 
              className="btn btn-primary btn-large"
              onClick={handleGetInfo}
              disabled={loading || !videoUrl.trim()}
            >
              {loading ? (
                <>
                  <span className="loading"></span>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <FaDownload />
                  <span>Get Video</span>
                </>
              )}
            </button>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-animation">
                <div className="loading-circle"></div>
                <div className="loading-circle"></div>
                <div className="loading-circle"></div>
              </div>
              <p>Fetching video information...</p>
            </div>
          )}

          {videoInfo && !loading && (
            <Downloader 
              videoInfo={videoInfo}
              onDownload={handleDownload}
              downloading={downloading}
            />
          )}
        </div>
      </div>

      <div className="platforms-section">
        <div className="container">
          <h2>{t('platforms.title', 'Supported Platforms')}</h2>
          <div className="platform-grid">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} className="platform-card">
                  <Icon className="platform-icon" style={{ color: platform.color }} />
                  <h3>{platform.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
