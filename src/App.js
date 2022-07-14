import { useEffect, useState } from 'react';

import { Cart } from './components/Cart';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { Product } from './components/Product';

function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePrice, setActivePrice] = useState('');
  const [isShowCart, setIsShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const data = await fetch('https://phones-dev.herokuapp.com/api/phones');
        const listProducts = await data.json();

        setProducts(listProducts.data);
        setFilters(listProducts.data);

        setIsLoading(false);
      } catch (error) {
        console.log('ERROR DATA PRODUCTS', error)

        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //* HANDLE ADD TO CART
  const handleAddToCart = product => {
    setCart(prev => {
      const findProductInCart = prev.find(item => item.id === product.id);

      if (findProductInCart) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      }

      //* FIRT
      return [...prev, { ...product, amount: 1 }];
    })
  };

  //* HANDLE REMOVE FROM CART
  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      return prev.reduce((cal, item) => {
        if (item.id === id) {
          if (item.amount === 1) return cal;

          return [...cal, { ...item, amount: item.amount - 1 }]
        }

        return [...cal, { ...item }];
      }, [])
    })
  }

  return (
    <div className="app">
      <div className="bg-red-700">
        <Header
          cart={cart}
          setIsShowCart={setIsShowCart}
        />
      </div>

      <div className="container mx-auto my-4">
        <Filters
          products={products}
          setFilters={setFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activePrice={activePrice}
          setActivePrice={setActivePrice}
        />
      </div>

      <div className="flex flex-wrap my-4 container mx-auto">
        {filters.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {isShowCart && (
        <Cart
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          cart={cart}
          setIsShowCart={setIsShowCart}
        />
      )}

      {isLoading && (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default App;
