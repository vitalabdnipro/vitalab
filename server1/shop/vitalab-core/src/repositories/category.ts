import { VitalabCategory } from "../models/category";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const CategoryRepository = dataSource.getRepository(VitalabCategory);

export default CategoryRepository;
