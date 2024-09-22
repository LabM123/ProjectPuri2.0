import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Debe incluir un nombre'})
    @IsString()
    @MaxLength(50, {message: 'El nombre no debe exceder los 50 caracteres'})
    name: string;
    
    @IsNotEmpty({message: 'Debe incluir un correo electronico'})
    @IsString()
    @IsEmail({}, {message: 'Debe incluir una direccion de correo valida'})
    @MaxLength(50, {message: 'El correo no debe exceder los 50 caracteres'})
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    }, {
        message: 'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un simbolo'
    })
    @MaxLength(30, {message: 'La contraseña no debe exceder los 30 caracteres'})
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    }, {
        message: 'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un simbolo'
    })
    @MaxLength(30, {message: 'La contraseña no debe exceder los 30 caracteres'})
    @IsNotEmpty()
    confirm_password: string;

    @IsString()
    @IsOptional()
    @MinLength(10, {message: "El numero de telefono debe ser de al menos 10 digitos"})
    phone_number: string;
}
