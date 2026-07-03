(function(){
  const grid=document.getElementById('product-grid');if(!grid)return;let filter='Todos';const categories=['Todos','Deporte','Ropa','Accesorios'];const chips=document.getElementById('shop-chips');
  chips.innerHTML=categories.map(c=>`<button class="chip ${c==='Todos'?'active':''}" data-shop-filter="${c}">${c}</button>`).join('');
  function draw(){const ps=NUBA_DATA.products.filter(p=>filter==='Todos'||p.category===filter);grid.innerHTML=ps.map(p=>`<article class="product-card"><img src="${p.image}" alt="${p.name}"><div class="product-body"><strong>${p.name}</strong><span>${p.category}</span><div class="product-bottom"><b>${money(p.price)}</b><button class="add-circle" aria-label="Agregar ${p.name}" data-add-product="${p.id}">+</button></div></div></article>`).join('')}
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-shop-filter]');if(!b)return;filter=b.dataset.shopFilter;chips.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x===b));draw()});
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-add-product]');if(!b)return;const p=NUBA_DATA.products.find(x=>x.id===b.dataset.addProduct);const cart=NUBA_STORE.cart();const existing=cart.find(x=>x.id===p.id);if(existing)existing.qty++;else cart.push({...p,qty:1});NUBA_STORE.setCart(cart);renderCartCount();showToast(`${p.name} se agregó al carrito.`)});draw();
})();
