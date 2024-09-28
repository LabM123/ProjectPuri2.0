import { format } from "@formkit/tempo";
import { Order } from "src/orders/entities/order.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: true, default: format({ date: new Date, tz: 'America/Mexico_City', format: 'YYYY-MM-DDTHH:mm:ss' })})
    created_at: string;

    @Column({nullable: true})
    deleted_at: string;

    @Column({nullable: true})
    updated_at: string;

    @BeforeUpdate()
    adjustTimeZoneUpdate() {
        const nowInMexico = format({
            date: new Date,
            tz: 'America/Mexico_City',
            format: 'YYYY-MM-DDTHH:mm:ss'
        })
        this.updated_at = nowInMexico
    }
    
    @BeforeInsert()
    adjustTimeZoneCreated() {
        const nowInMexico = format({
            date: new Date,
            tz: 'America/Mexico_City',
            format: 'YYYY-MM-DDTHH:mm:ss'
        })
        this.created_at = nowInMexico
    }
}