import { useEffect, useState } from "react";

type UseActiveMenuCategoryOptions = {
	sectionSelector?: string;
	initialCategoryId?: number | null;
	rootMargin?: string;
	threshold?: number | number[];
	observeKey?: string | number;
	debug?: boolean;
};

export function useActiveMenuCategory({
	sectionSelector = "[data-category-id]",
	initialCategoryId = null,
	rootMargin = "-330px 0px -66% 0px",
	threshold = 0,
	observeKey = "",
	debug = false,
}: UseActiveMenuCategoryOptions) {
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId);

	useEffect(() => {
		const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));

		if (sections.length === 0) {
			setActiveCategoryId(null);
			return;
		}

		const getCategoryId = (section?: HTMLElement) => {
			if (!section) return null;

			const categoryId = Number(section.dataset.categoryId);

			return Number.isNaN(categoryId) ? null : categoryId;
		};

		const firstCategoryId = getCategoryId(sections[0]);

		setActiveCategoryId((currentCategoryId) => {
			const currentCategoryStillExists = sections.some((section) => getCategoryId(section) === currentCategoryId);

			if (currentCategoryStillExists) {
				return currentCategoryId;
			}

			return firstCategoryId ?? initialCategoryId;
		});

		const visibleSections = new Set<HTMLElement>();

		const updateActiveCategory = () => {
			const viewportBottom = window.scrollY + window.innerHeight;
			const documentBottom = document.documentElement.scrollHeight;
			const isAtPageBottom = viewportBottom >= documentBottom - 5;

			if (isAtPageBottom) {
				const lastCategoryId = getCategoryId(sections.at(-1));

				if (lastCategoryId !== null) {
					setActiveCategoryId(lastCategoryId);
				}

				return;
			}

			const visibleSection = [...visibleSections]
				.filter((section) => section.isConnected)
				.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];

			if (!visibleSection) return;

			const categoryId = getCategoryId(visibleSection);

			if (categoryId !== null) {
				setActiveCategoryId(categoryId);
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const section = entry.target as HTMLElement;

					if (entry.isIntersecting) {
						visibleSections.add(section);
					} else {
						visibleSections.delete(section);
					}
				});

				updateActiveCategory();
			},
			{
				rootMargin,
				threshold,
			},
		);

		sections.forEach((section) => {
			observer.observe(section);
		});

		const handleScroll = () => {
			updateActiveCategory();
		};

		const handleResize = () => {
			updateActiveCategory();
		};

		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});

		window.addEventListener("resize", handleResize);

		updateActiveCategory();

		return () => {
			observer.disconnect();
			visibleSections.clear();

			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [sectionSelector, initialCategoryId, rootMargin, threshold, observeKey]);

	useEffect(() => {
		if (!debug) return;

		const margins = rootMargin.split(/\s+/);

		const topMargin = margins[0] ?? "0px";
		const bottomMargin = margins.length === 1 ? margins[0] : margins.length === 2 ? margins[0] : (margins[2] ?? "0px");

		const invertMargin = (margin: string) => (margin.startsWith("-") ? margin.slice(1) : `-${margin}`);

		const overlay = document.createElement("div");
		overlay.id = "intersection-observer-debug-overlay";

		Object.assign(overlay.style, {
			position: "fixed",
			top: invertMargin(topMargin),
			bottom: invertMargin(bottomMargin),
			left: "0",
			right: "0",
			border: "2px dashed #ff4757",
			backgroundColor: "rgba(255, 71, 87, 0.05)",
			pointerEvents: "none",
			zIndex: "99999",
		});

		const label = document.createElement("div");
		label.textContent = `Observer area: ${rootMargin}`;

		Object.assign(label.style, {
			position: "absolute",
			top: "5px",
			left: "5px",
			padding: "2px 6px",
			borderRadius: "3px",
			backgroundColor: "#ff4757",
			color: "#ffffff",
			fontFamily: "monospace",
			fontSize: "10px",
		});

		overlay.appendChild(label);
		document.body.appendChild(overlay);

		return () => {
			overlay.remove();
		};
	}, [debug, rootMargin]);

	return activeCategoryId;
}
