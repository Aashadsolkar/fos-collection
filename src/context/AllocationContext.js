import React, { createContext, useContext, useState } from "react";
import { getAllocationsApi } from "../api/allocationApi";

const AllocationContext = createContext();

export const AllocationProvider = ({ children }) => {
  const [allocations, setAllocations] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const fetchAllocations = async (
    selectedFilter = filter,
    pageNo = 1,
    isRefresh = false,
    untouched = 0
    
  ) => {
    try {
      const res = await getAllocationsApi({
        page: pageNo,
        per_page: 10,
        period: selectedFilter,
        untouched: untouched
      });

      const items = res?.data?.data?.items || [];
      const pagination = res?.data?.data?.pagination;

      setLastPage(pagination?.last_page || 1);

      if (pageNo === 1 || isRefresh) {
        setAllocations(items);
      } else {
        setAllocations((prev) => [...prev, ...items]);
      }

      setPage(pageNo);
    } catch (error) {
      console.log("Allocation Error:", error);
    }
  };

  const loadMore = (filter, untouched) => {
    if (page < lastPage) {
      fetchAllocations(filter, page + 1, false, untouched);
    }
  };

  return (
    <AllocationContext.Provider
      value={{
        allocations,
        filter,
        setFilter,
        fetchAllocations,
        loadMore,
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
};

export const useAllocation = () => useContext(AllocationContext);