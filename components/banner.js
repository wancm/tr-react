import styles from "./banner.module.css";

const subtitleStyle = {
  fontStyle: "italic", // class name are in camel-case without the dash
  fontSize: "x-large", // class name are in camel-case without the dash
  color: "coral",
};

const Banner = (props) => {
  /** Important rules!
   * props <= are read only! a component should never modify it's own props.
   * One of the reasons is that many props are passed on other components by reference using an object or array.
   */
  /**
   * The props object contains a special property called { children },
   * which contains all markup present between the start and end tag.
   * It could be a string, or even html element
   */
  /** style={{ fontStyle: "italic" }} <= inline example */
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src="./GloboLogo.png" alt="logo" className={styles.logo}></img>
      </div>
      <div className="col-7 mt-5" style={subtitleStyle}>
        {props.headerText}&nbsp;&nbsp;&nbsp;[{props.children}]
      </div>
    </header>
  );
};

export default Banner;
