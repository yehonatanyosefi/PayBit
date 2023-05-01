import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { FriendFilter } from 'src/models/friend.model';
import { FriendService } from 'src/services/friend.service';

@Component({
  selector: 'friend-filter',
  templateUrl: './friend-filter.component.html',
  styleUrls: ['./friend-filter.component.scss'],
})
export class FriendFilterComponent implements OnInit, OnDestroy {
  constructor(private friendService: FriendService) {}
  destroySubject$ = new Subject<null>();
  filterSubject$ = new Subject();
  friendFilter = {} as FriendFilter;

  ngOnInit(): void {
    this.friendService.friendFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((friendFilter) => {
        this.friendFilter = friendFilter;
      });

    this.filterSubject$
      .pipe(takeUntil(this.destroySubject$), distinctUntilChanged())
      .subscribe(() => {
        this.friendService.setFilter(this.friendFilter);
      });
  }

  onSetFilter(val: string) {
    this.filterSubject$.next(val);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
}
