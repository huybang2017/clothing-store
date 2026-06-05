import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import type { Response } from 'express';
import { UserRole } from '../../common/constants';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { successResponse } from '../../common/utils/api-response.util';
import { UploadsService } from './uploads.service';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post('image')
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File | undefined) {
    if (!file?.buffer?.length) {
      throw new BadRequestException('File ảnh không hợp lệ');
    }
    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Chỉ chấp nhận file ảnh');
    }

    const { imageUrl } = await this.uploads.uploadImage(
      file.buffer,
      file.mimetype,
    );

    return successResponse({ imageUrl }, 'Tải ảnh thành công');
  }

  @Public()
  @Get('files/:filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filepath = this.uploads.resolveLocalPath(filename);
    if (!filepath) {
      throw new NotFoundException('Không tìm thấy file ảnh');
    }
    res.sendFile(filepath);
  }
}
