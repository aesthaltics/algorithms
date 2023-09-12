import React from "react";

type HeapPresenterProps = {
	list: number[];
	root: number;
};

const HeapPresenter = ({ list, root }: HeapPresenterProps) => {
	return (
		<div className="flex flex-col text-center p-2">
			<div className="rounded-full outline min-w-[25px]">
				{list[root]}
			</div>
			<div className="flex flex-row">
				{list[(root + 1) * 2 - 1] !== undefined && (
					<HeapPresenter list={list} root={(root + 1) * 2 - 1} />
				)}
				{list[(root + 1) * 2] !== undefined && (
					<HeapPresenter list={list} root={(root + 1) * 2} />
				)}
			</div>
		</div>
	);
};

export default HeapPresenter;
