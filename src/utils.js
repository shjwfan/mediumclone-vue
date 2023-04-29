const range = (s, e) => {
  return [...Array(e).keys()].map(key => key + s)
}

export {range}
