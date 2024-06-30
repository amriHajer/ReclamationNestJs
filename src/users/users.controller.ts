import { BadRequestException, Body, Controller, Get, Post, Put, Delete, Req, Res, Param, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
//import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private service: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.service.getUser(id);
  }

//  @Get('by-cin/:cin')
 //async getUserByCin(@Param('cin') cin: number) {
  //return this.service.getUserByCin(cin);
//}

  @Post('register')
  async create(
    @Body('cin') cin: number,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('email') email: string,
    @Body('tel') tel: number,
    @Body('password') password: string,
  ) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user: User = {
      id: null, // Add the id property
      nom,
      prenom,
      email,
      tel,
      password: hashedPassword,
    };

    // Save the user in the database
    const createdUser = await this.service.createUser(user);

    // Generate JWT token
    const jwt = await this.jwtService.signAsync({ id: createdUser.id });

    // Set the token in response header (if needed)
    delete createdUser.password;

    return createdUser;
  }




  

  @Put()
async update(@Body() user: User) {
  try {
    const updatedUser = await this.service.updateUser(user);
    return {
      message: 'Mise à jour effectuée avec succès',
      user: updatedUser,
    };
  } catch (error) {
    return {
      message: 'Échec de la mise à jour',
      error: error.message,
    };
  }
}

  

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.service.deleteUser(id);
  }
  @Get()
  async getAllUsers() {
    return this.service.getUsers();
  }

  @Post('login')
async login(
  @Body('email') email: string,
  @Body('password') password: string,
  @Res({ passthrough: true }) response: Response,
) {
  const user = await this.service.findOneByEmail(email);

  if (!user) {
    throw new BadRequestException('invalid credentials');
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new BadRequestException('invalid credentials');
  }

  // Créez un objet contenant les données de l'utilisateur que vous souhaitez envoyer
  const userData = {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    // Ajoutez d'autres données de l'utilisateur si nécessaire
  };
  console.log(userData);

  // Générez le jeton JWT en utilisant les données de l'utilisateur
  const jwt = await this.jwtService.signAsync(userData);

  // Configurez le jeton dans le cookie de réponse (ou tout autre mécanisme de stockage)
  response.cookie('jwt', jwt, { httpOnly: true });

  // Retournez les données de l'utilisateur dans la réponse
  return userData;
}

@Get('profile')
async getProfile(@Req() request: Request) {
  try {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.service.findOneById(data['id']);

    // Supprimez le mot de passe des données de l'utilisateur avant de le renvoyer au front-end
    delete user.password;

    return user;
  } catch (e) {
    throw new UnauthorizedException();
  }
}

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.service.findOneById(data['cin']);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
