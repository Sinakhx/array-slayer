var r=new Set(["string","number","boolean","null","undefined","symbol"]),a=e=>isNaN(e)&&typeof e=="number",o=e=>!!e&&e!==null&&typeof e=="object"&&!Array.isArray(e),c=JSON.stringify,l=JSON.parse;var h=e=>{if(e.length!==[...new Set(e)].length)return!1;let t=e.map(s=>typeof s=="object"&&(s!==null?JSON.stringify(s):s));return t.length===[...new Set(t)].length};var f=(e,t)=>r.has(typeof t)||a(t)?new Set(e).has(t):e.map(s=>JSON.stringify(s)).includes(JSON.stringify(t)),S=e=>!h(e),x=e=>e.some(t=>Array.isArray(t)),g=e=>e.some(o),N=e=>e.some(t=>Array.isArray(t)&&t.length===0),w=e=>e.some(t=>o(t)&&Object.keys(t).length===0),b=e=>new Set(e).has(null),A=e=>new Set(e).has(void 0),O=e=>{let t=new Set(e);return t.has(null)||t.has(void 0)},d=e=>new Set(e).has(NaN),m=e=>new Set(e).has(!0),j=e=>new Set(e).has(!1),E=e=>{let t=new Set(e);return t.has(!1)||t.has(!0)},J=e=>e.some(t=>typeof t=="number"),I=e=>e.some(t=>typeof t=="string"),T=e=>e.some(t=>!!t),M=e=>e.some(t=>!t),P=(e,t=[])=>{let s=new Set(e);return t.every(n=>s.has(n))},q=(e,t=[])=>{let s=new Set(e);return t.every(n=>s.has(typeof n))};export{f as has,P as hasAll,q as hasAllTypes,x as hasArray,E as hasBoolean,S as hasDuplicates,N as hasEmptyArr,w as hasEmptyObj,j as hasFalse,M as hasFalsy,d as hasNaN,b as hasNull,O as hasNullish,J as hasNumber,g as hasObject,I as hasString,m as hasTrue,T as hasTruthy,A as hasUndefined};
//# sourceMappingURL=has.js.map
