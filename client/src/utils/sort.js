export default function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const key = arr[0]
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      continue
    }
    if (arr[i].registCount < key.registCount) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(right).concat([key], quickSort(left))
}
