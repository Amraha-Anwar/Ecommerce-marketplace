import { type SchemaTypeDefinition } from "sanity";
import { productSchema } from "./products";
import { categorySchema } from "./categories";
import subscriberSchema from './subscriber';
import orderSchema from './order';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, subscriberSchema, orderSchema],
};