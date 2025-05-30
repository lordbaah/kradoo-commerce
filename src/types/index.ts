export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  // Add any other fields you plan to use
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  currentSkip: number;
}
