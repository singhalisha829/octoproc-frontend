const ITEM_MASTER_CONSTANT = "/items-master";

export const productQuery = {
  getProducts: {
    Key: "products",
    endpoint: `${ITEM_MASTER_CONSTANT}/products/filter`,
  },
  addProduct: {
    key: "add-product",
    endpoint: `${ITEM_MASTER_CONSTANT}/products`,
  },
  deleteProduct: {
    key: "delete-product",
    endpoint: `${ITEM_MASTER_CONSTANT}/products`,
  },
  updateProduct: {
    key: "update-product",
    endpoint: `${ITEM_MASTER_CONSTANT}/products`,
  },
};
