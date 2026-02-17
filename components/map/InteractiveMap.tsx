'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, X, MapPin, Download } from 'lucide-react';

interface MapSpot {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  type: 'rv' | 'cabin' | 'tent' | 'amenity';
  status: 'available' | 'occupied' | 'reserved';
  details?: string;
}

const MOCK_SPOTS: MapSpot[] = [
  { id: 'rv-1', label: 'RV Site 1-10', x: 25, y: 30, type: 'rv', status: 'available', details: 'Standard Full Hook-up' },
  { id: 'rv-2', label: 'VIP Sites', x: 45, y: 25, type: 'rv', status: 'available', details: 'VIP Deluxe with Patio' },
  { id: 'rv-3', label: 'Presidential Spa', x: 60, y: 20, type: 'rv', status: 'reserved', details: 'Private Hot Tub' },
  { id: 'cabin-1', label: 'Cabins 1-10', x: 35, y: 55, type: 'cabin', status: 'available', details: 'Presidential Cabins' },
  { id: 'cabin-2', label: 'Cabins 11-16', x: 55, y: 60, type: 'cabin', status: 'occupied', details: 'Family Cabins' },
  { id: 'tent-1', label: 'Tent Area', x: 70, y: 50, type: 'tent', status: 'available', details: 'Shaded Tent Sites' },
  { id: 'pool', label: 'Pool & Hot Tub', x: 40, y: 42, type: 'amenity', status: 'available', details: 'Open Daily' },
  { id: 'beer', label: 'Beer Garden', x: 30, y: 45, type: 'amenity', status: 'available', details: 'Open 11AM-10PM' },
  { id: 'office', label: 'Camp Office', x: 20, y: 50, type: 'amenity', status: 'available', details: '8AM-5PM Daily' },
];

const typeColors: Record<string, string> = {
  rv: 'bg-sky-500',
  cabin: 'bg-amber-500',
  tent: 'bg-emerald-500',
  amenity: 'bg-brand-gold',
};

const statusColors: Record<string, string> = {
  available: 'ring-emerald-400',
  occupied: 'ring-red-400',
  reserved: 'ring-amber-400',
};

export function InteractiveMap() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.3, 3));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.3, 0.5));
  const handleReset = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(s => Math.min(Math.max(s + delta, 0.5), 3));
  }, []);

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button onClick={handleZoomIn} className="w-10 h-10 bg-white shadow-lodge rounded-lg flex items-center justify-center hover:bg-surface-secondary transition-colors">
          <ZoomIn className="w-5 h-5 text-brand-navy" />
        </button>
        <button onClick={handleZoomOut} className="w-10 h-10 bg-white shadow-lodge rounded-lg flex items-center justify-center hover:bg-surface-secondary transition-colors">
          <ZoomOut className="w-5 h-5 text-brand-navy" />
        </button>
        <button onClick={handleReset} className="w-10 h-10 bg-white shadow-lodge rounded-lg flex items-center justify-center hover:bg-surface-secondary transition-colors">
          <RotateCcw className="w-5 h-5 text-brand-navy" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm shadow-lodge rounded-lg p-3 text-xs">
        <p className="font-bold mb-2 text-brand-navy">Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sky-500" /><span>RV Sites</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /><span>Cabins</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span>Tent Sites</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-brand-gold" /><span>Amenities</span></div>
        </div>
        <div className="border-t border-surface-muted mt-2 pt-2 space-y-1">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-emerald-400" /><span>Available</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-red-400" /><span>Occupied</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-amber-400" /><span>Reserved</span></div>
        </div>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-surface-secondary border border-surface-muted aspect-[16/10] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {/* Map image */}
          <img
            src="/images/RushNoMoreMap.jpg"
            alt="Rush No More Campground Map"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />

          {/* Interactive spots */}
          {MOCK_SPOTS.map((spot) => (
            <button
              key={spot.id}
              className={`absolute w-6 h-6 rounded-full ${typeColors[spot.type]} ring-2 ${statusColors[spot.status]} shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform z-10 cursor-pointer`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onClick={(e) => { e.stopPropagation(); setSelectedSpot(spot); }}
              title={spot.label}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity">
                {spot.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tooltip Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white shadow-lodge-xl rounded-xl p-5 min-w-[240px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-surface-secondary flex items-center justify-center hover:bg-surface-muted"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-4 h-4 rounded-full ${typeColors[selectedSpot.type]}`} />
              <h4 className="font-bold text-base">{selectedSpot.label}</h4>
            </div>
            <p className="text-sm text-brand-stone mb-2">{selectedSpot.details}</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                selectedSpot.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                selectedSpot.status === 'occupied' ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {selectedSpot.status.charAt(0).toUpperCase() + selectedSpot.status.slice(1)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
