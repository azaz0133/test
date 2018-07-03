import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Gallery} from './Gallery'
import {Tag} from './Tag'
@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
      title	:string
    @Column("text")
      description:string
    @Column()
      type:string
      @Column("text")	
      pic:string
     @OneToMany(type => Gallery, gallery => gallery.article)
      galleries: Gallery[];

      @ManyToMany(type => Tag)
    @JoinTable()
    has: Tag[];
 
  @CreateDateColumn ({type: "timestamp"})
    created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
  


}
