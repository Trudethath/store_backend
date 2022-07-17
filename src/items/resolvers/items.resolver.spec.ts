import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '../services/items.service';
import { ItemsResolver } from './items.resolver';

describe('ItemsResolver', () => {
  let resolver: ItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsResolver, ItemsService],
    }).compile();

    resolver = module.get<ItemsResolver>(ItemsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
