import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import { ProductCards } from '../productCards/ProductCards'
/* eslint-disable */
export function Products() {
  console.log('Products render')

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = api.checkTokenAvailabilityInLS()
    if (token) {
      api.getAllProductsRequest(token).then((response) => {
        console.log('request for Products from Products')
        setProducts(response.products)
      })
    } else {
      alert('Пожалуйста, авторизуйтесь')
      navigate('/')
    }
  }, [])

  return (
    <div className="container">
      <h1>Все товары</h1>
      <ProductCards products={products} />
    </div>
  )
}
