import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { CategoryRepository } from "../repositories/category";
import { ProductCollectionService } from "@medusajs/medusa";

type Category = {
  name: string;
  id: string;
  parentid: string;
  code: string;
  order: string;
};

class CategoryService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;
  protected categoryRepository_: typeof CategoryRepository;
  protected productCollectionService_: ProductCollectionService;

  constructor({ categoryRepository, productCollectionService, manager }) {
    super({ categoryRepository, productCollectionService, manager });

    this.manager_ = manager;
    this.categoryRepository_ = categoryRepository;
    this.productCollectionService_ = productCollectionService;
  }

  async list() {
    const categoryRepository = this.manager_.withRepository(
      this.categoryRepository_
    );

    return await categoryRepository.find();
  }

  async create(data: Category) {
    const { name, id, code, parentid, order } = data;
    const categoryRepository = this.manager_.withRepository(
      this.categoryRepository_
    );

    const res = await this.findByCode(code);

    const category = await categoryRepository.create({
      name: name,
      code: id,
      slug: "",
      parent_id: parentid,
      order: Number(order),
      product_count: 0,
    });

    return await categoryRepository.save(category);
  }

  async find(name: string) {
    const categoryRepository = this.manager_.withRepository(
      this.categoryRepository_
    );

    return await categoryRepository.find({ where: { name: name } });
  }

  async findByCode(code: any) {
    const categoryRepository = this.manager_.withRepository(
      this.categoryRepository_
    );

    const find = await categoryRepository.find({
      where: { code: code },
    });

    return find;
  }

  async update(id: any, slug: any) {
    const categoryRepository = this.manager_.withRepository(
      this.categoryRepository_
    );

    const update = await categoryRepository.update(id, { slug: slug });

    return update;
  }

  async updateProductCount(id: number, count: number) {
    const categoryRepository = this.manager_.withRepository(
      this.categoryRepository_
    );

    const update = await categoryRepository.update(id, { product_count: count });

    return update;
  }

  async createCollection(props) {
    try {
      const collection = await this.productCollectionService_.retrieveByHandle(
        props.handle
      );
      return collection;
    } catch (e) {
      const collection = await this.productCollectionService_.create({
        title: props.title,
        handle: props.handle,
      });
      return collection;
    }
  }
}

export default CategoryService;
