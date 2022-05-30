const { ControlPointSharp } = require("@material-ui/icons");

const balance = (stoveA, stoveB, orderKey, items, timePlaced, scheduledTime = null) => {
  const [currentItem, ...remainingItems] = items;
  // console.log("currentItem", new Date, currentItem);
  const scheduledItemsCountA = stoveA.filter(item => item.order === orderKey).length
  const scheduledItemsCountB = stoveB.filter(item => item.order === orderKey).length

  // console.log('scheduledItemsCountA', scheduledItemsCountA);
  // console.log('scheduledItemsCountB', scheduledItemsCountB);


  const readyTimeA = stoveA.at(-1) ? stoveA.at(-1).orderReady : 0;
  const readyTimeB = stoveB.at(-1) ? stoveB.at(-1).orderReady : 0;
  const startTimeA = stoveA[stoveA.length - scheduledItemsCountA] ? stoveA[stoveA.length - scheduledItemsCountA].itemStartTime ? stoveA[stoveA.length - scheduledItemsCountA].itemStartTime : 0 : 0
  const startTimeB = stoveB[stoveB.length - scheduledItemsCountB] ? stoveB[stoveB.length - scheduledItemsCountB].itemStartTime ? stoveB[stoveB.length - scheduledItemsCountB].itemStartTime : 0 : 0
  const finalOrderA = stoveA.at(-1) ? stoveA.at(-1).order : "";
  const finalOrderB = stoveB.at(-1) ? stoveB.at(-1).order : "";
  const finalScheduledOrderTimeA = stoveA.at(-1) ? stoveA.at(-1).item ? stoveA.at(-1).order === orderKey ? stoveA.at(-1).item.time : 0 : 0 : 0;
  const finalScheduledOrderTimeB = stoveB.at(-1) ? stoveB.at(-1).item ? stoveB.at(-1).order === orderKey ? stoveB.at(-1).item.time : 0 : 0 : 0;

  // console.log('startTimeA', startTimeA);
  // console.log('startTimeB', startTimeB);


  if (scheduledTime) {
    // console.log('scheduledTime', scheduledTime);
    if (!currentItem) {
      // console.log('scheduledTime !currentItem', scheduledTime, stoveA, stoveB);
      return [readyTimeA, stoveA, stoveB]; // expand this to include start time 
    }

    if (finalScheduledOrderTimeA <= finalScheduledOrderTimeB) {
      if (finalOrderA === orderKey) {

        // console.log('finalOrderA === orderKey', "stoveA", stoveA, "stoveB", stoveB, orderKey, remainingItems, timePlaced);

        const indexEarliestScheduledItem = stoveA.length - (scheduledItemsCountA - 1)
        // console.log('indexEarliestScheduledItem', indexEarliestScheduledItem);

        const arraySlice = [...stoveA.slice(0, indexEarliestScheduledItem), { order: orderKey, orderReady: stoveA[stoveA.length - scheduledItemsCountA].orderReady - currentItem.time, itemStartTime: (stoveA[stoveA.length - scheduledItemsCountA].orderReady - currentItem.time) - currentItem.time * 6000, item: currentItem }, ...stoveA.slice(indexEarliestScheduledItem)]
        // console.log('arraySlice', arraySlice);

        return balance(arraySlice, stoveB, orderKey, remainingItems, timePlaced, scheduledTime)

      } else {
        // console.log('finalOrderA !== orderKey', stoveA, stoveB, orderKey, remainingItems, timePlaced);
        return balance(
          [...stoveA, { order: orderKey, orderReady: scheduledTime, itemStartTime: scheduledTime - currentItem.time * 6000, item: currentItem }], stoveB, orderKey, remainingItems, timePlaced, scheduledTime
        )
      }
    } else {
      if (finalOrderB === orderKey) {
        // console.log('finalOrderB === orderKey', stoveA, stoveB, orderKey, remainingItems, timePlaced);

        const indexEarliestScheduledItemB = stoveB.length - (scheduledItemsCountB - 1)
        // console.log('indexEarliestScheduledItemB', indexEarliestScheduledItemB);

        const arraySliceB = [...stoveB.slice(0, indexEarliestScheduledItemB), { order: orderKey, orderReady: stoveB[stoveB.length - scheduledItemsCountB].orderReady - currentItem.time, itemStartTime: (stoveB[stoveB.length - scheduledItemsCountB].orderReady - currentItem.time) - currentItem.time * 6000, item: currentItem }, ...stoveB.slice(indexEarliestScheduledItemB)]
        // console.log('arraySliceB', arraySliceB);


        return balance(
          stoveA, arraySliceB, orderKey, remainingItems, timePlaced, scheduledTime
        )
      } else {
        // console.log('finalOrderB !== orderKey', stoveA, stoveB, orderKey, remainingItems, timePlaced);
        return balance(
          stoveA, [...stoveB, { order: orderKey, orderReady: scheduledTime, itemStartTime: scheduledTime - currentItem.time * 6000, item: currentItem }], orderKey, remainingItems, timePlaced, scheduledTime
        )
      }
    }
  }

  if (!currentItem) {
    if (finalOrderA == orderKey && finalOrderB == orderKey) {
      if (readyTimeA >= readyTimeB) {
        // console.log("readyTimeA", readyTimeA);
        return [readyTimeA, stoveA, stoveB];
      } else {
        // console.log("readyTimeB", readyTimeB);
        return [readyTimeB, stoveA, stoveB];
      }
    } else if (finalOrderA == orderKey) {
      // console.log("readyTimeA", readyTimeA, "finalOrderA == orderkey");
      return [readyTimeA, stoveA, stoveB];
    } else {
      // console.log("readyTimeB", readyTimeB, "finalOrderB === orderkey");
      return [readyTimeB, stoveA, stoveB];
    }
  }

  // if (currentItem.name.includes("SATAY")) {
  //   console.log('currentItem.satay', currentItem.satay);
  //   return balance(stoveA, stoveB, [{ order: orderKey, orderReady: timePlaced + currentItem.time * 6000 }])
  // }

  if (readyTimeA <= readyTimeB) {
    if (readyTimeA < timePlaced) {
      // console.log(
      //   "readyTimeA <= readyTimeB && readyTimeA < timePlaced",
      //   readyTimeA,
      //   [
      //     ...stoveA,
      //     {
      //       order: orderKey,
      //       orderReady: timePlaced + currentItem.time * 60000,
      //     },
      //   ],
      //   stoveB,
      //   { timePlaced }
      // );
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
      // console.log(
      //   "readyTimeA <= readyTimeB",
      //   readyTimeA,
      //   [
      //     ...stoveA,
      //     {
      //       order: orderKey,
      //       orderReady: readyTimeA + currentItem.time * 60000,
      //     },
      //   ],
      //   stoveB,
      //   currentItem.time,
      //   { timePlaced }
      // );
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
      // console.log(
      //   "readyTimeb <= readyTimea && readyTimeb < timePlaced",
      //   readyTimeB,
      //   stoveA,
      //   [
      //     ...stoveB,
      //     {
      //       order: orderKey,
      //       orderReady: timePlaced + currentItem.time * 60000,
      //     },
      //   ],
      //   currentItem.time,
      //   { timePlaced }
      // );
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
      // console.log(
      //   "readyTimeb <= readyTimeA",
      //   readyTimeB,
      //   stoveA,
      //   [
      //     ...stoveB,
      //     {
      //       order: orderKey,
      //       orderReady: readyTimeB + currentItem.time * 60000,
      //     },
      //   ],
      //   currentItem.time,
      //   { timePlaced }
      // );

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
