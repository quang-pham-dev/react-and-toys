'use client';

import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StarRatingProps {
  onChange?: (rating: number) => void;
  initialRating?: number;
  className?: string;
}

export default function StarRating({
  onChange,
  initialRating = 0,
  className
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    starIndex: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    const newRating = starIndex + (percent > 0.5 ? 1 : 0.5);
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = () => {
    const newRating = hoverRating || rating;
    setRating(newRating);
    onChange?.(newRating);
  };

  return (
    <div
      className={cn('flex items-center space-x-1', className)}
      role="radiogroup"
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <div
          key={starIndex}
          className="relative cursor-pointer"
          onMouseMove={(e) => handleMouseMove(e, starIndex - 1)}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <Star
            className={cn(
              'w-8 h-8 transition-colors',
              (hoverRating || rating) >= starIndex
                ? 'text-yellow-400'
                : 'text-gray-300'
            )}
          />
          {(hoverRating || rating) > starIndex - 1 &&
            (hoverRating || rating) < starIndex && (
              <StarHalf className="absolute top-0 left-0 w-8 h-8 text-yellow-400" />
            )}
        </div>
      ))}
      <span className="ml-2 text-sm font-medium">
        {hoverRating || rating || 0}/5
      </span>
    </div>
  );
}
