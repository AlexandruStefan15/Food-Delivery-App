import { useQuery } from "@tanstack/react-query";

import type { User } from "../types/user";

const fetchUserById = async (id: number): Promise<User> => {
	const response = await fetch(`http://localhost:3001/users/${id}`);

	if (!response.ok) {
		throw new Error("Failed to fetch user");
	}

	const data = await response.json();
	return data;
};

export const useGetUserById = (userId?: number) => {
	return useQuery<User, Error>({
		queryKey: ["users", userId],
		queryFn: () => fetchUserById(userId!),
		enabled: !!userId,
	});
};
