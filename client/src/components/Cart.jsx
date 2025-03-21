import React from 'react'

const Cart = () => {
  return (
    <div className='w-full min-h-screen pt-[10vh]'>
        <h1 className='text-[4vw] text-center'>CHECKOUT</h1>
        
        <div className='w-full min-h-[20vh] px-12 flex flex-col'>
          <div className='w-full h-[5vh] flex border-b-2 border-zinc-500 text-[0.9vw]'>

            <div className='w-[60%]'><p>Products</p></div>
            <div className='w-[40%] flex justify-evenly'>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
          </div>
        {/*Cart item Cards*/}  
          <div className='w-full min-h-[30vh] flex'>
            <div className='w-[60%] h-[28vh] overflow-hidden gap-12 flex items-center justify-between px-12'>
              <div className='w-[11vw] h-[23vh] bg-zinc-500'>
                
              </div>
              <div className='h-[23vh] py-2 flex flex-col items-center gap-4'>
              <h2 className='font-bold '>Product Name</h2>
              <p>Product details</p>
              </div>
              
              <div className='w-[10%] h-[28vh] py-2 flex  items-center gap-4'><p>X</p></div>
            </div>
            <div className='w-[40%] h-[28vh] flex items-center justify-evenly'>
              <p>$100</p>
              <p>4 Qty</p>
              <p>$400</p>
            </div>
          </div>
          
        </div>


    </div>
  )
}

export default Cart;