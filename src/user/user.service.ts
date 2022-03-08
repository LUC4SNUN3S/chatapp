import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>) { }
  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto)
  }

  findemailbyuser(email: string){    

    return this.repository.findOne({email})
    
  }

  findAll(): Promise<User[]> {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.repository.delete(id)  
  }
}
