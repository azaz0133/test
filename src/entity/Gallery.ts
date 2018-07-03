import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Event} from './Event'
import {Article} from './Article'
@Entity()
export class Gallery {

    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
      image	:string
    @Column()
      name:string
    @ManyToOne(type => Event, event => event.galleries)
    event: Event;

    @ManyToOne(type => Article, article => article.galleries)
    article: Article;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
  


}
