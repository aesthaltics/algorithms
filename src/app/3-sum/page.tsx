import React from "react";

const page = () => {
	const numsToSum = [
		34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43,
		57, -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77,
		12, 47, 61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70,
		69, 17, 49,
	];
	// console.log(threeSum(numsToSum));
	console.log(threeSum([-1, 0, 1, 2, -1, -4]));

	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center gap-5">
			<div className="flex items-center justify-center">
				Let&apos;s 3-sum
			</div>
		</div>
	);
};

export default page;

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

function threeSum(nums: number[]): number[][] {
	const numberOfPositiveNumbers = nums.reduce((acc, cur) => {
		if (cur > 0) {
			return acc + 1;
		}
		return acc;
	}, 0);
	const reversed = numberOfPositiveNumbers < nums.length / 2;
	const sortedNums = nums.sort((a, b) => (reversed ? b - a : a - b));

	const sumArr: number[][] = [];

	const incrementLowIndexPointer = (lowIndexPointer: number): number => {
		lowIndexPointer++;
		while (
			sortedNums[lowIndexPointer - 1] === sortedNums[lowIndexPointer]
		) {
			lowIndexPointer++;
		}
		return lowIndexPointer;
	};

	const decrementHighIndexPointer = (highIndexPointer: number): number => {
		highIndexPointer--;
		while (
			sortedNums[highIndexPointer + 1] === sortedNums[highIndexPointer]
		) {
			highIndexPointer--;
		}

		return highIndexPointer;
	};
	for (
		let baseNumberIndex = 0;
		baseNumberIndex < sortedNums.length;
		baseNumberIndex++
	) {
		if (reversed && sortedNums[baseNumberIndex] < 0) {
			break;
		}
		if (!reversed && sortedNums[baseNumberIndex] > 0) {
			break;
		}
		let [lowIndexPointer, highIndexPointer] = [
			baseNumberIndex + 1,
			sortedNums.length - 1,
		];
		while (highIndexPointer > lowIndexPointer) {
			const sum =
				sortedNums[baseNumberIndex] +
				sortedNums[lowIndexPointer] +
				sortedNums[highIndexPointer];
			if (reversed ? sum >0 : sum < 0) {
				lowIndexPointer = incrementLowIndexPointer(lowIndexPointer);
				continue;
			}
			if (reversed ? sum < 0 : sum > 0) {
				highIndexPointer = decrementHighIndexPointer(highIndexPointer);
				continue;
			}
			// Sum is 0
			sumArr.push([
				sortedNums[baseNumberIndex],
				sortedNums[lowIndexPointer],
				sortedNums[highIndexPointer],
			]);
			lowIndexPointer = incrementLowIndexPointer(lowIndexPointer);
			highIndexPointer = decrementHighIndexPointer(highIndexPointer);
		}
		while (
			sortedNums[baseNumberIndex] === sortedNums[baseNumberIndex + 1]
		) {
			baseNumberIndex++;
		}
	}
	return sumArr;
}
// [
// 	-82, -70, -66, -49, -43, -29, -29, -14, -11, -6, -3, -3, 1, 2, 10, 12, 13,
// 	15, 15, 17, 21, 26, 26, 28, 28, 29, 31, 33, 34, 36, 43, 46, 46, 47, 48, 49,
// 	52, 55, 55, 56, 57, 61, 62, 65, 69, 71, 74, 76, 77, 79, 83, 84, 86, 93, 94,
// ];
function firstVersionOfThreeSum(nums: number[]): number[][] {
	const returnArr: number[][] = [];
	const usedNums = new Set<number>();

	while (nums.length > 2) {
		let num = nums.pop();
		if (num === undefined || usedNums.has(num)) {
			continue;
		}
		const target = -num;

		const differenceSet = new Set();
		const usedInnerNums = new Set(usedNums);
		for (const innerNumber of nums) {
			if (usedNums.has(innerNumber) || usedInnerNums.has(innerNumber)) {
				continue;
			}
			if (differenceSet.has(innerNumber)) {
				returnArr.push([innerNumber, target - innerNumber, num]);
				differenceSet.delete(innerNumber);
				usedInnerNums.add(innerNumber);
				usedInnerNums.add(target - innerNumber);
				continue;
			}
			differenceSet.add(target - innerNumber);
		}
		usedNums.add(num);
	}
	return returnArr;
}
// [-1, 0, 1, 2, -1, -4];

// [1, 0, -1, -2, 1, 4]

// [-1 -5, 4, 0, 1, 2, -1, -4]
