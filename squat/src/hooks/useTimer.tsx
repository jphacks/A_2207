import React from "react";

const useTimer = () => {
    const [time, setTime] = React.useState(10);
    const isStart = time <= 1;

    React.useEffect(() => {
        const id = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        return () => clearInterval(id);
    }, [time]);

    return { time, isStart };
};

export { useTimer };
