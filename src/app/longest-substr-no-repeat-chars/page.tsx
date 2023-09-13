"use client";
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

const Page = () => {
	const [currentString, setCurrentString] = useState("Type the text here");
	const { currentState, handleNext, changeString } =
		useLongestSubstring(currentString);
	const [intervalRef, setIntervalRef] = useState<number>();

	const startAuto = () => {
		setIntervalRef(window.setInterval(handleNext, 150));
	};
	const activeLetterIndex = useRef<HTMLDivElement>(null);

	const stopAuto = () => {
		if (intervalRef !== undefined) {
			window.clearInterval(intervalRef);
			setIntervalRef(undefined);
			return;
		}
	};

	const handleAuto = () => {
		if (intervalRef !== undefined) {
			stopAuto();
			return;
		}
		startAuto();
	};

	activeLetterIndex.current?.scrollIntoView({
		behavior: "smooth",
		inline: "center",
	});

	useEffect(() => {
		setIntervalRef((currIntervalRef) => {
			if (currIntervalRef !== undefined) {
				window.clearInterval(currIntervalRef);
				return window.setInterval(handleNext, 150);
			}
		});
	}, [handleNext]);
	return (
		<div className="flex flex-row w-screen h-screen">
			<div className="flex w-fit flex-none items-center justify-center h-full py-8 px-8">
				<TableComponent table={currentState.table} />
			</div>
			<div className="flex flex-1 flex-col items-center justify-center gap-10 px-8 overflow-hidden w-full">
				<a
					href="https://leetcode.com/problems/longest-substring-without-repeating-characters/"
					className="underline text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-600 to-red-500  text-2xl"
					target="_blank"
				>
					3: Longest Substring Without Repeating Characters
				</a>
				<p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-600 to-red-500">
					Sliding Window
				</p>
				<input
					type="text"
					value={currentString}
					onChange={(e) => {
						setCurrentString(e.target.value);
						changeString(e.target.value);
						if (intervalRef !== undefined) {
							stopAuto();
							startAuto();
						}
					}}
					className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-blue-500 to-indigo-600 text-center"
				/>
				<div className="flex gap-4">
					<button
						className="w-24 h-10 rounded-full bg-gradient-to-br from-yellow-500 via-lime-400 to-green-300 hover:scale-125 active:scale-90 duration-150"
						onClick={handleNext}
					>
						Step
					</button>
					<button
						className="w-24 h-10 rounded-full bg-gradient-to-r from-indigo-700 via-pink-600 to-red-500 hover:scale-125 active:scale-90 duration-150"
						onClick={handleAuto}
					>
						{intervalRef !== undefined ? "Stop" : "Auto"}
					</button>
				</div>
				<div className="flex items-center justify-center w-full">
					<SlidingWindowComponent
						startIndex={currentState.startIndex}
						endIndex={currentState.endIndex}
						elements={currentString.split("").map((char, index) => {
							return (
								<div
									key={char + index}
									className="flex flex-col"
								>
									<div className="flex items-center justify-center w-10 h-10">
										{char}
									</div>
									<div className="flex items-center justify-center w-10 h-10">
										{index}
									</div>
								</div>
							);
						})}
						ref={activeLetterIndex}
					/>
				</div>
			</div>
		</div>
	);
};
export default Page;

const useLongestSubstring = (str: string) => {
	const algorithm = useRef(lengthOfLongestSubstringGenerator(str));
	const [currentState, setCurrentState] = useState({
		startIndex: -1,
		endIndex: -1,
		table: {},
	});

	const changeString = (str: string) => {
		algorithm.current = lengthOfLongestSubstringGenerator(str);
		setCurrentState({
			startIndex: -1,
			endIndex: -1,
			table: {},
		});
	};

	const handleNext = useCallback(() => {
		const state = algorithm.current.next();
		if (state.done) {
			changeString(str);
			return;
		}
		setCurrentState({
			startIndex: state.value.startIndex,
			endIndex: state.value.endIndex,
			table: state.value.charMap,
		});
	}, [str]);
	return { currentState, handleNext, changeString };
};

