import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCloseButtonGroupComponent } from './save-close-button-group.component';

describe('SaveCloseButtonGroupComponent', () => {
  let component: SaveCloseButtonGroupComponent;
  let fixture: ComponentFixture<SaveCloseButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveCloseButtonGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveCloseButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
