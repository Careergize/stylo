import React, { useState, useRef } from 'react';
import { X, Star, Trash2, Camera, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import type { CustomerReview } from '../data/reviewsData';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: CustomerReview) => void;
}

const AVATAR_GRADIENTS = [
  "from-amber-600 to-amber-800",
  "from-blue-600 to-indigo-800",
  "from-emerald-600 to-teal-800",
  "from-purple-600 to-violet-800",
  "from-rose-600 to-pink-800"
];

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  onAddReview
}) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert each file to data URL
    const fileList = Array.from(files);
    fileList.forEach(file => {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Only image files (JPG, PNG, WEBP) are supported.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input value so same files can be re-added if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('Please write a short review or feedback.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const randomGradient = AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: customerName.trim(),
      avatarColor: randomGradient,
      rating,
      date: 'Just now',
      serviceName: selectedService,
      comment: comment.trim(),
      photos: uploadedPhotos,
      likes: 0,
      isVerified: true
    };

    setTimeout(() => {
      onAddReview(newReview);
      setIsSubmitting(false);
      // Reset form
      setCustomerName('');
      setComment('');
      setUploadedPhotos([]);
      setRating(5);
      onClose();
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-[#161619] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E0A96D]/15 border border-[#E0A96D]/30 flex items-center justify-center text-[#E0A96D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Share Your Experience
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Add your review and upload your style photos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Star Rating Select */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Your Overall Rating
            </label>
            <div className="flex items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating !== null ? hoverRating >= star : rating >= star);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 transition-transform hover:scale-115 active:scale-95 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        isFilled 
                          ? 'fill-[#E0A96D] text-[#E0A96D] drop-shadow-[0_0_8px_rgba(224,169,109,0.5)]' 
                          : 'text-neutral-600'
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs font-semibold text-[#E0A96D] ml-2">
                {rating === 5 ? '5.0 - Exceptional' : rating === 4 ? '4.0 - Great' : `${rating}.0 Stars`}
              </span>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Your Full Name <span className="text-[#E0A96D]">*</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Rahul Nair"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F0F11] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E0A96D] transition-colors"
            />
          </div>

          {/* Service Done */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Service Experienced
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F0F11] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E0A96D] transition-colors cursor-pointer"
            >
              {SERVICES.map(service => (
                <option key={service.id} value={service.name} className="bg-[#161619] text-white">
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Your Review & Comments <span className="text-[#E0A96D]">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about the fade quality, beard styling, ambience, or stylist hospitality..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F0F11] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#E0A96D] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Photos Upload Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Upload Your Photos (Makeover / Cut)
              </label>
              <span className="text-[11px] text-[#E0A96D] font-medium">
                {uploadedPhotos.length} {uploadedPhotos.length === 1 ? 'photo' : 'photos'} attached
              </span>
            </div>

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload Drop/Click Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/15 hover:border-[#E0A96D]/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 bg-[#0F0F11]/60 hover:bg-[#0F0F11] transition-all cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-[#E0A96D] group-hover:border-[#E0A96D]/40 transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-white group-hover:text-[#E0A96D] transition-colors">
                  Tap to add photos from your phone or device
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Showcase your haircut, groom style, or beard trim
                </p>
              </div>
            </div>

            {/* Photo Previews */}
            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-4 gap-2.5 mt-3">
                {uploadedPhotos.map((photo, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/15 bg-black group">
                    <img
                      src={photo}
                      alt={`Upload preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 font-medium text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(212,163,115,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Posting...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
