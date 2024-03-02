import { useSpring, animated } from "react-spring";
import { thousandSeparator } from "./thousandSeparator";

interface animateProps {
    digit: number,
    className?: string,
}

export const CountUp = ({digit, className}: animateProps) => {
    const { number }   = useSpring({
        from: {number: 0},
        number: digit,
        delay: 100,
        config: {mass: 1, tension: 20, friction: 5}
    });

    return (
        <animated.h2 className={className}>
            {number.to((n) => thousandSeparator(n.toFixed(0)))}
        </animated.h2>
    )
}