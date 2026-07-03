(function(){
  const cfg = window.NUBA_CONFIG || {brand:'NUBA'};
  const icons = {
    home:'<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-6h6v6"/>',
    compass:'<circle cx="12" cy="12" r="8.5"/><path d="m15.6 8.4-2.2 4.2-4.2 2.2 2.2-4.2z"/>',
    calendar:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 9h17M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01"/>',
    user:'<circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    bell:'<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    search:'<circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 4.3 4.3"/>',
    pin:'<path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    sport:'<circle cx="12" cy="12" r="8.5"/><path d="m8.5 5.5 3.5 2 3.5-2M7.2 10.2 10 12l-1.2 4M16.8 10.2 14 12l1.2 4M10 12h4"/>',
    beauty:'<path d="M12 3v18M5.6 6.4l12.8 12.8M18.4 6.4 5.6 19.2"/><circle cx="12" cy="12" r="3"/>',
    entertainment:'<path d="M4 13.5h16l-1.2 5.1a2.2 2.2 0 0 1-2.1 1.6h-9.4a2.2 2.2 0 0 1-2.1-1.6z"/><path d="m8.5 13.5 1-8h5l1 8M9 17h3M10.5 15.5v3M16 16.5h.01M18 18h.01"/>',
    bag:'<path d="M5 8h14l-1 12H6z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/>',
    store:'<path d="M4 10h16v10H4z"/><path d="M3 10 5 4h14l2 6M7 14h4v6M14 14h3"/>',
    wallet:'<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19v15H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 8h14v6h-4a2 2 0 0 0 0 4h4"/><circle cx="14" cy="16" r=".7" fill="currentColor"/>',
    qr:'<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2v2h-2zM18.5 14.5h2v6h-2zM14.5 18.5h2v2h-2z"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
    heart:'<path d="M20.8 8.5c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11a4.6 4.6 0 0 1 8.8-2.1 4.6 4.6 0 0 1 8.8 2.1Z"/>',
    check:'<path d="m5 12 4.2 4.2L19.5 6"/>',
    clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.4 2"/>',
    card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2.1-1.2L14 3h-4l-.4 2.6a7 7 0 0 0-2.1 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2.1 1.2L10 21h4l.4-2.6a7 7 0 0 0 2.1-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"/>',
    shield:'<path d="M12 3 20 6v5.5c0 4.6-3.2 7.8-8 9.5-4.8-1.7-8-4.9-8-9.5V6z"/><path d="m8.7 12 2.2 2.2 4.4-4.4"/>',
    users:'<circle cx="9" cy="8.5" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.5a2.8 2.8 0 0 1 0 5.5M17 15a4.7 4.7 0 0 1 3.5 4.5"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    camera:'<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3"/>',
    ticket:'<path d="M4 8.5a2.5 2.5 0 0 0 0 5v3h16v-3a2.5 2.5 0 0 0 0-5v-3H4z"/><path d="M12 6v12"/>',
    chart:'<path d="M5 20V10M12 20V4M19 20v-7"/>',
    admin:'<path d="M12 3 20 6v5.5c0 4.6-3.2 7.8-8 9.5-4.8-1.7-8-4.9-8-9.5V6z"/><circle cx="12" cy="11" r="2.5"/><path d="M8.5 17a3.5 3.5 0 0 1 7 0"/>'
  };
  function icon(name, cls='') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.home}</svg>`; }
  function money(n){return new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN',minimumFractionDigits:0}).format(Number(n||0));}
  function get(key, fallback){ try{const v=localStorage.getItem('nuba_'+key);return v?JSON.parse(v):fallback}catch{return fallback} }
  function set(key, value){localStorage.setItem('nuba_'+key, JSON.stringify(value));}
  const venues = [
    {id:'altiplano-arena',name:'Altiplano Arena',category:'deportes',label:'Deportes',type:'Cancha de fútbol 6',address:'Av. Simón Bolívar 1640, Puno',distance:'0.9 km',rating:'4.9',price:65,unit:'por hora',availability:'Hoy · 19:00 libre',photo:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1100&q=84',gallery:['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80','https://images.unsplash.com/photo-1518605368461-929b7f8a3b52?auto=format&fit=crop&w=600&q=80'],coords:{lat:-15.8356,lng:-70.0274},shop:true,products:[{id:'ball',name:'Balón profesional',price:49,photo:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=450&q=80'},{id:'water',name:'Pack hidratación',price:12,photo:'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=450&q=80'}],extras:[{id:'ball-rent',name:'Balón para el partido',price:8},{id:'referee',name:'Árbitro certificado',price:35},{id:'water-pack',name:'Agua para el equipo',price:12}]},
    {id:'nordic-barber',name:'Nordic Barber Studio',category:'belleza',label:'Belleza',type:'Barbería premium',address:'Jr. Lima 522, Puno',distance:'1.2 km',rating:'4.8',price:35,unit:'por servicio',availability:'Hoy · 16:30 libre',photo:'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1100&q=84',gallery:['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80','https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'],coords:{lat:-15.8446,lng:-70.0156},shop:true,products:[{id:'pomade',name:'Pomada mate',price:32,photo:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=450&q=80'},{id:'beard-oil',name:'Aceite para barba',price:38,photo:'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=450&q=80'}],extras:[{id:'beard',name:'Perfilado de barba',price:15},{id:'wash',name:'Lavado y masaje',price:10}]},
    {id:'pixel-arcade',name:'Pixel Arcade Lounge',category:'entretenimiento',label:'Entretenimiento',type:'Arcade y sala gamer',address:'Jr. Arequipa 240, Puno',distance:'1.6 km',rating:'4.7',price:28,unit:'por sesión',availability:'Hoy · 18:00 libre',photo:'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1100&q=84',gallery:['https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80','https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80'],coords:{lat:-15.8290,lng:-70.0198},shop:false,products:[],extras:[{id:'snacks',name:'Combo snacks',price:14},{id:'second-control',name:'Control adicional',price:7}]},
    {id:'cumbre-fit',name:'Cumbre Fit Club',category:'deportes',label:'Deportes',type:'Gimnasio y funcional',address:'Av. La Torre 1010, Puno',distance:'2.0 km',rating:'4.6',price:20,unit:'por pase',availability:'Hoy · 20:00 libre',photo:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=84',gallery:['https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80'],coords:{lat:-15.8472,lng:-70.0364},shop:true,products:[{id:'strap',name:'Straps de entrenamiento',price:28,photo:'https://images.unsplash.com/photo-1517964603305-11c0f6f66012?auto=format&fit=crop&w=450&q=80'}],extras:[{id:'coach',name:'Sesión con coach',price:25}]}
  ];
  const categories={deportes:{title:'Deportes',subtitle:'Canchas, entrenamiento y movimiento.',icon:'sport'},belleza:{title:'Belleza',subtitle:'Cuidado personal y estilo.',icon:'beauty'},entretenimiento:{title:'Entretenimiento',subtitle:'Planes para disfrutar tu tiempo.',icon:'entertainment'}};
  function venueById(id){return venues.find(v=>v.id===id)||venues[0]}
  function qs(name){return new URLSearchParams(location.search).get(name)}
  function toast(message){let t=document.getElementById('toast');if(!t)return;t.innerHTML=icon('check','sm')+`<span>${message}</span>`;t.classList.add('show');clearTimeout(window.__nubaToast);window.__nubaToast=setTimeout(()=>t.classList.remove('show'),3000)}
  function currentRole(){return get('role','cliente')}
  function setRole(role){set('role',role)}
  window.NUBA={cfg,icon,money,get,set,venues,categories,venueById,qs,toast,currentRole,setRole};
})();
