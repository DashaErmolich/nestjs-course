import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
  ) {}

  @ApiOperation({ summary: 'Post creation' })
  @ApiResponse({ status: 200, type: Post })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.createPost(dto, image);
  }
}
