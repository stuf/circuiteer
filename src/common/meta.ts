export const stringRepr = (name: string, data: object) => {
  const ps = Object.entries(data);

  const arr = [`${name}(`, ps.map(p => p.join('=')).join(', '), `)`];

  return arr.join('');
};
