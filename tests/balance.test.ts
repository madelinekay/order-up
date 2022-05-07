import { balanceItem, balanceOrder, calculateDuration } from '../utils/cart-utils/balance-stoves';
import type { Item, Stove } from '../utils/cart-utils/balance-stoves';

const menu: Record<string, Item> = {
    chickenCurry: { name: 'Chicken curry', time: 7, isNew: true },
    friedRice: { name: 'Fried rice', time: 12, isNew: true },
    chowMein: { name: 'Chow-mein noodles', time: 9, isNew: true },
}

// make balanceItem work first
describe('balanceItem', () => {
    let stoveA: Stove = []
    let stoveB: Stove = []

    beforeEach(() => [stoveA, stoveB] = [[], []]) // reset stoves to empty

    it('correctly places item on empty stoves', () => {
        const [updatedA, updatedB] = balanceItem(stoveA, stoveB, menu.chowMein)

        expect(updatedA).toEqual([menu.chowMein])
        expect(updatedB).toEqual([])
    })

    it('correctly places item on unequal stoves (A is available)', () => {
        stoveA = [menu.chickenCurry, menu.chickenCurry, menu.chickenCurry] // 21 mins
        stoveB = [menu.friedRice, menu.friedRice] // 24 mins

        const [updatedA, updatedB] = balanceItem(stoveA, stoveB, menu.chowMein)

        expect(updatedA).toEqual([...stoveA, menu.chowMein])
        expect(updatedB).toEqual(stoveB)
    })

    it('correctly places item on unequal stoves (B is available)', () => {
        stoveA = [menu.chickenCurry, menu.friedRice] // 19 mins
        stoveB = [menu.chowMein] // 9 mins

        const [updatedA, updatedB] = balanceItem(stoveA, stoveB, menu.chowMein)

        expect(updatedA).toEqual(stoveA)
        expect(updatedB).toEqual([...stoveB, menu.chowMein])
    })
})

// then make balanceOrder tests pass
describe('balanceOrder', () => {
    let stoveA: Stove = []
    let stoveB: Stove = []

    beforeEach(() => [stoveA, stoveB] = [[], []]) // reset stoves to empty

    it('sorts order items by time (desc) and distributes each between empty stoves', () => {
        const order = [menu.friedRice, menu.chowMein]
        const [updatedA, updatedB] = balanceOrder(stoveA, stoveB, order)

        expect(updatedA).toEqual([menu.friedRice])
        expect(updatedB).toEqual([menu.chowMein])
    })

    it('sorts order items by time (desc) and distributes each between busy stoves', () => {
        const order = [menu.chowMein, menu.friedRice] // 9 mins, 12 mins - because friedRice is longer, it should be balanced first
        stoveA = [menu.chickenCurry, menu.chickenCurry, menu.chickenCurry] // 21 mins
        stoveB = [menu.friedRice, menu.friedRice] // 24 mins

        const [updatedA, updatedB] = balanceOrder(stoveA, stoveB, order)

        expect(updatedA).toEqual([menu.chickenCurry, menu.chickenCurry, menu.chickenCurry, menu.friedRice])
        expect(updatedB).toEqual([menu.friedRice, menu.friedRice, menu.chowMein])
    })
})

// finally, calculate time
describe('calculateDuration', () => {
    let stoveA: Stove = []
    let stoveB: Stove = []

    beforeEach(() => [stoveA, stoveB] = [[], []]) // reset stoves to empty

    it('calculates minutes from now that incoming order will complete', () => {
        const orderA = [menu.chickenCurry, menu.friedRice]
        const orderB = [menu.chickenCurry, menu.friedRice, menu.chickenCurry]
        // current state of stoves:
        // A: [fried rice, chicken curry, chicken curry] - 26
        // B: [chicken curry, fried rice] - 19
        const incomingOrder = [menu.chowMein, menu.friedRice]
        // updated state of stoves (new items in caps):
        // A: [fried rice, chicken curry, chicken curry, CHOW-MEIN] - 35
        // B: [chicken curry, fried rice, FRIED RICE] - 31

        const minutes = calculateDuration([orderA, orderB], incomingOrder)

        expect(minutes).toEqual(35)
    })


    it('calculates minutes from now that incoming order will complete, even if it finishes before an older order', () => {
        const orderA = [menu.friedRice, menu.chowMein, menu.chowMein]
        const orderB = [menu.friedRice, menu.chowMein]
        const orderC = [menu.friedRice]
        // current state of stoves:
        // A: [fried rice, fried rice, fried rice] - 36
        // B: [chow mein, chow mein, chow mein] - 27
        const incomingOrder = [menu.chickenCurry]
        // updated state of stoves (new item in caps):
        // A: [fried rice, fried rice, fried rice] - 36
        // B: [chow mein, chow mein, chow mein, CHICKEN CURRY] - 34

        const minutes = calculateDuration([orderA, orderB, orderC], incomingOrder)

        expect(minutes).toEqual(34)
    })

    it('works when both stoves finish at the same time', () => {
        const orderA = [menu.friedRice]
        const incomingOrder = [menu.friedRice]

        const minutes = calculacalculateDurationteTime([orderA], incomingOrder)

        expect(minutes).toEqual(12)
    })
})