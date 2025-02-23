import { axiosInstance } from "@/api/axiosInstance";
import { Product } from "@/interfaces/Product";
import { productQuery } from "@/react-query/productQueries";

const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.post(productQuery.getProducts.endpoint, {
    unspsc_codes: [],
  });
  return data.data || null;
};
const addProduct = (product: Product) => {
  return axiosInstance.post(productQuery.addProduct.endpoint, product);
};
const deleteProduct = (product: Product) => {
  return axiosInstance.delete(
    `${productQuery.deleteProduct.endpoint}/${product.id}`
  );
};
const updateProduct = () => {
  return axiosInstance.put(productQuery.updateProduct.endpoint);
};

export { getProducts, addProduct, deleteProduct, updateProduct };