type SlidingWindowProps = {
	startIndex: number;
	endIndex: number;
	elements: React.JSX.Element[];
};
const SlidingWindowComponent = forwardRef(function SlidingWindowComponent(
	props: SlidingWindowProps,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const { startIndex, endIndex, elements } = props;

	return (
		<div className="flex w-full max-w-full">
			<div className="flex flex-col ">
				<div className="flex items-center h-10 pl-1 pr-2">
					Character
				</div>
				<div className="flex items-center h-10 pl-1 pr-2">Index</div>
			</div>
			<div className="flex overflow-scroll gap-1">
				{elements.map((element, index) => {
					return (
						<div
							key={"sliding window: " + index}
							className={`flex bg-gradient-to-b  from-indigo-700 via-pink-600 to-red-500
							
							${
								index >= startIndex && index <= endIndex
									? "opacity-100"
									: "opacity-20"
							} rounded-md`}
							ref={index === endIndex ? ref : undefined}
						>
							{element}
						</div>
					);
				})}
			</div>
		</div>
	);
});

type TableComponentProps = {
	table: { [charCode: number]: number };
};
const TableComponent = ({ table }: TableComponentProps) => {
	return (
		<div className="flex flex-col h-fit max-h-full bg-gradient-to-br from-indigo-700 via-pink-600 to-red-500 rounded-md">
			<div className="flex flex-row">
				<div className="flex w-24 h-10  px-2 items-center ">
					Character
				</div>
				<div className="flex w-24 h-10  px-2 items-center ">
					Last Index
				</div>
			</div>
			<div className="flex flex-col overflow-scroll">
				{Object.entries(table).map((entry) => {
					const [key, val] = [...entry];
					return (
						<div
							className="flex flex-row"
							key={"Table row: " + key}
						>
							<div className="flex w-24 h-10 items-center justify-center ">
								{String.fromCharCode(parseInt(key))}
							</div>
							<div className="flex w-24 h-10 items-center justify-center ">
								{val}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

// Given a string s, find the length of the longest substring without repeating characters.
// "aacabcbb"
function* lengthOfLongestSubstringGenerator(s: string) {
	const charMap: { [charCode: number]: number } = {};
	let max_length = 0;
	let curr_length = 0;
	let firstIndexOfCurrentSubString = 0;
	for (let i = 0; i < s.length; i++) {
		yield {
			startIndex: firstIndexOfCurrentSubString,
			endIndex: i,
			charMap,
		};
		const charCode = s.charCodeAt(i);
		if (charMap[charCode] !== undefined) {
			firstIndexOfCurrentSubString = Math.max(
				firstIndexOfCurrentSubString,
				charMap[charCode] + 1
			);
		}
		charMap[charCode] = i;
		yield {
			startIndex: firstIndexOfCurrentSubString,
			endIndex: i,
			charMap,
		};
		curr_length = i + 1 - firstIndexOfCurrentSubString;
		if (curr_length > max_length) {
			max_length = curr_length;
		}
	}
}

function lengthOfLongestSubstring(s: string): number {
	const charMap: { [charCode: number]: number } = {};
	let max_length = 0;
	let curr_length = 0;
	let firstIndexOfCurrentSubString = 0;
	s.split("").forEach((char, index) => {
		const charCode = char.charCodeAt(0);
		if (charMap[charCode] !== undefined) {
			firstIndexOfCurrentSubString = Math.max(
				firstIndexOfCurrentSubString,
				charMap[charCode] + 1
			);
			charMap[charCode] = index;
		} else {
			charMap[charCode] = index;
		}
		curr_length = index + 1 - firstIndexOfCurrentSubString;
		if (curr_length > max_length) {
			max_length = curr_length;
		}
	});
	return max_length;
}
