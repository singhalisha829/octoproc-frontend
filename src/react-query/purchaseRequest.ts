export const purchaseRequestQueries = {
  purchaseRequest: {
    getPurchaseRequests: {
      key: "purchase-requests",
      endpoint: "/purchase-request/filter/",
    },
    getPurchaseRequest: {
      key: "purchase-request",
      endpoint: "/purchase-request/",
    },
    getItemWiseAssignedVendor: {
      key: "getItemWiseAssignedVendor",
      endpoint_start: "/purchase-request/",
      endpoint_end: "/vendor/assignments/itemwise",
    },
    createPurchaseRequest: {
      key: "create-pr",
      endpoint: "/purchase-request/",
    },
  },
};
