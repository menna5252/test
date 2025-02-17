import "../node_modules/flowbite/dist/flowbite.min.js";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "./index.css";
import App from "./App.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import CategoriesContextProvider from "./Context/CategoriesContext.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:5000*1000,
      select:data=> data.data.data,
      retry: ()=> confirm("error in data, try again?"),
      gcTime:5000*1000,
    }
  }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
        <UserContextProvider>
          <CartContextProvider>
             <WishListContextProvider>
              <CategoriesContextProvider>
                   <App />
              </CategoriesContextProvider>
             </WishListContextProvider>
          </CartContextProvider>
        
        </UserContextProvider>
     </QueryClientProvider>
    
    
  </StrictMode>,
)
