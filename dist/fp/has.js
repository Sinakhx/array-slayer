var o=new Set(["string","number","boolean","null","undefined","symbol"]),a=e=>isNaN(e)&&typeof e=="number",r=e=>typeof e=="object"&&e!==null&&Array.isArray(e)===!1,c=JSON.stringify,l=JSON.parse;var h=e=>{if(e.length!==[...new Set(e)].length)return!1;let s=e.map(t=>typeof t=="object"&&(t!==null?JSON.stringify(t):t));return s.length===[...new Set(s)].length};var f=(e,s)=>o.has(typeof s)||a(s)?new Set(e).has(s):e.map(t=>JSON.stringify(t)).includes(JSON.stringify(s)),S=e=>!h(e),N=e=>e.some(s=>Array.isArray(s)),x=e=>e.some(r),g=e=>e.some(s=>Array.isArray(s)&&s.length===0),w=e=>e.some(s=>r(s)&&Object.keys(s).length===0),A=e=>new Set(e).has(null),b=e=>new Set(e).has(void 0),d=e=>{let s=new Set(e);return s.has(null)||s.has(void 0)},m=e=>new Set(e).has(NaN),O=e=>new Set(e).has(!0),E=e=>new Set(e).has(!1),j=e=>{let s=new Set(e);return s.has(!1)||s.has(!0)},J=e=>e.some(s=>typeof s=="number"&&!isNaN(s)),I=e=>e.some(s=>typeof s=="string"),T=e=>e.some(s=>!!s),M=e=>e.some(s=>!s),P=(e,s=[])=>{let t=new Set(e);return s.every(n=>t.has(n))},k=(e,s=[])=>{let t=new Set(e);return s.every(n=>t.has(typeof n))};export{f as has,P as hasAll,k as hasAllTypes,N as hasArray,j as hasBoolean,S as hasDuplicates,g as hasEmptyArr,w as hasEmptyObj,E as hasFalse,M as hasFalsy,m as hasNaN,A as hasNull,d as hasNullish,J as hasNumber,x as hasObject,I as hasString,O as hasTrue,T as hasTruthy,b as hasUndefined};
//# sourceMappingURL=has.js.map
