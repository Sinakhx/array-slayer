var h=(t,e)=>{if(t.length!==e.length)throw new Error("arrays must be of the same length to produce dot product.");let n=0;for(let o=0;o<t.length;o++)n+=t[o]*e[o];return n},s=(t,e)=>{if(t.length!==e.length)throw new Error("arrays must be of the same length to produce cross product.");if(t.length<=1)return 0;if(t.length===2)return[t[0]*e[1]-t[1]*e[0]];if(t.length===3)return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]];throw new Error("arrays must be of the length less than or equal to 3.")};export{s as crossProduct,h as dotProduct};
//# sourceMappingURL=matrix.js.map