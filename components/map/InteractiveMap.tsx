'use client';

import { useState, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export function InteractiveMap() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch pinch
  const [lastTouchDist, setLastTouchDist] = useState<number | null>(null);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.3, 3));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.3, 0.5));
  const handleReset = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  /* ── Mouse drag ── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => setIsDragging(false);

  /* ── Touch drag + pinch ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDist(dist);
    }
  }, [position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && lastTouchDist) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - lastTouchDist) * 0.005;
      setScale(s => Math.min(Math.max(s + delta, 0.5), 3));
      setLastTouchDist(dist);
    }
  }, [isDragging, dragStart, lastTouchDist]);

  const handleTouchEnd = () => { setIsDragging(false); setLastTouchDist(null); };

  return (
    <div className="relative">
      {/* ── Zoom Controls ── */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white/95 backdrop-blur-sm shadow-lodge rounded-xl flex items-center justify-center hover:bg-white hover:shadow-gold transition-all border border-surface-muted/50 group"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-brand-navy group-hover:text-brand-gold transition-colors" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white/95 backdrop-blur-sm shadow-lodge rounded-xl flex items-center justify-center hover:bg-white hover:shadow-gold transition-all border border-surface-muted/50 group"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-brand-navy group-hover:text-brand-gold transition-colors" />
        </button>
        <button
          onClick={handleReset}
          className="w-10 h-10 bg-white/95 backdrop-blur-sm shadow-lodge rounded-xl flex items-center justify-center hover:bg-white hover:shadow-gold transition-all border border-surface-muted/50 group"
          aria-label="Reset view"
        >
          <RotateCcw className="w-5 h-5 text-brand-navy group-hover:text-brand-gold transition-colors" />
        </button>
        <div className="text-center mt-1">
          <span className="text-[9px] font-bold text-brand-stone bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-surface-muted/30">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>

      {/* ── Hint ── */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm shadow-lodge rounded-xl px-4 py-2.5 text-xs border border-surface-muted/50">
        <p className="text-brand-navy/70 font-medium">
          <span className="text-brand-gold font-bold">Tip:</span> Drag to pan &middot; Use buttons to zoom
        </p>
      </div>

      {/* ── Map Container — NO onWheel to prevent accidental zoom on scroll ── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-[#e8e4d4] border-2 border-surface-muted/50 shadow-lodge-lg cursor-grab active:cursor-grabbing"
        style={{ aspectRatio: '16/10.5' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          <img
            src="/images/RushNoMoreMap.jpg"
            alt="Rush No More Campground Map — Full site map showing RV sites, cabins, tent areas, pool, beer garden and all amenities"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}