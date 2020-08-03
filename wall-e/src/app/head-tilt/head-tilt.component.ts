import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-head-tilt',
  templateUrl: './head-tilt.component.html',
  styleUrls: ['./head-tilt.component.scss']
})
export class HeadTiltComponent implements OnInit {
  head: HTMLDivElement;
  mousedown$ = new Observable<MouseEvent>();
  mousemove$ = new Observable<MouseEvent>();
  mouseup$ = new Observable<MouseEvent>();
  drag$ = new Observable<{ x: number; y: number; }>();
  rotation = 0;

  constructor() { }

  ngOnInit(): void {
    this.head = document.querySelector<HTMLDivElement>('.head');
    this.mousedown$ = fromEvent<MouseEvent>(this.head, 'mousedown');
    this.mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.mouseup$ = fromEvent<MouseEvent>(this.head, 'mouseup');
    const halfWidth = this.head.clientWidth / 2;
    const halfHeight = this.head.clientHeight / 2;

    this.drag$ = this.mousedown$.pipe(
      switchMap(
        (start) => {
          console.log(`start.X = ${start.clientX}, start.Y = ${start.clientY}`);
          return this.mousemove$.pipe(map(move => {
            move.preventDefault();
            console.log(`move.X = ${move.clientX}, move.Y = ${move.clientY}`);
            return {
              x: move.clientX - start.clientX,
              y: move.clientY - start.clientY
            };
          }),
            takeUntil(this.mouseup$));
        }
      )
    );

    this.drag$.subscribe(pos => {
      console.log(`pos.X = ${pos.x}, pos.Y = ${pos.y}`);
      console.log(`clientWidth = ${this.head.clientWidth / 2}`);
      this.rotation = Math.tan(pos.y / (this.head.clientWidth / 2));
      if (this.rotation > 1) { this.rotation = 1; }
      else if (this.rotation < -1) { this.rotation = -1; }

      this.head.style.rotate = `${this.rotation}rad`;
      this.head.style.cursor = 'grabbing';
    });

    this.mouseup$.subscribe(() => this.head.style.cursor = 'grab');
  }
}
