import navValues from "@/helpers/navValues";
import React, { useCallback, useState } from "react";
import Banner from "./banner";
import ComponentPicker from "./componentPicker";

/**
 * When to use Context and implications.
 *
 * 1. when the same state has to be passed to many components
 *    - Think about rerenders: when a state changed, all child Components will rerender
 *    - Component reuse more difficult, cause the component might rely on the Context being presents
 *    - State provided by Context is basically hidden state, when you start writing a new component, you have no idea it's there,
 *        unless you have thorough understanding of the rest of the source code.
 *
 */

const navigationContext = React.createContext(navValues.home);

const App = () => {
  console.log("render: App");

  const navigate = useCallback(
    (navTo, param) => setNav({ current: navTo, param, navigate }),
    []
  );

  /** State is a property that kept internally in a component */
  const [nav, setNav] = useState({ current: navValues.home });

  const [selectedHouse, setSelectedHouse] = useState();

  // wrapper pattern
  const setSelectedHouseWrapper = (house) => {
    // this wrapper let the parent still have certain controls on what has been passing in to this func
    // it's a good practice to use wrapper than passing the 'setSelectedHouse' directly to your child class

    setSelectedHouse(house);
  };

  const jsx = <div>Hi</div>;
  return (
    <>
      {jsx}
      <navigationContext.Provider value={{ current: nav, navigate }}>
        <Banner headerText="Providing house all over the world">
          <span>text that passed to props.children</span>
        </Banner>
        <ComponentPicker currentNavLocation={nav.current} />
      </navigationContext.Provider>
      {/* {selectedHouse ? (
        <House house={selectedHouse} />
      ) : (
        <HouseList setSelectedHouse={setSelectedHouse} />
      )} */}
    </>
  );
};

export { navigationContext };

export default App;
