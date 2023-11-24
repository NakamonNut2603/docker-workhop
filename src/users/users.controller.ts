import { Controller, Post, Body, Get, Patch, Param, Query, Delete, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../Interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userServices: UsersService, private authService: AuthService) {}

    @Get("/colors/:color")
    setColor(@Param("color") color: string, @Session() session: any) {
        session.color = color;
    }

    @Get("colors")
    getColor(@Session() session: any) {
        return session.color;
    }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userID = user.id
        return user;
    }

    @Get("/whoami")
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post("/signin")
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userID = user.id
        return user;
    }

    @Post("/signout")
    signOut(@Session() session: any) {
        session.userID = null;
    }
    
    @Get("/:id")
    async findUser(@Param("id") id: string) {
        const user = await this.userServices.findOne(parseInt(id));
        if(!user) {
            throw new NotFoundException("User not found.")
        }
        return user
    }

    @Get()
    findAllUsers(@Query("email") email: string) {
        return this.userServices.find(email);
    }

    @Delete("/:id")
    removeUser(@Param("id") id: string) {
        return this.userServices.remove(parseInt(id));
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
       return this.userServices.update(parseInt(id), body); 
    }

}
