import{d as t,l as e,c as n,K as a,o as s,b as o,e as r,f as l}from"./vendor.b3a64a56.js";import{u as p}from"./index.266cebd3.js";import{_ as c,m as i}from"./SourceButton.vue_vue&type=script&setup=true&lang.54cf0da5.js";const u={class:"\n\t\t\tprose prose-discord\n\t\t\tdark:prose-light\n\t\t\tmx-auto\n\t\t\tpy-16\n\t\t\tpx-4\n\t\t\tbreak-words-legacy\n\t\t\tsm:px-8\n\t\t\tlg:py-8\n\t\t\tw-full\n\t\t\tmax-w-4xl\n\t\t\tlg:max-w-full\n\t\t"};var m=t({setup(t){const m=e(),d=p(),f=n((()=>d.state.docs)),v=n((()=>d.state.file)),y=n((()=>{var t;const e=null==(t=f.value)?void 0:t.custom[m.params.category].files[m.params.file];if(!e)return;let n;return d.commit({type:"setFile",file:e}),n="md"===e.type?e.content:`# ${e.name}\n\`\`\`${e.type}\n${e.content}\n\`\`\``,i(n)}));return a((()=>{const t=document.getElementById("container");t&&t.scrollTop>200&&t.scrollTo({top:0,behavior:"smooth"})})),(t,e)=>{var n;return s(),o("div",u,[r(c,{class:"float-right mt-2",path:null==(n=l(v))?void 0:n.path},null,8,["path"]),r("div",{innerHTML:l(y)},null,8,["innerHTML"])])}}});export{m as default};
