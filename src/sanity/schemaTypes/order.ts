const orderSchema={
    name: "order",
    type: "document",
    title: "Orders",
    fields: [
      {
        name: "firstName",
        type: "string",
        title: "First Name",
      },
      {
        name: "lastName",
        type: "string",
        title: "Last Name",
      },
      {
        name: "email",
        type: "string",
        title: "Email",
      },
      {
        name: "phone",
        type: "string",
        title: "Phone",
      },
      {
        name: "address",
        type: "string",
        title: "Address",
      },
      {
        name: "city",
        type: "string",
        title: "City",
      },
      {
        name: "zipCode",
        type: "string",
        title: "Zip Code",
      },
      {
        name: "cartItems",
        type: "array",
        title: "Cart Items",
        of:[
          {
            type: "object",
            fields: [
              {
                name: "products",
                type: "reference",
                to: [{ type: "products" }],
              },
            ],
          },
        ],
      },
      {
        name: "total",
        type: "number",
        title: "Total Price",
      },
      {
        name: "orderDate",
        type: "datetime",
        title: "Order Date",
      },
      {
        name: "status",
        type: "string",
        title: "Order Status",
        options: {
          list : [
            {title: "Pending", value: "pending"},
            {title: "Processing", value: "processing"},
            {title: "Delivered", value: "delivered"},
          ],
          layout: "radio",
        },
        initialValue: "pending",
      },
    ]
  }

  export default orderSchema;
  