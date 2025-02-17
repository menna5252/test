import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(){
    const {isLoading,error,isError,data:products,isFetching}=useQuery({
        queryKey: ["getProducts"],
        queryFn: async () => axios.get(`https://ecommerce.routemisr.com/api/v1/products`),
      })
      return {isLoading,error,isError,products,isFetching}
}