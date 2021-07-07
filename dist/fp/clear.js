var t=(e=[])=>e.splice(0),o=(e=[],...r)=>{let n=e.slice();return[...r].forEach(s=>{n[s]!==void 0&&(n[s]=void 0)}),n},i=(e=[],...r)=>{let n=[...r].map(c=>JSON.stringify(c)),s=new Set([...n]);return e.map(c=>s.has(JSON.stringify(c))?void 0:c)};export{t as clear,o as clearByIndexes,i as clearByValues};
//# sourceMappingURL=clear.js.map
