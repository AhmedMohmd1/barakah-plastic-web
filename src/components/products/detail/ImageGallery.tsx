
import React from 'react';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image failed to load:', event.currentTarget.src);
    event.currentTarget.src = '/placeholder.svg';
  };

  const goToPrevious = () => {
    onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
  };

  const goToNext = () => {
    onImageSelect(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
        <img
          src={images[selectedImage]}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-300"
          onError={handleImageError}
        />
        
        {/* Navigation Arrows - Show only if multiple images */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Zoom Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onZoom(images[selectedImage])}
          className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
          aria-label="Zoom image"
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* Thumbnail Gallery - Show only if multiple images */}
      {images.length > 1 && (
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onImageSelect(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
