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

    @Column({ default: 0 })
    recommendations: number;

    @JoinTable()
    @ManyToMany(
        type => Flavour,
        flavour => flavour.coffees,
        {
            cascade: true
        }
    )
    flavours: Flavour[];
}
