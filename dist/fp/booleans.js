var u=new Set(["string","number","boolean","null","undefined","symbol"]);var h=JSON.stringify,y=JSON.parse;var t=(o,r)=>{if(o.length!==r.length)throw new Error("Arrays must be of the same lengths in a logical operation")};var a=class{constructor(r=[]){this.arr=r}OR(r,e){if(!Array.isArray(r)&&e===void 0)return this.arr.includes(r);if(!Array.isArray(r)&&e!==void 0)return this.arr.some(s=>e(s,r));if(Array.isArray(r)&&e===void 0)return t(r,this.arr),this.arr.some((s,n)=>s===r[n]);if(Array.isArray(r)&&e!==void 0)return t(r,this.arr),this.arr.some((s,n)=>e(s,r[n]))}AND(r,e){if(!Array.isArray(r)&&e===void 0)return this.arr.every(s=>s===r);if(!Array.isArray(r)&&e!==void 0)return this.arr.every(s=>e(s,r));if(Array.isArray(r)&&e===void 0)return t(r,this.arr),this.arr.every((s,n)=>s===r[n]);if(Array.isArray(r)&&e!==void 0)return t(r,this.arr),this.arr.every((s,n)=>e(s,r[n]))}OR_ALL(r=!1){return!!r||this.arr.some(e=>!!e)}AND_ALL(r=!0){return!!r&&this.arr.every(e=>!!e)}OR_AND(r=!0){return this.arr.every(e=>!!e||!!r)}AND_OR(r=!0){return this.arr.some(e=>!!e&&!!r)}XOR_ALL(r=!1){return!!this.arr.map(e=>!!e).reduce((e,s)=>e^s,!1)^!!r}},i=o=>new a(o),d=i;export{d as default};
//# sourceMappingURL=booleans.js.map
