/* eslint-disable */
import React from 'react'
import styles from './ProductCards.module.scss'

export const ProductCards = React.memo(({ products }) => {
  console.log('ProductCard render')

  if (typeof products === 'undefined') return <div>Products list is empty</div>
  if (!products.length) return <div>Products list is empty</div>

  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <div className={styles.card}>
          <div className={styles.card__top}>
            <a href="#" className={styles.card__image}>
              <img src={product.pictures} alt={product.name} />
            </a>
            {product.discount > 0 ? <div class={styles.card__label}>{product.discount + "%"}</div> : null}

          </div>
          <div className={styles.card__bottom}>
            <div className={styles.card__price + " " + styles.discount}>{product.discount > 0 ? Math.ceil(product.price * (product.discount / 100)) : Math.ceil(product.price)}</div>
            <p className={styles.descr_price}>Цена</p>
            <a href="#" className={styles.card__title}>
              {product.name}
            </a>
            <p className={styles.card_descr}>{product.description}</p>
            <button className={styles.card__add}>В корзину</button>
          </div>
        </div>
      ))}
    </div>
  )
})
