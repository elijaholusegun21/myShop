import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      setError("Please log in to add items to the cart.");
      return;
    }

    addToCart(product);
    setSuccessMessage("Item added to cart!");
    setTimeout(() => setSuccessMessage(""), 3000); 
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-64 sm:h-96 object-contain"
          />

          {/* Product Details */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">{product.description}</p>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart} 
              className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
