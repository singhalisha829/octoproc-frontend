const poBOdy = {
  reference_no: "",
  vendor_quotation_id: 1,
  expected_delivery_date: "",
  shipping_address: "",
  billing_address: "",
  shipping_cost: 0.0,
  payment_terms: "",
  notes: "",
  items: [
    {
      quotation_item_id: 1,
      notes: "",
    },
  ],
};



const result = {
  "id": 8,
  "status": "QUOTATION_RECIEVED",
  "created_by": 1,
  "updated_by": 3,
  "created_at": "2025-01-18T16:46:26.302322",
  "updated_at": "2025-01-18T16:56:06.582098",
  "is_deleted": false,
  "vendor": {
    "id": 1,
    "name": "ABC Pvt Ltd"
  },
  "items": [
    {
      "id": 9,
      "quantity": 12,
      "status": "ASSIGNED",
      "created_at": "2025-01-18T16:46:26.308555",
      "updated_at": "2025-01-18T16:46:26.308555",
      "created_by": 1,
      "updated_by": 1,
      "purchase_request_item": {
        "id": 11,
        "quantity": 12,
        "product": {
          "id": 1,
          "name": "Salted Cashews",
          "description": "Cashews, straight from the farms of Goa and roasted in himalayan pink salt",
          "unspsc_code": "343333233",
          "uom_id": 1,
          "version": "1",
          "hsn_code": "20081910",
          "manufacturer": {
            "id": 2,
            "name": "Tata",
            "code": "TATA"
          },
          "uom": {
            "id": 1,
            "name": "KILOGRAM",
            "type": "WEIGHT",
            "symbol": "KG",
            "validation_type": "FLOAT"
          },
          "unspsc": {
            "code": "343333233",
            "name": "checking"
          },
          "manufacturer_sku_code": "TATA",
          "metadata": null,
          "is_deleted": false,
          "created_at": "2024-12-14T10:17:22.789087",
          "updated_at": "2024-12-14T10:17:22.789087"
        },
        "assigned_quantity": 12,
        "status": "VENDOR_ASSIGNED",
        "created_at": "2025-01-18T16:46:03.913410",
        "updated_at": "2025-01-18T16:46:26.314711",
        "created_by": 1,
        "updated_by": 1
      },
      quotation: {
        "id": 9,
        "status": "PENDING",
        "net_amount": 1200,
        "tax_amount": 216,
        "total_amount": 1416,
        "file_url": "",
        "additional_notes": "...",
        "items": [
          {
            "id": 11,
            "assignment_item_id": 9,
            "unit_price": 100,
            "quantity": 12,
            "net_amount": 1200,
            "tax_amount": 216,
            "total_amount": 1416,
            "additional_notes": "..."
          }
        ]
      }
    }
  ],
  "quotations": [
    // this remains same remains same
  ]
}