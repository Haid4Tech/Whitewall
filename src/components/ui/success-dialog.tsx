"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Home, ExternalLink, X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string;
  propertyTitle?: string;
  onViewProperty?: () => void;
}

export function SuccessDialog({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  onViewProperty,
}: SuccessDialogProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Staggered animations for better visual impact
      setTimeout(() => setShowIcon(true), 100);
      setTimeout(() => setShowContent(true), 600);
    } else {
      setShowConfetti(false);
      setShowContent(false);
      setShowIcon(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor: [
                  '#3B82F6', // blue
                  '#10B981', // green
                  '#F59E0B', // yellow
                  '#EF4444', // red
                  '#8B5CF6', // purple
                  '#06B6D4', // cyan
                ][Math.floor(Math.random() * 6)],
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}

      {/* Dialog */}
      <Card className="relative w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-300">
        <CardContent className="p-0">
          {/* Success Icon Section */}
          <div className="relative bg-gradient-to-br from-green-400 to-green-600 p-8 text-center">
            <div className="relative z-10">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg transform transition-all duration-700 ${
                  showIcon ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                } ${showIcon ? 'animate-pulse' : ''}`}
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h2
                className={`mt-6 text-2xl font-bold text-white transition-all duration-700 delay-200 ${
                  showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Property Added Successfully!
              </h2>
              
              <p
                className={`mt-2 text-green-100 transition-all duration-700 delay-300 ${
                  showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Your property has been uploaded and is now live
              </p>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {propertyTitle && (
              <div
                className={`mb-4 transition-all duration-700 delay-400 ${
                  showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1">Property Details</h3>
                <p className="text-gray-600 text-sm">{propertyTitle}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div
              className={`space-y-3 transition-all duration-700 delay-500 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {onViewProperty && (
                <Button
                  onClick={onViewProperty}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-105 transition-transform"
                >
                  <Home className="w-4 h-4 mr-2" />
                  View Property
                </Button>
              )}

              <Button
                onClick={() => window.open('/admin/properties', '_blank')}
                variant="outline"
                className="w-full hover:bg-gray-50 transform hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to Properties
              </Button>

              <Button
                onClick={onClose}
                variant="ghost"
                className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 transform hover:scale-105 transition-transform"
              >
                Add Another Property
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors transform hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
} 