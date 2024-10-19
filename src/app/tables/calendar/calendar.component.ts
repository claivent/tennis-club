import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef, Input,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {colors} from "@angular-devkit/build-angular/src/utils/color";


@Component({
  selector: 'app-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',

})
export class CalendarComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Week;


  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date('2024-10-19T04:00:00'),
      title: 'Ondřej Pojsl',
      end: new Date('2024-10-19T06:00:00'),
      meta: { party: 2 },
    },
    {
      start: new Date('2024-10-19T02:00:00'),
      end: new Date('2024-10-19T04:00:00'),
      title: 'Martin SASKA',
      meta: { party: 4 },
    },

    {
      start: new Date('2024-10-20T00:00:00'),
      title: 'Den dětí',
      end: new Date('2024-10-20T23:00:00'),
      meta: { party: 24 },
    },
    {
      start: new Date('2024-10-18T10:00:00'),
      title: 'Radim',
      end: new Date('2024-10-18T12:00:00'),
      meta: { party: 2 },
    },
    {
      start: new Date('2024-10-24T00:00:00'),
      title: 'Den žen',
      end: new Date('2024-10-24T23:00:00'),
      meta: { party: 24 },
    },
    {
      start: new Date('2024-10-24T14:00:00'),
      title: 'Moravcová',
      end: new Date('2024-10-24T16:00:00'),
      meta: { party: 24 },
    },
    {
      start: new Date('2024-10-23T04:00:00'),
      end: new Date('2024-10-23T05:00:00'),
      title: 'Ondřej Pojsl',
      meta: { party: 1 },
    },
  ];

  /*events: CalendarEvent[] = [
    {
      title: 'Editable event',

      start: new Date(),
      actions: [
        {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log('Edit event', event);
          },
        },
      ],
    },
    {
      title: 'Deletable event',

      start: new Date(),
      actions: [
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log('Event deleted', event);
          },
        },
      ],
    },
    {
      title: 'Non editable and deletable event',

      start: new Date(),
    },
  ];*/

  daysInWeek = 7;

  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });
  }

  // Function to emit current values FROM the parent
  // Call this function whenever the date or time changes


  ngOnDestroy() {
    this.destroy$.next();
  }
}
