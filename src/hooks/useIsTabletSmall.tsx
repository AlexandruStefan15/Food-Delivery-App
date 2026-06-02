import { useState, useEffect } from "react";

export function useIsTabletSmall(breakpoint = 768) {
	const [isTabletSmall, setIsTabletSmall] = useState<Boolean>(
		window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
		const handleChange = (e: MediaQueryListEvent) => setIsTabletSmall(e.matches);

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [breakpoint]);

	return isTabletSmall;
}
