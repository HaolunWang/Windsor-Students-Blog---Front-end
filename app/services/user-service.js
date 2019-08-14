import Service from '@ember/service';
import { computed } from '@ember/object';
import {
  storageFor
}
from 'ember-local-storage';

/**
 * The user-service handles user authentication by storing the name
 * of the currently authenticated user (or no name at all) in localStorage.
 * This stored name can be used to force authentication on page reload.
 */
export default Service.extend({
  currentUser: null,
  localStorageUser: storageFor('user'),
  isLocalStorageChecked: false,

  /**
   * @property {boolean} true if a user name is currently stored in localStorage.
   */
  isAuthenticated: false,

  /**
   * @property {boolean} the name of the currently logged-in user.
   */
  currentUserName: computed('currentUser', function () {
    var currentUser = this.get('currentUser');

    return (currentUser) ? currentUser.name : '';
  }),

  /**
   * checks local storage for a valid user name.  Forces login
   * if one is found.
   *
   * @method checkForLocalStorageUser
   */
  checkForLocalStorageUser: function () {
    var localStorageUser = this.get('localStorageUser');
    var name = localStorageUser.get('name');

    this.set('isLocalStorageChecked', true);

    if (name) {
      this.loginAs(name);
    }
  },

  /**
   * Logs in with the specified username.
   *
   * @method loginAs
   */
  loginAs: function (name) {
    var user = {
      name: name
    };

    this.set('currentUser', user);
    this.get('localStorageUser').set('name', name);
    this.set('isAuthenticated', true);
  },

  /**
   * Logs out.
   *
   * @method logout
   */
  logout: function () {
    this.set('currentUser', null);
    this.get('localStorageUser').clear();
    this.set('isAuthenticated', false);
  },

  /**
   * Retrieves the current user name.
   *
   * @method getCurrentUserName
   */
  getCurrentUserName: function () {
    var isAuthenticated = this.get('isAuthenticated');

    if (isAuthenticated) {
      let user = this.get('currentUser');

      return user.name;
    }

    return '';
  }
});
