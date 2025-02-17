import CategoryCard from "../CategoryCard/CategoryCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { CategoriesContext } from "../../Context/CategoriesContext";

export default function Categories() {
  document.title="Categories"
  const { getAllSubCategory, getSpecificCategory } = useContext(CategoriesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [error, setError] = useState(null);

  async function getCategories() {
    try {
      setIsLoadingCategories(true);
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error Fetching Categories:", error);
      setError("Failed to fetch categories.");
    } finally {
      setIsLoadingCategories(false);
    }
  }

  async function handleGetSpecificCategory(_id) {
    try {
      setIsLoadingSubcategories(true);
      const categoryResponse = await getSpecificCategory(_id);
      setSelectedCategory(categoryResponse.data.data);
      const subcategoryResponse = await getAllSubCategory();
      if (subcategoryResponse.data?.data) {
        const filteredSubcategories = subcategoryResponse.data.data.filter(
          (sub) => sub.category === _id
        );
        setSubcategories(filteredSubcategories);
      }
    } catch (error) {
      console.error("Error fetching category or subcategories:", error);
      setError("Failed to fetch category or subcategories.");
    } finally {
      setIsLoadingSubcategories(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="lg:py-24">
        <div className="relative py-16">
          {isLoadingCategories ? (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
              <FaSpinner className="loaderIcon text-white text-5xl" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div>
              <div className="grid gap-10 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                  <CategoryCard
                    key={c._id}
                    onClick={() => handleGetSpecificCategory(c._id)}
                    category={c}
                  />
                ))}
              </div>
              {selectedCategory && (
                <div className="mt-10">
                  <h2 className="text-2xl mb-7 font-bold text-green-500">
                    Subcategories for {selectedCategory.name}
                  </h2>
                  <div className="grid gap-7 justify-center items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 mx-auto">
                    {isLoadingSubcategories ? (
                      <div className="flex justify-center items-center">
                        <FaSpinner className="text-2xl text-gray-500 animate-spin" />
                      </div>
                    ) : subcategories.length > 0 ? (
                       subcategories.map((sub) => (
                        <div key={sub._id} className="p-5 border rounded-md shadow-sm card transition-all duration-500">
                          <h3 className="text-lg font-semibold text-center">{sub.name}</h3>
                        </div>
                      ))
                     
                    ) : (
                      <p className="text-lg text-gray-500">No subcategories available.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
