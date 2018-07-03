import {Entity, PrimaryGeneratedColumn, Column,ManyToMany,JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Permission } from "./Permission";
@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;

    @ManyToMany(type => Permission)
    @JoinTable()
    has: Permission[];

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
  


}
