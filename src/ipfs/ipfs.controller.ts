import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';
import { FileInterceptor } from '@nestjs/platform-express';

// http://localhost:8080/{cid}}

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) { }

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(207)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('userId') user_id: string) {
    this.ipfsService.uploadFile(file, user_id);
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
