jest.useFakeTimers().setSystemTime(new Date("2021-10-26").getTime());

const { balance } = require("../utils/cart-utils/getTime");

describe("balance", () => {
  test("with empty stoves, returns the time to cook everything in cart and the two stoves", () => {
    const startTime = Date.now();
    const orderKey = `test-${startTime}`;
    const MINUTES = 60 * 1000;

    const cart1 = [{ time: 5 }, { time: 10 }, { time: 5 }];
    const [time1, stoveA, stoveB] = balance([], [], orderKey, cart1);

    expect(time1).toBe(startTime + 10 * MINUTES);

    // const cart2 = [{ time: 5 }, { time: 10 }, { time: 5 }, { time: 7 }];
    // const [time2] = balance([], [], orderKey, cart2);
    // expect(time2).toBe(startTime + 17 * MINUTES);

    // const cart3 = [
    //   { time: 5 },
    //   { time: 10 },
    //   { time: 5 },
    //   { time: 7 },
    //   { time: 2 },
    //   { time: 10 },
    // ].sort((a, b) => b.time - a.time);
    // const [time3] = balance([], [], orderKey, cart3);
    // expect(time3).toBe(startTime + 20 * MINUTES);
  });

  test.todo("with non-empty stoves, it does something else");
});
