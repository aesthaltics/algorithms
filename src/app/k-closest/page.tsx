"use client";

import React, { useRef, useState } from "react";
import { Heap, HeapType } from "@/data-structures/Heap";
import HeapPresenter from "@/components/heapPresenter";

const Page = () => {
	const fasterButtonText: { [num: number]: string } = {
		12800: "...",
		6400: "What are you even doing going this slow?",
		3200: "JFC! can you speed up?",
		1600: "i don't have time for this!",
		800: "reckon we should increase the pace?",
		400: "come on, hurry up dude",
		200: "faster!",
		100: "FASTER! FASTER!",
		50: "I AM SPEED",
	};
	const slowerButtonText: { [num: number]: string } = {
		12800: "Finally a reasonable pace 😮‍💨",
		6400: "just a little bit more time",
		3200: "i'd prefer it even slower, we can't be too carefull",
		1600: "that's better, but it's still pretty fast",
		800: "I wouldn't say no to a bit more thinking time",
		400: "calm down dude, what's your problem?",
		200: "can you slow - the fuck - down?",
		100: "this is starting to get dangerous!",
		50: "STOP! STOP! STOP! Please! We're all gonna die!!",
	};
	const [autoClicker, setAutoClicker] = useState<number>();
	const autoClickerDelayMs = useRef(800);
	const [clickerSpeedButtonsText, setClickerSpeedButtonsText] = useState({
		fasterButtonText:
			fasterButtonText[autoClickerDelayMs.current] ?? "faster",
		slowerButtonText:
			slowerButtonText[autoClickerDelayMs.current] ?? "slower",
	});
	const { generateNextStep, heap } = useKClosest({
		points: [
			[20, 17],
			[-2, 2],
			[15, -12],
			[-14, -2],
			[5, -24],
			[-17, -1],
			[-20, -2],
			[2, 18],
			[-7, 21],
			[0, 6],
			[6, 8],
			[-22, -16],
			[-12, 14],
			[-13, -7],
			[0, 21],
			[-22, 0],
			[-25, -25],
			[-7, -14],
			[7, 14],
			[4, 24],
			[-2, -25],
			[10, 24],
			[-18, -20],
			[-19, -24],
			[-12, -4],
			[-11, 7],
			[2, -22],
			[0, -1],
			[-13, -18],
			[-17, -24],
			[7, 24],
			[-17, 18],
			[6, 23],
			[-13, 20],
			[6, 21],
			[5, 8],
			[-23, -6],
			[24, -24],
			[-1, -22],
			[24, 9],
			[-2, 12],
			[-11, -6],
			[-11, -11],
			[19, 16],
			[15, -10],
			[-20, -16],
			[-16, -17],
			[-4, -19],
			[21, -21],
			[21, -5],
		],
		k: 30,
	});

	const handleAutoClicker = () => {
		if (autoClicker !== undefined) {
			window.clearInterval(autoClicker);
			autoClickerDelayMs.current = 800;
			setAutoClicker(undefined);
		} else {
			setAutoClicker(
				window.setInterval(
					() => generateNextStep(),
					autoClickerDelayMs.current
				)
			);
		}
		setButtonText();
	};
	const slowDownAutoClicker = () => {
		window.clearInterval(autoClicker);
		autoClickerDelayMs.current = Math.min(autoClickerDelayMs.current * 2, 12800)
		setAutoClicker(
			window.setInterval(
				() => generateNextStep(),
				autoClickerDelayMs.current
			)
		);
		setButtonText();
	};
	const speedUpAutoClicker = () => {
		window.clearInterval(autoClicker);
		autoClickerDelayMs.current = Math.max(
			autoClickerDelayMs.current / 2,
			50
		);
		setAutoClicker(
			window.setInterval(
				() => generateNextStep(),
				autoClickerDelayMs.current
			)
		);
		setButtonText();
	};
	const setButtonText = () => {
		setClickerSpeedButtonsText({
			fasterButtonText:
				fasterButtonText[autoClickerDelayMs.current] ?? "faster",
			slowerButtonText:
				slowerButtonText[autoClickerDelayMs.current] ?? "slower",
		});
	};
	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center gap-5">
			<a
				href="https://leetcode.com/problems/k-closest-points-to-origin/"
				className="text-blue-600 underline text-2xl"
				target="_blank"
			>
				973: K Closest Points to Origin
			</a>
			<p className="text-2xl">Max Heap</p>
			{autoClicker === undefined && (
				<div className="flex gap-2">
					<button
						className="w-24 h-12 rounded-md bg-red-400"
						onClick={handleAutoClicker}
					>
						Auto Click!
					</button>
					<button
						className="w-24 h-12 rounded-md bg-green-400"
						onClick={generateNextStep}
					>
						Next!
					</button>
				</div>
			)}
			{autoClicker !== undefined && (
				<div className="flex gap-2">
					<button
						className={`flex items-center justify-center w-24 min-h-fit rounded-md ${
							autoClickerDelayMs.current !== 12800
								? " bg-yellow-400"
								: "bg-gray-700 text-yellow-400"
						}`}
						onClick={slowDownAutoClicker}
					>
						{clickerSpeedButtonsText.slowerButtonText}
					</button>
					<button
						className="flex items-center justify-center w-24 h-12 rounded-md bg-red-400"
						onClick={handleAutoClicker}
					>
						Stop
					</button>
					<button
						className={`flex items-center justify-center w-24 min-h-fit rounded-md ${
							autoClickerDelayMs.current !== 50
								? " bg-green-400"
								: "bg-gray-700 text-green-400"
						}`}
						onClick={speedUpAutoClicker}
					>
						<p>{clickerSpeedButtonsText.fasterButtonText}</p>
					</button>
				</div>
			)}
			<div className="flex items-center justify-center">
				<HeapPresenter list={heap} root={0} />
			</div>
		</div>
	);
};

