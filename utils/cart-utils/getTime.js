const balance = (stoveA, stoveB, orderKey, items, timePlaced, scheduledTime = null) => {
  const [currentItem, ...remainingItems] = items;
  const scheduledItemsCountA = stoveA.filter(item => item.order === orderKey).length
  const scheduledItemsCountB = stoveB.filter(item => item.order === orderKey).length

  const readyTimeA = stoveA.at(-1) ? stoveA.at(-1).orderReady : 0;
  const readyTimeB = stoveB.at(-1) ? stoveB.at(-1).orderReady : 0;
  const startTimeA = stoveA[stoveA.length - scheduledItemsCountA] ? stoveA[stoveA.length - scheduledItemsCountA].itemStartTime ? stoveA[stoveA.length - scheduledItemsCountA].itemStartTime : 0 : 0
  const startTimeB = stoveB[stoveB.length - scheduledItemsCountB] ? stoveB[stoveB.length - scheduledItemsCountB].itemStartTime ? stoveB[stoveB.length - scheduledItemsCountB].itemStartTime : 0 : 0
  const finalOrderA = stoveA.at(-1) ? stoveA.at(-1).order : "";
  const finalOrderB = stoveB.at(-1) ? stoveB.at(-1).order : "";
  const finalScheduledOrderTimeA = stoveA.at(-1) ? stoveA.at(-1).item ? stoveA.at(-1).order === orderKey ? stoveA.at(-1).item.time : 0 : 0 : 0;
  const finalScheduledOrderTimeB = stoveB.at(-1) ? stoveB.at(-1).item ? stoveB.at(-1).order === orderKey ? stoveB.at(-1).item.time : 0 : 0 : 0;


  if (scheduledTime) {
    if (!currentItem) {
      return [readyTimeA, stoveA, stoveB]; // expand this to include start time 
    }
    if (finalScheduledOrderTimeA <= finalScheduledOrderTimeB) {
      if (finalOrderA === orderKey) {
        const indexEarliestScheduledItem = stoveA.length - (scheduledItemsCountA - 1)
        const arraySlice = [...stoveA.slice(0, indexEarliestScheduledItem),
        {
          order: orderKey,
          orderReady: stoveA[stoveA.length - scheduledItemsCountA].orderReady - currentItem.time,
          itemStartTime: (stoveA[stoveA.length - scheduledItemsCountA].orderReady - currentItem.time) - currentItem.time * 6000,
          item: currentItem
        },
        ...stoveA.slice(indexEarliestScheduledItem)]
        return balance(arraySlice, stoveB, orderKey, remainingItems, timePlaced, scheduledTime)

      } else {
        return balance(
          [...stoveA,
          {
            order: orderKey,
            orderReady: scheduledTime,
            itemStartTime: scheduledTime - currentItem.time * 6000,
            item: currentItem
          }
          ],
          stoveB,
          orderKey,
          remainingItems,
          timePlaced,
          scheduledTime
        )
      }
    } else {
      if (finalOrderB === orderKey) {
        const indexEarliestScheduledItemB = stoveB.length - (scheduledItemsCountB - 1)

        const arraySliceB = [...stoveB.slice(0, indexEarliestScheduledItemB),
        {
          order: orderKey,
          orderReady: stoveB[stoveB.length - scheduledItemsCountB].orderReady - currentItem.time,
          itemStartTime: (stoveB[stoveB.length - scheduledItemsCountB].orderReady - currentItem.time) - currentItem.time * 6000,
          item: currentItem
        },
        ...stoveB.slice(indexEarliestScheduledItemB)]
        return balance(
          stoveA, arraySliceB, orderKey, remainingItems, timePlaced, scheduledTime
        )
      } else {
        return balance(
          stoveA, [...stoveB,
          {
            order: orderKey,
            orderReady: scheduledTime,
            itemStartTime: scheduledTime - currentItem.time * 6000,
            item: currentItem
          }
        ],
          orderKey,
          remainingItems,
          timePlaced,
          scheduledTime
        )
      }
    }
  }

  if (!currentItem) {
    if (finalOrderA == orderKey && finalOrderB == orderKey) {
      if (readyTimeA >= readyTimeB) {
        return [readyTimeA, stoveA, stoveB];
      } else {
        return [readyTimeB, stoveA, stoveB];
      }
    } else if (finalOrderA == orderKey) {
      return [readyTimeA, stoveA, stoveB];
    } else {
      return [readyTimeB, stoveA, stoveB];
    }
  }

  if (readyTimeA <= readyTimeB) {
    if (readyTimeA < timePlaced) {
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
