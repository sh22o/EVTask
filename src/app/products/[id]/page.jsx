
/* ProductDetail Component

This component is responsible for displaying 
the detailed information of a specific product fetched from 
the Fake Store API based on the product ID obtained from the URL parameters. 

*/





'use client'
import { useParams } from 'next/navigation'; // Import useParams to access URL parameters
import { useState, useEffect } from 'react';  
import Spinner from "../../_components/spinner"



export default function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); //   State to store the fetched product details
  const [loading, setLoading] = useState(true); //  State to manage loading status
  const [error, setError] = useState(null); //  State to manage error messages


  /*useEffect hook to fetch product details 
    when the component mounts */ 

  useEffect(() => {
    // Check if the product ID exists
    if (id) { 
      const fetchProduct = async () => {
        try {

         // Fetch product data from the Fake Store API using the product ID
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          
          // Check if the response is not ok and throw an error if so

          if (!response.ok) {
            throw new Error(`Failed to fetch product with id: ${id}`);
          }

          const data = await response.json(); // Parse the response to JSON
          setProduct(data); // Update the product state with the fetched data
        } catch (err) {
          setError(err.message); // Set the error message if fetching fails
        } finally {
          setLoading(false); // Set loading to false after the fetch  completes
        }
      };

      fetchProduct(); //Call the fetchProduct 
    }
  }, [id]); // id for product  

  // when loading spinner 
  if (loading) return <Spinner></Spinner>; 
    // If there is an error, display the error message
  if (error) return <p>Error: {error}</p>; 
    // If no product is found, display a message 
  if (!product) return <p>No product found.</p>;

  // Render the product details 
  return (
    <div className="max-w-6xl mx-auto my-10 p-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="rounded-lg shadow-lg object-cover h-96 w-96"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          
          <p className="text-2xl text-gray-600 mb-2">Price: ${product.price}</p> 
          <p className="text-yellow-500">Rating: {product.rating.rate} ★</p>


          <p className="text-lg text-gray-700 mb-4">{product.description}</p>


          {/* Buy Now Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
