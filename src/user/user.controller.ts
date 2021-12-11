import { Controller, Post, Body, Patch, Param, Get, Delete, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('user')
export class UserController {
    constructor(private service:UserService){}

    @Post('create')
    createUser(@Body() data:CreateUserDto): Promise <User> {
        return this.service.createUser(data);
    }

    @UseGuards(AuthGuard())
    @Patch('update/:id')
    updateUser(@Param('id') id:string, @Body()data:UpdateUserDto): Promise<User> {
        return this.service.updateUser(id,data);
    }

    @UseGuards(AuthGuard())
    @Get('list')
    listUsers():Promise <any[]>{
        return this.service.listUsers();
    }

    @UseGuards(AuthGuard())
    @Get('list/:id')
    listById(@Param('id') id:string):Promise <User>{
        return this.service.listById(id);
    }
    
    @UseGuards(AuthGuard())
    @Delete('delete/:id')
    delete(@Param('id') id:string):Promise <{message:string}>{
        return this.service.delete(id);
    }

    @UseGuards(AuthGuard())
    @Patch('addList/:id')
    addList(@AuthUser() user: User, @Param('id') filmeId: string) {
    return this.service.addList(user, filmeId);
    }
}
