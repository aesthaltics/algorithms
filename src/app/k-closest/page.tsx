"use client"

import React from "react";
import { Heap, HeapType } from "../data-structures/Heap";

const Page = () => {
	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center">
			<div className="flex items-center justify-center">
				{kClosest(
					[
						[6, 10],
						[-3, 3],
						[-2, 5],
						[0, 2],
					],
					3
				)}
			</div>
		</div>
	);
};

export default Page;

const kClosest = (points: number[][], k: number): number[][] => {
	const euclideanDistanceFromOrigin = (a: number, b: number) => {
		return Math.sqrt(a ** 2 + b ** 2);
	};
	const map: {
		[num: number]: number[][];
	} = {};
	const maxHeap = new Heap(
		points.map((point) => {
			const distance = euclideanDistanceFromOrigin(point[0], point[1]);
			if (map[distance] === undefined) {
				map[distance] = [point];
			} else {
				map[distance].push(point);
			}
			return distance;
		}),
		HeapType.MAX_HEAP,
		k
	);

	while (maxHeap.length() > k) {
		maxHeap.remove();
	}
	return maxHeap.heap.map((distance) => map[distance].pop() ?? [-1000]);
};

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
