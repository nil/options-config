/*!
 * options-config v3.0.0
 * by Nil Vila
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("lodash.isnumber"),require("lodash.isequal"),require("lodash.includes")):"function"==typeof define&&define.amd?define(["lodash.isnumber","lodash.isequal","lodash.includes"],t):e.optionsConfig=t(e.isNumber,e.isEqual,e.includes)}(this,function(e,t,n){"use strict";function r(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n;class i{constructor(e){this.name="options-config",this.message=e,this.stack=(new Error).stack}}function s(t,n,r){if(r){const o=r.min,s=r.max,a=r.step;if(!e(o)&&void 0!==o||!e(s)&&void 0!==s||!e(a)&&void 0!==a)throw new i(`Range is not properly configured for '${t}'.`);if(!function(e,t,n,r){return!(t>e||n<e||r&&!Number.isInteger(((t||0)-e)/r))}(n,o,s,a))throw new i(`${n} doesn't fit the range specified for '${t}'.`)}return!1}function a(e,o,s,a){if(s){if(function(e,o){const i=o[r(e)]||o;if(i===e||n(i,e)||"all"===i)return!0;for(let n=0;n<i.length;n+=1)if(t(i[n],e))return!0;return!1}(o,s))return!0;const a="array"===r(s)&&s.length>1?`${s.slice(0,-1).join(", ")} or ${s.slice(-1)}`:`${s}`;throw new i(`'${o}' doesn't match any of the valid values for '${e}' (${a}).`)}return!1}function u(e,t,n){let u,f,l,c;const d=n[e],h=o(t,e)?t[e]:"value_not_defined";let p=d;return d&&(u=d.type,f=d.valid,l=d.range,c=d.regex,p=o(d,"default")?d.default:d),function(e){return"value_not_defined"===e}(h)?p:function(e,t,n){if(n){if("string"===r(t)&&t.match(n)&&t.match(n)[0]===t)return!0;throw new i(`'${t}' doesn't match the Regex expression ${n} for '${e}'.`)}return!1}(e,h,c)?h:a(e,h,f)?h:(function(e,t,n){const o=r(t);if(n&&!n.includes(o)){const s="array"===r(n)&&n.length>1?`${n.slice(0,-1).join(", ")} or ${n.slice(-1)}`:`${n}`;throw new i(`'${t}', ${o}, is not a valid data type for '${e}' (${s}).`)}}(e,h,u),s(e,h,l),h)}i.prototype=new Error;return class{constructor(e){this.defaults=e}validate(e,t=this.defaults){const n={};for(const i in t)if(o(t,i)){let s,a,f,l,c=t[i];if("object"!==r(c)||o(c,"default")&&"object"!==r(c.default))n[i]=u(i,e,t);else{n[i]={},c.default&&(s=c.type,a=c.valid,f=c.range,l=c.regex,c=c.default);for(const t in c)if(o(c,t)){"object"===r(c[t])&&(c[t].type=c[t].type||s,c[t].valid=c[t].valid||a,c[t].range=c[t].range||f,c[t].regex=c[t].regex||l);const o=e[i]||{};n[i][t]=u(t,o,c)}}}return n}}});
