import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private  usersService: UserService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(createauthdto: CreateAuthDto): Promise<any> {    
    const user = await this.usersService.findemailbyuser(createauthdto.email);
    console.log(user);
    

    if (user && user.password === createauthdto.pass) {
      const payload = { username: user.email, sub: user.id };
      const token = this.jwtservice.sign(payload);

      return {
        access_token: token,
      };
    }
    throw new UnauthorizedException('usuario não existe');
  }
}
