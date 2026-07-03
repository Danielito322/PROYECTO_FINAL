(function(){
  const N=window.NUBA;
  if(!N)return;
  const root=document.body.dataset.root||'';
  const page=document.body.dataset.page||'home';
  const nav=[
    ['home',root+'index.html','home','Inicio'],
    ['explore',root+'pages/explorar.html','compass','Explorar'],
    ['map',root+'pages/mapa.html','pin','Mapa'],
    ['bookings',root+'pages/mis-reservas.html','calendar','Reservas'],
    ['profile',root+'pages/perfil.html','user','Perfil']
  ];
  const navEl=document.getElementById('app-nav');
  if(navEl)navEl.className='app-nav',navEl.innerHTML=nav.map(([key,href,ico,label])=>`<a class="nav-link ${page===key?'active':''}" href="${href}">${N.icon(ico)}<span>${label}</span></a>`).join('');
  document.querySelectorAll('[data-brand]').forEach(el=>el.textContent=N.cfg.brand);
  document.querySelectorAll('[data-back]').forEach(el=>el.addEventListener('click',()=>history.back()));
  if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register((root||'')+'service-worker.js').catch(()=>{}));}
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-toast]');if(btn){e.preventDefault();N.toast(btn.dataset.toast)}
    const role=e.target.closest('[data-role]');if(role){N.setRole(role.dataset.role);N.toast('Cuenta '+role.dataset.role+' activada.');setTimeout(()=>location.href=role.dataset.next||'perfil.html',350)}
  });
})();
