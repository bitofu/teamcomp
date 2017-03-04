import database from '../database';
import { action, computed, observable } from 'mobx';

class UserStore {
  @observable currentUser;
  @observable gold;
  @observable silver;
  @observable unopenedPacks;
  @observable dataReady;

  constructor() {
    this.currentUser = null;
    this.gold = 0;
    this.silver = 0;
    this.unopenedPacks = 0;
    this.dataReady = false;
  };

  @computed get isAuth() {
    return this.currentUser !== null;
  };

  @action setUser(user) {
    this.currentUser = user;
    const userDataRef = database.ref().child("users/" + user.uid);

    userDataRef.on("value", (dataSnapshot) => {
      let userData = dataSnapshot.val();
      this.gold = userData.gold;
      this.silver = userData.silver;
      this.unopenedPacks = userData.unopenedPacks;
      this.dataReady = true;
    });
  };

  @action logout() {
    this.currentUser = null;
    console.log('logging out', this.currentUser);
  };

};

const userStore = new UserStore();
export default userStore;
