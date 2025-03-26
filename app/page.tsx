"use client";
import ProductCard from "@/components/ProductCard";
import SkeletonProductCard from "@/components/SkeletonProductCard";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Button from "@/components/Button";

const limit = 8;

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = skip / limit + 1;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const data = await res.json();

      // console.log(data); //For debugging Data from API

      setProducts(data.products);
      setTotal(data.total);
      setIsLoading(false);
    };

    fetchProducts();
  }, [skip]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setSkip((prev) => prev + limit);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setSkip((prev) => Math.max(prev - limit, 0));
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r dark:from-orange-600 dark:via-red-400 dark:to-pink-500 from-cyan-500  to-purple-500">
          Welcome to Smurf!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Discover high-quality products just for you.
        </p>
      </div>

      <div>
        <h2 className="text-center text-2xl font-semibold  mb-6  text-transparent bg-clip-text bg-gradient-to-r dark:from-orange-600 dark:via-red-400 dark:to-pink-500 from-cyan-500  to-purple-500">
          Our Products
        </h2>

        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <SkeletonProductCard key={idx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex justify-center gap-4">
            <Button onClick={handlePrev} disabled={currentPage === 1} variant="secondary">
              Previous
            </Button>

            <Button onClick={handleNext} disabled={currentPage === totalPages} variant="secondary">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
