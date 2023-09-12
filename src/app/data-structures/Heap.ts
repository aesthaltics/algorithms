export enum HeapType {
	MAX_HEAP,
	MIN_HEAP,
}

export class Heap {
	heap: number[] = [];
	heaptype: HeapType;

	constructor(nums: number[], heapType: HeapType) {
		this.heaptype = heapType;
		nums.forEach((num) => this.insert(num));
	}

	insert(val: number) {
		this.heap.push(val);
		let nodeIndex = this.heap.length - 1;
		let parentIndex = Math.floor((nodeIndex - 1) / 2);

		while (nodeIndex > 0) {
			if (this.heaptype === HeapType.MAX_HEAP) {
				if (this.heap[nodeIndex] > this.heap[parentIndex]) {
					this.swap(nodeIndex, parentIndex);
				} else {
					break;
				}
			} else if (this.heaptype === HeapType.MIN_HEAP) {
				if (this.heap[nodeIndex] < this.heap[parentIndex]) {
					this.swap(nodeIndex, parentIndex);
				} else {
					break;
				}
			} else {
				break;
			}
			nodeIndex = parentIndex;
			parentIndex = Math.floor((nodeIndex - 1) / 2);
		}
	}

	swap(indexA: number, indexB: number) {
		[this.heap[indexA], this.heap[indexB]] = [
			this.heap[indexB],
			this.heap[indexA],
		];
	}

	remove(): number | undefined {
		const leafNode = this.heap.pop();
		if (leafNode === undefined) {
			return;
		}
		if (!this.heap.length) {
			return leafNode;
		}
		let returnNum = this.heap[0];
		this.heap[0] = leafNode;
		let [leafNodeIndex, leftIndex, rightIndex] = [0, 1, 2];
		while (leafNodeIndex < this.heap.length - 1) {
			let swapIndex;
			const leftNum = this.heap[leftIndex];
			const rightNum = this.heap[rightIndex];
			if (rightNum !== undefined) {
				// since heap is always balanced presence of rightNode implies presence of leftNode
				if (this.heaptype === HeapType.MAX_HEAP) {
					swapIndex =
						this.heap[rightIndex] > this.heap[leftIndex]
							? rightIndex
							: leftIndex;
				}
				if (this.heaptype === HeapType.MIN_HEAP) {
					swapIndex =
						this.heap[rightIndex] > this.heap[leftIndex]
							? leftIndex
							: rightIndex;
				}
			} else if (leftNum !== undefined) {
				swapIndex = leftIndex;
			} else {
				return returnNum;
			}
			if (swapIndex === undefined) {
				return returnNum;
			}
			const swapNum = this.heap[swapIndex];
			const leafNum = this.heap[leafNodeIndex];

			if (this.heaptype === HeapType.MAX_HEAP) {
				if (swapNum > leafNum) {
					this.swap(leafNodeIndex, swapIndex);
				} else {
					return returnNum;
				}
			}
			if (this.heaptype == HeapType.MIN_HEAP) {
				if (swapNum < leafNum) {
					this.swap(leafNodeIndex, swapIndex);
				} else {
					return returnNum;
				}
			}

			[leafNodeIndex, leftIndex, rightIndex] = [
				swapIndex,
				(swapIndex + 1) * 2 - 1,
				(swapIndex + 1) * 2,
			];
		}
		return returnNum;
	}
	length(){
		return this.heap.length
	}
	peek(){
		return this.heap[0]
	}
}
