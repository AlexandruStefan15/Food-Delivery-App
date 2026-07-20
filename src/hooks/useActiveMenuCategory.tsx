import { useEffect, useState, useRef } from "react";

type UseActiveMenuCategoryOptions = {
	sectionSelector?: string;
	initialCategoryId?: number | null;
	rootMargin?: string;
	threshold?: number | number[];
	debug?: boolean;
};

export function useActiveMenuCategory({
	sectionSelector = "[data-category-id]",
	initialCategoryId = null,
	// BEST ROOT MARGIN: -110px clears the fixed header perfectly,
	// -85% cuts off the rest of the screen to create a highly accurate trigger strip
	rootMargin = "-330px 0px -66% 0px",
	threshold = 0,
	debug = true,
}: UseActiveMenuCategoryOptions) {
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId);
	const visibleSectionsRef = useRef<Set<HTMLElement>>(new Set());

	// Parse margins cleanly for the debug visual overlay boxes
	const margins = rootMargin.split(" ").map((m) => m.trim());
	const [topStr = "0px", , bottomStr = "0px"] = margins.length === 1 ? [margins[0], margins[0], margins[0]] : margins;

	useEffect(() => {
		if (initialCategoryId !== null) {
			setActiveCategoryId((currentId) => currentId ?? initialCategoryId);
		}
	}, [initialCategoryId]);

	// Debug Overlay Effect
	useEffect(() => {
		if (!debug) return;

		const overlay = document.createElement("div");
		overlay.id = "intersection-observer-debug-overlay";

		Object.assign(overlay.style, {
			position: "fixed",
			top: topStr.startsWith("-") ? topStr.slice(1) : `-${topStr}`,
			bottom: bottomStr.startsWith("-") ? bottomStr.slice(1) : `-${bottomStr}`,
			left: "0px",
			right: "0px",
			border: "2px dashed #ff4757",
			backgroundColor: "rgba(255, 71, 87, 0.05)",
			pointerEvents: "none",
			zIndex: "99999",
		});

		const label = document.createElement("div");
		label.innerText = `Observer Trigger Strip (${rootMargin})`;
		Object.assign(label.style, {
			position: "absolute",
			top: "5px",
			left: "5px",
			background: "#ff4757",
			color: "#fff",
			fontFamily: "monospace",
			fontSize: "10px",
			padding: "2px 6px",
			borderRadius: "3px",
		});

		overlay.appendChild(label);
		document.body.appendChild(overlay);

		return () => overlay.remove();
	}, [debug, rootMargin, topStr, bottomStr]);

	useEffect(() => {
		const sections = document.querySelectorAll<HTMLElement>(sectionSelector);
		if (sections.length === 0) return;

		const visibleSections = visibleSectionsRef.current;
		visibleSections.clear();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const el = entry.target as HTMLElement;
					if (entry.isIntersecting) {
						visibleSections.add(el);
					} else {
						visibleSections.delete(el);
					}
				});

				// FIX: Sort elements inside the trigger strip by their positions.
				// The element lowest down the page (largest/most-positive top value)
				// is always the one the user is actively entering.
				const activeElement = [...visibleSections].sort((a, b) => {
					return b.getBoundingClientRect().top - a.getBoundingClientRect().top;
				})[0];

				if (!activeElement) return;

				const categoryId = Number(activeElement.dataset.categoryId);
				if (!Number.isNaN(categoryId)) {
					setActiveCategoryId(categoryId);
				}
			},
			{ rootMargin, threshold },
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [sectionSelector, rootMargin, threshold, initialCategoryId]);

	return activeCategoryId;
}
