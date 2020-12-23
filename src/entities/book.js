import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Book{
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar", {length:125})
  title="";

  @Column("varchar", {length:125, unique:true, nullable:false})
  isbn="";

  @Column("varchar", {length:125})
  author="";
}