var c=new Set(["string","number","boolean","null","undefined","symbol"]);var f=JSON.stringify,p=JSON.parse;var g=(o=[],n,t)=>{let e=o.slice();return[e[n],e[t]]=[e[t],e[n]],e},d=(o=[],n,t)=>{let e=o.slice(),r=n,i=t;(!c.has(typeof n)||!c.has(typeof t))&&(e=o.map(s=>JSON.stringify(s)),r=JSON.stringify(r),i=JSON.stringify(i));let a=e.findIndex(s=>s===r),l=e.findIndex(s=>s===i);if(!(a>-1&&l>-1))throw new Error("the value you are looking for is not present in the array.");return[e[a],e[l]]=[e[l],e[a]],e};export{g as swapByIndexes,d as swapByValues};
//# sourceMappingURL=swap.js.map
