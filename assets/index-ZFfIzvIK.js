(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const qe={journal:{title:"",issn_print:"",issn_online:"",publisher:"",abbreviation:"",logo_url:"",website_url:"",doi_prefix:"",base_url:""},article:{title:"",subtitle:"",doi:"",type:"research-article",language:"en",volume:"",issue:"",fpage:"",lpage:"",elocation_id:"",year:"",issue_months:"",article_id:"",correspondence_author:0},authors:[],affiliations:[],dates:{received:"",revised:"",accepted:"",published:""},abstract:{content:""},keywords:[],copyright:{holder:"",year:new Date().getFullYear().toString(),license:"CC-BY-NC-SA-4.0"},sections:[],references:[]};class ot{constructor(){this.listeners={},this.data=JSON.parse(JSON.stringify(qe))}reset(){this.data=JSON.parse(JSON.stringify(qe)),this.data.copyright.year=new Date().getFullYear().toString(),this.emit("reset"),this.emit("change")}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}emit(e){this.listeners[e]&&this.listeners[e].forEach(t=>{try{t()}catch(r){console.error(`Error in listener for event ${e}:`,r)}})}get(e){if(!e)return this.data;const t=e.split(".");let r=this.data;for(const s of t){if(r==null)return;r=r[s]}return r}set(e,t){if(!e)return;const r=e.split(".");let s=this.data;for(let i=0;i<r.length-1;i++){const l=r[i];(s[l]===void 0||s[l]===null)&&(s[l]={}),s=s[l]}s[r[r.length-1]]=t,this.emit("change")}collectAll(){return JSON.parse(JSON.stringify(this.data))}toJSON(){return JSON.stringify(this.data,null,2)}fromJSON(e){try{const t=typeof e=="string"?JSON.parse(e):e;this.data=this.deepMerge(JSON.parse(JSON.stringify(qe)),t),this.emit("load"),this.emit("change")}catch(t){throw console.error("Failed to import JSON data:",t),t}}deepMerge(e,t){if(!t)return e;for(const r of Object.keys(t))t[r]instanceof Object&&!Array.isArray(t[r])?(e[r]||(e[r]={}),this.deepMerge(e[r],t[r])):e[r]=t[r];return e}}const n=new ot,Ke=[{path:"journal.title",label:"Journal Title",required:!0,placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"journal.abbreviation",label:"Journal Abbreviation",placeholder:"e.g., JPCHR"},{path:"journal.issn_print",label:"ISSN (Print)",placeholder:"XXXX-XXXX"},{path:"journal.issn_online",label:"ISSN (Online)",placeholder:"XXXX-XXXX"},{path:"journal.publisher",label:"Publisher Name",placeholder:"e.g., Anviksha Publisher"},{path:"journal.logo_url",label:"Journal Logo URL",placeholder:"https://example.com/logo.png"},{path:"journal.website_url",label:"Journal Website URL",placeholder:"https://example.com"},{path:"journal.base_url",label:"Base URL (for Canonical Links)",placeholder:"https://jpchr.com/jpchr"},{path:"journal.doi_prefix",label:"DOI Prefix",placeholder:"e.g., 10.63486"},{path:"copyright.holder",label:"Copyright Holder",placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"copyright.year",label:"Copyright Year",placeholder:new Date().getFullYear().toString()}],nt=[{value:"CC-BY-4.0",label:"Creative Commons Attribution 4.0 International (CC BY 4.0)"},{value:"CC-BY-NC-4.0",label:"Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"},{value:"CC-BY-NC-SA-4.0",label:"Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)"},{value:"CC-BY-NC-ND-4.0",label:"Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)"},{value:"CC-BY-SA-4.0",label:"Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)"},{value:"CC0-1.0",label:"Creative Commons CC0 1.0 Universal Public Domain Dedication"},{value:"other",label:"Other / Custom License"}];let Q=null;function lt(a){Q=a,ct(),n.on("load",()=>Ee()),n.on("reset",()=>Ee())}function ct(){if(!Q)return;Q.innerHTML=`
    <div class="card">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 class="card-title" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            Journal Profile
            <span class="badge badge-info" style="background:#022744; color:white; font-size:0.75rem; padding:0.2rem 0.5rem; border-radius:12px;">Reusable</span>
          </h2>
          <p class="card-description" style="margin:0;">
            Fill in your journal details once. Download the profile and upload it whenever you start a new galley.
          </p>
        </div>
        <div class="btn-row" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" id="btn-download-profile">
            <span class="icon">⬇️</span> Download Profile
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-upload-profile">
            <span class="icon">⬆️</span> Upload Profile
          </button>
          <input type="file" id="file-upload-profile" accept=".json" style="display:none;" />
          <button class="btn btn-primary btn-sm" id="btn-apply-profile" style="background:#022744;">
            Apply to Current Project
          </button>
        </div>
      </div>

      <div class="card-body" style="margin-top:1.5rem;">
        <form id="journal-profile-form">
          <div class="form-row-2" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1rem; margin-bottom:1rem;">
            ${Ke.map(r=>`
              <div class="form-group">
                <label class="form-label" style="display:block; margin-bottom:0.4rem; font-weight:600;">
                  ${r.label} ${r.required?'<span class="required" style="color:red;">*</span>':""}
                </label>
                <input type="text" class="form-control profile-input" 
                       data-path="${r.path}" 
                       placeholder="${r.placeholder}" />
              </div>
            `).join("")}

            <div class="form-group">
              <label class="form-label" style="display:block; margin-bottom:0.4rem; font-weight:600;">
                Copyright License
              </label>
              <select class="form-select profile-input" data-path="copyright.license">
                ${nt.map(r=>`
                  <option value="${r.value}">${r.label}</option>
                `).join("")}
              </select>
            </div>
          </div>
        </form>
      </div>

    </div>
  `,Q.querySelectorAll(".profile-input").forEach(r=>{r.addEventListener("input",()=>{const s=r.dataset.path;n.set(s,r.value)})}),Q.querySelector("#btn-download-profile").addEventListener("click",dt);const e=Q.querySelector("#btn-upload-profile"),t=Q.querySelector("#file-upload-profile");e.addEventListener("click",()=>t.click()),t.addEventListener("change",ut),Q.querySelector("#btn-apply-profile").addEventListener("click",pt),Ee()}function Ee(){if(!Q)return;Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path,r=n.get(t);e.value=r!==void 0?r:""})}function dt(){const a={};Ke.forEach(r=>{a[r.path]=n.get(r.path)||""}),a["copyright.license"]=n.get("copyright.license")||"CC-BY-NC-SA-4.0";const e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(a,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","journal-profile.json"),document.body.appendChild(t),t.click(),t.remove(),L("Journal profile downloaded")}function ut(a){const e=a.target.files[0];if(!e)return;const t=new FileReader;t.onload=function(r){try{const s=JSON.parse(r.target.result);for(const[i,l]of Object.entries(s))n.set(i,l);Ee(),L("Journal profile uploaded successfully")}catch(s){L("Failed to parse profile JSON","error"),console.error(s)}},t.readAsText(e),a.target.value=""}function pt(){Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path;n.set(t,e.value)}),n.emit("load"),L("Profile applied to project successfully")}function Be(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function re(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function mt(a){if(!a)return"";let e=re(a);return e=e.replace(/&lt;(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*&quot;[^&]*?&quot;)*)\s*(\/?)\s*&gt;/g,(t,r,s,i,l)=>{let d="";return i&&(d=i.replace(/([\w:.-]+)\s*=\s*&quot;([^&]*?)&quot;/g,(c,m,f)=>` <span style="color:#4ec9b0">${m}</span>=<span style="color:#ce9178">&quot;${f}&quot;</span>`)),`<span style="color:#569cd6">&lt;${r}${s}</span>${d}<span style="color:#569cd6">${l}&gt;</span>`}),e}function Me(){const a=new Uint8Array(4);return crypto.getRandomValues(a),Array.from(a,e=>e.toString(16).padStart(2,"0")).join("")}function Ze(a){if(!a)return"";let e=a;const t=e.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);t&&(e=t[1]),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->/gi,""),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?endif-->/gi,"");const s=new DOMParser().parseFromString(e,"text/html"),i=new Set(["p","b","strong","i","em","u","sup","sub","h1","h2","h3","h4","ul","ol","li","br","table","tr","td","th","tbody","thead"]),l=new Set(["p","h1","h2","h3","h4","ul","ol","li","table","tbody","thead","tr","td","th"]),d=w=>{if(w.nodeType===3)return w.textContent=w.textContent.replace(/\u00A0/g," "),w;if(w.nodeType!==1)return null;const M=w.tagName.toLowerCase();let v=M;if(M==="span"||M==="font"){const R=(w.getAttribute("style")||"").toLowerCase();R.includes("vertical-align: super")||R.includes("vertical-align:super")||R.includes("mso-text-raise")?v="sup":(R.includes("vertical-align: sub")||R.includes("vertical-align:sub"))&&(v="sub")}v==="strong"&&(v="b"),v==="em"&&(v="i");let q;if(i.has(v)){if(q=s.createElement(v),v==="td"||v==="th"){const R=w.getAttribute("colspan"),T=w.getAttribute("rowspan");R&&q.setAttribute("colspan",R),T&&q.setAttribute("rowspan",T)}}else q=s.createDocumentFragment();const F=Array.from(w.childNodes);for(const R of F){const T=d(R);T&&(T.nodeType===1&&l.has(T.tagName.toLowerCase())&&l.has(v),q.appendChild(T))}return q.nodeType===1&&v!=="br"&&!["td","th","tr","table","tbody","thead"].includes(v)&&(!q.hasChildNodes()||q.textContent.trim()==="")?null:q},c=s.createDocumentFragment(),m=Array.from(s.body.childNodes);for(const w of m){const M=d(w);M&&c.appendChild(M)}const f=s.createElement("div");f.appendChild(c);let o=f.innerHTML;return o=o.replace(/<p[^>]*>\s*<p[^>]*>/gi,"<p>"),o=o.replace(/<\/p>\s*<\/p>/gi,"</p>"),o.trim()}function ft(a){if(!a)return"";const e={"&nbsp;":" ","&#160;":" ","&ndash;":"–","&#8211;":"–","&mdash;":"—","&#8212;":"—","&lsquo;":"‘","&#8216;":"‘","&rsquo;":"’","&#8217;":"’","&ldquo;":"“","&#8220;":"“","&rdquo;":"”","&#8221;":"”","&bull;":"•","&#8226;":"•","&hellip;":"…","&#8230;":"…","&trade;":"™","&#8482;":"™","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&deg;":"°","&#176;":"°","&micro;":"µ","&#181;":"µ","&times;":"×","&#215;":"×","&divide;":"÷","&#247;":"÷","&plusmn;":"±","&#177;":"±","&frac12;":"½","&frac14;":"¼","&frac34;":"¾","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&mu;":"μ","&pi;":"π","&sigma;":"σ","&le;":"≤","&ge;":"≥","&ne;":"≠","&infin;":"∞","&rarr;":"→","&larr;":"←","&uarr;":"↑","&darr;":"↓","&para;":"¶","&sect;":"§","&dagger;":"†","&Dagger;":"‡"};let t=a;for(const[r,s]of Object.entries(e)){const i=new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");t=t.replace(i,s)}return t}const bt=[{value:"research-article",label:"Research Article"},{value:"review-article",label:"Review Article"},{value:"case-report",label:"Case Report"},{value:"case-series",label:"Case Series"},{value:"systematic-review",label:"Systematic Review"},{value:"meta-analysis",label:"Meta-Analysis"},{value:"editorial",label:"Editorial"},{value:"letter",label:"Letter to the Editor"},{value:"commentary",label:"Commentary"},{value:"brief-report",label:"Brief Report"},{value:"short-communication",label:"Short Communication"},{value:"clinical-trial",label:"Clinical Trial"},{value:"pilot-study",label:"Pilot Study"},{value:"observational-study",label:"Observational Study"},{value:"cross-sectional",label:"Cross-Sectional Study"},{value:"cohort-study",label:"Cohort Study"},{value:"narrative-review",label:"Narrative Review"},{value:"rapid-communication",label:"Rapid Communication"},{value:"erratum",label:"Erratum"},{value:"retraction",label:"Retraction"}],gt=a=>{const e=bt.find(t=>t.value===a||t.label===a);return e?e.label:a||"Research Article"},ht=[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"pt",label:"Portuguese"},{value:"zh",label:"Chinese"},{value:"ja",label:"Japanese"},{value:"ko",label:"Korean"},{value:"ar",label:"Arabic"},{value:"hi",label:"Hindi"}],vt=[8,9,10,11,12,14,16,18,20,22,24];let U=null;function yt(a){U=a,ie(),n.on("load",()=>ie()),n.on("reset",()=>ie())}function ie(){if(!U)return;const a=n.get("authors")||[],e=n.get("affiliations")||[],t=n.get("keywords")||[],r=n.get("article.correspondence_author")||0;U.innerHTML=`
    <!-- Card 1: Journal Info -->
    <div class="card">
      <div class="card-header"><h2 class="card-title">Journal Information</h2></div>
      <div class="card-body">
        <div class="form-row" style="display:grid; grid-template-columns: 2fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">Journal Title <span class="required" style="color:red;">*</span></label>
            <input type="text" class="form-control store-bind" data-path="journal.title" value="${C(n.get("journal.title"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Abbreviation</label>
            <input type="text" class="form-control store-bind" data-path="journal.abbreviation" value="${C(n.get("journal.abbreviation"))}" />
          </div>
        </div>
        <div class="form-row-3" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">ISSN (Print)</label>
            <input type="text" class="form-control store-bind" data-path="journal.issn_print" value="${C(n.get("journal.issn_print"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">ISSN (Online)</label>
            <input type="text" class="form-control store-bind" data-path="journal.issn_online" value="${C(n.get("journal.issn_online"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Publisher</label>
            <input type="text" class="form-control store-bind" data-path="journal.publisher" value="${C(n.get("journal.publisher"))}" />
          </div>
        </div>
        <div class="form-row-2" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:1rem;">
          <div class="form-group">
            <label class="form-label">Journal Logo URL</label>
            <input type="text" class="form-control store-bind" data-path="journal.logo_url" value="${C(n.get("journal.logo_url"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Journal Website URL</label>
            <input type="text" class="form-control store-bind" data-path="journal.website_url" value="${C(n.get("journal.website_url"))}" />
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2: Article Info -->
    <div class="card">
      <div class="card-header"><h2 class="card-title">Article Information</h2></div>
      <div class="card-body">
        <div class="form-group" style="margin-bottom:1rem;">
          <label class="form-label">Article Title <span class="required" style="color:red;">*</span></label>
          <input type="text" class="form-control store-bind" data-path="article.title" value="${C(n.get("article.title"))}" />
        </div>
        <div class="form-group" style="margin-bottom:1rem;">
          <label class="form-label">Subtitle (Optional)</label>
          <input type="text" class="form-control store-bind" data-path="article.subtitle" value="${C(n.get("article.subtitle"))}" />
        </div>
        <div class="form-row" style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">DOI <span class="required" style="color:red;">*</span></label>
            <input type="text" class="form-control store-bind" data-path="article.doi" placeholder="e.g., 10.63486/jpchr.2026.01" value="${C(n.get("article.doi"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Article Type</label>
            <input type="text" class="form-control store-bind" data-path="article.type" value="${C(gt(n.get("article.type")))}" placeholder="e.g., Research Article" />
          </div>

          <div class="form-group">
            <label class="form-label">Language</label>
            <select class="form-select store-bind" data-path="article.language">
              ${ht.map(d=>`<option value="${d.value}" ${n.get("article.language")===d.value?"selected":""}>${d.label}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="form-row" style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">PDF Galley URL</label>
            <input type="text" class="form-control store-bind" data-path="article.pdf_url" placeholder="https://..." value="${C(n.get("article.pdf_url"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">HTML Galley URL</label>
            <input type="text" class="form-control store-bind" data-path="article.html_url" placeholder="https://..." value="${C(n.get("article.html_url"))}" />
          </div>
        </div>
        <div class="form-row-5" style="display:grid; grid-template-columns: repeat(5, 1fr); gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">Volume</label>
            <input type="text" class="form-control store-bind" data-path="article.volume" value="${C(n.get("article.volume"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Issue</label>
            <input type="text" class="form-control store-bind" data-path="article.issue" value="${C(n.get("article.issue"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">First Page</label>
            <input type="text" class="form-control store-bind" data-path="article.fpage" value="${C(n.get("article.fpage"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Last Page</label>
            <input type="text" class="form-control store-bind" data-path="article.lpage" value="${C(n.get("article.lpage"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">e-Location ID</label>
            <input type="text" class="form-control store-bind" data-path="article.elocation_id" value="${C(n.get("article.elocation_id"))}" />
          </div>
        </div>
        <div class="form-row-3" style="display:grid; grid-template-columns: 1fr 2fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Year</label>
            <input type="text" class="form-control store-bind" data-path="article.year" value="${C(n.get("article.year"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Issue Months</label>
            <input type="text" class="form-control store-bind" data-path="article.issue_months" placeholder="e.g., Jan-Jun" value="${C(n.get("article.issue_months"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Article ID <span class="required" style="color:red;">*</span></label>
            <input type="text" class="form-control store-bind" data-path="article.article_id" placeholder="e.g., e25102701" value="${C(n.get("article.article_id"))}" />
          </div>
        </div>
      </div>
    </div>

    <!-- Card 3: Authors -->
    <div class="card">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <h2 class="card-title">Authors</h2>
        <button class="btn btn-secondary btn-sm" id="btn-add-author" style="border: 1px solid var(--border-color);">+ Add Author</button>
      </div>
      <div class="card-body">
        <div id="authors-list">
          ${a.map((d,c)=>xt(d,c)).join("")}
        </div>
        <div class="form-group" style="margin-top:1.5rem; max-width:300px;">
          <label class="form-label">Corresponding Author</label>
          <select class="form-select" id="select-corr-author">
            <option value="0">None</option>
            ${a.map((d,c)=>`<option value="${c+1}" ${r===c+1?"selected":""}>Author ${c+1}: ${d.given||""} ${d.surname||""}</option>`).join("")}
          </select>
        </div>
      </div>
    </div>

    <!-- Card 4: Affiliations -->
    <div class="card">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <h2 class="card-title">Affiliations</h2>
        <button class="btn btn-secondary btn-sm" id="btn-add-affiliation" style="border: 1px solid var(--border-color);">+ Add Affiliation</button>
      </div>
      <div class="card-body">
        <div id="affiliations-list">
          ${e.map((d,c)=>$t(d,c)).join("")}
        </div>
      </div>
    </div>

    <!-- Card 5: Dates -->
    <div class="card">
      <div class="card-header"><h2 class="card-title">Dates</h2></div>
      <div class="card-body">
        <div class="form-row-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
          <div class="form-group">
            <label class="form-label">Received</label>
            <input type="date" class="form-control store-bind" data-path="dates.received" value="${C(n.get("dates.received"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Revised</label>
            <input type="date" class="form-control store-bind" data-path="dates.revised" value="${C(n.get("dates.revised"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Accepted</label>
            <input type="date" class="form-control store-bind" data-path="dates.accepted" value="${C(n.get("dates.accepted"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Published</label>
            <input type="date" class="form-control store-bind" data-path="dates.published" value="${C(n.get("dates.published"))}" />
          </div>
        </div>
      </div>
    </div>

    <!-- Card 6: Abstract (Single Editor) -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Abstract</h2>
        <p class="card-description" style="margin:0;">Provide the article abstract without section divisions.</p>
      </div>
      <div class="card-body">
        <div class="rich-editor" style="border:1px solid var(--border-color); border-radius:8px; overflow:hidden;">
          <div class="editor-toolbar" style="display:flex; flex-wrap:wrap; gap:4px; padding:0.5rem; background:var(--surface-alt); border-bottom:1px solid var(--border-color);">
            <button class="tb-btn" data-cmd="bold" title="Bold"><b>B</b></button>
            <button class="tb-btn" data-cmd="italic" title="Italic"><i>I</i></button>
            <button class="tb-btn" data-cmd="underline" title="Underline"><u>U</u></button>
            <button class="tb-btn" data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button>
            <button class="tb-btn" data-cmd="superscript" title="Superscript">X<sup>2</sup></button>
            <button class="tb-btn" data-cmd="subscript" title="Subscript">X<sub>2</sub></button>
            <span class="tb-sep" style="width:1px; background:var(--border-color); margin:0 4px;"></span>
            <button class="tb-btn" data-cmd="insertOrderedList" title="Ordered List">1.</button>
            <button class="tb-btn" data-cmd="insertUnorderedList" title="Unordered List">•</button>
            <span class="tb-sep" style="width:1px; background:var(--border-color); margin:0 4px;"></span>
            <select class="tb-fontsize" title="Font Size" style="padding:0.2rem; border-radius:4px; border:1px solid var(--border-color); background:var(--bg);">
              <option value="">Size</option>
              ${vt.map(d=>`<option value="${d}">${d}pt</option>`).join("")}
            </select>
            <button class="tb-btn" data-cmd="removeFormat" title="Remove Format">✖</button>
          </div>
          <div class="rich-content" id="abstract-editor" contenteditable="true" 
               style="min-height:150px; padding:0.75rem; outline:none; line-height:1.15;" 
               data-placeholder="Paste or write abstract here..."></div>
        </div>
      </div>
    </div>

    <!-- Card 7: Keywords -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Keywords</h2>
        <p class="card-description" style="margin:0;">Press Enter or comma to add keywords, or paste a comma-separated list.</p>
      </div>
      <div class="card-body">
        <div class="form-group" style="margin-bottom:1rem;">
          <input type="text" class="form-control" id="keyword-input" placeholder="Type keyword and press Enter..." />
        </div>
        <div class="keyword-chips" id="keyword-chips-container" style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${t.map((d,c)=>`
            <span class="badge" style="background:#022744; color:white; padding:0.4rem 0.8rem; border-radius:16px; display:inline-flex; align-items:center; gap:0.5rem; font-size:0.85rem;">
              ${C(d)}
              <span class="btn-remove-kw" data-idx="${c}" style="cursor:pointer; font-weight:bold; font-size:0.75rem;">✕</span>
            </span>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Card 8: Copyright & License -->
    <div class="card">
      <div class="card-header"><h2 class="card-title">Copyright &amp; License</h2></div>
      <div class="card-body">
        <div class="form-row-3" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
          <div class="form-group">
            <label class="form-label">Copyright Holder</label>
            <input type="text" class="form-control store-bind" data-path="copyright.holder" value="${C(n.get("copyright.holder"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Copyright Year</label>
            <input type="text" class="form-control store-bind" data-path="copyright.year" value="${C(n.get("copyright.year"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">License</label>
            <select class="form-select store-bind" data-path="copyright.license">
              <option value="CC-BY-4.0" ${n.get("copyright.license")==="CC-BY-4.0"?"selected":""}>CC BY 4.0</option>
              <option value="CC-BY-NC-4.0" ${n.get("copyright.license")==="CC-BY-NC-4.0"?"selected":""}>CC BY-NC 4.0</option>
              <option value="CC-BY-NC-SA-4.0" ${n.get("copyright.license")==="CC-BY-NC-SA-4.0"?"selected":""}>CC BY-NC-SA 4.0</option>
              <option value="CC-BY-NC-ND-4.0" ${n.get("copyright.license")==="CC-BY-NC-ND-4.0"?"selected":""}>CC BY-NC-ND 4.0</option>
              <option value="CC-BY-SA-4.0" ${n.get("copyright.license")==="CC-BY-SA-4.0"?"selected":""}>CC BY-SA 4.0</option>
              <option value="CC0-1.0" ${n.get("copyright.license")==="CC0-1.0"?"selected":""}>CC0 1.0</option>
              <option value="other" ${n.get("copyright.license")==="other"?"selected":""}>Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,U.querySelectorAll(".store-bind").forEach(d=>{d.addEventListener("input",()=>{const c=d.dataset.path;n.set(c,d.value)})}),U.querySelector("#btn-add-author").addEventListener("click",wt),St(),U.querySelector("#select-corr-author").addEventListener("change",d=>{n.set("article.correspondence_author",parseInt(d.target.value,10))}),U.querySelector("#btn-add-affiliation").addEventListener("click",Ct),Lt();const i=U.querySelector("#abstract-editor");i.innerHTML=n.get("abstract.content")||"",i.addEventListener("input",()=>{n.set("abstract.content",i.innerHTML)}),i.addEventListener("paste",d=>{var m;const c=(m=d.clipboardData)==null?void 0:m.getData("text/html");if(c){d.preventDefault();const f=Ze(c);document.execCommand("insertHTML",!1,f)}}),At();const l=U.querySelector("#keyword-input");l.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===",")&&(d.preventDefault(),Et(l.value),l.value="")}),U.querySelectorAll(".btn-remove-kw").forEach(d=>{d.addEventListener("click",()=>{const c=parseInt(d.dataset.idx,10),m=n.get("keywords")||[];m.splice(c,1),n.set("keywords",m),ie()})})}function xt(a,e){return`
    <div class="author-item" data-idx="${e}" style="border:1px solid var(--border-color); border-radius:8px; padding:1rem; margin-bottom:1rem; position:relative; background:var(--surface-alt);">
      <button class="btn-remove-author btn btn-icon" data-idx="${e}" style="position:absolute; top:0.5rem; right:0.5rem; font-size:1.1rem; color:red; background:transparent; border:none; cursor:pointer;" title="Remove Author">✕</button>
      <div style="font-weight:bold; margin-bottom:0.75rem; font-size:0.9rem; color:#022744;">Author ${e+1}</div>
      <div class="form-row-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
        <div class="form-group">
          <label class="form-label">Given Name</label>
          <input type="text" class="form-control author-input" data-field="given" data-idx="${e}" value="${C(a.given)}" />
        </div>
        <div class="form-group">
          <label class="form-label">Middle Name</label>
          <input type="text" class="form-control author-input" data-field="middle" data-idx="${e}" value="${C(a.middle)}" />
        </div>
        <div class="form-group">
          <label class="form-label">Surname</label>
          <input type="text" class="form-control author-input" data-field="surname" data-idx="${e}" value="${C(a.surname)}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-control author-input" data-field="email" data-idx="${e}" value="${C(a.email)}" />
        </div>
        <div class="form-group">
          <label class="form-label" style="display:flex; align-items:center; gap:0.25rem;">
            <img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID iD" style="width:16px; height:16px; margin-right:4px;" /> ORCID iD
          </label>
          <input type="text" class="form-control author-input author-orcid" data-field="orcid" data-idx="${e}" placeholder="e.g., 0000-0002-1825-0097" value="${C(a.orcid)}" />
        </div>
      </div>
      <div class="form-group" style="margin-top:0.75rem;">
        <label class="form-label">Affiliation Numbers (comma-separated, e.g., 1,2)</label>
        <input type="text" class="form-control author-input" data-field="affiliation_ids" data-idx="${e}" placeholder="e.g., 1" value="${C(a.affiliation_ids?a.affiliation_ids.join(","):"")}" />
      </div>
    </div>
  `}function $t(a,e){return`
    <div class="affiliation-item" data-idx="${e}" style="border:1px solid var(--border-color); border-radius:8px; padding:1rem; margin-bottom:1rem; position:relative; background:var(--surface-alt);">
      <button class="btn-remove-affiliation btn btn-icon" data-idx="${e}" style="position:absolute; top:0.5rem; right:0.5rem; font-size:1.1rem; color:red; background:transparent; border:none; cursor:pointer;" title="Remove Affiliation">✕</button>
      <div style="font-weight:bold; margin-bottom:0.75rem; font-size:0.9rem; color:#022744;">Affiliation ${e+1}</div>
      <div class="form-row-2" style="display:grid; grid-template-columns: 2fr 1fr; gap:1rem;">
        <div class="form-group">
          <label class="form-label">Affiliation Institution &amp; Address</label>
          <input type="text" class="form-control affiliation-input" data-field="text" data-idx="${e}" placeholder="e.g., Department of Pediatrics, Faculty of Medicine, University of Delhi, New Delhi, India" value="${C(a.text)}" />
        </div>
        <div class="form-group">
          <label class="form-label" style="display:flex; align-items:center; gap:0.25rem;">
            <img src="https://ror.org/img/ror-logo-small.png" alt="ROR" style="height:14px; margin-right:4px; vertical-align:middle;" /> ROR ID (Optional)
          </label>
          <input type="text" class="form-control affiliation-input" data-field="ror_id" data-idx="${e}" placeholder="e.g., https://ror.org/012345678" value="${C(a.ror_id)}" />
        </div>
      </div>
    </div>
  `}function wt(){const a=n.get("authors")||[];a.push({given:"",middle:"",surname:"",email:"",orcid:"",affiliation_ids:[]}),n.set("authors",a),ie()}function St(){U.querySelectorAll(".btn-remove-author").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=n.get("authors")||[];t.splice(e,1),n.set("authors",t),(n.get("article.correspondence_author")||0)>t.length&&n.set("article.correspondence_author",t.length?1:0),ie()})}),U.querySelectorAll(".author-input").forEach(a=>{a.addEventListener("change",e=>{const t=parseInt(a.dataset.idx,10),r=a.dataset.field,s=n.get("authors")||[];if(r==="affiliation_ids"){const i=a.value.split(",").map(l=>parseInt(l.trim(),10)).filter(Number.isFinite);s[t][r]=i}else if(r==="orcid"){let i=a.value.trim();i.startsWith("https://orcid.org/")?i=i.substring(18):i.startsWith("http://orcid.org/")&&(i=i.substring(17)),s[t][r]=i,a.value=i}else s[t][r]=a.value;n.set("authors",s)})})}function Ct(){const a=n.get("affiliations")||[];a.push({text:"",ror_id:""}),n.set("affiliations",a),ie()}function Lt(){U.querySelectorAll(".btn-remove-affiliation").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=n.get("affiliations")||[];t.splice(e,1),n.set("affiliations",t),ie()})}),U.querySelectorAll(".affiliation-input").forEach(a=>{a.addEventListener("change",()=>{const e=parseInt(a.dataset.idx,10),t=a.dataset.field,r=n.get("affiliations")||[];r[e][t]=a.value.trim(),n.set("affiliations",r)})})}function Et(a){if(!a)return;const e=a.split(",").map(r=>r.trim()).filter(Boolean),t=n.get("keywords")||[];e.forEach(r=>{t.includes(r)||t.push(r)}),n.set("keywords",t),ie()}function At(){const a=U.querySelector("#abstract-editor");U.querySelectorAll(".tb-btn[data-cmd]").forEach(t=>{t.addEventListener("mousedown",r=>{r.preventDefault();const s=t.dataset.cmd;document.execCommand(s,!1,null),n.set("abstract.content",a.innerHTML)})}),U.querySelector(".tb-fontsize").addEventListener("change",t=>{const r=t.target.value;r&&(kt(a,r),n.set("abstract.content",a.innerHTML),t.target.value="")})}function kt(a,e){const t=window.getSelection();if(!t.rangeCount||!a.contains(t.anchorNode))return;const r=Math.min(7,Math.max(1,Math.round(parseInt(e,10)/4)));document.execCommand("fontSize",!1,String(r)),a.querySelectorAll("font[size]").forEach(s=>{const i=document.createElement("span");i.style.fontSize=e+"pt",i.innerHTML=s.innerHTML,s.replaceWith(i)})}function C(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function qt(a){if(!a)return;a.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Import from OJS Native XML</h2>
        <p class="card-description">
          Upload an OJS native XML export file. Metadata, authors, affiliations, abstract, and references will be automatically extracted.
        </p>
      </div>
      <div class="card-body" style="padding:2rem; text-align:center; border:2px dashed var(--border-color); border-radius:12px; margin-top:1rem; cursor:pointer;" id="ojs-dropzone">
        <span class="icon" style="font-size:3rem; display:block; margin-bottom:1rem; color:#022744;">📤</span>
        <strong style="font-size:1.1rem; display:block; margin-bottom:0.5rem;">Click to browse or drag &amp; drop OJS XML file here</strong>
        <span style="font-size:0.85rem; color:var(--text-secondary);">Supports native XML export format (.xml)</span>
        <input type="file" id="file-ojs-xml" accept=".xml" style="display:none;" />
      </div>
    </div>
  `;const e=a.querySelector("#ojs-dropzone"),t=a.querySelector("#file-ojs-xml");e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(r=>{e.addEventListener(r,s=>s.preventDefault(),!1)}),e.addEventListener("drop",r=>{const i=r.dataTransfer.files[0];i&&i.name.endsWith(".xml")?ze(i):L("Please upload a valid XML file","error")}),t.addEventListener("change",r=>{const s=r.target.files[0];s&&ze(s)})}function ze(a){const e=new FileReader;e.onload=function(t){try{Tt(t.target.result)}catch(r){L("Failed to parse XML file: "+r.message,"error"),console.error(r)}},e.readAsText(a)}function Tt(a){const t=new DOMParser().parseFromString(a,"text/xml"),r=t.querySelector("parsererror");if(r)throw new Error(r.textContent);const s=t.querySelector("journal_title, journal title, journal-meta journal-title")?t.querySelector("journal_title, journal title, journal-meta journal-title").textContent.trim():"";s&&n.set("journal.title",s);const i=t.querySelector('issn[type="print"], issn[device="print"], issn')?t.querySelector('issn[type="print"], issn[device="print"], issn').textContent.trim():"";i&&n.set("journal.issn_print",i);const l=t.querySelector('issn[type="online"], issn[device="online"]')?t.querySelector('issn[type="online"], issn[device="online"]').textContent.trim():"";l&&n.set("journal.issn_online",l);const d=t.querySelector("publisher_name, publisher name, publisher-name")?t.querySelector("publisher_name, publisher name, publisher-name").textContent.trim():"";d&&n.set("journal.publisher",d);const c=t.querySelector('article > title, submission > title, article-title, title[locale^="en"]')?t.querySelector('article > title, submission > title, article-title, title[locale^="en"]').textContent.trim():t.querySelector("title")?t.querySelector("title").textContent.trim():"";c&&n.set("article.title",c);const m=t.querySelector('subtitle, subtitle[locale^="en"]')?t.querySelector('subtitle, subtitle[locale^="en"]').textContent.trim():"";m&&n.set("article.subtitle",m);let f="";const o=t.querySelector('id[type="doi"], doi, article-id[pub-id-type="doi"]');if(o)f=o.textContent.trim();else{const g=t.querySelector('id[type="doi_uri"]');g&&(f=g.textContent.trim().replace(/^https?:\/\/doi\.org\//i,""))}if(f){n.set("article.doi",f);const g=f.match(/^(10\.\d{4,9})/);g&&n.set("journal.doi_prefix",g[1])}const w=t.querySelector("volume")?t.querySelector("volume").textContent.trim():"";w&&n.set("article.volume",w);const M=t.querySelector("number, issue")?t.querySelector("number, issue").textContent.trim():"";M&&n.set("article.issue",M);const v=t.querySelector('issue_identification > year, issue > year, publication > year, date-in-citation[content-type="access-date"]')?t.querySelector("issue_identification > year, issue > year, publication > year").textContent.trim():new Date().getFullYear().toString();v&&n.set("article.year",v);const q=t.querySelector("pages, fpage")?t.querySelector("pages, fpage").textContent.trim():"";if(q){const g=q.split("-");n.set("article.fpage",g[0].trim()),g[1]&&n.set("article.lpage",g[1].trim())}const F=t.querySelector("article > id, submission > id")?t.querySelector("article > id, submission > id").textContent.trim():"";F&&n.set("article.article_id",F);const R=t.querySelector('date_submitted, date-received, date[date-type="received"]')?t.querySelector('date_submitted, date-received, date[date-type="received"]').getAttribute("value")||t.querySelector('date_submitted, date-received, date[date-type="received"]').textContent.trim():"";R&&n.set("dates.received",Te(R));const T=t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]')?t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').getAttribute("value")||t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').textContent.trim():"";T&&n.set("dates.accepted",Te(T));const Y=t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]')?t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').getAttribute("value")||t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').textContent.trim():"";Y&&n.set("dates.published",Te(Y));const P=t.querySelector('abstract, abstract[locale^="en"]');P&&n.set("abstract.content",P.innerHTML.trim());const u=t.querySelectorAll("keyword, keywords > keyword"),b=[];u.forEach(g=>{const h=g.textContent.trim();h&&!b.includes(h)&&b.push(h)}),b.length&&n.set("keywords",b);const j=t.querySelectorAll("author"),B=[],O=[];function y(g,h=""){if(!g)return null;let _=O.findIndex(E=>E.text.toLowerCase()===g.toLowerCase());return _===-1&&(O.push({text:g,ror_id:h}),_=O.length-1),_+1}j.forEach(g=>{const h=g.querySelector("givenname, given-names")?g.querySelector("givenname, given-names").textContent.trim():"",_=g.querySelector("familyname, surname")?g.querySelector("familyname, surname").textContent.trim():"",E=g.querySelector("email")?g.querySelector("email").textContent.trim():"";let G=g.querySelector("orcid")?g.querySelector("orcid").textContent.trim():"";G.startsWith("https://orcid.org/")&&(G=G.substring(18));const te=[];g.querySelectorAll("affiliation").forEach($e=>{const pe=$e.textContent.trim();if(pe){const ne=y(pe);ne!==null&&!te.includes(ne)&&te.push(ne)}}),B.push({given:h,surname:_,email:E,orcid:G,affiliation_ids:te})}),B.length&&(n.set("authors",B),n.set("article.correspondence_author",1)),O.length&&n.set("affiliations",O);const H=t.querySelectorAll("reference, citation, ref"),D=[];H.forEach(g=>{let h=g.textContent.trim();const _=g.querySelector("mixed-citation");if(_&&(h=_.textContent.trim()),h=h.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,""),h){const E=_t(h)||(g.querySelector("uri")?g.querySelector("uri").textContent.trim():"");D.push({text:h,url:E})}}),D.length&&n.set("references",D);const S=t.querySelectorAll("body > sec, sec");if(S.length){const g=[];S.forEach(h=>{const _=h.querySelector("title"),E=_?_.textContent.trim():"Section";_&&_.remove();const G=h.innerHTML.trim();g.push({id:Me(),title:E,content:G,tables:[],figures:[]})}),n.set("sections",g)}n.emit("load"),L("OJS XML metadata imported successfully")}function Te(a){if(!a)return"";const e=a.match(/^(\d{4})[-/](\d{2})[-/](\d{2})/);if(e)return`${e[1]}-${e[2]}-${e[3]}`;try{const t=new Date(a);if(!isNaN(t.getTime()))return t.toISOString().split("T")[0]}catch{}return a}function _t(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}const It=["Introduction","Methods","Results","Discussion","Conclusion","Declarations"],Qe=[8,9,10,11,12,14,16,18,20,22,24];let ce=null,N=[],xe=null,$=[];function Mt(a){ce=a,ee(),n.on("load",()=>ee()),n.on("reset",()=>ee())}function ee(){if(!ce)return;const a=n.get("sections")||[];ce.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Article Body Content</h2>
        <p class="card-description">
          Add sections with rich text formatting, tables, and figures.
          Use <strong>[1]</strong> to cite references.
        </p>
      </div>

      <div class="card-body">
        <div id="body-sections-list">
          ${a.map((e,t)=>Rt(e,t,a.length)).join("")}
        </div>

        <div class="btn-row" style="margin-top:1rem;gap:.5rem;display:flex;flex-wrap:wrap">
          <button class="btn btn-primary" id="btn-add-section">
            <span class="icon">+</span> Add Section
          </button>
          <button class="btn btn-secondary" id="btn-add-presets">
            <span class="icon">📋</span> Add Preset Sections
          </button>
        </div>
      </div>
    </div>
  `,ce.querySelector("#btn-add-section").addEventListener("click",()=>Pt()),ce.querySelector("#btn-add-presets").addEventListener("click",()=>Bt()),a.forEach((e,t)=>{var l,d,c;const r=ce.querySelector(`[data-section-id="${e.id}"]`);if(!r)return;const s=r.querySelector(".section-title-input");s.addEventListener("input",()=>{e.title=s.value,se()}),Nt(r,e);const i=r.querySelector(".section-editor");i.innerHTML=e.content||"",i.addEventListener("input",()=>{e.content=i.innerHTML,se()}),i.addEventListener("paste",m=>{var o;const f=(o=m.clipboardData)==null?void 0:o.getData("text/html");if(f){m.preventDefault();const w=Ze(f);document.execCommand("insertHTML",!1,w)}}),(l=r.querySelector(".btn-move-up"))==null||l.addEventListener("click",()=>Fe(t,-1)),(d=r.querySelector(".btn-move-down"))==null||d.addEventListener("click",()=>Fe(t,1)),(c=r.querySelector(".btn-delete-section"))==null||c.addEventListener("click",()=>zt(t)),r.querySelector(".btn-insert-table").addEventListener("click",()=>Oe(e.id)),r.querySelector(".btn-insert-figure").addEventListener("click",()=>Ue(e.id)),r.querySelectorAll(".btn-remove-table").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.tableIndex,10);e.tables.splice(f,1),se(),ee()})}),r.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.tableIndex,10);Oe(e.id,f)})}),r.querySelectorAll(".btn-remove-figure").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.figureIndex,10);e.figures.splice(f,1),se(),ee()})}),r.querySelectorAll(".btn-edit-figure").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.figureIndex,10);Ue(e.id,f)})})})}function Rt(a,e,t){const r=(a.tables||[]).map((i,l)=>jt(i,l)).join(""),s=(a.figures||[]).map((i,l)=>Dt(i,l)).join("");return`
  <div class="section-block" data-section-id="${a.id}">
    <div class="section-header">
      <span class="section-badge">${e+1}</span>
      <input class="section-title-input form-control" type="text"
             value="${K(a.title)}" placeholder="Section Title" />
      <div class="section-actions">
        ${e>0?'<button class="btn btn-icon btn-move-up" title="Move Up">▲</button>':""}
        ${e<t-1?'<button class="btn btn-icon btn-move-down" title="Move Down">▼</button>':""}
        <button class="btn btn-icon btn-delete-section" title="Delete Section">✕</button>
      </div>
    </div>

    <!-- toolbar -->
    <div class="editor-toolbar">
      <button class="tb-btn" data-cmd="bold" title="Bold"><b>B</b></button>
      <button class="tb-btn" data-cmd="italic" title="Italic"><i>I</i></button>
      <button class="tb-btn" data-cmd="underline" title="Underline"><u>U</u></button>
      <button class="tb-btn" data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button>
      <button class="tb-btn" data-cmd="superscript" title="Superscript">X<sup>2</sup></button>
      <button class="tb-btn" data-cmd="subscript" title="Subscript">X<sub>2</sub></button>
      <button class="tb-btn" data-cmd="createLink" title="Insert Hyperlink">🔗</button>
      <span class="tb-sep"></span>
      <button class="tb-btn" data-cmd="insertOrderedList" title="Ordered List">1.</button>
      <button class="tb-btn" data-cmd="insertUnorderedList" title="Unordered List">•</button>
      <button class="tb-btn" data-cmd="indent" title="Indent">⇥</button>
      <button class="tb-btn" data-cmd="outdent" title="Outdent">⇤</button>
      <span class="tb-sep"></span>
      <select class="tb-fontsize" title="Font Size">
        <option value="">Size</option>
        ${Qe.map(i=>`<option value="${i}">${i}pt</option>`).join("")}
      </select>
      <select class="tb-spacing" title="Paragraph Spacing">
        <option value="">Space</option>
        ${[0,2,4,6,8,10,12,18].map(i=>`<option value="${i}px">${i}px</option>`).join("")}
      </select>
      <button class="tb-btn" data-cmd="removeFormat" title="Remove Formatting">✖</button>
      <span class="tb-sep"></span>
      <button class="tb-btn btn-auto-sup" title="Auto-superscript bracket citations" style="width: auto; padding: 0 4px;">Sup[x]</button>
      <button class="tb-btn btn-hl-cite" title="Toggle citation highlight" style="width: auto; padding: 0 4px;">HL</button>
    </div>

    <div class="section-editor" contenteditable="true"
         data-placeholder="Start writing…"></div>

    <div class="section-insert-row">
      <button class="btn btn-sm btn-secondary btn-insert-table">
        <span class="icon">▦</span> Insert Table
      </button>
      <button class="btn btn-sm btn-secondary btn-insert-figure">
        <span class="icon">🖼</span> Insert Figure
      </button>
    </div>

    ${r?`<div class="section-tables">${r}</div>`:""}
    ${s?`<div class="section-figures">${s}</div>`:""}
  </div>`}function jt(a,e){const t=a.manualNumber||e+1,r=K(a.caption||""),s=a.headers||[],i=a.rows||[];let l=`
  <div class="table-preview">
    <div class="table-preview-header">
      <strong>Table ${t}${r?": "+r:""}</strong>
      <span>
        <span class="badge badge-info" style="margin-right:8px; cursor:help;" title="Copy and paste this tag into the text to place the table inline">@[Table:${t}]</span>
        <button class="btn btn-xs btn-secondary btn-edit-table" data-table-index="${e}">Edit</button>
        <button class="btn btn-xs btn-danger btn-remove-table" data-table-index="${e}">Remove</button>
      </span>
    </div>
    <div class="table-preview-scroll">
    <table class="preview-table">`;return s.length&&(l+="<thead>",s.forEach(d=>{l+="<tr>",d.forEach(c=>{l+=`<th style="text-align:${c.align||"left"}">${He(c)}</th>`}),l+="</tr>"}),l+="</thead>"),i.length&&(l+="<tbody>",i.forEach(d=>{l+="<tr>",d.forEach((c,m)=>{const f=a.headerCol&&m===0?"th":"td";l+=`<${f} style="text-align:${c.align||"left"}">${He(c)}</${f}>`}),l+="</tr>"}),l+="</tbody>"),l+="</table></div>",a.footnote&&(l+=`<div class="table-footnote">${K(a.footnote)}</div>`),l+="</div>",l}function He(a){let e=K(a.text||"");return a.bold&&(e=`<b>${e}</b>`),a.italic&&(e=`<i>${e}</i>`),a.underline&&(e=`<u>${e}</u>`),a.superscript&&(e=`<sup>${e}</sup>`),a.subscript&&(e=`<sub>${e}</sub>`),e}function Dt(a,e){return`
  <div class="figure-preview">
    <div class="figure-preview-header">
      <strong>Figure ${e+1}${a.caption?": "+K(a.caption):""}</strong>
      <span>
        <span class="badge badge-info" style="margin-right:8px; cursor:help;" title="Copy and paste this tag into the text to place the figure inline">@[Figure:${e+1}]</span>
        <button class="btn btn-xs btn-primary btn-edit-figure" data-figure-index="${e}" style="margin-right:4px;">Edit</button>
        <button class="btn btn-xs btn-danger btn-remove-figure" data-figure-index="${e}">Remove</button>
      </span>
    </div>
    <img src="${K(a.url)}" alt="${K(a.alt||"")}" class="figure-thumb" />
  </div>`}function Nt(a,e){var i,l;const t=a.querySelector(".section-editor");a.querySelectorAll(".tb-btn[data-cmd]").forEach(d=>{d.addEventListener("mousedown",c=>{c.preventDefault();const m=d.dataset.cmd;if(m==="createLink"){const f=prompt("Enter link URL (e.g. https://google.com):","https://");f&&document.execCommand(m,!1,f)}else document.execCommand(m,!1,null);e.content=t.innerHTML,se()})});const r=a.querySelector(".tb-fontsize");r.addEventListener("change",()=>{const d=r.value;d&&(document.execCommand("fontSize",!1,"7"),t.querySelectorAll('font[size="7"]').forEach(m=>{m.removeAttribute("size"),m.style.fontSize=d+"pt"}),e.content=t.innerHTML,se(),r.value="")});const s=a.querySelector(".tb-spacing");s&&s.addEventListener("change",()=>{const d=s.value;if(d!==""){const c=window.getSelection();if(c.rangeCount>0){let m=c.anchorNode;for(;m&&m!==t;){if(m.tagName==="P"||m.tagName==="DIV"){m.style.marginTop=d;break}m=m.parentNode}if(!m||m===t){document.execCommand("formatBlock",!1,"P");let f=c.anchorNode;for(;f&&f!==t;){if(f.tagName==="P"){f.style.marginTop=d;break}f=f.parentNode}}}e.content=t.innerHTML,se(),s.value=""}}),(i=a.querySelector(".btn-auto-sup"))==null||i.addEventListener("click",d=>{d.preventDefault();let c=t.innerHTML;c=c.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),t.innerHTML=c,e.content=c,se(),L("Auto-superscripted citations")}),(l=a.querySelector(".btn-hl-cite"))==null||l.addEventListener("click",d=>{d.preventDefault(),t.classList.toggle("show-citations"),d.target.classList.toggle("active",t.classList.contains("show-citations"))})}function Pt(a=""){const e=n.get("sections")||[];e.push({id:Me(),title:a,content:"",tables:[],figures:[]}),n.set("sections",e),ee(),L("Section added")}function Bt(){const a=n.get("sections")||[];It.forEach(e=>{a.push({id:Me(),title:e,content:"",tables:[],figures:[]})}),n.set("sections",a),ee(),L("Preset sections added")}function Fe(a,e){const t=n.get("sections")||[],r=a+e;r<0||r>=t.length||([t[a],t[r]]=[t[r],t[a]],n.set("sections",t),ee())}function zt(a){const e=n.get("sections")||[];e.splice(a,1),n.set("sections",e),ee(),L("Section removed")}function se(){const a=n.get("sections")||[];n.set("sections",a)}function Oe(a,e=null){var f;xe=e!==null?{sectionId:a,tableIndex:e}:null;const r=(n.get("sections")||[]).find(o=>o.id===a);if(!r)return;let s=null;if(xe!==null&&(s=r.tables[e]),s){const o=[...s.headers||[],...s.rows||[]];$=o.length?o.map(w=>w.map(M=>({...M}))):Xe(3,3)}else $=Xe(3,3);N=[];const i=document.createElement("div");i.className="modal-overlay",i.id="table-modal-overlay";const l=((f=s==null?void 0:s.headers)==null?void 0:f.length)??1,d=(s==null?void 0:s.headerCol)??!1;i.innerHTML=`
  <div class="modal modal-lg" id="table-editor-modal">
    <div class="modal-header">
      <h3>${s?"Edit":"Insert"} Table</h3>
      <div style="display:flex; gap:0.5rem; align-items:center;">
        <button class="btn btn-icon btn-fullscreen-toggle" title="Toggle Full Screen">⛶</button>
        <button class="btn btn-icon modal-close-btn">✕</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group" style="flex:2">
          <label class="form-label">Table Caption</label>
          <input class="form-control" id="tbl-caption"
                 value="${K((s==null?void 0:s.caption)||"")}" placeholder="e.g. Demographic characteristics" />
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Table Number</label>
          <input class="form-control" id="tbl-number" type="text"
                 value="${(s==null?void 0:s.manualNumber)||""}" placeholder="Auto" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label class="form-label">Header Rows</label>
          <input class="form-control" id="tbl-header-rows" type="number"
                 min="1" max="5" value="${l}" />
        </div>
        <div class="form-group" style="flex:1;display:flex;align-items:flex-end;gap:.5rem">
          <label class="form-label" style="white-space:nowrap">
            <input type="checkbox" id="tbl-header-col" ${d?"checked":""} />
            First Column as Header
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Paste MS Word Table</label>
        <div class="paste-zone" id="tbl-paste-zone" contenteditable="true"
             data-placeholder="Paste MS Word table here…"></div>
      </div>

      <div class="table-actions" id="tbl-actions">
        <button class="btn btn-xs btn-secondary" data-act="addCol">+ Column</button>
        <button class="btn btn-xs btn-secondary" data-act="removeCol">− Column</button>
        <button class="btn btn-xs btn-secondary" data-act="addRow">+ Row</button>
        <button class="btn btn-xs btn-secondary" data-act="removeRow">− Row</button>
        <span class="tb-sep"></span>
        <button class="btn btn-xs btn-secondary" data-act="fontDec" title="Decrease Table Font">A-</button>
        <select class="tb-fontsize" id="tbl-fontsize" title="Table Font Size">
          <option value="">Font Size</option>
          ${Qe.map(o=>`<option value="${o}" ${(s==null?void 0:s.fontSize)===String(o)?"selected":""}>${o}pt</option>`).join("")}
        </select>
        <button class="btn btn-xs btn-secondary" data-act="fontInc" title="Increase Table Font">A+</button>
        <span class="tb-sep"></span>
        <button class="btn btn-xs btn-secondary" data-act="bold" title="Bold"><b>B</b></button>
        <button class="btn btn-xs btn-secondary" data-act="italic" title="Italic"><i>I</i></button>
        <button class="btn btn-xs btn-secondary" data-act="underline" title="Underline"><u>U</u></button>
        <button class="btn btn-xs btn-secondary" data-act="superscript" title="Superscript">X<sup>2</sup></button>
        <button class="btn btn-xs btn-secondary" data-act="subscript" title="Subscript">X<sub>2</sub></button>
        <span class="tb-sep"></span>
        <button class="btn btn-xs btn-secondary" data-act="autoSup" title="Auto-superscript Citations">Sup[x]</button>
        <button class="btn btn-xs btn-secondary" data-act="hlCite" title="Highlight Citations">HL</button>
        <span class="tb-sep"></span>
        <button class="btn btn-xs btn-secondary" data-act="alignLeft">⬅</button>
        <button class="btn btn-xs btn-secondary" data-act="alignCenter">⬌</button>
        <button class="btn btn-xs btn-secondary" data-act="alignRight">➡</button>
        <span class="tb-sep"></span>
        <button class="btn btn-xs btn-secondary" data-act="merge">Merge</button>
      </div>

      <div class="table-grid-wrap" id="tbl-grid-wrap"></div>

      <div class="form-group">
        <label class="form-label">Table Footnote / Note</label>
        <textarea class="form-control" id="tbl-footnote" rows="2"
                  placeholder="e.g. p < 0.05, SD = Standard Deviation">${K((s==null?void 0:s.footnote)||"")}</textarea>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" id="tbl-cancel">Cancel</button>
      <button class="btn btn-primary" id="tbl-save">
        ${s?"Update Table":"Insert Table"}
      </button>
    </div>
  </div>`,document.body.appendChild(i),le(),i.querySelector(".modal-close-btn").addEventListener("click",Ce),i.querySelector("#tbl-cancel").addEventListener("click",Ce),i.addEventListener("click",o=>{o.target===i&&Ce()}),i.querySelector(".btn-fullscreen-toggle").addEventListener("click",()=>{i.querySelector("#table-editor-modal").classList.toggle("modal-fullscreen")});const c=i.querySelector("#tbl-paste-zone");c.addEventListener("paste",o=>{Xt(o,c)}),i.querySelector("#tbl-actions").addEventListener("click",o=>{var M;const w=(M=o.target.closest("[data-act]"))==null?void 0:M.dataset.act;w&&Ft(w)}),i.querySelector("#tbl-save").addEventListener("click",()=>{Jt(a)});const m=i.querySelector("#tbl-fontsize");m&&m.addEventListener("change",()=>{Le("fontSize",m.value),le()})}let he=!1,ve=null;function Ce(){var a;(a=document.getElementById("table-modal-overlay"))==null||a.remove(),xe=null,$=[],N=[],he=!1,ve=null}function Xe(a,e){return Array.from({length:a},()=>Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})))}function le(){const a=document.getElementById("tbl-grid-wrap");if(!a)return;let e='<table class="table-editor-grid"><tbody>';$.forEach((r,s)=>{e+="<tr>",r.forEach((i,l)=>{if(i.hidden)return;const d=N.some(o=>o.row===s&&o.col===l)?" selected":"",c=[];i.bold&&c.push("font-weight:bold"),i.italic&&c.push("font-style:italic"),i.underline&&c.push("text-decoration:underline"),i.superscript&&c.push("vertical-align:super;font-size:0.8em"),i.subscript&&c.push("vertical-align:sub;font-size:0.8em"),i.align&&c.push("text-align:"+i.align),i.fontSize&&c.push("font-size:"+i.fontSize+"pt");const m=i.colspan&&i.colspan>1?` colspan="${i.colspan}"`:"",f=i.rowspan&&i.rowspan>1?` rowspan="${i.rowspan}"`:"";e+=`<td class="grid-cell${d}" data-r="${s}" data-c="${l}"${m}${f}>
        <div class="grid-input" contenteditable="true"
               style="${c.join(";")}" data-r="${s}" data-c="${l}">${i.text}</div>
      </td>`}),e+="</tr>"}),e+="</tbody></table>",a.innerHTML=e;let t=null;a.querySelectorAll(".grid-cell").forEach(r=>{r.addEventListener("mousedown",s=>{if(s.target.classList.contains("grid-input")&&!s.ctrlKey&&!s.metaKey&&!s.shiftKey)return;const i=parseInt(r.dataset.r,10),l=parseInt(r.dataset.c,10);s.shiftKey&&t?(s.preventDefault(),Je(t.r,t.c,i,l)):(he=!0,ve={r:i,c:l},t={r:i,c:l},Ht(i,l,s.ctrlKey||s.metaKey))}),r.addEventListener("mouseenter",s=>{if(he&&ve){const i=parseInt(r.dataset.r,10),l=parseInt(r.dataset.c,10);Je(ve.r,ve.c,i,l),t={r:i,c:l}}})}),document.addEventListener("mouseup",()=>{he=!1},{once:!0}),window.addEventListener("mouseup",()=>{he=!1}),a.querySelectorAll(".grid-input").forEach(r=>{r.addEventListener("focus",()=>{const s=parseInt(r.dataset.r,10),i=parseInt(r.dataset.c,10);N.some(l=>l.row===s&&l.col===i)||(N=[{row:s,col:i}],t={r:s,c:i},a.querySelectorAll(".grid-cell").forEach(l=>l.classList.remove("selected")),r.parentElement.classList.add("selected"),Re())}),r.addEventListener("input",()=>{const s=parseInt(r.dataset.r,10),i=parseInt(r.dataset.c,10);$[s][i].text=r.innerHTML})})}function Je(a,e,t,r){const s=Math.min(a,t),i=Math.max(a,t),l=Math.min(e,r),d=Math.max(e,r);N=[];for(let c=s;c<=i;c++)for(let m=l;m<=d;m++)N.push({row:c,col:m});le(),Re()}function Ht(a,e,t){if(t){const r=N.findIndex(s=>s.row===a&&s.col===e);r>=0?N.splice(r,1):N.push({row:a,col:e})}else N=[{row:a,col:e}];le(),Re()}function Re(){var e;const a=document.getElementById("tbl-fontsize");if(a)if(N.length===1){const t=N[0],r=(e=$[t.row])==null?void 0:e[t.col];r&&(a.value=r.fontSize?String(r.fontSize):"")}else a.value=""}function Ft(a){var t;const e=((t=$[0])==null?void 0:t.length)||0;switch(a){case"addCol":$.forEach(s=>s.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""}));break;case"removeCol":e>1&&$.forEach(s=>s.pop());break;case"addRow":$.push(Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));break;case"removeRow":$.length>1&&$.pop();break;case"bold":ge("bold");break;case"italic":ge("italic");break;case"underline":ge("underline");break;case"superscript":ge("superscript");break;case"subscript":ge("subscript");break;case"autoSup":(N.length?N:$.flatMap((i,l)=>i.map((d,c)=>({row:l,col:c})))).forEach(i=>{let l=$[i.row][i.col].text;l=l.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),$[i.row][i.col].text=l}),L("Citations superscripted");break;case"hlCite":document.getElementById("table-editor-modal").classList.toggle("show-citations");break;case"fontInc":case"fontDec":{const s=N.length?N:$.flatMap((l,d)=>l.map((c,m)=>({row:d,col:m}))),i=a==="fontInc"?1:-1;s.forEach(l=>{let d=parseFloat($[l.row][l.col].fontSize)||10;d=Math.max(6,Math.min(24,d+i)),$[l.row][l.col].fontSize=String(d)})}break;case"alignLeft":Le("align","left");break;case"alignCenter":Le("align","center");break;case"alignRight":Le("align","right");break;case"merge":Ot();break}le()}function ge(a){N.forEach(({row:e,col:t})=>{$[e][t][a]=!$[e][t][a]})}function Le(a,e){N.forEach(({row:t,col:r})=>{$[t][r][a]=e})}function Ot(){if(N.length<2)return;let a=1/0,e=-1/0,t=1/0,r=-1/0;N.forEach(i=>{i.row<a&&(a=i.row),i.row>e&&(e=i.row),i.col<t&&(t=i.col),i.col>r&&(r=i.col)});const s=[];for(let i=a;i<=e;i++)for(let l=t;l<=r;l++)$[i][l].hidden||s.push($[i][l].text);$[a][t].text=s.filter(Boolean).join(" "),$[a][t].rowspan=e-a+1,$[a][t].colspan=r-t+1,$[a][t].hidden=!1;for(let i=a;i<=e;i++)for(let l=t;l<=r;l++)(i!==a||l!==t)&&($[i][l].text="",$[i][l].hidden=!0,$[i][l].rowspan=1,$[i][l].colspan=1)}function Xt(a,e){var r;const t=(r=a.clipboardData)==null?void 0:r.getData("text/plain");setTimeout(()=>{const s=e.querySelector("table"),i=e.innerText||t;if(s){const l=s.querySelectorAll("tr");if($=[],l.forEach(d=>{const c=d.querySelectorAll("td, th"),m=[];c.forEach(f=>{const o=f.getAttribute("style")||"",w=(f.innerText||f.textContent||"").trim(),M=/font-weight\s*:\s*(bold|[6-9]\d{2})/i.test(o)||!!f.querySelector("b, strong")||f.tagName==="TH",v=/font-style\s*:\s*italic/i.test(o)||!!f.querySelector("i, em"),q=/text-decoration[^:]*:\s*underline/i.test(o)||!!f.querySelector("u"),F=/vertical-align\s*:\s*super/i.test(o)||!!f.querySelector("sup"),R=/vertical-align\s*:\s*sub/i.test(o)||!!f.querySelector("sub");let T="left";const Y=o.match(/text-align\s*:\s*(left|center|right)/i);Y&&(T=Y[1].toLowerCase());let P="";const u=o.match(/font-size\s*:\s*([\d.]+)pt/i);u&&(P=u[1]),m.push({text:w,bold:M,italic:v,underline:q,superscript:F,subscript:R,align:T,fontSize:P})}),m.length&&$.push(m)}),$.length){const d=Math.max(...$.map(c=>c.length));$.forEach(c=>{for(;c.length<d;)c.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left"})}),e.innerHTML="",N=[],le(),L("Table pasted successfully");return}}if(e.innerHTML="",i){const l=i.split(/\r?\n/).map(d=>d.trim()).filter(Boolean);if(l.length>0){$=l.map(c=>c.split("	").map(f=>({text:f.trim(),bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));const d=Math.max(...$.map(c=>c.length));$.forEach(c=>{for(;c.length<d;)c.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})}),N=[],le(),L("Table parsed from plain text (TSV)");return}}L("No table found in pasted content","warning")},200)}function Jt(a){var w,M,v,q,F,R;const e=n.get("sections")||[],t=e.find(T=>T.id===a);if(!t)return;const r=((w=document.getElementById("tbl-caption"))==null?void 0:w.value.trim())||"",s=((M=document.getElementById("tbl-number"))==null?void 0:M.value.trim())||"",i=Math.max(1,Math.min(5,parseInt((v=document.getElementById("tbl-header-rows"))==null?void 0:v.value,10)||1)),l=((q=document.getElementById("tbl-header-col"))==null?void 0:q.checked)||!1,d=((F=document.getElementById("tbl-footnote"))==null?void 0:F.value.trim())||"",c=((R=document.getElementById("tbl-fontsize"))==null?void 0:R.value)||"",m=$.slice(0,i).map(T=>T.map(Y=>({...Y}))),f=$.slice(i).map(T=>T.map(Y=>({...Y}))),o={caption:r,manualNumber:s,headers:m,rows:f,headerCol:l,footnote:d,fontSize:c};t.tables||(t.tables=[]),xe!==null?(t.tables[xe.tableIndex]=o,L("Table updated")):(t.tables.push(o),L("Table inserted")),n.set("sections",e),Ce(),ee()}function Ue(a,e=-1){const t=n.get("sections")||[],r=t.find(P=>P.id===a);if(!r)return;const s=e>=0&&r.figures&&r.figures[e],i=s?r.figures[e]:null,l=t.reduce((P,u)=>{var b;return P+(((b=u.figures)==null?void 0:b.length)||0)},0),d=String(l+1).padStart(2,"0"),c=s?i.url:`images/F${d}.png`,m=s?i.caption:"",f=s&&i.alt||"",o=s&&i.base64Data||"",w=s?"Edit Figure":"Insert Figure",M=s?"Update Figure":"Insert Figure",v=document.createElement("div");v.className="modal-overlay",v.id="figure-modal-overlay",v.innerHTML=`
  <div class="modal">
    <div class="modal-header">
      <h3>${w}</h3>
      <button class="btn btn-icon modal-close-btn">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Image URL</label>
        <input class="form-control" id="fig-url" value="${K(c)}"
               placeholder="${K(c)}" />
        <small style="color:var(--text-secondary)">Or upload an image for JATS XML base64 embedding:</small>
        <input type="file" class="form-control" id="fig-file" accept="image/*" style="margin-top:0.5rem;" />
      </div>
      <div class="form-group">
        <label class="form-label">Caption</label>
        <input class="form-control" id="fig-caption" placeholder="Figure caption" value="${K(m)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Alt Text</label>
        <input class="form-control" id="fig-alt" placeholder="Describe the image for accessibility" value="${K(f)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Preview</label>
        <div class="figure-live-preview" id="fig-preview-zone" style="min-height: 100px; border: 1px dashed var(--border-color); display:flex; align-items:center; justify-content:center;">
          <img id="fig-preview-img" src="${K(o||c)}" alt="" style="max-height: 300px;" />
        </div>
        <input type="hidden" id="fig-base64" value="${K(o)}" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="fig-cancel">Cancel</button>
      <button class="btn btn-primary" id="fig-save">${M}</button>
    </div>
  </div>`,document.body.appendChild(v);const q=v.querySelector("#fig-url"),F=v.querySelector("#fig-preview-img"),R=v.querySelector("#fig-file"),T=v.querySelector("#fig-base64"),Y=v.querySelector("#fig-preview-zone");q.addEventListener("input",()=>{T.value||(F.src=q.value)}),R.addEventListener("change",P=>{const u=P.target.files[0];if(u){const b=new FileReader;b.onload=j=>{T.value=j.target.result,F.src=j.target.result},b.readAsDataURL(u)}}),Y.setAttribute("tabindex","0"),Y.addEventListener("paste",P=>{const u=P.clipboardData.items;for(let b=0;b<u.length;b++)if(u[b].type.indexOf("image")!==-1){const j=u[b].getAsFile(),B=new FileReader;B.onload=O=>{T.value=O.target.result,F.src=O.target.result,L("Image pasted")},B.readAsDataURL(j);break}}),v.querySelector(".modal-close-btn").addEventListener("click",Se),v.querySelector("#fig-cancel").addEventListener("click",Se),v.addEventListener("click",P=>{P.target===v&&Se()}),v.querySelector("#fig-save").addEventListener("click",()=>{const P=q.value.trim(),u=v.querySelector("#fig-caption").value.trim(),b=v.querySelector("#fig-alt").value.trim(),j=T.value;r.figures||(r.figures=[]),s?r.figures[e]={url:P,caption:u,alt:b,base64Data:j}:r.figures.push({url:P,caption:u,alt:b,base64Data:j}),n.set("sections",t),Se(),ee(),L(s?"Figure updated":"Figure inserted")})}function Se(){var a;(a=document.getElementById("figure-modal-overlay"))==null||a.remove()}function K(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Ut(a){ye(a),n.on("load",()=>ye(a)),n.on("reset",()=>ye(a))}function ye(a){if(!a)return;const e=n.get("references")||[];a.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          References
          <span class="badge">${e.length}</span>
        </h2>
        <p class="card-description">
          Paste all references below (one per line). They will be automatically numbered.
          Use <strong>[n]</strong> in body content to cite by number.
        </p>
      </div>

      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Bulk Paste References</label>
          <textarea class="form-control" id="ref-bulk-input" rows="8"
                    placeholder="1. Smith J, Doe A. Title of article. Journal Name. 2024;12(3):45-50. doi:10.1234/example.2024&#10;2. Brown K, et al. Another study on outcomes. Clin Res. 2023;8(1):12-18. https://doi.org/10.5678/sample.2023&#10;3. White P. Textbook of Medical Research. Publisher; 2022."></textarea>
        </div>

        <div class="btn-row" style="margin-top:.75rem">
          <button class="btn btn-primary" id="btn-parse-refs">
            <span class="icon">🔢</span> Parse &amp; Number References
          </button>
        </div>

        ${e.length?Yt(e):""}
      </div>
    </div>
  `,a.querySelector("#btn-parse-refs").addEventListener("click",()=>Wt(a)),Gt(a,e)}function Yt(a){let e='<div class="ref-list" id="ref-parsed-list">';return a.forEach((t,r)=>{e+=`
    <div class="ref-item" data-ref-index="${r}">
      <div class="ref-item-header">
        <span class="ref-number">[${r+1}]</span>
        <span class="ref-text">${Ye(t.text)}</span>
        <button class="btn btn-xs btn-danger btn-remove-ref" data-ref-index="${r}" title="Remove">✕</button>
      </div>
      <div class="ref-item-url">
        <input class="form-control form-control-sm ref-url-input"
               data-ref-index="${r}" type="text"
               value="${Ye(t.url||"")}"
               placeholder="URL / DOI link" />
      </div>
    </div>`}),e+="</div>",e}function Gt(a,e){a.querySelectorAll(".btn-remove-ref").forEach(t=>{t.addEventListener("click",()=>{const r=parseInt(t.dataset.refIndex,10);e.splice(r,1),n.set("references",e),ye(a),L("Reference removed")})}),a.querySelectorAll(".ref-url-input").forEach(t=>{t.addEventListener("input",()=>{const r=parseInt(t.dataset.refIndex,10);e[r].url=t.value.trim(),n.set("references",e)})})}function Wt(a){const e=a.querySelector("#ref-bulk-input");if(!e)return;const t=e.value.trim();if(!t){L("Please paste references first","warning");return}const s=t.split(`
`).map(i=>i.trim()).filter(Boolean).map(i=>{const d=i.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,"")||i,c=Vt(d);return{text:d,url:c}});n.set("references",s),e.value="",ye(a),L(`${s.length} reference${s.length!==1?"s":""} parsed`)}function Vt(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}function Ye(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Kt(){const a=n.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],s=a.affiliations||[],i=a.dates||{},l=a.abstract||{},d=a.keywords||[],c=a.copyright||{},m=a.sections||[],f=a.references||[],o=p=>re(p||""),w=p=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[p]||p||"Research Article",M=e.base_url||"https://jpchr.com/jpchr",v=t.article_id||"galley",q=`${M}/article/view/${v}/html`,F=`${M}/article/view/${v}/pdf`,R=document.createElement("div");R.innerHTML=l.content||"";const T=R.textContent.replace(/\s+/g," ").trim(),Y=T.substring(0,155)+(T.length>155?"...":""),u=(p=>p==null?"":String(p).replace(/-/g,"/"))(i.published||i.accepted||i.received||t.year),b=r.map(p=>{const I=(p.affiliation_ids||[]).map(W=>{var Z;return(Z=s[W-1])==null?void 0:Z.text}).filter(Boolean).join("; ");return{"@type":"Person",name:`${p.given||""} ${p.surname||""}`.trim(),affiliation:I||void 0,identifier:p.orcid?`https://orcid.org/${p.orcid}`:void 0}}),j={"@context":"https://schema.org","@type":"ScholarlyArticle",headline:t.title||"",alternativeHeadline:t.subtitle||void 0,genre:w(t.type),author:b,datePublished:i.published||void 0,dateCreated:i.received||void 0,isPartOf:{"@type":"PublicationIssue",issueNumber:t.issue||void 0,volumeNumber:t.volume||void 0,isPartOf:{"@type":"Periodical",name:e.title||"",issn:[e.issn_online,e.issn_print].filter(Boolean)}},pageStart:t.fpage||void 0,pageEnd:t.lpage||void 0,description:T||void 0,publisher:{"@type":"Organization",name:e.publisher||""},identifier:[t.doi?{"@type":"PropertyValue",propertyID:"doi",value:t.doi}:null].filter(Boolean)},B=t.doi?`<meta name="citation_doi" content="${o(t.doi)}">`:"",O=e.issn_online||e.issn_print||"";let y="";r.forEach(p=>{const I=`${p.surname||""}, ${p.given||""}`.trim().replace(/^,|,$/,"");y+=`  <meta name="citation_author" content="${o(I)}">
`,p.orcid&&(y+=`  <meta name="citation_author_orcid" content="https://orcid.org/${o(p.orcid)}">
`)});let H="";l.content&&(H+=`      <a href="#abstract" class="sidebar-link">Abstract</a>
`),m.forEach(p=>{H+=`      <a href="#sec-${p.id}" class="sidebar-link">${o(p.title)}</a>
`}),f.length&&(H+=`      <a href="#references" class="sidebar-link">References</a>
`);const D=r.length===1,S=s.length===1;let g="";r.forEach((p,I)=>{const Z=[p.given,p.middle,p.surname].filter(Boolean).map(A=>o(A)).join(" ").trim(),V=I+1===parseInt(t.correspondence_author,10),x=p.orcid?` <a href="https://orcid.org/${o(p.orcid)}" target="_blank" class="orcid-link" title="ORCID iD"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" class="orcid-icon" alt="ORCID iD" /></a>`:"",X=V?"<sup>*</sup>":"";let J="";!D&&p.affiliation_ids&&p.affiliation_ids.length&&(J=`<sup>${p.affiliation_ids.join(",")}</sup>`),g+=`<span class="author-name">${Z}${J}${X}${x}</span>${I<r.length-1?", ":""}`});let h="";if(s.length)if(D&&S){const p=s[0],I=p.ror_id?` <a href="${o(p.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";h=`<div class="affiliation-line single">${o(p.text)}${I}</div>`}else h='<ol class="affiliations-list" style="list-style-type:none; padding-left:0;">',s.forEach((p,I)=>{const W=p.ror_id?` <a href="${o(p.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";h+=`<li class="affiliation-line" style="margin-bottom:4px;"><sup>${I+1}</sup> ${o(p.text)}${W}</li>`}),h+="</ol>";let _="";const E=parseInt(t.correspondence_author,10);if(E>0&&r[E-1]){const p=r[E-1],W=[p.given,p.middle,p.surname].filter(Boolean).join(" ").trim();_=`<div class="correspondence-line" style="font-size:0.9rem; margin-top:0.5rem; color:var(--text-secondary);">*Correspondence: ${o(W)}, <a href="mailto:${o(p.email)}">${o(p.email)}</a></div>`}const G=t.volume?`Vol. ${o(t.volume)}`:"",te=t.issue?`No. ${o(t.issue)}`:"",oe=t.issue_months?`(${o(t.issue_months)})`:"",$e=t.year?o(t.year):"";let pe=[G,te,oe].filter(Boolean).join(", ");$e&&(pe+=` ${$e}`);const ne=t.fpage||t.elocation_id||"",tt=ne?` | Pages: ${o(ne)}${t.lpage?"-"+o(t.lpage):""}`:"",at=t.article_id?` | Article ID: ${o(t.article_id)}`:"",rt=t.doi?` | DOI: <a href="https://doi.org/${o(t.doi)}" target="_blank">${o(t.doi)}</a>`:"",it=`${pe}${tt}${at}${rt}`,me=[];i.received&&me.push(`Received: ${i.received}`),i.revised&&me.push(`Revised: ${i.revised}`),i.accepted&&me.push(`Accepted: ${i.accepted}`),i.published&&me.push(`Published: ${i.published}`);const je=me.join(" | ");let De="";const Ne=c.license||"CC-BY-NC-SA-4.0";if(Ne.startsWith("CC-")){const p=Ne.replace("CC-","").replace("-4.0","").toLowerCase();De=`<a href="https://creativecommons.org/licenses/${p}/4.0/" target="_blank" style="display:inline-block; margin-top:0.5rem;">
      <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/${p}.svg" alt="Creative Commons License" style="height:31px; border:none;"/>
    </a>`}let Pe="";const we=(p,I=!1)=>{if(p.hidden)return"";const W=I?"th":"td",Z=p.align?`text-align:${p.align}`:"",V=p.bold?"font-weight:bold;":"",x=p.italic?"font-style:italic;":"",X=p.underline?"text-decoration:underline;":"",J=[Z,V,x,X].filter(Boolean).join(";");let A=re(p.text||"");A=A.replace(/&lt;sup&gt;/gi,"<sup>").replace(/&lt;\/sup&gt;/gi,"</sup>"),A=A.replace(/&lt;sub&gt;/gi,"<sub>").replace(/&lt;\/sub&gt;/gi,"</sub>"),A=A.replace(/&lt;b&gt;/gi,"<b>").replace(/&lt;\/b&gt;/gi,"</b>"),A=A.replace(/&lt;i&gt;/gi,"<i>").replace(/&lt;\/i&gt;/gi,"</i>"),A=A.replace(/&lt;u&gt;/gi,"<u>").replace(/&lt;\/u&gt;/gi,"</u>"),p.bold&&(A=`<strong>${A}</strong>`),p.italic&&(A=`<em>${A}</em>`),p.underline&&(A=`<u>${A}</u>`),p.superscript&&(A=`<sup>${A}</sup>`),p.subscript&&(A=`<sub>${A}</sub>`);const z=p.colspan&&p.colspan>1?` colspan="${p.colspan}"`:"",ae=p.rowspan&&p.rowspan>1?` rowspan="${p.rowspan}"`:"";return`<${W}${z}${ae} ${J?`style="${J}"`:""}>${A}</${W}>`},st=p=>{if(!p||!p.text)return"";const I=String(p.text),W=/(?:doi:\s*)?(?:https?:\/\/(?:dx\.)?doi\.org\/)?\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi;let Z=re(I).replace(W,(V,x)=>`doi:<a href="https://doi.org/${x}" target="_blank">${x}</a>`);if(p.url){const V=String(p.url).trim();if(/doi\.org/i.test(V)||V.startsWith("10.")){const X=V.replace(/^(?:https?:\/\/doi\.org\/|doi:\s*)/i,"");if(!I.includes(X)){const J=`https://doi.org/${X}`;Z+=` doi:<a href="${re(J)}" target="_blank">${re(X)}</a>`}}else I.includes(V)||(Z+=` <a href="${re(V)}" target="_blank">${re(V)}</a>`)}return Z};return m.forEach(p=>{let I=p.content||"";const W=[];p.tables&&p.tables.length&&p.tables.forEach((x,X)=>{const J=x.manualNumber||X+1,A=x.fontSize?` style="font-size: ${x.fontSize}pt;"`:"";let z=`
        <div class="table-container" id="tbl-${p.id}-${X}"${A}>
          <div class="table-caption"><strong>Table ${o(J)}:</strong> ${o(x.caption)}</div>
          <div class="table-scroll">
            <table>`;x.headers&&x.headers.length&&(z+="<thead>",Array.isArray(x.headers[0])?x.headers.forEach(ae=>{z+="<tr>",ae.forEach(fe=>{z+=we(fe,!0)}),z+="</tr>"}):(z+="<tr>",x.headers.forEach(ae=>{z+=we(ae,!0)}),z+="</tr>"),z+="</thead>"),x.rows&&x.rows.length&&(z+="<tbody>",Array.isArray(x.rows[0])?x.rows.forEach(ae=>{z+="<tr>",ae.forEach((fe,be)=>{const ke=x.headerCol&&be===0;z+=we(fe,ke)}),z+="</tr>"}):x.rows.forEach(ae=>{z+="<tr>";const fe=x.headers.length;for(let be=0;be<fe;be++){const ke=ae[`col-${be}`]||"";z+=we({text:ke},!1)}z+="</tr>"}),z+="</tbody>"),z+=`
            </table>
          </div>`,x.footnote&&(z+=`<div class="table-note">${o(x.footnote)}</div>`),z+="</div>",W.push({num:J,html:z,placed:!1})});const Z=[];p.figures&&p.figures.length&&p.figures.forEach((x,X)=>{const J=X+1,A=`
        <figure class="figure-container" id="fig-${p.id}-${X}">
          <img src="${o(x.url)}" alt="${o(x.alt||x.caption||"")}" class="article-image" />
          <figcaption class="figure-caption"><strong>Figure ${J}:</strong> ${o(x.caption)}</figcaption>
        </figure>`;Z.push({num:J,html:A,placed:!1})}),I=I.replace(/<img\b[^>]*>/gi,""),I=I.replace(/font-family:[^;"]*;?/gi,"").replace(/font-size:[^;"]*;?/gi,"").replace(/text-align:\s*left;?/gi,""),W.forEach(x=>{const X=String(x.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),J=new RegExp(`@\\[Table[\\s:]*${X}\\]`,"gi"),A=I.replace(J,x.html);A!==I&&(I=A,x.placed=!0)}),Z.forEach(x=>{const X=String(x.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),J=new RegExp(`@\\[Figure[\\s:]*${X}\\]`,"gi"),A=I.replace(J,x.html);A!==I&&(I=A,x.placed=!0)});let V="";W.forEach(x=>{x.placed||(V+=x.html)}),Z.forEach(x=>{x.placed||(V+=x.html)}),Pe+=`
    <section class="article-section" id="sec-${p.id}">
      <h2 class="section-title">${o(p.title)}</h2>
      <div class="section-text-content">${I}</div>
      ${V}
    </section>`}),`<!-- Published by Anviksha Publisher | Journal of Public and Clinical Health Research -->
<!DOCTYPE html>
<html lang="${o(t.language||"en")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${o(t.title)}</title>
  <meta name="description" content="${o(Y)}">
  
  <!-- Canonical and alternate links -->
  <link rel="canonical" href="${o(q)}">
  <link rel="alternate" type="application/pdf" href="${o(F)}">
  
  <!-- Google Scholar Metadata Tags -->
  <meta name="citation_title" content="${o(t.title)}">
${y}  <meta name="citation_publication_date" content="${o(u)}">
  <meta name="citation_journal_title" content="${o(e.title)}">
  <meta name="citation_journal_abbrev" content="${o(e.abbreviation)}">
  <meta name="citation_volume" content="${o(t.volume)}">
  <meta name="citation_issue" content="${o(t.issue)}">
  <meta name="citation_firstpage" content="${o(ne)}">
  <meta name="citation_lastpage" content="${o(t.lpage)}">
  <meta name="citation_article_type" content="${o(w(t.type))}">
${B}  <meta name="citation_issn" content="${o(O)}">
  <meta name="citation_publisher" content="${o(e.publisher)}">
  <meta name="citation_language" content="${o(t.language)}">
  <meta name="citation_pdf_url" content="${o(F)}">
  <meta name="citation_fulltext_html_url" content="${o(q)}">
  
  <!-- Open Graph Metadata -->
  <meta property="og:title" content="${o(t.title)}">
  <meta property="og:description" content="${o(Y)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${o(q)}">
  <meta property="og:site_name" content="${o(e.title)}">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(j,null,2)}
  <\/script>

  <!-- Typography and styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --primary: #022744;
      --primary-hover: #0a4a7a;
      --text: #2c3e50;
      --text-light: #7f8c8d;
      --bg: #ffffff;
      --border: #eaedf1;
      --surface: #f8f9fa;
    }

    * {
      box-sizing: border-box;
    }

    html, body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
      line-height: 1.4;
      margin: 30px auto;
      padding: 0 20px;
      max-width: 100%;
      width: 850px;
      box-sizing: border-box;
      text-align: justify;
      hyphens: none;
      word-break: break-word;
      font-size: 14px;
      background: #fff;
      color: #111;
    }

    * {
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    }

    .section-text-content, .section-text-content p {
      text-align: justify;
    }

    @media print {
      body {
        background-color: white !important;
        color: black !important;
      }
      .galley-wrapper {
        margin: 0 !important;
        box-shadow: none !important;
        max-width: 100% !important;
        padding: 0 !important;
      }
      .table-scroll {
        overflow-x: visible !important;
      }
      @page {
        margin: 1in;
      }
    }

    .galley-wrapper {
      max-width: 100%;
      width: 850px;
      margin: 0 auto !important;
      box-sizing: border-box;
      position: relative;
    }

    /* PMC-style Section Sidebar Index */
    .section-index {
      position: fixed;
      right: 20px;
      top: 100px;
      width: 200px;
      max-height: calc(100vh - 200px);
      overflow-y: auto;
      font-size: 0.85rem;
      border-left: 2px solid var(--primary);
      padding-left: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sidebar-link {
      color: var(--text-light);
      text-decoration: none;
      transition: color 0.2s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-link:hover {
      color: var(--primary);
    }

    @media (max-width: 1200px) {
      .section-index {
        display: none; /* Hide sidebar on narrower viewports */
      }
    }

    /* Header styling */
    .article-header {
      border-bottom: 2px solid var(--primary);
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }

    .journal-logo-wrap {
      margin-bottom: 1.5rem;
      max-width: 400px;
    }

    .journal-logo {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .article-type {
      color: var(--primary);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .article-metadata-line {
      font-size: 0.85rem;
      color: var(--text-light);
      margin-bottom: 0.5rem;
    }

    .article-metadata-line a {
      color: var(--primary);
      text-decoration: none;
    }

    .article-metadata-line a:hover {
      text-decoration: underline;
    }

    .article-title {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary);
      margin: 0.75rem 0 0.5rem 0;
    }

    .article-subtitle {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-light);
      margin: 0 0 1.5rem 0;
      line-height: 1.25;
    }

    /* Authors & Affiliations */
    .authors-block {
      margin-bottom: 1rem;
    }

    .author-name {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .orcid-icon {
      vertical-align: middle;
      margin-bottom: 3px;
    }

    .affiliations-block {
      font-size: 0.85rem;
      color: var(--text-light);
      margin-bottom: 1.5rem;
      border-left: 3px solid var(--border);
      padding-left: 10px;
    }

    .affiliation-line {
      line-height: 1.25;
    }

    /* Sections */
    .article-section { margin-bottom: 2rem; font-size: 10pt; line-height: 1.6; }
    .article-section p { margin-bottom: 4px; margin-top: 4px; }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary);
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.3rem;
      margin-top: 1.75rem;
      margin-bottom: 0.75rem;
    }

    .section-text-content {
      line-height: 1.5;
      text-align: justify;
      font-size: 14px;
    }

    /* Force consistent fonts, overriding pasted inline styles */
    .section-text-content * {
      font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    }
    
    .section-text-content p, 
    .section-text-content span, 
    .section-text-content div {
      font-size: 14px !important;
      line-height: 1.5 !important;
    }
    
    .section-text-content sup, 
    .section-text-content sub {
      font-size: 0.8em !important;
      line-height: 0 !important;
    }

    /* Tables */
    .table-container {
      margin: 1.5rem 0;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }

    .table-caption {
      padding: 0.75rem 1rem;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
    }

    .table-scroll {
      overflow-x: auto;
    }

    table {
      width: 100%;
      min-width: 100%;
      max-width: 1050px; /* Limits horizontal expansion to ~20% extra */
      border-collapse: collapse;
      font-size: 12px !important; /* Smaller text for tables */
      table-layout: auto;
    }

    table * {
      font-size: 12px !important; /* Enforce smaller size on all table elements */
    }

    th, td {
      border: 1px solid var(--border);
      padding: 0.5rem 0.75rem;
      vertical-align: top;
      word-wrap: break-word; /* Re-enable text wrapping */
      min-width: 80px; /* Prevent extreme squishing of narrow columns */
    }

    th {
      background-color: var(--surface);
      font-weight: 600;
    }

    .table-note {
      padding: 0.75rem 1rem;
      background: var(--surface);
      border-top: 1px solid var(--border);
      font-size: 0.85rem;
      color: var(--text-light);
    }

    /* Figures */
    .figure-container {
      margin: 2rem 0;
      text-align: center;
    }

    .article-image {
      max-width: 100%;
      height: auto;
      border: 1px solid var(--border);
      border-radius: 8px;
    }

    .figure-caption {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-light);
    }

    /* References */
    .references-list {
      list-style: decimal;
      padding-left: 1.5rem;
      margin-top: 1rem;
      font-size: 9.5pt;
    }

    .reference-item {
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .reference-item a {
      color: var(--primary);
      text-decoration: none;
    }

    .reference-item a:hover {
      text-decoration: underline;
    }

    /* Footer */
    .article-footer {
      border-top: 2px solid var(--primary);
      padding-top: 1.5rem;
      margin-top: 3rem;
      font-size: 0.85rem;
      color: var(--text-light);
    }
  </style>
</head>
<body>
  <div class="galley-wrapper">
    <!-- Section Sidebar (Index) -->
    <nav class="section-index">
      <div style="font-weight:700; color:var(--primary); margin-bottom:5px;">Section Index</div>
${H}    </nav>

    <!-- Header -->
    <header class="article-header">
      ${e.logo_url?`
      <div class="journal-logo-wrap">
        <a href="${o(e.website_url)}" target="_blank">
          <img src="${o(e.logo_url)}" alt="${o(e.title)}" class="journal-logo" />
        </a>
      </div>`:""}
      
      <div class="article-type">${o(w(t.type))}</div>
      <div class="article-metadata-line">${it}</div>
      ${je?`<div class="article-metadata-line">${je}</div>`:""}
      
      <h1 class="article-title">${o(t.title)}</h1>
      ${t.subtitle?`<h2 class="article-title-subtitle" style="font-size:1.4rem; font-weight:500; color:var(--text-light); margin:0 0 1.5rem 0;">${o(t.subtitle)}</h2>`:""}
      
      <!-- Authors -->
      <div class="authors-block">
        ${g}
      </div>

      <!-- Affiliations -->
      <div class="affiliations-block">
        ${h}
        ${_}
      </div>
    </header>

    <!-- Abstract -->
    ${l.content?`
    <section class="article-section" id="abstract">
      <h2 class="section-title">Abstract</h2>
      <div class="section-text-content">${l.content}</div>
    </section>`:""}

    <!-- Keywords -->
    ${d.length?`
    <div class="keywords-block" style="margin-bottom:2rem; font-size:0.95rem; font-style:italic;">
      <strong>Keywords:</strong> ${d.map(p=>o(p)).join(", ")}
    </div>`:""}

    <!-- Main Content Body -->
    ${Pe}

    <!-- References -->
    ${f.length?`
    <section class="article-section" id="references">
      <h2 class="section-title">References</h2>
      <ol class="references-list">
        ${f.map(p=>`
          <li class="reference-item">
            ${st(p)}
          </li>
        `).join("")}
      </ol>
    </section>`:""}

    <!-- Footer -->
    <footer class="article-footer">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
        <div>
          © ${o(c.year)} ${o(c.holder||"The Author(s)")}. Published by ${o(e.publisher||"Anviksha Publisher")} on behalf of the ${o(e.title||"Journal of Public and Clinical Health Research")}.
          <br/><br/>
          This is an Open Access article distributed under the terms of the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0), which permits non-commercial use, distribution, and reproduction in any medium, provided the original author(s) and source are credited, and any derivative works are distributed under the same license.
        </div>
        <div>
          ${De}
        </div>
      </div>
    </footer>
  </div>
</body>
</html>`}function Zt(){const a=n.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],s=a.affiliations||[],i=a.dates||{},l=a.abstract||{},d=a.keywords||[],c=a.copyright||{},m=a.sections||[],f=a.references||[],o=u=>{if(u==null)return"";const b=String(u),j=ft(b);return Be(j)},w=u=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[u]||u||"Research Article",M=u=>{if(!u)return"";const j=new DOMParser().parseFromString(u,"text/html"),B={b:"bold",strong:"bold",i:"italic",em:"italic",u:"underline",sub:"sub",p:"p",ul:"list",ol:"list",li:"list-item"},O=(D,S=!1)=>{if(D.nodeType===3)return Be(D.textContent);if(D.nodeType!==1)return"";const g=D.tagName.toLowerCase();let h="";const _=g==="p";for(const E of D.childNodes)h+=O(E,S||_);if(g==="sup"){const E=D.textContent.trim();return/^\[\s*\d[\d,\s-]*\]$/.test(E)?`<xref ref-type="bibr">${h}</xref>`:`<sup>${h}</sup>`}if(g==="br")return" ";if(g==="ul")return`<list list-type="bullet">${h}</list>`;if(g==="ol")return`<list list-type="order">${h}</list>`;if(g==="li")return h.trim().startsWith("<p>")||(h=`<p>${h}</p>`),`<list-item>${h}</list-item>`;if(B[g]){const E=B[g];return E==="p"?S?h:h.trim()?`<p>${h}</p>`:"":`<${E}>${h}</${E}>`}return h};let y="";for(const D of j.body.childNodes)y+=O(D,!1);const H=y.trim();return H&&!H.startsWith("<p>")&&!H.startsWith("<list")&&(y=`<p>${y}</p>`),y},v=u=>{let b=M(u.text||"");return b=b.replace(/^<p>(.*)<\/p>$/is,"$1"),u.bold&&(b=`<bold>${b}</bold>`),u.italic&&(b=`<italic>${b}</italic>`),u.underline&&(b=`<underline>${b}</underline>`),u.superscript&&(b=`<sup>${b}</sup>`),u.subscript&&(b=`<sub>${b}</sub>`),b},q=u=>{if(!u)return null;const b=u.split("-");return b.length===3?{year:b[0],month:b[1],day:b[2]}:null},R=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Published by Anviksha Publisher | Journal of Public and Clinical Health Research -->
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Archiving and Interchange DTD v1.3 20210610//EN" "JATS-archivearticle1-3.dtd">
<article dtd-version="1.3" xml:lang="${o(t.language||"en")}" xmlns:ali="http://www.niso.org/schemas/ali/1.0/" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink">
  <front>
    <journal-meta>
      <journal-id journal-id-type="publisher-id">${o(e.abbreviation||"journal")}</journal-id>
      <journal-title-group>
        <journal-title>${o(e.title)}</journal-title>
        ${e.abbreviation?`<journal-subtitle>${o(e.abbreviation)}</journal-subtitle>`:""}
      </journal-title-group>
      ${e.issn_print?`<issn pub-type="ppub">${o(e.issn_print)}</issn>`:""}
      ${e.issn_online?`<issn pub-type="epub">${o(e.issn_online)}</issn>`:""}
      <publisher>
        <publisher-name>${o(e.publisher)}</publisher-name>
      </publisher>
    </journal-meta>
    <article-meta>
      ${t.article_id?`<article-id pub-id-type="publisher-id">${o(t.article_id)}</article-id>`:""}
      ${t.doi?`<article-id pub-id-type="doi">${o(t.doi)}</article-id>`:""}
      
      <article-categories>
        <subj-group subj-group-type="heading">
          <subject>${o(w(t.type))}</subject>
        </subj-group>
      </article-categories>
      
      <title-group>
        <article-title>${o(t.title)}</article-title>
        ${t.subtitle?`<subtitle>${o(t.subtitle)}</subtitle>`:""}
      </title-group>

      <!-- Contributor list -->
      <contrib-group>
        ${r.map((u,b)=>`
        <contrib contrib-type="author" ${b+1===parseInt(t.correspondence_author,10)?'corresp="yes"':""}>
          <name>
            <surname>${o(u.surname)}</surname>
            <given-names>${o(u.given)}${u.middle?" "+o(u.middle):""}</given-names>
          </name>
          ${u.email?`<email>${o(u.email)}</email>`:""}
          ${u.orcid?`<contrib-id contrib-id-type="orcid">https://orcid.org/${o(u.orcid)}</contrib-id>`:""}
          ${u.affiliation_ids&&u.affiliation_ids.length?u.affiliation_ids.map(B=>`
          <xref ref-type="aff" rid="aff-${B}" />`).join(""):""}
        </contrib>`).join("")}
      </contrib-group>

      <!-- Affiliations -->
      ${s.map((u,b)=>`
      <aff id="aff-${b+1}">
        ${u.ror_id?`<institution-id institution-id-type="ror">${o(u.ror_id)}</institution-id>`:""}
        <institution>${o(u.text)}</institution>
      </aff>`).join("")}

      <!-- Correspondence marker -->
      ${(()=>{const u=parseInt(t.correspondence_author,10);if(u>0&&r[u-1]){const b=r[u-1];return`
      <author-notes>
        <corresp id="cor1">*Correspondence: ${o(b.given)} ${o(b.surname)} <email>${o(b.email)}</email></corresp>
      </author-notes>`}return""})()}

      <!-- Dates -->
      ${(()=>{let u="";const b=q(i.received),j=q(i.accepted),B=q(i.published);return b&&(u+=`
      <history>
        <date date-type="received">
          <day>${b.day}</day>
          <month>${b.month}</month>
          <year>${b.year}</year>
        </date>`),j&&(b||(u+=`
      <history>`),u+=`
        <date date-type="accepted">
          <day>${j.day}</day>
          <month>${j.month}</month>
          <year>${j.year}</year>
        </date>`),(b||j)&&(u+=`
      </history>`),B?u+=`
      <pub-date pub-type="epub">
        <day>${B.day}</day>
        <month>${B.month}</month>
        <year>${B.year}</year>
      </pub-date>`:t.year&&(u+=`
      <pub-date pub-type="collection">
        <year>${o(t.year)}</year>
      </pub-date>`),u})()}

      <!-- Pagination/volume/issue -->
      ${t.volume?`<volume>${o(t.volume)}</volume>`:""}
      ${t.issue?`<issue>${o(t.issue)}</issue>`:""}
      ${t.fpage?`<fpage>${o(t.fpage)}</fpage>`:""}
      ${t.lpage?`<lpage>${o(t.lpage)}</lpage>`:""}
      ${t.elocation_id?`<elocation-id>${o(t.elocation_id)}</elocation-id>`:""}

      <!-- Copyright & Permissions -->
      <permissions>
        <copyright-statement>© ${o(c.year)} ${o(c.holder||e.publisher)}</copyright-statement>
        <copyright-year>${o(c.year)}</copyright-year>
        ${(()=>{const u=c.license||"CC-BY-NC-SA-4.0";return u.startsWith("CC-")?`
        <license license-type="open-access" xlink:href="https://creativecommons.org/licenses/${u.replace("CC-","").replace("-4.0","").toLowerCase()}/4.0/">
          <license-p>This is an open-access article distributed under the terms of the Creative Commons License (${u}).</license-p>
        </license>`:""})()}
      </permissions>

      <!-- Abstract -->
      ${l.content?`
      <abstract>
        ${M(l.content)}
      </abstract>`:""}

      <!-- Keywords -->
      ${d.length?`
      <kwd-group kwd-group-type="author">
        ${d.map(u=>`<kwd>${o(u)}</kwd>`).join(`
        `)}
      </kwd-group>`:""}
    </article-meta>
  </front>

  <body>
    ${m.map(u=>{let b=M(u.content);const j=[];u.tables&&u.tables.length&&u.tables.forEach((y,H)=>{const D=y.manualNumber||H+1;let S=`
      <table-wrap id="tbl-${u.id}-${H}">
        <label>Table ${o(D)}</label>
        <caption><p>${o(y.caption)}</p></caption>
        <table>`;y.headers&&y.headers.length&&(S+=`
          <thead>`,Array.isArray(y.headers[0])?y.headers.forEach(g=>{S+=`
            <tr>`,g.forEach(h=>{if(h.hidden)return;const _=h.align?` align="${h.align}"`:"",E=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",G=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"";S+=`
              <th${_}${E}${G}>${v(h)}</th>`}),S+=`
            </tr>`}):(S+=`
            <tr>`,y.headers.forEach(g=>{if(g.hidden)return;const h=g.align?` align="${g.align}"`:"",_=g.colspan&&g.colspan>1?` colspan="${g.colspan}"`:"",E=g.rowspan&&g.rowspan>1?` rowspan="${g.rowspan}"`:"";S+=`
              <th${h}${_}${E}>${v(g)}</th>`}),S+=`
            </tr>`),S+=`
          </thead>`),y.rows&&y.rows.length&&(S+=`
          <tbody>`,Array.isArray(y.rows[0])?y.rows.forEach(g=>{S+=`
            <tr>`,g.forEach((h,_)=>{if(h.hidden)return;const E=h.align?` align="${h.align}"`:"",G=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",te=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"",oe=y.headerCol&&_===0?"th":"td";S+=`
              <${oe}${E}${G}${te}>${v(h)}</${oe}>`}),S+=`
            </tr>`}):y.rows.forEach(g=>{S+=`
            <tr>`;const h=y.headers.length;for(let _=0;_<h;_++){const E=g[`col-${_}`]!==void 0?{text:g[`col-${_}`]}:{};if(E.hidden)continue;const G=y.headerCol&&_===0?"th":"td",te=E.colspan&&E.colspan>1?` colspan="${E.colspan}"`:"",oe=E.rowspan&&E.rowspan>1?` rowspan="${E.rowspan}"`:"";S+=`
              <${G}${te}${oe}>${v(E)}</${G}>`}S+=`
            </tr>`}),S+=`
          </tbody>`),S+=`
        </table>`,y.footnote&&(S+=`
        <table-wrap-foot>
          <fn id="fn-tbl-${u.id}-${H}">
            <p>${o(y.footnote)}</p>
          </fn>
        </table-wrap-foot>`),S+=`
      </table-wrap>`,j.push({num:D,xml:S,placed:!1})});const B=[];u.figures&&u.figures.length&&u.figures.forEach((y,H)=>{const D=H+1,S=y.base64Data?y.base64Data:o(y.url),g=`
      <fig id="fig-${u.id}-${H}">
        <label>Figure ${D}</label>
        <caption><p>${o(y.caption)}</p></caption>
        <graphic mimetype="image" mime-subtype="png" xlink:href="${S}" />
      </fig>`;B.push({num:D,xml:g,placed:!1})}),j.forEach(y=>{const H=String(y.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),D=new RegExp(`@\\[Table[\\s:]*${H}\\]`,"gi"),S=b.replace(D,y.xml);S!==b&&(b=S,y.placed=!0)}),B.forEach(y=>{const H=String(y.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),D=new RegExp(`@\\[Figure[\\s:]*${H}\\]`,"gi"),S=b.replace(D,y.xml);S!==b&&(b=S,y.placed=!0)}),b=b.replace(/<p>\s*<\/p>/g,"");let O="";return j.forEach(y=>{y.placed||(O+=y.xml)}),B.forEach(y=>{y.placed||(O+=y.xml)}),`
    <sec id="sec-${u.id}">
      <title>${o(u.title)}</title>
      ${b}
      ${O}
    </sec>`}).join("")}
  </body>

  <!-- References list -->
  ${f.length?`
  <back>
    <ref-list>
      <title>References</title>
      ${f.map((u,b)=>`
      <ref id="ref-${b+1}">
        <label>${b+1}</label>
        <mixed-citation publication-type="journal">
          ${o(u.text)}
          ${u.url?`<pub-id pub-id-type="doi">${o(String(u.url).replace(/^https?:\/\/doi\.org\//i,""))}</pub-id>`:""}
        </mixed-citation>
      </ref>`).join("")}
    </ref-list>
  </back>`:""}
</article>`.trim(),P=new DOMParser().parseFromString(R,"application/xml").getElementsByTagName("parsererror");if(P.length>0)throw console.error("XML Validation Error:",P[0].textContent),new Error("JATS XML Generation Failed: Invalid XML structure detected.");return R}function Qt(){const a=[],e=n.collectAll(),t=e.journal||{},r=e.article||{},s=e.authors||[],i=e.dates||{},l=e.abstract||{},d=e.keywords||[];return t.title?a.push({status:"pass",message:"Journal Title is set."}):a.push({status:"fail",message:"Journal Title is required."}),!t.issn_print&&!t.issn_online?a.push({status:"warn",message:"Both Print and Online ISSNs are missing."}):a.push({status:"pass",message:"At least one ISSN is set."}),r.title?a.push({status:"pass",message:"Article Title is set."}):a.push({status:"fail",message:"Article Title is required."}),r.doi?/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(r.doi)?a.push({status:"pass",message:"Article DOI is set and format is valid."}):a.push({status:"warn",message:"Article DOI format looks invalid (expected 10.xxxx/yyyy)."}):a.push({status:"fail",message:"Article DOI is required."}),r.article_id?a.push({status:"pass",message:"Article ID is set."}):a.push({status:"fail",message:"Article ID (for file exports) is required."}),s.length?(a.push({status:"pass",message:`Found ${s.length} author(s).`}),s.forEach((c,m)=>{c.orcid&&(/^\d{4}-\d{4}-\d{4}-[\dX]{4}$/i.test(c.orcid)?a.push({status:"pass",message:`Author ${m+1} has a valid ORCID ID.`}):a.push({status:"warn",message:`Author ${m+1} (${c.given||""} ${c.surname||""}) has an invalid ORCID ID format (expected XXXX-XXXX-XXXX-XXXX).`})),c.email||a.push({status:"warn",message:`Author ${m+1} is missing an email address.`})})):a.push({status:"fail",message:"At least one Author is required."}),i.published?a.push({status:"pass",message:"Publication Date is set."}):a.push({status:"warn",message:"Publication Date is missing."}),!l.content||l.content.trim()===""||l.content==="<p><br></p>"?a.push({status:"fail",message:"Article Abstract is required."}):a.push({status:"pass",message:"Abstract content is set."}),d.length?a.push({status:"pass",message:`Found ${d.length} keyword(s).`}):a.push({status:"warn",message:"At least one keyword should be added."}),a}function ea(a){const e=[];if(!a)return[{status:"fail",message:"XML string is empty."}];a.includes("&nbsp;")?e.push({status:"fail",message:"XML contains raw &nbsp; entities, which will trigger parse errors. Replace with regular spaces."}):e.push({status:"pass",message:"No unescaped HTML-only entities (&nbsp;) detected."});try{const r=new DOMParser().parseFromString(a,"text/xml"),s=r.querySelector("parsererror");if(s)return e.push({status:"fail",message:`XML Parser Error: ${s.textContent}`}),e;e.push({status:"pass",message:"XML is well-formed and parses successfully."});const i=r.querySelector("front"),l=r.querySelector("body");i||e.push({status:"fail",message:"JATS XML is missing <front> tag."}),l||e.push({status:"warn",message:"JATS XML is missing <body> tag."}),r.querySelector('article-meta > article-id[pub-id-type="doi"]')?e.push({status:"pass",message:"JATS XML contains article DOI."}):e.push({status:"fail",message:"Missing DOI article-id tag in article-meta."}),r.querySelector("title-group > article-title")||e.push({status:"fail",message:"Missing <article-title> in JATS XML."}),r.querySelectorAll('contrib-group > contrib[contrib-type="author"]').length===0&&e.push({status:"fail",message:"Missing contributor/author entries in JATS XML."})}catch(t){e.push({status:"fail",message:`Critical error during XML parsing: ${t.message}`})}return e}function ta(a){const e=[];if(!a)return[{status:"fail",message:"HTML string is empty."}];try{const r=new DOMParser().parseFromString(a,"text/html");r.querySelector('meta[name="citation_title"]')?e.push({status:"pass",message:"Has citation_title meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_title meta tag."});const i=r.querySelectorAll('meta[name="citation_author"]');i.length===0?e.push({status:"fail",message:"Missing Google Scholar citation_author meta tags."}):e.push({status:"pass",message:`Found ${i.length} citation_author meta tag(s).`}),r.querySelector('meta[name="citation_doi"]')?e.push({status:"pass",message:"Has citation_doi meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_doi meta tag."}),r.querySelector('meta[name="citation_pdf_url"]')?e.push({status:"pass",message:"Has citation_pdf_url meta tag."}):e.push({status:"warn",message:"Missing Google Scholar citation_pdf_url meta tag."}),r.querySelector('link[rel="canonical"]')?e.push({status:"pass",message:"Has canonical URL link."}):e.push({status:"fail",message:"Missing Canonical URL link tag."});const m=r.querySelector('meta[property="og:title"]'),f=r.querySelector('meta[property="og:description"]');!m||!f?e.push({status:"warn",message:"Missing Open Graph meta tags (og:title, og:description)."}):e.push({status:"pass",message:"Has Open Graph metadata."});const o=r.querySelector('script[type="application/ld+json"]');if(!o)e.push({status:"fail",message:"Missing Schema.org JSON-LD structured data block."});else try{JSON.parse(o.textContent)["@type"]!=="ScholarlyArticle"?e.push({status:"warn",message:"Schema.org @type is not set to ScholarlyArticle."}):e.push({status:"pass",message:"Has valid Schema.org JSON-LD scholarly article markup."})}catch(v){e.push({status:"fail",message:`Schema.org JSON-LD script contains invalid JSON: ${v.message}`})}const w=r.querySelector("title");(!w||!w.textContent.trim())&&e.push({status:"fail",message:"HTML document title is empty or missing."}),r.querySelector("h1")||e.push({status:"warn",message:"Missing article title header (h1)."})}catch(t){e.push({status:"fail",message:`Critical error during HTML validation: ${t.message}`})}return e}let k=null,de="",ue="",_e=null;function aa(a){k=a,Ie(),n.on("change",ra),n.on("load",()=>{Ie(),Ae()}),n.on("reset",()=>{Ie(),ia()})}function Ie(){k&&(k.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Generate Galleys</h2>
        <p class="card-description">
          Generate publication-ready HTML galleys and JATS XML files. Run validation to ensure completeness.
        </p>
      </div>
      <div class="card-body">
        <div class="btn-row" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.5rem;">
          <button class="btn btn-primary" id="btn-generate-all" style="background:#022744;">
            <span class="icon">⚙️</span> Generate Outputs
          </button>
          <button class="btn btn-secondary" id="btn-download-html" disabled>
            <span class="icon">📥</span> Download HTML
          </button>
          <button class="btn btn-secondary" id="btn-download-xml" disabled>
            <span class="icon">📥</span> Download JATS XML
          </button>
          <button class="btn btn-secondary" id="btn-validate">
            <span class="icon">🔍</span> Validate
          </button>
          <label style="display:inline-flex; align-items:center; margin-left:auto; font-size:0.9rem; cursor:pointer;">
            <input type="checkbox" id="chk-live-preview" checked style="margin-right:0.4rem;" />
            Live Preview
          </label>
        </div>

        <!-- Validation Results Area -->
        <div id="validation-panel" class="card" style="display:none; background:var(--surface-alt); border:1px solid var(--border-color); margin-bottom:1.5rem; padding:1rem;">
          <h3 style="margin-top:0; margin-bottom:0.75rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem; color:#022744;">
            <span>📋</span> Validation Results
          </h3>
          <div id="validation-list" style="display:flex; flex-direction:column; gap:0.4rem; max-height:200px; overflow-y:auto; font-size:0.9rem;">
            <!-- filled by validation -->
          </div>
        </div>

        <!-- Preview Pane -->
        <div class="preview-container" style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; min-height:500px;">
          <!-- Left: HTML preview -->
          <div class="preview-pane" style="border:1px solid var(--border-color); border-radius:8px; display:flex; flex-direction:column; background:var(--bg);">
            <div class="preview-pane-header" style="padding:0.5rem 1rem; background:var(--surface-alt); border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:0.9rem; color:#022744;">HTML Galley Preview</span>
              <div>
                <button class="btn btn-xs btn-secondary" id="btn-fullscreen-html" disabled title="View Full Screen">⛶</button>
                <button class="btn btn-xs btn-secondary" id="btn-copy-html" disabled>Copy HTML</button>
              </div>
            </div>
            <div class="preview-pane-body" style="flex:1; display:flex; position:relative; min-height:450px;">
              <iframe id="html-preview-frame" style="width:100%; border:none; background:white; min-height:450px;"></iframe>
            </div>
          </div>

          <!-- Right: XML preview -->
          <div class="preview-pane" style="border:1px solid var(--border-color); border-radius:8px; display:flex; flex-direction:column; background:var(--bg);">
            <div class="preview-pane-header" style="padding:0.5rem 1rem; background:var(--surface-alt); border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:0.9rem; color:#022744;">JATS XML Preview</span>
              <button class="btn btn-xs btn-secondary" id="btn-copy-xml" disabled>Copy XML</button>
            </div>
            <div class="preview-pane-body" style="flex:1; overflow:auto; background:#1e1e1e; color:#d4d4d4; padding:1rem; font-family:'Consolas', 'JetBrains Mono', monospace; font-size:0.8rem; line-height:1.4; min-height:450px; max-height:500px;">
              <pre style="margin:0;"><code id="xml-preview-code"></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,k.querySelector("#btn-generate-all").addEventListener("click",()=>{Ae(),L("Outputs generated")}),k.querySelector("#btn-download-html").addEventListener("click",oa),k.querySelector("#btn-download-xml").addEventListener("click",na),k.querySelector("#btn-validate").addEventListener("click",sa),k.querySelector("#btn-copy-html").addEventListener("click",()=>{Ge(de,"HTML source copied to clipboard")}),k.querySelector("#btn-copy-xml").addEventListener("click",()=>{Ge(ue,"JATS XML source copied to clipboard")}),k.querySelector("#btn-fullscreen-html").addEventListener("click",()=>{const a=k.querySelector("#html-preview-frame");a&&a.requestFullscreen&&a.requestFullscreen()}))}function ra(){var e;(e=k==null?void 0:k.querySelector("#chk-live-preview"))!=null&&e.checked&&(_e&&clearTimeout(_e),_e=setTimeout(()=>{Ae(!0)},500))}function Ae(a=!1){if(k)try{de=Kt(),ue=Zt(),k.querySelector("#btn-download-html").disabled=!1,k.querySelector("#btn-download-xml").disabled=!1,k.querySelector("#btn-copy-html").disabled=!1,k.querySelector("#btn-copy-xml").disabled=!1,k.querySelector("#btn-fullscreen-html").disabled=!1;const e=k.querySelector("#html-preview-frame");if(e){const r=e.contentDocument||e.contentWindow.document;r.open(),r.write(de),r.close()}const t=k.querySelector("#xml-preview-code");t&&(t.innerHTML=mt(ue))}catch(e){a||L("Error generating outputs: "+e.message,"error"),console.error(e)}}function ia(){if(!k)return;k.querySelector("#btn-download-html").disabled=!0,k.querySelector("#btn-download-xml").disabled=!0,k.querySelector("#btn-copy-html").disabled=!0,k.querySelector("#btn-copy-xml").disabled=!0;const a=k.querySelector("#html-preview-frame");if(a){const t=a.contentDocument||a.contentWindow.document;t.open(),t.write('<html><body><div style="font-family:sans-serif; color:#7f8c8d; text-align:center; margin-top:100px;">Click Generate to preview</div></body></html>'),t.close()}const e=k.querySelector("#xml-preview-code");e&&(e.innerHTML=""),k.querySelector("#validation-panel").style.display="none"}function sa(){if(!k)return;(!de||!ue)&&Ae(!0);const a=k.querySelector("#validation-panel"),e=k.querySelector("#validation-list");a.style.display="block";const t=Qt(),r=ea(ue),s=ta(de),i=[...t.map(c=>({...c,category:"Metadata"})),...r.map(c=>({...c,category:"JATS XML"})),...s.map(c=>({...c,category:"HTML Galley"}))];let l="";i.forEach(c=>{let m="✅",f="#2ecc71",o="#e8f8f5";c.status==="fail"?(m="❌",f="#e74c3c",o="#fdebd0"):c.status==="warn"&&(m="⚠️",f="#f39c12",o="#fef9e7"),l+=`
      <div style="display:flex; align-items:center; gap:0.5rem; padding:0.4rem 0.8rem; border-radius:6px; background:${o}; color:#333; margin-bottom:0.2rem; border-left:4px solid ${f};">
        <span style="font-size:1.1rem;">${m}</span>
        <span style="font-weight:600; font-size:0.8rem; color:${f}; min-width:80px; text-transform:uppercase;">[${c.category}]</span>
        <span style="font-size:0.85rem;">${re(c.message)}</span>
      </div>
    `}),e.innerHTML=l,i.some(c=>c.status==="fail")?L("Validation failed with errors. Check details below.","error"):L("Validation passed with success or warnings.","success")}function oa(){const a=n.get("journal.abbreviation")||"journal",e=n.get("article.article_id")||"galley",t=`${a}.${e}.html`.toLowerCase(),r=new Blob([de],{type:"text/html;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),L(`HTML downloaded as ${t}`)}function na(){const a=n.get("journal.abbreviation")||"journal",e=n.get("article.article_id")||"galley",t=`${a}.${e}.xml`.toLowerCase(),r=new Blob([ue],{type:"text/xml;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),L(`JATS XML downloaded as ${t}`)}function Ge(a,e){navigator.clipboard.writeText(a).then(()=>{L(e)}).catch(t=>{console.error("Failed to copy to clipboard:",t),L("Failed to copy to clipboard","error")})}function L(a,e="success"){const t=document.getElementById("toast-container");if(!t)return;const r=document.createElement("div");r.className=`toast toast-${e}`,r.style.padding="0.75rem 1.25rem",r.style.borderRadius="8px",r.style.fontSize="0.9rem",r.style.color="white",r.style.animation="slideIn 0.3s ease-out",r.style.boxShadow="0 4px 6px rgba(0,0,0,0.1)";let s="#10b981";e==="error"?s="#ef4444":e==="warning"?s="#f59e0b":e==="info"&&(s="#022744"),r.style.background=s,r.textContent=a,t.appendChild(r),setTimeout(()=>{r.style.animation="slideOut 0.3s ease-in forwards",r.addEventListener("animationend",()=>r.remove())},1e3)}function We(){la(),ca(),da(),lt(document.getElementById("panel-journal-profile")),yt(document.getElementById("panel-metadata")),qt(document.getElementById("panel-import")),Mt(document.getElementById("panel-body")),Ut(document.getElementById("panel-references")),aa(document.getElementById("panel-generate")),L("GalleyForge initialized successfully","info")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",We):We();function la(){const a=document.documentElement,e=localStorage.getItem("galley-theme")||"dark-gray";a.setAttribute("data-theme",e),et(e),document.getElementById("theme-toggle-light").addEventListener("click",()=>{Ve("light")}),document.getElementById("theme-toggle-dark").addEventListener("click",()=>{Ve("dark-gray")})}function Ve(a){document.documentElement.setAttribute("data-theme",a),localStorage.setItem("galley-theme",a),et(a),L(`Switched to ${a==="light"?"Light":"Dark Gray"} theme`,"info")}function et(a){const e=document.getElementById("theme-toggle-light"),t=document.getElementById("theme-toggle-dark");a==="light"?(e.classList.add("active"),t.classList.remove("active")):(e.classList.remove("active"),t.classList.add("active"))}function ca(){const a=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".tab-panel");a.forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.tab;a.forEach(s=>s.classList.remove("active")),t.classList.add("active"),e.forEach(s=>{s.id===r?(s.classList.add("active"),s.style.display="block"):(s.classList.remove("active"),s.style.display="none")})})}),e.forEach(t=>{t.id==="panel-metadata"?(t.classList.add("active"),t.style.display="block"):t.style.display="none"})}function da(){const a=document.getElementById("btn-save-project"),e=document.getElementById("btn-load-project"),t=document.getElementById("file-load-project");a.addEventListener("click",()=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(n.toJSON()),s=document.createElement("a");s.setAttribute("href",r);const i=n.get("article.article_id")||"project";s.setAttribute("download",`${i}-galleyforge.json`),document.body.appendChild(s),s.click(),s.remove(),L("Project saved successfully")}),e.addEventListener("click",()=>t.click()),t.addEventListener("change",r=>{const s=r.target.files[0];if(!s)return;const i=new FileReader;i.onload=function(l){try{n.fromJSON(l.target.result),L("Project loaded successfully")}catch(d){L("Failed to load project: "+d.message,"error")}},i.readAsText(s),r.target.value=""})}
