import Image from "next/image";

export default function Home() {
	return (
		<main>
			<div className="m-10 flex flex-col gap-4">
				<a href="./01-matrix" className="text-blue-600 underline">
					01Matrix
				</a>
				<a href="./k-closest" className="text-blue-600 underline">
					K Closest Points to Origin
				</a>
				<a href="./kth-largest" className="text-blue-600 underline">
					Kth Largest in a Stream
				</a>
			</div>
		</main>
	);
}

