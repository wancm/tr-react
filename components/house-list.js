import loadingStatus from "@/helpers/loadingStatus";
import { useContext, useMemo, useRef, useState } from "react";
import useHouses from "../hooks/useHouses";
import { navigationContext } from "./app";
import { HouseRowMem } from "./house-row";
import LoadingIndicator from "./loadingIndicator";

const houseArray = [
  {
    id: 1,
    address: "12 Valley Kings, Geneva",
    country: "Switzerland",
    price: 90000,
  },
  {
    id: 2,
    address: "89 Road of forks, Bern",
    country: "Switzerland",
    price: 50000,
  },
];

const HouseList = ({ setSelectedHouse }) => {
  console.log("render: HouseList");

  const { navigate } = useContext(navigationContext);

  /**
   *  A hook is a function.
   *    - the first parameter of the hook is the initial value of the state
   *
   *  Rules of a hook
   *    - call hooks at the top level (first line of the code) so there is no way that the hook (ex: useState) is skipped when the component's function is called.
   *    - useState is called within the component's function
   *
   * useState
   *    - it is imported from the React library.
   *    - useState returns an array
   *    - the first element in the array is an object that represents the current state
   *    - the second element in the array is a function that use to change the state
   *        - you can give the function any way you want, but it's expected to have a 'set' prefix
   *        - by calling the set function, React will know that the state is updated and will rerender the UI automatically if needed
   *
   */
  // cm: comment this line ad it's already refactored to use custom hook 'useHouses' below
  // const [houses, setHouses] = useState([]); // this state initial value is the houseArray

  const { houses, setHouses, loadingState } = useHouses();

  // you can useState hook more than 1 time
  const [counter, setCounter] = useState(3);

  // // useRef <= Persists value that survive on a rerender event without causing another rerender
  // const refCounter = useRef(0); // useRef() returns an object that has a 'current' property that contains the current value

  // // an empty dependency array is control and tells React to runs the useEffect 1 time only
  // const dependencyArray = []; // this will save from playing in infinite loop

  // useEffect(() => {
  //   console.log("use: useEffect-retrieved houses");

  //   const fetchHousesAsync = async () => {
  //     // fetch is an asynchronous operation, it returns a promise
  //     const response = await fetch("http://localhost:3001/api/houses");

  //     // .json() is also an asynchronous operation that we can 'await'
  //     const houses = await response.json();

  //     setHouses(houses);

  //     /** p.s: do not run a useState() hook in a useEffect() hook, this will cause the component rerender and possible will cause an infinite loop
  //      * Instead, you could use a useRef() hook value
  //      */
  //     // setCounter(counter + 1);
  //     refCounter.current++;

  //     // subscribe() to some event stream

  //     return {
  //       /**
  //        * return a function from the effects to clean things up
  //        *
  //        * ex: subscribe() to some event stream from some API,
  //        * and you want to unsubscribe it when the component is unmounted (removed from the UI),
  //        * you can do the unsubscribe() in this function.
  //        *
  //        * But be aware that this function is not only called when a component is removed.
  //        * It is also called every time before the effect function function is fires again..
  //        * so if you have a dependency array or no dependency array at all, keep this in mind
  //        *
  //        */
  //     };
  //   };

  //   fetchHousesAsync();
  // }, dependencyArray);

  /** Not only a component output can be memorized, but values inside a component can be memorized too....
   *
   * Memo hook, memorized value in components! ...
   * The memo hook could be handy to optimize the performance of your components.
   * Take example below...
   * 
   * const result = (houses) => {
        // a heavy processing function that is quite time consuming
        // we don't want this function to be executed on every rerender,
        // because rerender can occurs frequently
      };
   */

  // Calls your function and caches its result - https://beta.reactjs.org/reference/react/useCallback
  const result = useMemo(
    (houses) => {
      // a heavy processing function that is quite time consuming
      // we don't want this function to be executed on every rerender,
      // because rerender can occurs frequently

      console.log("executed: useMemo((houses) => {})");
    },
    [houses]
  ); // <= this time the houses would be our dependency array to determine when to run this heavy function

  const addHouse = () => {
    // 1. the set function also can take a function as a parameter that gets the current state.
    // 2. when multiple calls to the set function are done, React batches the calls for efficiency, only updating the state value when the batch is completed.
    //      therefore, using pattern below it is guarantee that the @current param contains the value that was set by the previous call of the function

    setCounter((current) => {
      console.log(current);
      return counter + 1;
    });

    // 3. as example below, we are passing in a primitive type (not a reference type), with this, React wil compare if the value,
    // and only if the value is different, then

    /** setHouses is the function that destructure from the useState hook above.
     * Remember, React will only detect a changed when the actual reference to the object was changed.
     * So, we need a new array here with the same elements as the existing array plus the changes (ex: push/pop).
     */

    setHouses([
      ...houses, // ... <= the spread syntax. This will extract all elements from the existing array and put them in the new 1 we are defining here.
      {
        id: counter,
        address: "32 Valley Way, New York",
        country: "USA",
        price: null,
      },
    ]);
  };

  /** Important concept:
   * When the state of a component changes it re-renders.
   * Every time the state of a component changes, it's function will be executed again.
   *    - which means those useState() code within this function will be call again
   *    - so what React will do is the inspect if the current state value has a value, if it does, then it will re-use the same value, otherwise, it will use the initial pass-in value.
   *
   * Therefore, it's a bad practice to put useState into a conditional (if else) statement, doing that will mess up this internal system of state keeping.
   *
   * */

  // another example of useRef() hook...
  const inputEl = useRef(null);
  const onButtonRefDemoClick = () => {
    // with the 'ref' attribute assigned the @inputEl from the <input> element
    // all javascript member of that <input> DOM object are available here..
    // The object is the same object you get when do a call to the document.getElementById() func.
    inputEl.current.focus();
    inputEl.current.value = "useRef() rocks!";
  };

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState}></LoadingIndicator>;
  }

  return (
    <>
      useRef() demo: <input ref={inputEl} type="text" />
      <button onClick={onButtonRefDemoClick}>Focus the input`</button>
      <br></br>
      <br></br>
      <br></br>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{counter}</td>
          </tr>
          {/* map func is not specific to React, but it's commonly used in React
             the key prop, to help React understand how to render the array when it's update
           */}
          {houses.map((h) => (
            <HouseRowMem
              key={h.id}
              house={h}
              setSelectedHouse={setSelectedHouse}
            />
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => addHouse()}>
        Add
      </button>
    </>
  );
};

export default HouseList;
