import { useEffect, useState } from "react";
import photos from "./data/pictures";

export const Gallery = () => {
  const numberOfPhotos = photos.length;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // setter takes callback to take latest value from useState
      return setIndex((storedIndex) => (storedIndex + 1) % numberOfPhotos);
    }, 1000);

    // When you return it runs when component is about to be distroyed
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <img src={photos[index].image} alt="Gallery"></img>
    </div>
  );
};
