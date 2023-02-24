import { useCallback, useState } from "react";

/** https://stackoverflow.com/questions/60133412/react-custom-hooks-vs-normal-functions-what-is-the-difference
 * https://www.youtube.com/watch?v=J-g9ZJha8FE
 *
 * React Hooks are JS functions with the power of react,
 * it means that you can add some logic that you could also add into a normal JS function, but also you will be able to use the native hooks
 * like useState, useEffect, etc, to power up that logic, to add it state, or add it side effects, memoization or more.
 *
 * So I believe hooks are a really good thing to manage the logic of the components in a isolated way.
 * So, you could have a foo.component.js (UI), a useFoo.js(logic), where useFoo will contain maybe many js
 * functions and one hook to manage that functions and return what it's supposed.
 *
 */

import loadingStatus from "@/helpers/loadingStatus";

const useGetRequest = (url) => {
  //
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  // https://beta.reactjs.org/reference/react/useCallback
  // Caches your function itself
  const get = useCallback(async () => {
    try {
      // fetch is an asynchronous operation, it returns a promise
      const response = await fetch(url);

      // .json() is also an asynchronous operation that we can 'await'
      const result = await response.json();

      setLoadingState(loadingStatus.loaded);

      return result;
      //
    } catch (error) {
      setLoadingState(loadingStatus.hasErrored);
    }
  }, [url]); // use URL as the dependency reference

  return { get, loadingState };
};

export default useGetRequest;
