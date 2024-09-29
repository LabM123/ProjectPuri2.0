import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { format } from "@formkit/tempo";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const foundedUser = await this.usersRepository.findOne({where: {email: createUserDto.email}})
      if(foundedUser) throw new BadRequestException('El correo esta en uso')
      if(createUserDto.password !== createUserDto.confirm_password) throw new BadRequestException('Ambas contraseñas deben ser iguales')
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      if(!hashedPassword) throw new InternalServerErrorException('Hubo un error al almacenar la contraseña')
      const newUser = await this.usersRepository.save({
        ...createUserDto,
        password: hashedPassword
      })
      const savedUser = await this.getUserByIdService(newUser.id)
      return {id: newUser.id, user: savedUser, token: (await this.loginUser({password: createUserDto.password, email: createUserDto.email})).token};
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  
  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const foundedUser = await this.usersRepository.findOne({where:{email: loginUserDto.email}})
      if(!foundedUser) throw new BadRequestException("Email o contraseña incorrectos")
      const validPassword = await bcrypt.compare(loginUserDto.password, foundedUser.password)
      if(!validPassword) throw new BadRequestException("Email o contraseña incorrectos")
      const payload = {id: foundedUser.id, email: foundedUser.email, isAdmin: foundedUser.role}
      const token = this.jwtService.sign(payload);
      return {token, message: 'Login successful', user: await this.getUserByIdService(foundedUser.id)}
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  
  async getAllUsersService() {
    try {
      const allUsers = await this.usersRepository.find();
      return allUsers;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  
  async getUserByIdService(id: string) {
    try {
      const foundedUser = await this.usersRepository.findOne({where: {id}, relations: ['orders']})
      if(!foundedUser) throw new BadRequestException('Usuario no encontrado')
      const {password, ...userWithoutPassword} = foundedUser;
      return {...userWithoutPassword};
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  
  async updateUserService(id: string, updateUserDto: UpdateUserDto) {
    try {
      const foundedUser = await this.usersRepository.findOne({where: {id}});
      if(!foundedUser) throw new BadRequestException('Usuario no encontrado')
      if(updateUserDto.password) {
        const newPassword = await bcrypt.hash(updateUserDto.password, 10)
        if(!newPassword) throw new InternalServerErrorException('Usuario no actualizado')
        updateUserDto = {...updateUserDto, password: newPassword}
      }
      const updated_at = format({
        date: new Date,
        tz: 'America/Mexico_City',
        format: 'YYYY-MM-DDTHH:mm:ss'
      })
      const updatedUser = await this.usersRepository.update(id, {...updateUserDto, updated_at})
      if(updatedUser.affected <= 0) throw new InternalServerErrorException('Usuario no actualizado')
        return this.getUserByIdService(id)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  
  async deleteUserService(id: string) {
    try {
      const foundedUser = await this.usersRepository.findOne({where: {id}});
      if(!foundedUser) throw new BadRequestException('Usuario no encontrado')
      const deletedUser = await this.usersRepository.update(id, {deleted_at: format({ date: new Date, tz: 'America/Mexico_City', format: 'YYYY-MM-DDTHH:mm:ss' })})
      if(deletedUser.affected <= 0) throw new InternalServerErrorException('Usuario no eliminado')
      return {id}
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
