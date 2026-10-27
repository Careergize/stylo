import React from 'react';
import { X } from 'lucide-react';

interface PhotoLightboxModalProps {
  photoUrl: string | null;
  onClose: () => void;
  title?: string;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photoUrl,
  onClose,
  title = "Customer Photo"
}) => {
  if (!photoUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="w-full flex items-center justify-between pb-3 text-white">
          <span className="text-xs font-medium text-neutral-300 tracking-wide uppercase">
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Full Image */}
        <div className="relative w-full max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#141416] flex items-center justify-center">
          <img
            src={photoUrl}
            alt={title}
            className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
