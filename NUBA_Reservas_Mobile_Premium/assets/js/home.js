(function(){const N=window.NUBA;if(!N)return;
  const holder=document.getElementById('home-venues'); if(!holder)return;
  const card=v=>`<a class="venue-card card" href="pages/detalle.html?id=${v.id}"><div class="venue-img"><img src="${v.photo}" alt="${v.name}"></div><div class="venue-info"><div class="venue-line"><span class="venue-type">${v.label}</span><span class="rating">★ ${v.rating}</span></div><strong class="venue-title">${v.name}</strong><p class="venue-meta">${v.type}<br>${v.distance} · ${v.availability}</p><div class="price">${N.money(v.price)} <small>${v.unit}</small></div></div></a>`;
  holder.innerHTML=N.venues.slice(0,3).map(card).join('');
  document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>location.href='pages/explorar.html?categoria='+btn.dataset.category));
})();
