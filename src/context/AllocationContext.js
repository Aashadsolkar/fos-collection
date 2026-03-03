import React, { createContext, useContext, useState } from "react";
import { getAllocationsApi } from "../api/allocationApi";

const AllocationContext = createContext();

export const AllocationProvider = ({ children }) => {
  const [allocations, setAllocations] = useState([]);
  const [filter, setFilter] = useState("today");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const fetchAllocations = async (
    selectedFilter = filter,
    pageNo = 1,
    isRefresh = false
  ) => {
    try {
      const res = await getAllocationsApi({
        filter: selectedFilter,
        page: pageNo,
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

  const loadMore = () => {
    if (page < lastPage) {
      fetchAllocations(filter, page + 1);
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