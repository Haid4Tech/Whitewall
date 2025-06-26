import { FC } from "react";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface PropertiesDropDown {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const PropertiesDropDown: FC<PropertiesDropDown> = ({
  onEdit,
  onView,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white">
        <DropdownMenuItem className="cursor-pointer" onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Property
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-pointer ${isDeleting ? 'text-gray-400 cursor-not-allowed' : 'text-red-600'}`}
          onClick={isDeleting ? undefined : onDelete}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertiesDropDown;
