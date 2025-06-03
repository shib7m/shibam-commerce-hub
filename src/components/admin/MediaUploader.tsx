
import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { MediaFile } from '@/types/admin';

interface MediaUploaderProps {
  onMediaChange: (media: MediaFile[]) => void;
  initialMedia: MediaFile[];
  maxFiles: number;
}

const MediaUploader = ({ onMediaChange, initialMedia, maxFiles }: MediaUploaderProps) => {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newMedia: MediaFile[] = [];
    Array.from(files).forEach((file, index) => {
      if (media.length + newMedia.length < maxFiles) {
        const url = URL.createObjectURL(file);
        const mediaFile: MediaFile = {
          id: `${Date.now()}_${index}`,
          url: url,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          name: file.name
        };
        newMedia.push(mediaFile);
      }
    });

    const updatedMedia = [...media, ...newMedia];
    setMedia(updatedMedia);
    onMediaChange(updatedMedia);
  };

  const removeMedia = (id: string) => {
    const updatedMedia = media.filter(m => m.id !== id);
    setMedia(updatedMedia);
    onMediaChange(updatedMedia);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">الوسائط ({media.length}/{maxFiles})</h3>
        <label htmlFor="media-upload" className="cursor-pointer">
          <Button variant="outline" size="sm" asChild>
            <span>
              <Upload className="w-4 h-4 ml-2" />
              رفع ملفات
            </span>
          </Button>
          <input
            id="media-upload"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={media.length >= maxFiles}
          />
        </label>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0"
                    onClick={() => removeMedia(item.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mt-1 truncate" title={item.name}>
                  {item.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
