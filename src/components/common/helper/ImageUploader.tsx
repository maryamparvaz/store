
import React, { useState, ChangeEvent } from 'react';
import { Button } from '@mui/material';

interface ImageUploaderProps {
  onImageUploaded: (base64Image: string) => void;
  initialImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, initialImage }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage || null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewImage(base64String);
      onImageUploaded(base64String);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {previewImage && (
        <div className="w-40 h-40 overflow-hidden rounded-md mb-2">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <Button
        variant="contained"
        component="label"
        color="primary"
      >
        {previewImage ? 'Change Image' : 'Upload Image'}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
    </div>
  );
};

export default ImageUploader;
