import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GridsterItem } from './gridsterItem.interface';
import { GridsterRenderer } from './gridsterRenderer.service';

@Component({
  selector: 'gridster-preview',
  template: '',
  standalone: true
})
export class GridsterPreviewComponent implements OnInit, OnDestroy {
  @Input() previewStyle$: EventEmitter<GridsterItem | null>;
  @Input() gridRenderer: GridsterRenderer;
  private el: HTMLElement;
  private sub: Subscription;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    this.sub = this.previewStyle$.subscribe(options =>
      this.previewStyle(options)
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private previewStyle(item: GridsterItem | null): void {
    if (item) {
      this.renderer.setStyle(this.el, 'display', 'block');
      this.gridRenderer.updateItem(this.el, item, this.renderer);
    } else {
      this.renderer.setStyle(this.el, 'display', '');
    }
  }
}
