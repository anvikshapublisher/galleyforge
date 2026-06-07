(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const qe={journal:{title:"",issn_print:"",issn_online:"",publisher:"",abbreviation:"",logo_url:"",website_url:"",doi_prefix:"",base_url:""},article:{title:"",subtitle:"",doi:"",type:"research-article",language:"en",volume:"",issue:"",fpage:"",lpage:"",elocation_id:"",year:"",issue_months:"",article_id:"",correspondence_author:0},authors:[],affiliations:[],dates:{received:"",revised:"",accepted:"",published:""},abstract:{content:""},keywords:[],copyright:{holder:"",year:new Date().getFullYear().toString(),license:"CC-BY-NC-SA-4.0"},sections:[],references:[]};class ot{constructor(){this.listeners={},this.data=JSON.parse(JSON.stringify(qe))}reset(){this.data=JSON.parse(JSON.stringify(qe)),this.data.copyright.year=new Date().getFullYear().toString(),this.emit("reset"),this.emit("change")}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}emit(e){this.listeners[e]&&this.listeners[e].forEach(t=>{try{t()}catch(r){console.error(`Error in listener for event ${e}:`,r)}})}get(e){if(!e)return this.data;const t=e.split(".");let r=this.data;for(const i of t){if(r==null)return;r=r[i]}return r}set(e,t){if(!e)return;const r=e.split(".");let i=this.data;for(let s=0;s<r.length-1;s++){const l=r[s];(i[l]===void 0||i[l]===null)&&(i[l]={}),i=i[l]}i[r[r.length-1]]=t,this.emit("change")}collectAll(){return JSON.parse(JSON.stringify(this.data))}toJSON(){return JSON.stringify(this.data,null,2)}fromJSON(e){try{const t=typeof e=="string"?JSON.parse(e):e;this.data=this.deepMerge(JSON.parse(JSON.stringify(qe)),t),this.emit("load"),this.emit("change")}catch(t){throw console.error("Failed to import JSON data:",t),t}}deepMerge(e,t){if(!t)return e;for(const r of Object.keys(t))t[r]instanceof Object&&!Array.isArray(t[r])?(e[r]||(e[r]={}),this.deepMerge(e[r],t[r])):e[r]=t[r];return e}}const n=new ot,Ke=[{path:"journal.title",label:"Journal Title",required:!0,placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"journal.abbreviation",label:"Journal Abbreviation",placeholder:"e.g., JPCHR"},{path:"journal.issn_print",label:"ISSN (Print)",placeholder:"XXXX-XXXX"},{path:"journal.issn_online",label:"ISSN (Online)",placeholder:"XXXX-XXXX"},{path:"journal.publisher",label:"Publisher Name",placeholder:"e.g., Anviksha Publisher"},{path:"journal.logo_url",label:"Journal Logo URL",placeholder:"https://example.com/logo.png"},{path:"journal.website_url",label:"Journal Website URL",placeholder:"https://example.com"},{path:"journal.base_url",label:"Base URL (for Canonical Links)",placeholder:"https://jpchr.com/jpchr"},{path:"journal.doi_prefix",label:"DOI Prefix",placeholder:"e.g., 10.63486"},{path:"copyright.holder",label:"Copyright Holder",placeholder:"e.g., Journal of Public and Clinical Health Research"},{path:"copyright.year",label:"Copyright Year",placeholder:new Date().getFullYear().toString()}],nt=[{value:"CC-BY-4.0",label:"Creative Commons Attribution 4.0 International (CC BY 4.0)"},{value:"CC-BY-NC-4.0",label:"Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"},{value:"CC-BY-NC-SA-4.0",label:"Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)"},{value:"CC-BY-NC-ND-4.0",label:"Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)"},{value:"CC-BY-SA-4.0",label:"Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)"},{value:"CC0-1.0",label:"Creative Commons CC0 1.0 Universal Public Domain Dedication"},{value:"other",label:"Other / Custom License"}];let Q=null;function lt(a){Q=a,ct(),n.on("load",()=>Le()),n.on("reset",()=>Le())}function ct(){if(!Q)return;Q.innerHTML=`
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
  `,Q.querySelectorAll(".profile-input").forEach(r=>{r.addEventListener("input",()=>{const i=r.dataset.path;n.set(i,r.value)})}),Q.querySelector("#btn-download-profile").addEventListener("click",dt);const e=Q.querySelector("#btn-upload-profile"),t=Q.querySelector("#file-upload-profile");e.addEventListener("click",()=>t.click()),t.addEventListener("change",ut),Q.querySelector("#btn-apply-profile").addEventListener("click",pt),Le()}function Le(){if(!Q)return;Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path,r=n.get(t);e.value=r!==void 0?r:""})}function dt(){const a={};Ke.forEach(r=>{a[r.path]=n.get(r.path)||""}),a["copyright.license"]=n.get("copyright.license")||"CC-BY-NC-SA-4.0";const e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(a,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","journal-profile.json"),document.body.appendChild(t),t.click(),t.remove(),E("Journal profile downloaded")}function ut(a){const e=a.target.files[0];if(!e)return;const t=new FileReader;t.onload=function(r){try{const i=JSON.parse(r.target.result);for(const[s,l]of Object.entries(i))n.set(s,l);Le(),E("Journal profile uploaded successfully")}catch(i){E("Failed to parse profile JSON","error"),console.error(i)}},t.readAsText(e),a.target.value=""}function pt(){Q.querySelectorAll(".profile-input").forEach(e=>{const t=e.dataset.path;n.set(t,e.value)}),n.emit("load"),E("Profile applied to project successfully")}function Pe(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function re(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function mt(a){if(!a)return"";let e=re(a);return e=e.replace(/&lt;(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*&quot;[^&]*?&quot;)*)\s*(\/?)\s*&gt;/g,(t,r,i,s,l)=>{let d="";return s&&(d=s.replace(/([\w:.-]+)\s*=\s*&quot;([^&]*?)&quot;/g,(c,m,b)=>` <span style="color:#4ec9b0">${m}</span>=<span style="color:#ce9178">&quot;${b}&quot;</span>`)),`<span style="color:#569cd6">&lt;${r}${i}</span>${d}<span style="color:#569cd6">${l}&gt;</span>`}),e}function Me(){const a=new Uint8Array(4);return crypto.getRandomValues(a),Array.from(a,e=>e.toString(16).padStart(2,"0")).join("")}function Ze(a){if(!a)return"";let e=a;const t=e.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);t&&(e=t[1]),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->/gi,""),e=e.replace(/<!--\[if[^\]]*\]>[\s\S]*?endif-->/gi,"");const i=new DOMParser().parseFromString(e,"text/html"),s=new Set(["p","b","strong","i","em","u","sup","sub","h1","h2","h3","h4","ul","ol","li","br","table","tr","td","th","tbody","thead"]),l=new Set(["p","h1","h2","h3","h4","ul","ol","li","table","tbody","thead","tr","td","th"]),d=w=>{if(w.nodeType===3)return w.textContent=w.textContent.replace(/\u00A0/g," "),w;if(w.nodeType!==1)return null;const I=w.tagName.toLowerCase();let v=I;if(I==="span"||I==="font"){const D=(w.getAttribute("style")||"").toLowerCase();D.includes("vertical-align: super")||D.includes("vertical-align:super")||D.includes("mso-text-raise")?v="sup":(D.includes("vertical-align: sub")||D.includes("vertical-align:sub"))&&(v="sub")}v==="strong"&&(v="b"),v==="em"&&(v="i");let q;if(s.has(v)){if(q=i.createElement(v),v==="td"||v==="th"){const D=w.getAttribute("colspan"),T=w.getAttribute("rowspan");D&&q.setAttribute("colspan",D),T&&q.setAttribute("rowspan",T)}}else q=i.createDocumentFragment();const F=Array.from(w.childNodes);for(const D of F){const T=d(D);T&&(T.nodeType===1&&l.has(T.tagName.toLowerCase())&&l.has(v),q.appendChild(T))}return q.nodeType===1&&v!=="br"&&!["td","th","tr","table","tbody","thead"].includes(v)&&(!q.hasChildNodes()||q.textContent.trim()==="")?null:q},c=i.createDocumentFragment(),m=Array.from(i.body.childNodes);for(const w of m){const I=d(w);I&&c.appendChild(I)}const b=i.createElement("div");b.appendChild(c);let o=b.innerHTML;return o=o.replace(/<p[^>]*>\s*<p[^>]*>/gi,"<p>"),o=o.replace(/<\/p>\s*<\/p>/gi,"</p>"),o.trim()}function ft(a){if(!a)return"";const e={"&nbsp;":" ","&#160;":" ","&ndash;":"–","&#8211;":"–","&mdash;":"—","&#8212;":"—","&lsquo;":"‘","&#8216;":"‘","&rsquo;":"’","&#8217;":"’","&ldquo;":"“","&#8220;":"“","&rdquo;":"”","&#8221;":"”","&bull;":"•","&#8226;":"•","&hellip;":"…","&#8230;":"…","&trade;":"™","&#8482;":"™","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&deg;":"°","&#176;":"°","&micro;":"µ","&#181;":"µ","&times;":"×","&#215;":"×","&divide;":"÷","&#247;":"÷","&plusmn;":"±","&#177;":"±","&frac12;":"½","&frac14;":"¼","&frac34;":"¾","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&mu;":"μ","&pi;":"π","&sigma;":"σ","&le;":"≤","&ge;":"≥","&ne;":"≠","&infin;":"∞","&rarr;":"→","&larr;":"←","&uarr;":"↑","&darr;":"↓","&para;":"¶","&sect;":"§","&dagger;":"†","&Dagger;":"‡"};let t=a;for(const[r,i]of Object.entries(e)){const s=new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");t=t.replace(s,i)}return t}const bt=[{value:"research-article",label:"Research Article"},{value:"review-article",label:"Review Article"},{value:"case-report",label:"Case Report"},{value:"case-series",label:"Case Series"},{value:"systematic-review",label:"Systematic Review"},{value:"meta-analysis",label:"Meta-Analysis"},{value:"editorial",label:"Editorial"},{value:"letter",label:"Letter to the Editor"},{value:"commentary",label:"Commentary"},{value:"brief-report",label:"Brief Report"},{value:"short-communication",label:"Short Communication"},{value:"clinical-trial",label:"Clinical Trial"},{value:"pilot-study",label:"Pilot Study"},{value:"observational-study",label:"Observational Study"},{value:"cross-sectional",label:"Cross-Sectional Study"},{value:"cohort-study",label:"Cohort Study"},{value:"narrative-review",label:"Narrative Review"},{value:"rapid-communication",label:"Rapid Communication"},{value:"erratum",label:"Erratum"},{value:"retraction",label:"Retraction"}],gt=a=>{const e=bt.find(t=>t.value===a||t.label===a);return e?e.label:a||"Research Article"},ht=[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"},{value:"pt",label:"Portuguese"},{value:"zh",label:"Chinese"},{value:"ja",label:"Japanese"},{value:"ko",label:"Korean"},{value:"ar",label:"Arabic"},{value:"hi",label:"Hindi"}],vt=[8,9,10,11,12,14,16,18,20,22,24];let J=null;function yt(a){J=a,ie(),n.on("load",()=>ie()),n.on("reset",()=>ie())}function ie(){if(!J)return;const a=n.get("authors")||[],e=n.get("affiliations")||[],t=n.get("keywords")||[],r=n.get("article.correspondence_author")||0;J.innerHTML=`
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
          ${a.map((d,c)=>$t(d,c)).join("")}
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
          ${e.map((d,c)=>xt(d,c)).join("")}
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
  `,J.querySelectorAll(".store-bind").forEach(d=>{d.addEventListener("input",()=>{const c=d.dataset.path;n.set(c,d.value)})}),J.querySelector("#btn-add-author").addEventListener("click",wt),St(),J.querySelector("#select-corr-author").addEventListener("change",d=>{n.set("article.correspondence_author",parseInt(d.target.value,10))}),J.querySelector("#btn-add-affiliation").addEventListener("click",Ct),Et();const s=J.querySelector("#abstract-editor");s.innerHTML=n.get("abstract.content")||"",s.addEventListener("input",()=>{n.set("abstract.content",s.innerHTML)}),s.addEventListener("paste",d=>{var m;const c=(m=d.clipboardData)==null?void 0:m.getData("text/html");if(c){d.preventDefault();const b=Ze(c);document.execCommand("insertHTML",!1,b)}}),At();const l=J.querySelector("#keyword-input");l.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===",")&&(d.preventDefault(),Lt(l.value),l.value="")}),J.querySelectorAll(".btn-remove-kw").forEach(d=>{d.addEventListener("click",()=>{const c=parseInt(d.dataset.idx,10),m=n.get("keywords")||[];m.splice(c,1),n.set("keywords",m),ie()})})}function $t(a,e){return`
    <div class="author-item" data-idx="${e}" style="border:1px solid var(--border-color); border-radius:8px; padding:1rem; margin-bottom:1rem; position:relative; background:var(--surface-alt);">
      <button class="btn-remove-author btn btn-icon" data-idx="${e}" style="position:absolute; top:0.5rem; right:0.5rem; font-size:1.1rem; color:red; background:transparent; border:none; cursor:pointer;" title="Remove Author">✕</button>
      <div style="font-weight:bold; margin-bottom:0.75rem; font-size:0.9rem; color:#022744;">Author ${e+1}</div>
      <div class="form-row-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
        <div class="form-group">
          <label class="form-label">Given Name</label>
          <input type="text" class="form-control author-input" data-field="given" data-idx="${e}" value="${C(a.given)}" />
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
  `}function xt(a,e){return`
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
  `}function wt(){const a=n.get("authors")||[];a.push({given:"",surname:"",email:"",orcid:"",affiliation_ids:[]}),n.set("authors",a),ie()}function St(){J.querySelectorAll(".btn-remove-author").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=n.get("authors")||[];t.splice(e,1),n.set("authors",t),(n.get("article.correspondence_author")||0)>t.length&&n.set("article.correspondence_author",t.length?1:0),ie()})}),J.querySelectorAll(".author-input").forEach(a=>{a.addEventListener("change",e=>{const t=parseInt(a.dataset.idx,10),r=a.dataset.field,i=n.get("authors")||[];if(r==="affiliation_ids"){const s=a.value.split(",").map(l=>parseInt(l.trim(),10)).filter(Number.isFinite);i[t][r]=s}else if(r==="orcid"){let s=a.value.trim();s.startsWith("https://orcid.org/")?s=s.substring(18):s.startsWith("http://orcid.org/")&&(s=s.substring(17)),i[t][r]=s,a.value=s}else i[t][r]=a.value;n.set("authors",i)})})}function Ct(){const a=n.get("affiliations")||[];a.push({text:"",ror_id:""}),n.set("affiliations",a),ie()}function Et(){J.querySelectorAll(".btn-remove-affiliation").forEach(a=>{a.addEventListener("click",()=>{const e=parseInt(a.dataset.idx,10),t=n.get("affiliations")||[];t.splice(e,1),n.set("affiliations",t),ie()})}),J.querySelectorAll(".affiliation-input").forEach(a=>{a.addEventListener("change",()=>{const e=parseInt(a.dataset.idx,10),t=a.dataset.field,r=n.get("affiliations")||[];r[e][t]=a.value.trim(),n.set("affiliations",r)})})}function Lt(a){if(!a)return;const e=a.split(",").map(r=>r.trim()).filter(Boolean),t=n.get("keywords")||[];e.forEach(r=>{t.includes(r)||t.push(r)}),n.set("keywords",t),ie()}function At(){const a=J.querySelector("#abstract-editor");J.querySelectorAll(".tb-btn[data-cmd]").forEach(t=>{t.addEventListener("mousedown",r=>{r.preventDefault();const i=t.dataset.cmd;document.execCommand(i,!1,null),n.set("abstract.content",a.innerHTML)})}),J.querySelector(".tb-fontsize").addEventListener("change",t=>{const r=t.target.value;r&&(kt(a,r),n.set("abstract.content",a.innerHTML),t.target.value="")})}function kt(a,e){const t=window.getSelection();if(!t.rangeCount||!a.contains(t.anchorNode))return;const r=Math.min(7,Math.max(1,Math.round(parseInt(e,10)/4)));document.execCommand("fontSize",!1,String(r)),a.querySelectorAll("font[size]").forEach(i=>{const s=document.createElement("span");s.style.fontSize=e+"pt",s.innerHTML=i.innerHTML,i.replaceWith(s)})}function C(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function qt(a){if(!a)return;a.innerHTML=`
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
  `;const e=a.querySelector("#ojs-dropzone"),t=a.querySelector("#file-ojs-xml");e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(r=>{e.addEventListener(r,i=>i.preventDefault(),!1)}),e.addEventListener("drop",r=>{const s=r.dataTransfer.files[0];s&&s.name.endsWith(".xml")?He(s):E("Please upload a valid XML file","error")}),t.addEventListener("change",r=>{const i=r.target.files[0];i&&He(i)})}function He(a){const e=new FileReader;e.onload=function(t){try{Tt(t.target.result)}catch(r){E("Failed to parse XML file: "+r.message,"error"),console.error(r)}},e.readAsText(a)}function Tt(a){const t=new DOMParser().parseFromString(a,"text/xml"),r=t.querySelector("parsererror");if(r)throw new Error(r.textContent);const i=t.querySelector("journal_title, journal title, journal-meta journal-title")?t.querySelector("journal_title, journal title, journal-meta journal-title").textContent.trim():"";i&&n.set("journal.title",i);const s=t.querySelector('issn[type="print"], issn[device="print"], issn')?t.querySelector('issn[type="print"], issn[device="print"], issn').textContent.trim():"";s&&n.set("journal.issn_print",s);const l=t.querySelector('issn[type="online"], issn[device="online"]')?t.querySelector('issn[type="online"], issn[device="online"]').textContent.trim():"";l&&n.set("journal.issn_online",l);const d=t.querySelector("publisher_name, publisher name, publisher-name")?t.querySelector("publisher_name, publisher name, publisher-name").textContent.trim():"";d&&n.set("journal.publisher",d);const c=t.querySelector('article > title, submission > title, article-title, title[locale^="en"]')?t.querySelector('article > title, submission > title, article-title, title[locale^="en"]').textContent.trim():t.querySelector("title")?t.querySelector("title").textContent.trim():"";c&&n.set("article.title",c);const m=t.querySelector('subtitle, subtitle[locale^="en"]')?t.querySelector('subtitle, subtitle[locale^="en"]').textContent.trim():"";m&&n.set("article.subtitle",m);let b="";const o=t.querySelector('id[type="doi"], doi, article-id[pub-id-type="doi"]');if(o)b=o.textContent.trim();else{const g=t.querySelector('id[type="doi_uri"]');g&&(b=g.textContent.trim().replace(/^https?:\/\/doi\.org\//i,""))}if(b){n.set("article.doi",b);const g=b.match(/^(10\.\d{4,9})/);g&&n.set("journal.doi_prefix",g[1])}const w=t.querySelector("volume")?t.querySelector("volume").textContent.trim():"";w&&n.set("article.volume",w);const I=t.querySelector("number, issue")?t.querySelector("number, issue").textContent.trim():"";I&&n.set("article.issue",I);const v=t.querySelector('issue_identification > year, issue > year, publication > year, date-in-citation[content-type="access-date"]')?t.querySelector("issue_identification > year, issue > year, publication > year").textContent.trim():new Date().getFullYear().toString();v&&n.set("article.year",v);const q=t.querySelector("pages, fpage")?t.querySelector("pages, fpage").textContent.trim():"";if(q){const g=q.split("-");n.set("article.fpage",g[0].trim()),g[1]&&n.set("article.lpage",g[1].trim())}const F=t.querySelector("article > id, submission > id")?t.querySelector("article > id, submission > id").textContent.trim():"";F&&n.set("article.article_id",F);const D=t.querySelector('date_submitted, date-received, date[date-type="received"]')?t.querySelector('date_submitted, date-received, date[date-type="received"]').getAttribute("value")||t.querySelector('date_submitted, date-received, date[date-type="received"]').textContent.trim():"";D&&n.set("dates.received",Te(D));const T=t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]')?t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').getAttribute("value")||t.querySelector('date_accepted, date-accepted, date[date-type="accepted"]').textContent.trim():"";T&&n.set("dates.accepted",Te(T));const U=t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]')?t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').getAttribute("value")||t.querySelector('date_published, date-published, date-completed, date[date-type="pub"]').textContent.trim():"";U&&n.set("dates.published",Te(U));const B=t.querySelector('abstract, abstract[locale^="en"]');B&&n.set("abstract.content",B.innerHTML.trim());const u=t.querySelectorAll("keyword, keywords > keyword"),f=[];u.forEach(g=>{const h=g.textContent.trim();h&&!f.includes(h)&&f.push(h)}),f.length&&n.set("keywords",f);const R=t.querySelectorAll("author"),P=[],X=[];function y(g,h=""){if(!g)return null;let _=X.findIndex(L=>L.text.toLowerCase()===g.toLowerCase());return _===-1&&(X.push({text:g,ror_id:h}),_=X.length-1),_+1}R.forEach(g=>{const h=g.querySelector("givenname, given-names")?g.querySelector("givenname, given-names").textContent.trim():"",_=g.querySelector("familyname, surname")?g.querySelector("familyname, surname").textContent.trim():"",L=g.querySelector("email")?g.querySelector("email").textContent.trim():"";let Y=g.querySelector("orcid")?g.querySelector("orcid").textContent.trim():"";Y.startsWith("https://orcid.org/")&&(Y=Y.substring(18));const te=[];g.querySelectorAll("affiliation").forEach(xe=>{const pe=xe.textContent.trim();if(pe){const ne=y(pe);ne!==null&&!te.includes(ne)&&te.push(ne)}}),P.push({given:h,surname:_,email:L,orcid:Y,affiliation_ids:te})}),P.length&&(n.set("authors",P),n.set("article.correspondence_author",1)),X.length&&n.set("affiliations",X);const z=t.querySelectorAll("reference, citation, ref"),j=[];z.forEach(g=>{let h=g.textContent.trim();const _=g.querySelector("mixed-citation");if(_&&(h=_.textContent.trim()),h=h.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,""),h){const L=_t(h)||(g.querySelector("uri")?g.querySelector("uri").textContent.trim():"");j.push({text:h,url:L})}}),j.length&&n.set("references",j);const S=t.querySelectorAll("body > sec, sec");if(S.length){const g=[];S.forEach(h=>{const _=h.querySelector("title"),L=_?_.textContent.trim():"Section";_&&_.remove();const Y=h.innerHTML.trim();g.push({id:Me(),title:L,content:Y,tables:[],figures:[]})}),n.set("sections",g)}n.emit("load"),E("OJS XML metadata imported successfully")}function Te(a){if(!a)return"";const e=a.match(/^(\d{4})[-/](\d{2})[-/](\d{2})/);if(e)return`${e[1]}-${e[2]}-${e[3]}`;try{const t=new Date(a);if(!isNaN(t.getTime()))return t.toISOString().split("T")[0]}catch{}return a}function _t(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}const It=["Introduction","Methods","Results","Discussion","Conclusion","Declarations"],Qe=[8,9,10,11,12,14,16,18,20,22,24];let ce=null,N=[],$e=null,x=[];function Mt(a){ce=a,ee(),n.on("load",()=>ee()),n.on("reset",()=>ee())}function ee(){if(!ce)return;const a=n.get("sections")||[];ce.innerHTML=`
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
  `,ce.querySelector("#btn-add-section").addEventListener("click",()=>Bt()),ce.querySelector("#btn-add-presets").addEventListener("click",()=>Pt()),a.forEach((e,t)=>{var l,d,c;const r=ce.querySelector(`[data-section-id="${e.id}"]`);if(!r)return;const i=r.querySelector(".section-title-input");i.addEventListener("input",()=>{e.title=i.value,se()}),Nt(r,e);const s=r.querySelector(".section-editor");s.innerHTML=e.content||"",s.addEventListener("input",()=>{e.content=s.innerHTML,se()}),s.addEventListener("paste",m=>{var o;const b=(o=m.clipboardData)==null?void 0:o.getData("text/html");if(b){m.preventDefault();const w=Ze(b);document.execCommand("insertHTML",!1,w)}}),(l=r.querySelector(".btn-move-up"))==null||l.addEventListener("click",()=>Oe(t,-1)),(d=r.querySelector(".btn-move-down"))==null||d.addEventListener("click",()=>Oe(t,1)),(c=r.querySelector(".btn-delete-section"))==null||c.addEventListener("click",()=>Ht(t)),r.querySelector(".btn-insert-table").addEventListener("click",()=>Fe(e.id)),r.querySelector(".btn-insert-figure").addEventListener("click",()=>Ue(e.id)),r.querySelectorAll(".btn-remove-table").forEach(m=>{m.addEventListener("click",()=>{const b=parseInt(m.dataset.tableIndex,10);e.tables.splice(b,1),se(),ee()})}),r.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",()=>{const b=parseInt(m.dataset.tableIndex,10);Fe(e.id,b)})}),r.querySelectorAll(".btn-remove-figure").forEach(m=>{m.addEventListener("click",()=>{const b=parseInt(m.dataset.figureIndex,10);e.figures.splice(b,1),se(),ee()})}),r.querySelectorAll(".btn-edit-figure").forEach(m=>{m.addEventListener("click",()=>{const b=parseInt(m.dataset.figureIndex,10);Ue(e.id,b)})})})}function Dt(a,e,t){const r=(a.tables||[]).map((s,l)=>Rt(s,l)).join(""),i=(a.figures||[]).map((s,l)=>jt(s,l)).join("");return`
  <div class="section-block" data-section-id="${a.id}">
    <div class="section-header">
      <span class="section-badge">${e+1}</span>
      <input class="section-title-input form-control" type="text"
             value="${W(a.title)}" placeholder="Section Title" />
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
      <span class="tb-sep"></span>
      <button class="tb-btn" data-cmd="insertOrderedList" title="Ordered List">1.</button>
      <button class="tb-btn" data-cmd="insertUnorderedList" title="Unordered List">•</button>
      <button class="tb-btn" data-cmd="indent" title="Indent">⇥</button>
      <button class="tb-btn" data-cmd="outdent" title="Outdent">⇤</button>
      <span class="tb-sep"></span>
      <select class="tb-fontsize" title="Font Size">
        <option value="">Size</option>
        ${Qe.map(s=>`<option value="${s}">${s}pt</option>`).join("")}
      </select>
      <select class="tb-spacing" title="Paragraph Spacing">
        <option value="">Space</option>
        ${[0,2,4,6,8,10,12,18].map(s=>`<option value="${s}px">${s}px</option>`).join("")}
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
    ${i?`<div class="section-figures">${i}</div>`:""}
  </div>`}function Rt(a,e){const t=a.manualNumber||e+1,r=W(a.caption||""),i=a.headers||[],s=a.rows||[];let l=`
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
    <table class="preview-table">`;return i.length&&(l+="<thead>",i.forEach(d=>{l+="<tr>",d.forEach(c=>{l+=`<th style="text-align:${c.align||"left"}">${ze(c)}</th>`}),l+="</tr>"}),l+="</thead>"),s.length&&(l+="<tbody>",s.forEach(d=>{l+="<tr>",d.forEach((c,m)=>{const b=a.headerCol&&m===0?"th":"td";l+=`<${b} style="text-align:${c.align||"left"}">${ze(c)}</${b}>`}),l+="</tr>"}),l+="</tbody>"),l+="</table></div>",a.footnote&&(l+=`<div class="table-footnote">${W(a.footnote)}</div>`),l+="</div>",l}function ze(a){let e=W(a.text||"");return a.bold&&(e=`<b>${e}</b>`),a.italic&&(e=`<i>${e}</i>`),a.underline&&(e=`<u>${e}</u>`),a.superscript&&(e=`<sup>${e}</sup>`),a.subscript&&(e=`<sub>${e}</sub>`),e}function jt(a,e){return`
  <div class="figure-preview">
    <div class="figure-preview-header">
      <strong>Figure ${e+1}${a.caption?": "+W(a.caption):""}</strong>
      <span>
        <span class="badge badge-info" style="margin-right:8px; cursor:help;" title="Copy and paste this tag into the text to place the figure inline">@[Figure:${e+1}]</span>
        <button class="btn btn-xs btn-primary btn-edit-figure" data-figure-index="${e}" style="margin-right:4px;">Edit</button>
        <button class="btn btn-xs btn-danger btn-remove-figure" data-figure-index="${e}">Remove</button>
      </span>
    </div>
    <img src="${W(a.url)}" alt="${W(a.alt||"")}" class="figure-thumb" />
  </div>`}function Nt(a,e){var s,l;const t=a.querySelector(".section-editor");a.querySelectorAll(".tb-btn[data-cmd]").forEach(d=>{d.addEventListener("mousedown",c=>{c.preventDefault();const m=d.dataset.cmd;document.execCommand(m,!1,null),e.content=t.innerHTML,se()})});const r=a.querySelector(".tb-fontsize");r.addEventListener("change",()=>{const d=r.value;d&&(document.execCommand("fontSize",!1,"7"),t.querySelectorAll('font[size="7"]').forEach(m=>{m.removeAttribute("size"),m.style.fontSize=d+"pt"}),e.content=t.innerHTML,se(),r.value="")});const i=a.querySelector(".tb-spacing");i&&i.addEventListener("change",()=>{const d=i.value;if(d!==""){const c=window.getSelection();if(c.rangeCount>0){let m=c.anchorNode;for(;m&&m!==t;){if(m.tagName==="P"||m.tagName==="DIV"){m.style.marginTop=d;break}m=m.parentNode}if(!m||m===t){document.execCommand("formatBlock",!1,"P");let b=c.anchorNode;for(;b&&b!==t;){if(b.tagName==="P"){b.style.marginTop=d;break}b=b.parentNode}}}e.content=t.innerHTML,se(),i.value=""}}),(s=a.querySelector(".btn-auto-sup"))==null||s.addEventListener("click",d=>{d.preventDefault();let c=t.innerHTML;c=c.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),t.innerHTML=c,e.content=c,se(),E("Auto-superscripted citations")}),(l=a.querySelector(".btn-hl-cite"))==null||l.addEventListener("click",d=>{d.preventDefault(),t.classList.toggle("show-citations"),d.target.classList.toggle("active",t.classList.contains("show-citations"))})}function Bt(a=""){const e=n.get("sections")||[];e.push({id:Me(),title:a,content:"",tables:[],figures:[]}),n.set("sections",e),ee(),E("Section added")}function Pt(){const a=n.get("sections")||[];It.forEach(e=>{a.push({id:Me(),title:e,content:"",tables:[],figures:[]})}),n.set("sections",a),ee(),E("Preset sections added")}function Oe(a,e){const t=n.get("sections")||[],r=a+e;r<0||r>=t.length||([t[a],t[r]]=[t[r],t[a]],n.set("sections",t),ee())}function Ht(a){const e=n.get("sections")||[];e.splice(a,1),n.set("sections",e),ee(),E("Section removed")}function se(){const a=n.get("sections")||[];n.set("sections",a)}function Fe(a,e=null){var b;$e=e!==null?{sectionId:a,tableIndex:e}:null;const r=(n.get("sections")||[]).find(o=>o.id===a);if(!r)return;let i=null;if($e!==null&&(i=r.tables[e]),i){const o=[...i.headers||[],...i.rows||[]];x=o.length?o.map(w=>w.map(I=>({...I}))):Xe(3,3)}else x=Xe(3,3);N=[];const s=document.createElement("div");s.className="modal-overlay",s.id="table-modal-overlay";const l=((b=i==null?void 0:i.headers)==null?void 0:b.length)??1,d=(i==null?void 0:i.headerCol)??!1;s.innerHTML=`
  <div class="modal modal-lg" id="table-editor-modal">
    <div class="modal-header">
      <h3>${i?"Edit":"Insert"} Table</h3>
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
                 value="${W((i==null?void 0:i.caption)||"")}" placeholder="e.g. Demographic characteristics" />
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Table Number</label>
          <input class="form-control" id="tbl-number" type="text"
                 value="${(i==null?void 0:i.manualNumber)||""}" placeholder="Auto" />
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
          ${Qe.map(o=>`<option value="${o}" ${(i==null?void 0:i.fontSize)===String(o)?"selected":""}>${o}pt</option>`).join("")}
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
                  placeholder="e.g. p < 0.05, SD = Standard Deviation">${W((i==null?void 0:i.footnote)||"")}</textarea>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" id="tbl-cancel">Cancel</button>
      <button class="btn btn-primary" id="tbl-save">
        ${i?"Update Table":"Insert Table"}
      </button>
    </div>
  </div>`,document.body.appendChild(s),le(),s.querySelector(".modal-close-btn").addEventListener("click",Ce),s.querySelector("#tbl-cancel").addEventListener("click",Ce),s.addEventListener("click",o=>{o.target===s&&Ce()}),s.querySelector(".btn-fullscreen-toggle").addEventListener("click",()=>{s.querySelector("#table-editor-modal").classList.toggle("modal-fullscreen")});const c=s.querySelector("#tbl-paste-zone");c.addEventListener("paste",o=>{Xt(o,c)}),s.querySelector("#tbl-actions").addEventListener("click",o=>{var I;const w=(I=o.target.closest("[data-act]"))==null?void 0:I.dataset.act;w&&Ot(w)}),s.querySelector("#tbl-save").addEventListener("click",()=>{Jt(a)});const m=s.querySelector("#tbl-fontsize");m&&m.addEventListener("change",()=>{Ee("fontSize",m.value),le()})}let he=!1,ve=null;function Ce(){var a;(a=document.getElementById("table-modal-overlay"))==null||a.remove(),$e=null,x=[],N=[],he=!1,ve=null}function Xe(a,e){return Array.from({length:a},()=>Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})))}function le(){const a=document.getElementById("tbl-grid-wrap");if(!a)return;let e='<table class="table-editor-grid"><tbody>';x.forEach((r,i)=>{e+="<tr>",r.forEach((s,l)=>{if(s.hidden)return;const d=N.some(o=>o.row===i&&o.col===l)?" selected":"",c=[];s.bold&&c.push("font-weight:bold"),s.italic&&c.push("font-style:italic"),s.underline&&c.push("text-decoration:underline"),s.superscript&&c.push("vertical-align:super;font-size:0.8em"),s.subscript&&c.push("vertical-align:sub;font-size:0.8em"),s.align&&c.push("text-align:"+s.align),s.fontSize&&c.push("font-size:"+s.fontSize+"pt");const m=s.colspan&&s.colspan>1?` colspan="${s.colspan}"`:"",b=s.rowspan&&s.rowspan>1?` rowspan="${s.rowspan}"`:"";e+=`<td class="grid-cell${d}" data-r="${i}" data-c="${l}"${m}${b}>
        <div class="grid-input" contenteditable="true"
               style="${c.join(";")}" data-r="${i}" data-c="${l}">${s.text}</div>
      </td>`}),e+="</tr>"}),e+="</tbody></table>",a.innerHTML=e;let t=null;a.querySelectorAll(".grid-cell").forEach(r=>{r.addEventListener("mousedown",i=>{if(i.target.classList.contains("grid-input")&&!i.ctrlKey&&!i.metaKey&&!i.shiftKey)return;const s=parseInt(r.dataset.r,10),l=parseInt(r.dataset.c,10);i.shiftKey&&t?(i.preventDefault(),Je(t.r,t.c,s,l)):(he=!0,ve={r:s,c:l},t={r:s,c:l},zt(s,l,i.ctrlKey||i.metaKey))}),r.addEventListener("mouseenter",i=>{if(he&&ve){const s=parseInt(r.dataset.r,10),l=parseInt(r.dataset.c,10);Je(ve.r,ve.c,s,l),t={r:s,c:l}}})}),document.addEventListener("mouseup",()=>{he=!1},{once:!0}),window.addEventListener("mouseup",()=>{he=!1}),a.querySelectorAll(".grid-input").forEach(r=>{r.addEventListener("focus",()=>{const i=parseInt(r.dataset.r,10),s=parseInt(r.dataset.c,10);N.some(l=>l.row===i&&l.col===s)||(N=[{row:i,col:s}],t={r:i,c:s},a.querySelectorAll(".grid-cell").forEach(l=>l.classList.remove("selected")),r.parentElement.classList.add("selected"),De())}),r.addEventListener("input",()=>{const i=parseInt(r.dataset.r,10),s=parseInt(r.dataset.c,10);x[i][s].text=r.innerHTML})})}function Je(a,e,t,r){const i=Math.min(a,t),s=Math.max(a,t),l=Math.min(e,r),d=Math.max(e,r);N=[];for(let c=i;c<=s;c++)for(let m=l;m<=d;m++)N.push({row:c,col:m});le(),De()}function zt(a,e,t){if(t){const r=N.findIndex(i=>i.row===a&&i.col===e);r>=0?N.splice(r,1):N.push({row:a,col:e})}else N=[{row:a,col:e}];le(),De()}function De(){var e;const a=document.getElementById("tbl-fontsize");if(a)if(N.length===1){const t=N[0],r=(e=x[t.row])==null?void 0:e[t.col];r&&(a.value=r.fontSize?String(r.fontSize):"")}else a.value=""}function Ot(a){var t;const e=((t=x[0])==null?void 0:t.length)||0;switch(a){case"addCol":x.forEach(i=>i.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""}));break;case"removeCol":e>1&&x.forEach(i=>i.pop());break;case"addRow":x.push(Array.from({length:e},()=>({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));break;case"removeRow":x.length>1&&x.pop();break;case"bold":ge("bold");break;case"italic":ge("italic");break;case"underline":ge("underline");break;case"superscript":ge("superscript");break;case"subscript":ge("subscript");break;case"autoSup":(N.length?N:x.flatMap((s,l)=>s.map((d,c)=>({row:l,col:c})))).forEach(s=>{let l=x[s.row][s.col].text;l=l.replace(/(?:<sup[^>]*>)?(\[\s*\d[\d,\s-]*\])(?:<\/sup>)?/g,"<sup>$1</sup>"),x[s.row][s.col].text=l}),E("Citations superscripted");break;case"hlCite":document.getElementById("table-editor-modal").classList.toggle("show-citations");break;case"fontInc":case"fontDec":{const i=N.length?N:x.flatMap((l,d)=>l.map((c,m)=>({row:d,col:m}))),s=a==="fontInc"?1:-1;i.forEach(l=>{let d=parseFloat(x[l.row][l.col].fontSize)||10;d=Math.max(6,Math.min(24,d+s)),x[l.row][l.col].fontSize=String(d)})}break;case"alignLeft":Ee("align","left");break;case"alignCenter":Ee("align","center");break;case"alignRight":Ee("align","right");break;case"merge":Ft();break}le()}function ge(a){N.forEach(({row:e,col:t})=>{x[e][t][a]=!x[e][t][a]})}function Ee(a,e){N.forEach(({row:t,col:r})=>{x[t][r][a]=e})}function Ft(){if(N.length<2)return;let a=1/0,e=-1/0,t=1/0,r=-1/0;N.forEach(s=>{s.row<a&&(a=s.row),s.row>e&&(e=s.row),s.col<t&&(t=s.col),s.col>r&&(r=s.col)});const i=[];for(let s=a;s<=e;s++)for(let l=t;l<=r;l++)x[s][l].hidden||i.push(x[s][l].text);x[a][t].text=i.filter(Boolean).join(" "),x[a][t].rowspan=e-a+1,x[a][t].colspan=r-t+1,x[a][t].hidden=!1;for(let s=a;s<=e;s++)for(let l=t;l<=r;l++)(s!==a||l!==t)&&(x[s][l].text="",x[s][l].hidden=!0,x[s][l].rowspan=1,x[s][l].colspan=1)}function Xt(a,e){var r;const t=(r=a.clipboardData)==null?void 0:r.getData("text/plain");setTimeout(()=>{const i=e.querySelector("table"),s=e.innerText||t;if(i){const l=i.querySelectorAll("tr");if(x=[],l.forEach(d=>{const c=d.querySelectorAll("td, th"),m=[];c.forEach(b=>{const o=b.getAttribute("style")||"",w=(b.innerText||b.textContent||"").trim(),I=/font-weight\s*:\s*(bold|[6-9]\d{2})/i.test(o)||!!b.querySelector("b, strong")||b.tagName==="TH",v=/font-style\s*:\s*italic/i.test(o)||!!b.querySelector("i, em"),q=/text-decoration[^:]*:\s*underline/i.test(o)||!!b.querySelector("u"),F=/vertical-align\s*:\s*super/i.test(o)||!!b.querySelector("sup"),D=/vertical-align\s*:\s*sub/i.test(o)||!!b.querySelector("sub");let T="left";const U=o.match(/text-align\s*:\s*(left|center|right)/i);U&&(T=U[1].toLowerCase());let B="";const u=o.match(/font-size\s*:\s*([\d.]+)pt/i);u&&(B=u[1]),m.push({text:w,bold:I,italic:v,underline:q,superscript:F,subscript:D,align:T,fontSize:B})}),m.length&&x.push(m)}),x.length){const d=Math.max(...x.map(c=>c.length));x.forEach(c=>{for(;c.length<d;)c.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left"})}),e.innerHTML="",N=[],le(),E("Table pasted successfully");return}}if(e.innerHTML="",s){const l=s.split(/\r?\n/).map(d=>d.trim()).filter(Boolean);if(l.length>0){x=l.map(c=>c.split("	").map(b=>({text:b.trim(),bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})));const d=Math.max(...x.map(c=>c.length));x.forEach(c=>{for(;c.length<d;)c.push({text:"",bold:!1,italic:!1,underline:!1,superscript:!1,subscript:!1,align:"left",fontSize:""})}),N=[],le(),E("Table parsed from plain text (TSV)");return}}E("No table found in pasted content","warning")},200)}function Jt(a){var w,I,v,q,F,D;const e=n.get("sections")||[],t=e.find(T=>T.id===a);if(!t)return;const r=((w=document.getElementById("tbl-caption"))==null?void 0:w.value.trim())||"",i=((I=document.getElementById("tbl-number"))==null?void 0:I.value.trim())||"",s=Math.max(1,Math.min(5,parseInt((v=document.getElementById("tbl-header-rows"))==null?void 0:v.value,10)||1)),l=((q=document.getElementById("tbl-header-col"))==null?void 0:q.checked)||!1,d=((F=document.getElementById("tbl-footnote"))==null?void 0:F.value.trim())||"",c=((D=document.getElementById("tbl-fontsize"))==null?void 0:D.value)||"",m=x.slice(0,s).map(T=>T.map(U=>({...U}))),b=x.slice(s).map(T=>T.map(U=>({...U}))),o={caption:r,manualNumber:i,headers:m,rows:b,headerCol:l,footnote:d,fontSize:c};t.tables||(t.tables=[]),$e!==null?(t.tables[$e.tableIndex]=o,E("Table updated")):(t.tables.push(o),E("Table inserted")),n.set("sections",e),Ce(),ee()}function Ue(a,e=-1){const t=n.get("sections")||[],r=t.find(B=>B.id===a);if(!r)return;const i=e>=0&&r.figures&&r.figures[e],s=i?r.figures[e]:null,l=t.reduce((B,u)=>{var f;return B+(((f=u.figures)==null?void 0:f.length)||0)},0),d=String(l+1).padStart(2,"0"),c=i?s.url:`images/F${d}.png`,m=i?s.caption:"",b=i&&s.alt||"",o=i&&s.base64Data||"",w=i?"Edit Figure":"Insert Figure",I=i?"Update Figure":"Insert Figure",v=document.createElement("div");v.className="modal-overlay",v.id="figure-modal-overlay",v.innerHTML=`
  <div class="modal">
    <div class="modal-header">
      <h3>${w}</h3>
      <button class="btn btn-icon modal-close-btn">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Image URL</label>
        <input class="form-control" id="fig-url" value="${W(c)}"
               placeholder="${W(c)}" />
        <small style="color:var(--text-secondary)">Or upload an image for JATS XML base64 embedding:</small>
        <input type="file" class="form-control" id="fig-file" accept="image/*" style="margin-top:0.5rem;" />
      </div>
      <div class="form-group">
        <label class="form-label">Caption</label>
        <input class="form-control" id="fig-caption" placeholder="Figure caption" value="${W(m)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Alt Text</label>
        <input class="form-control" id="fig-alt" placeholder="Describe the image for accessibility" value="${W(b)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Preview</label>
        <div class="figure-live-preview" id="fig-preview-zone" style="min-height: 100px; border: 1px dashed var(--border-color); display:flex; align-items:center; justify-content:center;">
          <img id="fig-preview-img" src="${W(o||c)}" alt="" style="max-height: 300px;" />
        </div>
        <input type="hidden" id="fig-base64" value="${W(o)}" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="fig-cancel">Cancel</button>
      <button class="btn btn-primary" id="fig-save">${I}</button>
    </div>
  </div>`,document.body.appendChild(v);const q=v.querySelector("#fig-url"),F=v.querySelector("#fig-preview-img"),D=v.querySelector("#fig-file"),T=v.querySelector("#fig-base64"),U=v.querySelector("#fig-preview-zone");q.addEventListener("input",()=>{T.value||(F.src=q.value)}),D.addEventListener("change",B=>{const u=B.target.files[0];if(u){const f=new FileReader;f.onload=R=>{T.value=R.target.result,F.src=R.target.result},f.readAsDataURL(u)}}),U.setAttribute("tabindex","0"),U.addEventListener("paste",B=>{const u=B.clipboardData.items;for(let f=0;f<u.length;f++)if(u[f].type.indexOf("image")!==-1){const R=u[f].getAsFile(),P=new FileReader;P.onload=X=>{T.value=X.target.result,F.src=X.target.result,E("Image pasted")},P.readAsDataURL(R);break}}),v.querySelector(".modal-close-btn").addEventListener("click",Se),v.querySelector("#fig-cancel").addEventListener("click",Se),v.addEventListener("click",B=>{B.target===v&&Se()}),v.querySelector("#fig-save").addEventListener("click",()=>{const B=q.value.trim(),u=v.querySelector("#fig-caption").value.trim(),f=v.querySelector("#fig-alt").value.trim(),R=T.value;r.figures||(r.figures=[]),i?r.figures[e]={url:B,caption:u,alt:f,base64Data:R}:r.figures.push({url:B,caption:u,alt:f,base64Data:R}),n.set("sections",t),Se(),ee(),E(i?"Figure updated":"Figure inserted")})}function Se(){var a;(a=document.getElementById("figure-modal-overlay"))==null||a.remove()}function W(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Ut(a){ye(a),n.on("load",()=>ye(a)),n.on("reset",()=>ye(a))}function ye(a){if(!a)return;const e=n.get("references")||[];a.innerHTML=`
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
    </div>`}),e+="</div>",e}function Gt(a,e){a.querySelectorAll(".btn-remove-ref").forEach(t=>{t.addEventListener("click",()=>{const r=parseInt(t.dataset.refIndex,10);e.splice(r,1),n.set("references",e),ye(a),E("Reference removed")})}),a.querySelectorAll(".ref-url-input").forEach(t=>{t.addEventListener("input",()=>{const r=parseInt(t.dataset.refIndex,10);e[r].url=t.value.trim(),n.set("references",e)})})}function Wt(a){const e=a.querySelector("#ref-bulk-input");if(!e)return;const t=e.value.trim();if(!t){E("Please paste references first","warning");return}const i=t.split(`
`).map(s=>s.trim()).filter(Boolean).map(s=>{const d=s.replace(/^\s*[\d]+[.)]\s*/,"").replace(/^\s*[-•]\s*/,"")||s,c=Vt(d);return{text:d,url:c}});n.set("references",i),e.value="",ye(a),E(`${i.length} reference${i.length!==1?"s":""} parsed`)}function Vt(a){const e=a.match(/https?:\/\/doi\.org\/10\.\d{4,9}\/[^\s]+/i);if(e)return e[0].replace(/[.,;)\]]+$/,"");const t=a.match(/doi:\s*(10\.\d{4,9}\/[^\s]+)/i);return t?"https://doi.org/"+t[1].replace(/[.,;)\]]+$/,""):""}function Ye(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function Kt(){const a=n.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],i=a.affiliations||[],s=a.dates||{},l=a.abstract||{},d=a.keywords||[],c=a.copyright||{},m=a.sections||[],b=a.references||[],o=p=>re(p||""),w=p=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[p]||p||"Research Article",I=e.base_url||"https://jpchr.com/jpchr",v=t.article_id||"galley",q=`${I}/article/view/${v}/html`,F=`${I}/article/view/${v}/pdf`,D=document.createElement("div");D.innerHTML=l.content||"";const T=D.textContent.replace(/\s+/g," ").trim(),U=T.substring(0,155)+(T.length>155?"...":""),u=(p=>p==null?"":String(p).replace(/-/g,"/"))(s.published||s.accepted||s.received||t.year),f=r.map(p=>{const M=(p.affiliation_ids||[]).map(V=>{var K;return(K=i[V-1])==null?void 0:K.text}).filter(Boolean).join("; ");return{"@type":"Person",name:`${p.given||""} ${p.surname||""}`.trim(),affiliation:M||void 0,identifier:p.orcid?`https://orcid.org/${p.orcid}`:void 0}}),R={"@context":"https://schema.org","@type":"ScholarlyArticle",headline:t.title||"",alternativeHeadline:t.subtitle||void 0,genre:w(t.type),author:f,datePublished:s.published||void 0,dateCreated:s.received||void 0,isPartOf:{"@type":"PublicationIssue",issueNumber:t.issue||void 0,volumeNumber:t.volume||void 0,isPartOf:{"@type":"Periodical",name:e.title||"",issn:[e.issn_online,e.issn_print].filter(Boolean)}},pageStart:t.fpage||void 0,pageEnd:t.lpage||void 0,description:T||void 0,publisher:{"@type":"Organization",name:e.publisher||""},identifier:[t.doi?{"@type":"PropertyValue",propertyID:"doi",value:t.doi}:null].filter(Boolean)},P=t.doi?`<meta name="citation_doi" content="${o(t.doi)}">`:"",X=e.issn_online||e.issn_print||"";let y="";r.forEach(p=>{const M=`${p.surname||""}, ${p.given||""}`.trim().replace(/^,|,$/,"");y+=`  <meta name="citation_author" content="${o(M)}">
`,p.orcid&&(y+=`  <meta name="citation_author_orcid" content="https://orcid.org/${o(p.orcid)}">
`)});let z="";l.content&&(z+=`      <a href="#abstract" class="sidebar-link">Abstract</a>
`),m.forEach(p=>{z+=`      <a href="#sec-${p.id}" class="sidebar-link">${o(p.title)}</a>
`}),b.length&&(z+=`      <a href="#references" class="sidebar-link">References</a>
`);const j=r.length===1,S=i.length===1;let g="";r.forEach((p,M)=>{const V=`${o(p.given)} ${o(p.surname)}`.trim(),K=M+1===parseInt(t.correspondence_author,10),G=p.orcid?` <a href="https://orcid.org/${o(p.orcid)}" target="_blank" class="orcid-link" title="ORCID iD"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" class="orcid-icon" alt="ORCID iD" /></a>`:"",$=K?"<sup>*</sup>":"";let O="";!j&&p.affiliation_ids&&p.affiliation_ids.length&&(O=`<sup>${p.affiliation_ids.join(",")}</sup>`),g+=`<span class="author-name">${V}${O}${$}${G}</span>${M<r.length-1?", ":""}`});let h="";if(i.length)if(j&&S){const p=i[0],M=p.ror_id?` <a href="${o(p.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";h=`<div class="affiliation-line single">${o(p.text)}${M}</div>`}else h='<ol class="affiliations-list" style="list-style-type:none; padding-left:0;">',i.forEach((p,M)=>{const V=p.ror_id?` <a href="${o(p.ror_id)}" target="_blank" class="ror-link"><img src="https://ror.org/img/ror-logo-small.png" class="ror-icon" alt="ROR" style="height:12px; margin-left:4px; vertical-align:middle;"/></a>`:"";h+=`<li class="affiliation-line" style="margin-bottom:4px;"><sup>${M+1}</sup> ${o(p.text)}${V}</li>`}),h+="</ol>";let _="";const L=parseInt(t.correspondence_author,10);if(L>0&&r[L-1]){const p=r[L-1],M=`${p.given||""} ${p.surname||""}`.trim();_=`<div class="correspondence-line" style="font-size:0.9rem; margin-top:0.5rem; color:var(--text-secondary);">*Correspondence: ${o(M)}, <a href="mailto:${o(p.email)}">${o(p.email)}</a></div>`}const Y=t.volume?`Vol. ${o(t.volume)}`:"",te=t.issue?`No. ${o(t.issue)}`:"",oe=t.issue_months?`(${o(t.issue_months)})`:"",xe=t.year?o(t.year):"";let pe=[Y,te,oe].filter(Boolean).join(", ");xe&&(pe+=` ${xe}`);const ne=t.fpage||t.elocation_id||"",tt=ne?` | Pages: ${o(ne)}${t.lpage?"-"+o(t.lpage):""}`:"",at=t.article_id?` | Article ID: ${o(t.article_id)}`:"",rt=t.doi?` | DOI: <a href="https://doi.org/${o(t.doi)}" target="_blank">${o(t.doi)}</a>`:"",it=`${pe}${tt}${at}${rt}`,me=[];s.received&&me.push(`Received: ${s.received}`),s.revised&&me.push(`Revised: ${s.revised}`),s.accepted&&me.push(`Accepted: ${s.accepted}`),s.published&&me.push(`Published: ${s.published}`);const Re=me.join(" | ");let je="";const Ne=c.license||"CC-BY-NC-SA-4.0";if(Ne.startsWith("CC-")){const p=Ne.replace("CC-","").replace("-4.0","").toLowerCase();je=`<a href="https://creativecommons.org/licenses/${p}/4.0/" target="_blank" style="display:inline-block; margin-top:0.5rem;">
      <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/${p}.svg" alt="Creative Commons License" style="height:31px; border:none;"/>
    </a>`}let Be="";const we=(p,M=!1)=>{if(p.hidden)return"";const V=M?"th":"td",K=p.align?`text-align:${p.align}`:"",G=p.bold?"font-weight:bold;":"",$=p.italic?"font-style:italic;":"",O=p.underline?"text-decoration:underline;":"",Z=[K,G,$,O].filter(Boolean).join(";");let k=re(p.text||"");k=k.replace(/&lt;sup&gt;/gi,"<sup>").replace(/&lt;\/sup&gt;/gi,"</sup>"),k=k.replace(/&lt;sub&gt;/gi,"<sub>").replace(/&lt;\/sub&gt;/gi,"</sub>"),k=k.replace(/&lt;b&gt;/gi,"<b>").replace(/&lt;\/b&gt;/gi,"</b>"),k=k.replace(/&lt;i&gt;/gi,"<i>").replace(/&lt;\/i&gt;/gi,"</i>"),k=k.replace(/&lt;u&gt;/gi,"<u>").replace(/&lt;\/u&gt;/gi,"</u>"),p.bold&&(k=`<strong>${k}</strong>`),p.italic&&(k=`<em>${k}</em>`),p.underline&&(k=`<u>${k}</u>`),p.superscript&&(k=`<sup>${k}</sup>`),p.subscript&&(k=`<sub>${k}</sub>`);const H=p.colspan&&p.colspan>1?` colspan="${p.colspan}"`:"",ae=p.rowspan&&p.rowspan>1?` rowspan="${p.rowspan}"`:"";return`<${V}${H}${ae} ${Z?`style="${Z}"`:""}>${k}</${V}>`},st=p=>{if(!p||!p.text)return"";const M=String(p.text),V=/(?:doi:\s*)?(?:https?:\/\/(?:dx\.)?doi\.org\/)?\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi;let K=re(M).replace(V,(G,$)=>`doi:<a href="https://doi.org/${$}" target="_blank">${$}</a>`);if(p.url){const G=String(p.url).trim();if(/doi\.org/i.test(G)||G.startsWith("10.")){const O=G.replace(/^(?:https?:\/\/doi\.org\/|doi:\s*)/i,"");if(!M.includes(O)){const Z=`https://doi.org/${O}`;K+=` doi:<a href="${re(Z)}" target="_blank">${re(O)}</a>`}}else M.includes(G)||(K+=` <a href="${re(G)}" target="_blank">${re(G)}</a>`)}return K};return m.forEach(p=>{let M=p.content||"";const V=[];p.tables&&p.tables.length&&p.tables.forEach(($,O)=>{const Z=$.manualNumber||O+1,k=$.fontSize?` style="font-size: ${$.fontSize}pt;"`:"";let H=`
        <div class="table-container" id="tbl-${p.id}-${O}"${k}>
          <div class="table-caption"><strong>Table ${o(Z)}:</strong> ${o($.caption)}</div>
          <div class="table-scroll">
            <table>`;$.headers&&$.headers.length&&(H+="<thead>",Array.isArray($.headers[0])?$.headers.forEach(ae=>{H+="<tr>",ae.forEach(fe=>{H+=we(fe,!0)}),H+="</tr>"}):(H+="<tr>",$.headers.forEach(ae=>{H+=we(ae,!0)}),H+="</tr>"),H+="</thead>"),$.rows&&$.rows.length&&(H+="<tbody>",Array.isArray($.rows[0])?$.rows.forEach(ae=>{H+="<tr>",ae.forEach((fe,be)=>{const ke=$.headerCol&&be===0;H+=we(fe,ke)}),H+="</tr>"}):$.rows.forEach(ae=>{H+="<tr>";const fe=$.headers.length;for(let be=0;be<fe;be++){const ke=ae[`col-${be}`]||"";H+=we({text:ke},!1)}H+="</tr>"}),H+="</tbody>"),H+=`
            </table>
          </div>`,$.footnote&&(H+=`<div class="table-note">${o($.footnote)}</div>`),H+="</div>",V.push({num:Z,html:H,placed:!1})});const K=[];p.figures&&p.figures.length&&p.figures.forEach(($,O)=>{const Z=O+1,k=`
        <figure class="figure-container" id="fig-${p.id}-${O}">
          <img src="${o($.url)}" alt="${o($.alt||$.caption||"")}" class="article-image" />
          <figcaption class="figure-caption"><strong>Figure ${Z}:</strong> ${o($.caption)}</figcaption>
        </figure>`;K.push({num:Z,html:k,placed:!1})}),M=M.replace(/<img\b[^>]*>/gi,""),V.forEach($=>{const O=String($.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),Z=new RegExp(`@\\[Table[\\s:]*${O}\\]`,"gi"),k=M.replace(Z,$.html);k!==M&&(M=k,$.placed=!0)}),K.forEach($=>{const O=String($.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),Z=new RegExp(`@\\[Figure[\\s:]*${O}\\]`,"gi"),k=M.replace(Z,$.html);k!==M&&(M=k,$.placed=!0)});let G="";V.forEach($=>{$.placed||(G+=$.html)}),K.forEach($=>{$.placed||(G+=$.html)}),Be+=`
    <section class="article-section" id="sec-${p.id}">
      <h2 class="section-title">${o(p.title)}</h2>
      <div class="section-text-content">${M}</div>
      ${G}
    </section>`}),`<!DOCTYPE html>
<html lang="${o(t.language||"en")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${o(t.title)}</title>
  <meta name="description" content="${o(U)}">
  
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
${P}  <meta name="citation_issn" content="${o(X)}">
  <meta name="citation_publisher" content="${o(e.publisher)}">
  <meta name="citation_language" content="${o(t.language)}">
  <meta name="citation_pdf_url" content="${o(F)}">
  <meta name="citation_fulltext_html_url" content="${o(q)}">
  
  <!-- Open Graph Metadata -->
  <meta property="og:title" content="${o(t.title)}">
  <meta property="og:description" content="${o(U)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${o(q)}">
  <meta property="og:site_name" content="${o(e.title)}">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(R,null,2)}
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

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.15;
      color: var(--text);
      background-color: var(--bg);
      margin: 0;
      padding: 0;
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
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
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
      font-size: 2.2rem;
      font-weight: 800;
      line-height: 1.15;
      color: var(--primary);
      margin: 0.75rem 0 0.5rem 0;
    }

    .article-subtitle {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--text-light);
      margin: 0 0 1.5rem 0;
      line-height: 1.15;
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
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.3rem;
      margin-top: 1.75rem;
      margin-bottom: 0.75rem;
    }

    .section-text-content {
      line-height: 1.15;
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
      border-collapse: collapse;
      font-size: inherit; /* Equal to rest of the text */
    }

    th, td {
      border: 1px solid var(--border);
      padding: 0.5rem 0.75rem;
      vertical-align: top;
      font-size: inherit; /* Equal to rest of the text */
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
${z}    </nav>

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
      ${Re?`<div class="article-metadata-line">${Re}</div>`:""}
      
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
    ${Be}

    <!-- References -->
    ${b.length?`
    <section class="article-section" id="references">
      <h2 class="section-title">References</h2>
      <ol class="references-list">
        ${b.map(p=>`
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
          ${je}
        </div>
      </div>
    </footer>
  </div>
</body>
</html>`}function Zt(){const a=n.collectAll(),e=a.journal||{},t=a.article||{},r=a.authors||[],i=a.affiliations||[],s=a.dates||{},l=a.abstract||{},d=a.keywords||[],c=a.copyright||{},m=a.sections||[],b=a.references||[],o=u=>{if(u==null)return"";const f=String(u),R=ft(f);return Pe(R)},w=u=>({"research-article":"Research Article","review-article":"Review Article","case-report":"Case Report","case-series":"Case Series","systematic-review":"Systematic Review","meta-analysis":"Meta-Analysis",editorial:"Editorial",letter:"Letter to the Editor",commentary:"Commentary","brief-report":"Brief Report","short-communication":"Short Communication","clinical-trial":"Clinical Trial","pilot-study":"Pilot Study","observational-study":"Observational Study","cross-sectional":"Cross-Sectional Study","cohort-study":"Cohort Study","narrative-review":"Narrative Review","rapid-communication":"Rapid Communication",erratum:"Erratum",retraction:"Retraction"})[u]||u||"Research Article",I=u=>{if(!u)return"";const R=new DOMParser().parseFromString(u,"text/html"),P={b:"bold",strong:"bold",i:"italic",em:"italic",u:"underline",sub:"sub",p:"p",ul:"list",ol:"list",li:"list-item"},X=(j,S=!1)=>{if(j.nodeType===3)return Pe(j.textContent);if(j.nodeType!==1)return"";const g=j.tagName.toLowerCase();let h="";const _=g==="p";for(const L of j.childNodes)h+=X(L,S||_);if(g==="sup"){const L=j.textContent.trim();return/^\[\s*\d[\d,\s-]*\]$/.test(L)?`<xref ref-type="bibr">${h}</xref>`:`<sup>${h}</sup>`}if(g==="br")return" ";if(g==="ul")return`<list list-type="bullet">${h}</list>`;if(g==="ol")return`<list list-type="order">${h}</list>`;if(g==="li")return h.trim().startsWith("<p>")||(h=`<p>${h}</p>`),`<list-item>${h}</list-item>`;if(P[g]){const L=P[g];return L==="p"?S?h:h.trim()?`<p>${h}</p>`:"":`<${L}>${h}</${L}>`}return h};let y="";for(const j of R.body.childNodes)y+=X(j,!1);const z=y.trim();return z&&!z.startsWith("<p>")&&!z.startsWith("<list")&&(y=`<p>${y}</p>`),y},v=u=>{let f=I(u.text||"");return f=f.replace(/^<p>(.*)<\/p>$/is,"$1"),u.bold&&(f=`<bold>${f}</bold>`),u.italic&&(f=`<italic>${f}</italic>`),u.underline&&(f=`<underline>${f}</underline>`),u.superscript&&(f=`<sup>${f}</sup>`),u.subscript&&(f=`<sub>${f}</sub>`),f},q=u=>{if(!u)return null;const f=u.split("-");return f.length===3?{year:f[0],month:f[1],day:f[2]}:null},D=`<?xml version="1.0" encoding="UTF-8"?>
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
        ${r.map((u,f)=>`
        <contrib contrib-type="author" ${f+1===parseInt(t.correspondence_author,10)?'corresp="yes"':""}>
          <name>
            <surname>${o(u.surname)}</surname>
            <given-names>${o(u.given)}</given-names>
          </name>
          ${u.email?`<email>${o(u.email)}</email>`:""}
          ${u.orcid?`<contrib-id contrib-id-type="orcid">https://orcid.org/${o(u.orcid)}</contrib-id>`:""}
          ${u.affiliation_ids&&u.affiliation_ids.length?u.affiliation_ids.map(P=>`
          <xref ref-type="aff" rid="aff-${P}" />`).join(""):""}
        </contrib>`).join("")}
      </contrib-group>

      <!-- Affiliations -->
      ${i.map((u,f)=>`
      <aff id="aff-${f+1}">
        ${u.ror_id?`<institution-id institution-id-type="ror">${o(u.ror_id)}</institution-id>`:""}
        <institution>${o(u.text)}</institution>
      </aff>`).join("")}

      <!-- Correspondence marker -->
      ${(()=>{const u=parseInt(t.correspondence_author,10);if(u>0&&r[u-1]){const f=r[u-1];return`
      <author-notes>
        <corresp id="cor1">*Correspondence: ${o(f.given)} ${o(f.surname)} <email>${o(f.email)}</email></corresp>
      </author-notes>`}return""})()}

      <!-- Dates -->
      ${(()=>{let u="";const f=q(s.received),R=q(s.accepted),P=q(s.published);return f&&(u+=`
      <history>
        <date date-type="received">
          <day>${f.day}</day>
          <month>${f.month}</month>
          <year>${f.year}</year>
        </date>`),R&&(f||(u+=`
      <history>`),u+=`
        <date date-type="accepted">
          <day>${R.day}</day>
          <month>${R.month}</month>
          <year>${R.year}</year>
        </date>`),(f||R)&&(u+=`
      </history>`),P?u+=`
      <pub-date pub-type="epub">
        <day>${P.day}</day>
        <month>${P.month}</month>
        <year>${P.year}</year>
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
        ${I(l.content)}
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
    ${m.map(u=>{let f=I(u.content);const R=[];u.tables&&u.tables.length&&u.tables.forEach((y,z)=>{const j=y.manualNumber||z+1;let S=`
      <table-wrap id="tbl-${u.id}-${z}">
        <label>Table ${o(j)}</label>
        <caption><p>${o(y.caption)}</p></caption>
        <table>`;y.headers&&y.headers.length&&(S+=`
          <thead>`,Array.isArray(y.headers[0])?y.headers.forEach(g=>{S+=`
            <tr>`,g.forEach(h=>{if(h.hidden)return;const _=h.align?` align="${h.align}"`:"",L=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",Y=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"";S+=`
              <th${_}${L}${Y}>${v(h)}</th>`}),S+=`
            </tr>`}):(S+=`
            <tr>`,y.headers.forEach(g=>{if(g.hidden)return;const h=g.align?` align="${g.align}"`:"",_=g.colspan&&g.colspan>1?` colspan="${g.colspan}"`:"",L=g.rowspan&&g.rowspan>1?` rowspan="${g.rowspan}"`:"";S+=`
              <th${h}${_}${L}>${v(g)}</th>`}),S+=`
            </tr>`),S+=`
          </thead>`),y.rows&&y.rows.length&&(S+=`
          <tbody>`,Array.isArray(y.rows[0])?y.rows.forEach(g=>{S+=`
            <tr>`,g.forEach((h,_)=>{if(h.hidden)return;const L=h.align?` align="${h.align}"`:"",Y=h.colspan&&h.colspan>1?` colspan="${h.colspan}"`:"",te=h.rowspan&&h.rowspan>1?` rowspan="${h.rowspan}"`:"",oe=y.headerCol&&_===0?"th":"td";S+=`
              <${oe}${L}${Y}${te}>${v(h)}</${oe}>`}),S+=`
            </tr>`}):y.rows.forEach(g=>{S+=`
            <tr>`;const h=y.headers.length;for(let _=0;_<h;_++){const L=g[`col-${_}`]!==void 0?{text:g[`col-${_}`]}:{};if(L.hidden)continue;const Y=y.headerCol&&_===0?"th":"td",te=L.colspan&&L.colspan>1?` colspan="${L.colspan}"`:"",oe=L.rowspan&&L.rowspan>1?` rowspan="${L.rowspan}"`:"";S+=`
              <${Y}${te}${oe}>${v(L)}</${Y}>`}S+=`
            </tr>`}),S+=`
          </tbody>`),S+=`
        </table>`,y.footnote&&(S+=`
        <table-wrap-foot>
          <fn id="fn-tbl-${u.id}-${z}">
            <p>${o(y.footnote)}</p>
          </fn>
        </table-wrap-foot>`),S+=`
      </table-wrap>`,R.push({num:j,xml:S,placed:!1})});const P=[];u.figures&&u.figures.length&&u.figures.forEach((y,z)=>{const j=z+1,S=y.base64Data?y.base64Data:o(y.url),g=`
      <fig id="fig-${u.id}-${z}">
        <label>Figure ${j}</label>
        <caption><p>${o(y.caption)}</p></caption>
        <graphic mimetype="image" mime-subtype="png" xlink:href="${S}" />
      </fig>`;P.push({num:j,xml:g,placed:!1})}),R.forEach(y=>{const z=String(y.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),j=new RegExp(`@\\[Table[\\s:]*${z}\\]`,"gi"),S=f.replace(j,y.xml);S!==f&&(f=S,y.placed=!0)}),P.forEach(y=>{const z=String(y.num).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),j=new RegExp(`@\\[Figure[\\s:]*${z}\\]`,"gi"),S=f.replace(j,y.xml);S!==f&&(f=S,y.placed=!0)}),f=f.replace(/<p>\s*<\/p>/g,"");let X="";return R.forEach(y=>{y.placed||(X+=y.xml)}),P.forEach(y=>{y.placed||(X+=y.xml)}),`
    <sec id="sec-${u.id}">
      <title>${o(u.title)}</title>
      ${f}
      ${X}
    </sec>`}).join("")}
  </body>

  <!-- References list -->
  ${b.length?`
  <back>
    <ref-list>
      <title>References</title>
      ${b.map((u,f)=>`
      <ref id="ref-${f+1}">
        <label>${f+1}</label>
        <mixed-citation publication-type="journal">
          ${o(u.text)}
          ${u.url?`<pub-id pub-id-type="doi">${o(String(u.url).replace(/^https?:\/\/doi\.org\//i,""))}</pub-id>`:""}
        </mixed-citation>
      </ref>`).join("")}
    </ref-list>
  </back>`:""}
</article>`.trim(),B=new DOMParser().parseFromString(D,"application/xml").getElementsByTagName("parsererror");if(B.length>0)throw console.error("XML Validation Error:",B[0].textContent),new Error("JATS XML Generation Failed: Invalid XML structure detected.");return D}function Qt(){const a=[],e=n.collectAll(),t=e.journal||{},r=e.article||{},i=e.authors||[],s=e.dates||{},l=e.abstract||{},d=e.keywords||[];return t.title?a.push({status:"pass",message:"Journal Title is set."}):a.push({status:"fail",message:"Journal Title is required."}),!t.issn_print&&!t.issn_online?a.push({status:"warn",message:"Both Print and Online ISSNs are missing."}):a.push({status:"pass",message:"At least one ISSN is set."}),r.title?a.push({status:"pass",message:"Article Title is set."}):a.push({status:"fail",message:"Article Title is required."}),r.doi?/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(r.doi)?a.push({status:"pass",message:"Article DOI is set and format is valid."}):a.push({status:"warn",message:"Article DOI format looks invalid (expected 10.xxxx/yyyy)."}):a.push({status:"fail",message:"Article DOI is required."}),r.article_id?a.push({status:"pass",message:"Article ID is set."}):a.push({status:"fail",message:"Article ID (for file exports) is required."}),i.length?(a.push({status:"pass",message:`Found ${i.length} author(s).`}),i.forEach((c,m)=>{c.orcid&&(/^\d{4}-\d{4}-\d{4}-[\dX]{4}$/i.test(c.orcid)?a.push({status:"pass",message:`Author ${m+1} has a valid ORCID ID.`}):a.push({status:"warn",message:`Author ${m+1} (${c.given||""} ${c.surname||""}) has an invalid ORCID ID format (expected XXXX-XXXX-XXXX-XXXX).`})),c.email||a.push({status:"warn",message:`Author ${m+1} is missing an email address.`})})):a.push({status:"fail",message:"At least one Author is required."}),s.published?a.push({status:"pass",message:"Publication Date is set."}):a.push({status:"warn",message:"Publication Date is missing."}),!l.content||l.content.trim()===""||l.content==="<p><br></p>"?a.push({status:"fail",message:"Article Abstract is required."}):a.push({status:"pass",message:"Abstract content is set."}),d.length?a.push({status:"pass",message:`Found ${d.length} keyword(s).`}):a.push({status:"warn",message:"At least one keyword should be added."}),a}function ea(a){const e=[];if(!a)return[{status:"fail",message:"XML string is empty."}];a.includes("&nbsp;")?e.push({status:"fail",message:"XML contains raw &nbsp; entities, which will trigger parse errors. Replace with regular spaces."}):e.push({status:"pass",message:"No unescaped HTML-only entities (&nbsp;) detected."});try{const r=new DOMParser().parseFromString(a,"text/xml"),i=r.querySelector("parsererror");if(i)return e.push({status:"fail",message:`XML Parser Error: ${i.textContent}`}),e;e.push({status:"pass",message:"XML is well-formed and parses successfully."});const s=r.querySelector("front"),l=r.querySelector("body");s||e.push({status:"fail",message:"JATS XML is missing <front> tag."}),l||e.push({status:"warn",message:"JATS XML is missing <body> tag."}),r.querySelector('article-meta > article-id[pub-id-type="doi"]')?e.push({status:"pass",message:"JATS XML contains article DOI."}):e.push({status:"fail",message:"Missing DOI article-id tag in article-meta."}),r.querySelector("title-group > article-title")||e.push({status:"fail",message:"Missing <article-title> in JATS XML."}),r.querySelectorAll('contrib-group > contrib[contrib-type="author"]').length===0&&e.push({status:"fail",message:"Missing contributor/author entries in JATS XML."})}catch(t){e.push({status:"fail",message:`Critical error during XML parsing: ${t.message}`})}return e}function ta(a){const e=[];if(!a)return[{status:"fail",message:"HTML string is empty."}];try{const r=new DOMParser().parseFromString(a,"text/html");r.querySelector('meta[name="citation_title"]')?e.push({status:"pass",message:"Has citation_title meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_title meta tag."});const s=r.querySelectorAll('meta[name="citation_author"]');s.length===0?e.push({status:"fail",message:"Missing Google Scholar citation_author meta tags."}):e.push({status:"pass",message:`Found ${s.length} citation_author meta tag(s).`}),r.querySelector('meta[name="citation_doi"]')?e.push({status:"pass",message:"Has citation_doi meta tag."}):e.push({status:"fail",message:"Missing Google Scholar citation_doi meta tag."}),r.querySelector('meta[name="citation_pdf_url"]')?e.push({status:"pass",message:"Has citation_pdf_url meta tag."}):e.push({status:"warn",message:"Missing Google Scholar citation_pdf_url meta tag."}),r.querySelector('link[rel="canonical"]')?e.push({status:"pass",message:"Has canonical URL link."}):e.push({status:"fail",message:"Missing Canonical URL link tag."});const m=r.querySelector('meta[property="og:title"]'),b=r.querySelector('meta[property="og:description"]');!m||!b?e.push({status:"warn",message:"Missing Open Graph meta tags (og:title, og:description)."}):e.push({status:"pass",message:"Has Open Graph metadata."});const o=r.querySelector('script[type="application/ld+json"]');if(!o)e.push({status:"fail",message:"Missing Schema.org JSON-LD structured data block."});else try{JSON.parse(o.textContent)["@type"]!=="ScholarlyArticle"?e.push({status:"warn",message:"Schema.org @type is not set to ScholarlyArticle."}):e.push({status:"pass",message:"Has valid Schema.org JSON-LD scholarly article markup."})}catch(v){e.push({status:"fail",message:`Schema.org JSON-LD script contains invalid JSON: ${v.message}`})}const w=r.querySelector("title");(!w||!w.textContent.trim())&&e.push({status:"fail",message:"HTML document title is empty or missing."}),r.querySelector("h1")||e.push({status:"warn",message:"Missing article title header (h1)."})}catch(t){e.push({status:"fail",message:`Critical error during HTML validation: ${t.message}`})}return e}let A=null,de="",ue="",_e=null;function aa(a){A=a,Ie(),n.on("change",ra),n.on("load",()=>{Ie(),Ae()}),n.on("reset",()=>{Ie(),ia()})}function Ie(){A&&(A.innerHTML=`
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
  `,A.querySelector("#btn-generate-all").addEventListener("click",()=>{Ae(),E("Outputs generated")}),A.querySelector("#btn-download-html").addEventListener("click",oa),A.querySelector("#btn-download-xml").addEventListener("click",na),A.querySelector("#btn-validate").addEventListener("click",sa),A.querySelector("#btn-copy-html").addEventListener("click",()=>{Ge(de,"HTML source copied to clipboard")}),A.querySelector("#btn-copy-xml").addEventListener("click",()=>{Ge(ue,"JATS XML source copied to clipboard")}),A.querySelector("#btn-fullscreen-html").addEventListener("click",()=>{const a=A.querySelector("#html-preview-frame");a&&a.requestFullscreen&&a.requestFullscreen()}))}function ra(){var e;(e=A==null?void 0:A.querySelector("#chk-live-preview"))!=null&&e.checked&&(_e&&clearTimeout(_e),_e=setTimeout(()=>{Ae(!0)},500))}function Ae(a=!1){if(A)try{de=Kt(),ue=Zt(),A.querySelector("#btn-download-html").disabled=!1,A.querySelector("#btn-download-xml").disabled=!1,A.querySelector("#btn-copy-html").disabled=!1,A.querySelector("#btn-copy-xml").disabled=!1,A.querySelector("#btn-fullscreen-html").disabled=!1;const e=A.querySelector("#html-preview-frame");if(e){const r=e.contentDocument||e.contentWindow.document;r.open(),r.write(de),r.close()}const t=A.querySelector("#xml-preview-code");t&&(t.innerHTML=mt(ue))}catch(e){a||E("Error generating outputs: "+e.message,"error"),console.error(e)}}function ia(){if(!A)return;A.querySelector("#btn-download-html").disabled=!0,A.querySelector("#btn-download-xml").disabled=!0,A.querySelector("#btn-copy-html").disabled=!0,A.querySelector("#btn-copy-xml").disabled=!0;const a=A.querySelector("#html-preview-frame");if(a){const t=a.contentDocument||a.contentWindow.document;t.open(),t.write('<html><body><div style="font-family:sans-serif; color:#7f8c8d; text-align:center; margin-top:100px;">Click Generate to preview</div></body></html>'),t.close()}const e=A.querySelector("#xml-preview-code");e&&(e.innerHTML=""),A.querySelector("#validation-panel").style.display="none"}function sa(){if(!A)return;(!de||!ue)&&Ae(!0);const a=A.querySelector("#validation-panel"),e=A.querySelector("#validation-list");a.style.display="block";const t=Qt(),r=ea(ue),i=ta(de),s=[...t.map(c=>({...c,category:"Metadata"})),...r.map(c=>({...c,category:"JATS XML"})),...i.map(c=>({...c,category:"HTML Galley"}))];let l="";s.forEach(c=>{let m="✅",b="#2ecc71",o="#e8f8f5";c.status==="fail"?(m="❌",b="#e74c3c",o="#fdebd0"):c.status==="warn"&&(m="⚠️",b="#f39c12",o="#fef9e7"),l+=`
      <div style="display:flex; align-items:center; gap:0.5rem; padding:0.4rem 0.8rem; border-radius:6px; background:${o}; color:#333; margin-bottom:0.2rem; border-left:4px solid ${b};">
        <span style="font-size:1.1rem;">${m}</span>
        <span style="font-weight:600; font-size:0.8rem; color:${b}; min-width:80px; text-transform:uppercase;">[${c.category}]</span>
        <span style="font-size:0.85rem;">${re(c.message)}</span>
      </div>
    `}),e.innerHTML=l,s.some(c=>c.status==="fail")?E("Validation failed with errors. Check details below.","error"):E("Validation passed with success or warnings.","success")}function oa(){const e=`${n.get("article.article_id")||"galley"}.html`,t=new Blob([de],{type:"text/html;charset=utf-8"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r),E(`HTML downloaded as ${e}`)}function na(){const e=`${n.get("article.article_id")||"galley"}.xml`,t=new Blob([ue],{type:"text/xml;charset=utf-8"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r),E(`JATS XML downloaded as ${e}`)}function Ge(a,e){navigator.clipboard.writeText(a).then(()=>{E(e)}).catch(t=>{console.error("Failed to copy to clipboard:",t),E("Failed to copy to clipboard","error")})}function E(a,e="success"){const t=document.getElementById("toast-container");if(!t)return;const r=document.createElement("div");r.className=`toast toast-${e}`,r.style.padding="0.75rem 1.25rem",r.style.borderRadius="8px",r.style.fontSize="0.9rem",r.style.color="white",r.style.animation="slideIn 0.3s ease-out",r.style.boxShadow="0 4px 6px rgba(0,0,0,0.1)";let i="#10b981";e==="error"?i="#ef4444":e==="warning"?i="#f59e0b":e==="info"&&(i="#022744"),r.style.background=i,r.textContent=a,t.appendChild(r),setTimeout(()=>{r.style.animation="slideOut 0.3s ease-in forwards",r.addEventListener("animationend",()=>r.remove())},1e3)}function We(){la(),ca(),da(),lt(document.getElementById("panel-journal-profile")),yt(document.getElementById("panel-metadata")),qt(document.getElementById("panel-import")),Mt(document.getElementById("panel-body")),Ut(document.getElementById("panel-references")),aa(document.getElementById("panel-generate")),E("GalleyForge initialized successfully","info")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",We):We();function la(){const a=document.documentElement,e=localStorage.getItem("galley-theme")||"dark-gray";a.setAttribute("data-theme",e),et(e),document.getElementById("theme-toggle-light").addEventListener("click",()=>{Ve("light")}),document.getElementById("theme-toggle-dark").addEventListener("click",()=>{Ve("dark-gray")})}function Ve(a){document.documentElement.setAttribute("data-theme",a),localStorage.setItem("galley-theme",a),et(a),E(`Switched to ${a==="light"?"Light":"Dark Gray"} theme`,"info")}function et(a){const e=document.getElementById("theme-toggle-light"),t=document.getElementById("theme-toggle-dark");a==="light"?(e.classList.add("active"),t.classList.remove("active")):(e.classList.remove("active"),t.classList.add("active"))}function ca(){const a=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".tab-panel");a.forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.tab;a.forEach(i=>i.classList.remove("active")),t.classList.add("active"),e.forEach(i=>{i.id===r?(i.classList.add("active"),i.style.display="block"):(i.classList.remove("active"),i.style.display="none")})})}),e.forEach(t=>{t.id==="panel-metadata"?(t.classList.add("active"),t.style.display="block"):t.style.display="none"})}function da(){const a=document.getElementById("btn-save-project"),e=document.getElementById("btn-load-project"),t=document.getElementById("file-load-project");a.addEventListener("click",()=>{const r="data:text/json;charset=utf-8,"+encodeURIComponent(n.toJSON()),i=document.createElement("a");i.setAttribute("href",r);const s=n.get("article.article_id")||"project";i.setAttribute("download",`${s}-galleyforge.json`),document.body.appendChild(i),i.click(),i.remove(),E("Project saved successfully")}),e.addEventListener("click",()=>t.click()),t.addEventListener("change",r=>{const i=r.target.files[0];if(!i)return;const s=new FileReader;s.onload=function(l){try{n.fromJSON(l.target.result),E("Project loaded successfully")}catch(d){E("Failed to load project: "+d.message,"error")}},s.readAsText(i),r.target.value=""})}
