(function(){
  const list=document.getElementById('home-venues'); if(!list)return;
  const root=APP_CONFIG.root;
  list.innerHTML=NUBA_DATA.venues.slice(0,3).map(v=>`
    <article class="venue-card">
      <img class="venue-img" src="${v.image}" alt="${v.name}">
      <div class="venue-body"><div class="venue-top"><div><h3 class="venue-title">${v.icon} ${v.name}</h3><p class="venue-kind">${v.type} · ${v.location}</p></div><span class="rating">★ ${v.rating}</span></div>
      <div class="venue-meta"><span>📍 ${v.distance} · ${v.reviews} reseñas</span><span class="price"><strong>${money(v.price)}</strong> / ${v.unit}</span></div>
      <div class="venue-actions"><a class="btn btn-secondary btn-small" href="${root}pages/detalle.html?id=${v.id}">Ver detalle</a><a class="btn btn-primary btn-small" href="${root}pages/reservar.html?id=${v.id}">Reservar</a></div></div>
    </article>`).join('');
  document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{sessionStorage.setItem('nuba_filter',btn.dataset.category);go('pages/explorar.html')}));
})();
