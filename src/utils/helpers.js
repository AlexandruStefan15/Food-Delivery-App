export function getAverageTime(timeStr) {
	//ex: "20-30 min" -> 25

	if (!timeStr || typeof timeStr !== "string") return 0;

	const numbers = timeStr.match(/\d+/g);
	if (!numbers) return 0;

	const nums = numbers.map(Number);
	const sum = nums.reduce((acc, curr) => acc + curr, 0);

	return sum / nums.length;
}
