"use client";

import { useState } from "react";
import Image from "next/image";
import { HeartIcon } from "lucide-react";
import { ProductCardType } from "@/app/Types/projectCardType";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const [wishlist, setWishlist] = useState(false);
  const toggleWishlist = () => setWishlist(!wishlist);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-60">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-500 group-hover:scale-100"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-opacity-70 px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
            style={{ backgroundColor: product.categoryColor + "CC", color: "#fff" }}>
            {product.category}
          </span>
        </div>
        
        <button
          onClick={toggleWishlist}
          aria-label="Toggle Wishlist"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20"
        >
          <HeartIcon
            size={18}
            className={`${wishlist ? "fill-red-500 text-red-500" : "text-white"}`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
        
        {product.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {product.tags.map((tag, index) => (
              <span key={index} className="inline-flex rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          
          <button className="rounded-lg cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-gray-900">
           View More
          </button>
        </div>
      </div>
    </div>
  );
}