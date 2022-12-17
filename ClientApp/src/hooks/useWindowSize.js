import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
    const [size, setSize] = useState(0);

    function updateSize() {
        setSize(window.innerWidth);
    }

    useLayoutEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

export default useWindowSize;
