import { Controller, Post, Param, UseInterceptors, UploadedFile, HttpCode, UseGuards, Req } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

// http://localhost:8080/{cid}}

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(207)
  @UseGuards(AuthGuard)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    console.log(request);
    const user_id: string = request['user'].user_id;
    this.ipfsService.uploadFile(file, user_id);
  }
}
