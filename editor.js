
let pages=[{id:"home",name:"Home",els:[]}];
let current="home";
let selected=null;
let preview=false;
let drag=null;

function getPage(){ return pages.find(p=>p.id===current); }

function addText(){
  getPage().els.push({
    id:crypto.randomUUID(),
    type:"text",
    x:100,y:100,
    text:"Edit me",
    size:16,
    color:"#000"
  });
  render();
}

function addBox(){
  getPage().els.push({
    id:crypto.randomUUID(),
    type:"box",
    x:100,y:100,
    w:200,h:100
  });
  render();
}

function addImage(){
  let input=document.createElement("input");
  input.type="file";
  input.onchange=e=>{
    let file=e.target.files[0];
    let r=new FileReader();
    r.onload=()=>{
      getPage().els.push({
        id:crypto.randomUUID(),
        type:"image",
        x:100,y:100,
        src:r.result,
        w:200,h:150
      });
      render();
    };
    r.readAsDataURL(file);
  };
  input.click();
}

function addPage(){
  let id=crypto.randomUUID();
  pages.push({id,name:"Page "+pages.length,els:[]});
  current=id;
  render();
}

document.addEventListener("mousemove",e=>{
  if(!drag)return;
  let el=getPage().els.find(x=>x.id===drag.id);
  el.x=e.clientX-drag.x;
  el.y=e.clientY-drag.y;
  render();
});

document.addEventListener("mouseup",()=>drag=null);

function startDrag(e,el){
  drag={id:el.id,x:e.clientX-el.x,y:e.clientY-el.y};
}

function select(id){ selected=id; render(); }

function setSize(v){
  let el=getPage().els.find(e=>e.id===selected);
  if(el) el.size=v;
  render();
}

function setColor(v){
  let el=getPage().els.find(e=>e.id===selected);
  if(el) el.color=v;
  render();
}

function align(dir){
  let el=getPage().els.find(e=>e.id===selected);
  if(el) el.align=dir;
  render();
}

function togglePreview(){
  preview=!preview;
  render();
}

function loadTemplate(t){
  let p=getPage();
  p.els=[];
  if(t==="business"){
    p.els.push({id:crypto.randomUUID(),type:"text",x:100,y:100,text:"Business Site"});
  }
  if(t==="portfolio"){
    p.els.push({id:crypto.randomUUID(),type:"text",x:100,y:100,text:"Portfolio"});
  }
  if(t==="shop"){
    p.els.push({id:crypto.randomUUID(),type:"text",x:100,y:100,text:"Shop"});
  }
  render();
}

function exportSite(){
  let p=getPage();
  let html="<html><body>";
  p.els.forEach(e=>{
    if(e.type==="image"){
      html+=`<img src="${e.src}" style="position:absolute;left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;">`;
    } else {
      html+=`<div style="position:absolute;left:${e.x}px;top:${e.y}px;color:${e.color};font-size:${e.size}px">${e.text}</div>`;
    }
  });
  html+="</body></html>";
  let a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([html]));
  a.download="site.html";
  a.click();
}

function render(){
  let c=document.getElementById("canvas");
  let p=getPage();

  if(preview){
    c.innerHTML=p.els.map(e=>`<div>${e.text||""}</div>`).join("");
    return;
  }

  c.innerHTML=p.els.map(e=>`
    <div class="el"
      onclick="select('${e.id}')"
      onmousedown="startDrag(event,${JSON.stringify(e).replace(/"/g,'&quot;')})"
      style="left:${e.x}px;top:${e.y}px;font-size:${e.size||16}px;color:${e.color||'black'}">
      ${e.type==="image"?`<img src="${e.src}" width="100">`:e.text||""}
    </div>
  `).join("");

  document.getElementById("pages").innerHTML=
    pages.map(p=>`<div onclick="current='${p.id}';render()">${p.name}</div>`).join("");
}

render();
