import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Helper function to customize file names
const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.random().toString(36).substring(2, 15))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

// File filter for images
const imageFileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

// File filter for videos
const videoFileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/\/(mp4|mov|avi|mkv)$/)) {
    return callback(new Error('Only video files are allowed!'), false);
  }
  callback(null, true);
};

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  // Upload Image
  @Post('image')
  @ApiOperation({ summary: 'Upload image file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  @ApiBody({
    description: 'Upload image file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/asset/images', // Save image in 'images' folder
        filename: editFileName,
      }),
      fileFilter: imageFileFilter, // Ensure only images are uploaded
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Image uploaded successfully',
      imageUrl: `http://localhost:5000/src/asset/images/${file.filename}`,
    };
  }
  // Upload Images
  @Post('images')
  @ApiOperation({ summary: 'Upload multiple image files' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Images uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file types' })
  @ApiBody({
    description: 'Upload multiple image files',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // Cho phép upload tối đa 10 files
      storage: diskStorage({
        destination: './src/asset/images', // Lưu vào thư mục 'images'
        filename: editFileName,
      }),
      fileFilter: imageFileFilter, // Đảm bảo chỉ upload file ảnh
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedFiles = files.map((file) => ({
      filename: file.filename,
      imageUrl: `http://localhost:5000/src/asset/images/${file.filename}`,
    }));

    return {
      message: 'Images uploaded successfully',
      files: uploadedFiles,
    };
  }

  // Upload Video
  @Post('video')
  @ApiOperation({ summary: 'Upload video file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  @ApiBody({
    description: 'Upload video file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/asset/videos', // Save video in 'videos' folder
        filename: editFileName,
      }),
      fileFilter: videoFileFilter, // Ensure only videos are uploaded
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Video uploaded successfully',
      videoUrl: `http://localhost:5000/src/asset/videos/${file.filename}`,
    };
  }
}
