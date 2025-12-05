const API = 'http://localhost:3000/api/players';


async function fetchPlayers(){
try{
const res = await fetch(API);
const data = await res.json();
renderPlayers(data);
}catch(err){
console.error('fetchPlayers', err);
}
}


function renderPlayers(players){
const list = document.getElementById('playersList');
list.innerHTML = '';
players.forEach(p => {
const li = document.createElement('li');
li.className = 'player-row';
li.innerHTML = `
<img src="${p.avatar_url || 'https://via.placeholder.com/64'}" alt="avatar"/>
<div class="player-meta">
<div class="name">${escapeHtml(p.username)}</div>
<div class="muted">id: ${p.id} • ${new Date(p.created_at).toLocaleString()}</div>
</div>
<div class="player-actions">
<button data-id="${p.id}" class="previewBtn">Preview</button>
<button data-id="${p.id}" class="deleteBtn">Delete</button>
</div>
`;
list.appendChild(li);
});
attachRowHandlers();
}


function attachRowHandlers(){
document.querySelectorAll('.previewBtn').forEach(b => b.onclick = (e)=>{
const id = e.target.dataset.id;
const parent = e.target.closest('.player-row');
const name = parent.querySelector('.name').textContent;
const img = parent.querySelector('img').src;
const preview = document.getElementById('previewArea');
preview.innerHTML = `<div style="text-align:center"><img src='${img}' style='width:96px;height:96px;border-radius:12px;margin-bottom:8px'/><div style='font-weight:700'>${escapeHtml(name)}</div></div>`;
});


document.querySelectorAll('.deleteBtn').forEach(b => b.onclick = async (e)=>{
const id = e.target.dataset.id;
if(!confirm('Delete this player?')) return;
await fetch(`${API}/${id}`, { method: 'DELETE' });
fetchPlayers();
});
}


// Add form
document.getElementById('addForm').addEventListener('submit', async (ev)=>{
ev.preventDefault();
const username = document.getElementById('username').value.trim();
const avatar = document.getElementById('avatar').value.trim();
if(!username) return alert('username required');
await fetch(API, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, avatar_url: avatar || null }) });
document.getElementById('username').value = '';
document.getElementById('avatar').value = '';
fetchPlayers();
});


// refresh button
document.getElementById('refreshBtn').addEventListener('click', fetchPlayers);


function escapeHtml(s){
return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
fetchPlayers();