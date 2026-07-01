const Y={},N=new Set,v=new WeakSet;let S=!0,W,R=!1;function Z(e){R||(R=!0,S??=!1,W??="hover",G(),J(),Q(),ee())}function G(){for(const e of["touchstart","mousedown"])document.addEventListener(e,o=>{const n=o.target.closest("a");m(n,"tap")&&g(n.href,{ignoreSlowConnection:!0})},{passive:!0})}function J(){let e;document.body.addEventListener("focusin",r=>{const l=r.target.closest("a");m(l,"hover")&&o(l.href)},{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),C(()=>{for(const r of document.getElementsByTagName("a"))v.has(r)||m(r,"hover")&&(v.add(r),r.addEventListener("mouseenter",l=>o(l.currentTarget.href),{passive:!0}),r.addEventListener("mouseleave",n,{passive:!0}))});function o(r){e&&clearTimeout(e),e=setTimeout(()=>{g(r)},80)}function n(){e&&(clearTimeout(e),e=0)}}function Q(){let e;C(()=>{for(const o of document.getElementsByTagName("a"))v.has(o)||m(o,"viewport")&&(v.add(o),e??=_(),e.observe(o))})}function _(){const e=new WeakMap;return new IntersectionObserver((o,n)=>{for(const r of o){const l=r.target,c=e.get(l);r.isIntersecting?(c&&clearTimeout(c),e.set(l,setTimeout(()=>{n.unobserve(l),e.delete(l),g(l.href)},300))):c&&(clearTimeout(c),e.delete(l))}})}function ee(){C(()=>{for(const e of document.getElementsByTagName("a"))m(e,"load")&&g(e.href)})}function g(e,o){e=e.replace(/#.*/,"");const n=o?.ignoreSlowConnection??!1;if(te(e,n))if(N.add(e),document.createElement("link").relList?.supports?.("prefetch")){const r=document.createElement("link");r.rel="prefetch",r.setAttribute("href",e),document.head.append(r)}else{const r=new Headers;for(const[l,c]of Object.entries(Y))r.set(l,c);fetch(e,{priority:"low",headers:r})}}function te(e,o){if(!navigator.onLine||!o&&j())return!1;try{const n=new URL(e,location.href);return location.origin===n.origin&&(location.pathname!==n.pathname||location.search!==n.search)&&!N.has(e)}catch{}return!1}function m(e,o){if(e?.tagName!=="A")return!1;const n=e.dataset.astroPrefetch;return n==="false"?!1:o==="tap"&&(n!=null||S)&&j()?!0:n==null&&S||n===""?o===W:n===o}function j(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function C(e){e();let o=!1;document.addEventListener("astro:page-load",()=>{if(!o){o=!0;return}e()})}function oe(e={}){const{position:o="right",smoothScroll:n=!0,threshold:r=300,svgPath:l="M18 15l-6-6-6 6",svgStrokeWidth:c="2",borderRadius:I="15",showTooltip:b=!1,showProgressRing:H=!1,progressRingColor:P="yellow",showOnHomepage:V=!1}=e,B=((t,u)=>{if(typeof t=="string")return t;if(typeof t!="object"||t===null)return"Scroll to top";const i=u&&typeof u=="string"?u.toLowerCase().trim():"";if(!i){const d=t.en;return typeof d=="string"?d:"Scroll to top"}let a=t[i];if(typeof a=="string")return a;if(i.includes("-")){const d=i.split("-")[0];if(a=t[d],typeof a=="string")return a}return a=t.en,typeof a=="string"?a:"Scroll to top"})(e.tooltipText,document.documentElement.lang);let p=null;const U=()=>document.querySelector(".hero")||document.querySelector(".sl-hero")||document.querySelector('[data-page="index"]')||document.querySelector(".landing-page")||document.querySelector(".homepage")||document.querySelector("[data-starlight-homepage]")||document.querySelector(".site-hero")||document.body.classList.contains("homepage")||document.body.classList.contains("homepage")||document.body.classList.contains("landing")||document.querySelector("main.sl-main")&&document.querySelector("main.sl-main .hero, main.sl-main .sl-hero"),X=()=>{if(p&&p(),U()&&!V)return;const t=document.createElement("button");t.id="scroll-to-top-button",t.ariaLabel=B,t.setAttribute("aria-describedby",b?"scroll-to-top-tooltip":""),t.setAttribute("role","button"),t.setAttribute("tabindex","0");let u=!1;t.innerHTML=`
      ${H?`
      <svg class="scroll-progress-ring" 
           width="47"   
           height="47" 
           viewBox="0 0 47 47"
           style="position: absolute; top: 0; left: 0;">
        <!-- Background circle -->
        <circle cx="23.5" cy="23.5" r="22" 
                fill="none" 
                stroke="${P}" 
                stroke-width="3" 
                opacity="0.2" />
        <!-- Progress circle -->
        <circle cx="23.5" cy="23.5" r="22" 
                fill="none" 
                stroke="${P}" 
                stroke-width="3" 
                stroke-linecap="round"
                class="scroll-progress-circle"
                style="transform: rotate(-90deg); transform-origin: center;" />
      </svg>
      `:""}
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="35" 
           height="35" 
           viewBox="0 0 24 24"            
           fill="none" 
           stroke="currentColor" 
           stroke-width="${c}" 
           stroke-linecap="round" 
           stroke-linejoin="round"
           style="position: relative; z-index: 1;">
        <path d="${l}"/>
      </svg>
    `;const i=document.createElement("div");i.id="scroll-to-top-tooltip",i.textContent=B;const a=document.createElement("div");a.style.cssText=`
    position: absolute;
    top: 100%; /* Position below the tooltip */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--sl-color-gray-7);
  `;const d=document.createElement("style");d.id="scroll-to-top-styles",d.textContent=`
    .scroll-to-top-button {
      position: fixed;
      bottom: 40px;
      width: 47px;
      height: 47px;
      ${o==="left"?"left: 40px;":o==="right"?"right: 35px;":"left: 50%;"}
      border-radius: ${I}%;     
      background-color: var(--sl-color-accent);       
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;      
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transform: ${o==="center"?"translateX(-50%) scale(0)":"scale(0)"};
      transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease, transform 0.3s ease;      
      z-index: 100;            
      border: 1px solid var(--sl-color-accent);
      transform-origin: center;
      -webkit-tap-highlight-color: transparent; /* Disable mobile tap highlight */
      touch-action: manipulation; /* Prevent double-tap zoom */
      box-shadow: 0 0 0 1px rgba(0,0,0,0.04),0 4px 8px 0 rgba(0,0,0,0.2);
    }
      .scroll-to-top-button:active {
        background-color: var(--sl-color-accent-dark); 
        color: var(--sl-text-white);        
        transition: background-color 0.1s ease, transform 0.1s ease; 
     }
      .scroll-to-top-button.visible {
        opacity: 1;
        visibility: visible;
        transform: ${o==="center"?"translateX(-50%) scale(1)":"scale(1)"};        
      }

      .scroll-to-top-button:hover {
        background-color: var(--sl-color-accent-low); 
        box-shadow: 0 0 0 1px rgba(0,0,0,0.04),0 4px 8px 0 rgba(0,0,0,0.2);
        color: var(--sl-color-accent);
        border-color: var(--sl-color-accent);     
      }
      
      .scroll-to-top-button.keyboard-focus {
        outline: 2px solid var(--sl-color-text);
        outline-offset: 2px;
      }

      .scroll-to-top-btn-tooltip {
        position: absolute;
        ${o==="left"?"left: -25px;":"right: -22px;"}
        top: -47px;
        background-color: var(--sl-color-gray-7);
        color: var(--sl-color-text);
        padding: 5px 10px;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.3s;
        pointer-events: none;
     }
      .scroll-to-top-btn-tooltip.visible {
        opacity: 1;
        visibility: visible;        
      }

      /* Progress ring styles */
      .scroll-progress-ring {
        pointer-events: none;
      }
      
      .scroll-progress-circle {
        stroke-dasharray: 138.23; /* 2 * π * r = 2 * π * 22 ≈ 138.23 */
        stroke-dashoffset: 138.23;
        transition: stroke-dashoffset 0.1s ease;
      }
    `,document.head.appendChild(d),t.classList.add("scroll-to-top-button"),document.body.appendChild(t),b&&(i.classList.add("scroll-to-top-btn-tooltip"),i.appendChild(a),t.appendChild(i));const w=()=>{i.classList.remove("visible")},M=()=>{b&&i.classList.add("visible")};t.addEventListener("mouseenter",()=>{M()}),t.addEventListener("mouseleave",()=>{w()});const L=()=>{w(),window.scrollTo({top:0,behavior:n?"smooth":"auto"}),t.classList.remove("active")};document.addEventListener("keydown",s=>{s.key==="Tab"&&(u=!0)}),t.addEventListener("mousedown",()=>{u=!1}),t.addEventListener("keydown",s=>{s.key==="Enter"&&(L(),t.classList.remove("keyboard-focus"))}),t.addEventListener("focus",()=>{u&&(M(),t.classList.add("keyboard-focus"))}),t.addEventListener("blur",()=>{w(),t.classList.remove("keyboard-focus")}),t.addEventListener("touchstart",s=>{s.preventDefault(),t.classList.add("active")}),t.addEventListener("touchend",s=>{s.preventDefault(),L(),t.classList.remove("active")}),t.addEventListener("click",s=>{s.preventDefault(),L()});function F(s,k){let f;return function(){const T=arguments,E=this;f||(s.apply(E,T),f=!0,setTimeout(()=>f=!1,k))}}const q=()=>{const s=window.scrollY,k=window.innerHeight,f=document.documentElement.scrollHeight,T=s/(f-k);if(H){const D=t.querySelector(".scroll-progress-circle");if(D){let h=T*100;h>=99.5&&(h=100),h<0&&(h=0);const A=138.23,K=A-h/100*A;D.style.strokeDashoffset=K.toString()}}const E=r>0?r:300;s>E?t.classList.add("visible"):t.classList.remove("visible")},O=F(q,16);window.addEventListener("scroll",O),q();const $=()=>{document.documentElement.classList.contains("theme-dark")?(i.style.backgroundColor="var(--sl-color-gray-7)",i.style.color="var(--sl-color-text)",a.style.borderTopColor="var(--sl-color-gray-7)"):(i.style.backgroundColor="black",i.style.color="white",a.style.borderTopColor="black")};$();const z=new MutationObserver($);z.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});function x(){Math.round(window.outerWidth/window.innerWidth*100)/100>3?t.style.display="none":t.style.display="flex"}return window.addEventListener("resize",x),x(),p=()=>{window.removeEventListener("scroll",O),window.removeEventListener("resize",x),z.disconnect(),t&&t.parentNode&&t.parentNode.removeChild(t);const s=document.getElementById("scroll-to-top-styles");s&&s.remove()},p},y=()=>{setTimeout(X,10)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y):y(),document.addEventListener("astro:page-load",y),document.addEventListener("astro:before-preparation",()=>{p&&p()})}oe({position:"right",tooltipText:"Back to top",smoothScroll:!0,threshold:300,svgPath:"M12 6L6 12M12 6L18 12M12 12L6 18M12 12L18 18",svgStrokeWidth:"2",borderRadius:"15",showTooltip:!0,showProgressRing:!0,progressRingColor:"white",showOnHomepage:!1});Z();export{oe as default};
