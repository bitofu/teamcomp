import { observable } from 'mobx';

class UserStore {
  @observable isAuth;

  constructor() {
    this.isAuth = false;
  };

  toggleAuth() {
    this.isAuth = !this.isAuth;
  };

  testMount(text) {
    (text) ? console.log(text) : console.log('mounted');
  };

}

const userStore = new UserStore();
export default userStore;