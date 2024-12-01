export const MASTER_API_CONSTANT = "/platform-master";
export const UNSPSC_CONSTANT = "/unspsc";
export const masterApiQuery = {
  vendor: {
    getVendors: {
      Key: "vendors",
      endpoint: `${MASTER_API_CONSTANT}/vendor/`,
    },
    addVendors: {
      Key: "add-vendor",
      endpoint: `${MASTER_API_CONSTANT}/vendor/`,
    },
  },
  manufacturer: {
    addManufacturer: {
      Key: "add-manufactuerer",
      endpoint: `${MASTER_API_CONSTANT}/manufacturer/`,
    },
    getManufacturers: {
      Key: "manufactuerers",
      endpoint: `${MASTER_API_CONSTANT}/manufacturer/`,
    },
  },
  segment: {
    addSegment: {
      Key: "add-segment",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/segment/`,
    },
    getSegments: {
      Key: "get-segment",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/segment/`,
    },
  },
  class: {
    addClass: {
      Key: "add-class",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/class/`,
    },
    getClasses: {
      Key: "get-class",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/class/filter/`,
    },
  },
  commodity: {
    addCommodity: {
      Key: "add-commodity",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/commodity/`,
    },
    getCommodities: {
      Key: "get-class",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/commodity/filter/`,
    },
  },
  family: {
    addFamily: {
      Key: "add-family",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/family/`,
    },
    getFamilies: {
      Key: "get-family",
      endpoint: `${MASTER_API_CONSTANT}${UNSPSC_CONSTANT}/family/filter/`,
    },
  },
  country: {
    getCountries: {
      key: "countries",
      endpoint: `${MASTER_API_CONSTANT}/country/`,
    },
  },
  state: {
    getStates: {
      key: "states",
      endpoint: `${MASTER_API_CONSTANT}/state/`,
    },
  },
  city: {
    getCities: {
      key: "cities",
      endpoint: `${MASTER_API_CONSTANT}/city/`,
    },
  },
  uom: {
    getUomTypes: {
      key: "uomTypes",
      endpoint: `${MASTER_API_CONSTANT}/uom-types/`,
    },
    getUoms: {
      key: "uoms",
      endpoint: `${MASTER_API_CONSTANT}/uom/?type=`,
    },
  },
};
