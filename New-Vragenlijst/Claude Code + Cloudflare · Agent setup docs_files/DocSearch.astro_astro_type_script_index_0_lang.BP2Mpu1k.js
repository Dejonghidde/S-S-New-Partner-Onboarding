import{_ as c}from"./preload-helper.CVfkMyKi.js";import{c as i,a as d,b as l,A as h}from"./algolia.Cw0BSFPN.js";const m=window.location.pathname.startsWith("/style-guide/"),u={appId:h,apiKey:l,indexName:m?i:d,insights:!0,transformItems(n){return n.map(e=>{const{pathname:t,hash:s}=new URL(e.url),o=new URL(t+s,window.location.origin);return{...e,url:o.toString()}})},keyboardShortcuts:{"Ctrl/Cmd+K":!0,"/":!1}};class E extends HTMLElement{constructor(){super(),window.addEventListener("DOMContentLoaded",async()=>{const{default:e}=await c(async()=>{const{default:a}=await import("./index.mZKjvrN9.js");return{default:a}},[]),t={...u,container:"sl-doc-search"};try{const a=JSON.parse(this.dataset.translations||"{}");Object.assign(t,a)}catch{}e(t);const s=t.keyboardShortcuts??{},o=s?.["/"]!==!1,r=s?.["Ctrl/Cmd+K"]!==!1;if(o&&!r){const a=document.createElement("style");a.innerHTML=`
						.DocSearch-Button-Keys::before {
							content: '';
							width: 1em;
							height: 1em;
							-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm3 15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10Z'%3E%3C/path%3E%3Cpath d='M15.293 6.707a1 1 0 1 1 1.414 1.414l-8.485 8.486a1 1 0 0 1-1.414-1.415l8.485-8.485Z'%3E%3C/path%3E%3C/svg%3E");
							mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm3 15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10Z'%3E%3C/path%3E%3Cpath d='M15.293 6.707a1 1 0 1 1 1.414 1.414l-8.485 8.486a1 1 0 0 1-1.414-1.415l8.485-8.485Z'%3E%3C/path%3E%3C/svg%3E");
							-webkit-mask-size: 100%;
							mask-size: 100%;
							background-color: currentColor;
						}
					`,document.head.appendChild(a)}})}}customElements.define("sl-doc-search",E);
