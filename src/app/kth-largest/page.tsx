"use client";

import React, { useRef, useState } from "react";
import { Heap, HeapType } from "../data-structures/Heap";

const Page = () => {
	const added_nums = [3, 5, 10, 9, 4];
	const { heap, kthLargestNum, addNum, numToAdd } = useKthtLargest({
		k: 3,
		nums: [4, 5, 8, 2],
		added_nums: added_nums,
	});
	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
			<a
				href="https://leetcode.com/problems/kth-largest-element-in-a-stream/"
				className="text-blue-600 underline text-2xl"
				target="_blank"
			>
				703: Kth Largest Element in a Stream
			</a>
			<p className="text-2xl">Min Heap</p>
			<div className="flex flex-row">
				{added_nums.map((num, index) => (
					<div
						key={index}
						className={`flex items-center justify-center h-8 w-8 ${
							index === numToAdd ? "bg-green-500" : "bg-gray-700"
						}`}
					>
						<p>{num}</p>
					</div>
				))}
			</div>
			<button
				className="px-4 py-2 rounded-md bg-blue-500"
				onClick={addNum}
			>
				Add
			</button>
			<SubTreePresenter list={heap} root={0} />
			<p className="text-5xl">Kth largest = {kthLargestNum}</p>
		</div>
	);
};
export default Page;

export const SubTreePresenter = ({
	list,
	root,
}: {
	list: number[];
	root: number;
}) => {
	return (
		<div className="flex flex-col text-center p-2">
			<div className="rounded-full outline min-w-[25px]">
				{list[root]}
			</div>
			<div className="flex flex-row">
				{list[(root + 1) * 2 - 1] !== undefined && (
					<SubTreePresenter list={list} root={(root + 1) * 2 - 1} />
				)}
				{list[(root + 1) * 2] !== undefined && (
					<SubTreePresenter list={list} root={(root + 1) * 2} />
				)}
			</div>
		</div>
	);
};

const useKthtLargest = ({
	k,
	nums,
	added_nums,
}: {
	k: number;
	nums: number[];
	added_nums: number[];
}) => {
	const kthLargest = useRef(new KthLargest(k, nums));
	const [numToAdd, setNumToAdd] = useState(0);
	const [heap, setHeap] = useState(kthLargest.current.minHeap.heap);
	const [kthLargestNum, setKthLargestNum] = useState<number | undefined>();

	const addNum = () => {
		if (numToAdd > added_nums.length - 1) {
			return;
		}
		setKthLargestNum(kthLargest.current.add(added_nums[numToAdd]));
		setHeap(kthLargest.current.minHeap.heap);
		setNumToAdd(numToAdd + 1);
	};

	return { heap, kthLargestNum, addNum, numToAdd };
};

class KthLargest {
	minHeap: Heap;
	k;

	constructor(k: number, nums: number[]) {
		this.k = k;
		this.minHeap = new Heap(nums, HeapType.MIN_HEAP);
	}

	add(val: number): number {
		if (this.minHeap.length() === this.k && this.minHeap.peek() > val) {
			return this.minHeap.peek();
		}
		this.minHeap.insert(val);
		while (this.minHeap.length() > this.k) {
			this.minHeap.remove();
		}
		return this.minHeap.peek();
	}
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
