import { LoadMoreFunction, PagedResult } from "@/types";

// Generic loadMore function
export default async function loadMore<T>(
    currentPage: number,
    currentItems: T[],
    getUrlFn: (pageNumber: number) => string,
    fetchFunction:  (query: string) => Promise<PagedResult<T>>,
    appendFunction: (newItems: T[]) => void
  ): Promise<ReturnType<LoadMoreFunction<T>>>{
    const nextPage = currentPage + 1;
    const url = getUrlFn(nextPage);
    
    try {
      const response = await fetchFunction(url);
      
      if (response.data && response.data.length > 0) {
        appendFunction(response.data);
        const stillHasMore = response.data.length + currentItems.length < response.count;
        
        return {
          hasMore: stillHasMore,
          newPage: nextPage
        };
      }
      
      return {
        hasMore: false,
        newPage: currentPage
      };
    } catch (error) {
      console.error("Error loading more items:", error);
      return {
        hasMore: false,
        newPage: currentPage
      };
    }
  };