import { observable } from 'mobx';

class UserStore {

  testMount(text) {
    (text) ? console.log(test) : console.log('mounted');
  };

}

const userStore = new UserStore();
export default userStore;