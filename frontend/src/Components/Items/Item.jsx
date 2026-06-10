import React, { useState } from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import dummy_men from '../Assets/dummy_men.png'
import dummy_women from '../Assets/dummy_women.png'
import dummy_kid from '../Assets/dummy_kid.png'

const Item = (props) => {
  const [imgError, setImgError] = useState(false);

  // Determine fallback image based on name or category
  const categoryStr = (props.category || props.name || "").toLowerCase();
  let fallbackImage = dummy_women; // default to women/dresses
  if (categoryStr.includes('men') && !categoryStr.includes('women')) fallbackImage = dummy_men;
  if (categoryStr.includes('kid') || categoryStr.includes('boy') || categoryStr.includes('girl')) fallbackImage = dummy_kid;

  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}>
            <img 
                onClick={()=>window.scrollTo(0,0)}
                src={imgError || !props.image ? fallbackImage : props.image} 
                alt={props.name} 
                onError={() => setImgError(true)}
            />
        </Link>
        <p>{props.name}</p>
        <div className='item-prices'>
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
        <div className="item-actions" style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
            <Link to={`/product/${props.id}`}>
                <button style={{padding: '8px 16px', background: '#ff4141', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>View Details</button>
            </Link>
        </div>
    </div>
  )
}

export default Item