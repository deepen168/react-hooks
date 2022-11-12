import { useEffect, useState } from "react";
import photos from "./data/pictures";
import { dynamicAnimationEffect } from "./hooks";

export const Gallery = () => {
  const SECONDS = 1000;
  const numberOfPhotos = photos.length;
  const MINIMUMDELAY = 1;

  const [delay, setDelay] = useState(3 * SECONDS);
  const [intervalFrame, setIntervalFrame] = useState(1);

  const index = dynamicAnimationEffect({ delay, intervalFrame, length: numberOfPhotos });

  function handleDelayChange(e) {
    const calculatedDelay = Number(e.target.value) > MINIMUMDELAY ? Number(e.target.value) : MINIMUMDELAY;
    setDelay(calculatedDelay * SECONDS);
  }

  function handleIntervalFrameChange(e) {
    const receivedInterval = Number(e.target.value) > MINIMUMDELAY ? Number(e.target.value) : MINIMUMDELAY;
    setIntervalFrame(receivedInterval);
  }

  return (
    <div>
      <img src={photos[index].image} alt="Gallery"></img>
      <div className="setDelay">
        Set Delay:
        <input type='number' onChange={handleDelayChange}></input>
      </div>
      <div className="setIntervalFrame">
        Set Interval:
        <input type='number' onChange={handleIntervalFrameChange}></input>
      </div>
    </div>
  );
};
