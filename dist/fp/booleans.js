var i=new Set(["string","number","boolean","null","undefined","symbol"]);var h=JSON.stringify,c=JSON.parse;var s=(o,r)=>{if(o.length!==r.length)throw new Error("Arrays must be of the same lengths in a logical operation")};var f=class{constructor(r=[]){this.arr=r}OR(r,n){if(!Array.isArray(r)&&n===void 0)return this.arr.includes(r);if(!Array.isArray(r)&&n!==void 0)return this.arr.some(t=>n(t,r));if(Array.isArray(r)&&n===void 0)return s(r,this.arr),this.arr.some((t,e)=>t===r[e]);if(Array.isArray(r)&&n!==void 0)return s(r,this.arr),this.arr.some((t,e)=>n(t,r[e]))}AND(r,n){if(!Array.isArray(r)&&n===void 0)return this.arr.every(t=>t===r);if(!Array.isArray(r)&&n!==void 0)return this.arr.every(t=>n(t,r));if(Array.isArray(r)&&n===void 0)return s(r,this.arr),this.arr.every((t,e)=>t===r[e]);if(Array.isArray(r)&&n!==void 0)return s(r,this.arr),this.arr.every((t,e)=>n(t,r[e]))}OR_ALL(r=!1){return!!r||this.arr.some(n=>!!n)}AND_ALL(r=!0){return!!r&&this.arr.every(n=>!!n)}OR_AND(r=!0){return this.arr.every(n=>!!n||!!r)}AND_OR(r=!0){return this.arr.some(n=>!!n&&!!r)}XOR_ALL(r=!1){return!!this.arr.map(n=>!!n).reduce((n,t)=>n^t,!1)^!!r}},u=o=>new f(o),A=u;export{A as default};
//# sourceMappingURL=booleans.js.map
