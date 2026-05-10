let selected = null;
const canvas = () => document.getElementById('canvas');

document.addEventListener('click', e => {
  if (e.target.classList.contains('editable')) {
    document.querySelectorAll('.editable').forEach(x => x.classList.remove('selected'));
    selected = e.target;
    selected.classList.add('selected');
  }
});

function switchPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function createEditable(tag='div', text='Editable block'){
  const el = document.createElement(tag);
  el.className = 'editable';
  el.contentEditable = 'true';
  el.innerHTML = text;
  canvas().appendChild(el);
  return el;
}

function addBlock(type){
  if(type==='heading') createEditable('h2','New Heading');
  if(type==='text') createEditable('div','New text block');
  if(type==='button') createEditable('button','Click Me');
  if(type==='divider') {
    const hr = document.createElement('div');
    hr.className='editable';
    hr.innerHTML='<hr>';
    canvas().appendChild(hr);
  }
  if(type==='image'){
    const el = createEditable('div','');
    el.innerHTML = '<img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200">';
  }
}

function setStyle(prop, val){ if(selected) selected.style[prop] = val; }
function alignSelected(v){ if(selected) selected.style.textAlign = v; }

function duplicateSelected(){
  if(!selected) return;
  const clone = selected.cloneNode(true);
  canvas().insertBefore(clone, selected.nextSibling);
}

function deleteSelected(){
  if(selected){ selected.remove(); selected = null; }
}

function moveSelected(dir){
  if(!selected) return;
  if(dir < 0 && selected.previousElementSibling){
    selected.parentNode.insertBefore(selected, selected.previousElementSibling);
  }
  if(dir > 0 && selected.nextElementSibling){
    selected.parentNode.insertBefore(selected.nextElementSibling, selected);
  }
}

function uploadImage(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const el = createEditable('div','');
    el.innerHTML = '<img src="'+ev.target.result+'">';
  };
  reader.readAsDataURL(file);
}

function applyTemplate(name){
  switchPage('builder');
  if(name==='landing'){
    canvas().innerHTML = '<h1 class="editable" contenteditable="true">Launch Faster</h1><div class="editable" contenteditable="true">Modern product landing page.</div><div class="editable"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200"></div>';
  }
  if(name==='portfolio'){
    canvas().innerHTML = '<h1 class="editable" contenteditable="true">John Carter</h1><div class="editable" contenteditable="true">Designer & Developer</div><div class="editable"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=1200"></div>';
  }
  if(name==='agency'){
    canvas().innerHTML = '<h1 class="editable" contenteditable="true">Creative Agency</h1><div class="editable" contenteditable="true">We build brands that stand out.</div><div class="editable"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"></div>';
  }
}

function saveProject(){
  localStorage.setItem('velora_pro', canvas().innerHTML);
  alert('Project saved');
}

function loadProject(){
  const d = localStorage.getItem('velora_pro');
  if(d) canvas().innerHTML = d;
}

function resetCanvas(){ canvas().innerHTML = ''; }

function exportHTML(){
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Export</title></head><body style="font-family:Arial;background:#111;color:#fff;padding:40px;">'+canvas().innerHTML+'</body></html>';
  const blob = new Blob([html], {type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'velora-export.html';
  a.click();
}
