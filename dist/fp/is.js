var s=n=>n.length===0,l=n=>{if(n.length!==[...new Set(n)].length)return!1;let t=n.map(e=>typeof e=="object"&&(e!==null?JSON.stringify(e):e));return t.length===[...new Set(t)].length},o=(n,t)=>JSON.stringify(n)===JSON.stringify(t);export{s as isEmpty,o as isEqual,l as isUnique};
//# sourceMappingURL=is.js.map
