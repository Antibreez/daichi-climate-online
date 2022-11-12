const areObjectsEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let key of keys1) {
    if (obj1[key].length !== obj2[key].length) {
      return false
    }
  }

  return true
}

const areObjectKeysEmpty = obj => {
  const keys = Object.keys(obj)

  for (let key of keys) {
    if (obj[key].length > 0) {
      return false
    }
  }

  return true
}

const copyObject = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export {areObjectsEqual, areObjectKeysEmpty, copyObject}
