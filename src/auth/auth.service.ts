import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // Este service debe conectarse con otro módulo para usar el otro servicio: UserService
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ firstname, lastname, email, password }: RegisterDto) {
    const findUserMail = await this.usersService.findOneByEmail(email);

    if (findUserMail) {
      return new HttpException('Email alredy exists', HttpStatus.CONFLICT);
    }
    await this.usersService.create({
      firstname,
      lastname,
      email,
      password: await bcryptjs.hash(password, 10), //Hasheo de password
    });

    return { message: 'Registered successfully!' };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Comparo password hasheada
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Crear y devolver token
    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);
    const { firstname, lastname, rol } = user;
    return { email, rol, firstname, lastname, token };
  }
}
