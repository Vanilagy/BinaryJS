!function(){var r={byte:256,short:65536,tribyte:16777216,int:4294967296,float:16777217,double:Number.MAX_SAFE_INTEGER},t=["byte","short","tribyte","int","float","double"],e=["uByte","sByte","uShort","sShort","uTribyte","sTribyte","uInt","sInt","float","double"];function o(r){switch(r){case"byte":return 1;case"short":return 2;case"tribyte":return 3;case"int":case"float":return 4;case"double":return 8;default:throw new Error("Incorrect number type '"+r+"'")}}function n(r){switch(r){case 1:return"byte";case 2:return"short";case 3:return"tribyte";case 4:return"int";default:return"double"}}function i(r){return r.charAt(0).toUpperCase()+r.slice(1)}function a(r,t){return(r%t+t)%t}var f=/^[0-9a-fA-F]+$/;var h={version:"1.4.3",Boolean:function(){this.encode=function(r){return l.toUByte(r?1:0)},this.decode=function(r){var t="string"==typeof r?{val:r}:r,e=1===l.fromUByte(t.val.charAt(0));return t.val=t.val.slice(1),e}},Number:function(r){if(r=r||"double",-1===e.indexOf(r))throw new Error("Incorrect Number type '"+r+"'");var t=o(("double"!==r&&"float"!==r?r.slice(1):r).toLowerCase());this.encode=function(t){return l["to"+i(r)](t)},this.decode=function(e){var o="string"==typeof e?{val:e}:e,n=l["from"+i(r)](o.val.slice(0,t));return o.val=o.val.slice(t),n}},String:function(e){var n="number"==typeof e;if(n){if((e=Math.floor(e))<0)throw new Error("String cannot have a fixed length shorter than 0");var a=e}else{var f=e||"nullTer";if("nullTer"!==f&&-1===t.indexOf(f))throw new Error("Incorrect String size number type '"+f+"'")}this.encode=function(t){if(n){if(t.length===a)return t;throw new Error("Passed string isn't of specified length "+a+"!")}return"nullTer"===f?t+String.fromCharCode(0):l["toU"+i(f)](t.length)+t.slice(0,r[f])},this.decode=function(r){var t,e="string"==typeof r?{val:r}:r;if(n)t=e.val.slice(0,a),e.val=e.val.slice(a);else if("nullTer"===f)t=e.val.slice(0,e.val.indexOf(String.fromCharCode(0))),e.val=e.val.slice(t.length+1);else{var h=o(f),c=l["fromU"+i(f)](e.val.slice(0,h));t=e.val.slice(h,h+c),e.val=e.val.slice(h+c)}return t}},HexString:function(r){var t="number"==typeof r;if(t&&(r=Math.floor(r))<0)throw new Error("HexString cannot have a fixed length shorter than 0");this.encode=function(e){if(o=e,!f.test(o))throw new Error("Passed string is not a HexString!");var o;if(t&&e.length!==r)throw new Error("Passed string isn't of specified length "+r+"!");var n="";t||(n+=String.fromCharCode(e.length%2==0?1:0));for(var i=0;i<e.length;i+=2)n+=String.fromCharCode(parseInt(e.substr(i,e.length-i>=2?2:1),16));return t||(n+=String.fromCharCode(256)),n},this.decode=function(e){var o,n="string"==typeof e?{val:e}:e;if(t)o=n.val.slice(0,Math.ceil(r/2));else{var i=1===n.val.charCodeAt(0),a=n.val.indexOf(String.fromCharCode(256));o=n.val.slice(1,a)}for(var f="",h=0;h<o.length;h++)if(h!==o.length-1)f+=("00"+o.charCodeAt(h).toString(16)).slice(-2);else{var l=!1;t||i||(l=!0),t&&r%2==1&&(l=!0),f+=l?o.charCodeAt(h).toString(16):("00"+o.charCodeAt(h).toString(16)).slice(-2)}return n.val=n.val.slice(o.length+(t?0:2)),f}},Object:function(r,t){if(t){var e=Object.keys(r),a=Math.ceil(Math.log2(e.length)/8)||1,f=n(a);a=o(f)}this.encode=function(o){var n="";if(t)for(var a in n+=l["to"+("double"!==f?"U":"")+i(f)](Object.keys(o).length),o){if(void 0===r[a])throw new Error("Key '"+a+"' is not defined in the blueprint!");n+=l["to"+("double"!==f?"U":"")+i(f)](e.indexOf(a))+r[a].encode(o[a])}else for(var a in r){if(void 0===o[a])throw new Error("Key '"+a+"' is not defined!");n+=r[a].encode(o[a])}return n},this.decode=function(o){var n={},h="string"==typeof o?{val:o}:o;if(t){var c=l["from"+("double"!==f?"U":"")+i(f)](h.val.slice(0,a));h.val=h.val.slice(a);for(var d=0;d<c;d++){u=e[l["from"+("double"!==f?"U":"")+i(f)](h.val.slice(0,a))];h.val=h.val.slice(a),n[u]=r[u].decode(h)}}else for(var u in r)n[u]=r[u].decode(h);return n}},Array:function(r,e){if(e){if(!(t.indexOf(e)>-1))throw new Error("Incorrect Array size number type '"+e+"'");var n=o(e)}this.encode=function(t){var o="";if(e){for(var n=Math.ceil(t.length/r.length),a=0;a<n;a++)for(var f=0;f<r.length;f++)o+=r[f].encode(t[a*r.length+f]);o=l["toU"+i(e)](n)+o}else for(a=0;a<r.length;a++)o+=r[a].encode(t[a]);return o},this.decode=function(t){var o=[],a="string"==typeof t?{val:t}:t;if(e){var f=l["fromU"+i(e)](a.val.slice(0,n));a.val=a.val.slice(n);for(var h=0;h<f;h++)for(var c=0;c<r.length;c++)o[h*r.length+c]=r[c].decode(a)}else for(h=0;h<r.length;h++)o[h]=r[h].decode(a);return o}},Dynamic:function(r){var t=Object.keys(r),e=Math.ceil(Math.log2(t.length)/8)||1,a=n(e);e=o(a),this.encode=function(e,o){if(void 0!==o)var n=e,f=o;else n=e.key,f=e.value;if(void 0===r[n])throw new Error("Key '"+n+"' is not defined!");return l["to"+("double"!==a?"U":"")+i(a)](t.indexOf(n))+(null===r[n]?"":r[n].encode(f))},this.decode=function(o){var n="string"==typeof o?{val:o}:o,f=t[l["from"+("double"!==a?"U":"")+i(a)](n.val.slice(0,e))];return n.val=n.val.slice(e),{key:f,value:null===r[f]?null:r[f].decode(n)}}},NullWrapper:function(r){this.encode=function(t){return null===t?String.fromCharCode(0):String.fromCharCode(1)+r.encode(t)},this.decode=function(t){var e="string"==typeof t?{val:t}:t,o=0===e.val.charCodeAt(0);return e.val=e.val.slice(1),o?null:r.decode(e)}}},l={fromUByte:function(t){return a(t.charCodeAt(0),r.byte)},toUByte:function(t){return t=a(Math.round(t),r.byte),String.fromCharCode(t)},fromUShort:function(t){return a(t.charCodeAt(0)*r.byte+t.charCodeAt(1),r.short)},toUShort:function(t){return t=a(Math.round(t),r.short),String.fromCharCode(Math.floor(t/r.byte))+String.fromCharCode(t%r.byte)},fromUTribyte:function(t){return a(t.charCodeAt(0)*r.short+t.charCodeAt(1)*r.byte+t.charCodeAt(2),r.tribyte)},toUTribyte:function(t){return t=a(Math.round(t),r.tribyte),String.fromCharCode(Math.floor(t/r.short))+String.fromCharCode(Math.floor(t%r.short/r.byte))+String.fromCharCode(t%r.byte)},fromUInt:function(t){return a(t.charCodeAt(0)*r.tribyte+t.charCodeAt(1)*r.short+t.charCodeAt(2)*r.byte+t.charCodeAt(3),r.int)},toUInt:function(t){return t=a(Math.round(t),r.int),String.fromCharCode(Math.floor(t/r.tribyte))+String.fromCharCode(Math.floor(t%r.tribyte/r.short))+String.fromCharCode(Math.floor(t%r.short/r.byte))+String.fromCharCode(t%r.byte)},fromSByte:function(t){return this.fromUByte(t)-r.byte/2},toSByte:function(t){return this.toUByte(t+r.byte/2)},fromSShort:function(t){return this.fromUShort(t)-r.short/2},toSShort:function(t){return this.toUShort(t+r.short/2)},fromSTribyte:function(t){return this.fromUTribyte(t)-r.tribyte/2},toSTribyte:function(t){return this.toUTribyte(t+r.tribyte/2)},fromSInt:function(t){return this.fromUInt(t)-r.int/2},toSInt:function(t){return this.toUInt(t+r.int/2)},fromFloat:function(r){var t=r.charCodeAt(0)%128*2+(r.charCodeAt(1)>=128?1:0)-127,e=r.charCodeAt(0)>=128?-1:1;if(-127===t)return 0*e;if(128===t)return 0==(64&r.charCodeAt(1))?1/0*e:NaN;var o=1;return o+=r.charCodeAt(1)%128/128,o+=r.charCodeAt(2)/128/256,o+=r.charCodeAt(3)/128/256/256,e*Math.pow(2,t)*o},toFloat:function(r){if(0===r)return String.fromCharCode(1/r>0?0:128)+"\0\0\0";if(isNaN(r))return"À\0\0";var t=Math.abs(r),e=Math.min(128,Math.max(-127,Math.floor(Math.log2(t))));if(128===e)return String.fromCharCode(127+(r>0?0:128))+"\0\0";var o=e+127,n=128*(t/Math.pow(2,e)-1),i=0|n,a=String.fromCharCode((r>0?0:128)+(o>>>1))+String.fromCharCode(o%2*128+i);return i=0|(n=256*(n-i)),a+=String.fromCharCode(i),n=256*(n-i),a+=String.fromCharCode(0|n)},fromDouble:function(r){var t=r.charCodeAt(0)%128*16+(240&r.charCodeAt(1))/16-1023,e=r.charCodeAt(0)>=128?-1:1;if(-1023===t)return 0*e;if(1024===t)return 0==(8&r.charCodeAt(1))?1/0*e:NaN;var o=1;return o+=r.charCodeAt(1)%16/16,o+=r.charCodeAt(2)/16/256,o+=r.charCodeAt(3)/16/256/256,o+=r.charCodeAt(4)/16/256/256/256,o+=r.charCodeAt(5)/16/256/256/256/256,o+=r.charCodeAt(6)/16/256/256/256/256/256,o+=r.charCodeAt(7)/16/256/256/256/256/256/256,e*Math.pow(2,t)*o},toDouble:function(r){if(0===r)return String.fromCharCode(1/r>0?0:128)+"\0\0\0\0\0\0\0";if(isNaN(r))return"ø\0\0\0\0\0\0";var t=Math.abs(r),e=Math.min(1024,Math.max(-1023,Math.floor(Math.log2(t))));if(1024===e)return String.fromCharCode(127+(r>0?0:128))+"ð\0\0\0\0\0\0";var o=e+1023,n=16*(t/Math.pow(2,e)-1),i=0|n,a=String.fromCharCode((r>0?0:128)+(o>>>4))+String.fromCharCode(o%16*16+i);return i=0|(n=256*(n-i)),a+=String.fromCharCode(i),i=0|(n=256*(n-i)),a+=String.fromCharCode(i),i=0|(n=256*(n-i)),a+=String.fromCharCode(i),i=0|(n=256*(n-i)),a+=String.fromCharCode(i),i=0|(n=256*(n-i)),a+=String.fromCharCode(i),n=256*(n-i),a+=String.fromCharCode(0|n)}};"object"==typeof module&&"object"==typeof module.exports?module.exports=h:"undefined"!=typeof window?window.binary=h:this.binary=h}();