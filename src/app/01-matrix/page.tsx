"use client";
import React, { useRef, useState } from "react";

// TODO: add isInQueue to cell, and color it if it is.

const Page = () => {
	const matrix2 = [
		[1, 1, 0],
		[1, 1, 1],
		[1, 1, 1],
	];
	const matrix3 = [
		[1, 1, 0, 0, 1, 0, 0, 1, 1, 0],
		[1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
		[0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
		[1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
		[0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
		[1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
	];

	const currentMatrix = useRef("3");
	const { cellMatrix, handleNext, handleReset, changeMatrix } = useAlgorithm({
		matrix: [...matrix2],
	});

	return (
		<div className="flex flex-col justify-center items-center h-screen w-screen gap-4">
			<a
				href="https://leetcode.com/problems/01-matrix/"
				className="text-blue-600 underline text-2xl"
				target="_blank"
			>
				542: 01 Matrix
			</a>
			<p className="text-2xl">BFS</p>
			<div className="flex flex-row justify-center items-center">
				<Matrix matrix={cellMatrix} />
			</div>
			<div className="flex flex-row gap-4">
				<div
					className="rounded bg-red-500 w-24 h-10 justify-center items-center flex"
					onClick={() => {
						handleReset(
							currentMatrix.current === "3" ? matrix2 : matrix3
						);
					}}
				>
					<p>Reset</p>
				</div>
				<div
					className="rounded bg-blue-500 w-24 h-10 justify-center items-center flex"
					onClick={handleNext}
				>
					<p>Next Step</p>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div
					className="rounded bg-blue-500 w-24 h-10 justify-center items-center flex"
					onClick={() => {
						changeMatrix([...matrix2]);
						currentMatrix.current = "3";

						// handleReset()
					}}
				>
					<p>3 X 3</p>
				</div>
				<div
					className="rounded bg-blue-500 w-24 h-10 justify-center items-center flex"
					onClick={() => {
						changeMatrix([...matrix3]);
						currentMatrix.current = "10";
						// handleReset()
					}}
				>
					<p>10 X 10</p>
				</div>
			</div>
		</div>
	);
};

export default Page;

type CellProps = {
	number: number;
	isActive: boolean;
};

const Cell = ({ number, isActive }: CellProps) => {
	return (
		<div
			className={`flex items-center justify-center border w-8 h-8 ${
				isActive ? "bg-green-500" : "bg-gray-700"
			}`}
		>
			{number}
		</div>
	);
};

type MatrixProps = {
	matrix: React.JSX.Element[][];
};

const Matrix = ({ matrix }: MatrixProps) => {
	return (
		<div>
			{matrix.map((row, rowIndex) => {
				return (
					<div className="flex flex-row" key={`row: ${rowIndex}`}>
						{[...row]}
					</div>
				);
			})}
		</div>
	);
};

type AlgorithmProps = {
	matrix: number[][];
};

function* primeMatrix(mat: number[][]) {
	let queue: number[][] = [];

	for (let row = 0; row < mat.length; row++) {
		for (let col = 0; col < mat[row].length; col++) {
			if (mat[row][col] === 0) {
				queue.push([row, col, 0]);
			} else {
				mat[row][col] = Infinity;
			}
			yield { mat, queue, row, col }; // Yield the state for visualization
		}
	}
}

function* bfs(mat: number[][], queue: number[][]) {
	while (queue.length > 0) {
		let node = queue.shift();
		if (node === undefined) {
			return mat;
		}
		let [row, col, distanceFromZero] = [...node];
		yield { mat, queue, row, col }; // Yield current state for visualization
		//down
		if (row < mat.length - 1 && mat[row + 1][col] > distanceFromZero + 1) {
			queue.push([row + 1, col, distanceFromZero + 1]);
			mat[row + 1][col] = distanceFromZero + 1;
		}
		//right
		if (
			col < mat[row].length - 1 &&
			distanceFromZero + 1 < mat[row][col + 1]
		) {
			queue.push([row, col + 1, distanceFromZero + 1]);
			mat[row][col + 1] = distanceFromZero + 1;
		}
		//up
		if (row > 0 && distanceFromZero + 1 < mat[row - 1][col]) {
			queue.push([row - 1, col, distanceFromZero + 1]);
			mat[row - 1][col] = distanceFromZero + 1;
		}
		//left
		if (col > 0 && distanceFromZero + 1 < mat[row][col - 1]) {
			queue.push([row, col - 1, distanceFromZero + 1]);
			mat[row][col - 1] = distanceFromZero + 1;
		}

		yield { mat, queue, row, col }; // Yield current state for visualization
	}
}

function* mainAlgorithm(mat: number[][]) {
	let queue: number[][] = [];

	const primeGen = primeMatrix(mat);
	for (const state of primeGen) {
		queue = state.queue;
		yield state;
	}

	const bfsGen = bfs(mat, queue);
	for (const state of bfsGen) {
		yield state;
	}
}

const useAlgorithm = ({ matrix }: AlgorithmProps) => {
	let mainAlgorithmGenerator = useRef(mainAlgorithm(matrix));

	const initializeCellMatrix = (
		matrix: number[][]
	): React.JSX.Element[][] => {
		let tempCellMatrix = matrix.map(
			(row, rowIndex): React.JSX.Element[] => {
				return row.map((num, colIndex): React.JSX.Element => {
					return (
						<Cell
							number={num}
							key={`${rowIndex}, ${colIndex}`}
							isActive={false}
						/>
					);
				});
			}
		);
		return tempCellMatrix;
	};
	const [cellMatrix, setCellMatrix] = useState<React.JSX.Element[][]>(
		initializeCellMatrix(matrix)
	);

	const changeMatrix = (mat: number[][]) => {
		setCellMatrix(initializeCellMatrix(mat));
		mainAlgorithmGenerator.current = mainAlgorithm(mat);
	};

	const handleNext = () => {
		const next = mainAlgorithmGenerator.current.next();
		let newMatrix = [...cellMatrix];
		if (!next.done) {
			newMatrix = initializeCellMatrix(next.value.mat);
		}
		const row = next.value?.row ?? -1;
		const col = next.value?.col ?? -1;

		if (row >= 0 && col >= 0) {
			let activeCell = { ...newMatrix[row][col] };
			activeCell.props = { ...activeCell.props, isActive: true };
			newMatrix[row][col] = activeCell;
		}

		setCellMatrix(newMatrix);
	};

	const handleReset = (matrix: number[][]) => {
		setCellMatrix(initializeCellMatrix(matrix));
		mainAlgorithmGenerator.current = mainAlgorithm(matrix);
	};

	return { cellMatrix, handleNext, handleReset, changeMatrix };
};
