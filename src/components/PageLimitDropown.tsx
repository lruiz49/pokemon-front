import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface PageLimitDropdownProps {
  limit: number;
  setLimit: (l: number) => void;
}

export const PageLimitDropdown = ({ limit, setLimit }: PageLimitDropdownProps) => {
  
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1 py-0.5 text-sm text-gray-600">
          Limit: {limit}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLimit(10)}>10</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLimit(20)}>20</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLimit(50)}>50</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLimit(100)}>100</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
