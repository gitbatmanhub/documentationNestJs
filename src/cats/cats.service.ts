import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './catsDTO/create-cat-dto';

@Injectable()
export class CatsService {
  private readonly cats: CreateCatDto[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): CreateCatDto[] {
    return this.cats;
  }

  searchByName(name: string) {
    return this.cats.filter((item) => item.name === name);
  }

  updateCat(cat: CreateCatDto, name: string) {
    return this.cats.map((item) => {
      if (item.name === name) {
        return { ...item, name: name };
      }
    });
  }

  deleteByName(name: string) {
    // This line no elimine the array element, only is filtered
    return this.cats.filter((item) => item.name !== name);
  }
}
