import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// sql table => coffees
// If you do not set the name, it will be the name of the class in lowercase
@Entity('coffees')
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', { nullable: true })
    flavours: string[];
}
