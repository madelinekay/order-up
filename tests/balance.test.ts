import { balanceOrder, calculateDuration } from '../utils/cart-utils/balance-stoves';

const menu = {
    chickenCurry: { name: 'Chicken curry', time: 7, isNew: true },
    friedRice: { name: 'Fried rice', time: 12, isNew: true },
    chowMein: { name: 'Chow-mein noodles', time: 9, isNew: true },
}

describe('balanceOrder', () => {
    let stoveA
    let stoveB

    beforeEach(() => [stoveA, stoveB] = [[], []])

    it('sorts order items by time (desc) and distributes each between empty stoves', () => {
        const order = [menu.friedRice, menu.chowMein]
        const [updatedA, updatedB] = balanceOrder(stoveA, stoveB, order)

        expect(updatedA).toEqual([menu.friedRice])
        expect(updatedB).toEqual([menu.chowMein])
    })

    it('sorts order items by time (desc) and distributes each between busy stoves', () => {
        const order = [menu.chowMein, menu.friedRice]
        stoveA = [menu.chickenCurry, menu.chickenCurry, menu.chickenCurry]
        stoveB = [menu.friedRice, menu.friedRice]

        const [updatedA, updatedB] = balanceOrder(stoveA, stoveB, order)

        expect(updatedA).toEqual([menu.chickenCurry, menu.chickenCurry, menu.chickenCurry, menu.friedRice])
        expect(updatedB).toEqual([menu.friedRice, menu.friedRice, menu.chowMein])
    })
})


describe('calculateDuration', () => {
    let stoveA
    let stoveB

    beforeEach(() => [stoveA, stoveB] = [[], []])

    it('calculates minutes from now that incoming order will complete', () => {
        const orderA = [menu.chickenCurry, menu.friedRice]
        const orderB = [menu.chickenCurry, menu.friedRice, menu.chickenCurry]
        const incomingOrder = [menu.chowMein, menu.friedRice]
        const minutes = calculateDuration([orderA, orderB], incomingOrder)
        expect(minutes).toEqual(35)
    })


    it('calculates minutes from now that incoming order will complete, even if it finishes before an older order', () => {
        const orderA = [menu.friedRice, menu.chowMein, menu.chowMein]
        const orderB = [menu.friedRice, menu.chowMein]
        const orderC = [menu.friedRice]
        const incomingOrder = [menu.chickenCurry]
        const minutes = calculateDuration([orderA, orderB, orderC], incomingOrder)
        expect(minutes).toEqual(34)
    })

    it('works when both stoves finish at the same time', () => {
        const orderA = [menu.friedRice]
        const incomingOrder = [menu.friedRice]
        const minutes = calculateDuration([orderA], incomingOrder)
        expect(minutes).toEqual(12)
    })
})