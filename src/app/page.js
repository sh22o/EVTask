
/* creat Home page for App to go to product list by callToAction 
create style by Tailwindcss  */ 

import Link from 'next/link';

export default function Home() {
  const image = "https://i.ibb.co/b5F7bC5/online-6817350-1280.jpg"; // Cover  image URL

  return (
    <div className="relative h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* But  Overlay on image cover  */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content on cover image  */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Welcome to Our Store</h1>
        <p className="text-xl mb-6 text-center">Discover the latest products and enjoy our special offers.</p>
        
        {/* create redirect link to products list */ }
        <Link href="/products">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition text-lg">
            Go to Product List
          </button>
        </Link>
      </div>
    </div>
  );
}

