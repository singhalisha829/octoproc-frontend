const ENTERPRISE_API_CONSTANT = "/enterprise";

export const enterpriseQueries = {
  client: {
    addClient: {
      key: "add-client",
      endpoint: `${ENTERPRISE_API_CONSTANT}/client/`,
    },
    updateClient: {
      key: "update-client",
      endpoint: `${ENTERPRISE_API_CONSTANT}/client/`,
    },
    getClients: {
      key: "get-clients",
      endpoint: `${ENTERPRISE_API_CONSTANT}/client/filter/`,
    },
    getClient: {
      key: "get-client",
      endpoint: `${ENTERPRISE_API_CONSTANT}/`,
    },
  },
  warehouse: {
    addWarehouse: {
      key: "add-warehouse",
      endpoint: `${ENTERPRISE_API_CONSTANT}/warehouse/`
    },
    getWarehouses: {
      key: "getWarehouses",
      endpoint: `${ENTERPRISE_API_CONSTANT}/warehouse/filter`
    }
  }
};
