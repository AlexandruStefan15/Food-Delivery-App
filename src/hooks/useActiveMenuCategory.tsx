import { useEffect, useState } from "react";

type UseActiveMenuCategoryOptions = {
	sectionSelector?: string;
	initialCategoryId?: number | null;
	rootMargin?: string;
	threshold?: number | number[];
};

export function useActiveMenuCategory({
	sectionSelector = "[data-category-id]",
	initialCategoryId = null,
	rootMargin = "-160px 0px -65% 0px",
	threshold = 0,
}: UseActiveMenuCategoryOptions = {}) {
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId);

	useEffect(() => {
		if (initialCategoryId !== null) {
			setActiveCategoryId((currentId) => currentId ?? initialCategoryId);
		}
	}, [initialCategoryId]);

	useEffect(() => {
		const sections = document.querySelectorAll<HTMLElement>(sectionSelector);

		if (sections.length === 0) return;

		const visibleSections = new Map<Element, IntersectionObserverEntry>();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections.set(entry.target, entry);
					} else {
						visibleSections.delete(entry.target);
					}
				});

				const activeEntry = [...visibleSections.values()].sort(
					(a, b) => Math.abs(a.boundingClientRect.top - 160) - Math.abs(b.boundingClientRect.top - 160),
				)[0];

				if (!activeEntry) return;

				const element = activeEntry.target as HTMLElement;
				const categoryId = Number(element.dataset.categoryId);

				if (!Number.isNaN(categoryId)) {
					setActiveCategoryId(categoryId);
				}
			},
			{
				rootMargin,
				threshold,
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, [sectionSelector, rootMargin, threshold, initialCategoryId]);

	return activeCategoryId;
}
