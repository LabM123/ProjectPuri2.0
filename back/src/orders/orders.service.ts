import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { format } from '@formkit/tempo';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>
  ) {}

  async createOrderService(createOrderDto: CreateOrderDto) {
    try {
      const foundedUser = await this.usersRepository.findOne({
        where: { id: createOrderDto.user_id }
      });
      if (!foundedUser) throw new BadRequestException('Usuario no encontrado');

      const newOrder = this.ordersRepository.create(createOrderDto);
      newOrder.user = foundedUser;
      await this.ordersRepository.save(newOrder);

      return this.findOrdersByUserIdService(foundedUser.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllOrdersService() {
    try {
      const allOrders = await this.ordersRepository.find({ relations: ['user'] });
      const allFilteredOrders = allOrders.map((order) => {
        return {...order, user: {...order.user, password: null}}
      })
      return allFilteredOrders
      return allOrders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOrdersByUserIdService(id: string) {
    try {
      const foundedUser = await this.usersRepository.findOne({ where: { id } });
      if (!foundedUser) throw new NotFoundException('Usuario no encontrado');

      const allOrdersOfUser = await this.ordersRepository.find({
        where: { user: { id } }
      });

      return allOrdersOfUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOrderByIdService(id: string) {
    try {
      const foundedOrder = await this.ordersRepository.findOne({
        where: { id }
      });
      if (!foundedOrder) throw new NotFoundException('Orden no encontrada');

      return foundedOrder;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrderService(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const foundedOrder = await this.ordersRepository.findOne({ where: { id } });
      if (!foundedOrder) throw new NotFoundException('Orden no encontrada');

      const updated_at = format({
        date: new Date,
        tz: 'America/Mexico_City',
        format: 'YYYY-MM-DDTHH:mm:ss'
      })
      const updatedOrder = await this.ordersRepository.update(id, {...updateOrderDto, updated_at});
      if (updatedOrder.affected <= 0) throw new InternalServerErrorException('Orden no actualizada');

      return this.findOrdersByUserIdService(foundedOrder.user_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cancelOrderService(id: string) {
    try {
      const foundedOrder = await this.ordersRepository.findOne({ where: { id } });
      if (!foundedOrder) throw new NotFoundException('Orden no encontrada');

      const updated_at = format({
        date: new Date,
        tz: 'America/Mexico_City',
        format: 'YYYY-MM-DDTHH:mm:ss'
      })
      const canceledOrder = await this.ordersRepository.update(id, { status: 'Cancelado', updated_at });
      if (canceledOrder.affected <= 0) throw new InternalServerErrorException('Orden no actualizada');

      return this.findOrdersByUserIdService(foundedOrder.user_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async pendingOrderService(id: string) {
    try {
      const foundedOrder = await this.ordersRepository.findOne({ where: { id } });
      if (!foundedOrder) throw new NotFoundException('Orden no encontrada');

      const updated_at = format({
        date: new Date,
        tz: 'America/Mexico_City',
        format: 'YYYY-MM-DDTHH:mm:ss'
      })
      const pendingOrder = await this.ordersRepository.update(id, { status: 'Pendiente', updated_at });
      if (pendingOrder.affected <= 0) throw new InternalServerErrorException('Orden no actualizada');

      return this.findOrdersByUserIdService(foundedOrder.user_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async completeOrderService(id: string) {
    try {
      console.log('ID recibido en completeOrderService:', id);
      const foundedOrder = await this.ordersRepository.findOne({ where: { id } });
      if (!foundedOrder) throw new NotFoundException('Orden no encontrada');

      const updated_at = format({
        date: new Date,
        tz: 'America/Mexico_City',
        format: 'YYYY-MM-DDTHH:mm:ss'
      })
      const completedOrder = await this.ordersRepository.update(id, { status: 'Completado', updated_at });
      if (completedOrder.affected <= 0) throw new InternalServerErrorException('Orden no actualizada');

      return this.findOrdersByUserIdService(foundedOrder.user_id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}