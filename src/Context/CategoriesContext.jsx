import axios from "axios";
import { createContext } from "react";

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {
  function getSpecificCategory(_id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${_id}`)
      .then((r) => r)
      .catch((e) => {
        throw new Error(e);
      });
  }

  function getAllSubCategory() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
      .then((r) => r)
      .catch((e) => {
        throw new Error(e);
      });
  }

  function getSpecificSubCategory(_id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/subcategories/${_id}`)
      .then((r) => r)
      .catch((e) => {
        throw new Error(e);
      });
  }



  return (
    <CategoriesContext.Provider
      value={{
        getAllSubCategory,
        getSpecificSubCategory,
        getSpecificCategory,
       
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
