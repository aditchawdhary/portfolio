import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

export const Window: React.FC<WindowProps> = ({ title, children, onClose, onFocus, zIndex }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-200 overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '800px',
        maxWidth: '90vw',
        height: '600px',
        maxHeight: '80vh',
        zIndex,
        border: '2px solid #000',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.5), inset 1px 1px 0px rgba(255,255,255,0.8)'
      }}
      onClick={onFocus}
    >
      {/* Title Bar - Classic Mac OS 9 Style */}
      <div
        className="h-8 flex items-center px-2 cursor-move relative"
        style={{
          background: 'linear-gradient(180deg, #e0e0e0 0%, #c0c0c0 50%, #a0a0a0 100%)',
          borderBottom: '2px solid #808080'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Striped pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
        }} />
        
        <div className="window-controls flex items-center space-x-1 relative z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-4 h-4 bg-gray-300 border border-gray-600 hover:bg-gray-400 flex items-center justify-center text-xs font-bold"
            aria-label="Close"
            style={{ boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.5)' }}
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 text-center text-xs font-bold text-gray-900 relative z-10" style={{
          fontFamily: 'Chicago, "Courier New", monospace',
          textShadow: '1px 1px 0px rgba(255,255,255,0.8)'
        }}>
          {title}
        </div>
        
        <div className="w-4" />
      </div>

      {/* Content Area */}
      <div className="h-[calc(100%-2rem)] overflow-auto p-4 bg-white border-2 border-gray-400" style={{
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2)'
      }}>
        {children}
      </div>
    </div>
  );
};
