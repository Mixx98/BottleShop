"use strict";
import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    wine_type: String,
    origin: String,
    abv: Number,
    image_path: {
      type: String,
    },
  },
  { timestamps: true, }
);

export default ProductSchema;