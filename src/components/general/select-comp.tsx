import { FC, useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";

interface IDropdownSelect {
  placeholder: string;
  name: string;
  value: string;
  handleChange: (status: string, value: string) => void;
  items: string[];
  label?: string;
}

interface ISearchableDropdown {
  placeholder: string;
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  items: string[];
  label?: string;
}

const DropdownSelect: FC<IDropdownSelect> = ({
  placeholder,
  name,
  value,
  handleChange,
  items,
  label,
}) => {
  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor="status">{label}</Label>}
      <Select
        value={value}
        onValueChange={(value) => handleChange(name, value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem
              className="cursor-pointer w-full"
              key={index}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const SearchableDropdown: FC<ISearchableDropdown> = ({
  placeholder,
  name,
  value,
  handleChange,
  items,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    handleChange(name, selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const clearSelection = () => {
    handleChange(name, "");
    setSearchTerm("");
  };

  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Input
            value={isOpen ? searchTerm : value}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pr-8"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {value && !isOpen && (
              <button
                type="button"
                onClick={clearSelection}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-3 w-3 text-gray-400" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {item}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No locations found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSelect;
export { SearchableDropdown };
