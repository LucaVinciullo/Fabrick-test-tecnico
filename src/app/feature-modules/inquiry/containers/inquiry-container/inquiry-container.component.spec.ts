import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryContainerComponent } from './inquiry-container.component';

xdescribe('InquiryContainerComponent', () => {
  let component: InquiryContainerComponent;
  let fixture: ComponentFixture<InquiryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryContainerComponent],
    });
    fixture = TestBed.createComponent(InquiryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
