import Image from "next/image";
import { Product } from "@/types/product";
import Button from "./Button";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const { addToCart } = useCart();

  const hasImage = product.images?.length > 0 && product.images[0] !== "";

  return (
    <div className="bg-white/50 dark:bg-zinc-900/60 backdrop-blur-md border border-neutral-200 dark:border-zinc-700 rounded-lg shadow p-4 space-y-4 transition hover:shadow-xl hover:scale-[1.02] duration-300">
      {hasImage ? (
        <Image
          src={product.images[0]}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-64 object-cover rounded"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMu"
          priority={priority} // Boost LCP for first few images
        />
      ) : (
        <div className="w-full h-64 bg-gray-300 dark:bg-zinc-700 rounded flex items-center justify-center text-sm text-gray-600">
          No Image
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-700 dark:text-gray-300">${product.price}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        <Button
          onClick={() => addToCart(product)}
          variant="primary"
          disabled={product.stock === 0}
          icon={<FaShoppingCart />}
          iconPosition="left"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
