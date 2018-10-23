import { ItemDatabaseModule } from './item-database.module';

describe('ItemDatabaseModule', () => {
  let itemDatabaseModule: ItemDatabaseModule;

  beforeEach(() => {
    itemDatabaseModule = new ItemDatabaseModule();
  });

  it('should create an instance', () => {
    expect(itemDatabaseModule).toBeTruthy();
  });
});
