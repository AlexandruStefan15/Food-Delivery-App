import { useQuery } from "@tanstack/react-query";

export const useFoodCategories = () => {
	return useQuery({
		queryKey: ["food-categories"],
		queryFn: () =>
			fetch(`${process.env.REACT_APP_API_URL}/food-categories`).then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
				}
				return res.json();
			}),
	});
};
