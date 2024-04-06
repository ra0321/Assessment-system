import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

interface LoginParam {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  email: string;
  userId: number;
  isAdmin: boolean;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  // POST /users/create
  @Post('create')
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  // Find and return all users
  // GET /users/all
  @Get('all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Find and return users only
  // GET /users/all
  @Get('users')
  async findAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Find and return a user by id
  // GET /users/:id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // Delete a user by id
  // DELETE /users/delete/:id
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<boolean> {
    this.userService.remove(id);
    return true;
  }

  // Update an user by id
  // POST /user/update/:id
  @Post('update/:id')
  async update(@Param('id') id: string, @Body() user: User): Promise<void> {
    await this.userService.update(id, user);
  }

  // User Login
  // POST /user/login
  @Post('login')
  async login(@Body() param: LoginParam): Promise<LoginResult> {
    const user = await this.userService.login(param.email, param.password);

    if (user)
      return {
        success: true,
        userId: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    else
      return {
        success: false,
        userId: -1,
        email: '',
        isAdmin: false,
      };
  }
}
