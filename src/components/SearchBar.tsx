import { useRef, useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (payload: { searchText: string }) => void;
  isLoading?: boolean;
}


const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (searchText: string) => {
      onSearch({ searchText });
    },
    [onSearch],
  );

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Get search text from state
    const searchText = searchQuery.trim();
    
    if (!searchText) {
      return;
    }
  
    handleSearch(searchText);
  };

  return (
    <form onSubmit={submitForm} className="w-full" dir="rtl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="חפש קו אוטובוס או תחנה..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            className="h-12 pr-10 text-base text-right text-black"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 px-6" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5 ml-2" />} {" "}
          {!isLoading && "חפש"}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
