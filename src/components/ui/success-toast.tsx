"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
  duration?: number;
}

export function SuccessToast({
  isVisible,
  onClose,
  message = "Property added successfully!",
  duration = 4000,
}: SuccessToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm transform transition-all duration-300 ${
          isAnimating
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setIsAnimating(false);
                setTimeout(onClose, 300);
              }}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-green-500 h-1 rounded-full transition-all duration-300 ease-linear"
            style={{
              width: isAnimating ? "0%" : "100%",
              transitionDuration: `${duration}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
} 