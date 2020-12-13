export const shuffle = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let swapIndex = Math.floor(Math.random() * i)
    const temp = arr[swapIndex]
    arr[swapIndex] = arr[i]
    arr[i] = temp
  }

  return arr
}
