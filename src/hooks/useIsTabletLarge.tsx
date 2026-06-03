import { useState, useEffect } from "react";

export function useIsTabletLarge(breakpoint = 1024) {
	const [isTabletLarge, setIsTabletLarge] = useState<Boolean>(
		window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
		const handleChange = (e: MediaQueryListEvent) => setIsTabletLarge(e.matches);

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [breakpoint]);

	return isTabletLarge;
}
