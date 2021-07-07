var i=(t=[],...n)=>{let s=new Set([...n]);return t.filter((r,e)=>!s.has(e))},l=(t=[],...n)=>{let s=[...n].map(e=>JSON.stringify(e)),r=new Set([...s]);return t.filter(e=>!r.has(JSON.stringify(e)))};export{i as deleteByIndexes,l as deleteByValues};
//# sourceMappingURL=delete.js.map
