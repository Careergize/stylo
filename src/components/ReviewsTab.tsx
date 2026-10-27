import React, { useState } from 'react';
import { 
  Star, 
  Camera, 
  CheckCircle2, 
  ThumbsUp, 
  Plus, 
  Image as ImageIcon
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import type { CustomerReview } from '../data/reviewsData';
import { getSavedReviews, saveReviews } from '../data/reviewsData';
import { AddReviewModal } from './AddReviewModal';
import { PhotoLightboxModal } from './PhotoLightboxModal';

export const ReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(getSavedReviews);
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | '5stars' | 'groom' | 'haircut'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState('Customer Photo');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const handleAddReview = (newReview: CustomerReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);
  };

  const handleLike = (id: string) => {
    if (likedReviews[id]) return; // already liked
    setLikedReviews(prev => ({ ...prev, [id]: true }));
    const updated = reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r);
    setReviews(updated);
    saveReviews(updated);
  };

  // Filter reviews
  const filteredReviews = reviews.filter(r => {
    if (activeFilter === 'photos') return r.photos && r.photos.length > 0;
    if (activeFilter === '5stars') return r.rating === 5;
    if (activeFilter === 'groom') return r.serviceName.toLowerCase().includes('groom');
    if (activeFilter === 'haircut') return r.serviceName.toLowerCase().includes('haircut');
    return true;
  });

  const photoReviewsCount = reviews.filter(r => r.photos && r.photos.length > 0).length;

  return (
    <div className="pb-28 pt-5 px-5 space-y-5 animate-in fade-in duration-200">
      {/* Screen Title & Add Review CTA */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
              Client Reviews
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-[#E0A96D]/15 text-[#E0A96D] text-[10px] font-semibold border border-[#E0A96D]/30">
              {SALON_INFO.rating} ★
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Verified transformations & customer photos
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-xs tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer mt-0.5"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Rating Scorecard Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#1C1C1E] to-[#141416] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          {/* Big Score */}
          <div className="text-center sm:text-left">
            <div className="flex items-baseline gap-1 justify-center sm:justify-start">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                {SALON_INFO.rating}
              </span>
              <span className="text-xs text-neutral-400 font-medium">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-[#E0A96D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E0A96D]" />
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 font-medium">
              Based on {SALON_INFO.reviewsCount} reviews
            </p>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 max-w-[190px] space-y-1.5 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 w-3">5★</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E0A96D] rounded-full w-[94%]"></div>
              </div>
              <span className="text-neutral-400 w-6 text-right">94%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 w-3">4★</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E0A96D]/80 rounded-full w-[5%]"></div>
              </div>
              <span className="text-neutral-400 w-6 text-right">5%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 w-3">3★</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E0A96D]/50 rounded-full w-[1%]"></div>
              </div>
              <span className="text-neutral-400 w-6 text-right">1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          All ({reviews.length})
        </button>

        <button
          onClick={() => setActiveFilter('photos')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'photos'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>With Photos ({photoReviewsCount})</span>
        </button>

        <button
          onClick={() => setActiveFilter('5stars')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
            activeFilter === '5stars'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          <Star className="w-3 h-3 fill-current" />
          <span>5 Stars</span>
        </button>

        <button
          onClick={() => setActiveFilter('groom')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
            activeFilter === 'groom'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          Groom Makeovers
        </button>

        <button
          onClick={() => setActiveFilter('haircut')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
            activeFilter === 'haircut'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          Haircuts
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-[#161619] rounded-3xl border border-white/5 p-6">
            <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">No reviews found for this filter</p>
            <p className="text-xs text-neutral-400 mt-1">Be the first to share your makeover photo!</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 px-4 py-2 rounded-full bg-[#E0A96D] text-black text-xs font-semibold"
            >
              Add Review
            </button>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 sm:p-5 rounded-3xl bg-[#18181B] border border-white/5 shadow-md space-y-3 transition-all hover:border-white/10"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${review.avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-inner`}>
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-semibold text-white">
                        {review.customerName}
                      </h4>
                      {review.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-[#E0A96D] font-medium bg-[#E0A96D]/10 px-1.5 py-0.2 rounded-full border border-[#E0A96D]/20">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center text-[#E0A96D]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-neutral-500 font-light">• {review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Service Tag */}
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5 text-right shrink-0">
                  {review.serviceName}
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {review.comment}
              </p>

              {/* Customer Photos Gallery */}
              {review.photos && review.photos.length > 0 && (
                <div className="pt-1">
                  <p className="text-[10px] text-[#E0A96D] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    <span>Customer Photos ({review.photos.length})</span>
                  </p>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                    {review.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => {
                          setSelectedPhoto(photo);
                          setLightboxTitle(`${review.customerName}'s Makeover Photo`);
                        }}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0 cursor-pointer group shadow-sm bg-black"
                      >
                        <img
                          src={photo}
                          alt={`${review.customerName} photo ${pIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ImageIcon className="w-5 h-5 drop-shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400">
                <span className="text-[11px]">Was this review helpful?</span>
                <button
                  onClick={() => handleLike(review.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                    likedReviews[review.id]
                      ? 'bg-[#E0A96D]/20 text-[#E0A96D] border border-[#E0A96D]/40 font-medium'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[review.id] ? 'fill-current' : ''}`} />
                  <span>{review.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Review Button on mobile */}
      <div className="fixed bottom-20 right-5 z-30">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E0A96D] to-[#B88652] text-black shadow-[0_8px_25px_rgba(212,163,115,0.45)] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Add review"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* Lightbox for zooming photos */}
      <PhotoLightboxModal
        photoUrl={selectedPhoto}
        title={lightboxTitle}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};
