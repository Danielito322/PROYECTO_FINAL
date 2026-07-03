document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('admin-reviews-app');
  let filter='reported';
  function stars(rating){return `<span class="review-stars">${Array.from({length:5},(_,i)=>NUBA.icon('star',`sm ${i<rating?'star-on':''}`)).join('')}</span>`}
  function render(){
    const all=NUBA_STORE.getReviews(null,true);
    const list=all.filter(review=>filter==='all'?true:review.status===filter);
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Calidad de contenido</div><h1>Moderar reseñas</h1><p>Protege la comunidad sin eliminar opiniones válidas.</p></div><a class="icon-btn" href="admin.html" aria-label="Volver">${NUBA.icon('arrowLeft')}</a></header><div class="chips"><button class="chip ${filter==='reported'?'active':''}" data-filter="reported">En revisión</button><button class="chip ${filter==='published'?'active':''}" data-filter="published">Publicadas</button><button class="chip ${filter==='hidden'?'active':''}" data-filter="hidden">Ocultas</button><button class="chip ${filter==='all'?'active':''}" data-filter="all">Todas</button></div><div class="section-head"><h3>Comentarios</h3><p>${list.length} registros</p></div><div class="venue-list">${list.length?list.map(review=>`<article class="review-card"><div class="review-head"><div class="review-avatar">${review.name.charAt(0)}</div><div class="review-copy"><strong>${review.name}</strong><small>${review.venue}</small></div>${stars(review.rating)}</div><p>${review.comment}</p>${review.reportReason?`<div class="review-reply"><strong>Motivo de revisión</strong><span>${review.reportReason}</span></div>`:''}<div class="booking-actions"><button class="btn btn-success btn-sm" data-publish="${review.id}">${NUBA.icon('check','sm')} Publicar</button><button class="btn btn-danger btn-sm" data-hide="${review.id}">${NUBA.icon('eye','sm')} Ocultar</button></div></article>`).join(''):`<div class="empty-state">${NUBA.icon('check')}<h3>No hay reseñas en este estado</h3><p>La moderación queda al día.</p></div>`}</div></section>`;
    NUBA.refresh(host);
  }
  host.addEventListener('click',event=>{
    const f=event.target.closest('[data-filter]');
    if(f){filter=f.dataset.filter;render();return;}
    const publish=event.target.closest('[data-publish]');
    if(publish){NUBA_STORE.updateReview(publish.dataset.publish,{status:'published',reported:false,reportReason:''});NUBA.toast('Reseña publicada.');render();return;}
    const hide=event.target.closest('[data-hide]');
    if(hide){NUBA_STORE.updateReview(hide.dataset.hide,{status:'hidden',reported:false,reportReason:'Oculta por moderación.'});NUBA.toast('Reseña oculta para clientes.');render();}
  });
  render();
});
