import { number, StringSchema } from "yup";


export const balanceOrder = (stoveA, stoveB, order) => {
	// copy stoves so stoves don't get mutated
	stoveA = [...stoveA]
	stoveB = [...stoveB]
	order = [...order]


	let totalMinutesStoveA = stoveA.reduce((acc, item) => acc += item.time, 0)
	let totalMinutesStoveB = stoveB.reduce((acc, item) => acc += item.time, 0)

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

export const calculateDuration = (existingOrders, incomingOrder) => {
	let stoveA = []
	let stoveB = []
	for (let order of existingOrders) {
		for (let item of order) {
			item.isNew = false;
		}
		[stoveA, stoveB] = balanceOrder(stoveA, stoveB, order)
	}
	[stoveA, stoveB] = balanceOrder(stoveA, stoveB, incomingOrder)

	let totalMinutesStoveA = stoveA.reduce((acc, item) => acc += item.time, 0)
	let totalMinutesStoveB = stoveB.reduce((acc, item) => acc += item.time, 0)

	if (totalMinutesStoveA >= totalMinutesStoveB) {
		let finalItemStoveA = stoveA.at(-1)
		let found = incomingOrder.find(({ id }) => id === finalItemStoveA.id)
		if (found) {
			return totalMinutesStoveA
		} else {
			return totalMinutesStoveB
		}
	}

	if (totalMinutesStoveB > totalMinutesStoveA) {
		let finalItemStoveB = stoveB.at(-1)
		let found = incomingOrder.find(({ id }) => id === finalItemStoveB.id)
		if (found) {
			return totalMinutesStoveB
		} else {
			return totalMinutesStoveA
		}
	}
}
