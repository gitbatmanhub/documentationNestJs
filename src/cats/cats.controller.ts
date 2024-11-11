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
} from '@nestjs/common';
import { CreateCatDto } from './catsDTO/create-cat-dto';
import { UpdateCatDto } from './catsDTO/update-cat-dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('getAll') //Decorador que indica que el método getHello() responderá a las peticiones GET
  findAll(): CreateCatDto[] {
    return this.catsService.findAll();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) //Decorador que indica que se redirigirá a la URL https://dosc.nestjs.com con un código de respuesta 302
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.catsService.searchByName(name);
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
  async createCats(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Put('updateCat/:name')
  async updateCats(
    @Param('name') name: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<CreateCatDto[]> {
    // `This action updates a cat with name  ${updateCatDto.name} and age ${updateCatDto.age} and breed ${updateCatDto.breed} with id: ${id}`;
    return this.catsService.updateCat(updateCatDto, name);
  }

  @Delete('deleteCat/:name')
  remove(@Param('name') name: string) {
    return this.catsService.deleteByName(name);
  }
}