export default Page;

const useKClosest = ({ points, k }: { points: number[][]; k: number }) => {
	const generator = useRef(kClosestGenerator(points, k));
	const [heap, setHeap] = useState<React.JSX.Element[]>();

	const generateNextStep = () => {
		const state = generator.current.next();
		if (state.value?.maxHeap !== undefined) {
			setHeap(
				state.value.maxHeap.map((obj, index) => {
					return (
						<div
							key={obj.point.toString()}
							className={`px-4 ${
								state.value.activeIndex === index
									? "bg-green-500"
									: state.value.compareIndex === index
									? "bg-yellow-400"
									: "bg-gray-800"
							} rounded-full outline min-w-[25px]`}
						>
							<p>{obj.point.toString()}</p>
							<p>{obj.distance.toFixed(2)}</p>
						</div>
					);
				})
			);
		}
	};

	return { generateNextStep, heap };
};

function* remove(maxHeap: { point: number[]; distance: number }[]) {
	if (maxHeap.length <= 1) {
		maxHeap.pop();
		yield { maxHeap, activeIndex: -1, compareIndex: -1 };
		return;
	}
	let prevLastNode = maxHeap.pop();
	maxHeap[0] = prevLastNode!;
	let [currHeadIndex, currLeftIndex, currRightIndex] = [0, 1, 2];

	while (currHeadIndex < maxHeap.length - 1) {
		yield {
			maxHeap,
			activeIndex: currHeadIndex,
			compareIndex: -1,
		};
		let biggestChildIndex;
		if (maxHeap[currRightIndex] !== undefined) {
			biggestChildIndex =
				maxHeap[currLeftIndex].distance >
				maxHeap[currRightIndex].distance
					? currLeftIndex
					: currRightIndex;
			yield {
				maxHeap,
				activeIndex: currHeadIndex,
				compareIndex: biggestChildIndex,
			};
			if (
				maxHeap[biggestChildIndex].distance >
				maxHeap[currHeadIndex].distance
			) {
				swap(maxHeap, biggestChildIndex, currHeadIndex);
				yield {
					maxHeap,
					activeIndex: biggestChildIndex,
					compareIndex: -1,
				};
			} else {
				return;
			}
		} else if (maxHeap[currLeftIndex] !== undefined) {
			yield {
				maxHeap,
				activeIndex: currHeadIndex,
				compareIndex: currLeftIndex,
			};
			if (
				maxHeap[currLeftIndex].distance >
				maxHeap[currHeadIndex].distance
			) {
				swap(maxHeap, currLeftIndex, currHeadIndex);
				yield {
					maxHeap,
					activeIndex: currLeftIndex,
					compareIndex: -1,
				};
				biggestChildIndex = currLeftIndex;
			} else {
				return;
			}
		} else {
			yield { maxHeap, activeIndex: -1, compareIndex: -1 };
			return;
		}

		[currHeadIndex, currLeftIndex, currRightIndex] = [
			biggestChildIndex!,
			(biggestChildIndex! + 1) * 2 - 1,
			(biggestChildIndex! + 1) * 2,
		];
	}
}

