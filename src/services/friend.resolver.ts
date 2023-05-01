import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { FriendService } from './friend.service'

export function friendResolver(route: ActivatedRouteSnapshot) {
  const id = route.params['id']
  return inject(FriendService).getFriendById(id).pipe()
}
