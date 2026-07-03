document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('payment-app');
  const pending=NUBA_STORE.getPending();
  if(!pending){
    host.innerHTML=`<section class="page-content"><div class="empty-state">${NUBA.icon('calendar')}<h3>No hay una reserva pendiente</h3><p>Primero selecciona un local, una fecha y una hora disponible.</p><a class="btn btn-primary" href="explorar.html" style="margin-top:14px">Explorar locales</a></div></section>`;
    NUBA.refresh(host);return;
  }
  let method='yape';let processing=false;
  const methods={
    yape:{name:'Yape',number:'987 654 321',label:'Pago móvil',icon:'qr',note:'Envía el monto exacto al número indicado. Luego vuelve aquí y confirma que realizaste el pago.'},
    plin:{name:'Plin',number:'987 654 321',label:'Pago móvil',icon:'qr',note:'Envía el monto exacto al número indicado. Luego vuelve aquí y confirma que realizaste el pago.'},
    card:{name:'Tarjeta',number:'Pago protegido',label:'Crédito o débito',icon:'creditCard',note:'Usa los datos de prueba para simular un cobro seguro.'}
  };
  function steps(){return `<div class="payment-steps" aria-label="Progreso"><span class="done"><i>1</i>Reserva</span><span class="active"><i>2</i>Pago</span><span><i>3</i>QR</span></div>`}
  function render(){
    const data=methods[method];
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Pago seguro</div><h1>Confirma tu pago</h1><p>El QR aparecerá únicamente cuando el pago quede confirmado.</p></div><button class="icon-btn" data-back="reservar.html?venue=${pending.venueId}" aria-label="Volver">${NUBA.icon('arrowLeft')}</button></header>${steps()}<article class="card soft booking-payment-summary"><div style="display:flex;gap:11px;align-items:center"><img src="${pending.image}" alt="${pending.venue}"><div><strong>${pending.venue}</strong><p>${pending.prettyDate} · ${pending.time}</p></div></div><div class="summary-card"><div class="summary-line"><span>Reserva</span><strong>${NUBA.money(pending.base)}</strong></div>${pending.extras.map(extra=>`<div class="summary-line"><span>${extra.name}</span><strong>${NUBA.money(extra.price)}</strong></div>`).join('')}<div class="summary-line summary-total"><span>Total a pagar</span><strong>${NUBA.money(pending.total)}</strong></div></div></article><div class="section-head"><h3>Método de pago</h3><p>Selecciona uno</p></div><div class="payment-methods">${Object.entries(methods).map(([id,item])=>`<label class="payment-option ${method===id?'selected':''}"><input type="radio" name="payment" value="${id}" ${method===id?'checked':''}><span class="payment-logo">${NUBA.icon(item.icon)}</span><span class="payment-copy"><strong>${item.name}</strong><small>${item.label}</small></span>${method===id?NUBA.icon('check','sm'):''}</label>`).join('')}</div><section class="payment-instructions" aria-live="polite"><div class="payment-instruction-icon">${NUBA.icon(data.icon)}</div><div><h3>${method==='card'?'Ingresa una tarjeta de prueba':`Paga con ${data.name}`}</h3>${method==='card'?`<p>${data.note}</p><div class="form-field" style="margin:12px 0 0"><label class="form-label">Número de tarjeta</label><input class="input" id="card-number" inputmode="numeric" placeholder="4111 1111 1111 1111"></div><div class="form-grid-2"><div class="form-field"><label class="form-label">Vencimiento</label><input class="input" id="card-date" placeholder="12/30"></div><div class="form-field"><label class="form-label">CVV</label><input class="input" id="card-cvv" inputmode="numeric" placeholder="123"></div></div>`:`<div class="pay-number">${data.number}</div><p>${data.note}</p><button class="btn btn-secondary btn-sm" id="copy-number">${NUBA.icon('copy','sm')} Copiar número</button>`}</div></section><button class="btn btn-primary btn-block" id="confirm-payment" style="margin-top:16px" ${processing?'disabled':''}>${processing?'Validando pago…':`${NUBA.icon('check')} Ya realicé el pago`}</button><p class="payment-assurance">${NUBA.icon('shield','sm')} La reserva se registra después de validar el pago. Esto evita horarios bloqueados sin confirmar.</p></section>`;
    NUBA.refresh(host);
  }
  function confirm(){
    if(processing)return;
    if(method==='card'){
      const number=host.querySelector('#card-number')?.value.trim();
      const date=host.querySelector('#card-date')?.value.trim();
      const cvv=host.querySelector('#card-cvv')?.value.trim();
      if(!number||!date||!cvv){NUBA.toast('Completa los datos de la tarjeta de prueba.');return;}
    }
    processing=true;render();
    setTimeout(()=>{
      const code='NUBA-PUNO-'+Math.floor(1000+Math.random()*8999);
      const booking={id:'r-'+Date.now(),code,venueId:pending.venueId,venue:pending.venue,category:pending.category,date:pending.date,prettyDate:pending.prettyDate,time:pending.time,base:pending.base,extras:pending.extras,total:pending.total,image:pending.image,status:'confirmed',payment:methods[method].name,createdAt:Date.now()};
      NUBA_STORE.addBooking(booking);NUBA_STORE.clearPending();localStorage.setItem('nuba_last_booking',JSON.stringify(booking));
      location.href='confirmacion.html';
    },950);
  }
  host.addEventListener('change',event=>{if(event.target.name==='payment'){method=event.target.value;render();}});
  host.addEventListener('click',event=>{
    if(event.target.closest('#copy-number')){
      navigator.clipboard?.writeText(methods[method].number).then(()=>NUBA.toast('Número copiado.')).catch(()=>NUBA.toast(`Número: ${methods[method].number}`));
    }
    if(event.target.closest('#confirm-payment'))confirm();
  });
  render();
});
