import React from "react";

const page = () => {
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
	const returnArr: number[][] = [];

	while (nums.length > 2) {
		let num = nums.pop();
		console.log(num)
		if (num === undefined) {
			continue;
		}
		const solutions = twoSum(nums, -num);
		solutions.forEach((solution) => {
			solution.push(num!);
			returnArr.push(solution);
		});
		nums = nums.filter((number) => num !== number);
	}

	return returnArr;
}

function twoSum(nums: number[], target: number): number[][] {
	const retrurnArr: number[][] = [];
	const differenceSet = new Set()
	const usedNums = new Set();
	nums.forEach((num) => {
		if (usedNums.has(num)) {
			return;
		}
		if (differenceSet.has(num)) {
			retrurnArr.push([num, target - num]);
			usedNums.add(num);
			usedNums.add(target - num);
			return;
		}
		differenceSet.add(target - num)
	});

	return retrurnArr;
}
// [-1, 0, 1, 2, -1, -4];
// [-1 -5, 4, 0, 1, 2, -1, -4]
