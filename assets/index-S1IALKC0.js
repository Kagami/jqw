var x=Object.defineProperty;var S=(i,e,n)=>e in i?x(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n;var g=(i,e,n)=>(S(i,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();var f=function(i,e){return Object.defineProperty?Object.defineProperty(i,"raw",{value:e}):i.raw=e,i},l;(function(i){i[i.EOS=0]="EOS",i[i.Text=1]="Text",i[i.Incomplete=2]="Incomplete",i[i.ESC=3]="ESC",i[i.Unknown=4]="Unknown",i[i.SGR=5]="SGR",i[i.OSCURL=6]="OSCURL"})(l||(l={}));class I{constructor(){this.VERSION="6.0.2",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_allowlist={http:1,https:1},this._escape_html=!0,this.boldStyle="font-weight:bold",this.faintStyle="opacity:0.7",this.italicStyle="font-style:italic",this.underlineStyle="text-decoration:underline"}set use_classes(e){this._use_classes=e}get use_classes(){return this._use_classes}set url_allowlist(e){this._url_allowlist=e}get url_allowlist(){return this._url_allowlist}set escape_html(e){this._escape_html=e}get escape_html(){return this._escape_html}set boldStyle(e){this._boldStyle=e}get boldStyle(){return this._boldStyle}set faintStyle(e){this._faintStyle=e}get faintStyle(){return this._faintStyle}set italicStyle(e){this._italicStyle=e}get italicStyle(){return this._italicStyle}set underlineStyle(e){this._underlineStyle=e}get underlineStyle(){return this._underlineStyle}setup_palettes(){this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(s=>{s.forEach(t=>{this.palette_256.push(t)})});let e=[0,95,135,175,215,255];for(let s=0;s<6;++s)for(let t=0;t<6;++t)for(let r=0;r<6;++r){let a={rgb:[e[s],e[t],e[r]],class_name:"truecolor"};this.palette_256.push(a)}let n=8;for(let s=0;s<24;++s,n+=10){let t={rgb:[n,n,n],class_name:"truecolor"};this.palette_256.push(t)}}escape_txt_for_html(e){return this._escape_html?e.replace(/[&<>"']/gm,n=>{if(n==="&")return"&amp;";if(n==="<")return"&lt;";if(n===">")return"&gt;";if(n==='"')return"&quot;";if(n==="'")return"&#x27;"}):e}append_buffer(e){var n=this._buffer+e;this._buffer=n}get_next_packet(){var e={kind:l.EOS,text:"",url:""},n=this._buffer.length;if(n==0)return e;var s=this._buffer.indexOf("\x1B");if(s==-1)return e.kind=l.Text,e.text=this._buffer,this._buffer="",e;if(s>0)return e.kind=l.Text,e.text=this._buffer.slice(0,s),this._buffer=this._buffer.slice(s),e;if(s==0){if(n<3)return e.kind=l.Incomplete,e;var t=this._buffer.charAt(1);if(t!="["&&t!="]"&&t!="(")return e.kind=l.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(t=="["){this._csi_regex||(this._csi_regex=_(w||(w=f([`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \x1B[                      # CSI
                          ([<-?]?)              # private-mode char
                          ([d;]*)                    # any digits or semicolons
                          ([ -/]?               # an intermediate modifier
                          [@-~])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \x1B[                      # CSI
                          [ -~]*                # anything legal
                          ([\0-:])              # anything illegal
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \\x1b\\[                      # CSI
                          ([\\x3c-\\x3f]?)              # private-mode char
                          ([\\d;]*)                    # any digits or semicolons
                          ([\\x20-\\x2f]?               # an intermediate modifier
                          [\\x40-\\x7e])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \\x1b\\[                      # CSI
                          [\\x20-\\x7e]*                # anything legal
                          ([\\x00-\\x1f:])              # anything illegal
                        )
                    `]))));let a=this._buffer.match(this._csi_regex);if(a===null)return e.kind=l.Incomplete,e;if(a[4])return e.kind=l.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;a[1]!=""||a[3]!="m"?e.kind=l.Unknown:e.kind=l.SGR,e.text=a[2];var r=a[0].length;return this._buffer=this._buffer.slice(r),e}else if(t=="]"){if(n<4)return e.kind=l.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=l.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=T(v||(v=f([`
                        (?:                         # legal sequence
                          (\x1B\\)                    # ESC                           |                           # alternate
                          (\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\0-]                 # anything illegal
                          |                           # alternate
                          [\b-]                 # anything illegal
                          |                           # alternate
                          [-]                 # anything illegal
                        )
                    `],[`
                        (?:                         # legal sequence
                          (\\x1b\\\\)                    # ESC \\
                          |                           # alternate
                          (\\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\\x00-\\x06]                 # anything illegal
                          |                           # alternate
                          [\\x08-\\x1a]                 # anything illegal
                          |                           # alternate
                          [\\x1c-\\x1f]                 # anything illegal
                        )
                    `])))),this._osc_st.lastIndex=0;{let o=this._osc_st.exec(this._buffer);if(o===null)return e.kind=l.Incomplete,e;if(o[3])return e.kind=l.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{let o=this._osc_st.exec(this._buffer);if(o===null)return e.kind=l.Incomplete,e;if(o[3])return e.kind=l.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=_(y||(y=f([`
                        ^                           # beginning of line
                                                    #
                        \x1B]8;                    # OSC Hyperlink
                        [ -:<-~]*       # params (excluding ;)
                        ;                           # end of params
                        ([!-~]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                        ([ -~]+)              # TEXT capture
                        \x1B]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                        \\x1b\\]8;                    # OSC Hyperlink
                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)
                        ;                           # end of params
                        ([\\x21-\\x7e]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                        ([\\x20-\\x7e]+)              # TEXT capture
                        \\x1b\\]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                    `]))));let a=this._buffer.match(this._osc_regex);if(a===null)return e.kind=l.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=l.OSCURL,e.url=a[1],e.text=a[2];var r=a[0].length;return this._buffer=this._buffer.slice(r),e}else if(t=="(")return e.kind=l.Unknown,this._buffer=this._buffer.slice(3),e}}ansi_to_html(e){this.append_buffer(e);for(var n=[];;){var s=this.get_next_packet();if(s.kind==l.EOS||s.kind==l.Incomplete)break;s.kind==l.ESC||s.kind==l.Unknown||(s.kind==l.Text?n.push(this.transform_to_html(this.with_state(s))):s.kind==l.SGR?this.process_ansi(s):s.kind==l.OSCURL&&n.push(this.process_hyperlink(s)))}return n.join("")}with_state(e){return{bold:this.bold,faint:this.faint,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}}process_ansi(e){let n=e.text.split(";");for(;n.length>0;){let s=n.shift(),t=parseInt(s,10);if(isNaN(t)||t===0)this.fg=null,this.bg=null,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1;else if(t===1)this.bold=!0;else if(t===2)this.faint=!0;else if(t===3)this.italic=!0;else if(t===4)this.underline=!0;else if(t===21)this.bold=!1;else if(t===22)this.faint=!1,this.bold=!1;else if(t===23)this.italic=!1;else if(t===24)this.underline=!1;else if(t===39)this.fg=null;else if(t===49)this.bg=null;else if(t>=30&&t<38)this.fg=this.ansi_colors[0][t-30];else if(t>=40&&t<48)this.bg=this.ansi_colors[0][t-40];else if(t>=90&&t<98)this.fg=this.ansi_colors[1][t-90];else if(t>=100&&t<108)this.bg=this.ansi_colors[1][t-100];else if((t===38||t===48)&&n.length>0){let r=t===38,a=n.shift();if(a==="5"&&n.length>0){let u=parseInt(n.shift(),10);u>=0&&u<=255&&(r?this.fg=this.palette_256[u]:this.bg=this.palette_256[u])}if(a==="2"&&n.length>2){let u=parseInt(n.shift(),10),o=parseInt(n.shift(),10),m=parseInt(n.shift(),10);if(u>=0&&u<=255&&o>=0&&o<=255&&m>=0&&m<=255){let p={rgb:[u,o,m],class_name:"truecolor"};r?this.fg=p:this.bg=p}}}}}transform_to_html(e){let n=e.text;if(n.length===0||(n=this.escape_txt_for_html(n),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return n;let s=[],t=[],r=e.fg,a=e.bg;e.bold&&s.push(this._boldStyle),e.faint&&s.push(this._faintStyle),e.italic&&s.push(this._italicStyle),e.underline&&s.push(this._underlineStyle),this._use_classes?(r&&(r.class_name!=="truecolor"?t.push(`${r.class_name}-fg`):s.push(`color:rgb(${r.rgb.join(",")})`)),a&&(a.class_name!=="truecolor"?t.push(`${a.class_name}-bg`):s.push(`background-color:rgb(${a.rgb.join(",")})`))):(r&&s.push(`color:rgb(${r.rgb.join(",")})`),a&&s.push(`background-color:rgb(${a.rgb})`));let u="",o="";return t.length&&(u=` class="${t.join(" ")}"`),s.length&&(o=` style="${s.join(";")}"`),`<span${o}${u}>${n}</span>`}process_hyperlink(e){let n=e.url.split(":");return n.length<1||!this._url_allowlist[n[0]]?"":`<a href="${this.escape_txt_for_html(e.url)}">${this.escape_txt_for_html(e.text)}</a>`}}function _(i,...e){let n=i.raw[0],s=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,t=n.replace(s,"");return new RegExp(t)}function T(i,...e){let n=i.raw[0],s=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,t=n.replace(s,"");return new RegExp(t,"g")}var w,v,y;const k={moduleUrl:"/static/jq.js",wasmUrl:"/static/jq.wasm"};class M{constructor(e){g(this,"worker");g(this,"running",!1);this.worker=e}writeFile(e,n){return new Promise((s,t)=>{if(this.running)throw Error("already running");this.running=!0,this.worker.onmessage=r=>{this.worker.onmessage=null,this.running=!1;const a=r.data;a.type==="set"?s():t(Error(a.data))},this.worker.postMessage({type:"set",path:e,data:n})})}run(...e){return this.writeRun("",e,"")}async writeRun(e,n,s="data.json"){return new Promise((t,r)=>{if(this.running)throw Error("already running");this.running=!0,this.worker.onmessage=a=>{this.worker.onmessage=null,this.running=!1;const u=a.data;u.type==="done"?t(u.data):r(Error(u.data))},this.worker.postMessage({type:"run",path:s,data:e,args:n})})}}function C(i={}){return i=Object.assign({},k,i),new Promise((e,n)=>{const s=new Worker(i.moduleUrl);s.onerror=t=>{n(t)},s.onmessage=t=>{s.onmessage=null,t.data.type==="ready"?e(new M(s)):n(Error("internal error"))},s.postMessage({type:"load",url:i.wasmUrl,path:i.path,data:i.path&&new TextEncoder().encode(i.data)})})}const N="/jqw/assets/jq-Z8zgjhvT.js",O="/jqw/assets/jq-EPDDPWIX.wasm",B=`[
  {
    "sha": "88f01a741c8d63c4d1b5bc3ef61520c6eb93edaa",
    "node_id": "C_kwDOAE3WVdoAKDg4ZjAxYTc0MWM4ZDYzYzRkMWI1YmMzZWY2MTUyMGM2ZWI5M2VkYWE",
    "commit": {
      "author": {
        "name": "Andreas Heiduk",
        "email": "asheiduk@users.noreply.github.com",
        "date": "2023-11-16T20:14:58Z"
      },
      "committer": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "date": "2023-11-16T20:14:58Z"
      },
      "message": "simplify paths/0 and paths/1\\n\\n\`recurse/0\` already handles traversing objects and arrays, so it is more\\r\\nconsistent to use that.\\r\\nFor \`paths/1\` it is easier to use the actual value returned by\\r\\n\`recurse\` instead of querying that value with \`getpath/1\` afterwards.",
      "tree": {
        "sha": "046e21333f46c5b5369366c7e1367baa3f5e4096",
        "url": "https://api.github.com/repos/jqlang/jq/git/trees/046e21333f46c5b5369366c7e1367baa3f5e4096"
      },
      "url": "https://api.github.com/repos/jqlang/jq/git/commits/88f01a741c8d63c4d1b5bc3ef61520c6eb93edaa",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\\n\\nwsBcBAABCAAQBQJlVnhCCRBK7hj4Ov3rIwAAITcIABGM8MR1W3l+jfGalXyClr1b\\nyPw1CnT6b8cbhCUiWf2D341AFuvkKCXbdavZ0EBI7Elnpucp6PVIIzVns5FoGeDE\\n9nm60VECnOwoe6+ppxnjK0/0ohm+rR7MBcRA4OQ/qIJgZj30bYpJrMfS3jBOMJum\\neKm0OlN917lGODb1zpCQgV/+NcgoiCQCJSvPRDiMco+xiVqOzZq05/gZq+ASq8+p\\neA+8XXq88PnrBpyQmj/n5CSTWpMChoYP9Krfy3OaUiR42CVZXnDmF5cRMWUjoc5L\\njGxOXJIxjFnstI+Uf8bjT1iZzqNf6KGTuqcmsqLsLC1OqHziNiCn2hwIKIHXVKI=\\n=1cR+\\n-----END PGP SIGNATURE-----\\n",
        "payload": "tree 046e21333f46c5b5369366c7e1367baa3f5e4096\\nparent 6c035133e876c1ce5cbafe53164d0dc513c4e766\\nauthor Andreas Heiduk <asheiduk@users.noreply.github.com> 1700165698 +0100\\ncommitter GitHub <noreply@github.com> 1700165698 +0100\\n\\nsimplify paths/0 and paths/1\\n\\n\`recurse/0\` already handles traversing objects and arrays, so it is more\\r\\nconsistent to use that.\\r\\nFor \`paths/1\` it is easier to use the actual value returned by\\r\\n\`recurse\` instead of querying that value with \`getpath/1\` afterwards."
      }
    },
    "url": "https://api.github.com/repos/jqlang/jq/commits/88f01a741c8d63c4d1b5bc3ef61520c6eb93edaa",
    "html_url": "https://github.com/jqlang/jq/commit/88f01a741c8d63c4d1b5bc3ef61520c6eb93edaa",
    "comments_url": "https://api.github.com/repos/jqlang/jq/commits/88f01a741c8d63c4d1b5bc3ef61520c6eb93edaa/comments",
    "author": {
      "login": "asheiduk",
      "id": 9371344,
      "node_id": "MDQ6VXNlcjkzNzEzNDQ=",
      "avatar_url": "https://avatars.githubusercontent.com/u/9371344?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/asheiduk",
      "html_url": "https://github.com/asheiduk",
      "followers_url": "https://api.github.com/users/asheiduk/followers",
      "following_url": "https://api.github.com/users/asheiduk/following{/other_user}",
      "gists_url": "https://api.github.com/users/asheiduk/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/asheiduk/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/asheiduk/subscriptions",
      "organizations_url": "https://api.github.com/users/asheiduk/orgs",
      "repos_url": "https://api.github.com/users/asheiduk/repos",
      "events_url": "https://api.github.com/users/asheiduk/events{/privacy}",
      "received_events_url": "https://api.github.com/users/asheiduk/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "web-flow",
      "id": 19864447,
      "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
      "avatar_url": "https://avatars.githubusercontent.com/u/19864447?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/web-flow",
      "html_url": "https://github.com/web-flow",
      "followers_url": "https://api.github.com/users/web-flow/followers",
      "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
      "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
      "organizations_url": "https://api.github.com/users/web-flow/orgs",
      "repos_url": "https://api.github.com/users/web-flow/repos",
      "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
      "received_events_url": "https://api.github.com/users/web-flow/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "6c035133e876c1ce5cbafe53164d0dc513c4e766",
        "url": "https://api.github.com/repos/jqlang/jq/commits/6c035133e876c1ce5cbafe53164d0dc513c4e766",
        "html_url": "https://github.com/jqlang/jq/commit/6c035133e876c1ce5cbafe53164d0dc513c4e766"
      }
    ]
  },
  {
    "sha": "6c035133e876c1ce5cbafe53164d0dc513c4e766",
    "node_id": "C_kwDOAE3WVdoAKDZjMDM1MTMzZTg3NmMxY2U1Y2JhZmU1MzE2NGQwZGM1MTNjNGU3NjY",
    "commit": {
      "author": {
        "name": "Emanuele Torre",
        "email": "torreemanuele6@gmail.com",
        "date": "2023-11-06T14:59:22Z"
      },
      "committer": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "date": "2023-11-06T14:59:22Z"
      },
      "message": "README.md: to\`sed\` => to \`sed\` (#2944)",
      "tree": {
        "sha": "82294bdd33a6c93af93ad59f003ea2c5669b3de6",
        "url": "https://api.github.com/repos/jqlang/jq/git/trees/82294bdd33a6c93af93ad59f003ea2c5669b3de6"
      },
      "url": "https://api.github.com/repos/jqlang/jq/git/commits/6c035133e876c1ce5cbafe53164d0dc513c4e766",
      "comment_count": 0,
      "verification": {
        "verified": true,
        "reason": "valid",
        "signature": "-----BEGIN PGP SIGNATURE-----\\n\\nwsBcBAABCAAQBQJlSP9KCRBK7hj4Ov3rIwAAsh4IABmnN/pVvfMda5jSj7qkwomQ\\n8ZSLs5YzI96sZTfDICpS+/PG4tPvVFDNVwVkFt1PqXG3jNAzu94Dvuzes/0yJ9C2\\nFvC9aGF9p8cub8EJkOVm7m/EzD8NkSGHWBDntc2wUtQwbaFS/+GuCtlTw8G1qZXM\\n1lE18LdeQdMni5OVUly5wBmWmiM5EZaaAn54hm6u1WvCSKcZw8hcTdmThAqq2gHh\\njjpm/YHPTZF0M4ifIzSSelZeZGw7Lqyv6vzd475oqascae8LqFetSvfRf9/5b6g2\\ntcNvj00jsebEtL+7yn/Gt0ngCcJMmwfeCSgYUIa2dn0pRhqcIsUEE5pCIHLKFqg=\\n=IHa9\\n-----END PGP SIGNATURE-----\\n",
        "payload": "tree 82294bdd33a6c93af93ad59f003ea2c5669b3de6\\nparent cca1f7d18f2fa6721952645821ae429a0166d7e4\\nauthor Emanuele Torre <torreemanuele6@gmail.com> 1699282762 +0100\\ncommitter GitHub <noreply@github.com> 1699282762 +0900\\n\\nREADME.md: to\`sed\` => to \`sed\` (#2944)\\n\\n"
      }
    },
    "url": "https://api.github.com/repos/jqlang/jq/commits/6c035133e876c1ce5cbafe53164d0dc513c4e766",
    "html_url": "https://github.com/jqlang/jq/commit/6c035133e876c1ce5cbafe53164d0dc513c4e766",
    "comments_url": "https://api.github.com/repos/jqlang/jq/commits/6c035133e876c1ce5cbafe53164d0dc513c4e766/comments",
    "author": {
      "login": "emanuele6",
      "id": 20175435,
      "node_id": "MDQ6VXNlcjIwMTc1NDM1",
      "avatar_url": "https://avatars.githubusercontent.com/u/20175435?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/emanuele6",
      "html_url": "https://github.com/emanuele6",
      "followers_url": "https://api.github.com/users/emanuele6/followers",
      "following_url": "https://api.github.com/users/emanuele6/following{/other_user}",
      "gists_url": "https://api.github.com/users/emanuele6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/emanuele6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/emanuele6/subscriptions",
      "organizations_url": "https://api.github.com/users/emanuele6/orgs",
      "repos_url": "https://api.github.com/users/emanuele6/repos",
      "events_url": "https://api.github.com/users/emanuele6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/emanuele6/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "web-flow",
      "id": 19864447,
      "node_id": "MDQ6VXNlcjE5ODY0NDQ3",
      "avatar_url": "https://avatars.githubusercontent.com/u/19864447?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/web-flow",
      "html_url": "https://github.com/web-flow",
      "followers_url": "https://api.github.com/users/web-flow/followers",
      "following_url": "https://api.github.com/users/web-flow/following{/other_user}",
      "gists_url": "https://api.github.com/users/web-flow/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/web-flow/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/web-flow/subscriptions",
      "organizations_url": "https://api.github.com/users/web-flow/orgs",
      "repos_url": "https://api.github.com/users/web-flow/repos",
      "events_url": "https://api.github.com/users/web-flow/events{/privacy}",
      "received_events_url": "https://api.github.com/users/web-flow/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "cca1f7d18f2fa6721952645821ae429a0166d7e4",
        "url": "https://api.github.com/repos/jqlang/jq/commits/cca1f7d18f2fa6721952645821ae429a0166d7e4",
        "html_url": "https://github.com/jqlang/jq/commit/cca1f7d18f2fa6721952645821ae429a0166d7e4"
      }
    ]
  },
  {
    "sha": "cca1f7d18f2fa6721952645821ae429a0166d7e4",
    "node_id": "C_kwDOAE3WVdoAKGNjYTFmN2QxOGYyZmE2NzIxOTUyNjQ1ODIxYWU0MjlhMDE2NmQ3ZTQ",
    "commit": {
      "author": {
        "name": "Emanuele Torre",
        "email": "torreemanuele6@gmail.com",
        "date": "2023-11-03T18:53:33Z"
      },
      "committer": {
        "name": "Nico Williams",
        "email": "nico@cryptonector.com",
        "date": "2023-11-03T20:52:02Z"
      },
      "message": "Comment bug fixes, and fully support Tcl-style multiline comments\\n\\n* bugfix: comments were incorrectly being terminated by CR; for example\\n    jq -n $'1 #foo\\\\r'\\n  fails to compile because the CR character terminates the comment, and\\n  CR is not a valid character in jq syntax.\\n\\n* improvement: comments fully support Tcl-style line continuation.\\n  Previously this was only \\"supported\\" in \`-f' scripts, whose first line\\n  starts with \\"#!\\", and second line starts with # and ends with \\\\, only\\n  for the comment on the second line, only for one extra line.\\n\\n* man: document comment syntax, which was previously undocumented.\\n\\n* tests: add regression tests for the bugfix, and some tests for line\\n  continuation in comments.",
      "tree": {
        "sha": "85b685c0aaba0eeacdecda274cb76b617350713e",
        "url": "https://api.github.com/repos/jqlang/jq/git/trees/85b685c0aaba0eeacdecda274cb76b617350713e"
      },
      "url": "https://api.github.com/repos/jqlang/jq/git/commits/cca1f7d18f2fa6721952645821ae429a0166d7e4",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/jqlang/jq/commits/cca1f7d18f2fa6721952645821ae429a0166d7e4",
    "html_url": "https://github.com/jqlang/jq/commit/cca1f7d18f2fa6721952645821ae429a0166d7e4",
    "comments_url": "https://api.github.com/repos/jqlang/jq/commits/cca1f7d18f2fa6721952645821ae429a0166d7e4/comments",
    "author": {
      "login": "emanuele6",
      "id": 20175435,
      "node_id": "MDQ6VXNlcjIwMTc1NDM1",
      "avatar_url": "https://avatars.githubusercontent.com/u/20175435?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/emanuele6",
      "html_url": "https://github.com/emanuele6",
      "followers_url": "https://api.github.com/users/emanuele6/followers",
      "following_url": "https://api.github.com/users/emanuele6/following{/other_user}",
      "gists_url": "https://api.github.com/users/emanuele6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/emanuele6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/emanuele6/subscriptions",
      "organizations_url": "https://api.github.com/users/emanuele6/orgs",
      "repos_url": "https://api.github.com/users/emanuele6/repos",
      "events_url": "https://api.github.com/users/emanuele6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/emanuele6/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "nicowilliams",
      "id": 604851,
      "node_id": "MDQ6VXNlcjYwNDg1MQ==",
      "avatar_url": "https://avatars.githubusercontent.com/u/604851?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/nicowilliams",
      "html_url": "https://github.com/nicowilliams",
      "followers_url": "https://api.github.com/users/nicowilliams/followers",
      "following_url": "https://api.github.com/users/nicowilliams/following{/other_user}",
      "gists_url": "https://api.github.com/users/nicowilliams/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/nicowilliams/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/nicowilliams/subscriptions",
      "organizations_url": "https://api.github.com/users/nicowilliams/orgs",
      "repos_url": "https://api.github.com/users/nicowilliams/repos",
      "events_url": "https://api.github.com/users/nicowilliams/events{/privacy}",
      "received_events_url": "https://api.github.com/users/nicowilliams/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "f4929f3c19fc8486aac66ab0378fb3995adb3b6d",
        "url": "https://api.github.com/repos/jqlang/jq/commits/f4929f3c19fc8486aac66ab0378fb3995adb3b6d",
        "html_url": "https://github.com/jqlang/jq/commit/f4929f3c19fc8486aac66ab0378fb3995adb3b6d"
      }
    ]
  },
  {
    "sha": "f4929f3c19fc8486aac66ab0378fb3995adb3b6d",
    "node_id": "C_kwDOAE3WVdoAKGY0OTI5ZjNjMTlmYzg0ODZhYWM2NmFiMDM3OGZiMzk5NWFkYjNiNmQ",
    "commit": {
      "author": {
        "name": "Emanuele Torre",
        "email": "torreemanuele6@gmail.com",
        "date": "2023-10-29T03:30:01Z"
      },
      "committer": {
        "name": "Nico Williams",
        "email": "nico@cryptonector.com",
        "date": "2023-10-31T03:12:27Z"
      },
      "message": "src/builtin.c: remove unnecessary jv_copy-s in type_error/type_error2\\n\\nAlso fix doubled semicolon   jv ret;;   =>   jv ret;",
      "tree": {
        "sha": "66d46a409ce53928c7b86d6d775f3462c4d3e500",
        "url": "https://api.github.com/repos/jqlang/jq/git/trees/66d46a409ce53928c7b86d6d775f3462c4d3e500"
      },
      "url": "https://api.github.com/repos/jqlang/jq/git/commits/f4929f3c19fc8486aac66ab0378fb3995adb3b6d",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/jqlang/jq/commits/f4929f3c19fc8486aac66ab0378fb3995adb3b6d",
    "html_url": "https://github.com/jqlang/jq/commit/f4929f3c19fc8486aac66ab0378fb3995adb3b6d",
    "comments_url": "https://api.github.com/repos/jqlang/jq/commits/f4929f3c19fc8486aac66ab0378fb3995adb3b6d/comments",
    "author": {
      "login": "emanuele6",
      "id": 20175435,
      "node_id": "MDQ6VXNlcjIwMTc1NDM1",
      "avatar_url": "https://avatars.githubusercontent.com/u/20175435?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/emanuele6",
      "html_url": "https://github.com/emanuele6",
      "followers_url": "https://api.github.com/users/emanuele6/followers",
      "following_url": "https://api.github.com/users/emanuele6/following{/other_user}",
      "gists_url": "https://api.github.com/users/emanuele6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/emanuele6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/emanuele6/subscriptions",
      "organizations_url": "https://api.github.com/users/emanuele6/orgs",
      "repos_url": "https://api.github.com/users/emanuele6/repos",
      "events_url": "https://api.github.com/users/emanuele6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/emanuele6/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "nicowilliams",
      "id": 604851,
      "node_id": "MDQ6VXNlcjYwNDg1MQ==",
      "avatar_url": "https://avatars.githubusercontent.com/u/604851?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/nicowilliams",
      "html_url": "https://github.com/nicowilliams",
      "followers_url": "https://api.github.com/users/nicowilliams/followers",
      "following_url": "https://api.github.com/users/nicowilliams/following{/other_user}",
      "gists_url": "https://api.github.com/users/nicowilliams/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/nicowilliams/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/nicowilliams/subscriptions",
      "organizations_url": "https://api.github.com/users/nicowilliams/orgs",
      "repos_url": "https://api.github.com/users/nicowilliams/repos",
      "events_url": "https://api.github.com/users/nicowilliams/events{/privacy}",
      "received_events_url": "https://api.github.com/users/nicowilliams/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "d5590f90dad1764a7e0aa35f83c6ef4611939194",
        "url": "https://api.github.com/repos/jqlang/jq/commits/d5590f90dad1764a7e0aa35f83c6ef4611939194",
        "html_url": "https://github.com/jqlang/jq/commit/d5590f90dad1764a7e0aa35f83c6ef4611939194"
      }
    ]
  },
  {
    "sha": "d5590f90dad1764a7e0aa35f83c6ef4611939194",
    "node_id": "C_kwDOAE3WVdoAKGQ1NTkwZjkwZGFkMTc2NGE3ZTBhYTM1ZjgzYzZlZjQ2MTE5MzkxOTQ",
    "commit": {
      "author": {
        "name": "Emanuele Torre",
        "email": "torreemanuele6@gmail.com",
        "date": "2023-10-28T21:58:03Z"
      },
      "committer": {
        "name": "Nico Williams",
        "email": "nico@cryptonector.com",
        "date": "2023-10-31T03:12:27Z"
      },
      "message": "jvp_object_contains: remove unnecessary jv_copy",
      "tree": {
        "sha": "e3967b85ab273d150cb226273161de3a3765585a",
        "url": "https://api.github.com/repos/jqlang/jq/git/trees/e3967b85ab273d150cb226273161de3a3765585a"
      },
      "url": "https://api.github.com/repos/jqlang/jq/git/commits/d5590f90dad1764a7e0aa35f83c6ef4611939194",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/jqlang/jq/commits/d5590f90dad1764a7e0aa35f83c6ef4611939194",
    "html_url": "https://github.com/jqlang/jq/commit/d5590f90dad1764a7e0aa35f83c6ef4611939194",
    "comments_url": "https://api.github.com/repos/jqlang/jq/commits/d5590f90dad1764a7e0aa35f83c6ef4611939194/comments",
    "author": {
      "login": "emanuele6",
      "id": 20175435,
      "node_id": "MDQ6VXNlcjIwMTc1NDM1",
      "avatar_url": "https://avatars.githubusercontent.com/u/20175435?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/emanuele6",
      "html_url": "https://github.com/emanuele6",
      "followers_url": "https://api.github.com/users/emanuele6/followers",
      "following_url": "https://api.github.com/users/emanuele6/following{/other_user}",
      "gists_url": "https://api.github.com/users/emanuele6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/emanuele6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/emanuele6/subscriptions",
      "organizations_url": "https://api.github.com/users/emanuele6/orgs",
      "repos_url": "https://api.github.com/users/emanuele6/repos",
      "events_url": "https://api.github.com/users/emanuele6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/emanuele6/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "nicowilliams",
      "id": 604851,
      "node_id": "MDQ6VXNlcjYwNDg1MQ==",
      "avatar_url": "https://avatars.githubusercontent.com/u/604851?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/nicowilliams",
      "html_url": "https://github.com/nicowilliams",
      "followers_url": "https://api.github.com/users/nicowilliams/followers",
      "following_url": "https://api.github.com/users/nicowilliams/following{/other_user}",
      "gists_url": "https://api.github.com/users/nicowilliams/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/nicowilliams/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/nicowilliams/subscriptions",
      "organizations_url": "https://api.github.com/users/nicowilliams/orgs",
      "repos_url": "https://api.github.com/users/nicowilliams/repos",
      "events_url": "https://api.github.com/users/nicowilliams/events{/privacy}",
      "received_events_url": "https://api.github.com/users/nicowilliams/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "e85e3582330af543f1a7b293c6b9b27f342670a2",
        "url": "https://api.github.com/repos/jqlang/jq/commits/e85e3582330af543f1a7b293c6b9b27f342670a2",
        "html_url": "https://github.com/jqlang/jq/commit/e85e3582330af543f1a7b293c6b9b27f342670a2"
      }
    ]
  }
]
`,c=document;let d=!1,j;async function D(){const i=c.getElementById("input-json").value,e=c.getElementById("filter").value,n=c.getElementById("mono-output").checked,s=c.getElementById("compact-output").checked,t=c.getElementById("sort-keys").checked,r=c.getElementById("raw-input").checked,a=c.getElementById("raw-output").checked,u=c.getElementById("slurp").checked,o=n?["--monochrome-output"]:["--color-output"];s&&o.push("--compact-output"),t&&o.push("--sort-keys"),r&&o.push("--raw-input"),a&&o.push("--raw-output"),u&&o.push("--slurp"),o.push(e),o.push("data.json");const m=new URL(location.href);m.searchParams.set("query",e),history.replaceState("","",m);const p=performance.now();let b=await j.writeRun(i,o);const q=(performance.now()-p).toFixed(3);if(c.getElementById("output-label").textContent=`Result (${q}ms)`,n)c.getElementById("output-json").textContent=b;else{const E=new I().ansi_to_html(b);c.getElementById("output-json").innerHTML=E}}async function h(){d||(d=!0,await D(),d=!1)}function U(i,e){let n;return function(...s){clearTimeout(n),n=setTimeout(()=>i(...s),e)}}function A(){c.getElementById("filter").value=".[].sha",c.getElementById("input-json").value=B,h()}async function G(){const e=new URL(location.href).searchParams.get("query");e&&(c.getElementById("filter").value=e),j=await C({moduleUrl:N,wasmUrl:O});const n=U(h,400);document.getElementById("filter").addEventListener("input",n),document.getElementById("input-json").addEventListener("input",n),document.getElementById("mono-output").addEventListener("input",h),document.getElementById("compact-output").addEventListener("input",h),document.getElementById("sort-keys").addEventListener("input",h),document.getElementById("raw-input").addEventListener("input",h),document.getElementById("raw-output").addEventListener("input",h),document.getElementById("slurp").addEventListener("input",h),document.getElementById("input-sample").addEventListener("click",A)}G();
