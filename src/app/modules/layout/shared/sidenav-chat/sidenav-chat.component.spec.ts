import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavChatComponent } from './sidenav-chat.component';

describe('SidenavChatComponent', () => {
  let component: SidenavChatComponent;
  let fixture: ComponentFixture<SidenavChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
