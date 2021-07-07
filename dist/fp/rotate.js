var l=(e=[],o=0,i="clockwise")=>{if(o<=0)return e;let c=o%e.length;if(i==="clockwise")return e.slice(-1*c).concat(e.slice(0,-1*c));if(i==="counterclockwise")return e.slice(c).concat(e.slice(0,c));throw new Error('"direction" prop can only be either "clockwise" or "counterclockwise". The value you have provided is not valid.')};export{l as rotate};
//# sourceMappingURL=rotate.js.map
