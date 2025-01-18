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
    getVendorsAssignments: {
      key: "getVendorsAssignments",
      endpoint_start: "/purchase-request/",
      endpoint_end: "/vendor/assignments",
    },
    getVendorsAssignment: {
      key: "getVendorsAssignment",
      endpoint_start: "/purchase-request/",
      endpoint_end: "/vendor/assignment/",
    },
    assignVendors: {
      key: "assignVendor",
      endpoint: "/purchase-request/vendor/assign/item",
    },
    createPurchaseRequest: {
      key: "create-pr",
      endpoint: "/purchase-request/",
    },
    addItemInPR: {
      key: "add-item",
      endpoint: "/purchase-request/item",
    },
    removeItemFromPR: {
      key: "remove-item",
      endpoint: "/purchase-request/item/",
    },
    updateItemInPR: {
      key: "update-item",
      endpoint: "/purchase-request/item",
    },
    requestQuotation: {
      key: "requestQuotation",
      endpoint: "/purchase-request/quotation/request/",
    },
    uploadQuotation: {
      key: "uploadQuotation",
      endpoint: "/purchase-request/quotation/upsert/",
    },

    acceptQuotation: {
      key: "acceptQuotation",
      endpoint_start: "/purchase-request/quotation/",
      endpoint_end: "/approve",
    },
    rejectQuotation: {
      key: "rejectQuotation",
      endpoint_start: "/purchase-request/quotation/",
      endpoint_end: "/reject",
    },
  },
};
