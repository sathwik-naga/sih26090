/**
 * Craft Product Model Blueprint (Future-ready for MongoDB / PostgreSQL)
 */
export const ProductSchema = {
  id: String,
  name: String,
  category: String,
  craftType: String,
  artisanId: String,
  artisanName: String,
  artisanState: String,
  price: Number,
  wholesalePrice: Number,
  moq: Number,
  leadTime: String,
  materials: String,
  dimensions: String,
  weight: String,
  stockStatus: String,
  stockQuantity: Number,
  giTag: Boolean,
  story: String,
  careInstructions: String,
  images: Array,
  tags: Array,
  createdAt: Date,
};

export default ProductSchema;
