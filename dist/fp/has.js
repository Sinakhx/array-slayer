var o=new Set(["string","number","boolean","null","undefined","symbol"]),a=e=>isNaN(e)&&typeof e=="number",n=e=>typeof e=="object"&&e!==null&&Array.isArray(e)===!1,c=JSON.stringify,l=JSON.parse;var h=e=>{if(e.length!==[...new Set(e)].length)return!1;let t=e.map(s=>typeof s=="object"&&(s!==null?JSON.stringify(s):s));return t.length===[...new Set(t)].length};var f=(e,t)=>o.has(typeof t)||a(t)?new Set(e).has(t):e.map(s=>JSON.stringify(s)).includes(JSON.stringify(t)),S=e=>!h(e),N=e=>e.some(t=>Array.isArray(t)),g=e=>e.some(n),x=e=>e.some(t=>Array.isArray(t)&&t.length===0),w=e=>e.some(t=>n(t)&&Object.keys(t).length===0),A=e=>new Set(e).has(null),b=e=>new Set(e).has(void 0),d=e=>{let t=new Set(e);return t.has(null)||t.has(void 0)},m=e=>new Set(e).has(NaN),O=e=>new Set(e).has(!0),E=e=>new Set(e).has(!1),j=e=>{let t=new Set(e);return t.has(!1)||t.has(!0)},I=e=>e.some(t=>typeof t=="number"&&!isNaN(t)),J=e=>e.some(t=>typeof t=="string"),T=e=>e.some(t=>!!t),M=e=>e.some(t=>!t),P=(e,t=[])=>{let s=new Set(e);return t.every(r=>s.has(r))},k=(e,t=[])=>{let s=new Set(e);return t.every(r=>s.has(typeof r))};export{f as has,P as hasAll,k as hasAllTypes,N as hasArray,j as hasBoolean,S as hasDuplicates,x as hasEmptyArr,w as hasEmptyObj,E as hasFalse,M as hasFalsy,m as hasNaN,A as hasNull,d as hasNullish,I as hasNumber,g as hasObject,J as hasString,O as hasTrue,T as hasTruthy,b as hasUndefined};
//# sourceMappingURL=has.js.map
