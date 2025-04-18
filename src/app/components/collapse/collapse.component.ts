import { CommonModule } from '@angular/common';
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-collapse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class CollapseComponent implements OnInit, AfterViewInit {

  @Input('title') public title = "";
  @Input('tipo') public tipo = "general";
  @Input('id') public id = "";
  @Input('paddingX') public paddingX = true;
  @Input('nivel') public nivel = 'nivel-0';
  @Input('isCollapsed') public isCollapsed = true;

  @ViewChild('target') public target!: ElementRef;

  @Output('opened') public opened = new EventEmitter<string>();

  public collapse: bootstrap.Collapse | null = null;

  constructor(
  ) { }

  ngOnInit(): void {

  }
  get headerClasses(): any {
    return {
      open: !this.isCollapsed,
      'px-3': this.paddingX,
      ['nivel-' + this.nivel]: true
    };
  }
  
  ngAfterViewInit(): void {
    if (this.target) {
      this.collapse = new bootstrap.Collapse(this.target.nativeElement, { toggle: false });
  
      if (!this.isCollapsed) {
        this.collapse.show();
      }
    }
  }

  accordionBehavior() {
    if (this.isCollapsed) {
      this.collapse?.hide();
    } else {
      this.collapse?.show();
      this.isOpen();
    }
  }
  
  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.trigger();
  }

  private trigger(){
    if(this.isCollapsed){
      this.collapse?.hide();
    }else{
      this.collapse?.show();
      this.isOpen();
    }
  }

  hide(){
    this.isCollapsed = true;
    this.trigger();
  }

  isOpen(){
    this.opened.emit(this.id);
  }
}
