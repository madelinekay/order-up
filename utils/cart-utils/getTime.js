const balance = (stoveA, stoveB, orderKey, items, timePlaced) => {
  const [currentItem, ...remainingItems] = items;
  console.log("currentItem", new Date, currentItem);
  console.log('stoveA', stoveA);
  console.log('stoveB', stoveB);
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

  // if (currentItem.name.includes("SATAY")) {
  //   console.log('currentItem.satay', currentItem.satay);
  //   return balance(stoveA, stoveB, [{ order: orderKey, orderReady: timePlaced + currentItem.time * 6000 }])
  // }

  if (readyTimeA <= readyTimeB) {
    if (readyTimeA < timePlaced) {
      console.log(
        "readyTimeA <= readyTimeB && readyTimeA < timePlaced",
        readyTimeA,
        [
          ...stoveA,
          {
            order: orderKey,
            orderReady: timePlaced + currentItem.time * 60000,
          },
        ],
        stoveB,
        { timePlaced }
      );
      return balance(
        [
          ...stoveA,
          {
            order: orderKey,
            orderReady: timePlaced + currentItem.time * 60000,
          },
        ],
        stoveB,
        orderKey,
        remainingItems,
        timePlaced
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
        currentItem.time,
        { timePlaced }
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
        remainingItems,
        timePlaced
      );
    }
  } else {
    if (readyTimeB < timePlaced) {
      console.log(
        "readyTimeb <= readyTimea && readyTimeb < timePlaced",
        readyTimeB,
        stoveA,
        [
          ...stoveB,
          {
            order: orderKey,
            orderReady: timePlaced + currentItem.time * 60000,
          },
        ],
        currentItem.time,
        { timePlaced }
      );
      return balance(
        stoveA,
        [
          ...stoveB,
          {
            order: orderKey,
            orderReady: timePlaced + currentItem.time * 60000,
          },
        ],
        orderKey,
        remainingItems,
        timePlaced
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
        currentItem.time,
        { timePlaced }
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
        remainingItems,
        timePlaced
      );
    }
  }
};

module.exports = { balance };
