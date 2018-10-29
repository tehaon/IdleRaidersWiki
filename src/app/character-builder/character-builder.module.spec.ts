import { CharacterBuilderModule } from './character-builder.module';

describe('CharacterBuilderModule', () => {
  let characterBuilderModule: CharacterBuilderModule;

  beforeEach(() => {
    characterBuilderModule = new CharacterBuilderModule();
  });

  it('should create an instance', () => {
    expect(characterBuilderModule).toBeTruthy();
  });
});
