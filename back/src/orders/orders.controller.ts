import { Controller, Get, Post, Body, Param, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/decorators/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAllOrders() {
    return this.ordersService.findAllOrdersService();
  }

  @Get('/users/:id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  findOrdersByUserId(@Param('id') id: string) {
    return this.ordersService.findOrdersByUserIdService(id);
  }

  @Get(':id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  findOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOrderByIdService(id);
  }

  @Post()
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrderService(createOrderDto);
  }

  @Put('/cancel/:id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  cancelOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.cancelOrderService(id);
  }

  @Put('/complete/:id')
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  completeOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.completeOrderService(id);
  }

  @Put('/pending/:id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  pendingOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.pendingOrderService(id);
  }

  @Put(':id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  updateOrder(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrderService(id, updateOrderDto);
  }
}
