import { action, computed, observable } from 'mobx';

class UserStore {
  @observable currentUser;

  constructor() {
    this.currentUser = null;
  };

  @computed get isAuth() {
    return this.currentUser !== null;
  };

  @action setUser(user) {
    this.currentUser = user;
  };
  
  @action logout() {
    this.currentUser = null;
    console.log('logging out', this.currentUser)
  };

};

const userStore = new UserStore();
export default userStore;