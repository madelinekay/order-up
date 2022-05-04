export type Item = { name: string, time: number, isNew: boolean } // isNew is only going to be used for the second calculateTime (very last) test
export type Stove = Item[]
export type Order = Item[]

// export const balanceItem = (stoveA: Stove, stoveB: Stove, item: Item): [Stove, Stove] => {
// 	// copy stoves so stoves don't get mutated
// 	stoveA = [...stoveA]
// 	stoveB = [...stoveB]

// 	let totalMinutesStoveA: number = stoveA.reduce((acc: number, item: Item) => acc += item.time, 0)
// 	let totalMinutesStoveB: number = stoveB.reduce((acc: number, item: Item) => acc += item.time, 0)

// 	if (totalMinutesStoveA <= totalMinutesStoveB) {
// 		stoveA.push(item)
// 	} else {
// 		stoveB.push(item)
// 	}
// 	return [stoveA, stoveB]
// }

export const balanceOrder = (stoveA: Stove, stoveB: Stove, order: Order): [Stove, Stove] => {
	// copy stoves so stoves don't get mutated
	stoveA = [...stoveA]
	stoveB = [...stoveB]
	order = [...order]

	let totalMinutesStoveA: number = stoveA.reduce((acc: number, item: Item) => acc += item.time, 0)
	let totalMinutesStoveB: number = stoveB.reduce((acc: number, item: Item) => acc += item.time, 0)

	order.sort((a, b) => b.time - a.time)

	for (let item of order) {
		if (totalMinutesStoveA <= totalMinutesStoveB) {
			stoveA.push(item)
			totalMinutesStoveA += item.time
		} else {
			stoveB.push(item)
			totalMinutesStoveB += item.time
		}
	}
	return [stoveA, stoveB]
}

export const calculateTime = (existingOrders: Order[], incomingOrder: Order): number => {
	// TODO
	let stoveA = []
	let stoveB = []
	for (let order of existingOrders) {
		for (let item of order) {
			item.isNew = false;
		}
		[stoveA, stoveB] = balanceOrder(stoveA, stoveB, order)
	}
	[stoveA, stoveB] = balanceOrder(stoveA, stoveB, incomingOrder)

	let totalMinutesStoveA: number = stoveA.reduce((acc: number, item: Item) => acc += item.time, 0)
	let totalMinutesStoveB: number = stoveB.reduce((acc: number, item: Item) => acc += item.time, 0)

	if (totalMinutesStoveA >= totalMinutesStoveB) {
		let finalItemStoveA = stoveA.at(-1)
		let found = incomingOrder.find(({ isNew }) => finalItemStoveA.isNew)
		if (found) {
			return totalMinutesStoveA
		} else {
			return totalMinutesStoveB
		}
	}

	if (totalMinutesStoveB > totalMinutesStoveA) {
		let finalItemStoveB = stoveB.at(-1)
		let found = incomingOrder.find(({ isNew }) => finalItemStoveB.isNew)
		if (found) {
			return totalMinutesStoveB
		} else {
			return totalMinutesStoveA
		}
	}
}