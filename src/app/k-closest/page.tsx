import React from "react";

const Page = () => {
	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center">
			<div className="flex items-center justify-center">
				Let&apos;s Go
			</div>
		</div>
	);
};

export default Page;

const kClosest = (points: number[][], k: number): number[][] => {
	const euclideanDistanceFromOrigin = (a: number, b: number) => {
		return Math.sqrt(a ** 2 + b ** 2);
	};
	return [];
};

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
