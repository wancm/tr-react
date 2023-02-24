import { useEffect, useRef, useState } from "react";
import useGetRequest from "./useGetRequest";

/**
 * Important! hooks doesn't return JSX.
 * But it can use other hooks.
 *
 * 1. A custom hooks is a function which can accept any parameters you want,
 * and return anything you want.
 *
 * 2. When hooks returned state change, the component that uses it rerenders
 *
 * 3. For separation of concerns
 *
 *
 * 4. Re-useability.
 *      - for each custom hooks is reuse, it's state is ISOLATED in each custom hook's scope
 *
 */
const useHouses = () => {
  console.log("use: useHouses");

  const [houses, setHouses] = useState([]); // this state initial value is the houseArray

  // useRef <= Persists value that survive on a rerender event without causing another rerender
  const refCounter = useRef(0); // useRef() returns an object that has a 'current' property that contains the current value

  // an empty dependency array is control and tells React to runs the useEffect 1 time only
  const dependencyArray = []; // this will save from playing in infinite loop

  const { get, loadingState } = useGetRequest(
    "http://localhost:3001/api/houses"
  );

  useEffect(() => {
    console.log("use: useHouses.useEffect");

    const fetchHousesAsync = async () => {
      const houses = await get();
      setHouses(houses);

      /** p.s: do not run a useState() hook in a useEffect() hook, this will cause the component rerender and possible will cause an infinite loop
       * Instead, you could use a useRef() hook value
       */
      // setCounter(counter + 1);
      refCounter.current++;

      // subscribe() to some event stream

      return {
        /**
         * return a function from the effects to clean things up
         *
         * ex: subscribe() to some event stream from some API,
         * and you want to unsubscribe it when the component is unmounted (removed from the UI),
         * you can do the unsubscribe() in this function.
         *
         * But be aware that this function is not only called when a component is removed.
         * It is also called every time before the effect function function is fires again..
         * so if you have a dependency array or no dependency array at all, keep this in mind
         *
         */
      };
    };

    fetchHousesAsync();
  }, [get]);

  return { houses, setHouses, loadingState };
};

export default useHouses;
