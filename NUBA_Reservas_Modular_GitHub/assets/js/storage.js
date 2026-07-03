window.NUBA_STORE = {
  get(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}},
  set(key, value){localStorage.setItem(key, JSON.stringify(value));return value},
  remove(key){localStorage.removeItem(key)},
  cart(){return this.get('nuba_cart', [])},
  setCart(items){return this.set('nuba_cart', items)},
  bookings(){return this.get('nuba_bookings', [])},
  setBookings(items){return this.set('nuba_bookings', items)},
  draft(){return this.get('nuba_draft', null)},
  setDraft(value){return this.set('nuba_draft', value)}
};
