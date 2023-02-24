import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";

const useBids = (houseId) => {
  const [bids, setBids] = useState([]);
  const { get, loadingState } = useGetRequest(
    `http://localhost:3001/api/bids/${houseId}`
  );

  useEffect(() => {
    const fetchBids = async () => {
      const bids = await get();
      setBids(bids);
    };

    fetchBids();
  }, [get]);

  const postBid = async (bid) => {
    await fetch(`http://localhost:3001/api/bids`, {
      method: "POST",
      headers: {
        Accept: "applicatin/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });
  };

  const addBid = (bid) => {
    postBid(bid);
    setBids([...bids, bid]);
  };

  return { bids, addBid, loadingState };
};

export default useBids;