function swap(
	maxHeap: { point: number[]; distance: number }[],
	indexA: number,
	indexB: number
) {
	[maxHeap[indexA], maxHeap[indexB]] = [maxHeap[indexB], maxHeap[indexA]];
}

function* insert(
	obj: { point: number[]; distance: number },
	maxHeap: { point: number[]; distance: number }[],
	k: number
) {
	if (maxHeap.length === k && maxHeap[0].distance < obj.distance) {
		yield { maxHeap, activeIndex: -1, compareIndex: -1 };
		return;
	}
	maxHeap.push(obj);
	yield { maxHeap, activeIndex: -1, compareIndex: -1 };

	let newIndex = maxHeap.length - 1;
	yield { maxHeap, activeIndex: newIndex, compareIndex: -1 };

	let parentIndex = Math.floor((newIndex - 1) / 2);
	yield { maxHeap, activeIndex: newIndex, compareIndex: parentIndex };
	while (newIndex > 0) {
		if (maxHeap[parentIndex].distance < maxHeap[newIndex].distance) {
			swap(maxHeap, newIndex, parentIndex);
			yield { maxHeap, activeIndex: parentIndex, compareIndex: -1 };
		} else {
			break;
		}
		newIndex = parentIndex;
		parentIndex = Math.floor((newIndex - 1) / 2);
		yield { maxHeap, activeIndex: newIndex, compareIndex: parentIndex };
	}
	while (maxHeap.length > k) {
		const removeGen = remove(maxHeap);
		for (const state of removeGen) {
			yield state;
		}
	}
}

function* kClosestGenerator(points: number[][], k: number) {
	const maxHeap: { point: number[]; distance: number }[] = [];
	const euclideanDistanceFromOrigin = (a: number, b: number) => {
		return Math.sqrt(a ** 2 + b ** 2);
	};

	for (const point of points) {
		const insertGen = insert(
			{
				point: point,
				distance: euclideanDistanceFromOrigin(point[0], point[1]),
			},
			maxHeap,
			k
		);
		for (const state of insertGen) {
			yield state;
		}
	}
	const finalPoints = maxHeap.map((obj) => obj.point);
	return { maxHeap, activeIndex: -1, compareIndex: -1 };
}

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
			let biggestChildIndex;
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
					biggestChildIndex = currLeftIndex;
				} else {
					return;
				}
			} else {
				return;
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
			remove();
		}
	};
	const maxHeap: { point: number[]; distance: number }[] = [];
	const euclideanDistanceFromOrigin = (a: number, b: number) => {
		return Math.sqrt(a ** 2 + b ** 2);
	};
	points.forEach((point) => {
		insert({
			point: point,
			distance: euclideanDistanceFromOrigin(point[0], point[1]),
		});
	});
	return maxHeap.map((obj) => obj.point);
};

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
