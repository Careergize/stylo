import React, { useState } from 'react';
import { 
  Star, 
  Camera, 
  CheckCircle2, 
  ThumbsUp, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';
import type { CustomerReview } from '../../data/reviewsData';
import { getSavedReviews, saveReviews } from '../../data/reviewsData';
import { AddReviewModal } from '../AddReviewModal';
import { PhotoLightboxModal } from '../PhotoLightboxModal';

export const DesktopReviews: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(getSavedReviews);
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | '5stars' | 'groom'>('all');
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
    if (likedReviews[id]) return;
    setLikedReviews(prev => ({ ...prev, [id]: true }));
    const updated = reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r);
    setReviews(updated);
    saveReviews(updated);
  };

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === 'photos') return r.photos && r.photos.length > 0;
    if (activeFilter === '5stars') return r.rating === 5;
    if (activeFilter === 'groom') return r.serviceName.toLowerCase().includes('groom');
    return true;
  });

  const photoReviewsCount = reviews.filter(r => r.photos && r.photos.length > 0).length;

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
      {/* Header & Scoreboard */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#E0A96D]/30 text-xs text-[#E0A96D] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide uppercase">Client Reviews & Makeover Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Real Stories, Real Styles
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            See authentic haircut, beard, and groom transformations submitted by our esteemed gentlemen.
          </p>
        </div>

        {/* Big Overall Rating Card */}
        <div className="flex items-center gap-6 bg-[#161619] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="text-center">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {SALON_INFO.rating}
              </span>
              <span className="text-xs text-neutral-400">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#E0A96D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#E0A96D]" />
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">{SALON_INFO.reviewsCount} verified reviews</p>
          </div>

          <div className="h-12 w-px bg-white/10 hidden sm:block"></div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-xs tracking-wide shadow-[0_4px_16px_rgba(212,163,115,0.35)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>Write Review & Add Photos</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          All Reviews ({reviews.length})
        </button>

        <button
          onClick={() => setActiveFilter('photos')}
          className={`px-4 py-2 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'photos'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>With Customer Photos ({photoReviewsCount})</span>
        </button>

        <button
          onClick={() => setActiveFilter('5stars')}
          className={`px-4 py-2 rounded-full text-xs transition-all flex items-center gap-1 cursor-pointer ${
            activeFilter === '5stars'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          <Star className="w-3 h-3 fill-current" />
          <span>5-Star Experiences</span>
        </button>

        <button
          onClick={() => setActiveFilter('groom')}
          className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
            activeFilter === 'groom'
              ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
              : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
          }`}
        >
          Groom Packages
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-3xl bg-[#161619] border border-white/5 hover:border-white/10 transition-all shadow-md flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${review.avatarColor} flex items-center justify-center text-white font-semibold text-base shadow-inner`}>
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">
                        {review.customerName}
                      </h4>
                      {review.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-[#E0A96D] font-medium bg-[#E0A96D]/10 px-2 py-0.5 rounded-full border border-[#E0A96D]/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center text-[#E0A96D]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-400">• {review.date}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5">
                  {review.serviceName}
                </span>
              </div>

              {/* Comment */}
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                "{review.comment}"
              </p>

              {/* Customer Photos */}
              {review.photos && review.photos.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-[#E0A96D] font-semibold mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Customer Makeover Photos ({review.photos.length})</span>
                  </p>
                  <div className="flex items-center gap-3">
                    {review.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => {
                          setSelectedPhoto(photo);
                          setLightboxTitle(`${review.customerName}'s Makeover Photo`);
                        }}
                        className="relative w-28 h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0 cursor-pointer group shadow-sm bg-black"
                      >
                        <img
                          src={photo}
                          alt={`${review.customerName} photo ${pIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ImageIcon className="w-6 h-6 drop-shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Like */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-neutral-400">
              <span>Verified Client Experience</span>
              <button
                onClick={() => handleLike(review.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  likedReviews[review.id]
                    ? 'bg-[#E0A96D]/20 text-[#E0A96D] border border-[#E0A96D]/40 font-medium'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[review.id] ? 'fill-current' : ''}`} />
                <span>Helpful ({review.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* Lightbox Modal */}
      <PhotoLightboxModal
        photoUrl={selectedPhoto}
        title={lightboxTitle}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
};
