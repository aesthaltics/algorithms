"use client";

import React from "react";
import { Heap, HeapType } from "../data-structures/Heap";

const Page = () => {
	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center">
			<div className="flex items-center justify-center">
				{kClosest(
					[[-6,-8],[4,-2],[4,5],[5,7],[3,1]],
					4
				)}
			</div>
		</div>
	);
};

export default Page;

const kClosest = (points: number[][], k: number): number[][] => {
	const swap = (indexA: number, indexB: number) => {
		[maxHeap[indexA], maxHeap[indexB]] = [maxHeap[indexB], maxHeap[indexA]];
	};
	const remove = () => {
		if (maxHeap.length <= 1) {
			maxHeap.pop();
			return;
		}
		let prevLastNode = maxHeap.pop();
		maxHeap[0] = prevLastNode!;
		let [currHeadIndex, currLeftIndex, currRightIndex] = [0, 1, 2];

		while (currHeadIndex < maxHeap.length - 1) {
			let biggestChildIndex
			if (maxHeap[currRightIndex] !== undefined) {
				biggestChildIndex =
					maxHeap[currLeftIndex].distance >
					maxHeap[currRightIndex].distance
						? currLeftIndex
						: currRightIndex;
				if (
					maxHeap[biggestChildIndex].distance >
					maxHeap[currHeadIndex].distance
				) {
					swap(biggestChildIndex, currHeadIndex);
					
				} else {
					return;
				}
			} else if (maxHeap[currLeftIndex] !== undefined) {
				if (
					maxHeap[currLeftIndex].distance >
					maxHeap[currHeadIndex].distance
				) {
					swap(currLeftIndex, currHeadIndex);
					biggestChildIndex = currLeftIndex
				}else {
					return
				}
			}else {
				return
			}

			[currHeadIndex, currLeftIndex, currRightIndex] = [
				biggestChildIndex!,
				(biggestChildIndex! + 1) * 2 - 1,
				(biggestChildIndex! + 1) * 2,
			];
		}
	};
	const insert = (obj: { point: number[]; distance: number }) => {
		if (maxHeap.length === k && maxHeap[0].distance < obj.distance) {
			return;
		}
		maxHeap.push(obj);
		let newIndex = maxHeap.length - 1;
		let parentIndex = Math.floor((newIndex - 1) / 2);
		while (newIndex > 0) {
			if (maxHeap[parentIndex].distance < maxHeap[newIndex].distance) {
				swap(newIndex, parentIndex);
			} else {
				break;
			}
			newIndex = parentIndex;
			parentIndex = Math.floor((newIndex - 1) / 2);
		}
		while (maxHeap.length > k) {
			remove()
		}
	};
	const maxHeap: { point: number[]; distance: number }[] = [];
	const euclideanDistanceFromOrigin = (a: number, b: number) => {
		return Math.sqrt(a ** 2 + b ** 2);
	};
	points.forEach((point) => {
		insert({ point: point, distance: euclideanDistanceFromOrigin(point[0], point[1]) });
	});
	return maxHeap.map(obj => obj.point)
};

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
