import Image from "next/image";

export default function Home() {
	return (
		<main>
			<div className="m-10 flex flex-col gap-4">
				<a href="./01-matrix" className="text-blue-600 underline">
					01Matrix
				</a>
				<a href="./kth-largest" className="text-blue-600 underline">
					Kth Largest in a Stream
				</a>
				<a href="./k-closest" className="text-blue-600 underline">
					K Closest Points to Origin
				</a>
				<a
					href="./longest-substr-no-repeat-chars"
					className="underline text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-pink-600 to-red-500 w-fit"
				>
					Longest Substring Without Repeating Characters
				</a>
				<a href="./3-sum" className="text-blue-600 underline">
					3 Sum
				</a>
			</div>
		</main>
	);
}

