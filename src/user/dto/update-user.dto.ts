import { IsString, IsEmail, IsNotEmpty, IsOptional, Length} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Length(2,20)
    nome:string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email:string;
}