import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post('addString/:str')
  async add(@Param('str') str: string) {
    const  cid  = await this.ipfsService.add(str);
    console.log(cid);
    return cid;

  }


  @Post()
  create(@Body() createIpfDto: CreateIpfDto) {
    return this.ipfsService.create(createIpfDto);
  }

  @Get()
  findAll() {
    return this.ipfsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipfsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpfDto: UpdateIpfDto) {
    return this.ipfsService.update(+id, updateIpfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipfsService.remove(+id);
  }



}
