import { useEffect, useState } from "react";
import matrix from "./data/matrix";

export const MatrixEffect = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setIndex((currentIndex) => {
        return (currentIndex + 1) % matrix.length;
      });
    }, 16);
  }, []);
  return <img src={matrix[index]} alt="Matrix"></img>;
};
