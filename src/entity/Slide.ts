import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
@Entity()
export class Slide {

    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
    name:string
     @Column("text")
     caption :string
    @Column()
    status:number
    @Column("text")
     src:string
     @CreateDateColumn({type: "timestamp"})
     created_at: Date;
     @UpdateDateColumn({type: "timestamp"})
     updated_at: Date;
  


}
