import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";

@Entity()
export class VitalabCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  code: string;

  @Column({ type: "varchar", unique: true })
  slug: string;

  @Column({ type: "varchar" })
  parent_id: string;

  @Column({ type: "integer" })
  order: number;

  @Column({ type: "integer" })
  product_count: number;
}
