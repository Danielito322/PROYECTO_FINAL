document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('cart-app');
  let shopMethod='card';
  const payInfo={
    card:{name:'Tarjeta',icon:'creditCard',detail:'Pago simulado con tarjeta de débito o crédito.'},
    yape:{name:'Yape',icon:'qr',detail:'Paga al número 987 654 321.'},
    plin:{name:'Plin',icon:'qr',detail:'Paga al número 987 654 321.'}
  };
  function products(){return [...NUBA_DATA.products,...NUBA_STORE.getProvider().products.filter(p=>p.id.startsWith('pp'))]}
  function render(){
    const cart=NUBA_STORE.getCart();
    const rows=cart.map(item=>({item,product:products().find(p=>p.id===item.id)})).filter(row=>row.product);
    const total=rows.reduce((sum,row)=>sum+row.item.qty*row.product.price,0);
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Tu compra</div><h1>Carrito</h1><p>Revisa productos, cantidades y el total antes de pagar.</p></div><button class="icon-btn" data-back="tienda.html" aria-label="Volver">${NUBA.icon('arrowLeft')}</button></header><div class="venue-list">${rows.length?rows.map(({item,product})=>`<article class="stock-row"><img src="${product.image}" alt="${product.name}"><div class="stock-copy"><strong>${product.name}</strong><span>${NUBA.money(product.price)} · Stock disponible</span><div class="stock-actions" style="margin-top:7px"><button data-qty="${product.id}" data-delta="-1" aria-label="Restar">${NUBA.icon('minus')}</button><strong class="quantity-value">${item.qty}</strong><button data-qty="${product.id}" data-delta="1" aria-label="Sumar">${NUBA.icon('plus')}</button></div></div><strong class="row-total">${NUBA.money(product.price*item.qty)}</strong></article>`).join(''):`<div class="empty-state">${NUBA.icon('bag')}<h3>Tu carrito está vacío</h3><p>Agrega productos desde la tienda de un local.</p><a class="btn btn-primary" href="explorar.html" style="margin-top:14px">Explorar locales</a></div>`}</div>${rows.length?`<div class="summary-card" style="margin-top:16px"><div class="summary-line summary-total" style="border-top:0;margin:0;padding-top:0"><span>Total de productos</span><strong>${NUBA.money(total)}</strong></div></div><button class="btn btn-primary btn-block" id="checkout" style="margin-top:14px">${NUBA.icon('creditCard')} Continuar al pago</button>`:''}</section>${rows.length?`<div id="cart-modal" class="modal-backdrop" aria-hidden="true"><div class="modal"><div class="modal-handle"></div><div class="modal-title"><h3>Confirmar compra</h3><button class="close-modal" data-close aria-label="Cerrar">${NUBA.icon('x')}</button></div><p class="modal-description">Elige un método. Verás los datos de pago antes de confirmar tu compra.</p><div class="payment-methods">${Object.entries(payInfo).map(([id,data])=>`<label class="payment-option ${shopMethod===id?'selected':''}"><input type="radio" name="shopPay" value="${id}" ${shopMethod===id?'checked':''}><span class="payment-logo">${NUBA.icon(data.icon)}</span><span class="payment-copy"><strong>${data.name}</strong><small>${data.detail}</small></span></label>`).join('')}</div><div class="cart-pay-details">${shopMethod==='card'?`<div class="form-field"><label class="form-label">Tarjeta de prueba</label><input class="input" id="shop-card" placeholder="4111 1111 1111 1111"></div>`:`<div class="pay-number">987 654 321</div><p>Envía exactamente ${NUBA.money(total)} y confirma después de realizar el pago.</p><button class="btn btn-secondary btn-sm" id="copy-shop-number">${NUBA.icon('copy','sm')} Copiar número</button>`}</div><button class="btn btn-primary btn-block" id="pay-cart" style="margin-top:16px">Pagar ${NUBA.money(total)}</button></div></div>`:''}`;
    NUBA.refresh(host);
  }
  function pay(){
    if(shopMethod==='card'&&!host.querySelector('#shop-card')?.value.trim()){NUBA.toast('Ingresa una tarjeta de prueba.');return;}
    const paidTotal=NUBA_STORE.getCart().reduce((sum,item)=>{const product=products().find(p=>p.id===item.id);return sum+(product?product.price*item.qty:0)},0);
    NUBA_STORE.setCart([]);
    const modal=host.querySelector('#cart-modal');modal?.classList.remove('show');
    host.innerHTML=`<section class="page-content success-page"><div class="success-badge">${NUBA.icon('check','xl')}</div><div class="eyebrow">Compra confirmada</div><h1>Tu pedido está listo.</h1><p>Registramos la compra simulada. El local recibirá el detalle de los productos seleccionados.</p><div class="card success-receipt"><div><span>Método</span><strong>${payInfo[shopMethod].name}</strong></div><div><span>Total pagado</span><strong>${NUBA.money(paidTotal)}</strong></div></div><a class="btn btn-primary btn-block" href="explorar.html">Seguir explorando</a><a class="btn btn-secondary btn-block" href="perfil.html" style="margin-top:10px">Ir a mi perfil</a></section>`;
    NUBA.refresh(host);
  }
  host.addEventListener('click',event=>{
    const qty=event.target.closest('[data-qty]');
    if(qty){const next=NUBA_STORE.getCart().map(item=>item.id===qty.dataset.qty?{...item,qty:item.qty+(+qty.dataset.delta)}:item).filter(item=>item.qty>0);NUBA_STORE.setCart(next);render();return;}
    if(event.target.closest('#checkout')){host.querySelector('#cart-modal').classList.add('show');return;}
    if(event.target.closest('[data-close]')||event.target.id==='cart-modal'){host.querySelector('#cart-modal')?.classList.remove('show');return;}
    if(event.target.closest('#copy-shop-number')){navigator.clipboard?.writeText('987654321');NUBA.toast('Número copiado.');return;}
    if(event.target.closest('#pay-cart'))pay();
  });
  host.addEventListener('change',event=>{if(event.target.name==='shopPay'){shopMethod=event.target.value;render();host.querySelector('#cart-modal')?.classList.add('show');}});
  render();
});
