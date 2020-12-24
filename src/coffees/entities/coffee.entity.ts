import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flavour } from './flavour.entity';

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

    @JoinTable()
    @ManyToMany(type => Flavour, flavour => flavour.coffees)
    flavours: string[];
}
