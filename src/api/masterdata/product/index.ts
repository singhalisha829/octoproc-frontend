import { axiosInstance } from "@/api/axiosInstance";
import { Product } from "@/interfaces/Product";
import { productQuery } from "@/react-query/productQueries";

const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.post(productQuery.getProducts.endpoint, {
    unspsc_codes: [],
  });
  return data.data;
};
const addProduct = async (product: Product) => {
  return await axiosInstance.post(productQuery.addProduct.endpoint, product);
};
const deleteProduct = async (product: Product) => {
  return await axiosInstance.delete(
    `${productQuery.deleteProduct.endpoint}/${product.id}`
  );
};
const updateProduct = async () => {
  return await axiosInstance.put(productQuery.updateProduct.endpoint);
};

export { getProducts, addProduct, deleteProduct, updateProduct };
