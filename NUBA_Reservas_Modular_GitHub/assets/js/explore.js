(function(){
  const grid=document.getElementById('venue-results'); if(!grid)return;
  const root=APP_CONFIG.root; let filter=sessionStorage.getItem('nuba_filter')||'Todos'; let term='';
  const categories=['Todos','Canchas','Restaurantes','Belleza','Entretenimiento'];
  const chips=document.getElementById('filter-chips');
  chips.innerHTML=categories.map(c=>`<button class="chip ${c===filter?'active':''}" data-filter="${c}">${c==='Todos'?'Todo':c}</button>`).join('');
  function draw(){const result=NUBA_DATA.venues.filter(v=>(filter==='Todos'||v.type===filter)&&(`${v.name} ${v.type} ${v.location}`.toLowerCase().includes(term.toLowerCase())));document.getElementById('results-count').textContent=`${result.length} lugares disponibles`;grid.innerHTML=result.length?result.map(v=>`<article class="venue-card"><img class="venue-img" src="${v.image}" alt="${v.name}"><div class="venue-body"><div class="venue-top"><div><h3 class="venue-title">${v.icon} ${v.name}</h3><p class="venue-kind">${v.type} · ${v.location}</p></div><span class="rating">★ ${v.rating}</span></div><div class="venue-meta"><span>📍 ${v.distance}</span><span class="price"><strong>${money(v.price)}</strong> / ${v.unit}</span></div><div class="venue-actions"><a class="btn btn-secondary btn-small" href="${root}pages/detalle.html?id=${v.id}">Detalles</a><a class="btn btn-primary btn-small" href="${root}pages/reservar.html?id=${v.id}">Reservar</a></div></div></article>`).join(''):`<div class="empty"><b>No encontramos resultados.</b><br>Prueba otra categoría o palabra.</div>`}
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;filter=b.dataset.filter;sessionStorage.setItem('nuba_filter',filter);chips.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',c===b));draw()});
  document.getElementById('venue-search').addEventListener('input',e=>{term=e.target.value;draw()});
  draw();
})();
