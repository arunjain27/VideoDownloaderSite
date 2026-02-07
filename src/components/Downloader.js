import React, { useState } from 'react';
import { FaDownload, FaMusic, FaVideo } from 'react-icons/fa';
import './Downloader.css';

const Downloader = ({ videoInfo, onDownload, downloading }) => {
  const [downloadType, setDownloadType] = useState(null); // 'video' or 'audio'

  const handleDownload = (type) => {
    setDownloadType(type);
    if (type === 'video') {
      onDownload('best', 'mp4');
    } else {
      onDownload('audio', 'mp3');
    }
  };

  return (
    <div className="downloader-card">
      {/* Video Preview */}
      <div className="video-preview">
        {videoInfo.thumbnail && (
          <div className="thumbnail-container">
            <img src={videoInfo.thumbnail} alt={videoInfo.title} />
            <div className="play-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
        )}
        <div className="video-info">
          <h3 className="video-title">{videoInfo.title || 'Video'}</h3>
          <div className="video-meta">
            <span className="platform-badge">{videoInfo.platform}</span>
            {videoInfo.duration > 0 && (
              <span className="duration">
                {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="download-buttons-container">
        <button
          className={`download-btn download-video-btn ${downloading && downloadType === 'video' ? 'downloading' : ''}`}
          onClick={() => handleDownload('video')}
          disabled={downloading}
        >
          {downloading && downloadType === 'video' ? (
            <>
              <span className="loading-spinner"></span>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <FaVideo />
              <span>Download Best Video</span>
            </>
          )}
        </button>

        <button
          className={`download-btn download-audio-btn ${downloading && downloadType === 'audio' ? 'downloading' : ''}`}
          onClick={() => handleDownload('audio')}
          disabled={downloading}
        >
          {downloading && downloadType === 'audio' ? (
            <>
              <span className="loading-spinner"></span>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <FaMusic />
              <span>Download Best Audio (MP3)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Downloader;
