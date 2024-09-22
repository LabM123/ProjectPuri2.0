import { Order } from "src/orders/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    phone_number: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}