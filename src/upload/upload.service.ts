import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Đường dẫn đầy đủ của file
    return `File uploaded successfully: ${file.path}`;
  }
}
