const subscriberSchema ={
    name: 'subscriber',
    title: 'Subscriber',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
      },
    ],
  };
  
  export default subscriberSchema;