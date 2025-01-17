const ENTERPRISE_API_CONSTANT = "/enterprise";

export const enterpriseQueries = {
  client: {
    addClient: {
      key: "add-client",
      endpoint: `${ENTERPRISE_API_CONSTANT}/client/`,
    },
    getClients: {
      key: "get-clients",
      endpoint: `${ENTERPRISE_API_CONSTANT}/client/filter/`,
    },
    getClient: {
      key: "get-clients",
      endpoint: `${ENTERPRISE_API_CONSTANT}/client/`,
    },
  },
};
