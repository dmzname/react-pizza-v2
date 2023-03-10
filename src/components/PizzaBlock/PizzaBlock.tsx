import React from 'react';
import { Link } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { TProductItem } from '../../redux/slices/productSlice';

interface IPizzaBlock {
  data: TProductItem;
}

export const PizzaBlock = ({ data }: IPizzaBlock) => {
  const dispatch = useAppDispatch();

  const { id, title, price, imageUrl, sizes, types } = data;
  const item = useAppSelector((state) => state.cart.items.find((obj) => obj.id === id));

  const [sizesActive, setSizesActive] = React.useState(0);
  const [typesActive, setTypesActive] = React.useState(0);

  function handleAddToCart() {
    dispatch(addItem({
      id,
      title,
      price,
      imageUrl,
      type: typesActive,
      size: sizesActive,
      count: item ? item.count : 1,
    }));
  }

  return (
    <div className='pizza-block'>
      <Link to={`/product/${id}`}>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{title}</h4>
      </Link>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((item, index: number) => {
            return (
              <li
                onClick={() => setTypesActive(index)}
                key={index}
                className={typesActive === index ? 'active' : ''}>
                {!item ? 'Тонкое' : 'Традиционное'}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((item, index: number) => {
            return (
              <li
                onClick={() => setSizesActive(index)}
                key={index}
                className={sizesActive === index ? 'active' : ''}>
                {item} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <button className='button button--outline button--add' onClick={handleAddToCart}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {item && <i>{item.count}</i>}
        </button>
      </div>
    </div>
  );
};
