

export const calculateOrderReadyTime = (orderReadyTimeMinutes: number) => {
    const orderReadyTimeMilliseconds = orderReadyTimeMinutes * 60000
    const timePlacedMilliseconds = Date.now();
    const timePlaced = new Date().toLocaleTimeString(
        [], { hour: "2-digit", minute: "2-digit" }
    )
    const timeReadyString: string = new Date(orderReadyTimeMilliseconds).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    return [orderReadyTimeMilliseconds, timeReadyString];
}