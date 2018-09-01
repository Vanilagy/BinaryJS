!function(){var c={byte:256,short:65536,tribyte:16777216,int:4294967296,float:16777217,double:Number.MAX_SAFE_INTEGER},r=["byte","short","tribyte","int","float","double"],t=["uByte","sByte","uShort","sShort","uTribyte","sTribyte","uInt","sInt","float","double"];function d(t){switch(t){case"byte":return 1;case"short":return 2;case"tribyte":return 3;case"int":case"float":return 4;case"double":return 8;default:throw new Error("Incorrect number type '"+t+"'")}}function s(t){switch(t){case 1:return"byte";case 2:return"short";case 3:return"tribyte";case 4:return"int";default:return"double"}}function e(t,r){return(t%r+r)%r}var o=/^[0-9a-fA-F]+$/;var l=0,n={version:"2.1.0",Boolean:function(){this.encode=function(t){return t?"":"\0"},this.decode=function(t,r){return!0!==r&&(l=0),1===t.charCodeAt(l++)}},Number:function(n){if(n=n||"double",-1===t.indexOf(n))throw new Error("Incorrect Number type '"+n+"'");var o=d(("double"!==n&&"float"!==n?n.slice(1):n).toLowerCase());this.encode=function(t){return y.to[n](t)},this.decode=function(t,r){!0!==r&&(l=0);var e=y.from[n](t.substr(l,o));return l+=o,e}},String:function(t){var i="number"==typeof t;if(i){if((t=Math.floor(t))<0)throw new Error("String cannot have a fixed length shorter than 0");var h=t}else{var a=t||"nullTer";if("nullTer"!==a&&-1===r.indexOf(a))throw new Error("Incorrect String size number type '"+a+"'")}this.encode=function(t){if(i){if(t.length===h)return t;throw new Error("Passed string isn't of specified length "+h+"!")}return"nullTer"===a?(-1!==t.indexOf("\0")&&t.replace(/\u0000/g," "),t+"\0"):(t=t.slice(0,c[a]-1),y.to[a](t.length)+t)},this.decode=function(t,r){var e;if(!0!==r&&(l=0),i)e=t.substr(l,h),l+=h;else if("nullTer"===a)e=t.slice(l,t.indexOf("\0",l)),l+=e.length+1;else{var n=d(a),o=y.from[a](t.substr(l,n));e=t.substr(l+n,o),l+=n+o}return e}},HexString:function(u){var f="number"==typeof u;if(f&&(u=Math.floor(u))<0)throw new Error("HexString cannot have a fixed length shorter than 0");this.encode=function(t){if(r=t,!o.test(r))throw new Error("Passed string is not a HexString!");var r;if(f&&t.length!==u)throw new Error("Passed string isn't of specified length "+u+"!");var e="";f||(e+=String.fromCharCode(t.length%2==0?1:0));for(var n=0;n<t.length;n+=2)e+=String.fromCharCode(parseInt(t.substr(n,2<=t.length-n?2:1),16));return f||(e+="Ā"),e},this.decode=function(t,r){var e;if(!0!==r&&(l=0),f)e=t.substr(l,Math.ceil(u/2));else{var n=1===t.charCodeAt(l),o=t.indexOf("Ā",l);e=t.slice(l+1,o)}for(var i="",h=0;h<e.length;h++)if(h!==e.length-1)i+=("00"+e.charCodeAt(h).toString(16)).slice(-2);else{var a=!1;f||n||(a=!0),f&&u%2==1&&(a=!0),i+=a?e.charCodeAt(h).toString(16):("00"+e.charCodeAt(h).toString(16)).slice(-2)}return l+=e.length+(f?0:2),i}},Object:function(h,a){var u=Object.keys(h);if(u.sort(),a){var f=Math.ceil(Math.log2(u.length)/8)||1,c=s(f);f=d(c)}this.encode=function(t){var r="";if(a){var e=0;for(var n in t)void 0!==h[n]&&(r+=y.to[c](u.indexOf(n))+h[n].encode(t[n]),e++);r=y.to[c](e)+r}else for(var o=0;o<u.length;o++){if(void 0===t[n=u[o]])throw new Error("Key '"+n+"' is defined in the blueprint, but not in the input object!");r+=h[n].encode(t[n])}return r},this.decode=function(t,r){!0!==r&&(l=0);var e={};if(a){var n=y.from[c](t.substr(l,f));l+=f;for(o=0;o<n;o++){i=u[y.from[c](t.substr(l,f))];l+=f,e[i]=h[i].decode(t,!0)}}else for(var o=0;o<u.length;o++){var i;e[i=u[o]]=h[i].decode(t,!0)}return e}},Array:function(h,a){if(void 0!==a){var u="number"==typeof a;if(u){if((a=Math.floor(a))<0)throw new Error("Array cannot have a fixed length shorter than 0")}else{if(!(-1<r.indexOf(a)))throw new Error("Incorrect Array size number type '"+a+"'");var f=d(a)}}this.encode=function(t){if(t.length%h.length!=0)throw new Error("Array (length "+t.length+") contains at least one incomplete pattern!");var r="";if(void 0!==a){if(u){if(t.length!==a*h.length)throw new Error("Array pattern in the input isn't repeated exactly "+a+" times, as was specified")}else t=t.slice(0,(c[a]-1)*h.length);for(var e=Math.ceil(t.length/h.length),n=0;n<e;n++)for(var o=0;o<h.length;o++)r+=h[o].encode(t[n*h.length+o]);u||(r=y.to[a](e)+r)}else for(n=0;n<h.length;n++)r+=h[n].encode(t[n]);return r},this.decode=function(t,r){!0!==r&&(l=0);var e=[];if(a){var n;u?n=a:(n=y.from[a](t.substr(l,f)),l+=f);for(var o=0;o<n;o++)for(var i=0;i<h.length;i++)e[o*h.length+i]=h[i].decode(t,!0)}else for(o=0;o<h.length;o++)e[o]=h[o].decode(t,!0);return e}},Dynamic:function(o){var i=Object.keys(o);i.sort();var n=Math.ceil(Math.log2(i.length)/8)||1,h=s(n);n=d(h),this.encode=function(t,r){var e,n;if(void 0!==r?(e=t,n=r):(e=t.key,n=t.value),void 0===o[e])throw new Error("Key '"+e+"' is not defined!");return y.to[h](i.indexOf(e))+(null===o[e]?"":o[e].encode(n))},this.decode=function(t,r){!0!==r&&(l=0);var e=i[y.from[h](t.slice(l,n))];return l+=n,{key:e,value:null===o[e]?null:o[e].decode(t,!0)}}},Set:function(n){for(var e={},r=0;r<set.length;r++)try{e[JSON.stringify(n[r])]=r}catch(t){throw new Error("Set element "+n[r]+" couldn't be serialized.",t)}var o=Math.ceil(Math.log2(n.length)/8)||1,i=s(o);o=d(i),this.encode=function(t){var r=e[JSON.stringify(t)];if(void 0!==r)return y.to[i](r);throw new Error("Element "+t+" not specified in Set!")},this.decode=function(t,r){!0!==r&&(l=0);var e=y.from[i](t.substr(l,o));return l+=o,n[e]}},NullWrapper:function(e){this.encode=function(t){return null===t?"\0":""+e.encode(t)},this.decode=function(t,r){return!0!==r&&(l=0),0===t.charCodeAt(l++)?null:e.decode(t,!0)}}},i=new ArrayBuffer(8),h=new Uint8Array(i),a=new Float32Array(i),u=new Float64Array(i),y={to:{uByte:function(t){return t=e(Math.round(t),c.byte),String.fromCharCode(t)},uShort:function(t){return t=e(Math.round(t),c.short),String.fromCharCode(Math.floor(t/c.byte))+String.fromCharCode(t%c.byte)},uTribyte:function(t){return t=e(Math.round(t),c.tribyte),String.fromCharCode(Math.floor(t/c.short))+String.fromCharCode(Math.floor(t%c.short/c.byte))+String.fromCharCode(t%c.byte)},uInt:function(t){return t=e(Math.round(t),c.int),String.fromCharCode(Math.floor(t/c.tribyte))+String.fromCharCode(Math.floor(t%c.tribyte/c.short))+String.fromCharCode(Math.floor(t%c.short/c.byte))+String.fromCharCode(t%c.byte)},sByte:function(t){return this.uByte(t+c.byte/2)},sShort:function(t){return this.uShort(t+c.short/2)},sTribyte:function(t){return this.uTribyte(t+c.tribyte/2)},sInt:function(t){return this.uInt(t+c.int/2)},float:function(t){return a[0]=t,String.fromCharCode(h[0])+String.fromCharCode(h[1])+String.fromCharCode(h[2])+String.fromCharCode(h[3])},double:function(t){return u[0]=t,String.fromCharCode(h[0])+String.fromCharCode(h[1])+String.fromCharCode(h[2])+String.fromCharCode(h[3])+String.fromCharCode(h[4])+String.fromCharCode(h[5])+String.fromCharCode(h[6])+String.fromCharCode(h[7])}},from:{uByte:function(t){return e(t.charCodeAt(0),c.byte)},uShort:function(t){return e(t.charCodeAt(0)*c.byte+t.charCodeAt(1),c.short)},uTribyte:function(t){return e(t.charCodeAt(0)*c.short+t.charCodeAt(1)*c.byte+t.charCodeAt(2),c.tribyte)},uInt:function(t){return e(t.charCodeAt(0)*c.tribyte+t.charCodeAt(1)*c.short+t.charCodeAt(2)*c.byte+t.charCodeAt(3),c.int)},sByte:function(t){return this.uByte(t)-c.byte/2},sShort:function(t){return this.uShort(t)-c.short/2},sTribyte:function(t){return this.uTribyte(t)-c.tribyte/2},sInt:function(t){return this.uInt(t)-c.int/2},float:function(t){return h[0]=t.charCodeAt(0),h[1]=t.charCodeAt(1),h[2]=t.charCodeAt(2),h[3]=t.charCodeAt(3),a[0]},double:function(t){return h[0]=t.charCodeAt(0),h[1]=t.charCodeAt(1),h[2]=t.charCodeAt(2),h[3]=t.charCodeAt(3),h[4]=t.charCodeAt(4),h[5]=t.charCodeAt(5),h[6]=t.charCodeAt(6),h[7]=t.charCodeAt(7),u[0]}}};y.to.byte=y.to.uByte,y.to.short=y.to.uShort,y.to.tribyte=y.to.uTribyte,y.to.int=y.to.uInt,y.from.byte=y.from.uByte,y.from.short=y.from.uShort,y.from.tribyte=y.from.uTribyte,y.from.int=y.from.uInt,"object"==typeof module&&"object"==typeof module.exports?module.exports=n:"undefined"!=typeof window?window.Binarify=n:this.Binarify=n}();