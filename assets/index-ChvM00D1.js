(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const qe={journal:{title:"",issn_print:"",issn_online:"",publisher:"",abbreviation:"",logo_url:"",website_url:"",doi_prefix:"",base_url:""},article:{title:"",subtitle:"",doi:"",type:"research-article",language:"en",volume:"",issue:"",fpage:"",lpage:"",elocation_id:"",year:"",issue_months:"",article_id:"",correspondence_author:0},authors:[],affiliations:[],dates:{received:"",revised:"",accepted:"",published:""},abstract:{content:""},keywords:[],copyright:{holder:"",year:new Date().getFullYear().toString(),license:"CC-BY-NC-SA-4.0"},sections:[],references:[]};class ot{constructor(){this.listeners={},this.data=JSON.parse(JSON.stringify(qe))}reset(){this.data=JSON.parse(JSON.stringify(qe)),this.data.copyright.year=new Date().getFullYear().toString(),this.emit("reset"),this.emit("change")}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}emit(e){this.listeners[e]&&this.listeners[e].forEach(t=>{try{t()}catch(r){console.error(`Error in listener for event ${e}:`,r)}})}get(e){if(!e)return this.data;const t=e.split(".");let r=this.data;for(const s of t){if(r==null)return;r=r[s]}return r}set(e,t){if(!e)return;const r=e.split(".");let s=this.data;for(let i=0;i<r.length-1;i++){const c=r[i];(s[c]===void 0||s[c]===null)&&(s[c]={}),s=s[c]}s[r[r.length-1]]=t,this.emit("change")}collectAll(){return JSON.parse(JSON.stringify(this.data))}toJSON(){return JSON.stringify(this.data,null,2)}fromJSON(e){try{const t=typeof e=="string"?JSON.parse(e):e;this.data=this.deepMerge(JSON.parse(JSON.stringify(qe)),t),this.emit("load"),this.emit("change")}catch(t){throw console.error("Failed to import JSON data:",t),t}}deepMerge(e,t){if(!t)return e;for(const r of Object.keys(t))t[r]instanceof Object&&!Array.isArray(t[r])?(e[r]||(e[r]={}),this.deepMerge(e[r],t[r])):e[r]=t[r];return e}}const o=new ot,Qe=[{path:"journal.title",label:"Journal Title",required:!0,placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"journal.abbreviation",label:"Journal Abbreviation",placeholder:"e.g., JPCHR"},{path:"journal.issn_print",label:"ISSN (Print)",placeholder:"XXXX-XXXX"},{path:"journal.issn_online",label:"ISSN (Online)",placeholder:"XXXX-XXXX"},{path:"journal.publisher",label:"Publisher Name",placeholder:"e.g., Anviksha Publisher"},{path:"journal.logo_url",label:"Journal Logo URL",placeholder:"https://example.com/logo.png"},{path:"journal.website_url",label:"Journal Website URL",placeholder:"https://example.com"},{path:"journal.base_url",label:"Base URL (for Canonical Links)",placeholder:"https://jpchr.com/jpchr"},{path:"journal.doi_prefix",label:"DOI Prefix",placeholder:"e.g., 10.63486"},{path:"copyright.holder",label:"Copyright Holder",placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"copyright.year",label:"Copyright Year",placeholder:new Date().getFullYear().toString()}],lt=[{value:"CC-BY-4.0",label:"Creative Commons Attribution 4.0 International (CC BY 4.0)"},{value:"CC-BY-NC-4.0",label:"Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"},{value:"CC-BY-NC-SA-4.0",label:"Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)"},{value:"CC-BY-NC-ND-4.0",label:"Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)"},{value:"CC-BY-SA-4.0",label:"Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)"},{value:"CC0-1.0",label:"Creative Commons CC0 1.0 Universal Public Domain Dedication"},{value:"other",label:"Other / Custom License"}];let Q=null;function ct(a){Q=a,dt(),o.on("load",()=>Le()),o.on("reset",()=>Le())}function dt(){if(!Q)return;Q.innerHTML=`
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
                ${lt.map(r=>`
                  <option value="${r.value}">${r.label}</option>
                `).join("")}
              </select>
            </div>
          </div>
        </form>
      </div>

    </div>
  `,Q.querySelectorAll(".profile-input").forEach(r=>{r.addEventListener("input",()=>{const s=r.dataset.path;o.set(s,r.value)})}),Q.querySelector("#btn-download-profile").addEventListener("click",ut);const e=Q.querySelector("#btn-upload-profile"),t=Q.querySelector("#file-upload-profile");e.addEventListener("click",()=>t.click()),t.addEventListener("change",pt),Q.querySelector("#btn-apply-profile").addEventListener("click",mt),Le()}function Le(){if(!Q)return;Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path,r=o.get(t);e.value=r!==void 0?r:""})}function ut(){const a={};Qe.forEach(r=>{a[r.path]=o.get(r.path)||""}),a["copyright.license"]=o.get("copyright.license")||"CC-BY-NC-SA-4.0";const e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(a,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","journal-profile.json"),document.body.appendChild(t),t.click(),t.remove(),E("Journal profile downloaded")}function pt(a){const e=a.target.files[0];if(!e)return;const t=new FileReader;t.onload=function(r){try{const s=JSON.parse(r.target.result);for(const[i,c]of Object.entries(s))o.set(i,c);Le(),E("Journal profile uploaded successfully")}catch(s){E("Failed to parse profile JSON","error"),console.error(s)}},t.readAsText(e),a.target.value=""}function mt(){Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path;o.set(t,e.value)}),o.emit("load"),E("Profile applied to project successfully")}function He(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function re(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ft(a){if(!a)return"";let e=re(a);return e=e.replace(/&lt;(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*&quot;[^&]*?&quot;)*)\s*(\/?)\s*&gt;/g,(t,r,s,i,c)=>{let l="";return i&&(l=i.replace(/([\w:.-]+)\s*=\s*&quot;([^&]*?)&quot;/g,(d,m,f)=>` <span style="color:#4ec9b0">${m}</span>=<span style="color:#ce9178">&quot;${f}&quot;</span>`)),`<span style="color:#569cd6">&lt;${r}${s}</span>${l}<span style="color:#569cd6">${c}&gt;</span>`}),e}function Me(){const a=new Uint8Array(4);return crypto.getRandomValues(a),Array.from(a,e=>e.toString(16).padStart(2,"0")).join("")}function Re(a){if(!a)return"";let e=a;const t=e.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);t&&(e=t[1]),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->/gi,""),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?endif-->/gi,"");const s=new DOMParser().parseFromString(e,"text/html"),i=new Set(["p","b","strong","i","em","u","sup","sub","h1","h2","h3","h4","ul","ol","li","br","table","tr","td","th","tbody","thead"]),c=new Set(["p","h1","h2","h3","h4","ul","ol","li","table","tbody","thead","tr","td","th"]),l=S=>{if(S.nodeType===3)return S.textContent=S.textContent.replace(/\u00A0/g," "),S;if(S.nodeType!==1)return null;const _=S.tagName.toLowerCase();let v=_;if(_==="span"||_==="font"){const N=(S.getAttribute("style")||"").toLowerCase();N.includes("vertical-align: super")||N.includes("vertical-align:super")||N.includes("mso-text-raise")?v="sup":(N.includes("vertical-align: sub")||N.includes("vertical-align:sub"))&&(v="sub")}v==="strong"&&(v="b"),v==="em"&&(v="i");let I;if(i.has(v)){if(I=s.createElement(v),v==="td"||v==="th"){const N=S.getAttribute("colspan"),L=S.getAttribute("rowspan");N&&I.setAttribute("colspan",N),L&&I.setAttribute("rowspan",L)}}else I=s.createDocumentFragment();const H=Array.from(S.childNodes);for(const N of H){const L=l(N);L&&(L.nodeType===1&&c.has(L.tagName.toLowerCase())&&c.has(v),I.appendChild(L))}return I.nodeType===1&&v!=="br"&&!["td","th","tr","table","tbody","thead"].includes(v)&&(!I.hasChildNodes()||I.textContent.trim()==="")?null:I},d=s.createDocumentFragment(),m=Array.from(s.body.childNodes);for(const S of m){const _=l(S);_&&d.appendChild(_)}const f=s.createElement("div");f.appendChild(d);let n=f.innerHTML;return n=n.replace(/<p[^>]*>\s*<p[^>]*>/gi,"<p>"),n=n.replace(/<\/p>\s*<\/p>/gi,"</p>"),n.trim()}function bt(a){if(!a)return"";const e={"&nbsp;":" ","&#160;":" ","&ndash;":"–","&#8211;":"–","&mdash;":"—","&#8212;":"—","&lsquo;":"‘","&#8216;":"‘","&rsquo;":"’","&#8217;":"’","&ldquo;":"“","&#8220;":"“","&rdquo;":"”","&#8221;":"”","&bull;":"•","&#8226;":"•","&hellip;":"…","&#8230;":"…","&trade;":"™","&#8482;":"™","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&deg;":"°","&#176;":"°","&micro;":"µ","&#181;":"µ","&times;":"×","&#215;":"×","&divide;":"÷","&#247;":"÷","&plusmn;":"±","&#177;":"±","&frac12;":"½","&frac14;":"¼","&frac34;":"¾","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&mu;":"μ","&pi;":"π","&sigma;":"σ","&le;":"≤","&ge;":"≥","&ne;":"≠","&infin;":"∞","&rarr;":"→","&larr;":"←","&uarr;":"↑","&darr;":"↓","&para;":"¶","&sect;":"§","&dagger;":"†","&Dagger;":"‡"};let t=a;for(const[r,s]of Object.entries(e)){const i=new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");t=t.replace(i,s)}return t}const gt=[{value:"research-article",label:"Research Article"},{value:"review-article",label:"Review Article"},{value:"case-report",label:"Case Report"},{value:"case-series",label:"Case Series"},{value:"systematic-review",label:"Systematic Review"},{value:"meta-analysis",label:"Meta-Analysis"},{value:"editorial",label:"Editorial"},{value:"letter",label:"Letter to the Editor"},{value:"commentary",label:"Commentary"},{value:"brief-report",label:"Brief Report"},{value:"short-communication",label:"Short Communication"},{value:"clinical-trial",label:"Clinical Trial"},{value:"pilot-study",label:"Pilot Study"},{value:"observational-study",label:"Observational Study"},{value:"cross-sectional",label:"Cross-Sectional Study"},{value:"cohort-study",label:"Cohort Study"},{value:"narrative-review",label:"Narrative Review"},{value:"rapid-communication",label:"Rapid Communication"},{value:"erratum",label:"Erratum"},{value:"retraction",label:"Retraction"}],ht=a=>{const e=gt.find(t=>t.value===a||t.label===a);return e?e.label:a||"Research Article"},vt=[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"pt",label:"Portuguese"},{value:"zh",label:"Chinese"},{value:"ja",label:"Japanese"},{value:"ko",label:"Korean"},{value:"ar",label:"Arabic"},{value:"hi",label:"Hindi"}],yt=[8,9,10,11,12,14,16,18,20,22,24];let X=null;function $t(a){X=a,ie(),o.on("load",()=>ie()),o.on("reset",()=>ie())}function ie(){if(!X)return;const a=o.get("authors")||[],e=o.get("affiliations")||[],t=o.get("keywords")||[],r=o.get("article.correspondence_author")||0;X.innerHTML=`
    <!-- Card 1: Journal Info -->
    <div class="card">
      <div class="card-header"><h2 class="card-title">Journal Information</h2></div>
      <div class="card-body">
        <div class="form-row" style="display:grid; grid-template-columns: 2fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">Journal Title <span class="required" style="color:red;">*</span></label>
            <input type="text" class="form-control store-bind" data-path="journal.title" value="${C(o.get("journal.title"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Abbreviation</label>
            <input type="text" class="form-control store-bind" data-path="journal.abbreviation" value="${C(o.get("journal.abbreviation"))}" />
          </div>
        </div>
        <div class="form-row-3" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">ISSN (Print)</label>
            <input type="text" class="form-control store-bind" data-path="journal.issn_print" value="${C(o.get("journal.issn_print"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">ISSN (Online)</label>
            <input type="text" class="form-control store-bind" data-path="journal.issn_online" value="${C(o.get("journal.issn_online"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Publisher</label>
            <input type="text" class="form-control store-bind" data-path="journal.publisher" value="${C(o.get("journal.publisher"))}" />
          </div>
        </div>
        <div class="form-row-2" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:1rem;">
          <div class="form-group">
            <label class="form-label">Journal Logo URL</label>
            <input type="text" class="form-control store-bind" data-path="journal.logo_url" value="${C(o.get("journal.logo_url"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Journal Website URL</label>
            <input type="text" class="form-control store-bind" data-path="journal.website_url" value="${C(o.get("journal.website_url"))}" />
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
          <input type="text" class="form-control store-bind" data-path="article.title" value="${C(o.get("article.title"))}" />
        </div>
        <div class="form-group" style="margin-bottom:1rem;">
          <label class="form-label">Subtitle (Optional)</label>
          <input type="text" class="form-control store-bind" data-path="article.subtitle" value="${C(o.get("article.subtitle"))}" />
        </div>
        <div class="form-row" style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">DOI <span class="required" style="color:red;">*</span></label>
            <input type="text" class="form-control store-bind" data-path="article.doi" placeholder="e.g., 10.63486/jpchr.2026.01" value="${C(o.get("article.doi"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Article Type</label>
            <input type="text" class="form-control store-bind" data-path="article.type" value="${C(ht(o.get("article.type")))}" placeholder="e.g., Research Article" />
          </div>

          <div class="form-group">
            <label class="form-label">Language</label>
            <select class="form-select store-bind" data-path="article.language">
              ${vt.map(l=>`<option value="${l.value}" ${o.get("article.language")===l.value?"selected":""}>${l.label}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="form-row" style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">PDF Galley URL</label>
            <input type="text" class="form-control store-bind" data-path="article.pdf_url" placeholder="https://..." value="${C(o.get("article.pdf_url"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">HTML Galley URL</label>
            <input type="text" class="form-control store-bind" data-path="article.html_url" placeholder="https://..." value="${C(o.get("article.html_url"))}" />
          </div>
        </div>
        <div class="form-row-5" style="display:grid; grid-template-columns: repeat(5, 1fr); gap:1rem; margin-bottom:1rem;">
          <div class="form-group">
            <label class="form-label">Volume</label>
            <input type="text" class="form-control store-bind" data-path="article.volume" value="${C(o.get("article.volume"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Issue</label>
            <input type="text" class="form-control store-bind" data-path="article.issue" value="${C(o.get("article.issue"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">First Page</label>
            <input type="text" class="form-control store-bind" data-path="article.fpage" value="${C(o.get("article.fpage"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Last Page</label>
            <input type="text" class="form-control store-bind" data-path="article.lpage" value="${C(o.get("article.lpage"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">e-Location ID</label>
            <input type="text" class="form-control store-bind" data-path="article.elocation_id" value="${C(o.get("article.elocation_id"))}" />
          </div>
        </div>
        <div class="form-row-3" style="display:grid; grid-template-columns: 1fr 2fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Year</label>
            <input type="text" class="form-control store-bind" data-path="article.year" value="${C(o.get("article.year"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Issue Months</label>
            <input type="text" class="form-control store-bind" data-path="article.issue_months" placeholder="e.g., Jan-Jun" value="${C(o.get("article.issue_months"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Article ID <span class="required" style="color:red;">*</span></label>
            <input type="text" class="form-control store-bind" data-path="article.article_id" placeholder="e.g., e25102701" value="${C(o.get("article.article_id"))}" />
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
          ${a.map((l,d)=>xt(l,d)).join("")}
        </div>
        <div class="form-group" style="margin-top:1.5rem; max-width:300px;">
          <label class="form-label">Corresponding Author</label>
          <select class="form-select" id="select-corr-author">
            <option value="0">None</option>
            ${a.map((l,d)=>`<option value="${d+1}" ${r===d+1?"selected":""}>Author ${d+1}: ${l.given||""} ${l.surname||""}</option>`).join("")}
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
          ${e.map((l,d)=>wt(l,d)).join("")}
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
            <input type="date" class="form-control store-bind" data-path="dates.received" value="${C(o.get("dates.received"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Revised</label>
            <input type="date" class="form-control store-bind" data-path="dates.revised" value="${C(o.get("dates.revised"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Accepted</label>
            <input type="date" class="form-control store-bind" data-path="dates.accepted" value="${C(o.get("dates.accepted"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Published</label>
            <input type="date" class="form-control store-bind" data-path="dates.published" value="${C(o.get("dates.published"))}" />
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
              ${yt.map(l=>`<option value="${l}">${l}pt</option>`).join("")}
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
          ${t.map((l,d)=>`
            <span class="badge" style="background:#022744; color:white; padding:0.4rem 0.8rem; border-radius:16px; display:inline-flex; align-items:center; gap:0.5rem; font-size:0.85rem;">
              ${C(l)}
              <span class="btn-remove-kw" data-idx="${d}" style="cursor:pointer; font-weight:bold; font-size:0.75rem;">✕</span>
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
            <input type="text" class="form-control store-bind" data-path="copyright.holder" value="${C(o.get("copyright.holder"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">Copyright Year</label>
            <input type="text" class="form-control store-bind" data-path="copyright.year" value="${C(o.get("copyright.year"))}" />
          </div>
          <div class="form-group">
            <label class="form-label">License</label>
            <select class="form-select store-bind" data-path="copyright.license">
              <option value="CC-BY-4.0" ${o.get("copyright.license")==="CC-BY-4.0"?"selected":""}>CC BY 4.0</option>
              <option value="CC-BY-NC-4.0" ${o.get("copyright.license")==="CC-BY-NC-4.0"?"selected":""}>CC BY-NC 4.0</option>
              <option value="CC-BY-NC-SA-4.0" ${o.get("copyright.license")==="CC-BY-NC-SA-4.0"?"selected":""}>CC BY-NC-SA 4.0</option>
              <option value="CC-BY-NC-ND-4.0" ${o.get("copyright.license")==="CC-BY-NC-ND-4.0"?"selected":""}>CC BY-NC-ND 4.0</option>
              <option value="CC-BY-SA-4.0" ${o.get("copyright.license")==="CC-BY-SA-4.0"?"selected":""}>CC BY-SA 4.0</option>
              <option value="CC0-1.0" ${o.get("copyright.license")==="CC0-1.0"?"selected":""}>CC0 1.0</option>
              <option value="other" ${o.get("copyright.license")==="other"?"selected":""}>Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,X.querySelectorAll(".store-bind").forEach(l=>{l.addEventListener("input",()=>{const d=l.dataset.path;o.set(d,l.value)})}),X.querySelector("#btn-add-author").addEventListener("click",St),Ct(),X.querySelector("#select-corr-author").addEventListener("change",l=>{o.set("article.correspondence_author",parseInt(l.target.value,10))}),X.querySelector("#btn-add-affiliation").addEventListener("click",Et),Lt();const i=X.querySelector("#abstract-editor");i.innerHTML=o.get("abstract.content")||"",i.addEventListener("input",()=>{o.set("abstract.content",i.innerHTML)}),i.addEventListener("paste",l=>{var m;const d=(m=l.clipboardData)==null?void 0:m.getData("text/html");if(d){l.preventDefault();const f=Re(d);document.execCommand("insertHTML",!1,f)}}),kt();const c=X.querySelector("#keyword-input");c.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===",")&&(l.preventDefault(),At(c.value),c.value="")}),X.querySelectorAll(".btn-remove-kw").forEach(l=>{l.addEventListener("click",()=>{const d=parseInt(l.dataset.idx,10),m=o.get("keywords")||[];m.splice(d,1),o.set("keywords",m),ie()})})}function xt(a,e){return`
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
  `}function wt(a,e){return`
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
  `}function St(){const a=o.get("authors")||[];a.push({given:"",middle:"",surname:"",email:"",orcid:"",affiliation_ids:[]}),o.set("authors",a),ie()}function Ct(){X.querySelectorAll(".btn-remove-author").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=o.get("authors")||[];t.splice(e,1),o.set("authors",t),(o.get("article.correspondence_author")||0)>t.length&&o.set("article.correspondence_author",t.length?1:0),ie()})}),X.querySelectorAll(".author-input").forEach(a=>{a.addEventListener("change",e=>{const t=parseInt(a.dataset.idx,10),r=a.dataset.field,s=o.get("authors")||[];if(r==="affiliation_ids"){const i=a.value.split(",").map(c=>parseInt(c.trim(),10)).filter(Number.isFinite);s[t][r]=i}else if(r==="orcid"){let i=a.value.trim();i.startsWith("https://orcid.org/")?i=i.substring(18):i.startsWith("http://orcid.org/")&&(i=i.substring(17)),s[t][r]=i,a.value=i}else s[t][r]=a.value;o.set("authors",s)})})}function Et(){const a=o.get("affiliations")||[];a.push({text:"",ror_id:""}),o.set("affiliations",a),ie()}function Lt(){X.querySelectorAll(".btn-remove-affiliation").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=o.get("affiliations")||[];t.splice(e,1),o.set("affiliations",t),ie()})}),X.querySelectorAll(".affiliation-input").forEach(a=>{a.addEventListener("change",()=>{const e=parseInt(a.dataset.idx,10),t=a.dataset.field,r=o.get("affiliations")||[];r[e][t]=a.value.trim(),o.set("affiliations",r)})})}function At(a){if(!a)return;const e=a.split(",").map(r=>r.trim()).filter(Boolean),t=o.get("keywords")||[];e.forEach(r=>{t.includes(r)||t.push(r)}),o.set("keywords",t),ie()}function kt(){const a=X.querySelector("#abstract-editor");X.querySelectorAll(".tb-btn[data-cmd]").forEach(t=>{t.addEventListener("mousedown",r=>{r.preventDefault();const s=t.dataset.cmd;document.execCommand(s,!1,null),o.set("abstract.content",a.innerHTML)})}),X.querySelector(".tb-fontsize").addEventListener("change",t=>{const r=t.target.value;r&&(qt(a,r),o.set("abstract.content",a.innerHTML),t.target.value="")})}function qt(a,e){const t=window.getSelection();if(!t.rangeCount||!a.contains(t.anchorNode))return;const r=Math.min(7,Math.max(1,Math.round(parseInt(e,10)/4)));document.execCommand("fontSize",!1,String(r)),a.querySelectorAll("font[size]").forEach(s=>{const i=document.createElement("span");i.style.fontSize=e+"pt",i.innerHTML=s.innerHTML,s.replaceWith(i)})}function C(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Tt(a){if(!a)return;a.innerHTML=`
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
  `;const e=a.querySelector("#ojs-dropzone"),t=a.querySelector("#file-ojs-xml");e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(r=>{e.addEventListener(r,s=>s.preventDefault(),!1)}),e.addEventListener("drop",r=>{const i=r.dataTransfer.files[0];i&&i.name.endsWith(".xml")?Fe(i):E("Please upload a valid XML file","error")}),t.addEventListener("change",r=>{const s=r.target.files[0];s&&Fe(s)})}function Fe(a){const e=new FileReader;e.onload=function(t){try{_t(t.target.result)}catch(r){E("Failed to parse XML file: "+r.message,"error"),console.error(r)}},e.readAsText(a)}function _t(a){const t=new DOMParser().parseFromString(a,"text/xml"),r=t.querySelector("parsererror");if(r)throw new Error(r.textContent);const s=t.querySelector("journal_title, journal title, journal-meta journal-title")?t.querySelector("journal_title, journal title, journal-meta journal-title").textContent.trim():"";s&&o.set("journal.title",s);const i=t.querySelector('issn[type="print"], issn[device="print"], issn')?t.querySelector('issn[type="print"], issn[device="print"], issn').textContent.trim():"";i&&o.set("journal.issn_print",i);const c=t.querySelector('issn[type="online"], issn[device="online"]')?t.querySelector('issn[type="online"], issn[device="online"]').textContent.trim():"";c&&o.set("journal.issn_online",c);const l=t.querySelector("publisher_name, publisher name, publisher-name")?t.querySelector("publisher_name, publisher name, publisher-name").textContent.trim():"";l&&o.set("journal.publisher",l);const d=t.querySelector('article > title, submission > title, article-title, title[locale^="en"]')?t.querySelector('article > title, submission > title, article-title, title[locale^="en"]').textContent.trim():t.querySelector("title")?t.querySelector("title").textContent.trim():"";d&&o.set("article.title",d);const m=t.querySelector('subtitle, subtitle[locale^="en"]')?t.querySelector('subtitle, subtitle[locale^="en"]').textContent.trim():"";m&&o.set("article.subtitle",m);let f="";const n=t.querySelector('id[type="doi"], doi, article-id[pub-id-type="doi"]');if(n)f=n.textContent.trim();else{const b=t.querySelector('id[type="doi_uri"]');b&&(f=b.textContent.trim().replace(/^https?:\/\/doi\.org\//i,""))}if(f){o.set("article.doi",f);const b=f.match(/^(10\.\d{4,9})/);b&&o.set("journal.doi_prefix",b[1])}const S=t.querySelector("volume")?t.querySelector("volume").textContent.trim():"";S&&o.set("article.volume",S);const _=t.querySelector("number, issue")?t.querySelector("number, issue").textContent.trim():"";_&&o.set("article.issue",_);const v=t.querySelector('issue_identification > year, issue > year, publication > year, date-in-citation[content-type="access-date"]')?t.querySelector("issue_identification > year, issue > year, publication > year").textContent.trim():new Date().getFullYear().toString();v&&o.set("article.year",v);const I=t.querySelector("pages, fpage")?t.querySelector("pages, fpage").textContent.trim():"";if(I){const b=I.split("-");o.set("article.fpage",b[0].trim()),b[1]&&o.set("article.lpage",b[1].trim())}const H=t.querySelector("article > id, submission > id")?t.querySelector("article > id, submission > id").textContent.trim():"";H&&o.set("article.article_id",H);const N=t.querySelector('date_submitted, date-received, date[date-type="received"]')?t.querySelector('date_submitted, date-received, date[date-type="received"]').getAttribute("value")||t.querySelector('date_submitted, date-received, date[date-type="received"]').textContent.trim():"";N&&o.set("dates.received",Te(N));const L=t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]')?t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').getAttribute("value")||t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').textContent.trim():"";L&&o.set("dates.accepted",Te(L));const J=t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]')?t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').getAttribute("value")||t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').textContent.trim():"";J&&o.set("dates.published",Te(J));const j=t.querySelector('abstract, abstract[locale^="en"]');j&&o.set("abstract.content",j.innerHTML.trim());const P=t.querySelectorAll("keyword, keywords > keyword"),p=[];P.forEach(b=>{const y=b.textContent.trim();y&&!p.includes(y)&&p.push(y)}),p.length&&o.set("keywords",p);const g=t.querySelectorAll("author"),D=[],z=[];function te(b,y=""){if(!b)return null;let h=z.findIndex(M=>M.text.toLowerCase()===b.toLowerCase());return h===-1&&(z.push({text:b,ror_id:y}),h=z.length-1),h+1}g.forEach(b=>{const y=b.querySelector("givenname, given-names")?b.querySelector("givenname, given-names").textContent.trim():"",h=b.querySelector("familyname, surname")?b.querySelector("familyname, surname").textContent.trim():"",M=b.querySelector("email")?b.querySelector("email").textContent.trim():"";let q=b.querySelector("orcid")?b.querySelector("orcid").textContent.trim():"";q.startsWith("https://orcid.org/")&&(q=q.substring(18));const K=[];b.querySelectorAll("affiliation").forEach(se=>{const we=se.textContent.trim();if(we){const pe=te(we);pe!==null&&!K.includes(pe)&&K.push(pe)}}),D.push({given:y,surname:h,email:M,orcid:q,affiliation_ids:K})}),D.length&&(o.set("authors",D),o.set("article.correspondence_author",1)),z.length&&o.set("affiliations",z);const $=t.querySelectorAll("reference, citation, ref"),B=[];$.forEach(b=>{let y=b.textContent.trim();const h=b.querySelector("mixed-citation");if(h&&(y=h.textContent.trim()),y=y.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,""),y){const M=It(y)||(b.querySelector("uri")?b.querySelector("uri").textContent.trim():"");B.push({text:y,url:M})}}),B.length&&o.set("references",B);const R=t.querySelectorAll("body > sec, sec");if(R.length){const b=[];R.forEach(y=>{const h=y.querySelector("title"),M=h?h.textContent.trim():"Section";h&&h.remove();const q=y.innerHTML.trim();b.push({id:Me(),title:M,content:q,tables:[],figures:[]})}),o.set("sections",b)}o.emit("load"),E("OJS XML metadata imported successfully")}function Te(a){if(!a)return"";const e=a.match(/^(\d{4})[-/](\d{2})[-/](\d{2})/);if(e)return`${e[1]}-${e[2]}-${e[3]}`;try{const t=new Date(a);if(!isNaN(t.getTime()))return t.toISOString().split("T")[0]}catch{}return a}function It(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}const Dt=["Introduction","Methods","Results","Discussion","Conclusion","Declarations"],et=[8,9,10,11,12,14,16,18,20,22,24];let me=null,F=[],xe=null,w=[];function Mt(a){me=a,ee(),o.on("load",()=>ee()),o.on("reset",()=>ee())}function ee(){if(!me)return;const a=o.get("sections")||[];me.innerHTML=`
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
  `,me.querySelector("#btn-add-section").addEventListener("click",()=>Pt()),me.querySelector("#btn-add-presets").addEventListener("click",()=>Bt()),a.forEach((e,t)=>{var c,l,d;const r=me.querySelector(`[data-section-id="${e.id}"]`);if(!r)return;const s=r.querySelector(".section-title-input");s.addEventListener("input",()=>{e.title=s.value,ne()}),zt(r,e);const i=r.querySelector(".section-editor");i.innerHTML=e.content||"",i.addEventListener("input",()=>{e.content=i.innerHTML,ne()}),i.addEventListener("paste",m=>{var n;const f=(n=m.clipboardData)==null?void 0:n.getData("text/html");if(f){m.preventDefault();const S=Re(f);document.execCommand("insertHTML",!1,S)}}),(c=r.querySelector(".btn-move-up"))==null||c.addEventListener("click",()=>Xe(t,-1)),(l=r.querySelector(".btn-move-down"))==null||l.addEventListener("click",()=>Xe(t,1)),(d=r.querySelector(".btn-delete-section"))==null||d.addEventListener("click",()=>Ht(t)),r.querySelector(".btn-insert-table").addEventListener("click",()=>Je(e.id)),r.querySelector(".btn-insert-figure").addEventListener("click",()=>Ge(e.id)),r.querySelectorAll(".btn-remove-table").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.tableIndex,10);e.tables.splice(f,1),ne(),ee()})}),r.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.tableIndex,10);Je(e.id,f)})}),r.querySelectorAll(".btn-remove-figure").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.figureIndex,10);e.figures.splice(f,1),ne(),ee()})}),r.querySelectorAll(".btn-edit-figure").forEach(m=>{m.addEventListener("click",()=>{const f=parseInt(m.dataset.figureIndex,10);Ge(e.id,f)})})})}function Rt(a,e,t){const r=(a.tables||[]).map((i,c)=>jt(i,c)).join(""),s=(a.figures||[]).map((i,c)=>Nt(i,c)).join("");return`
  <div class="section-block" data-section-id="${a.id}">
    <div class="section-header">
      <span class="section-badge">${e+1}</span>
      <input class="section-title-input form-control" type="text"
             value="${V(a.title)}" placeholder="Section Title" />
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
        ${et.map(i=>`<option value="${i}">${i}pt</option>`).join("")}
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
  </div>`}function jt(a,e){const t=a.manualNumber||e+1,r=V(a.caption||""),s=a.headers||[],i=a.rows||[];let l=`
  <div class="table-preview" ${a.fontSize?` style="font-size: ${a.fontSize}pt;"`:""}>
    <div class="table-preview-header">
      <strong>Table ${t}${r?": "+r:""}</strong>
      <span>
        <span class="badge badge-info" style="margin-right:8px; cursor:help;" title="Copy and paste this tag into the text to place the table inline">@[Table:${t}]</span>
        <button class="btn btn-xs btn-secondary btn-edit-table" data-table-index="${e}">Edit</button>
        <button class="btn btn-xs btn-danger btn-remove-table" data-table-index="${e}">Remove</button>
      </span>
    </div>
    <div class="table-preview-scroll">
    <table class="preview-table inline-table-preview">`;return s.length&&(l+="<thead>",s.forEach(d=>{l+="<tr>",d.forEach(m=>{l+=`<th style="text-align:${m.align||"left"}">${Oe(m)}</th>`}),l+="</tr>"}),l+="</thead>"),i.length&&(l+="<tbody>",i.forEach(d=>{l+="<tr>",d.forEach((m,f)=>{const n=a.headerCol&&f===0?"th":"td";l+=`<${n} style="text-align:${m.align||"left"}">${Oe(m)}</${n}>`}),l+="</tr>"}),l+="</tbody>"),l+="</table></div>",a.footnote&&(l+=`<div class="table-footnote">${V(a.footnote)}</div>`),l+="</div>",l}function Oe(a){let e=V(a.text||"");return e=e.replace(/&lt;(span|p|div|ul|ol|li|br|b|strong|i|em|u|sup|sub)(?:\s|&nbsp;|[^&])*?&gt;/gi,(t,r)=>`<${r}>`).replace(/&lt;\/(span|p|div|ul|ol|li|br|b|strong|i|em|u|sup|sub)&gt;/gi,(t,r)=>`</${r}>`).replace(/&amp;nbsp;/g,"&nbsp;").replace(/&amp;amp;/g,"&amp;").replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;apos;/g,"&apos;"),a.bold&&(e=`<b>${e}</b>`),a.italic&&(e=`<i>${e}</i>`),a.underline&&(e=`<u>${e}</u>`),a.superscript&&(e=`<sup>${e}</sup>`),a.subscript&&(e=`<sub>${e}</sub>`),a.fontSize&&(e=`<span style="font-size:${a.fontSize}pt;">${e}</span>`),e}function Nt(a,e){return`
  <div class="figure-preview">
    <div class="figure-preview-header">
      <strong>Figure ${e+1}${a.caption?": "+V(a.caption):""}</strong>
      <span>
        <span class="badge badge-info" style="margin-right:8px; cursor:help;" title="Copy and paste this tag into the text to place the figure inline">@[Figure:${e+1}]</span>
        <button class="btn btn-xs btn-primary btn-edit-figure" data-figure-index="${e}" style="margin-right:4px;">Edit</button>
        <button class="btn btn-xs btn-danger btn-remove-figure" data-figure-index="${e}">Remove</button>
      </span>
    </div>
    <img src="${V(a.url)}" alt="${V(a.alt||"")}" class="figure-thumb" />
  </div>`}function zt(a,e){var i,c;const t=a.querySelector(".section-editor");a.querySelectorAll(".tb-btn[data-cmd]").forEach(l=>{l.addEventListener("mousedown",d=>{d.preventDefault();const m=l.dataset.cmd;if(m==="createLink"){const f=prompt("Enter link URL (e.g. https://google.com):","https://");f&&document.execCommand(m,!1,f)}else document.execCommand(m,!1,null);e.content=t.innerHTML,ne()})});const r=a.querySelector(".tb-fontsize");r.addEventListener("change",()=>{const l=r.value;l&&(document.execCommand("fontSize",!1,"7"),t.querySelectorAll('font[size="7"]').forEach(m=>{m.removeAttribute("size"),m.style.fontSize=l+"pt"}),e.content=t.innerHTML,ne(),r.value="")});const s=a.querySelector(".tb-spacing");s&&s.addEventListener("change",()=>{const l=s.value;if(l!==""){const d=window.getSelection();if(d.rangeCount>0){let m=d.anchorNode;for(;m&&m!==t;){if(m.tagName==="P"||m.tagName==="DIV"){m.style.marginTop=l;break}m=m.parentNode}if(!m||m===t){document.execCommand("formatBlock",!1,"P");let f=d.anchorNode;for(;f&&f!==t;){if(f.tagName==="P"){f.style.marginTop=l;break}f=f.parentNode}}}e.content=t.innerHTML,ne(),s.value=""}}),(i=a.querySelector(".btn-auto-sup"))==null||i.addEventListener("click",l=>{l.preventDefault();let d=t.innerHTML;d=d.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),t.innerHTML=d,e.content=d,ne(),E("Auto-superscripted citations")}),(c=a.querySelector(".btn-hl-cite"))==null||c.addEventListener("click",l=>{l.preventDefault(),t.classList.toggle("show-citations"),l.target.classList.toggle("active",t.classList.contains("show-citations"))})}function Pt(a=""){const e=o.get("sections")||[];e.push({id:Me(),title:a,content:"",tables:[],figures:[]}),o.set("sections",e),ee(),E("Section added")}function Bt(){const a=o.get("sections")||[];Dt.forEach(e=>{a.push({id:Me(),title:e,content:"",tables:[],figures:[]})}),o.set("sections",a),ee(),E("Preset sections added")}function Xe(a,e){const t=o.get("sections")||[],r=a+e;r<0||r>=t.length||([t[a],t[r]]=[t[r],t[a]],o.set("sections",t),ee())}function Ht(a){const e=o.get("sections")||[];e.splice(a,1),o.set("sections",e),ee(),E("Section removed")}function ne(){const a=o.get("sections")||[];o.set("sections",a)}function Je(a,e=null){var f;xe=e!==null?{sectionId:a,tableIndex:e}:null;const r=(o.get("sections")||[]).find(n=>n.id===a);if(!r)return;let s=null;if(xe!==null&&(s=r.tables[e]),s){const n=[...s.headers||[],...s.rows||[]];w=n.length?n.map(S=>S.map(_=>({..._}))):Ue(3,3)}else w=Ue(3,3);F=[];const i=document.createElement("div");i.className="modal-overlay",i.id="table-modal-overlay";const c=((f=s==null?void 0:s.headers)==null?void 0:f.length)??1,l=(s==null?void 0:s.headerCol)??!1;i.innerHTML=`
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
                 value="${V((s==null?void 0:s.caption)||"")}" placeholder="e.g. Demographic characteristics" />
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
                 min="1" max="5" value="${c}" />
        </div>
        <div class="form-group" style="flex:1;display:flex;align-items:flex-end;gap:.5rem">
          <label class="form-label" style="white-space:nowrap">
            <input type="checkbox" id="tbl-header-col" ${l?"checked":""} />
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
          ${et.map(n=>`<option value="${n}" ${(s==null?void 0:s.fontSize)===String(n)?"selected":""}>${n}pt</option>`).join("")}
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
                  placeholder="e.g. p < 0.05, SD = Standard Deviation">${V((s==null?void 0:s.footnote)||"")}</textarea>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" id="tbl-cancel">Cancel</button>
      <button class="btn btn-primary" id="tbl-save">
        ${s?"Update Table":"Insert Table"}
      </button>
    </div>
  </div>`,document.body.appendChild(i),de(),i.querySelector(".modal-close-btn").addEventListener("click",Ee),i.querySelector("#tbl-cancel").addEventListener("click",Ee),i.addEventListener("click",n=>{n.target===i&&Ee()}),i.querySelector(".btn-fullscreen-toggle").addEventListener("click",()=>{i.querySelector("#table-editor-modal").classList.toggle("modal-fullscreen")});const d=i.querySelector("#tbl-paste-zone");d.addEventListener("paste",n=>{Jt(n,d)}),i.querySelector("#tbl-actions").addEventListener("click",n=>{var _;const S=(_=n.target.closest("[data-act]"))==null?void 0:_.dataset.act;S&&Ot(S)}),i.querySelector("#tbl-save").addEventListener("click",()=>{Ut(a)});const m=i.querySelector("#tbl-fontsize");m&&m.addEventListener("change",()=>{const n=m.value;w.forEach(S=>{S.forEach(_=>{_.fontSize=n})}),de()})}let ve=!1,ye=null;function Ee(){var a;(a=document.getElementById("table-modal-overlay"))==null||a.remove(),xe=null,w=[],F=[],ve=!1,ye=null}function Ue(a,e){return Array.from({length:a},()=>Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})))}function de(){const a=document.getElementById("tbl-grid-wrap");if(!a)return;let e='<table class="table-editor-grid"><tbody>';w.forEach((r,s)=>{e+="<tr>",r.forEach((i,c)=>{if(i.hidden)return;const l=F.some(n=>n.row===s&&n.col===c)?" selected":"",d=[];i.bold&&d.push("font-weight:bold"),i.italic&&d.push("font-style:italic"),i.underline&&d.push("text-decoration:underline"),i.superscript&&d.push("vertical-align:super;font-size:0.8em"),i.subscript&&d.push("vertical-align:sub;font-size:0.8em"),i.align&&d.push("text-align:"+i.align),i.fontSize&&d.push("font-size:"+i.fontSize+"pt");const m=i.colspan&&i.colspan>1?` colspan="${i.colspan}"`:"",f=i.rowspan&&i.rowspan>1?` rowspan="${i.rowspan}"`:"";e+=`<td class="grid-cell${l}" data-r="${s}" data-c="${c}"${m}${f}>
        <div class="grid-input" contenteditable="true"
               style="${d.join(";")}" data-r="${s}" data-c="${c}">${i.text}</div>
      </td>`}),e+="</tr>"}),e+="</tbody></table>",a.innerHTML=e;let t=null;a.querySelectorAll(".grid-cell").forEach(r=>{r.addEventListener("mousedown",s=>{if(s.target.classList.contains("grid-input")&&!s.ctrlKey&&!s.metaKey&&!s.shiftKey)return;const i=parseInt(r.dataset.r,10),c=parseInt(r.dataset.c,10);s.shiftKey&&t?(s.preventDefault(),Ye(t.r,t.c,i,c)):(ve=!0,ye={r:i,c},t={r:i,c},Ft(i,c,s.ctrlKey||s.metaKey))}),r.addEventListener("mouseenter",s=>{if(ve&&ye){const i=parseInt(r.dataset.r,10),c=parseInt(r.dataset.c,10);Ye(ye.r,ye.c,i,c),t={r:i,c}}})}),document.addEventListener("mouseup",()=>{ve=!1},{once:!0}),window.addEventListener("mouseup",()=>{ve=!1}),a.querySelectorAll(".grid-input").forEach(r=>{r.addEventListener("focus",()=>{const s=parseInt(r.dataset.r,10),i=parseInt(r.dataset.c,10);F.some(c=>c.row===s&&c.col===i)||(F=[{row:s,col:i}],t={r:s,c:i},a.querySelectorAll(".grid-cell").forEach(c=>c.classList.remove("selected")),r.parentElement.classList.add("selected"))}),r.addEventListener("input",()=>{const s=parseInt(r.dataset.r,10),i=parseInt(r.dataset.c,10);w[s][i].text=r.innerHTML})})}function Ye(a,e,t,r){const s=Math.min(a,t),i=Math.max(a,t),c=Math.min(e,r),l=Math.max(e,r);F=[];for(let d=s;d<=i;d++)for(let m=c;m<=l;m++)F.push({row:d,col:m});de()}function Ft(a,e,t){if(t){const r=F.findIndex(s=>s.row===a&&s.col===e);r>=0?F.splice(r,1):F.push({row:a,col:e})}else F=[{row:a,col:e}];de()}function Ot(a){var t;const e=((t=w[0])==null?void 0:t.length)||0;switch(a){case"addCol":w.forEach(s=>s.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""}));break;case"removeCol":e>1&&w.forEach(s=>s.pop());break;case"addRow":w.push(Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));break;case"removeRow":w.length>1&&w.pop();break;case"bold":he("bold");break;case"italic":he("italic");break;case"underline":he("underline");break;case"superscript":he("superscript");break;case"subscript":he("subscript");break;case"autoSup":(F.length?F:w.flatMap((i,c)=>i.map((l,d)=>({row:c,col:d})))).forEach(i=>{let c=w[i.row][i.col].text;c=c.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),w[i.row][i.col].text=c}),E("Citations superscripted");break;case"hlCite":document.getElementById("table-editor-modal").classList.toggle("show-citations");break;case"fontInc":case"fontDec":{const s=F.length?F:w.flatMap((c,l)=>c.map((d,m)=>({row:l,col:m}))),i=a==="fontInc"?1:-1;s.forEach(c=>{let l=parseFloat(w[c.row][c.col].fontSize)||10;l=Math.max(6,Math.min(24,l+i)),w[c.row][c.col].fontSize=String(l)})}break;case"alignLeft":_e("align","left");break;case"alignCenter":_e("align","center");break;case"alignRight":_e("align","right");break;case"merge":Xt();break}de()}function he(a){F.forEach(({row:e,col:t})=>{w[e][t][a]=!w[e][t][a]})}function _e(a,e){F.forEach(({row:t,col:r})=>{w[t][r][a]=e})}function Xt(){if(F.length<2)return;let a=1/0,e=-1/0,t=1/0,r=-1/0;F.forEach(i=>{i.row<a&&(a=i.row),i.row>e&&(e=i.row),i.col<t&&(t=i.col),i.col>r&&(r=i.col)});const s=[];for(let i=a;i<=e;i++)for(let c=t;c<=r;c++)w[i][c].hidden||s.push(w[i][c].text);w[a][t].text=s.filter(Boolean).join(" "),w[a][t].rowspan=e-a+1,w[a][t].colspan=r-t+1,w[a][t].hidden=!1;for(let i=a;i<=e;i++)for(let c=t;c<=r;c++)(i!==a||c!==t)&&(w[i][c].text="",w[i][c].hidden=!0,w[i][c].rowspan=1,w[i][c].colspan=1)}function Jt(a,e){var r;const t=(r=a.clipboardData)==null?void 0:r.getData("text/plain");setTimeout(()=>{const s=e.querySelector("table"),i=e.innerText||t;if(s){const c=s.querySelectorAll("tr");if(w=[],c.forEach(l=>{const d=l.querySelectorAll("td, th"),m=[];d.forEach(f=>{const n=f.getAttribute("style")||"",S=Re(f.innerHTML).trim(),_=/font-weight\s*:\s*(bold|[6-9]\d{2})/i.test(n)||!!f.querySelector("b, strong")||f.tagName==="TH",v=/font-style\s*:\s*italic/i.test(n)||!!f.querySelector("i, em"),I=/text-decoration[^:]*:\s*underline/i.test(n)||!!f.querySelector("u"),H=/vertical-align\s*:\s*super/i.test(n)||!!f.querySelector("sup"),N=/vertical-align\s*:\s*sub/i.test(n)||!!f.querySelector("sub");let L="left";const J=n.match(/text-align\s*:\s*(left|center|right)/i);J&&(L=J[1].toLowerCase());let j="";const P=n.match(/font-size\s*:\s*([\d.]+)pt/i);P&&(j=P[1]),m.push({text:S,bold:_,italic:v,underline:I,superscript:H,subscript:N,align:L,fontSize:j})}),m.length&&w.push(m)}),w.length){const l=Math.max(...w.map(d=>d.length));w.forEach(d=>{for(;d.length<l;)d.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left"})}),e.innerHTML="",F=[],de(),E("Table pasted successfully");return}}if(e.innerHTML="",i){const c=i.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);if(c.length>0){w=c.map(d=>d.split("	").map(f=>({text:f.trim(),bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));const l=Math.max(...w.map(d=>d.length));w.forEach(d=>{for(;d.length<l;)d.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})}),F=[],de(),E("Table parsed from plain text (TSV)");return}}E("No table found in pasted content","warning")},200)}function Ut(a){var S,_,v,I,H,N;const e=o.get("sections")||[],t=e.find(L=>L.id===a);if(!t)return;const r=((S=document.getElementById("tbl-caption"))==null?void 0:S.value.trim())||"",s=((_=document.getElementById("tbl-number"))==null?void 0:_.value.trim())||"",i=Math.max(1,Math.min(5,parseInt((v=document.getElementById("tbl-header-rows"))==null?void 0:v.value,10)||1)),c=((I=document.getElementById("tbl-header-col"))==null?void 0:I.checked)||!1,l=((H=document.getElementById("tbl-footnote"))==null?void 0:H.value.trim())||"",d=((N=document.getElementById("tbl-fontsize"))==null?void 0:N.value)||"",m=w.slice(0,i).map(L=>L.map(J=>({...J}))),f=w.slice(i).map(L=>L.map(J=>({...J}))),n={caption:r,manualNumber:s,headers:m,rows:f,headerCol:c,footnote:l,fontSize:d};t.tables||(t.tables=[]),xe!==null?(t.tables[xe.tableIndex]=n,E("Table updated")):(t.tables.push(n),E("Table inserted")),o.set("sections",e),Ee(),ee()}function Ge(a,e=-1){const t=o.get("sections")||[],r=t.find(j=>j.id===a);if(!r)return;const s=e>=0&&r.figures&&r.figures[e],i=s?r.figures[e]:null,c=t.reduce((j,P)=>{var p;return j+(((p=P.figures)==null?void 0:p.length)||0)},0),l=String(c+1).padStart(2,"0"),d=s?i.url:`images/F${l}.png`,m=s?i.caption:"",f=s&&i.alt||"",n=s&&i.base64Data||"",S=s?"Edit Figure":"Insert Figure",_=s?"Update Figure":"Insert Figure",v=document.createElement("div");v.className="modal-overlay",v.id="figure-modal-overlay",v.innerHTML=`
  <div class="modal">
    <div class="modal-header">
      <h3>${S}</h3>
      <button class="btn btn-icon modal-close-btn">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Image URL</label>
        <input class="form-control" id="fig-url" value="${V(d)}"
               placeholder="${V(d)}" />
        <small style="color:var(--text-secondary)">Or upload an image for JATS XML base64 embedding:</small>
        <input type="file" class="form-control" id="fig-file" accept="image/*" style="margin-top:0.5rem;" />
      </div>
      <div class="form-group">
        <label class="form-label">Caption</label>
        <input class="form-control" id="fig-caption" placeholder="Figure caption" value="${V(m)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Alt Text</label>
        <input class="form-control" id="fig-alt" placeholder="Describe the image for accessibility" value="${V(f)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Preview</label>
        <div class="figure-live-preview" id="fig-preview-zone" style="min-height: 100px; border: 1px dashed var(--border-color); display:flex; align-items:center; justify-content:center;">
          <img id="fig-preview-img" src="${V(n||d)}" alt="" style="max-height: 300px;" />
        </div>
        <input type="hidden" id="fig-base64" value="${V(n)}" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="fig-cancel">Cancel</button>
      <button class="btn btn-primary" id="fig-save">${_}</button>
    </div>
  </div>`,document.body.appendChild(v);const I=v.querySelector("#fig-url"),H=v.querySelector("#fig-preview-img"),N=v.querySelector("#fig-file"),L=v.querySelector("#fig-base64"),J=v.querySelector("#fig-preview-zone");I.addEventListener("input",()=>{L.value||(H.src=I.value)}),N.addEventListener("change",j=>{const P=j.target.files[0];if(P){const p=new FileReader;p.onload=g=>{L.value=g.target.result,H.src=g.target.result},p.readAsDataURL(P)}}),J.setAttribute("tabindex","0"),J.addEventListener("paste",j=>{const P=j.clipboardData.items;for(let p=0;p<P.length;p++)if(P[p].type.indexOf("image")!==-1){const g=P[p].getAsFile(),D=new FileReader;D.onload=z=>{L.value=z.target.result,H.src=z.target.result,E("Image pasted")},D.readAsDataURL(g);break}}),v.querySelector(".modal-close-btn").addEventListener("click",Ce),v.querySelector("#fig-cancel").addEventListener("click",Ce),v.addEventListener("click",j=>{j.target===v&&Ce()}),v.querySelector("#fig-save").addEventListener("click",()=>{const j=I.value.trim(),P=v.querySelector("#fig-caption").value.trim(),p=v.querySelector("#fig-alt").value.trim(),g=L.value;r.figures||(r.figures=[]),s?r.figures[e]={url:j,caption:P,alt:p,base64Data:g}:r.figures.push({url:j,caption:P,alt:p,base64Data:g}),o.set("sections",t),Ce(),ee(),E(s?"Figure updated":"Figure inserted")})}function Ce(){var a;(a=document.getElementById("figure-modal-overlay"))==null||a.remove()}function V(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Yt(a){$e(a),o.on("load",()=>$e(a)),o.on("reset",()=>$e(a))}function $e(a){if(!a)return;const e=o.get("references")||[];a.innerHTML=`
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

        ${e.length?Gt(e):""}
      </div>
    </div>
  `,a.querySelector("#btn-parse-refs").addEventListener("click",()=>Vt(a)),Wt(a,e)}function Gt(a){let e='<div class="ref-list" id="ref-parsed-list">';return a.forEach((t,r)=>{e+=`
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
    </div>`}),e+="</div>",e}function Wt(a,e){a.querySelectorAll(".btn-remove-ref").forEach(t=>{t.addEventListener("click",()=>{const r=parseInt(t.dataset.refIndex,10);e.splice(r,1),o.set("references",e),$e(a),E("Reference removed")})}),a.querySelectorAll(".ref-url-input").forEach(t=>{t.addEventListener("input",()=>{const r=parseInt(t.dataset.refIndex,10);e[r].url=t.value.trim(),o.set("references",e)})})}function Vt(a){const e=a.querySelector("#ref-bulk-input");if(!e)return;const t=e.value.trim();if(!t){E("Please paste references first","warning");return}const s=t.split(`
`).map(i=>i.trim()).filter(Boolean).map(i=>{const l=i.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,"")||i,d=Kt(l);return{text:l,url:d}});o.set("references",s),e.value="",$e(a),E(`${s.length} reference${s.length!==1?"s":""} parsed`)}function Kt(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}function We(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Zt(){const a=o.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],s=a.affiliations||[],i=a.dates||{},c=a.abstract||{},l=a.keywords||[],d=a.copyright||{},m=a.sections||[],f=a.references||[],n=u=>re(u||""),S=u=>u?u.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim().length===0||u==="<p><br></p>":!0,_=u=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[u]||u||"Research Article",v=e.base_url||"https://jpchr.com/jpchr",I=t.article_id||"galley",H=`${v}/article/view/${I}/html`,N=`${v}/article/view/${I}/pdf`,L=!S(c.content),J=document.createElement("div");J.innerHTML=c.content||"";const j=J.textContent.replace(/\s+/g," ").trim(),P=L?j.substring(0,155)+(j.length>155?"...":""):"",g=(u=>u==null?"":String(u).replace(/-/g,"/"))(i.published||i.accepted||i.received||t.year),D=r.map(u=>{const T=(u.affiliation_ids||[]).map(G=>{var U;return(U=s[G-1])==null?void 0:U.text}).filter(Boolean).join("; ");return{"@type":"Person",name:`${u.given||""} ${u.surname||""}`.trim(),affiliation:T||void 0,identifier:u.orcid?`https://orcid.org/${u.orcid}`:void 0}}),z={"@context":"https://schema.org","@type":"ScholarlyArticle",headline:t.title||"",alternativeHeadline:t.subtitle||void 0,genre:_(t.type),author:D,datePublished:i.published||void 0,dateCreated:i.received||void 0,isPartOf:{"@type":"PublicationIssue",issueNumber:t.issue||void 0,volumeNumber:t.volume||void 0,isPartOf:{"@type":"Periodical",name:e.title||"",issn:[e.issn_online,e.issn_print].filter(Boolean)}},pageStart:t.fpage||void 0,pageEnd:t.lpage||void 0,description:j||void 0,publisher:{"@type":"Organization",name:e.publisher||""},identifier:[t.doi?{"@type":"PropertyValue",propertyID:"doi",value:t.doi}:null].filter(Boolean)},te=t.doi?`<meta name="citation_doi" content="${n(t.doi)}">`:"",$=e.issn_online||e.issn_print||"";let B="";r.forEach(u=>{const T=`${u.surname||""}, ${u.given||""}${u.middle?" "+u.middle:""}`.trim().replace(/^,|,$/,"");B+=`  <meta name="citation_author" content="${n(T)}">
`,u.orcid&&(B+=`  <meta name="citation_author_orcid" content="https://orcid.org/${n(u.orcid)}">
`)});let R="";L&&(R+=`      <a href="#abstract" class="sidebar-link">Abstract</a>
`),m.forEach(u=>{R+=`      <a href="#sec-${u.id}" class="sidebar-link">${n(u.title)}</a>
`}),f.length&&(R+=`      <a href="#references" class="sidebar-link">References</a>
`);const b=r.length===1,y=s.length===1;let h="";r.forEach((u,T)=>{const U=[u.given,u.middle,u.surname].filter(Boolean).map(Z=>n(Z)).join(" ").trim(),W=T+1===parseInt(t.correspondence_author,10),x=u.orcid?` <a href="https://orcid.org/${n(u.orcid)}" target="_blank" class="orcid-link" title="ORCID iD"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" class="orcid-icon" alt="ORCID iD" /></a>`:"",O=W?"<sup>*</sup>":"";let Y="";!b&&u.affiliation_ids&&u.affiliation_ids.length&&(Y=`<sup>${u.affiliation_ids.join(",")}</sup>`),h+=`<span class="author-name">${U}${Y}${O}${x}</span>${T<r.length-1?", ":""}`});let M="";if(s.length)if(b&&y){const u=s[0],T=u.ror_id?` <a href="${n(u.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";M=`<div class="affiliation-line single">${n(u.text)}${T}</div>`}else M='<ol class="affiliations-list" style="list-style-type:none; padding-left:0;">',s.forEach((u,T)=>{const G=u.ror_id?` <a href="${n(u.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";M+=`<li class="affiliation-line" style="margin-bottom:4px;"><sup>${T+1}</sup> ${n(u.text)}${G}</li>`}),M+="</ol>";let q="";const K=parseInt(t.correspondence_author,10);if(K>0&&r[K-1]){const u=r[K-1],G=[u.given,u.middle,u.surname].filter(Boolean).join(" ").trim(),U=u.email?` <a href="mailto:${n(u.email)}" class="email-link" title="Email corresponding author"><svg class="email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="vertical-align: middle; margin-left: 2px; color: var(--primary); display: inline-block;"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>`:"";q=`<div class="correspondence-line" style="font-size:0.9rem; margin-top:0.5rem; color:var(--text-secondary);">*Correspondence: ${n(G)}${U}</div>`}const ue=t.volume?`Vol. ${n(t.volume)}`:"",se=t.issue?`No. ${n(t.issue)}`:"",we=t.issue_months?`(${n(t.issue_months)})`:"",pe=t.year?n(t.year):"";let je=[ue,se,we].filter(Boolean).join(", ");pe&&(je+=` ${pe}`);const ke=t.fpage||t.elocation_id||"",at=ke?` | Pages: ${n(ke)}${t.lpage?"-"+n(t.lpage):""}`:"",rt=t.article_id?` | Article ID: ${n(t.article_id)}`:"",it=t.doi?` | DOI: <a href="https://doi.org/${n(t.doi)}" target="_blank">${n(t.doi)}</a>`:"",st=`${je}${at}${rt}${it}`,ge=[];i.received&&ge.push(`Received: ${i.received}`),i.revised&&ge.push(`Revised: ${i.revised}`),i.accepted&&ge.push(`Accepted: ${i.accepted}`),i.published&&ge.push(`Published: ${i.published}`);const Ne=ge.join(" | ");let ze="";const Pe=d.license||"CC-BY-NC-SA-4.0";if(Pe.startsWith("CC-")){const u=Pe.replace("CC-","").replace("-4.0","").toLowerCase();ze=`<a href="https://creativecommons.org/licenses/${u}/4.0/" target="_blank" style="display:inline-block; margin-top:0.5rem;">
      <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/${u}.svg" alt="Creative Commons License" style="height:31px; border:none;"/>
    </a>`}let Be="";const Se=(u,T=!1)=>{if(u.hidden)return"";const G=T?"th":"td",U=u.align?`text-align:${u.align}`:"",W=u.bold?"font-weight:bold;":"",x=u.italic?"font-style:italic;":"",O=u.underline?"text-decoration:underline;":"",Y=u.fontSize?`font-size:${u.fontSize}pt`:"",Z=[U,W,x,O,Y].filter(Boolean).join(";");let A=re(u.text||"");A=A.replace(/&lt;(span|p|div|ul|ol|li|br|b|strong|i|em|u|sup|sub)(?:\s|&nbsp;|[^&])*?&gt;/gi,(le,ce)=>`<${ce}>`).replace(/&lt;\/(span|p|div|ul|ol|li|br|b|strong|i|em|u|sup|sub)&gt;/gi,(le,ce)=>`</${ce}>`).replace(/&amp;nbsp;/g,"&nbsp;").replace(/&amp;amp;/g,"&amp;").replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;apos;/g,"&apos;"),u.bold&&(A=`<strong>${A}</strong>`),u.italic&&(A=`<em>${A}</em>`),u.underline&&(A=`<u>${A}</u>`),u.superscript&&(A=`<sup>${A}</sup>`),u.subscript&&(A=`<sub>${A}</sub>`);const ae=u.colspan&&u.colspan>1?` colspan="${u.colspan}"`:"",oe=u.rowspan&&u.rowspan>1?` rowspan="${u.rowspan}"`:"";return`<${G}${ae}${oe} ${Z?`style="${Z}"`:""}>${A}</${G}>`},nt=u=>{if(!u||!u.text)return"";const T=String(u.text),G=/(?:doi:\s*)?(?:https?:\/\/(?:dx\.)?doi\.org\/)?\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi;let U=re(T).replace(G,(W,x)=>`doi:<a href="https://doi.org/${x}" target="_blank">${x}</a>`);if(u.url){const W=String(u.url).trim();if(/doi\.org/i.test(W)||W.startsWith("10.")){const O=W.replace(/^(?:https?:\/\/doi\.org\/|doi:\s*)/i,"");if(!T.includes(O)){const Y=`https://doi.org/${O}`;U+=` doi:<a href="${re(Y)}" target="_blank">${re(O)}</a>`}}else T.includes(W)||(U+=` <a href="${re(W)}" target="_blank">${re(W)}</a>`)}return U};return m.forEach(u=>{let T=u.content||"";const G=[];u.tables&&u.tables.length&&u.tables.forEach((x,O)=>{const Y=x.manualNumber||O+1,Z=x.fontSize?` style="font-size: ${x.fontSize}pt;"`:"";let A=`
        <div class="table-container" id="tbl-${u.id}-${O}"${Z}>
          <div class="table-caption"><strong>Table ${n(Y)}:</strong> ${n(x.caption)}</div>
          <div class="table-scroll">
            <table>`;x.headers&&x.headers.length&&(A+="<thead>",Array.isArray(x.headers[0])?x.headers.forEach(ae=>{A+="<tr>",ae.forEach(oe=>{A+=Se(oe,!0)}),A+="</tr>"}):(A+="<tr>",x.headers.forEach(ae=>{A+=Se(ae,!0)}),A+="</tr>"),A+="</thead>"),x.rows&&x.rows.length&&(A+="<tbody>",Array.isArray(x.rows[0])?x.rows.forEach(ae=>{A+="<tr>",ae.forEach((oe,le)=>{const ce=x.headerCol&&le===0;A+=Se(oe,ce)}),A+="</tr>"}):x.rows.forEach(ae=>{A+="<tr>";const oe=x.headers.length;for(let le=0;le<oe;le++){const ce=ae[`col-${le}`]||"";A+=Se({text:ce},!1)}A+="</tr>"}),A+="</tbody>"),A+=`
            </table>
          </div>`,x.footnote&&(A+=`<div class="table-note">${n(x.footnote)}</div>`),A+="</div>",G.push({num:Y,html:A,placed:!1})});const U=[];u.figures&&u.figures.length&&u.figures.forEach((x,O)=>{const Y=O+1,Z=`
        <figure class="figure-container" id="fig-${u.id}-${O}">
          <img src="${n(x.url)}" alt="${n(x.alt||x.caption||"")}" class="article-image" />
          <figcaption class="figure-caption"><strong>Figure ${Y}:</strong> ${n(x.caption)}</figcaption>
        </figure>`;U.push({num:Y,html:Z,placed:!1})}),T=T.replace(/<img\b[^>]*>/gi,""),T=T.replace(/font-family:[^;"]*;?/gi,"").replace(/font-size:[^;"]*;?/gi,"").replace(/text-align:\s*left;?/gi,""),G.forEach(x=>{const O=String(x.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),Y=new RegExp(`@\\[Table[\\s:]*${O}\\]`,"gi"),Z=T.replace(Y,x.html);Z!==T&&(T=Z,x.placed=!0)}),U.forEach(x=>{const O=String(x.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),Y=new RegExp(`@\\[Figure[\\s:]*${O}\\]`,"gi"),Z=T.replace(Y,x.html);Z!==T&&(T=Z,x.placed=!0)});let W="";G.forEach(x=>{x.placed||(W+=x.html)}),U.forEach(x=>{x.placed||(W+=x.html)}),Be+=`
    <section class="article-section" id="sec-${u.id}">
      <h2 class="section-title">${n(u.title)}</h2>
      <div class="section-text-content">${T}</div>
      ${W}
    </section>`}),`<!-- Published by Anviksha Publisher | Journal of Public and Clinical Health Research -->
<!DOCTYPE html>
<html lang="${n(t.language||"en")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${n(t.title)}</title>
  <meta name="description" content="${n(P)}">
  
  <!-- Canonical and alternate links -->
  <link rel="canonical" href="${n(H)}">
  <link rel="alternate" type="application/pdf" href="${n(N)}">
  
  <!-- Google Scholar Metadata Tags -->
  <meta name="citation_title" content="${n(t.title)}">
${B}  <meta name="citation_publication_date" content="${n(g)}">
  <meta name="citation_date" content="${n(g)}">
  <meta name="citation_journal_title" content="${n(e.title)}">
  <meta name="citation_journal_abbrev" content="${n(e.abbreviation)}">
  <meta name="citation_volume" content="${n(t.volume)}">
  <meta name="citation_issue" content="${n(t.issue)}">
  <meta name="citation_firstpage" content="${n(ke)}">
  <meta name="citation_lastpage" content="${n(t.lpage)}">
  <meta name="citation_article_type" content="${n(_(t.type))}">
${te}  <meta name="citation_issn" content="${n($)}">
  <meta name="citation_publisher" content="${n(e.publisher)}">
  <meta name="citation_language" content="${n(t.language)}">
  <meta name="citation_pdf_url" content="${n(N)}">
  <meta name="citation_fulltext_html_url" content="${n(H)}">
  ${L?`<meta name="citation_abstract" content="${n(j)}">`:""}

  <!-- Dublin Core Metadata -->
  <meta name="DC.title" content="${n(t.title)}">
  ${r.map(u=>`<meta name="DC.creator" content="${n(`${u.surname||""}, ${u.given||""}${u.middle?" "+u.middle:""}`.trim().replace(/^,|,$/,""))}">`).join(`
  `)}
  <meta name="DC.date" content="${n(i.published||i.accepted||i.received||t.year)}" scheme="DCTERMS.W3CDTF">
  <meta name="DC.source" content="${n(e.title)}">
  <meta name="DC.publisher" content="${n(e.publisher)}">
  <meta name="DC.language" content="${n(t.language||"en")}" scheme="DCTERMS.RFC4646">
  ${t.doi?`<meta name="DC.identifier" content="${n(t.doi)}" scheme="DCTERMS.DOI">`:""}
  <meta name="DC.format" content="text/html" scheme="DCTERMS.IMT">
  <meta name="DC.type" content="Text.Article" scheme="DCTERMS.DCMIType">
  ${L?`<meta name="DC.description" content="${n(j)}">`:""}
  ${l.map(u=>`<meta name="DC.subject" content="${n(u)}">`).join(`
  `)}
  
  <!-- Open Graph Metadata -->
  <meta property="og:title" content="${n(t.title)}">
  <meta property="og:description" content="${n(P)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${n(H)}">
  <meta property="og:site_name" content="${n(e.title)}">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(z,null,2)}
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
      font-size: 12px; /* Default table font size */
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
      font-size: inherit; /* Inherits from table-container or cell font size */
      table-layout: auto;
    }

    table th, table td {
      font-size: inherit;
    }

    table p, table span, table div {
      font-size: inherit !important;
      line-height: inherit !important;
    }

    table sup, table sub {
      font-size: 0.8em;
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
        <a href="${n(e.website_url)}" target="_blank">
          <img src="${n(e.logo_url)}" alt="${n(e.title)}" class="journal-logo" />
        </a>
      </div>`:""}
      
      <div class="article-type">${n(_(t.type))}</div>
      <div class="article-metadata-line">${st}</div>
      ${Ne?`<div class="article-metadata-line">${Ne}</div>`:""}
      
      <h1 class="article-title">${n(t.title)}</h1>
      ${t.subtitle?`<h2 class="article-title-subtitle" style="font-size:1.4rem; font-weight:500; color:var(--text-light); margin:0 0 1.5rem 0;">${n(t.subtitle)}</h2>`:""}
      
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
    ${L?`
    <section class="article-section" id="abstract">
      <h2 class="section-title">Abstract</h2>
      <div class="section-text-content">${c.content}</div>
    </section>`:""}

    <!-- Keywords -->
    ${l.length?`
    <div class="keywords-block" style="margin-bottom:2rem; font-size:0.95rem; font-style:italic;">
      <strong>Keywords:</strong> ${l.map(u=>n(u)).join(", ")}
    </div>`:""}

    <!-- Main Content Body -->
    ${Be}

    <!-- References -->
    ${f.length?`
    <section class="article-section" id="references">
      <h2 class="section-title">References</h2>
      <ol class="references-list">
        ${f.map(u=>`
          <li class="reference-item">
            ${nt(u)}
          </li>
        `).join("")}
      </ol>
    </section>`:""}

    <!-- Footer -->
    <footer class="article-footer">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
        <div>
          © ${n(d.year)} ${n(d.holder||"The Author(s)")}. Published by ${n(e.publisher||"Anviksha Publisher")} on behalf of the ${n(e.title||"Journal of Public and Clinical Health Research")}.
          <br/><br/>
          This is an Open Access article distributed under the terms of the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0), which permits non-commercial use, distribution, and reproduction in any medium, provided the original author(s) and source are credited, and any derivative works are distributed under the same license.
        </div>
        <div>
          ${ze}
        </div>
      </div>
    </footer>
  </div>
</body>
</html>`}function Qt(){const a=o.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],s=a.affiliations||[],i=a.dates||{},c=a.abstract||{},l=a.keywords||[],d=a.copyright||{},m=a.sections||[],f=a.references||[],n=p=>{if(p==null)return"";const g=String(p),D=bt(g);return He(D)},S=p=>p?p.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim().length===0||p==="<p><br></p>":!0,_=p=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[p]||p||"Research Article",v=p=>{if(!p)return"";const D=new DOMParser().parseFromString(p,"text/html"),z={b:"bold",strong:"bold",i:"italic",em:"italic",u:"underline",sub:"sub",p:"p",ul:"list",ol:"list",li:"list-item"},te=(R,b=!1)=>{if(R.nodeType===3)return He(R.textContent);if(R.nodeType!==1)return"";const y=R.tagName.toLowerCase();let h="";const M=y==="p";for(const q of R.childNodes)h+=te(q,b||M);if(y==="sup"){const q=R.textContent.trim();return/^\[\s*\d[\d,\s-]*\]$/.test(q)?`<xref ref-type="bibr">${h}</xref>`:`<sup>${h}</sup>`}if(y==="br")return"<break/>";if(y==="ul")return`<list list-type="bullet">${h}</list>`;if(y==="ol")return`<list list-type="order">${h}</list>`;if(y==="li")return h.trim().startsWith("<p>")||(h=`<p>${h}</p>`),`<list-item>${h}</list-item>`;if(z[y]){const q=z[y];return q==="p"?b?h:h.trim()?`<p>${h}</p>`:"":`<${q}>${h}</${q}>`}return h};let $="";for(const R of D.body.childNodes)$+=te(R,!1);const B=$.trim();return B&&!B.startsWith("<p>")&&!B.startsWith("<list")&&($=`<p>${$}</p>`),$},I=p=>{let g=v(p.text||"");if(g.startsWith("<p>")&&g.endsWith("</p>")){const D=g.slice(3,-4);!D.includes("<p>")&&!D.includes("</p>")&&(g=D)}return p.bold&&(g=`<bold>${g}</bold>`),p.italic&&(g=`<italic>${g}</italic>`),p.underline&&(g=`<underline>${g}</underline>`),p.superscript&&(g=`<sup>${g}</sup>`),p.subscript&&(g=`<sub>${g}</sub>`),g},H=p=>{if(!p)return null;const g=p.split("-");return g.length===3?{year:g[0],month:g[1],day:g[2]}:null},L=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Published by Anviksha Publisher | Journal of Public and Clinical Health Research -->
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Archiving and Interchange DTD v1.3 20210610//EN" "JATS-archivearticle1-3.dtd">
<article dtd-version="1.3" xml:lang="${n(t.language||"en")}" xmlns:ali="http://www.niso.org/schemas/ali/1.0/" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink">
  <front>
    <journal-meta>
      <journal-id journal-id-type="publisher-id">${n(e.abbreviation||"journal")}</journal-id>
      <journal-title-group>
        <journal-title>${n(e.title)}</journal-title>
        ${e.abbreviation?`<journal-subtitle>${n(e.abbreviation)}</journal-subtitle>`:""}
      </journal-title-group>
      ${e.issn_print?`<issn pub-type="ppub">${n(e.issn_print)}</issn>`:""}
      ${e.issn_online?`<issn pub-type="epub">${n(e.issn_online)}</issn>`:""}
      <publisher>
        <publisher-name>${n(e.publisher)}</publisher-name>
      </publisher>
    </journal-meta>
    <article-meta>
      ${t.article_id?`<article-id pub-id-type="publisher-id">${n(t.article_id)}</article-id>`:""}
      ${t.doi?`<article-id pub-id-type="doi">${n(t.doi)}</article-id>`:""}
      
      <article-categories>
        <subj-group subj-group-type="heading">
          <subject>${n(_(t.type))}</subject>
        </subj-group>
      </article-categories>
      
      <title-group>
        <article-title>${n(t.title)}</article-title>
        ${t.subtitle?`<subtitle>${n(t.subtitle)}</subtitle>`:""}
      </title-group>

      <!-- Contributor list -->
      <contrib-group>
        ${r.map((p,g)=>`
        <contrib contrib-type="author" ${g+1===parseInt(t.correspondence_author,10)?'corresp="yes"':""}>
          <name>
            <surname>${n(p.surname)}</surname>
            <given-names>${n(p.given)}${p.middle?" "+n(p.middle):""}</given-names>
          </name>
          ${p.email?`<email>${n(p.email)}</email>`:""}
          ${p.orcid?`<contrib-id contrib-id-type="orcid">https://orcid.org/${n(p.orcid)}</contrib-id>`:""}
          ${p.affiliation_ids&&p.affiliation_ids.length?p.affiliation_ids.map(z=>`
          <xref ref-type="aff" rid="aff-${z}" />`).join(""):""}
        </contrib>`).join("")}
      </contrib-group>

      <!-- Affiliations -->
      ${s.map((p,g)=>`
      <aff id="aff-${g+1}">
        ${p.ror_id?`<institution-id institution-id-type="ror">${n(p.ror_id)}</institution-id>`:""}
        <institution>${n(p.text)}</institution>
      </aff>`).join("")}

      <!-- Correspondence marker -->
      ${(()=>{const p=parseInt(t.correspondence_author,10);if(p>0&&r[p-1]){const g=r[p-1];return`
      <author-notes>
        <corresp id="cor1">*Correspondence: ${n(g.given)} ${n(g.surname)} <email>${n(g.email)}</email></corresp>
      </author-notes>`}return""})()}

      <!-- Dates -->
      ${(()=>{let p="";const g=H(i.received),D=H(i.accepted),z=H(i.published);return g&&(p+=`
      <history>
        <date date-type="received">
          <day>${g.day}</day>
          <month>${g.month}</month>
          <year>${g.year}</year>
        </date>`),D&&(g||(p+=`
      <history>`),p+=`
        <date date-type="accepted">
          <day>${D.day}</day>
          <month>${D.month}</month>
          <year>${D.year}</year>
        </date>`),(g||D)&&(p+=`
      </history>`),z?p+=`
      <pub-date pub-type="epub">
        <day>${z.day}</day>
        <month>${z.month}</month>
        <year>${z.year}</year>
      </pub-date>`:t.year&&(p+=`
      <pub-date pub-type="collection">
        <year>${n(t.year)}</year>
      </pub-date>`),p})()}

      <!-- Pagination/volume/issue -->
      ${t.volume?`<volume>${n(t.volume)}</volume>`:""}
      ${t.issue?`<issue>${n(t.issue)}</issue>`:""}
      ${t.fpage?`<fpage>${n(t.fpage)}</fpage>`:""}
      ${t.lpage?`<lpage>${n(t.lpage)}</lpage>`:""}
      ${t.elocation_id?`<elocation-id>${n(t.elocation_id)}</elocation-id>`:""}

      <!-- Copyright & Permissions -->
      <permissions>
        <copyright-statement>© ${n(d.year)} ${n(d.holder||e.publisher)}</copyright-statement>
        <copyright-year>${n(d.year)}</copyright-year>
        ${(()=>{const p=d.license||"CC-BY-NC-SA-4.0";return p.startsWith("CC-")?`
        <license license-type="open-access" xlink:href="https://creativecommons.org/licenses/${p.replace("CC-","").replace("-4.0","").toLowerCase()}/4.0/">
          <license-p>This is an open-access article distributed under the terms of the Creative Commons License (${p}).</license-p>
        </license>`:""})()}
      </permissions>

      <!-- Abstract -->
      ${S(c.content)?"":`
      <abstract>
        ${v(c.content)}
      </abstract>`}

      <!-- Keywords -->
      ${l.length?`
      <kwd-group kwd-group-type="author">
        ${l.map(p=>`<kwd>${n(p)}</kwd>`).join(`
        `)}
      </kwd-group>`:""}
    </article-meta>
  </front>

  <body>
    ${m.map(p=>{let g=v(p.content);const D=[];p.tables&&p.tables.length&&p.tables.forEach(($,B)=>{const R=$.manualNumber||B+1;let b=`
      <table-wrap id="tbl-${p.id}-${B}">
        <label>Table ${n(R)}</label>
        <caption><p>${n($.caption)}</p></caption>
        <table>`;$.headers&&$.headers.length&&(b+=`
          <thead>`,Array.isArray($.headers[0])?$.headers.forEach(y=>{b+=`
            <tr>`,y.forEach(h=>{if(h.hidden)return;const M=h.align?` align="${h.align}"`:"",q=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",K=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"";b+=`
              <th${M}${q}${K}>${I(h)}</th>`}),b+=`
            </tr>`}):(b+=`
            <tr>`,$.headers.forEach(y=>{if(y.hidden)return;const h=y.align?` align="${y.align}"`:"",M=y.colspan&&y.colspan>1?` colspan="${y.colspan}"`:"",q=y.rowspan&&y.rowspan>1?` rowspan="${y.rowspan}"`:"";b+=`
              <th${h}${M}${q}>${I(y)}</th>`}),b+=`
            </tr>`),b+=`
          </thead>`),$.rows&&$.rows.length&&(b+=`
          <tbody>`,Array.isArray($.rows[0])?$.rows.forEach(y=>{b+=`
            <tr>`,y.forEach((h,M)=>{if(h.hidden)return;const q=h.align?` align="${h.align}"`:"",K=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",ue=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"",se=$.headerCol&&M===0?"th":"td";b+=`
              <${se}${q}${K}${ue}>${I(h)}</${se}>`}),b+=`
            </tr>`}):$.rows.forEach(y=>{b+=`
            <tr>`;const h=$.headers.length;for(let M=0;M<h;M++){const q=y[`col-${M}`]!==void 0?{text:y[`col-${M}`]}:{};if(q.hidden)continue;const K=$.headerCol&&M===0?"th":"td",ue=q.colspan&&q.colspan>1?` colspan="${q.colspan}"`:"",se=q.rowspan&&q.rowspan>1?` rowspan="${q.rowspan}"`:"";b+=`
              <${K}${ue}${se}>${I(q)}</${K}>`}b+=`
            </tr>`}),b+=`
          </tbody>`),b+=`
        </table>`,$.footnote&&(b+=`
        <table-wrap-foot>
          <fn id="fn-tbl-${p.id}-${B}">
            <p>${n($.footnote)}</p>
          </fn>
        </table-wrap-foot>`),b+=`
      </table-wrap>`,D.push({num:R,xml:b,placed:!1})});const z=[];p.figures&&p.figures.length&&p.figures.forEach(($,B)=>{const R=B+1,b=$.base64Data?$.base64Data:n($.url),y=`
      <fig id="fig-${p.id}-${B}">
        <label>Figure ${R}</label>
        <caption><p>${n($.caption)}</p></caption>
        <graphic mimetype="image" mime-subtype="png" xlink:href="${b}" />
      </fig>`;z.push({num:R,xml:y,placed:!1})}),D.forEach($=>{const B=String($.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),R=new RegExp(`@\\[Table[\\s:]*${B}\\]`,"gi"),b=g.replace(R,$.xml);b!==g&&(g=b,$.placed=!0)}),z.forEach($=>{const B=String($.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),R=new RegExp(`@\\[Figure[\\s:]*${B}\\]`,"gi"),b=g.replace(R,$.xml);b!==g&&(g=b,$.placed=!0)}),g=g.replace(/<p>\s*<\/p>/g,"");let te="";return D.forEach($=>{$.placed||(te+=$.xml)}),z.forEach($=>{$.placed||(te+=$.xml)}),`
    <sec id="sec-${p.id}">
      <title>${n(p.title)}</title>
      ${g}
      ${te}
    </sec>`}).join("")}
  </body>

  <!-- References list -->
  ${f.length?`
  <back>
    <ref-list>
      <title>References</title>
      ${f.map((p,g)=>`
      <ref id="ref-${g+1}">
        <label>${g+1}</label>
        <mixed-citation publication-type="journal">
          ${n(p.text)}
          ${p.url?`<pub-id pub-id-type="doi">${n(String(p.url).replace(/^https?:\/\/doi\.org\//i,""))}</pub-id>`:""}
        </mixed-citation>
      </ref>`).join("")}
    </ref-list>
  </back>`:""}
</article>`.trim(),P=new DOMParser().parseFromString(L,"application/xml").getElementsByTagName("parsererror");if(P.length>0)throw console.error("XML Validation Error:",P[0].textContent),new Error("JATS XML Generation Failed: Invalid XML structure detected.");return L}function ea(){const a=[],e=o.collectAll(),t=e.journal||{},r=e.article||{},s=e.authors||[],i=e.dates||{},c=e.abstract||{},l=e.keywords||[];return t.title?a.push({status:"pass",message:"Journal Title is set."}):a.push({status:"fail",message:"Journal Title is required."}),!t.issn_print&&!t.issn_online?a.push({status:"warn",message:"Both Print and Online ISSNs are missing."}):a.push({status:"pass",message:"At least one ISSN is set."}),r.title?a.push({status:"pass",message:"Article Title is set."}):a.push({status:"fail",message:"Article Title is required."}),r.doi?/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(r.doi)?a.push({status:"pass",message:"Article DOI is set and format is valid."}):a.push({status:"warn",message:"Article DOI format looks invalid (expected 10.xxxx/yyyy)."}):a.push({status:"fail",message:"Article DOI is required."}),r.article_id?a.push({status:"pass",message:"Article ID is set."}):a.push({status:"fail",message:"Article ID (for file exports) is required."}),s.length?(a.push({status:"pass",message:`Found ${s.length} author(s).`}),s.forEach((m,f)=>{m.orcid&&(/^\d{4}-\d{4}-\d{4}-[\dX]{4}$/i.test(m.orcid)?a.push({status:"pass",message:`Author ${f+1} has a valid ORCID ID.`}):a.push({status:"warn",message:`Author ${f+1} (${m.given||""} ${m.surname||""}) has an invalid ORCID ID format (expected XXXX-XXXX-XXXX-XXXX).`})),m.email||a.push({status:"warn",message:`Author ${f+1} is missing an email address.`})})):a.push({status:"fail",message:"At least one Author is required."}),i.published?a.push({status:"pass",message:"Publication Date is set."}):a.push({status:"warn",message:"Publication Date is missing."}),!c.content||c.content.trim()===""||c.content==="<p><br></p>"||c.content.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim()===""?r.type==="editorial"?a.push({status:"pass",message:"Abstract is blank (optional for Editorial type)."}):a.push({status:"warn",message:"Article Abstract is missing (will be omitted from output)."}):a.push({status:"pass",message:"Abstract content is set."}),l.length?a.push({status:"pass",message:`Found ${l.length} keyword(s).`}):a.push({status:"warn",message:"At least one keyword should be added."}),a}function ta(a){const e=[];if(!a)return[{status:"fail",message:"XML string is empty."}];a.includes("&nbsp;")?e.push({status:"fail",message:"XML contains raw &nbsp; entities, which will trigger parse errors. Replace with regular spaces."}):e.push({status:"pass",message:"No unescaped HTML-only entities (&nbsp;) detected."});try{const r=new DOMParser().parseFromString(a,"text/xml"),s=r.querySelector("parsererror");if(s)return e.push({status:"fail",message:`XML Parser Error: ${s.textContent}`}),e;e.push({status:"pass",message:"XML is well-formed and parses successfully."});const i=r.querySelector("front"),c=r.querySelector("body");i||e.push({status:"fail",message:"JATS XML is missing <front> tag."}),c||e.push({status:"warn",message:"JATS XML is missing <body> tag."}),r.querySelector('article-meta > article-id[pub-id-type="doi"]')?e.push({status:"pass",message:"JATS XML contains article DOI."}):e.push({status:"fail",message:"Missing DOI article-id tag in article-meta."}),r.querySelector("title-group > article-title")||e.push({status:"fail",message:"Missing <article-title> in JATS XML."}),r.querySelectorAll('contrib-group > contrib[contrib-type="author"]').length===0&&e.push({status:"fail",message:"Missing contributor/author entries in JATS XML."})}catch(t){e.push({status:"fail",message:`Critical error during XML parsing: ${t.message}`})}return e}function aa(a){const e=[];if(!a)return[{status:"fail",message:"HTML string is empty."}];try{const r=new DOMParser().parseFromString(a,"text/html");r.querySelector('meta[name="citation_title"]')?e.push({status:"pass",message:"Has citation_title meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_title meta tag."});const i=r.querySelectorAll('meta[name="citation_author"]');i.length===0?e.push({status:"fail",message:"Missing Google Scholar citation_author meta tags."}):e.push({status:"pass",message:`Found ${i.length} citation_author meta tag(s).`}),r.querySelector('meta[name="citation_doi"]')?e.push({status:"pass",message:"Has citation_doi meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_doi meta tag."}),r.querySelector('meta[name="citation_pdf_url"]')?e.push({status:"pass",message:"Has citation_pdf_url meta tag."}):e.push({status:"warn",message:"Missing Google Scholar citation_pdf_url meta tag."}),r.querySelector('link[rel="canonical"]')?e.push({status:"pass",message:"Has canonical URL link."}):e.push({status:"fail",message:"Missing Canonical URL link tag."});const m=r.querySelector('meta[property="og:title"]'),f=r.querySelector('meta[property="og:description"]');!m||!f?e.push({status:"warn",message:"Missing Open Graph meta tags (og:title, og:description)."}):e.push({status:"pass",message:"Has Open Graph metadata."});const n=r.querySelector('script[type="application/ld+json"]');if(!n)e.push({status:"fail",message:"Missing Schema.org JSON-LD structured data block."});else try{JSON.parse(n.textContent)["@type"]!=="ScholarlyArticle"?e.push({status:"warn",message:"Schema.org @type is not set to ScholarlyArticle."}):e.push({status:"pass",message:"Has valid Schema.org JSON-LD scholarly article markup."})}catch(v){e.push({status:"fail",message:`Schema.org JSON-LD script contains invalid JSON: ${v.message}`})}const S=r.querySelector("title");(!S||!S.textContent.trim())&&e.push({status:"fail",message:"HTML document title is empty or missing."}),r.querySelector("h1")||e.push({status:"warn",message:"Missing article title header (h1)."})}catch(t){e.push({status:"fail",message:`Critical error during HTML validation: ${t.message}`})}return e}let k=null,fe="",be="",Ie=null;function ra(a){k=a,De(),o.on("change",ia),o.on("load",()=>{De(),Ae()}),o.on("reset",()=>{De(),sa()})}function De(){k&&(k.innerHTML=`
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
  `,k.querySelector("#btn-generate-all").addEventListener("click",()=>{Ae(),E("Outputs generated")}),k.querySelector("#btn-download-html").addEventListener("click",oa),k.querySelector("#btn-download-xml").addEventListener("click",la),k.querySelector("#btn-validate").addEventListener("click",na),k.querySelector("#btn-copy-html").addEventListener("click",()=>{Ve(fe,"HTML source copied to clipboard")}),k.querySelector("#btn-copy-xml").addEventListener("click",()=>{Ve(be,"JATS XML source copied to clipboard")}),k.querySelector("#btn-fullscreen-html").addEventListener("click",()=>{const a=k.querySelector("#html-preview-frame");a&&a.requestFullscreen&&a.requestFullscreen()}))}function ia(){var e;(e=k==null?void 0:k.querySelector("#chk-live-preview"))!=null&&e.checked&&(Ie&&clearTimeout(Ie),Ie=setTimeout(()=>{Ae(!0)},500))}function Ae(a=!1){if(k)try{fe=Zt(),be=Qt(),k.querySelector("#btn-download-html").disabled=!1,k.querySelector("#btn-download-xml").disabled=!1,k.querySelector("#btn-copy-html").disabled=!1,k.querySelector("#btn-copy-xml").disabled=!1,k.querySelector("#btn-fullscreen-html").disabled=!1;const e=k.querySelector("#html-preview-frame");if(e){const r=e.contentDocument||e.contentWindow.document;r.open(),r.write(fe),r.close()}const t=k.querySelector("#xml-preview-code");t&&(t.innerHTML=ft(be))}catch(e){a||E("Error generating outputs: "+e.message,"error"),console.error(e)}}function sa(){if(!k)return;k.querySelector("#btn-download-html").disabled=!0,k.querySelector("#btn-download-xml").disabled=!0,k.querySelector("#btn-copy-html").disabled=!0,k.querySelector("#btn-copy-xml").disabled=!0;const a=k.querySelector("#html-preview-frame");if(a){const t=a.contentDocument||a.contentWindow.document;t.open(),t.write('<html><body><div style="font-family:sans-serif; color:#7f8c8d; text-align:center; margin-top:100px;">Click Generate to preview</div></body></html>'),t.close()}const e=k.querySelector("#xml-preview-code");e&&(e.innerHTML=""),k.querySelector("#validation-panel").style.display="none"}function na(){if(!k)return;(!fe||!be)&&Ae(!0);const a=k.querySelector("#validation-panel"),e=k.querySelector("#validation-list");a.style.display="block";const t=ea(),r=ta(be),s=aa(fe),i=[...t.map(d=>({...d,category:"Metadata"})),...r.map(d=>({...d,category:"JATS XML"})),...s.map(d=>({...d,category:"HTML Galley"}))];let c="";i.forEach(d=>{let m="✅",f="#2ecc71",n="#e8f8f5";d.status==="fail"?(m="❌",f="#e74c3c",n="#fdebd0"):d.status==="warn"&&(m="⚠️",f="#f39c12",n="#fef9e7"),c+=`
      <div style="display:flex; align-items:center; gap:0.5rem; padding:0.4rem 0.8rem; border-radius:6px; background:${n}; color:#333; margin-bottom:0.2rem; border-left:4px solid ${f};">
        <span style="font-size:1.1rem;">${m}</span>
        <span style="font-weight:600; font-size:0.8rem; color:${f}; min-width:80px; text-transform:uppercase;">[${d.category}]</span>
        <span style="font-size:0.85rem;">${re(d.message)}</span>
      </div>
    `}),e.innerHTML=c,i.some(d=>d.status==="fail")?E("Validation failed with errors. Check details below.","error"):E("Validation passed with success or warnings.","success")}function oa(){const a=o.get("journal.abbreviation")||"journal",e=o.get("article.article_id")||"galley",t=`${a}.${e}.html`.toLowerCase(),r=new Blob([fe],{type:"text/html;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),E(`HTML downloaded as ${t}`)}function la(){const a=o.get("journal.abbreviation")||"journal",e=o.get("article.article_id")||"galley",t=`${a}.${e}.xml`.toLowerCase(),r=new Blob([be],{type:"text/xml;charset=utf-8"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(s),E(`JATS XML downloaded as ${t}`)}function Ve(a,e){navigator.clipboard.writeText(a).then(()=>{E(e)}).catch(t=>{console.error("Failed to copy to clipboard:",t),E("Failed to copy to clipboard","error")})}function E(a,e="success"){const t=document.getElementById("toast-container");if(!t)return;const r=document.createElement("div");r.className=`toast toast-${e}`,r.style.padding="0.75rem 1.25rem",r.style.borderRadius="8px",r.style.fontSize="0.9rem",r.style.color="white",r.style.animation="slideIn 0.3s ease-out",r.style.boxShadow="0 4px 6px rgba(0,0,0,0.1)";let s="#10b981";e==="error"?s="#ef4444":e==="warning"?s="#f59e0b":e==="info"&&(s="#022744"),r.style.background=s,r.textContent=a,t.appendChild(r),setTimeout(()=>{r.style.animation="slideOut 0.3s ease-in forwards",r.addEventListener("animationend",()=>r.remove())},1e3)}function Ke(){ca(),da(),ua(),ct(document.getElementById("panel-journal-profile")),$t(document.getElementById("panel-metadata")),Tt(document.getElementById("panel-import")),Mt(document.getElementById("panel-body")),Yt(document.getElementById("panel-references")),ra(document.getElementById("panel-generate")),E("GalleyForge initialized successfully","info")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ke):Ke();function ca(){const a=document.documentElement,e=localStorage.getItem("galley-theme")||"dark-gray";a.setAttribute("data-theme",e),tt(e),document.getElementById("theme-toggle-light").addEventListener("click",()=>{Ze("light")}),document.getElementById("theme-toggle-dark").addEventListener("click",()=>{Ze("dark-gray")})}function Ze(a){document.documentElement.setAttribute("data-theme",a),localStorage.setItem("galley-theme",a),tt(a),E(`Switched to ${a==="light"?"Light":"Dark Gray"} theme`,"info")}function tt(a){const e=document.getElementById("theme-toggle-light"),t=document.getElementById("theme-toggle-dark");a==="light"?(e.classList.add("active"),t.classList.remove("active")):(e.classList.remove("active"),t.classList.add("active"))}function da(){const a=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".tab-panel");a.forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.tab;a.forEach(s=>s.classList.remove("active")),t.classList.add("active"),e.forEach(s=>{s.id===r?(s.classList.add("active"),s.style.display="block"):(s.classList.remove("active"),s.style.display="none")})})}),e.forEach(t=>{t.id==="panel-metadata"?(t.classList.add("active"),t.style.display="block"):t.style.display="none"})}function ua(){const a=document.getElementById("btn-save-project"),e=document.getElementById("btn-load-project"),t=document.getElementById("file-load-project");a.addEventListener("click",()=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(o.toJSON()),s=document.createElement("a");s.setAttribute("href",r);const i=o.get("article.article_id")||"project";s.setAttribute("download",`${i}-galleyforge.json`),document.body.appendChild(s),s.click(),s.remove(),E("Project saved successfully")}),e.addEventListener("click",()=>t.click()),t.addEventListener("change",r=>{const s=r.target.files[0];if(!s)return;const i=new FileReader;i.onload=function(c){try{o.fromJSON(c.target.result),E("Project loaded successfully")}catch(l){E("Failed to load project: "+l.message,"error")}},i.readAsText(s),r.target.value=""})}
