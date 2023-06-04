import { useEffect, useRef, useState } from 'react';

export type Dimensions = {
    width: number;
    height: number;
};

const useResizeObserver = (): {
    ref: React.RefObject<HTMLDivElement>;
    dimensions: Dimensions | null;
} => {
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<Dimensions | null>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            setDimensions({ width, height });
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { ref, dimensions };
};

export default useResizeObserver;
