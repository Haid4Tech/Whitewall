import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <Trash2 className="h-8 w-8 text-red-600" />,
          confirmButton:
            "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white border-red-600",
          iconBg: "bg-red-50 border-red-200",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-8 w-8 text-amber-600" />,
          confirmButton:
            "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white border-amber-600",
          iconBg: "bg-amber-50 border-amber-200",
          borderColor: "border-amber-200",
        };
      case "info":
        return {
          icon: <AlertCircle className="h-8 w-8 text-blue-600" />,
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white border-blue-600",
          iconBg: "bg-blue-50 border-blue-200",
          borderColor: "border-blue-200",
        };
      default:
        return {
          icon: <Trash2 className="h-8 w-8 text-red-600" />,
          confirmButton:
            "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white border-red-600",
          iconBg: "bg-red-50 border-red-200",
          borderColor: "border-red-200",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm p-8">
        <DialogHeader className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.iconBg} border-2 ${styles.borderColor} flex items-center justify-center`}
            >
              {styles.icon}
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-semibold text-gray-900 leading-6">
                {title}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-base text-gray-600 leading-relaxed text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full sm:w-auto px-6 py-2.5 text-sm font-medium focus:ring-2 focus:ring-offset-2 ${styles.confirmButton}`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Deleting...</span>
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
