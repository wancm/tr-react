import navValues from "@/helpers/navValues";
import { useContext } from "react";
import { navigationContext } from "./app";
import Bids from "./bids";
const House = (house) => {
  console.log("render: House");

  const context = useContext(navigationContext);

  console.log(context);

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <button onClick={() => context.navigate(navValues.home)}>
            Back to home
          </button>
          <br></br>
          <br></br>
          <pre>{JSON.stringify(context.current.param)}</pre>
          <Bids house={context.current.param}></Bids>
        </div>
      </div>
    </div>
  );
};

export default House;
