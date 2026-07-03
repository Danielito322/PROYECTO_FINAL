window.NUBA_STORE=(()=>{
  const K='nuba_final_mobile_v2';
  const blank=()=>({role:'client',cart:[],bookings:[],pending:null,provider:null,reviews:[],admin:{venues:[],users:[],reports:[]}});
  const read=()=>{try{return {...blank(),...(JSON.parse(localStorage.getItem(K))||{})}}catch{return blank()}};
  const save=s=>localStorage.setItem(K,JSON.stringify(s));
  function state(){
    const s=read();
    s.cart??=[];s.bookings??=[];s.reviews??=[];s.admin??={venues:[],users:[],reports:[]};
    return s;
  }
  function patch(fn){const s=state();fn(s);save(s);return s}
  function initialProvider(){return{
    name:'Arena Sur Puno',category:'deportes',type:'Cancha de fútbol 6',address:'Jr. Los Incas · Puno',
    description:'Cancha de césped sintético con atención por reservas.',
    image:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1000&q=85',
    store:true,openDays:{lun:true,mar:true,mie:true,jue:true,vie:true,sab:true,dom:true},hours:'08:00 - 22:00',
    products:NUBA_DATA.products.filter(p=>p.venue==='arena-sur')
  }}
  function demoBooking(){return{
    id:'r-demo-01',code:'NUBA-PUNO-4821',venueId:'arena-sur',venue:'Arena Sur Puno',category:'deportes',
    date:new Date(Date.now()+86400000).toISOString().slice(0,10),prettyDate:'Mañana',time:'18:00',base:78,
    extras:[{name:'Balón oficial',price:12}],total:90,image:NUBA_DATA.getVenue('arena-sur').image,
    status:'confirmed',payment:'Yape',createdAt:Date.now()-3600000
  }}
  function demoReviews(){return[
    {id:'rv-1',venueId:'arena-sur',venue:'Arena Sur Puno',bookingId:'hist-1',name:'Valeria C.',rating:5,comment:'La cancha estaba lista, iluminada y el proceso de ingreso con QR fue muy rápido.',createdAt:Date.now()-86400000*2,status:'published',reported:false,reply:'Gracias por elegirnos, Valeria.'},
    {id:'rv-2',venueId:'arena-sur',venue:'Arena Sur Puno',bookingId:'hist-2',name:'Jorge M.',rating:4,comment:'Buen espacio para jugar. Sería ideal tener más horarios temprano.',createdAt:Date.now()-86400000*6,status:'published',reported:false,reply:''},
    {id:'rv-3',venueId:'lumen-studio',venue:'Lumen Beauty Studio',bookingId:'hist-3',name:'Mariana R.',rating:5,comment:'Atención puntual y el resultado fue tal como lo pedí.',createdAt:Date.now()-86400000*8,status:'published',reported:false,reply:'Muchas gracias por tu reseña.'},
    {id:'rv-4',venueId:'punto-play',venue:'Punto Play Arcade',bookingId:'hist-4',name:'Luis P.',rating:3,comment:'La experiencia estuvo bien, pero una consola tuvo demora al inicio.',createdAt:Date.now()-86400000*3,status:'reported',reported:true,reportReason:'El proveedor solicitó revisión de la incidencia.',reply:''}
  ]}
  function ensureReviews(){
    const s=state();
    if(!s.reviews.length){s.reviews=demoReviews();save(s)}
    return s.reviews;
  }
  function initialAdmin(){return{
    venues:[
      {id:'a1',name:'Nova Beauty Lab',category:'Belleza',owner:'Lucía Torres',status:'pending',image:'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=500&q=80'},
      {id:'a2',name:'Pixel Zone',category:'Entretenimiento',owner:'Marco Rojas',status:'pending',image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80'}
    ],
    users:[
      {id:'u1',name:'Daniel Apaza',email:'daniel@unap.edu.pe',status:'active',role:'Cliente'},
      {id:'u2',name:'Lucía Torres',email:'lucia@nubabeauty.pe',status:'active',role:'Proveedor'},
      {id:'u3',name:'Marco Rojas',email:'marco@pixelzone.pe',status:'review',role:'Proveedor'}
    ],
    reports:[
      {id:'rep1',title:'Horario mostrado no coincide',place:'Arena Sur Puno',status:'open'},
      {id:'rep2',title:'Solicitud de revisión de perfil',place:'Marea Barber Club',status:'open'}
    ]
  }}
  return{
    getRole:()=>state().role||'client',setRole:r=>patch(s=>s.role=r),
    getPending:()=>state().pending,setPending:p=>patch(s=>s.pending=p),clearPending:()=>patch(s=>s.pending=null),
    getCart:()=>state().cart,addCart:(id,q=1)=>patch(s=>{const x=s.cart.find(i=>i.id===id);x?x.qty+=q:s.cart.push({id,qty:q})}),setCart:cart=>patch(s=>s.cart=cart),cartCount:()=>state().cart.reduce((n,i)=>n+i.qty,0),
    getBookings:()=>{const b=state().bookings;return b.length?b:[demoBooking()]},setBookings:b=>patch(s=>s.bookings=b),addBooking:b=>patch(s=>{s.bookings=[b,...s.bookings]}),
    getProvider:()=>state().provider||initialProvider(),setProvider:p=>patch(s=>s.provider=p),
    getReviews:(venueId,includeModeration=false)=>ensureReviews().filter(r=>(!venueId||r.venueId===venueId)&&(includeModeration||r.status==='published')),
    getReviewById:id=>ensureReviews().find(r=>r.id===id),
    hasReview:bookingId=>ensureReviews().some(r=>r.bookingId===bookingId),
    addReview:r=>patch(s=>{s.reviews??=[];s.reviews.unshift({id:'rv-'+Date.now(),status:'published',reported:false,createdAt:Date.now(),reply:'',...r})}),
    setReviews:reviews=>patch(s=>s.reviews=reviews),
    updateReview:(id,patchData)=>patch(s=>{s.reviews=(s.reviews||[]).map(r=>r.id===id?{...r,...patchData}:r)}),
    getAdmin:()=>{const s=state();if(!s.admin.venues?.length&&!s.admin.users?.length&&!s.admin.reports?.length){s.admin=initialAdmin();save(s)}return s.admin},
    setAdmin:a=>patch(s=>s.admin=a),
    reset:()=>{localStorage.removeItem(K);location.href=(document.body.dataset.root||'')+'index.html'}
  };
})();
