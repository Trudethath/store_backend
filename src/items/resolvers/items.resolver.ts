import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from '../services/items.service';
import { Item } from '../entities/item.entity';
import { CreateItemInput } from '../dto/create-item.input';
import { UpdateItemInput } from '../dto/update-item.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOneById(@Args('itemId', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @Query(() => Item, { name: 'itemByModel' })
  findOneByModel(@Args('model', { type: () => String }) model: string) {
    return this.itemsService.findOneByModel(model);
  }

  @Mutation(() => Item)
  updateItemByModel(
    @Args('model', { type: () => String }) model: string,
    @Args('updateItemInput', { type: () => UpdateItemInput })
    updateItemInput: UpdateItemInput,
  ) {
    return this.itemsService.updateByModel(model, updateItemInput);
  }

  // @Mutation(() => Item)
  // updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
  //   return this.itemsService.update(updateItemInput.id, updateItemInput);
  // }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id);
  }
}
