import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Load videos from localStorage on component mount
    const savedVideos = localStorage.getItem('birthdayVideos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      // Default videos if none saved
      const defaultVideos = [
        { src: '/assets/videos/vid_sample.mp4', title: 'Gurudwara' },
        { src: '/assets/videos/video2.mp4', title: 'Vacation Memories' },
      ];
      setVideos(defaultVideos);
      localStorage.setItem('birthdayVideos', JSON.stringify(defaultVideos));
    }
  }, []);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newVid = {
          src: e.target.result,
          title: file.name,
          id: Date.now()
        };
        const updatedVideos = [...videos, newVid];
        setVideos(updatedVideos);
        localStorage.setItem('birthdayVideos', JSON.stringify(updatedVideos));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteVideo = (id) => {
    const updatedVideos = videos.filter(vid => vid.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('birthdayVideos', JSON.stringify(updatedVideos));
    if (currentVideo >= updatedVideos.length) {
      setCurrentVideo(Math.max(0, updatedVideos.length - 1));
    }
  };

  const nextVideo = () => {
    if (videos.length === 0) return;
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    if (videos.length === 0) return;
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="video-player">
      <h2>Our Special Moments</h2>
      <div className="upload-section">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          id="video-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="video-upload" className="upload-btn">
          Add New Video
        </label>
      </div>

      {videos.length === 0 ? (
        <div className="no-videos">No videos available. Add one to get started.</div>
      ) : (
        <div className="video-container">
          <button className="nav-btn prev" onClick={prevVideo} aria-label="Previous">{'<'}</button>
          <div className="video-wrapper">
            {/* guard access with optional chaining */}
            {videos[currentVideo] ? (
              <>
                <video controls key={videos[currentVideo].id || currentVideo}>
                  <source src={videos[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3>{videos[currentVideo].title}</h3>
                {videos[currentVideo].id && (
                  <button className="delete-btn" onClick={() => deleteVideo(videos[currentVideo].id)}>
                    Delete Video
                  </button>
                )}
              </>
            ) : (
              <div className="no-videos">Loading...</div>
            )}
          </div>
          <button className="nav-btn next" onClick={nextVideo} aria-label="Next">{'>'}</button>
        </div>
      )}
    </section>
  );
};

export default VideoPlayer;
