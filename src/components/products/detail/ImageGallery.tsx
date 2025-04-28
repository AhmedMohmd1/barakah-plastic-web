
import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
  onZoom: (image: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  selectedImage,
  onImageSelect,
  onZoom,
}) => {
  return (
    <div className="relative">
      <img
        src={images[selectedImage]}
        alt="Product"
        className="w-full rounded-lg overflow-hidden"
      />
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onImageSelect(index)}
                className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-white scale-110 shadow-lg'
                    : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => onZoom(images[selectedImage])}
        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-2"
        aria-label="Zoom image"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ImageGallery;
