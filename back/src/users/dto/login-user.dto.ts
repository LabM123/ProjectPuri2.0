import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class LoginUserDto{
    @IsNotEmpty({message: 'Debe incluir un correo electronico'})
    @IsString()
    @IsEmail({}, {message: 'Debe incluir una direccion de correo valida'})
    @MaxLength(50, {message: 'El correo no debe exceder los 50 caracteres'})
    email: string
    
    @IsNotEmpty({message: 'Debe incluir una contraseña'})
    @IsString()
    password: string
}