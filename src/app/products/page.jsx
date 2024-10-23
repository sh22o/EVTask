/*
 Create a page for the product list to fetch and display all products 
  from the Fake Store API. This page includes a loading indicator while 
  the data is being fetched and handles potential errors during the fetch operation. 

*/ 

'use client'; // Indicates that this component is a client component in Next.js
import { useEffect, useState } from 'react';
import Link from 'next/link';  // import link  for client-side navigation
import Spinner from '../_components/spinner'

export default function ProductList() {
  const [products, setProducts] = useState([]); // State to store the fetched products from API 
  const [loading, setLoading] = useState(true); // State to manage loading status
 // useEffect hook to fetch products when the component mounts ( create it with empaty Array to check comp mount )
 // used use effect with Async and Await function to fetch API data 
  useEffect(() => {
    async function fetchProducts() {
      try {
       // Fetch data from the Fake Store API
        const res = await fetch('https://fakestoreapi.com/products'); 
        const data = await res.json(); // convert  response to JSON
        setProducts(data); // Update the products state to store products 
        setLoading(false); // Update loading false After data Loading 
      } catch (error) {
        console.error('Error fetching products:', error); // log if have error 
        setLoading(false); // update loading state to false if have error 
      }
    }
    fetchProducts(); // Call the fetchProducts function
  }, []); // use Empaty array to check comp is Amount 


  // use A spinner  component  IF  loading 
  if (loading) return <Spinner />;

  // return products cards use Tailwind classes 
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700 text-lg mb-4">{product.price} USD</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Buy Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
