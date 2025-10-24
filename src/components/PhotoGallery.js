import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Load images from localStorage on component mount (defensive)
    try {
      const savedImages = localStorage.getItem('birthdayImages');
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setImages(parsed);
          return;
        }
      }
    } catch (err) {
      // ignore and fall back to defaults
      // console.warn('Failed to parse saved images', err);
    }

    // Default images if none saved or saved data invalid
    const defaultImages = [
      { id: 'default-1', src: '/assets/images/image1.jpeg', alt: 'Memory 1' },
      { id: 'default-2', src: '/assets/images/image2.jpeg', alt: 'Memory 2' },
      { id: 'default-3', src: '/assets/images/image3.jpeg', alt: 'Memory 3' },
      { id: 'default-4', src: '/assets/images/image4.jpeg', alt: 'Memory 4' },
      { id: 'default-5', src: '/assets/images/image5.jpeg', alt: 'Memory 5' }
    ];
    setImages(defaultImages);
    localStorage.setItem('birthdayImages', JSON.stringify(defaultImages));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImg = {
          src: e.target.result,
          alt: file.name,
          id: Date.now()
        };
        const updatedImages = [...images, newImg];
        setImages(updatedImages);
        localStorage.setItem('birthdayImages', JSON.stringify(updatedImages));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('birthdayImages', JSON.stringify(updatedImages));
  };

  // Placeholder svg data URL used for unavailable images
  const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23f8e6d9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23805b3b" font-size="18">Image unavailable</text></svg>'
  );

  const handleImageError = (e, id, idx) => {
    // prevent infinite loop if placeholder also fails
    e.target.onerror = null;
    // show placeholder immediately
    e.target.src = placeholder;

    // remove invalid entry from gallery & localStorage
    const updatedImages = id ? images.filter(img => img.id !== id) : images.filter((_, i) => i !== idx);
    setImages(updatedImages);
    localStorage.setItem('birthdayImages', JSON.stringify(updatedImages));
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="photo-gallery">
      <h2>Our Beautiful Memories</h2>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="image-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="image-upload" className="upload-btn">
          Add New Photo
        </label>
      </div>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={image.id || index} className="gallery-item card-glow">
            {/* cube wrapper provides 3D-hover effect but delegates clicks to open modal */}
            <div
              className="cube-wrapper"
              role="button"
              tabIndex={0}
              onClick={() => openModal(image)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(image);
                }
              }}
            >
              <div className="cube">
                <div className="face front">
                  <img
                    src={image.src}
                    alt={image.alt}
                    onError={(e) => handleImageError(e, image.id, index)}
                  />
                </div>
                <div className="face right">
                  <img src={image.src} alt={image.alt} onError={(e) => handleImageError(e, image.id, index)} />
                </div>
                <div className="face back">
                  <img src={image.src} alt={image.alt} onError={(e) => handleImageError(e, image.id, index)} />
                </div>
                <div className="face left">
                  <img src={image.src} alt={image.alt} onError={(e) => handleImageError(e, image.id, index)} />
                </div>
              </div>
            </div>

            {image.id && (
              <button className="delete-btn" onClick={() => deleteImage(image.id)} aria-label={`Delete ${image.alt}`}>
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
