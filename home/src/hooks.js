import { useEffect, useState } from "react";


export const dynamicAnimationEffect = ({ delay, intervalFrame, length }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // setter takes callback to take latest value from useState
            return setIndex((storedIndex) => (storedIndex + intervalFrame) % length);
        }, delay);

        // When you return it runs when component is about to be distroyed
        return () => {
            clearInterval(interval);
        };
    }, [delay, intervalFrame]);

    return index;
}