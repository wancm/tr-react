import currencyFormatter from "@/helpers/currencyFormatter";
import loadingStatus from "@/helpers/loadingStatus";
import useBids from "@/hooks/useBids";
import { useState } from "react";
import LoadingIndicator from "./loadingIndicator";

const Bids = ({ house }) => {
  const { bids, loadingState, addBid } = useBids(house.id);

  const emptyBid = {
    houseId: house.id,
    bidder: "",
    amount: 0,
  };

  const [newBid, setNewBid] = useState(emptyBid);

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState}></LoadingIndicator>;
  }

  const onBidSubmitClick = () => {
    addBid(newBid);
    setNewBid(emptyBid);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Bidder</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((b) => {
            <tr key={b.id}>
              <td>{b.bidder}</td>
              <td>{currencyFormatter.format(b.amount)}</td>
            </tr>;
          })}
        </tbody>
      </table>
      <br></br>
      <br></br>
      Bidder:
      <input
        id="bidder"
        type="text"
        value={newBid.bidder}
        onChange={(e) => setNewBid({ ...newBid, bidder: e.target.value })}
      ></input>
      <br></br>
      Amount:
      <input
        id="amount"
        type="number"
        value={newBid.amount}
        onChange={(e) =>
          setNewBid({ ...newBid, amount: parseInt(e.target.value) })
        }
      ></input>
      <br></br>
      <br></br>
      <button className="btn btn-primary" onClick={onBidSubmitClick}>
        Submit
      </button>
    </>
  );
};

export default Bids;
