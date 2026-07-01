import{t as h}from"./tippy.esm.CnBRltuW.js";const m=`
.sheet-dialog {
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
	margin: 0;
	padding: 0;
	border: none;
	background: transparent;
}

.sheet-dialog[open] .sheet-content {
	animation: slide-in-from-right 0.5s ease-in-out forwards;
}

.sheet-dialog.closing .sheet-content {
	animation: slide-out-to-right 0.3s ease-in-out forwards;
}

.sheet-content {
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	width: 75%;
	max-width: 24rem;
	background: var(--sl-color-bg);
	padding: 1.5rem;
	overflow-y: auto;
	border-left: 1px solid var(--sl-color-gray-5);
	box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
}

@keyframes slide-in-from-right {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes slide-out-to-right {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
	}
}

.sheet-close {
	position: sticky;
	top: 0;
	float: right;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	border-radius: 0.125rem;
	opacity: 0.7;
	background: var(--sl-color-bg);
	z-index: 10;
	transition: opacity 0.2s;
	border: none;
	cursor: pointer;
	color: inherit;
}

.sheet-close:hover {
	opacity: 1;
}

.sheet-close svg {
	width: 1rem;
	height: 1rem;
}
`;class u extends HTMLElement{dialog=null;contentContainer=null;connectedCallback(){this.innerHTML=`
			<style>${m}</style>
			<dialog class="sheet-dialog">
				<div class="sheet-content">
					<button type="button" class="sheet-close" aria-label="Close">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
					<div class="sheet-content-inner"></div>
				</div>
			</dialog>
		`,this.dialog=this.querySelector("dialog"),this.contentContainer=this.querySelector(".sheet-content-inner"),this.setupEventListeners()}disconnectedCallback(){this.dialog=null,this.contentContainer=null}setupEventListeners(){this.dialog?.addEventListener("click",e=>{e.target===this.dialog&&this.close()}),this.dialog?.addEventListener("close",()=>{this.handleClose()}),this.querySelector(".sheet-close")?.addEventListener("click",()=>{this.close()})}setContent(e){this.contentContainer&&(this.contentContainer.innerHTML=e)}open(){this.dialog&&(this.dialog.showModal(),document.body.style.overflow="hidden")}close(){this.dialog&&(this.dialog.classList.add("closing"),setTimeout(()=>{this.dialog?.close(),this.dialog?.classList.remove("closing")},300))}handleClose(){document.body.style.overflow="",this.dispatchEvent(new CustomEvent("sheet-close")),this.remove()}}customElements.define("cfdocs-sheet",u);const g={},c=`
.sheet-title {
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 1rem;
}

.explanation-content {
	font-size: 0.875rem;
	color: var(--sl-color-gray-2);
	padding: 1rem;
	background: var(--sl-color-gray-6);
	border-radius: 0.25rem;
	overflow: auto;
	width: 100%;
}

.loading-skeleton {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.skeleton-line {
	height: 1rem;
	background: var(--sl-color-gray-5);
	border-radius: 0.25rem;
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-line.w-5-6 { width: 83.333%; }
.skeleton-line.w-4-6 { width: 66.667%; }
.skeleton-line.w-3-4 { width: 75%; }
.skeleton-line.w-2-3 { width: 66.667%; }
.skeleton-line.w-4-5 { width: 80%; }
.skeleton-line.mt-6 { margin-top: 1.5rem; }

@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

.error-state {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	padding: 1rem;
	border-radius: 0.25rem;
	background: var(--sl-color-red-low);
	border: 1px solid var(--sl-color-red);
	font-size: 0.875rem;
	color: var(--sl-color-text);
	width: 100%;
}

.error-state svg {
	flex-shrink: 0;
	margin-top: 0.125rem;
	color: var(--sl-color-red);
}

.sheet-disclaimer {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	padding: 1rem;
	margin-top: 1rem;
	border-radius: 0.25rem;
	background: var(--sl-color-orange-low);
	border: 1px solid var(--sl-color-orange);
	font-size: 0.875rem;
	color: var(--sl-color-text);
}

.sheet-disclaimer svg {
	flex-shrink: 0;
	margin-top: 0.125rem;
	color: var(--sl-color-orange);
}
`,k="Unable to generate explanation. Please try again later.",w=`
	<style>${c}</style>
	<h2 class="sheet-title">Code Explanation</h2>
	<div class="explanation-content">
		<div class="loading-skeleton">
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-2-3 mt-6"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-4-5"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-2-3 mt-6"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-4-5"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-2-3 mt-6"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-4-5"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
		</div>
	</div>
`,f=`
	<style>${c}</style>
	<h2 class="sheet-title">Code Explanation</h2>
	<div class="error-state">
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="10"/>
			<line x1="12" y1="8" x2="12" y2="12"/>
			<line x1="12" y1="16" x2="12.01" y2="16"/>
		</svg>
		<div>
			<p>${k}</p>
		</div>
	</div>
`;function x(i){return`
		<style>${c}</style>
		<h2 class="sheet-title">Code Explanation</h2>
		<div class="explanation-content">
			${i}
		</div>
		<div class="sheet-disclaimer">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
				<line x1="12" y1="9" x2="12" y2="13"/>
				<line x1="12" y1="17" x2="12.01" y2="17"/>
			</svg>
			<div>
				<p>Explain Code is experimental and may produce incorrect answers. Always verify the output before executing.</p>
			</div>
		</div>
	`}class y extends HTMLElement{codeBlockPosition=0;abortController=null;sheet=null;connectedCallback(){this.codeBlockPosition=parseInt(this.getAttribute("code-block-position")||"0",10),this.innerHTML="<cfdocs-sheet></cfdocs-sheet>",this.sheet=this.querySelector("cfdocs-sheet"),this.sheet?.addEventListener("sheet-close",()=>{this.remove()}),this.sheet?.setContent(w),this.sheet?.open(),this.fetchExplanation()}disconnectedCallback(){this.abortController?.abort()}getApiBaseUrl(){return g?.PUBLIC_EXPLAIN_CODE_API_URL||"https://docs-ai-production.cloudflare-docs.workers.dev"}async fetchExplanation(){this.abortController=new AbortController;const e=window.location.pathname.replace(/^\/|\/$/g,""),o=`${this.getApiBaseUrl()}/explain/${e}?codeBlock=${this.codeBlockPosition}`;try{const n=await fetch(o,{signal:this.abortController.signal,headers:{Accept:"text/html"}}),s=n.headers.get("cf-docs-finish-reason");if(!n.ok||s!=="stop")throw new Error("Request failed");const p=await n.text();this.sheet?.setContent(x(p))}catch(n){if(n.name==="AbortError")return;this.sheet?.setContent(f)}}}customElements.define("cfdocs-explain-code",y);function b(i){const e=".explain",t="pre code",o=document.querySelectorAll(t);let s=i.closest(e)?.previousElementSibling;for(;s;){if(s.tagName==="PRE"){s=s.querySelector(t);break}s=s.previousElementSibling}return s?Array.from(o).indexOf(s)+1:1}function v(i){i.preventDefault();const e=b(this),t=document.createElement("cfdocs-explain-code");t.setAttribute("code-block-position",String(e)),document.body.appendChild(t)}const l=[],r=[];let a=!1;function d(){if(a)return;a=!0,document.querySelectorAll("button[data-explain-code]").forEach(t=>{t.addEventListener("click",v);const o=h(t,{content:"Explain Code",appendTo:()=>document.body});l.push(o)}),document.querySelectorAll(".expressive-code .copy > button").forEach(t=>{const o=h(t,{content:"Copy to clipboard",appendTo:()=>document.body});l.push(o);const n=()=>{o.setContent("Copied!"),o.show(),setTimeout(()=>{o.setContent("Copy to clipboard")},2500)};t.addEventListener("click",n),r.push({button:t,listener:n})})}function E(){document.querySelectorAll("button[data-explain-code]").forEach(e=>{e.removeEventListener("click",v)}),l.forEach(e=>e.destroy()),l.length=0,r.forEach(({button:e,listener:t})=>e.removeEventListener("click",t)),r.length=0,a=!1}document.addEventListener("astro:before-swap",E);document.addEventListener("astro:page-load",d);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
