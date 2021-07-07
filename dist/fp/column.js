var i=(n,t,r)=>{if(typeof t=="function")return n.map(t);if(!!r&&typeof r=="string"){let o=r.split(".");return n.map(p=>o.reduce((e,f)=>e[f],p[t]))}if(r)throw new Error("key has to be of type 'string'");return n.map(o=>o[t])};export{i as column};
//# sourceMappingURL=column.js.map
