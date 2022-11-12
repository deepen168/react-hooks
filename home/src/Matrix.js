import { useEffect, useState } from "react";
import matrix from "./data/matrix";
import { dynamicAnimationEffect } from "./hooks";

export const MatrixEffect = () => {
  const [delay, setDelay] = useState(16)
  const [intervalFrame, setIntervalFrame] = useState(1);

  const MINIMUMDELAY = 16;
  const MINIMUMINTERVAL = 1;

  const index = dynamicAnimationEffect({ intervalFrame, delay, length: matrix.length });

  function handledelayChange(e) {
    const newDelay = Number(e.target.value) > MINIMUMDELAY ? Number(e.target.value) : MINIMUMDELAY;
    setDelay(newDelay);
  }

  function handleIntervalFrameChange(e) {
    const newInterval = Number(e.target.value) > MINIMUMINTERVAL ? Number(e.target.value) : MINIMUMINTERVAL;
    setIntervalFrame(newInterval);
  }


  return <div>
    <img src={matrix[index]} alt="Matrix"></img>
    <div className="multiForm">
      please enter delay in miliseconds:
      <input type="number" onChange={handledelayChange} ></input>
      please enter interval:
      <input type="number" onChange={handleIntervalFrameChange} ></input>
    </div>
  </div>
};
