import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

interface NotaryPortraitProps {
  className?: string;
  imageClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBadge?: boolean;
  altText?: string;
}

export const NotaryPortrait: React.FC<NotaryPortraitProps> = ({
  className = '',
  imageClassName = '',
  size = 'md',
  showBadge = false,
  altText = 'Syarifah Nurul Aziizi, S.H., M.Kn. - Notaris & Pejabat Pembuat Akta',
}) => {
  const { notaryProfile } = useData();

  // Prefer uploaded photoUrl from profile, with fallback chain
  const photoTarget = notaryProfile.photoUrl || '/SYARIFAH_NURUL.png';

  const candidates = [
    photoTarget,
    '/SYARIFAH_NURUL.png',
    '/SYARIFAH NURUL.png',
    '/syarifah_portrait.svg',
  ].filter(Boolean) as string[];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasError, setHasError] = useState(false);

  // Whenever notaryProfile.photoUrl changes, immediately reset candidate index to 0
  useEffect(() => {
    setCurrentIndex(0);
    setHasError(false);
  }, [notaryProfile.photoUrl]);

  // Handle image load error by cycling through candidates
  const handleError = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
    md: 'w-24 h-24 sm:w-32 sm:h-32 rounded-2xl',
    lg: 'w-48 h-60 sm:w-56 sm:h-72 rounded-3xl',
    hero: 'w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[430px] rounded-3xl',
  };

  const currentSrc = candidates[currentIndex] || '/SYARIFAH_NURUL.png';

  return (
    <div className={`relative inline-block ${className} group`}>
      {/* Outer frame styling with bright pastel emerald border */}
      <div
        className={`overflow-hidden relative shadow-xl bg-gradient-to-b from-[#f0fdf4] to-[#d1fae5] border-4 border-white ${sizeClasses[size]}`}
      >
        {!hasError ? (
          <img
            key={currentSrc}
            src={currentSrc}
            alt={altText}
            onError={handleError}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105 ${imageClassName}`}
            loading="eager"
          />
        ) : (
          /* High-fidelity fallback SVG if image fails */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] p-4 text-[#065f46]">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#059669] text-2xl mb-2 shadow-md">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <span className="font-serif font-bold text-center text-xs sm:text-sm text-[#064e3b]">
              {notaryProfile.name}
            </span>
            <span className="text-[10px] text-[#047857] font-semibold text-center mt-0.5">
              Notaris & Pejabat Pembuat Akta
            </span>
          </div>
        )}

        {/* Soft colorful gradient highlight at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/30 via-transparent to-transparent pointer-events-none opacity-50"></div>
      </div>
    </div>
  );
};


