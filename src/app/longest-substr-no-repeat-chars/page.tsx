"use client"
import React from "react";

const Page = () => {
	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center gap-5">
			<div className="flex items-center justify-center">
				{lengthOfLongestSubstring("uuahs.chu2039029. uh.cha uipc pcihpsrcihorscd")}
			</div>
		</div>
	);
};

export default Page;

// Given a string s, find the length of the longest substring without repeating characters.
// "aacabcbb"

function lengthOfLongestSubstring(s: string): number {
	const charMap: { [charCode: number]: number } = {};
	let max_length = 0;
	let curr_length = 0;
	let firstIndexOfCurrentSubString = 0
	s.split("").forEach((char, index) => {
		
		
		const charCode = char.charCodeAt(0);
		if (charMap[charCode] !== undefined) {
			firstIndexOfCurrentSubString = Math.max(
				firstIndexOfCurrentSubString,
				charMap[charCode] + 1
			);
			charMap[charCode] = index
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
