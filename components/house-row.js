/**
 * React rely on a pure function for performance and do it's rendering works efficiently
 *
 * A pure function is a function that always return the same results if same parameters are passed in.
 *  - Easy to test
 *  - Predictable
 *  - Reliable
 *  - Cache-able
 *
 *  Function of a component must be pure
 *   - The function should always return the same jsx if give the same state
 */

import navValues from "@/helpers/navValues";
import React, { useContext } from "react";
import currencyFormatter from "../helpers/currencyFormatter";
import { navigationContext } from "./app";

/** This is pure function, it always produce the same JSX result if the passed in object has the property value */

const HouseRow = ({ house, setSelectedHouse }) => {
  console.log("render: HouseRow");

  const { navigate } = useContext(navigationContext);

  return (
    // <tr onClick={() => setSelectedHouse((oldHouse) => house)}>
    <tr onClick={() => navigate(navValues.house, house)}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price && (
        <td className={house.price > 50000 ? "text-primary" : ""}>
          {currencyFormatter.format(house.price)}
        </td>
      )}
    </tr>
  );
};

/** Therefore, we could use the React memorized version
 *
 * but! React.memo has its overhead in terms of performance, and React's re-rendering cycle is highly optimized,
 * therefore, you should only use it WHEN YOU CAN MEASURE THAT IT IS ACTUALLY FASTER !
 *
 * usually its only faster:-
 *  - Pure functional component
 *  - Renders often
 *  - with the same prop values
 *  - JSX isn't trivial
 *      Take this HouseRow component as example:
 *      because of the JSX that return from the component is simple,
 *      therefore, the performance improvement is insignificant!
 *
 * https://reactjs.org/docs/react-api.html#reactmemo
 *
 */
const HouseRowMem = React.memo(HouseRow);

// export the memorize version；
export { HouseRowMem };

// export the normal version
export default HouseRow;
