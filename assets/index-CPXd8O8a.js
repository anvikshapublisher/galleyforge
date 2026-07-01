(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Te={journal:{title:"",issn_print:"",issn_online:"",publisher:"",abbreviation:"",logo_url:"",website_url:"",doi_prefix:"",base_url:""},article:{title:"",subtitle:"",doi:"",type:"research-article",language:"en",volume:"",issue:"",fpage:"",lpage:"",elocation_id:"",year:"",issue_months:"",article_id:"",correspondence_author:0},authors:[],affiliations:[],dates:{received:"",revised:"",accepted:"",published:""},abstract:{content:""},keywords:[],copyright:{holder:"",year:new Date().getFullYear().toString(),license:"CC-BY-NC-SA-4.0"},sections:[],references:[]};class lt{constructor(){this.listeners={},this.data=JSON.parse(JSON.stringify(Te))}reset(){this.data=JSON.parse(JSON.stringify(Te)),this.data.copyright.year=new Date().getFullYear().toString(),this.emit("reset"),this.emit("change")}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}emit(e){this.listeners[e]&&this.listeners[e].forEach(t=>{try{t()}catch(r){console.error(`Error in listener for event ${e}:`,r)}})}get(e){if(!e)return this.data;const t=e.split(".");let r=this.data;for(const s of t){if(r==null)return;r=r[s]}return r}set(e,t){if(!e)return;const r=e.split(".");let s=this.data;for(let i=0;i<r.length-1;i++){const l=r[i];(s[l]===void 0||s[l]===null)&&(s[l]={}),s=s[l]}s[r[r.length-1]]=t,this.emit("change")}collectAll(){return JSON.parse(JSON.stringify(this.data))}toJSON(){return JSON.stringify(this.data,null,2)}fromJSON(e){try{const t=typeof e=="string"?JSON.parse(e):e;this.data=this.deepMerge(JSON.parse(JSON.stringify(Te)),t),this.emit("load"),this.emit("change")}catch(t){throw console.error("Failed to import JSON data:",t),t}}deepMerge(e,t){if(!t)return e;for(const r of Object.keys(t))t[r]instanceof Object&&!Array.isArray(t[r])?(e[r]||(e[r]={}),this.deepMerge(e[r],t[r])):e[r]=t[r];return e}}const n=new lt,Qe=[{path:"journal.title",label:"Journal Title",required:!0,placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"journal.abbreviation",label:"Journal Abbreviation",placeholder:"e.g., JPCHR"},{path:"journal.issn_print",label:"ISSN (Print)",placeholder:"XXXX-XXXX"},{path:"journal.issn_online",label:"ISSN (Online)",placeholder:"XXXX-XXXX"},{path:"journal.publisher",label:"Publisher Name",placeholder:"e.g., Anviksha Publisher"},{path:"journal.logo_url",label:"Journal Logo URL",placeholder:"https://example.com/logo.png"},{path:"journal.website_url",label:"Journal Website URL",placeholder:"https://example.com"},{path:"journal.base_url",label:"Base URL (for Canonical Links)",placeholder:"https://jpchr.com/jpchr"},{path:"journal.doi_prefix",label:"DOI Prefix",placeholder:"e.g., 10.63486"},{path:"copyright.holder",label:"Copyright Holder",placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"copyright.year",label:"Copyright Year",placeholder:new Date().getFullYear().toString()}],ct=[{value:"CC-BY-4.0",label:"Creative Commons Attribution 4.0 International (CC BY 4.0)"},{value:"CC-BY-NC-4.0",label:"Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"},{value:"CC-BY-NC-SA-4.0",label:"Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)"},{value:"CC-BY-NC-ND-4.0",label:"Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)"},{value:"CC-BY-SA-4.0",label:"Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)"},{value:"CC0-1.0",label:"Creative Commons CC0 1.0 Universal Public Domain Dedication"},{value:"other",label:"Other / Custom License"}];let Q=null;function dt(a){Q=a,ut(),n.on("load",()=>Ee()),n.on("reset",()=>Ee())}function ut(){if(!Q)return;Q.innerHTML=`
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
            ${Qe.map(r=>`
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
                ${ct.map(r=>`
                  <option value="${r.value}">${r.label}</option>
                `).join("")}
              </select>
            </div>
          </div>
        </form>
      </div>

    </div>
  `,Q.querySelectorAll(".profile-input").forEach(r=>{r.addEventListener("input",()=>{const s=r.dataset.path;n.set(s,r.value)})}),Q.querySelector("#btn-download-profile").addEventListener("click",pt);const e=Q.querySelector("#btn-upload-profile"),t=Q.querySelector("#file-upload-profile");e.addEventListener("click",()=>t.click()),t.addEventListener("change",mt),Q.querySelector("#btn-apply-profile").addEventListener("click",ft),Ee()}function Ee(){if(!Q)return;Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path,r=n.get(t);e.value=r!==void 0?r:""})}function pt(){const a={};Qe.forEach(r=>{a[r.path]=n.get(r.path)||""}),a["copyright.license"]=n.get("copyright.license")||"CC-BY-NC-SA-4.0";const e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(a,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","journal-profile.json"),document.body.appendChild(t),t.click(),t.remove(),L("Journal profile downloaded")}function mt(a){const e=a.target.files[0];if(!e)return;const t=new FileReader;t.onload=function(r){try{const s=JSON.parse(r.target.result);for(const[i,l]of Object.entries(s))n.set(i,l);Ee(),L("Journal profile uploaded successfully")}catch(s){L("Failed to parse profile JSON","error"),console.error(s)}},t.readAsText(e),a.target.value=""}function ft(){Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path;n.set(t,e.value)}),n.emit("load"),L("Profile applied to project successfully")}function He(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function re(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bt(a){if(!a)return"";let e=re(a);return e=e.replace(/&lt;(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*&quot;[^&]*?&quot;)*)\s*(\/?)\s*&gt;/g,(t,r,s,i,l)=>{let d="";return i&&(d=i.replace(/([\w:.-]+)\s*=\s*&quot;([^&]*?)&quot;/g,(c,m,f)=>` <span style="color:#4ec9b0">${m}</span>=<span style="color:#ce9178">&quot;${f}&quot;</span>`)),`<span style="color:#569cd6">&lt;${r}${s}</span>${d}<span style="color:#569cd6">${l}&gt;</span>`}),e}function Re(){const a=new Uint8Array(4);return crypto.getRandomValues(a),Array.from(a,e=>e.toString(16).padStart(2,"0")).join("")}function et(a){if(!a)return"";let e=a;const t=e.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);t&&(e=t[1]),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->/gi,""),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?endif-->/gi,"");const s=new DOMParser().parseFromString(e,"text/html"),i=new Set(["p","b","strong","i","em","u","sup","sub","h1","h2","h3","h4","ul","ol","li","br","table","tr","td","th","tbody","thead"]),l=new Set(["p","h1","h2","h3","h4","ul","ol","li","table","tbody","thead","tr","td","th"]),d=S=>{if(S.nodeType===3)return S.textContent=S.textContent.replace(/\u00A0/g," "),S;if(S.nodeType!==1)return null;const I=S.tagName.toLowerCase();let v=I;if(I==="span"||I==="font"){const j=(S.getAttribute("style")||"").toLowerCase();j.includes("vertical-align: super")||j.includes("vertical-align:super")||j.includes("mso-text-raise")?v="sup":(j.includes("vertical-align: sub")||j.includes("vertical-align:sub"))&&(v="sub")}v==="strong"&&(v="b"),v==="em"&&(v="i");let _;if(i.has(v)){if(_=s.createElement(v),v==="td"||v==="th"){const j=S.getAttribute("colspan"),k=S.getAttribute("rowspan");j&&_.setAttribute("colspan",j),k&&_.setAttribute("rowspan",k)}}else _=s.createDocumentFragment();const O=Array.from(S.childNodes);for(const j of O){const k=d(j);k&&(k.nodeType===1&&l.has(k.tagName.toLowerCase())&&l.has(v),_.appendChild(k))}return _.nodeType===1&&v!=="br"&&!["td","th","tr","table","tbody","thead"].includes(v)&&(!_.hasChildNodes()||_.textContent.trim()==="")?null:_},c=s.createDocumentFragment(),m=Array.from(s.body.childNodes);for(const S of m){const I=d(S);I&&c.appendChild(I)}const f=s.createElement("div");f.appendChild(c);let o=f.innerHTML;return o=o.replace(/<p[^>]*>\s*<p[^>]*>/gi,"<p>"),o=o.replace(/<\/p>\s*<\/p>/gi,"</p>"),o.trim()}function gt(a){if(!a)return"";const e={"&nbsp;":" ","&#160;":" ","&ndash;":"–","&#8211;":"–","&mdash;":"—","&#8212;":"—","&lsquo;":"‘","&#8216;":"‘","&rsquo;":"’","&#8217;":"’","&ldquo;":"“","&#8220;":"“","&rdquo;":"”","&#8221;":"”","&bull;":"•","&#8226;":"•","&hellip;":"…","&#8230;":"…","&trade;":"™","&#8482;":"™","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&deg;":"°","&#176;":"°","&micro;":"µ","&#181;":"µ","&times;":"×","&#215;":"×","&divide;":"÷","&#247;":"÷","&plusmn;":"±","&#177;":"±","&frac12;":"½","&frac14;":"¼","&frac34;":"¾","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&mu;":"μ","&pi;":"π","&sigma;":"σ","&le;":"≤","&ge;":"≥","&ne;":"≠","&infin;":"∞","&rarr;":"→","&larr;":"←","&uarr;":"↑","&darr;":"↓","&para;":"¶","&sect;":"§","&dagger;":"†","&Dagger;":"‡"};let t=a;for(const[r,s]of Object.entries(e)){const i=new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");t=t.replace(i,s)}return t}const ht=[{value:"research-article",label:"Research Article"},{value:"review-article",label:"Review Article"},{value:"case-report",label:"Case Report"},{value:"case-series",label:"Case Series"},{value:"systematic-review",label:"Systematic Review"},{value:"meta-analysis",label:"Meta-Analysis"},{value:"editorial",label:"Editorial"},{value:"letter",label:"Letter to the Editor"},{value:"commentary",label:"Commentary"},{value:"brief-report",label:"Brief Report"},{value:"short-communication",label:"Short Communication"},{value:"clinical-trial",label:"Clinical Trial"},{value:"pilot-study",label:"Pilot Study"},{value:"observational-study",label:"Observational Study"},{value:"cross-sectional",label:"Cross-Sectional Study"},{value:"cohort-study",label:"Cohort Study"},{value:"narrative-review",label:"Narrative Review"},{value:"rapid-communication",label:"Rapid Communication"},{value:"erratum",label:"Erratum"},{value:"retraction",label:"Retraction"}],vt=a=>{const e=ht.find(t=>t.value===a||t.label===a);return e?e.label:a||"Research Article"},yt=[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"pt",label:"Portuguese"},{value:"zh",label:"Chinese"},{value:"ja",label:"Japanese"},{value:"ko",label:"Korean"},{value:"ar",label:"Arabic"},{value:"hi",label:"Hindi"}],xt=[8,9,10,11,12,14,16,18,20,22,24];let U=null;function $t(a){U=a,ie(),n.on("load",()=>ie()),n.on("reset",()=>ie())}function ie(){if(!U)return;const a=n.get("authors")||[],e=n.get("affiliations")||[],t=n.get("keywords")||[],r=n.get("article.correspondence_author")||0;U.innerHTML=`
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
            <input type="text" class="form-control store-bind" data-path="article.type" value="${C(vt(n.get("article.type")))}" placeholder="e.g., Research Article" />
          </div>

          <div class="form-group">
            <label class="form-label">Language</label>
            <select class="form-select store-bind" data-path="article.language">
              ${yt.map(d=>`<option value="${d.value}" ${n.get("article.language")===d.value?"selected":""}>${d.label}</option>`).join("")}
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
          ${a.map((d,c)=>wt(d,c)).join("")}
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
          ${e.map((d,c)=>St(d,c)).join("")}
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
              ${xt.map(d=>`<option value="${d}">${d}pt</option>`).join("")}
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
  `,U.querySelectorAll(".store-bind").forEach(d=>{d.addEventListener("input",()=>{const c=d.dataset.path;n.set(c,d.value)})}),U.querySelector("#btn-add-author").addEventListener("click",Ct),Lt(),U.querySelector("#select-corr-author").addEventListener("change",d=>{n.set("article.correspondence_author",parseInt(d.target.value,10))}),U.querySelector("#btn-add-affiliation").addEventListener("click",Et),At();const i=U.querySelector("#abstract-editor");i.innerHTML=n.get("abstract.content")||"",i.addEventListener("input",()=>{n.set("abstract.content",i.innerHTML)}),i.addEventListener("paste",d=>{var m;const c=(m=d.clipboardData)==null?void 0:m.getData("text/html");if(c){d.preventDefault();const f=et(c);document.execCommand("insertHTML",!1,f)}}),qt();const l=U.querySelector("#keyword-input");l.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===",")&&(d.preventDefault(),kt(l.value),l.value="")}),U.querySelectorAll(".btn-remove-kw").forEach(d=>{d.addEventListener("click",()=>{const c=parseInt(d.dataset.idx,10),m=n.get("keywords")||[];m.splice(c,1),n.set("keywords",m),ie()})})}function wt(a,e){return`
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
  `}function St(a,e){return`
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
  `}function Ct(){const a=n.get("authors")||[];a.push({given:"",middle:"",surname:"",email:"",orcid:"",affiliation_ids:[]}),n.set("authors",a),ie()}function Lt(){U.querySelectorAll(".btn-remove-author").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=n.get("authors")||[];t.splice(e,1),n.set("authors",t),(n.get("article.correspondence_author")||0)>t.length&&n.set("article.correspondence_author",t.length?1:0),ie()})}),U.querySelectorAll(".author-input").forEach(a=>{a.addEventListener("change",e=>{const t=parseInt(a.dataset.idx,10),r=a.dataset.field,s=n.get("authors")||[];if(r==="affiliation_ids"){const i=a.value.split(",").map(l=>parseInt(l.trim(),10)).filter(Number.isFinite);s[t][r]=i}else if(r==="orcid"){let i=a.value.trim();i.startsWith("https://orcid.org/")?i=i.substring(18):i.startsWith("http://orcid.org/")&&(i=i.substring(17)),s[t][r]=i,a.value=i}else s[t][r]=a.value;n.set("authors",s)})})}function Et(){const a=n.get("affiliations")||[];a.push({text:"",ror_id:""}),n.set("affiliations",a),ie()}function At(){U.querySelectorAll(".btn-remove-affiliation").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=n.get("affiliations")||[];t.splice(e,1),n.set("affiliations",t),ie()})}),U.querySelectorAll(".affiliation-input").forEach(a=>{a.addEventListener("change",()=>{const e=parseInt(a.dataset.idx,10),t=a.dataset.field,r=n.get("affiliations")||[];r[e][t]=a.value.trim(),n.set("affiliations",r)})})}function kt(a){if(!a)return;const e=a.split(",").map(r=>r.trim()).filter(Boolean),t=n.get("keywords")||[];e.forEach(r=>{t.includes(r)||t.push(r)}),n.set("keywords",t),ie()}function qt(){const a=U.querySelector("#abstract-editor");U.querySelectorAll(".tb-btn[data-cmd]").forEach(t=>{t.addEventListener("mousedown",r=>{r.preventDefault();const s=t.dataset.cmd;document.execCommand(s,!1,null),n.set("abstract.content",a.innerHTML)})}),U.querySelector(".tb-fontsize").addEventListener("change",t=>{const r=t.target.value;r&&(Tt(a,r),n.set("abstract.content",a.innerHTML),t.target.value="")})}function Tt(a,e){const t=window.getSelection();if(!t.rangeCount||!a.contains(t.anchorNode))return;const r=Math.min(7,Math.max(1,Math.round(parseInt(e,10)/4)));document.execCommand("fontSize",!1,String(r)),a.querySelectorAll("font[size]").forEach(s=>{const i=document.createElement("span");i.style.fontSize=e+"pt",i.innerHTML=s.innerHTML,s.replaceWith(i)})}function C(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function _t(a){if(!a)return;a.innerHTML=`
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
  `;const e=a.querySelector("#ojs-dropzone"),t=a.querySelector("#file-ojs-xml");e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(r=>{e.addEventListener(r,s=>s.preventDefault(),!1)}),e.addEventListener("drop",r=>{const i=r.dataTransfer.files[0];i&&i.name.endsWith(".xml")?Fe(i):L("Please upload a valid XML file","error")}),t.addEventListener("change",r=>{const s=r.target.files[0];s&&Fe(s)})}function Fe(a){const e=new FileReader;e.onload=function(t){try{It(t.target.result)}catch(r){L("Failed to parse XML file: "+r.message,"error"),console.error(r)}},e.readAsText(a)}function It(a){const t=new DOMParser().parseFromString(a,"text/xml"),r=t.querySelector("parsererror");if(r)throw new Error(r.textContent);const s=t.querySelector("journal_title, journal title, journal-meta journal-title")?t.querySelector("journal_title, journal title, journal-meta journal-title").textContent.trim():"";s&&n.set("journal.title",s);const i=t.querySelector('issn[type="print"], issn[device="print"], issn')?t.querySelector('issn[type="print"], issn[device="print"], issn').textContent.trim():"";i&&n.set("journal.issn_print",i);const l=t.querySelector('issn[type="online"], issn[device="online"]')?t.querySelector('issn[type="online"], issn[device="online"]').textContent.trim():"";l&&n.set("journal.issn_online",l);const d=t.querySelector("publisher_name, publisher name, publisher-name")?t.querySelector("publisher_name, publisher name, publisher-name").textContent.trim():"";d&&n.set("journal.publisher",d);const c=t.querySelector('article > title, submission > title, article-title, title[locale^="en"]')?t.querySelector('article > title, submission > title, article-title, title[locale^="en"]').textContent.trim():t.querySelector("title")?t.querySelector("title").textContent.trim():"";c&&n.set("article.title",c);const m=t.querySelector('subtitle, subtitle[locale^="en"]')?t.querySelector('subtitle, subtitle[locale^="en"]').textContent.trim():"";m&&n.set("article.subtitle",m);let f="";const o=t.querySelector('id[type="doi"], doi, article-id[pub-id-type="doi"]');if(o)f=o.textContent.trim();else{const b=t.querySelector('id[type="doi_uri"]');b&&(f=b.textContent.trim().replace(/^https?:\/\/doi\.org\//i,""))}if(f){n.set("article.doi",f);const b=f.match(/^(10\.\d{4,9})/);b&&n.set("journal.doi_prefix",b[1])}const S=t.querySelector("volume")?t.querySelector("volume").textContent.trim():"";S&&n.set("article.volume",S);const I=t.querySelector("number, issue")?t.querySelector("number, issue").textContent.trim():"";I&&n.set("article.issue",I);const v=t.querySelector('issue_identification > year, issue > year, publication > year, date-in-citation[content-type="access-date"]')?t.querySelector("issue_identification > year, issue > year, publication > year").textContent.trim():new Date().getFullYear().toString();v&&n.set("article.year",v);const _=t.querySelector("pages, fpage")?t.querySelector("pages, fpage").textContent.trim():"";if(_){const b=_.split("-");n.set("article.fpage",b[0].trim()),b[1]&&n.set("article.lpage",b[1].trim())}const O=t.querySelector("article > id, submission > id")?t.querySelector("article > id, submission > id").textContent.trim():"";O&&n.set("article.article_id",O);const j=t.querySelector('date_submitted, date-received, date[date-type="received"]')?t.querySelector('date_submitted, date-received, date[date-type="received"]').getAttribute("value")||t.querySelector('date_submitted, date-received, date[date-type="received"]').textContent.trim():"";j&&n.set("dates.received",_e(j));const k=t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]')?t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').getAttribute("value")||t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').textContent.trim():"";k&&n.set("dates.accepted",_e(k));const Y=t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]')?t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').getAttribute("value")||t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').textContent.trim():"";Y&&n.set("dates.published",_e(Y));const N=t.querySelector('abstract, abstract[locale^="en"]');N&&n.set("abstract.content",N.innerHTML.trim());const z=t.querySelectorAll("keyword, keywords > keyword"),u=[];z.forEach(b=>{const y=b.textContent.trim();y&&!u.includes(y)&&u.push(y)}),u.length&&n.set("keywords",u);const g=t.querySelectorAll("author"),P=[],D=[];function te(b,y=""){if(!b)return null;let h=D.findIndex(M=>M.text.toLowerCase()===b.toLowerCase());return h===-1&&(D.push({text:b,ror_id:y}),h=D.length-1),h+1}g.forEach(b=>{const y=b.querySelector("givenname, given-names")?b.querySelector("givenname, given-names").textContent.trim():"",h=b.querySelector("familyname, surname")?b.querySelector("familyname, surname").textContent.trim():"",M=b.querySelector("email")?b.querySelector("email").textContent.trim():"";let q=b.querySelector("orcid")?b.querySelector("orcid").textContent.trim():"";q.startsWith("https://orcid.org/")&&(q=q.substring(18));const Z=[];b.querySelectorAll("affiliation").forEach(se=>{const $e=se.textContent.trim();if($e){const ce=te($e);ce!==null&&!Z.includes(ce)&&Z.push(ce)}}),P.push({given:y,surname:h,email:M,orcid:q,affiliation_ids:Z})}),P.length&&(n.set("authors",P),n.set("article.correspondence_author",1)),D.length&&n.set("affiliations",D);const x=t.querySelectorAll("reference, citation, ref"),H=[];x.forEach(b=>{let y=b.textContent.trim();const h=b.querySelector("mixed-citation");if(h&&(y=h.textContent.trim()),y=y.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,""),y){const M=Mt(y)||(b.querySelector("uri")?b.querySelector("uri").textContent.trim():"");H.push({text:y,url:M})}}),H.length&&n.set("references",H);const R=t.querySelectorAll("body > sec, sec");if(R.length){const b=[];R.forEach(y=>{const h=y.querySelector("title"),M=h?h.textContent.trim():"Section";h&&h.remove();const q=y.innerHTML.trim();b.push({id:Re(),title:M,content:q,tables:[],figures:[]})}),n.set("sections",b)}n.emit("load"),L("OJS XML metadata imported successfully")}function _e(a){if(!a)return"";const e=a.match(/^(\d{4})[-/](\d{2})[-/](\d{2})/);if(e)return`${e[1]}-${e[2]}-${e[3]}`;try{const t=new Date(a);if(!isNaN(t.getTime()))return t.toISOString().split("T")[0]}catch{}return a}function Mt(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}const Rt=["Introduction","Methods","Results","Discussion","Conclusion","Declarations"],tt=[8,9,10,11,12,14,16,18,20,22,24];let de=null,B=[],xe=null,w=[];function jt(a){de=a,ee(),n.on("load",()=>ee()),n.on("reset",()=>ee())}function ee(){if(!de)return;const a=n.get("sections")||[];de.innerHTML=`
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
          ${a.map((e,t)=>Dt(e,t,a.length)).join("")}
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
  `,de.querySelector("#btn-add-section").addEventListener("click",()=>zt()),de.querySelector("#btn-add-presets").addEventListener("click",()=>Ht()),a.forEach((e,t)=>{var l,d,c;const r=de.querySelector(`[data-section-id="${e.id}"]`);if(!r)return;const s=r.querySelector(".section-title-input");s.addEventListener("input",()=>{e.title=s.value,oe()}),Bt(r,e);const i=r.querySelector(".section-editor");i.innerHTML=e.content||"",i.addEventListener("input",()=>{e.content=i.innerHTML,oe()}),i.addEventListener("paste",m=>{var o;const f=(o=m.clipboardData)==null?void 0:o.getData("text/html");if(f){m.preventDefault();const S=et(f);document.execCommand("insertHTML",!1,S)}}),(l=r.querySelector(".btn-move-up"))==null||l.addEventListener("click",()=>Xe(t,-1)),(d=r.querySelector(".btn-move-down"))==null||d.addEventListener("click",()=>Xe(t,1)),(c=r.querySelector(".btn-delete-section"))==null||c.addEventListener("click",()=>Ft(t)),r.querySelector(".btn-insert-table").addEventListener("click",()=>Je(e.id)),r.querySelector(".btn-insert-figure").addEventListener("click",()=>Ge(e.id)),r.querySelectorAll(".btn-remove-table").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.tableIndex,10);e.tables.splice(f,1),oe(),ee()})}),r.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.tableIndex,10);Je(e.id,f)})}),r.querySelectorAll(".btn-remove-figure").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.figureIndex,10);e.figures.splice(f,1),oe(),ee()})}),r.querySelectorAll(".btn-edit-figure").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.figureIndex,10);Ge(e.id,f)})})})}function Dt(a,e,t){const r=(a.tables||[]).map((i,l)=>Nt(i,l)).join(""),s=(a.figures||[]).map((i,l)=>Pt(i,l)).join("");return`
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
        ${tt.map(i=>`<option value="${i}">${i}pt</option>`).join("")}
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
  </div>`}function Nt(a,e){const t=a.manualNumber||e+1,r=K(a.caption||""),s=a.headers||[],i=a.rows||[];let l=`
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
    <table class="preview-table">`;return s.length&&(l+="<thead>",s.forEach(d=>{l+="<tr>",d.forEach(c=>{l+=`<th style="text-align:${c.align||"left"}">${Oe(c)}</th>`}),l+="</tr>"}),l+="</thead>"),i.length&&(l+="<tbody>",i.forEach(d=>{l+="<tr>",d.forEach((c,m)=>{const f=a.headerCol&&m===0?"th":"td";l+=`<${f} style="text-align:${c.align||"left"}">${Oe(c)}</${f}>`}),l+="</tr>"}),l+="</tbody>"),l+="</table></div>",a.footnote&&(l+=`<div class="table-footnote">${K(a.footnote)}</div>`),l+="</div>",l}function Oe(a){let e=K(a.text||"");return a.bold&&(e=`<b>${e}</b>`),a.italic&&(e=`<i>${e}</i>`),a.underline&&(e=`<u>${e}</u>`),a.superscript&&(e=`<sup>${e}</sup>`),a.subscript&&(e=`<sub>${e}</sub>`),e}function Pt(a,e){return`
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
  </div>`}function Bt(a,e){var i,l;const t=a.querySelector(".section-editor");a.querySelectorAll(".tb-btn[data-cmd]").forEach(d=>{d.addEventListener("mousedown",c=>{c.preventDefault();const m=d.dataset.cmd;if(m==="createLink"){const f=prompt("Enter link URL (e.g. https://google.com):","https://");f&&document.execCommand(m,!1,f)}else document.execCommand(m,!1,null);e.content=t.innerHTML,oe()})});const r=a.querySelector(".tb-fontsize");r.addEventListener("change",()=>{const d=r.value;d&&(document.execCommand("fontSize",!1,"7"),t.querySelectorAll('font[size="7"]').forEach(m=>{m.removeAttribute("size"),m.style.fontSize=d+"pt"}),e.content=t.innerHTML,oe(),r.value="")});const s=a.querySelector(".tb-spacing");s&&s.addEventListener("change",()=>{const d=s.value;if(d!==""){const c=window.getSelection();if(c.rangeCount>0){let m=c.anchorNode;for(;m&&m!==t;){if(m.tagName==="P"||m.tagName==="DIV"){m.style.marginTop=d;break}m=m.parentNode}if(!m||m===t){document.execCommand("formatBlock",!1,"P");let f=c.anchorNode;for(;f&&f!==t;){if(f.tagName==="P"){f.style.marginTop=d;break}f=f.parentNode}}}e.content=t.innerHTML,oe(),s.value=""}}),(i=a.querySelector(".btn-auto-sup"))==null||i.addEventListener("click",d=>{d.preventDefault();let c=t.innerHTML;c=c.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),t.innerHTML=c,e.content=c,oe(),L("Auto-superscripted citations")}),(l=a.querySelector(".btn-hl-cite"))==null||l.addEventListener("click",d=>{d.preventDefault(),t.classList.toggle("show-citations"),d.target.classList.toggle("active",t.classList.contains("show-citations"))})}function zt(a=""){const e=n.get("sections")||[];e.push({id:Re(),title:a,content:"",tables:[],figures:[]}),n.set("sections",e),ee(),L("Section added")}function Ht(){const a=n.get("sections")||[];Rt.forEach(e=>{a.push({id:Re(),title:e,content:"",tables:[],figures:[]})}),n.set("sections",a),ee(),L("Preset sections added")}function Xe(a,e){const t=n.get("sections")||[],r=a+e;r<0||r>=t.length||([t[a],t[r]]=[t[r],t[a]],n.set("sections",t),ee())}function Ft(a){const e=n.get("sections")||[];e.splice(a,1),n.set("sections",e),ee(),L("Section removed")}function oe(){const a=n.get("sections")||[];n.set("sections",a)}function Je(a,e=null){var f;xe=e!==null?{sectionId:a,tableIndex:e}:null;const r=(n.get("sections")||[]).find(o=>o.id===a);if(!r)return;let s=null;if(xe!==null&&(s=r.tables[e]),s){const o=[...s.headers||[],...s.rows||[]];w=o.length?o.map(S=>S.map(I=>({...I}))):Ue(3,3)}else w=Ue(3,3);B=[];const i=document.createElement("div");i.className="modal-overlay",i.id="table-modal-overlay";const l=((f=s==null?void 0:s.headers)==null?void 0:f.length)??1,d=(s==null?void 0:s.headerCol)??!1;i.innerHTML=`
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
          ${tt.map(o=>`<option value="${o}" ${(s==null?void 0:s.fontSize)===String(o)?"selected":""}>${o}pt</option>`).join("")}
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
  </div>`,document.body.appendChild(i),ne(),i.querySelector(".modal-close-btn").addEventListener("click",Ce),i.querySelector("#tbl-cancel").addEventListener("click",Ce),i.addEventListener("click",o=>{o.target===i&&Ce()}),i.querySelector(".btn-fullscreen-toggle").addEventListener("click",()=>{i.querySelector("#table-editor-modal").classList.toggle("modal-fullscreen")});const c=i.querySelector("#tbl-paste-zone");c.addEventListener("paste",o=>{Ut(o,c)}),i.querySelector("#tbl-actions").addEventListener("click",o=>{var I;const S=(I=o.target.closest("[data-act]"))==null?void 0:I.dataset.act;S&&Xt(S)}),i.querySelector("#tbl-save").addEventListener("click",()=>{Yt(a)});const m=i.querySelector("#tbl-fontsize");m&&m.addEventListener("change",()=>{Le("fontSize",m.value),ne()})}let he=!1,ve=null;function Ce(){var a;(a=document.getElementById("table-modal-overlay"))==null||a.remove(),xe=null,w=[],B=[],he=!1,ve=null}function Ue(a,e){return Array.from({length:a},()=>Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})))}function ne(){const a=document.getElementById("tbl-grid-wrap");if(!a)return;let e='<table class="table-editor-grid"><tbody>';w.forEach((r,s)=>{e+="<tr>",r.forEach((i,l)=>{if(i.hidden)return;const d=B.some(o=>o.row===s&&o.col===l)?" selected":"",c=[];i.bold&&c.push("font-weight:bold"),i.italic&&c.push("font-style:italic"),i.underline&&c.push("text-decoration:underline"),i.superscript&&c.push("vertical-align:super;font-size:0.8em"),i.subscript&&c.push("vertical-align:sub;font-size:0.8em"),i.align&&c.push("text-align:"+i.align),i.fontSize&&c.push("font-size:"+i.fontSize+"pt");const m=i.colspan&&i.colspan>1?` colspan="${i.colspan}"`:"",f=i.rowspan&&i.rowspan>1?` rowspan="${i.rowspan}"`:"";e+=`<td class="grid-cell${d}" data-r="${s}" data-c="${l}"${m}${f}>
        <div class="grid-input" contenteditable="true"
               style="${c.join(";")}" data-r="${s}" data-c="${l}">${i.text}</div>
      </td>`}),e+="</tr>"}),e+="</tbody></table>",a.innerHTML=e;let t=null;a.querySelectorAll(".grid-cell").forEach(r=>{r.addEventListener("mousedown",s=>{if(s.target.classList.contains("grid-input")&&!s.ctrlKey&&!s.metaKey&&!s.shiftKey)return;const i=parseInt(r.dataset.r,10),l=parseInt(r.dataset.c,10);s.shiftKey&&t?(s.preventDefault(),Ye(t.r,t.c,i,l)):(he=!0,ve={r:i,c:l},t={r:i,c:l},Ot(i,l,s.ctrlKey||s.metaKey))}),r.addEventListener("mouseenter",s=>{if(he&&ve){const i=parseInt(r.dataset.r,10),l=parseInt(r.dataset.c,10);Ye(ve.r,ve.c,i,l),t={r:i,c:l}}})}),document.addEventListener("mouseup",()=>{he=!1},{once:!0}),window.addEventListener("mouseup",()=>{he=!1}),a.querySelectorAll(".grid-input").forEach(r=>{r.addEventListener("focus",()=>{const s=parseInt(r.dataset.r,10),i=parseInt(r.dataset.c,10);B.some(l=>l.row===s&&l.col===i)||(B=[{row:s,col:i}],t={r:s,c:i},a.querySelectorAll(".grid-cell").forEach(l=>l.classList.remove("selected")),r.parentElement.classList.add("selected"),je())}),r.addEventListener("input",()=>{const s=parseInt(r.dataset.r,10),i=parseInt(r.dataset.c,10);w[s][i].text=r.innerHTML})})}function Ye(a,e,t,r){const s=Math.min(a,t),i=Math.max(a,t),l=Math.min(e,r),d=Math.max(e,r);B=[];for(let c=s;c<=i;c++)for(let m=l;m<=d;m++)B.push({row:c,col:m});ne(),je()}function Ot(a,e,t){if(t){const r=B.findIndex(s=>s.row===a&&s.col===e);r>=0?B.splice(r,1):B.push({row:a,col:e})}else B=[{row:a,col:e}];ne(),je()}function je(){var e;const a=document.getElementById("tbl-fontsize");if(a)if(B.length===1){const t=B[0],r=(e=w[t.row])==null?void 0:e[t.col];r&&(a.value=r.fontSize?String(r.fontSize):"")}else a.value=""}function Xt(a){var t;const e=((t=w[0])==null?void 0:t.length)||0;switch(a){case"addCol":w.forEach(s=>s.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""}));break;case"removeCol":e>1&&w.forEach(s=>s.pop());break;case"addRow":w.push(Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));break;case"removeRow":w.length>1&&w.pop();break;case"bold":ge("bold");break;case"italic":ge("italic");break;case"underline":ge("underline");break;case"superscript":ge("superscript");break;case"subscript":ge("subscript");break;case"autoSup":(B.length?B:w.flatMap((i,l)=>i.map((d,c)=>({row:l,col:c})))).forEach(i=>{let l=w[i.row][i.col].text;l=l.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),w[i.row][i.col].text=l}),L("Citations superscripted");break;case"hlCite":document.getElementById("table-editor-modal").classList.toggle("show-citations");break;case"fontInc":case"fontDec":{const s=B.length?B:w.flatMap((l,d)=>l.map((c,m)=>({row:d,col:m}))),i=a==="fontInc"?1:-1;s.forEach(l=>{let d=parseFloat(w[l.row][l.col].fontSize)||10;d=Math.max(6,Math.min(24,d+i)),w[l.row][l.col].fontSize=String(d)})}break;case"alignLeft":Le("align","left");break;case"alignCenter":Le("align","center");break;case"alignRight":Le("align","right");break;case"merge":Jt();break}ne()}function ge(a){B.forEach(({row:e,col:t})=>{w[e][t][a]=!w[e][t][a]})}function Le(a,e){B.forEach(({row:t,col:r})=>{w[t][r][a]=e})}function Jt(){if(B.length<2)return;let a=1/0,e=-1/0,t=1/0,r=-1/0;B.forEach(i=>{i.row<a&&(a=i.row),i.row>e&&(e=i.row),i.col<t&&(t=i.col),i.col>r&&(r=i.col)});const s=[];for(let i=a;i<=e;i++)for(let l=t;l<=r;l++)w[i][l].hidden||s.push(w[i][l].text);w[a][t].text=s.filter(Boolean).join(" "),w[a][t].rowspan=e-a+1,w[a][t].colspan=r-t+1,w[a][t].hidden=!1;for(let i=a;i<=e;i++)for(let l=t;l<=r;l++)(i!==a||l!==t)&&(w[i][l].text="",w[i][l].hidden=!0,w[i][l].rowspan=1,w[i][l].colspan=1)}function Ut(a,e){var r;const t=(r=a.clipboardData)==null?void 0:r.getData("text/plain");setTimeout(()=>{const s=e.querySelector("table"),i=e.innerText||t;if(s){const l=s.querySelectorAll("tr");if(w=[],l.forEach(d=>{const c=d.querySelectorAll("td, th"),m=[];c.forEach(f=>{const o=f.getAttribute("style")||"",S=(f.innerText||f.textContent||"").trim(),I=/font-weight\s*:\s*(bold|[6-9]\d{2})/i.test(o)||!!f.querySelector("b, strong")||f.tagName==="TH",v=/font-style\s*:\s*italic/i.test(o)||!!f.querySelector("i, em"),_=/text-decoration[^:]*:\s*underline/i.test(o)||!!f.querySelector("u"),O=/vertical-align\s*:\s*super/i.test(o)||!!f.querySelector("sup"),j=/vertical-align\s*:\s*sub/i.test(o)||!!f.querySelector("sub");let k="left";const Y=o.match(/text-align\s*:\s*(left|center|right)/i);Y&&(k=Y[1].toLowerCase());let N="";const z=o.match(/font-size\s*:\s*([\d.]+)pt/i);z&&(N=z[1]),m.push({text:S,bold:I,italic:v,underline:_,superscript:O,subscript:j,align:k,fontSize:N})}),m.length&&w.push(m)}),w.length){const d=Math.max(...w.map(c=>c.length));w.forEach(c=>{for(;c.length<d;)c.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left"})}),e.innerHTML="",B=[],ne(),L("Table pasted successfully");return}}if(e.innerHTML="",i){const l=i.split(/\r?\n/).map(d=>d.trim()).filter(Boolean);if(l.length>0){w=l.map(c=>c.split("	").map(f=>({text:f.trim(),bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));const d=Math.max(...w.map(c=>c.length));w.forEach(c=>{for(;c.length<d;)c.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})}),B=[],ne(),L("Table parsed from plain text (TSV)");return}}L("No table found in pasted content","warning")},200)}function Yt(a){var S,I,v,_,O,j;const e=n.get("sections")||[],t=e.find(k=>k.id===a);if(!t)return;const r=((S=document.getElementById("tbl-caption"))==null?void 0:S.value.trim())||"",s=((I=document.getElementById("tbl-number"))==null?void 0:I.value.trim())||"",i=Math.max(1,Math.min(5,parseInt((v=document.getElementById("tbl-header-rows"))==null?void 0:v.value,10)||1)),l=((_=document.getElementById("tbl-header-col"))==null?void 0:_.checked)||!1,d=((O=document.getElementById("tbl-footnote"))==null?void 0:O.value.trim())||"",c=((j=document.getElementById("tbl-fontsize"))==null?void 0:j.value)||"",m=w.slice(0,i).map(k=>k.map(Y=>({...Y}))),f=w.slice(i).map(k=>k.map(Y=>({...Y}))),o={caption:r,manualNumber:s,headers:m,rows:f,headerCol:l,footnote:d,fontSize:c};t.tables||(t.tables=[]),xe!==null?(t.tables[xe.tableIndex]=o,L("Table updated")):(t.tables.push(o),L("Table inserted")),n.set("sections",e),Ce(),ee()}function Ge(a,e=-1){const t=n.get("sections")||[],r=t.find(N=>N.id===a);if(!r)return;const s=e>=0&&r.figures&&r.figures[e],i=s?r.figures[e]:null,l=t.reduce((N,z)=>{var u;return N+(((u=z.figures)==null?void 0:u.length)||0)},0),d=String(l+1).padStart(2,"0"),c=s?i.url:`images/F${d}.png`,m=s?i.caption:"",f=s&&i.alt||"",o=s&&i.base64Data||"",S=s?"Edit Figure":"Insert Figure",I=s?"Update Figure":"Insert Figure",v=document.createElement("div");v.className="modal-overlay",v.id="figure-modal-overlay",v.innerHTML=`
  <div class="modal">
    <div class="modal-header">
      <h3>${S}</h3>
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
      <button class="btn btn-primary" id="fig-save">${I}</button>
    </div>
  </div>`,document.body.appendChild(v);const _=v.querySelector("#fig-url"),O=v.querySelector("#fig-preview-img"),j=v.querySelector("#fig-file"),k=v.querySelector("#fig-base64"),Y=v.querySelector("#fig-preview-zone");_.addEventListener("input",()=>{k.value||(O.src=_.value)}),j.addEventListener("change",N=>{const z=N.target.files[0];if(z){const u=new FileReader;u.onload=g=>{k.value=g.target.result,O.src=g.target.result},u.readAsDataURL(z)}}),Y.setAttribute("tabindex","0"),Y.addEventListener("paste",N=>{const z=N.clipboardData.items;for(let u=0;u<z.length;u++)if(z[u].type.indexOf("image")!==-1){const g=z[u].getAsFile(),P=new FileReader;P.onload=D=>{k.value=D.target.result,O.src=D.target.result,L("Image pasted")},P.readAsDataURL(g);break}}),v.querySelector(".modal-close-btn").addEventListener("click",Se),v.querySelector("#fig-cancel").addEventListener("click",Se),v.addEventListener("click",N=>{N.target===v&&Se()}),v.querySelector("#fig-save").addEventListener("click",()=>{const N=_.value.trim(),z=v.querySelector("#fig-caption").value.trim(),u=v.querySelector("#fig-alt").value.trim(),g=k.value;r.figures||(r.figures=[]),s?r.figures[e]={url:N,caption:z,alt:u,base64Data:g}:r.figures.push({url:N,caption:z,alt:u,base64Data:g}),n.set("sections",t),Se(),ee(),L(s?"Figure updated":"Figure inserted")})}function Se(){var a;(a=document.getElementById("figure-modal-overlay"))==null||a.remove()}function K(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Gt(a){ye(a),n.on("load",()=>ye(a)),n.on("reset",()=>ye(a))}function ye(a){if(!a)return;const e=n.get("references")||[];a.innerHTML=`
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

        ${e.length?Wt(e):""}
      </div>
    </div>
  `,a.querySelector("#btn-parse-refs").addEventListener("click",()=>Kt(a)),Vt(a,e)}function Wt(a){let e='<div class="ref-list" id="ref-parsed-list">';return a.forEach((t,r)=>{e+=`
    <div class="ref-item" data-ref-index="${r}">
      <div class="ref-item-header">
        <span class="ref-number">[${r+1}]</span>
        <span class="ref-text">${We(t.text)}</span>
        <button class="btn btn-xs btn-danger btn-remove-ref" data-ref-index="${r}" title="Remove">✕</button>
      </div>
      <div class="ref-item-url">
        <input class="form-control form-control-sm ref-url-input"
               data-ref-index="${r}" type="text"
               value="${We(t.url||"")}"
               placeholder="URL / DOI link" />
      </div>
    </div>`}),e+="</div>",e}function Vt(a,e){a.querySelectorAll(".btn-remove-ref").forEach(t=>{t.addEventListener("click",()=>{const r=parseInt(t.dataset.refIndex,10);e.splice(r,1),n.set("references",e),ye(a),L("Reference removed")})}),a.querySelectorAll(".ref-url-input").forEach(t=>{t.addEventListener("input",()=>{const r=parseInt(t.dataset.refIndex,10);e[r].url=t.value.trim(),n.set("references",e)})})}function Kt(a){const e=a.querySelector("#ref-bulk-input");if(!e)return;const t=e.value.trim();if(!t){L("Please paste references first","warning");return}const s=t.split(`
`).map(i=>i.trim()).filter(Boolean).map(i=>{const d=i.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,"")||i,c=Zt(d);return{text:d,url:c}});n.set("references",s),e.value="",ye(a),L(`${s.length} reference${s.length!==1?"s":""} parsed`)}function Zt(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}function We(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Qt(){const a=n.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],s=a.affiliations||[],i=a.dates||{},l=a.abstract||{},d=a.keywords||[],c=a.copyright||{},m=a.sections||[],f=a.references||[],o=p=>re(p||""),S=p=>p?p.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim().length===0||p==="<p><br></p>":!0,I=p=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[p]||p||"Research Article",v=e.base_url||"https://jpchr.com/jpchr",_=t.article_id||"galley",O=`${v}/article/view/${_}/html`,j=`${v}/article/view/${_}/pdf`,k=!S(l.content),Y=document.createElement("div");Y.innerHTML=l.content||"";const N=Y.textContent.replace(/\s+/g," ").trim(),z=k?N.substring(0,155)+(N.length>155?"...":""):"",g=(p=>p==null?"":String(p).replace(/-/g,"/"))(i.published||i.accepted||i.received||t.year),P=r.map(p=>{const T=(p.affiliation_ids||[]).map(W=>{var G;return(G=s[W-1])==null?void 0:G.text}).filter(Boolean).join("; ");return{"@type":"Person",name:`${p.given||""} ${p.surname||""}`.trim(),affiliation:T||void 0,identifier:p.orcid?`https://orcid.org/${p.orcid}`:void 0}}),D={"@context":"https://schema.org","@type":"ScholarlyArticle",headline:t.title||"",alternativeHeadline:t.subtitle||void 0,genre:I(t.type),author:P,datePublished:i.published||void 0,dateCreated:i.received||void 0,isPartOf:{"@type":"PublicationIssue",issueNumber:t.issue||void 0,volumeNumber:t.volume||void 0,isPartOf:{"@type":"Periodical",name:e.title||"",issn:[e.issn_online,e.issn_print].filter(Boolean)}},pageStart:t.fpage||void 0,pageEnd:t.lpage||void 0,description:N||void 0,publisher:{"@type":"Organization",name:e.publisher||""},identifier:[t.doi?{"@type":"PropertyValue",propertyID:"doi",value:t.doi}:null].filter(Boolean)},te=t.doi?`<meta name="citation_doi" content="${o(t.doi)}">`:"",x=e.issn_online||e.issn_print||"";let H="";r.forEach(p=>{const T=`${p.surname||""}, ${p.given||""}`.trim().replace(/^,|,$/,"");H+=`  <meta name="citation_author" content="${o(T)}">
`,p.orcid&&(H+=`  <meta name="citation_author_orcid" content="https://orcid.org/${o(p.orcid)}">
`)});let R="";k&&(R+=`      <a href="#abstract" class="sidebar-link">Abstract</a>
`),m.forEach(p=>{R+=`      <a href="#sec-${p.id}" class="sidebar-link">${o(p.title)}</a>
`}),f.length&&(R+=`      <a href="#references" class="sidebar-link">References</a>
`);const b=r.length===1,y=s.length===1;let h="";r.forEach((p,T)=>{const G=[p.given,p.middle,p.surname].filter(Boolean).map(E=>o(E)).join(" ").trim(),V=T+1===parseInt(t.correspondence_author,10),$=p.orcid?` <a href="https://orcid.org/${o(p.orcid)}" target="_blank" class="orcid-link" title="ORCID iD"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" class="orcid-icon" alt="ORCID iD" /></a>`:"",X=V?"<sup>*</sup>":"";let J="";!b&&p.affiliation_ids&&p.affiliation_ids.length&&(J=`<sup>${p.affiliation_ids.join(",")}</sup>`),h+=`<span class="author-name">${G}${J}${X}${$}</span>${T<r.length-1?", ":""}`});let M="";if(s.length)if(b&&y){const p=s[0],T=p.ror_id?` <a href="${o(p.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";M=`<div class="affiliation-line single">${o(p.text)}${T}</div>`}else M='<ol class="affiliations-list" style="list-style-type:none; padding-left:0;">',s.forEach((p,T)=>{const W=p.ror_id?` <a href="${o(p.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";M+=`<li class="affiliation-line" style="margin-bottom:4px;"><sup>${T+1}</sup> ${o(p.text)}${W}</li>`}),M+="</ol>";let q="";const Z=parseInt(t.correspondence_author,10);if(Z>0&&r[Z-1]){const p=r[Z-1],W=[p.given,p.middle,p.surname].filter(Boolean).join(" ").trim(),G=p.email?` <a href="mailto:${o(p.email)}" class="email-link" title="Email corresponding author"><svg class="email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="vertical-align: middle; margin-left: 2px; color: var(--primary); display: inline-block;"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>`:"";q=`<div class="correspondence-line" style="font-size:0.9rem; margin-top:0.5rem; color:var(--text-secondary);">*Correspondence: ${o(W)}${G}</div>`}const le=t.volume?`Vol. ${o(t.volume)}`:"",se=t.issue?`No. ${o(t.issue)}`:"",$e=t.issue_months?`(${o(t.issue_months)})`:"",ce=t.year?o(t.year):"";let De=[le,se,$e].filter(Boolean).join(", ");ce&&(De+=` ${ce}`);const ke=t.fpage||t.elocation_id||"",rt=ke?` | Pages: ${o(ke)}${t.lpage?"-"+o(t.lpage):""}`:"",it=t.article_id?` | Article ID: ${o(t.article_id)}`:"",st=t.doi?` | DOI: <a href="https://doi.org/${o(t.doi)}" target="_blank">${o(t.doi)}</a>`:"",ot=`${De}${rt}${it}${st}`,me=[];i.received&&me.push(`Received: ${i.received}`),i.revised&&me.push(`Revised: ${i.revised}`),i.accepted&&me.push(`Accepted: ${i.accepted}`),i.published&&me.push(`Published: ${i.published}`);const Ne=me.join(" | ");let Pe="";const Be=c.license||"CC-BY-NC-SA-4.0";if(Be.startsWith("CC-")){const p=Be.replace("CC-","").replace("-4.0","").toLowerCase();Pe=`<a href="https://creativecommons.org/licenses/${p}/4.0/" target="_blank" style="display:inline-block; margin-top:0.5rem;">
      <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/${p}.svg" alt="Creative Commons License" style="height:31px; border:none;"/>
    </a>`}let ze="";const we=(p,T=!1)=>{if(p.hidden)return"";const W=T?"th":"td",G=p.align?`text-align:${p.align}`:"",V=p.bold?"font-weight:bold;":"",$=p.italic?"font-style:italic;":"",X=p.underline?"text-decoration:underline;":"",J=[G,V,$,X].filter(Boolean).join(";");let E=re(p.text||"");E=E.replace(/&lt;sup&gt;/gi,"<sup>").replace(/&lt;\/sup&gt;/gi,"</sup>"),E=E.replace(/&lt;sub&gt;/gi,"<sub>").replace(/&lt;\/sub&gt;/gi,"</sub>"),E=E.replace(/&lt;b&gt;/gi,"<b>").replace(/&lt;\/b&gt;/gi,"</b>"),E=E.replace(/&lt;i&gt;/gi,"<i>").replace(/&lt;\/i&gt;/gi,"</i>"),E=E.replace(/&lt;u&gt;/gi,"<u>").replace(/&lt;\/u&gt;/gi,"</u>"),p.bold&&(E=`<strong>${E}</strong>`),p.italic&&(E=`<em>${E}</em>`),p.underline&&(E=`<u>${E}</u>`),p.superscript&&(E=`<sup>${E}</sup>`),p.subscript&&(E=`<sub>${E}</sub>`);const F=p.colspan&&p.colspan>1?` colspan="${p.colspan}"`:"",ae=p.rowspan&&p.rowspan>1?` rowspan="${p.rowspan}"`:"";return`<${W}${F}${ae} ${J?`style="${J}"`:""}>${E}</${W}>`},nt=p=>{if(!p||!p.text)return"";const T=String(p.text),W=/(?:doi:\s*)?(?:https?:\/\/(?:dx\.)?doi\.org\/)?\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi;let G=re(T).replace(W,(V,$)=>`doi:<a href="https://doi.org/${$}" target="_blank">${$}</a>`);if(p.url){const V=String(p.url).trim();if(/doi\.org/i.test(V)||V.startsWith("10.")){const X=V.replace(/^(?:https?:\/\/doi\.org\/|doi:\s*)/i,"");if(!T.includes(X)){const J=`https://doi.org/${X}`;G+=` doi:<a href="${re(J)}" target="_blank">${re(X)}</a>`}}else T.includes(V)||(G+=` <a href="${re(V)}" target="_blank">${re(V)}</a>`)}return G};return m.forEach(p=>{let T=p.content||"";const W=[];p.tables&&p.tables.length&&p.tables.forEach(($,X)=>{const J=$.manualNumber||X+1,E=$.fontSize?` style="font-size: ${$.fontSize}pt;"`:"";let F=`
        <div class="table-container" id="tbl-${p.id}-${X}"${E}>
          <div class="table-caption"><strong>Table ${o(J)}:</strong> ${o($.caption)}</div>
          <div class="table-scroll">
            <table>`;$.headers&&$.headers.length&&(F+="<thead>",Array.isArray($.headers[0])?$.headers.forEach(ae=>{F+="<tr>",ae.forEach(fe=>{F+=we(fe,!0)}),F+="</tr>"}):(F+="<tr>",$.headers.forEach(ae=>{F+=we(ae,!0)}),F+="</tr>"),F+="</thead>"),$.rows&&$.rows.length&&(F+="<tbody>",Array.isArray($.rows[0])?$.rows.forEach(ae=>{F+="<tr>",ae.forEach((fe,be)=>{const qe=$.headerCol&&be===0;F+=we(fe,qe)}),F+="</tr>"}):$.rows.forEach(ae=>{F+="<tr>";const fe=$.headers.length;for(let be=0;be<fe;be++){const qe=ae[`col-${be}`]||"";F+=we({text:qe},!1)}F+="</tr>"}),F+="</tbody>"),F+=`
            </table>
          </div>`,$.footnote&&(F+=`<div class="table-note">${o($.footnote)}</div>`),F+="</div>",W.push({num:J,html:F,placed:!1})});const G=[];p.figures&&p.figures.length&&p.figures.forEach(($,X)=>{const J=X+1,E=`
        <figure class="figure-container" id="fig-${p.id}-${X}">
          <img src="${o($.url)}" alt="${o($.alt||$.caption||"")}" class="article-image" />
          <figcaption class="figure-caption"><strong>Figure ${J}:</strong> ${o($.caption)}</figcaption>
        </figure>`;G.push({num:J,html:E,placed:!1})}),T=T.replace(/<img\b[^>]*>/gi,""),T=T.replace(/font-family:[^;"]*;?/gi,"").replace(/font-size:[^;"]*;?/gi,"").replace(/text-align:\s*left;?/gi,""),W.forEach($=>{const X=String($.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),J=new RegExp(`@\\[Table[\\s:]*${X}\\]`,"gi"),E=T.replace(J,$.html);E!==T&&(T=E,$.placed=!0)}),G.forEach($=>{const X=String($.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),J=new RegExp(`@\\[Figure[\\s:]*${X}\\]`,"gi"),E=T.replace(J,$.html);E!==T&&(T=E,$.placed=!0)});let V="";W.forEach($=>{$.placed||(V+=$.html)}),G.forEach($=>{$.placed||(V+=$.html)}),ze+=`
    <section class="article-section" id="sec-${p.id}">
      <h2 class="section-title">${o(p.title)}</h2>
      <div class="section-text-content">${T}</div>
      ${V}
    </section>`}),`<!-- Published by Anviksha Publisher | Journal of Public and Clinical Health Research -->
<!DOCTYPE html>
<html lang="${o(t.language||"en")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${o(t.title)}</title>
  <meta name="description" content="${o(z)}">
  
  <!-- Canonical and alternate links -->
  <link rel="canonical" href="${o(O)}">
  <link rel="alternate" type="application/pdf" href="${o(j)}">
  
  <!-- Google Scholar Metadata Tags -->
  <meta name="citation_title" content="${o(t.title)}">
${H}  <meta name="citation_publication_date" content="${o(g)}">
  <meta name="citation_journal_title" content="${o(e.title)}">
  <meta name="citation_journal_abbrev" content="${o(e.abbreviation)}">
  <meta name="citation_volume" content="${o(t.volume)}">
  <meta name="citation_issue" content="${o(t.issue)}">
  <meta name="citation_firstpage" content="${o(ke)}">
  <meta name="citation_lastpage" content="${o(t.lpage)}">
  <meta name="citation_article_type" content="${o(I(t.type))}">
${te}  <meta name="citation_issn" content="${o(x)}">
  <meta name="citation_publisher" content="${o(e.publisher)}">
  <meta name="citation_language" content="${o(t.language)}">
  <meta name="citation_pdf_url" content="${o(j)}">
  <meta name="citation_fulltext_html_url" content="${o(O)}">
  
  <!-- Open Graph Metadata -->
  <meta property="og:title" content="${o(t.title)}">
  <meta property="og:description" content="${o(z)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${o(O)}">
  <meta property="og:site_name" content="${o(e.title)}">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(D,null,2)}
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
${R}    </nav>

    <!-- Header -->
    <header class="article-header">
      ${e.logo_url?`
      <div class="journal-logo-wrap">
        <a href="${o(e.website_url)}" target="_blank">
          <img src="${o(e.logo_url)}" alt="${o(e.title)}" class="journal-logo" />
        </a>
      </div>`:""}
      
      <div class="article-type">${o(I(t.type))}</div>
      <div class="article-metadata-line">${ot}</div>
      ${Ne?`<div class="article-metadata-line">${Ne}</div>`:""}
      
      <h1 class="article-title">${o(t.title)}</h1>
      ${t.subtitle?`<h2 class="article-title-subtitle" style="font-size:1.4rem; font-weight:500; color:var(--text-light); margin:0 0 1.5rem 0;">${o(t.subtitle)}</h2>`:""}
      
      <!-- Authors -->
      <div class="authors-block">
        ${h}
      </div>

      <!-- Affiliations -->
      <div class="affiliations-block">
        ${M}
        ${q}
      </div>
    </header>

    <!-- Abstract -->
    ${k?`
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
    ${ze}

    <!-- References -->
    ${f.length?`
    <section class="article-section" id="references">
      <h2 class="section-title">References</h2>
      <ol class="references-list">
        ${f.map(p=>`
          <li class="reference-item">
            ${nt(p)}
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
          ${Pe}
        </div>
      </div>
    </footer>
  </div>
</body>
</html>`}function ea(){const a=n.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],s=a.affiliations||[],i=a.dates||{},l=a.abstract||{},d=a.keywords||[],c=a.copyright||{},m=a.sections||[],f=a.references||[],o=u=>{if(u==null)return"";const g=String(u),P=gt(g);return He(P)},S=u=>u?u.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim().length===0||u==="<p><br></p>":!0,I=u=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[u]||u||"Research Article",v=u=>{if(!u)return"";const P=new DOMParser().parseFromString(u,"text/html"),D={b:"bold",strong:"bold",i:"italic",em:"italic",u:"underline",sub:"sub",p:"p",ul:"list",ol:"list",li:"list-item"},te=(R,b=!1)=>{if(R.nodeType===3)return He(R.textContent);if(R.nodeType!==1)return"";const y=R.tagName.toLowerCase();let h="";const M=y==="p";for(const q of R.childNodes)h+=te(q,b||M);if(y==="sup"){const q=R.textContent.trim();return/^\[\s*\d[\d,\s-]*\]$/.test(q)?`<xref ref-type="bibr">${h}</xref>`:`<sup>${h}</sup>`}if(y==="br")return" ";if(y==="ul")return`<list list-type="bullet">${h}</list>`;if(y==="ol")return`<list list-type="order">${h}</list>`;if(y==="li")return h.trim().startsWith("<p>")||(h=`<p>${h}</p>`),`<list-item>${h}</list-item>`;if(D[y]){const q=D[y];return q==="p"?b?h:h.trim()?`<p>${h}</p>`:"":`<${q}>${h}</${q}>`}return h};let x="";for(const R of P.body.childNodes)x+=te(R,!1);const H=x.trim();return H&&!H.startsWith("<p>")&&!H.startsWith("<list")&&(x=`<p>${x}</p>`),x},_=u=>{let g=v(u.text||"");return g=g.replace(/^<p>(.*)<\/p>$/is,"$1"),u.bold&&(g=`<bold>${g}</bold>`),u.italic&&(g=`<italic>${g}</italic>`),u.underline&&(g=`<underline>${g}</underline>`),u.superscript&&(g=`<sup>${g}</sup>`),u.subscript&&(g=`<sub>${g}</sub>`),g},O=u=>{if(!u)return null;const g=u.split("-");return g.length===3?{year:g[0],month:g[1],day:g[2]}:null},k=`<?xml version="1.0" encoding="UTF-8"?>
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
          <subject>${o(I(t.type))}</subject>
        </subj-group>
      </article-categories>
      
      <title-group>
        <article-title>${o(t.title)}</article-title>
        ${t.subtitle?`<subtitle>${o(t.subtitle)}</subtitle>`:""}
      </title-group>

      <!-- Contributor list -->
      <contrib-group>
        ${r.map((u,g)=>`
        <contrib contrib-type="author" ${g+1===parseInt(t.correspondence_author,10)?'corresp="yes"':""}>
          <name>
            <surname>${o(u.surname)}</surname>
            <given-names>${o(u.given)}${u.middle?" "+o(u.middle):""}</given-names>
          </name>
          ${u.email?`<email>${o(u.email)}</email>`:""}
          ${u.orcid?`<contrib-id contrib-id-type="orcid">https://orcid.org/${o(u.orcid)}</contrib-id>`:""}
          ${u.affiliation_ids&&u.affiliation_ids.length?u.affiliation_ids.map(D=>`
          <xref ref-type="aff" rid="aff-${D}" />`).join(""):""}
        </contrib>`).join("")}
      </contrib-group>

      <!-- Affiliations -->
      ${s.map((u,g)=>`
      <aff id="aff-${g+1}">
        ${u.ror_id?`<institution-id institution-id-type="ror">${o(u.ror_id)}</institution-id>`:""}
        <institution>${o(u.text)}</institution>
      </aff>`).join("")}

      <!-- Correspondence marker -->
      ${(()=>{const u=parseInt(t.correspondence_author,10);if(u>0&&r[u-1]){const g=r[u-1];return`
      <author-notes>
        <corresp id="cor1">*Correspondence: ${o(g.given)} ${o(g.surname)} <email>${o(g.email)}</email></corresp>
      </author-notes>`}return""})()}

      <!-- Dates -->
      ${(()=>{let u="";const g=O(i.received),P=O(i.accepted),D=O(i.published);return g&&(u+=`
      <history>
        <date date-type="received">
          <day>${g.day}</day>
          <month>${g.month}</month>
          <year>${g.year}</year>
        </date>`),P&&(g||(u+=`
      <history>`),u+=`
        <date date-type="accepted">
          <day>${P.day}</day>
          <month>${P.month}</month>
          <year>${P.year}</year>
        </date>`),(g||P)&&(u+=`
      </history>`),D?u+=`
      <pub-date pub-type="epub">
        <day>${D.day}</day>
        <month>${D.month}</month>
        <year>${D.year}</year>
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
      ${S(l.content)?"":`
      <abstract>
        ${v(l.content)}
      </abstract>`}

      <!-- Keywords -->
      ${d.length?`
      <kwd-group kwd-group-type="author">
        ${d.map(u=>`<kwd>${o(u)}</kwd>`).join(`
        `)}
      </kwd-group>`:""}
    </article-meta>
  </front>

  <body>
    ${m.map(u=>{let g=v(u.content);const P=[];u.tables&&u.tables.length&&u.tables.forEach((x,H)=>{const R=x.manualNumber||H+1;let b=`
      <table-wrap id="tbl-${u.id}-${H}">
        <label>Table ${o(R)}</label>
        <caption><p>${o(x.caption)}</p></caption>
        <table>`;x.headers&&x.headers.length&&(b+=`
          <thead>`,Array.isArray(x.headers[0])?x.headers.forEach(y=>{b+=`
            <tr>`,y.forEach(h=>{if(h.hidden)return;const M=h.align?` align="${h.align}"`:"",q=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",Z=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"";b+=`
              <th${M}${q}${Z}>${_(h)}</th>`}),b+=`
            </tr>`}):(b+=`
            <tr>`,x.headers.forEach(y=>{if(y.hidden)return;const h=y.align?` align="${y.align}"`:"",M=y.colspan&&y.colspan>1?` colspan="${y.colspan}"`:"",q=y.rowspan&&y.rowspan>1?` rowspan="${y.rowspan}"`:"";b+=`
              <th${h}${M}${q}>${_(y)}</th>`}),b+=`
            </tr>`),b+=`
          </thead>`),x.rows&&x.rows.length&&(b+=`
          <tbody>`,Array.isArray(x.rows[0])?x.rows.forEach(y=>{b+=`
            <tr>`,y.forEach((h,M)=>{if(h.hidden)return;const q=h.align?` align="${h.align}"`:"",Z=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",le=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"",se=x.headerCol&&M===0?"th":"td";b+=`
              <${se}${q}${Z}${le}>${_(h)}</${se}>`}),b+=`
            </tr>`}):x.rows.forEach(y=>{b+=`
            <tr>`;const h=x.headers.length;for(let M=0;M<h;M++){const q=y[`col-${M}`]!==void 0?{text:y[`col-${M}`]}:{};if(q.hidden)continue;const Z=x.headerCol&&M===0?"th":"td",le=q.colspan&&q.colspan>1?` colspan="${q.colspan}"`:"",se=q.rowspan&&q.rowspan>1?` rowspan="${q.rowspan}"`:"";b+=`
              <${Z}${le}${se}>${_(q)}</${Z}>`}b+=`
            </tr>`}),b+=`
          </tbody>`),b+=`
        </table>`,x.footnote&&(b+=`
        <table-wrap-foot>
          <fn id="fn-tbl-${u.id}-${H}">
            <p>${o(x.footnote)}</p>
          </fn>
        </table-wrap-foot>`),b+=`
      </table-wrap>`,P.push({num:R,xml:b,placed:!1})});const D=[];u.figures&&u.figures.length&&u.figures.forEach((x,H)=>{const R=H+1,b=x.base64Data?x.base64Data:o(x.url),y=`
      <fig id="fig-${u.id}-${H}">
        <label>Figure ${R}</label>
        <caption><p>${o(x.caption)}</p></caption>
        <graphic mimetype="image" mime-subtype="png" xlink:href="${b}" />
      </fig>`;D.push({num:R,xml:y,placed:!1})}),P.forEach(x=>{const H=String(x.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),R=new RegExp(`@\\[Table[\\s:]*${H}\\]`,"gi"),b=g.replace(R,x.xml);b!==g&&(g=b,x.placed=!0)}),D.forEach(x=>{const H=String(x.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),R=new RegExp(`@\\[Figure[\\s:]*${H}\\]`,"gi"),b=g.replace(R,x.xml);b!==g&&(g=b,x.placed=!0)}),g=g.replace(/<p>\s*<\/p>/g,"");let te="";return P.forEach(x=>{x.placed||(te+=x.xml)}),D.forEach(x=>{x.placed||(te+=x.xml)}),`
    <sec id="sec-${u.id}">
      <title>${o(u.title)}</title>
      ${g}
      ${te}
    </sec>`}).join("")}
  </body>

  <!-- References list -->
  ${f.length?`
  <back>
    <ref-list>
      <title>References</title>
      ${f.map((u,g)=>`
      <ref id="ref-${g+1}">
        <label>${g+1}</label>
        <mixed-citation publication-type="journal">
          ${o(u.text)}
          ${u.url?`<pub-id pub-id-type="doi">${o(String(u.url).replace(/^https?:\/\/doi\.org\//i,""))}</pub-id>`:""}
        </mixed-citation>
      </ref>`).join("")}
    </ref-list>
  </back>`:""}
</article>`.trim(),z=new DOMParser().parseFromString(k,"application/xml").getElementsByTagName("parsererror");if(z.length>0)throw console.error("XML Validation Error:",z[0].textContent),new Error("JATS XML Generation Failed: Invalid XML structure detected.");return k}function ta(){const a=[],e=n.collectAll(),t=e.journal||{},r=e.article||{},s=e.authors||[],i=e.dates||{},l=e.abstract||{},d=e.keywords||[];return t.title?a.push({status:"pass",message:"Journal Title is set."}):a.push({status:"fail",message:"Journal Title is required."}),!t.issn_print&&!t.issn_online?a.push({status:"warn",message:"Both Print and Online ISSNs are missing."}):a.push({status:"pass",message:"At least one ISSN is set."}),r.title?a.push({status:"pass",message:"Article Title is set."}):a.push({status:"fail",message:"Article Title is required."}),r.doi?/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(r.doi)?a.push({status:"pass",message:"Article DOI is set and format is valid."}):a.push({status:"warn",message:"Article DOI format looks invalid (expected 10.xxxx/yyyy)."}):a.push({status:"fail",message:"Article DOI is required."}),r.article_id?a.push({status:"pass",message:"Article ID is set."}):a.push({status:"fail",message:"Article ID (for file exports) is required."}),s.length?(a.push({status:"pass",message:`Found ${s.length} author(s).`}),s.forEach((m,f)=>{m.orcid&&(/^\d{4}-\d{4}-\d{4}-[\dX]{4}$/i.test(m.orcid)?a.push({status:"pass",message:`Author ${f+1} has a valid ORCID ID.`}):a.push({status:"warn",message:`Author ${f+1} (${m.given||""} ${m.surname||""}) has an invalid ORCID ID format (expected XXXX-XXXX-XXXX-XXXX).`})),m.email||a.push({status:"warn",message:`Author ${f+1} is missing an email address.`})})):a.push({status:"fail",message:"At least one Author is required."}),i.published?a.push({status:"pass",message:"Publication Date is set."}):a.push({status:"warn",message:"Publication Date is missing."}),!l.content||l.content.trim()===""||l.content==="<p><br></p>"||l.content.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim()===""?r.type==="editorial"?a.push({status:"pass",message:"Abstract is blank (optional for Editorial type)."}):a.push({status:"warn",message:"Article Abstract is missing (will be omitted from output)."}):a.push({status:"pass",message:"Abstract content is set."}),d.length?a.push({status:"pass",message:`Found ${d.length} keyword(s).`}):a.push({status:"warn",message:"At least one keyword should be added."}),a}function aa(a){const e=[];if(!a)return[{status:"fail",message:"XML string is empty."}];a.includes("&nbsp;")?e.push({status:"fail",message:"XML contains raw &nbsp; entities, which will trigger parse errors. Replace with regular spaces."}):e.push({status:"pass",message:"No unescaped HTML-only entities (&nbsp;) detected."});try{const r=new DOMParser().parseFromString(a,"text/xml"),s=r.querySelector("parsererror");if(s)return e.push({status:"fail",message:`XML Parser Error: ${s.textContent}`}),e;e.push({status:"pass",message:"XML is well-formed and parses successfully."});const i=r.querySelector("front"),l=r.querySelector("body");i||e.push({status:"fail",message:"JATS XML is missing <front> tag."}),l||e.push({status:"warn",message:"JATS XML is missing <body> tag."}),r.querySelector('article-meta > article-id[pub-id-type="doi"]')?e.push({status:"pass",message:"JATS XML contains article DOI."}):e.push({status:"fail",message:"Missing DOI article-id tag in article-meta."}),r.querySelector("title-group > article-title")||e.push({status:"fail",message:"Missing <article-title> in JATS XML."}),r.querySelectorAll('contrib-group > contrib[contrib-type="author"]').length===0&&e.push({status:"fail",message:"Missing contributor/author entries in JATS XML."})}catch(t){e.push({status:"fail",message:`Critical error during XML parsing: ${t.message}`})}return e}function ra(a){const e=[];if(!a)return[{status:"fail",message:"HTML string is empty."}];try{const r=new DOMParser().parseFromString(a,"text/html");r.querySelector('meta[name="citation_title"]')?e.push({status:"pass",message:"Has citation_title meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_title meta tag."});const i=r.querySelectorAll('meta[name="citation_author"]');i.length===0?e.push({status:"fail",message:"Missing Google Scholar citation_author meta tags."}):e.push({status:"pass",message:`Found ${i.length} citation_author meta tag(s).`}),r.querySelector('meta[name="citation_doi"]')?e.push({status:"pass",message:"Has citation_doi meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_doi meta tag."}),r.querySelector('meta[name="citation_pdf_url"]')?e.push({status:"pass",message:"Has citation_pdf_url meta tag."}):e.push({status:"warn",message:"Missing Google Scholar citation_pdf_url meta tag."}),r.querySelector('link[rel="canonical"]')?e.push({status:"pass",message:"Has canonical URL link."}):e.push({status:"fail",message:"Missing Canonical URL link tag."});const m=r.querySelector('meta[property="og:title"]'),f=r.querySelector('meta[property="og:description"]');!m||!f?e.push({status:"warn",message:"Missing Open Graph meta tags (og:title, og:description)."}):e.push({status:"pass",message:"Has Open Graph metadata."});const o=r.querySelector('script[type="application/ld+json"]');if(!o)e.push({status:"fail",message:"Missing Schema.org JSON-LD structured data block."});else try{JSON.parse(o.textContent)["@type"]!=="ScholarlyArticle"?e.push({status:"warn",message:"Schema.org @type is not set to ScholarlyArticle."}):e.push({status:"pass",message:"Has valid Schema.org JSON-LD scholarly article markup."})}catch(v){e.push({status:"fail",message:`Schema.org JSON-LD script contains invalid JSON: ${v.message}`})}const S=r.querySelector("title");(!S||!S.textContent.trim())&&e.push({status:"fail",message:"HTML document title is empty or missing."}),r.querySelector("h1")||e.push({status:"warn",message:"Missing article title header (h1)."})}catch(t){e.push({status:"fail",message:`Critical error during HTML validation: ${t.message}`})}return e}let A=null,ue="",pe="",Ie=null;function ia(a){A=a,Me(),n.on("change",sa),n.on("load",()=>{Me(),Ae()}),n.on("reset",()=>{Me(),oa()})}function Me(){A&&(A.innerHTML=`
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Generate Galleys</h2>
        <p class="card-description" style="margin-bottom:1.5rem;">
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
  `,A.querySelector("#btn-generate-all").addEventListener("click",()=>{Ae(),L("Outputs generated")}),A.querySelector("#btn-download-html").addEventListener("click",la),A.querySelector("#btn-download-xml").addEventListener("click",ca),A.querySelector("#btn-validate").addEventListener("click",na),A.querySelector("#btn-copy-html").addEventListener("click",()=>{Ve(ue,"HTML source copied to clipboard")}),A.querySelector("#btn-copy-xml").addEventListener("click",()=>{Ve(pe,"JATS XML source copied to clipboard")}),A.querySelector("#btn-fullscreen-html").addEventListener("click",()=>{const a=A.querySelector("#html-preview-frame");a&&a.requestFullscreen&&a.requestFullscreen()}))}function sa(){var e;(e=A==null?void 0:A.querySelector("#chk-live-preview"))!=null&&e.checked&&(Ie&&clearTimeout(Ie),Ie=setTimeout(()=>{Ae(!0)},500))}function Ae(a=!1){if(A)try{ue=Qt(),pe=ea(),A.querySelector("#btn-download-html").disabled=!1,A.querySelector("#btn-download-xml").disabled=!1,A.querySelector("#btn-copy-html").disabled=!1,A.querySelector("#btn-copy-xml").disabled=!1,A.querySelector("#btn-fullscreen-html").disabled=!1;const e=A.querySelector("#html-preview-frame");if(e){const r=e.contentDocument||e.contentWindow.document;r.open(),r.write(ue),r.close()}const t=A.querySelector("#xml-preview-code");t&&(t.innerHTML=bt(pe))}catch(e){a||L("Error generating outputs: "+e.message,"error"),console.error(e)}}function oa(){if(!A)return;A.querySelector("#btn-download-html").disabled=!0,A.querySelector("#btn-download-xml").disabled=!0,A.querySelector("#btn-copy-html").disabled=!0,A.querySelector("#btn-copy-xml").disabled=!0;const a=A.querySelector("#html-preview-frame");if(a){const t=a.contentDocument||a.contentWindow.document;t.open(),t.write('<html><body><div style="font-family:sans-serif; color:#7f8c8d; text-align:center; margin-top:100px;">Click Generate to preview</div></body></html>'),t.close()}const e=A.querySelector("#xml-preview-code");e&&(e.innerHTML=""),A.querySelector("#validation-panel").style.display="none"}function na(){if(!A)return;(!ue||!pe)&&Ae(!0);const a=A.querySelector("#validation-panel"),e=A.querySelector("#validation-list");a.style.display="block";const t=ta(),r=aa(pe),s=ra(ue),i=[...t.map(c=>({...c,category:"Metadata"})),...r.map(c=>({...c,category:"JATS XML"})),...s.map(c=>({...c,category:"HTML Galley"}))];let l="";i.forEach(c=>{let m="✅",f="#2ecc71",o="#e8f8f5";c.status==="fail"?(m="❌",f="#e74c3c",o="#fdebd0"):c.status==="warn"&&(m="⚠️",f="#f39c12",o="#fef9e7"),l+=`
      <div style="display:flex; align-items:center; gap:0.5rem; padding:0.4rem 0.8rem; border-radius:6px; background:${o}; color:#333; margin-bottom:0.2rem; border-left:4px solid ${f};">
        <span style="font-size:1.1rem;">${m}</span>
        <span style="font-weight:600; font-size:0.8rem; color:${f}; min-width:80px; text-transform:uppercase;">[${c.category}]</span>
        <span style="font-size:0.85rem;">${re(c.message)}</span>
      </div>
    `}),e.innerHTML=l,i.some(c=>c.status==="fail")?L("Validation failed with errors. Check details below.","error"):L("Validation passed with success or warnings.","success")}function la(){const a=n.get("journal.abbreviation")||"journal",e=n.get("article.article_id")||"galley",t=`${a}.${e}.html`.toLowerCase(),r=new Blob([ue],{type:"text/html;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),L(`HTML downloaded as ${t}`)}function ca(){const a=n.get("journal.abbreviation")||"journal",e=n.get("article.article_id")||"galley",t=`${a}.${e}.xml`.toLowerCase(),r=new Blob([pe],{type:"text/xml;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),L(`JATS XML downloaded as ${t}`)}function Ve(a,e){navigator.clipboard.writeText(a).then(()=>{L(e)}).catch(t=>{console.error("Failed to copy to clipboard:",t),L("Failed to copy to clipboard","error")})}function L(a,e="success"){const t=document.getElementById("toast-container");if(!t)return;const r=document.createElement("div");r.className=`toast toast-${e}`,r.style.padding="0.75rem 1.25rem",r.style.borderRadius="8px",r.style.fontSize="0.9rem",r.style.color="white",r.style.animation="slideIn 0.3s ease-out",r.style.boxShadow="0 4px 6px rgba(0,0,0,0.1)";let s="#10b981";e==="error"?s="#ef4444":e==="warning"?s="#f59e0b":e==="info"&&(s="#022744"),r.style.background=s,r.textContent=a,t.appendChild(r),setTimeout(()=>{r.style.animation="slideOut 0.3s ease-in forwards",r.addEventListener("animationend",()=>r.remove())},1e3)}function Ke(){da(),ua(),pa(),dt(document.getElementById("panel-journal-profile")),$t(document.getElementById("panel-metadata")),_t(document.getElementById("panel-import")),jt(document.getElementById("panel-body")),Gt(document.getElementById("panel-references")),ia(document.getElementById("panel-generate")),L("GalleyForge initialized successfully","info")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ke):Ke();function da(){const a=document.documentElement,e=localStorage.getItem("galley-theme")||"dark-gray";a.setAttribute("data-theme",e),at(e),document.getElementById("theme-toggle-light").addEventListener("click",()=>{Ze("light")}),document.getElementById("theme-toggle-dark").addEventListener("click",()=>{Ze("dark-gray")})}function Ze(a){document.documentElement.setAttribute("data-theme",a),localStorage.setItem("galley-theme",a),at(a),L(`Switched to ${a==="light"?"Light":"Dark Gray"} theme`,"info")}function at(a){const e=document.getElementById("theme-toggle-light"),t=document.getElementById("theme-toggle-dark");a==="light"?(e.classList.add("active"),t.classList.remove("active")):(e.classList.remove("active"),t.classList.add("active"))}function ua(){const a=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".tab-panel");a.forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.tab;a.forEach(s=>s.classList.remove("active")),t.classList.add("active"),e.forEach(s=>{s.id===r?(s.classList.add("active"),s.style.display="block"):(s.classList.remove("active"),s.style.display="none")})})}),e.forEach(t=>{t.id==="panel-metadata"?(t.classList.add("active"),t.style.display="block"):t.style.display="none"})}function pa(){const a=document.getElementById("btn-save-project"),e=document.getElementById("btn-load-project"),t=document.getElementById("file-load-project");a.addEventListener("click",()=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(n.toJSON()),s=document.createElement("a");s.setAttribute("href",r);const i=n.get("article.article_id")||"project";s.setAttribute("download",`${i}-galleyforge.json`),document.body.appendChild(s),s.click(),s.remove(),L("Project saved successfully")}),e.addEventListener("click",()=>t.click()),t.addEventListener("change",r=>{const s=r.target.files[0];if(!s)return;const i=new FileReader;i.onload=function(l){try{n.fromJSON(l.target.result),L("Project loaded successfully")}catch(d){L("Failed to load project: "+d.message,"error")}},i.readAsText(s),r.target.value=""})}
