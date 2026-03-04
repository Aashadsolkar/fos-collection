import React, { createContext, useContext, useState } from "react";
import { getDispositionsApi } from "../api/dispositionApi";

const DispositionContext = createContext();

export const DispositionProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [period, setPeriod] = useState("yesterday");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const fetchDispositions = async (
    selectedPeriod = period,
    pageNo = 1,
    isRefresh = false
  ) => {
    try {
      const res = await getDispositionsApi({
        page: pageNo,
        period: selectedPeriod,
      });

      const data = res?.data?.data?.items || [];
      const pagination = res?.data?.data?.pagination;

      setLastPage(pagination?.last_page || 1);

      if (pageNo === 1 || isRefresh) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }

      setPage(pageNo);
    } catch (err) {
      console.log("Disposition Error:", err);
    }
  };

  const loadMore = () => {
    if (page < lastPage) {
      fetchDispositions(period, page + 1);
    }
  };

  return (
    <DispositionContext.Provider
      value={{
        items,
        period,
        setPeriod,
        fetchDispositions,
        loadMore,
      }}
    >
      {children}
    </DispositionContext.Provider>
  );
};

export const useDisposition = () => useContext(DispositionContext);