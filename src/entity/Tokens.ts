import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne} from "typeorm";
import {User} from './User'
@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(type => User,user => user.token)
    user:User
    @Column("text")
    token	:string
    @Column()
    type	:string
    @Column()
    expired : Date
    @CreateDateColumn({type: "timestamp"})
      created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
      updated_at: Date;
  


}
