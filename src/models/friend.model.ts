// public moves?: any[]
export class Friend {
  constructor(
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public imgUrl: string,
    public _id: string,
    public sex?: string
  ) {}

  setId?() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this._id = text;
  }
}

export interface FriendFilter {
  term: string;
}
