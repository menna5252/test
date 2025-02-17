import React from "react";

export default function BrandCard({ brand, onClick }) {
  return (
    <div 
      className="rounded-md border-2 border-gray-300 hover:shadow-xl hover:border-green-400 transition-all duration-500 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img className="block w-full" src={brand.image} alt={brand.name} />
      <h6 className="pb-6 text-center text-green-500">{brand.name}</h6>
    </div>
  );
}
