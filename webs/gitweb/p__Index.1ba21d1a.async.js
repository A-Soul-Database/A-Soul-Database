(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[163],{981:function(R,h,t){"use strict";var _=t(906),c=t(19297),s=t(96320),l=t(59301),d=t(92691),u=t.n(d),D=t(24877),f=t(84893),O=["className","component","viewBox","spin","rotate","tabIndex","onClick","children"],o=l.forwardRef(function(e,n){var a=e.className,v=e.component,r=e.viewBox,Z=e.spin,E=e.rotate,x=e.tabIndex,M=e.onClick,i=e.children,y=(0,s.Z)(e,O);(0,f.Kp)(Boolean(v||i),"Should have `component` prop or `children`."),(0,f.C3)();var I=l.useContext(D.Z),A=I.prefixCls,p=A===void 0?"anticon":A,T=u()(p,a),L=u()((0,c.Z)({},"".concat(p,"-spin"),!!Z)),g=E?{msTransform:"rotate(".concat(E,"deg)"),transform:"rotate(".concat(E,"deg)")}:void 0,C=(0,_.Z)((0,_.Z)({},f.vD),{},{className:L,style:g,viewBox:r});r||delete C.viewBox;var B=function(){return v?l.createElement(v,(0,_.Z)({},C),i):i?((0,f.Kp)(Boolean(r)||l.Children.count(i)===1&&l.isValidElement(i)&&l.Children.only(i).type==="use","Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."),l.createElement("svg",(0,_.Z)((0,_.Z)({},C),{},{viewBox:r}),i)):null},m=x;return m===void 0&&M&&(m=-1),l.createElement("span",(0,_.Z)((0,_.Z)({role:"img"},y),{},{ref:n,tabIndex:m,onClick:M,className:T}),B())});o.displayName="AntdIcon",h.Z=o},99165:function(R,h,t){"use strict";t.d(h,{Z:function(){return O}});var _=t(906),c=t(96320),s=t(59301),l=t(981),d=["type","children"],u=new Set;function D(o){return Boolean(typeof o=="string"&&o.length&&!u.has(o))}function f(o){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=o[e];if(D(n)){var a=document.createElement("script");a.setAttribute("src",n),a.setAttribute("data-namespace",n),o.length>e+1&&(a.onload=function(){f(o,e+1)},a.onerror=function(){f(o,e+1)}),u.add(n),document.body.appendChild(a)}}function O(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=o.scriptUrl,n=o.extraCommonProps,a=n===void 0?{}:n;e&&typeof document!="undefined"&&typeof window!="undefined"&&typeof document.createElement=="function"&&(Array.isArray(e)?f(e.reverse()):f([e]));var v=s.forwardRef(function(r,Z){var E=r.type,x=r.children,M=(0,c.Z)(r,d),i=null;return r.type&&(i=s.createElement("use",{xlinkHref:"#".concat(E)})),x&&(i=x),s.createElement(l.Z,(0,_.Z)((0,_.Z)((0,_.Z)({},a),M),{},{ref:Z}),i)});return v.displayName="Iconfont",v}},69076:function(R,h,t){"use strict";t.d(h,{Z:function(){return c}});var _=t(48718);function c(s,l){var d=typeof Symbol!="undefined"&&s[Symbol.iterator]||s["@@iterator"];if(!d){if(Array.isArray(s)||(d=(0,_.Z)(s))||l&&s&&typeof s.length=="number"){d&&(s=d);var u=0,D=function(){};return{s:D,n:function(){return u>=s.length?{done:!0}:{done:!1,value:s[u++]}},e:function(n){throw n},f:D}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var f=!0,O=!1,o;return{s:function(){d=d.call(s)},n:function(){var n=d.next();return f=n.done,n},e:function(n){O=!0,o=n},f:function(){try{!f&&d.return!=null&&d.return()}finally{if(O)throw o}}}}},37141:function(R,h,t){"use strict";t.d(h,{EQ:function(){return u},VO:function(){return D},Yu:function(){return f},GP:function(){return O}});var _=t(10971),c=t(69076),s=["https://livedb.asoulfan.com","https://raw.githubusercontent.com/peterpei1186861238/A-Soul-Database/main","https://cdn.jsdelivr.net/gh/peterpei1186861238/A-Soul-Database@latest"],l=2;h.ZP={RunOnLocal:l!==0,sourceUrl:s[l]};var d=["scene","staff","type"];function u(e,n){{var a=new Set,v=(0,c.Z)(n.staff),r;try{for(v.s();!(r=v.n()).done;){var Z=r.value;if(Z!=="F"){var E=(0,c.Z)(n.skin[Z]),x;try{for(E.s();!(x=E.n()).done;){var M=x.value;a.add(M)}}catch(P){E.e(P)}finally{E.f()}}}}catch(P){v.e(P)}finally{v.f()}var i=Array.from(a);if(i.length!==0&&!o(e.skin,i))return!1}if(e.platform.indexOf(n.platform)===-1)return!1;var y=(0,c.Z)(d),I;try{for(y.s();!(I=y.n()).done;){var A=I.value;if(!o(e[A],n[A]))return!1}}catch(P){y.e(P)}finally{y.f()}if(e.titlestr===""&&e.tagstr===""&&e.typestr===""||n.title.toLowerCase().indexOf(e.titlestr.toLowerCase())!==-1)return!0;{var p=(0,c.Z)(n.tags),T;try{for(p.s();!(T=p.n()).done;){var L=T.value;if(L.toLowerCase().indexOf(e.tagstr.toLowerCase())!==-1)return!0}}catch(P){p.e(P)}finally{p.f()}}{var g=(0,c.Z)(n.items),C;try{for(g.s();!(C=g.n()).done;){var B=C.value,m=(0,c.Z)(B.item),b;try{for(m.s();!(b=m.n()).done;){var U=b.value;if(U[0].toLowerCase().indexOf(e.typestr.toLowerCase())!==-1)return!0}}catch(P){m.e(P)}finally{m.f()}}}catch(P){g.e(P)}finally{g.f()}}return!1}function D(e){var n=new XMLHttpRequest;n.open("GET",e,!1),n.send(null);var a;try{a=JSON.parse(n.responseText)}catch(v){a={title:"error"}}finally{return a}}function f(e){var n=new XMLHttpRequest;n.open("GET",e,!1),n.send(null);var a;try{a=n.responseText}catch(v){a="error http"}finally{return a}}function O(e){for(var n=[],a=e.length-1;a>=0;a--)n.push(e[a]);return n}function o(e,n){return e.length+n.length!==Array.from(new Set([].concat((0,_.Z)(e),(0,_.Z)(n)))).length}},81864:function(R,h,t){"use strict";t.r(h);var _=t(79030),c=t(97231),s=t(17051),l=t(4701),d=t(52916),u=t(34636),D=t(83405),f=t(6575),O=t(9962),o=t(59301),e=t(46794),n=t(99165),a=t(57854),v=t(37141),r=t(37712),Z=O.Z.Text,E=O.Z.Title,x=(0,n.Z)({scriptUrl:"//at.alicdn.com/t/font_2756813_9ml228rpprq.js"}),M=v.ZP.RunOnLocal,i="";M||(i="/web/index.html"),h.default=function(){var y=o.useState("#737373"),I=(0,D.Z)(y,2),A=I[0],p=I[1],T=o.useState("#737373"),L=(0,D.Z)(T,2),g=L[0],C=L[1];return(0,r.jsxs)(e.ZP,{children:[(0,r.jsx)(E,{align:"middle",children:"Asoul\u4E8C\u521B\u5207\u7247\u7684\u6709\u529B\u52A9\u624B\uFF0C\u514D\u8D39\u4E14\u5F00\u6E90"}),(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(u.Z,{xs:8,md:16}),(0,r.jsx)(u.Z,{children:(0,r.jsx)(E,{level:3,type:"secondary",children:"--\u628A\u5B57\u523B\u5728\u77F3\u5934\u4E0A"})})]}),(0,r.jsxs)(l.Z,{style:{height:"300px",marginTop:"40px"},gutter:[16,32],children:[(0,r.jsx)(u.Z,{xs:24,md:12,align:"middle",children:(0,r.jsxs)(c.Z,{onMouseEnter:function(m){p("#D9D9D9")},onMouseLeave:function(m){p("#737373")},href:i+"#/./list",style:{borderRadius:"20px",width:"300px",height:"300px",backgroundColor:"#1F1F1F"},children:[(0,r.jsx)(l.Z,{style:{marginTop:"50px"},children:(0,r.jsx)(u.Z,{span:24,align:"middle",children:(0,r.jsx)(x,{type:"icon-table",style:{fontSize:"200px",color:A}})})}),(0,r.jsx)(l.Z,{children:(0,r.jsx)(u.Z,{align:"middle",span:24,children:"\u8FDB\u5165\u89C6\u9891\u5E93"})})]})}),(0,r.jsx)(u.Z,{xs:24,md:12,align:"middle",children:(0,r.jsxs)(c.Z,{onMouseEnter:function(m){C("#D9D9D9")},onMouseLeave:function(m){C("#737373")},href:i+"#/./subtitle",style:{borderRadius:"20px",width:"300px",height:"300px",backgroundColor:"#1F1F1F"},children:[(0,r.jsx)(l.Z,{style:{marginTop:"50px"},children:(0,r.jsx)(u.Z,{span:24,align:"middle",children:(0,r.jsx)(a.Z,{style:{fontSize:"200px",color:g}})})}),(0,r.jsx)(l.Z,{children:(0,r.jsx)(u.Z,{align:"middle",span:24,children:"\u8FDB\u5165\u5B57\u5E55\u5E93"})})]})})]})]})}}}]);
