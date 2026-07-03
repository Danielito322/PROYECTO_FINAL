(function(){
  const list = document.getElementById('cart-list');
  if(!list) return;

  function total(){
    return NUBA_STORE.cart().reduce((s,i)=>s + i.price * i.qty, 0);
  }

  function draw(){
    const cart = NUBA_STORE.cart();
    if(!cart.length){
      list.innerHTML = '<div class="empty"><b>Tu carrito está vacío.</b><br>Explora productos y agrega lo que necesites.</div>';
      document.getElementById('cart-total').textContent = money(0);
      return;
    }
    list.innerHTML = cart.map(p => `
      <div class="cart-row">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-copy">
          <strong>${p.name}</strong>
          <span>${money(p.price)} c/u</span>
          <div class="qty">
            <button data-qty="-" data-id="${p.id}">−</button>
            <b>${p.qty}</b>
            <button data-qty="+" data-id="${p.id}">+</button>
          </div>
        </div>
        <button class="remove-item" data-remove="${p.id}">Quitar</button>
      </div>
    `).join('');
    document.getElementById('cart-total').textContent = money(total());
  }

  list.addEventListener('click', e => {
    const q = e.target.closest('[data-qty]');
    const rm = e.target.closest('[data-remove]');
    let cart = NUBA_STORE.cart();
    if(q){
      const item = cart.find(x => x.id === q.dataset.id);
      item.qty += Number(q.dataset.qty);
      if(item.qty <= 0) cart = cart.filter(x => x.id !== item.id);
    }
    if(rm) cart = cart.filter(x => x.id !== rm.dataset.remove);
    NUBA_STORE.setCart(cart);
    renderCartCount();
    draw();
  });

  // Payment modal handling
  const checkoutBtn = document.getElementById('checkout-cart');
  const paymentBackdrop = document.getElementById('payment-backdrop');
  const confirmBtn = document.getElementById('confirm-payment');
  const cancelBtn = document.getElementById('cancel-payment');
  const cancelBtn2 = document.getElementById('cancel-payment-2');

  function openPayment(){ if(!paymentBackdrop) return; paymentBackdrop.classList.add('show'); paymentBackdrop.setAttribute('aria-hidden','false'); }
  function closePayment(){ if(!paymentBackdrop) return; paymentBackdrop.classList.remove('show'); paymentBackdrop.setAttribute('aria-hidden','true'); }

  if(checkoutBtn){
    checkoutBtn.addEventListener('click', ()=>{
      if(!NUBA_STORE.cart().length){ showToast('Agrega al menos un producto.'); return; }
      openPayment();
    });
  }

  if(cancelBtn) cancelBtn.addEventListener('click', closePayment);
  if(cancelBtn2) cancelBtn2.addEventListener('click', closePayment);

  if(confirmBtn){
    confirmBtn.addEventListener('click', ()=>{
      const selected = document.querySelector('input[name="payment-method"]:checked');
      const method = selected ? selected.value : 'tarjeta';
      const label = method === 'yape' ? 'Yape' : 'Tarjeta';
      // simulate payment
      NUBA_STORE.setCart([]);
      renderCartCount();
      draw();
      closePayment();
      showToast(`Pago con ${label} confirmado. ¡Gracias!`);
    });
  }

  draw();
})();
