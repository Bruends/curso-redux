function getLocalStorage(key, defaultValue) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return defaultValue
  }
}

export default getLocalStorage
