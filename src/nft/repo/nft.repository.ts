import { Inject, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { IpfsEntity } from 'src/ipfs/entities/ipf.entity';
import { Repository } from 'typeorm';
import { UserAccountEntity, UserEntity, UserNftEntity } from '../entities/user.account.entity';


@Injectable()
export class NftRepository {

  constructor(
  @InjectRepository(IpfsEntity) private ipfsRepository : Repository<IpfsEntity>,
  @InjectRepository(UserEntity) private userEntity : Repository<UserEntity>,
  @InjectRepository(UserAccountEntity) private userAccountEntity : Repository<UserAccountEntity>,
  @InjectRepository(UserNftEntity) private userNftEntity : Repository<UserNftEntity>) {}



  uploadNft() {
    return 'This action adds a new ethTransaction';
  }


  mintNft() {
    return 'This action adds a new ethTransaction';
  }

  buyNft() {
    return 'This action adds a new ethTransaction';
  }

  putOnSaleNft() {
    return 'This action adds a new ethTransaction';
  }

  getNft(user_id: number) {
    return 'This action adds a new ethTransaction';
  }

  getAllNft() {
    return 'This action adds a new ethTransaction';
  }
  
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