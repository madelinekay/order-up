const balance = (stoveA, stoveB, orderKey, cart) => {
  const [currentItem, ...remainingItems] = cart;
  console.log("currentItem", currentItem);
  const readyTimeA = stoveA.at(-1) ? stoveA.at(-1).orderReady : 0;
  const readyTimeB = stoveB.at(-1) ? stoveB.at(-1).orderReady : 0;
  const finalOrderA = stoveA.at(-1) ? stoveA.at(-1).order : "";
  const finalOrderB = stoveB.at(-1) ? stoveB.at(-1).order : "";

  if (!currentItem) {
    if (finalOrderA == orderKey && finalOrderB == orderKey) {
      if (readyTimeA >= readyTimeB) {
        console.log("readyTimeA", readyTimeA);
        return [readyTimeA, stoveA, stoveB];
      } else {
        console.log("readyTimeB", readyTimeB);
        return [readyTimeB, stoveA, stoveB];
      }
    } else if (finalOrderA == orderKey) {
      console.log("readyTimeA", readyTimeA, "finalOrderA == orderkey");
      return [readyTimeA, stoveA, stoveB];
    } else {
      console.log("readyTimeB", readyTimeB, "finalOrderB === orderkey");
      return [readyTimeB, stoveA, stoveB];
    }
  }

  if (readyTimeA <= readyTimeB) {
    if (readyTimeA < Date.now()) {
      console.log(
        "readyTimeA <= readyTimeB && readyTimeA < Date.now()",
        readyTimeA,
        [
          ...stoveA,
          {
            order: orderKey,
            orderReady: Date.now() + currentItem.time * 60000,
          },
        ],
        stoveB
      );
      return balance(
        [
          ...stoveA,
          {
            order: orderKey,
            orderReady: Date.now() + currentItem.time * 60000,
          },
        ],
        stoveB,
        orderKey,
        remainingItems
      );
    } else {
      console.log(
        "readyTimeA <= readyTimeB",
        readyTimeA,
        [
          ...stoveA,
          {
            order: orderKey,
            orderReady: readyTimeA + currentItem.time * 60000,
          },
        ],
        stoveB,
        currentItem.time
      );
      return balance(
        [
          ...stoveA,
          {
            order: orderKey,
            orderReady: readyTimeA + currentItem.time * 60000,
          },
        ],
        stoveB,
        orderKey,
        remainingItems
      );
    }
  } else {
    if (readyTimeB < Date.now()) {
      console.log(
        "readyTimeb <= readyTimea && readyTimeb < Date.now()",
        readyTimeB,
        stoveA,
        [
          ...stoveB,
          {
            order: orderKey,
            orderReady: Date.now() + currentItem.time * 60000,
          },
        ],
        currentItem.time
      );
      return balance(
        stoveA,
        [
          ...stoveB,
          {
            order: orderKey,
            orderReady: Date.now() + currentItem.time * 60000,
          },
        ],
        orderKey,
        remainingItems
      );
    } else {
      console.log(
        "readyTimeb <= readyTimeA",
        readyTimeB,
        stoveA,
        [
          ...stoveB,
          {
            order: orderKey,
            orderReady: readyTimeB + currentItem.time * 60000,
          },
        ],
        currentItem.time
      );

      return balance(
        stoveA,
        [
          ...stoveB,
          {
            order: orderKey,
            orderReady: readyTimeB + currentItem.time * 60000,
          },
        ],
        orderKey,
        remainingItems
      );
    }
  }
};

module.exports = { balance };
