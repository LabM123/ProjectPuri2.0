import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({message: 'Debe incluir un user_id'})
    @IsString()
    @IsUUID()
    user_id: string;
    
    @IsNotEmpty({message: 'Debe incluir la cantidad de garrafones'})
    @IsNumber({}, {message: 'El numero de garrafones debe ser un numero'})
    bottles_amount: number;
    
    @IsNotEmpty({message: 'Debe incluir la seccion de la direccion'})
    @IsString()
    @MaxLength(10)
    section: string;
    
    @IsNotEmpty({message: 'Debe incluir el numero exterior'})
    @IsString()
    @MaxLength(10)
    external_number: string;
    
    @IsNotEmpty({message: 'Debe incluir el numero interno'})
    @IsString()
    @MaxLength(10)
    internal_number: string;
    
    @IsOptional()
    @IsString({message: 'La latitud debe ser texto'})
    latitude: string;
    
    @IsOptional()
    @IsString({message: 'La longitud debe ser texto'})
    longitude: string;
}
