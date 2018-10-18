import { GearBrowserModule } from './gear-browser.module';

describe('GearBrowserModule', () => {
  let gearBrowserModule: GearBrowserModule;

  beforeEach(() => {
    gearBrowserModule = new GearBrowserModule();
  });

  it('should create an instance', () => {
    expect(gearBrowserModule).toBeTruthy();
  });
});
