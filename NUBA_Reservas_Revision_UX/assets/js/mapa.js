document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('map-app');
  let category='todos';
  let latest=[];
  const positions=[['18%','24%'],['32%','68%'],['66%','31%'],['71%','75%'],['48%','49%'],['19%','79%']];
  const colorFor=cat=>cat==='belleza'?'#ff94c5':cat==='entretenimiento'?'#ffc76d':'#8d7cff';
  const iconFor=cat=>cat==='belleza'?'sparkles':cat==='entretenimiento'?'gamepad':'dumbbell';
  function filtered(){return NUBA_DATA.venues.filter(v=>category==='todos'||v.category===category)}
  function fallback(list){
    return `<div class="map-fallback" aria-label="Mapa demostrativo de Puno">${list.map((v,i)=>{
      const p=positions[i%positions.length];
      return `<button class="map-pin" style="top:${p[0]};left:${p[1]};background:linear-gradient(135deg,${colorFor(v.category)},#4f88ef)" data-map-venue="${v.id}" aria-label="Ver ${v.name}">${NUBA.icon(iconFor(v.category))}</button>`
    }).join('')}</div>`
  }
  function render(){
    latest=filtered();
    const active=latest[0];
    host.innerHTML=`<section class="page-content map-page"><header class="topbar"><div><div class="eyebrow">Puno, Perú</div><h1>Mapa de locales</h1><p>Filtra lugares y toca un marcador para ver su detalle.</p></div><button class="icon-btn" id="locate" aria-label="Centrar en Puno">${NUBA.icon('pin')}</button></header><div class="map-box"><div id="google-map">${fallback(latest)}</div><div class="map-filters"><button class="chip ${category==='todos'?'active':''}" data-cat="todos">Todo</button>${Object.entries(NUBA_DATA.categories).map(([id,c])=>`<button class="chip ${category===id?'active':''}" data-cat="${id}">${NUBA.icon(c.icon,'sm')}${c.label}</button>`).join('')}</div><div class="map-info" id="map-info"><strong>${active?.name||'Sin locales'}</strong><p>${active?`${active.type} · ${active.distance}`:'Cambia el filtro para ver locales.'}</p></div></div><div class="section-head"><h3>Locales en el mapa</h3><p>${latest.length} lugares</p></div><div class="map-venue-list">${latest.map(v=>`<a class="map-venue-row" href="detalle.html?venue=${v.id}"><img src="${v.image}" alt="${v.name}"><span><strong>${v.name}</strong><p>${v.type} · ${v.distance}</p></span>${NUBA.icon('chevronRight')}</a>`).join('')}</div></section>`;
    NUBA.refresh(host);
    initialiseGoogleMap(latest);
  }
  function updateInfo(v){
    const info=host.querySelector('#map-info');
    if(info)info.innerHTML=`<strong>${v.name}</strong><p>${v.type} · ${v.distance} · ${v.rating} / 5</p>`;
  }
  function googleIcon(color){
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="42" height="48" viewBox="0 0 42 48"><path d="M21 1C10.5 1 2 9.1 2 19.1c0 14.2 19 27.9 19 27.9s19-13.7 19-27.9C40 9.1 31.5 1 21 1z" fill="${color}" stroke="#fff" stroke-width="2"/><circle cx="21" cy="19" r="8" fill="#10223f"/></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
  async function initialiseGoogleMap(list){
    const mapElement=host.querySelector('#google-map');
    if(!mapElement)return;
    try{
      if(!window.google?.maps){
        const key=window.NUBA_MAPS?.apiKey||NUBA_CONFIG.mapsKey;
        if(!key) return;
        await loadGoogleMaps(key);
      }
      if(!window.google?.maps)return;
      mapElement.innerHTML='';
      const map=new google.maps.Map(mapElement,{center:NUBA_CONFIG.mapCenter,zoom:14,disableDefaultUI:true,gestureHandling:'cooperative',clickableIcons:false,styles:[
        {elementType:'geometry',stylers:[{color:'#183b52'}]},
        {elementType:'labels.text.fill',stylers:[{color:'#d5e8ff'}]},
        {elementType:'labels.text.stroke',stylers:[{color:'#102437'}]},
        {featureType:'road',elementType:'geometry',stylers:[{color:'#2d596f'}]},
        {featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#1b3b50'}]},
        {featureType:'water',elementType:'geometry',stylers:[{color:'#123a63'}]},
        {featureType:'poi',elementType:'labels.icon',stylers:[{visibility:'off'}]}
      ]});
      const bounds=new google.maps.LatLngBounds();
      list.forEach(v=>{
        const marker=new google.maps.Marker({position:{lat:v.lat,lng:v.lng},map,title:v.name,icon:{url:googleIcon(colorFor(v.category)),scaledSize:new google.maps.Size(34,40),anchor:new google.maps.Point(17,40)}});
        bounds.extend(marker.getPosition());
        marker.addListener('click',()=>{updateInfo(v);map.panTo(marker.getPosition());});
      });
      if(list.length>1) map.fitBounds(bounds,{top:58,right:24,bottom:85,left:24});
      else if(list[0]) map.setCenter({lat:list[0].lat,lng:list[0].lng});
      window.__NUBA_GOOGLE_MAP=map;
    }catch(error){
      // La vista demostrativa permanece disponible cuando la API no está habilitada o no tiene red.
      console.warn('NUBA Maps fallback:',error);
    }
  }
  function loadGoogleMaps(key){
    if(window.google?.maps)return Promise.resolve();
    if(window.__nubaGooglePromise)return window.__nubaGooglePromise;
    window.__nubaGooglePromise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly`;
      s.async=true;s.defer=true;
      s.onload=()=>resolve();s.onerror=()=>reject(new Error('No fue posible cargar Google Maps'));
      document.head.appendChild(s);
    });
    return window.__nubaGooglePromise;
  }
  host.addEventListener('click',event=>{
    const chip=event.target.closest('[data-cat]');
    if(chip){category=chip.dataset.cat;render();return;}
    const pin=event.target.closest('[data-map-venue]');
    if(pin){const venue=NUBA_DATA.getVenue(pin.dataset.mapVenue);updateInfo(venue);return;}
    if(event.target.closest('#locate')){
      const map=window.__NUBA_GOOGLE_MAP;
      if(map?.setCenter)map.setCenter(NUBA_CONFIG.mapCenter);
      NUBA.toast('Mapa centrado en Puno.');
    }
  });
  render();
});
