import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './catsDTO/create-cat-dto';
import { UpdateCatDto } from './catsDTO/update-cat-dto';

// import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  // constructor(private readonly catsService: CatsService) {}

  @Get('getAll') //Decorador que indica que el método getHello() responderá a las peticiones GET
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) //Decorador que indica que se redirigirá a la URL https://dosc.nestjs.com con un código de respuesta 302
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: any): string {
    // console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Post('create')
  // @HttpCode(204) //Decorador que indica que el código de respuesta será 204
  @Header('Cache-Control', 'no-store') //Decorador que indica que se añadirá la cabecera Cache-Control con el valor no-store
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('catsAsync')
  async findAllAsync(): Promise<string[]> {
    return ['This action returns all cats asynchronously'];
  }

  @Post('createCat')
  async createCats(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log(createCatDto);
    return `This action adds a new cat with name  ${createCatDto.name} and age ${createCatDto.age} and breed ${createCatDto.breed}`;
  }

  @Put('updateCat/:id')
  async updateCats(
    @Param('id') id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<string> {
    return `This action updates a cat with name  ${updateCatDto.name} and age ${updateCatDto.age} and breed ${updateCatDto.breed}`;
  }

  @Delete('deleteCat/:id')
  remove(@Param('id') id: number) {
    return `This action remove a cat with id: ${id} `;
  }
}
