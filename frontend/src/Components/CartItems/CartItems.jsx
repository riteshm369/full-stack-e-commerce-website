import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext)
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        if(address && cardNumber) {
            setPaymentCompleted(true);
        }
    };

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
            return <div key={e.id}>
            <div className="cartitems-format cartitems-format-main">
            <img src={e.image} alt="" className='carticon-product-icon'/>
            <p>{e.name}</p>
            <p>${e.new_price}</p>
            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
            <p>${e.new_price*cartItems[e.id]}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
        </div>
        <hr />
        </div>
            }
            return null;
          })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart Totals</h1>
            <div>
            <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
            </div>
        </div>
        {paymentCompleted ? (
            <div className="payment-success" style={{background: '#d4edda', color: '#155724', padding: '20px', borderRadius: '5px', marginTop: '20px'}}>
                <h3 style={{marginTop: 0}}>Payment completed successfully!</h3>
                <p>Card Ending in: **** {cardNumber.slice(-4) || '1234'}</p>
                <p>Your product is delivering in 2 days to: <strong>{address}</strong></p>
            </div>
        ) : isCheckingOut ? (
            <form onSubmit={handleCheckoutSubmit} style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <h3>Enter Payment Details</h3>
                <input required type="text" placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px'}} />
                <input required type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={{padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px'}} />
                <button type="submit" style={{width: '320px', padding: '12px', background: '#ff4141', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px', fontSize: '16px', fontWeight: 'bold'}}>PAY NOW</button>
            </form>
        ) : (
            <button onClick={() => setIsCheckingOut(true)}>PROCEED TO CHECKOUT</button>
        )}
    </div>
    <div className="cartitems-promocode">
        <p>If you have a promo code, Enter it here</p>
        <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
        </div>
    </div>
</div>
</div>
  )
}

export default CartItems