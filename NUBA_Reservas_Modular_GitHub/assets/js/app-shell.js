(function(){
  const cfg = window.APP_CONFIG;
  const root = cfg.root;
  const current = document.body.dataset.page || 'home';
  const links = [
    {id:'home',label:'Inicio',icon:'⌂',href:`${root}index.html`},
    {id:'explore',label:'Explorar',icon:'⌕',href:`${root}pages/explorar.html`},
    {id:'bookings',label:'Reservas',icon:'▣',href:`${root}pages/mis-reservas.html`},
    {id:'shop',label:'Tienda',icon:'◈',href:`${root}pages/tienda.html`},
    {id:'profile',label:'Perfil',icon:'☺',href:`${root}pages/perfil.html`}
  ];
  const nav = document.getElementById('app-nav');
  if(nav){nav.className='bottom-nav';nav.innerHTML=links.map(l=>`<a class="nav-link ${l.id===current?'active':''}" href="${l.href}"><span class="nav-icon">${l.icon}</span><span>${l.label}</span></a>`).join('')}
  const brandEls = document.querySelectorAll('[data-brand]');brandEls.forEach(el=>el.textContent=cfg.name);
  const title = document.querySelector('title');if(title && !title.textContent.includes(cfg.name)) title.textContent = `${cfg.name} | ${title.textContent}`;
  const toast = document.getElementById('toast');
  window.showToast = function(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2500)};
  window.money = n => `${cfg.currency} ${Number(n||0).toFixed(2)}`;
  window.getVenue = id => NUBA_DATA.venues.find(v=>v.id===id) || NUBA_DATA.venues[0];
  window.go = path => window.location.href = `${root}${path}`;
  window.query = key => new URLSearchParams(location.search).get(key);
  window.renderCartCount = function(){const count=NUBA_STORE.cart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll('[data-cart-count]').forEach(el=>{el.textContent=count;el.classList.toggle('hidden',!count)})};
  window.renderCartCount();
})();
