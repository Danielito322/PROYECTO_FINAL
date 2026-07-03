(function(){
  const id=query('id'); const v=getVenue(id); const root=APP_CONFIG.root;
  document.getElementById('detail-gallery').innerHTML=v.images.map((im,i)=>`<img src="${im}" alt="${v.name} imagen ${i+1}">`).join('');
  document.getElementById('detail-title').textContent=`${v.icon} ${v.name}`;
  document.getElementById('detail-meta').textContent=`${v.type} · ${v.location} · ${v.distance}`;
  document.getElementById('detail-rating').textContent=`★ ${v.rating} (${v.reviews} reseñas)`;
  document.getElementById('detail-copy').textContent=v.description;
  document.getElementById('detail-pills').innerHTML=v.amenities.map(a=>`<span class="pill">✓ ${a}</span>`).join('');
  document.getElementById('detail-price').innerHTML=`<small>Desde</small><strong>${money(v.price)}</strong><small> / ${v.unit}</small>`;
  document.querySelectorAll('[data-book]').forEach(a=>a.href=`${root}pages/reservar.html?id=${v.id}`);
})();
