import { Inject, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { IpfsEntity } from '../entities/ipf.entity';


@Injectable()
export class IpfsRepository {

  constructor(
  @InjectRepository(IpfsEntity) private ipfsRepository : Repository<IpfsEntity>) {}


  
  create() {
    return 'This action adds a new ethTransaction';
  }

  save(){
  }

  async findAll() {

    return `This action returns all ethTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ethTransaction`;
  }

  update(id: number,) {
    return `This action updates a #${id} ethTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} ethTransaction`;
  }

  add(){

  }

}
