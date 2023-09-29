import 'bootstrap/scss/bootstrap.scss'
import { useEffect } from 'react';
import { useState } from 'react';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
const data = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
]

function HomeWork() {
  const [drinks] = useState(data);
  const [cart, setCart] = useState([])
  const [sum, setSum] = useState(0)
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState({})

  const addToCart = (drink) => {
    setCart([...cart, {
      ...drink,
      id: new Date().getTime(),
      quantity: 1,
      subtotal: drink.price,
    }])
  }

  const updateCart = (item, value) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: parseInt(value),
          subtotal: cartItem.price * parseInt(value)
        }
      }
      return cartItem
    })
    setCart(newCart)
  }

  const createOrder = () => {
    setOrder({
      id: new Date().getTime(),
      cart,
      description,
      sum
    })
    setCart([])
    setDescription('')
  }


  useEffect(() => {
    const total = cart.reduce((pre, next) => {
      return pre + next.subtotal
    }, 0)
    setSum(total)
  }, [cart])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <Products drinks={drinks} addToCart={addToCart} />
        </div>
        <div className="col-md-8">
          <Cart cart={cart} setCart={setCart} sum={sum} setDescription={setDescription} createOrder={createOrder} updateCart={updateCart} />
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-8">
          <Orders order={order} />
        </div>
      </div>
    </div>
  )
}

export default HomeWork;