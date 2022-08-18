import { useEffect, useState } from "react";
import matrix from "./data/matrix";

export const MatrixEffect = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % matrix.length);
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <img src={matrix[index]} alt="Matrix"></img>;
};
