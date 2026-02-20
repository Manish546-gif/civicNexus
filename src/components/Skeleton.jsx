import React from 'react';

export const SkeletonBase = ({ className = '', children }) => (
    <div className={`relative overflow-hidden bg-gray-100 rounded-md ${className}`}>
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
        {children}
    </div>
);

export const SkeletonText = ({ lines = 1, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, i) => (
            <SkeletonBase key={i} className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-[60%]' : 'w-full'}`} />
        ))}
    </div>
);

export const SkeletonCard = ({ className = '' }) => (
    <SkeletonBase className={`p-4 ${className}`}>
        <div className="flex gap-4">
            <SkeletonBase className="w-12 h-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-3">
                <SkeletonBase className="h-4 w-1/3" />
                <SkeletonBase className="h-10 w-full" />
            </div>
        </div>
    </SkeletonBase>
);

export const SkeletonSection = ({ className = '' }) => (
    <div className={`space-y-6 ${className}`}>
        <SkeletonBase className="h-8 w-1/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    </div>
);

const Skeleton = {
    Base: SkeletonBase,
    Text: SkeletonText,
    Card: SkeletonCard,
    Section: SkeletonSection,
};

export default Skeleton;
