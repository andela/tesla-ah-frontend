
export default arr => Array.from(new Set(arr.map(a => a.id)))
  .map(id => arr.find(a => a.id === id));
