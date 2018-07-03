import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title	:string
      @CreateDateColumn({type: "timestamp"})
      created_at: Date;
      @UpdateDateColumn({type: "timestamp"})
      updated_at: Date;
  


}
