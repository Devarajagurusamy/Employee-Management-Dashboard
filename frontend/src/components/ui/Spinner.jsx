import React from 'react';
import { Loader2 } from 'lucide-react';

function Spinner({ text = 'Loading...', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={`${sizeClasses[size] || sizeClasses.md} text-[#007acc] animate-spin`}
      />
      {text && (
        <p className="text-sm font-semibold text-[#007acc]">{text}</p>
      )}
    </div>
  );
}

export default Spinner;
