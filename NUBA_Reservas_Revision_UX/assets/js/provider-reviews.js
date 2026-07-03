document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('provider-reviews-app');
  let selectedId=null;
  function stars(rating){return `<span class="review-stars">${Array.from({length:5},(_,i)=>NUBA.icon('star',`sm ${i<rating?'star-on':''}`)).join('')}</span>`}
  function render(){
    const provider=NUBA_STORE.getProvider();
    const reviews=NUBA_STORE.getReviews('arena-sur',true);
    const published=reviews.filter(r=>r.status==='published');
    const average=published.length?(published.reduce((sum,r)=>sum+r.rating,0)/published.length).toFixed(1):'—';
    const active=selectedId?reviews.find(r=>r.id===selectedId):null;
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Reputación del local</div><h1>Reseñas</h1><p>Responde con respeto y reporta comentarios que necesiten revisión.</p></div><a class="icon-btn" href="negocio.html" aria-label="Volver">${NUBA.icon('arrowLeft')}</a></header>${NUBA_PROVIDER.tabs('reviews')}<div class="stat-grid" style="margin-top:15px"><div class="stat"><strong>${average}</strong><span>Promedio</span></div><div class="stat"><strong>${published.length}</strong><span>Publicadas</span></div><div class="stat"><strong>${reviews.filter(r=>r.status==='reported').length}</strong><span>En revisión</span></div></div><div class="section-head"><h3>Comentarios del local</h3><p>${provider.name}</p></div><div class="venue-list">${reviews.length?reviews.map(review=>`<article class="review-card"><div class="review-head"><div class="review-avatar">${review.name.charAt(0)}</div><div class="review-copy"><strong>${review.name}</strong><small>${review.status==='reported'?'En revisión de contenido':'Reserva verificada'}</small></div>${stars(review.rating)}</div><p>${review.comment}</p>${review.reply?`<div class="review-reply"><strong>Tu respuesta</strong><span>${review.reply}</span></div>`:''}<div class="review-actions"><span class="badge ${review.status==='reported'?'amber':review.status==='hidden'?'red':'green'}">${review.status==='reported'?'En revisión':review.status==='hidden'?'Oculta':'Publicada'}</span><span style="display:flex;gap:10px"><button class="review-report" data-reply="${review.id}">${NUBA.icon('message','sm')} Responder</button><button class="review-report" data-report="${review.id}">${NUBA.icon('flag','sm')} Reportar</button></span></div></article>`).join(''):`<div class="empty-state">${NUBA.icon('message')}<h3>Aún no hay comentarios</h3><p>Las opiniones aparecerán después de las reservas confirmadas.</p></div>`}</div></section><div id="reply-modal" class="modal-backdrop ${active?'show':''}"><div class="modal"><div class="modal-handle"></div><div class="modal-title"><h3>Responder reseña</h3><button class="close-modal" data-close>${NUBA.icon('x')}</button></div><p class="modal-description">Tu respuesta será visible para los clientes junto al comentario.</p><form id="reply-form"><div class="form-field"><label class="form-label">Mensaje para ${active?.name||''}</label><textarea class="textarea" id="reply-text" required maxlength="220" placeholder="Gracias por tu comentario…">${active?.reply||''}</textarea></div><button class="btn btn-primary btn-block">${NUBA.icon('send')} Publicar respuesta</button></form></div></div>`;
    NUBA.refresh(host);
  }
  host.addEventListener('click',event=>{
    const reply=event.target.closest('[data-reply]');
    if(reply){selectedId=reply.dataset.reply;render();return;}
    const report=event.target.closest('[data-report]');
    if(report){NUBA_STORE.updateReview(report.dataset.report,{status:'reported',reported:true,reportReason:'El proveedor solicitó moderación de este comentario.'});NUBA.toast('Comentario enviado al administrador para revisión.');render();return;}
    if(event.target.closest('[data-close]')||event.target.id==='reply-modal'){selectedId=null;render();}
  });
  host.addEventListener('submit',event=>{
    if(event.target.id!=='reply-form')return;
    event.preventDefault();
    const text=host.querySelector('#reply-text').value.trim();
    if(text.length<4){NUBA.toast('Escribe una respuesta más completa.');return;}
    NUBA_STORE.updateReview(selectedId,{reply:text});selectedId=null;NUBA.toast('Respuesta publicada.');render();
  });
  render();
});
