import axios from 'axios';

const api = axios.create({
  baseURL: "https://javarewards-api.onrender.com/"
})

interface Offer {
  img?: string;
  description: string;
  date?: string;
  name?: string;
}
export function getOffers() {
  return api.get('/shops/offers')
  .then(({ data: { offers } }: { data: { offers: Offer[] } }) => {
    return offers;
    })
}
export function getMenuByEmail(email:string) {
  return api.post('/shops/email',{
    email: email,
  })
  .then(({data:{shop}}) => {
    console.log(`fetching menu from ${email}`);
    
    const menu = shop[0].menu
    const menuWithQuantity = menu.map((item: {}) => ({ ...item, quantity: 0 }));
    return menuWithQuantity
    })
}
export function postOrder(order:{}){
  return api.post('/orders',order).then(({data}) => {
    console.log(data)
    return data.order})
}
export function getBusinessOrders(){
  return api.get('/orders?shop_id=1').then(({data}) => data)
}
export function updateOrderStatus(order_id:number){
  return api.patch('orders/status',{_id:order_id}).then(({data:{order}})=> order)
}

export function updateOffer(email,offer:{}){
 return api.patch("/shops/offers",{email:email,offers:offer}).then(({data})=> data.offers)
 .catch(err=> {console.log(err) 
  return err;
 })
}
