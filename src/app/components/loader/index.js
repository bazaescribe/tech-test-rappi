import React from "react";
import Styles from "./Loader.module.css";


const Loader = () => {
  return(
    <div className={Styles.loaderWrapper}>
      <div className={`${Styles.loaderBall} ${Styles.loaderBallA}`}></div>
      <div className={`${Styles.loaderBall} ${Styles.loaderBallB}`}></div>
      <div className={`${Styles.loaderBall} ${Styles.loaderBallC}`}></div>
    </div>
  );
};

export default Loader;