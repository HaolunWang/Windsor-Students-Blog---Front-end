
import Service from '@ember/service';
import { inject } from '@ember/service';

const BASE_URL = 'http://localhost:4500/api';

/**
 * ajax-service uses the ember-ajax wrapper to perform
 * simple ajax requests.  It is never accessed directly
 * by a controller; rather the actual operations related
 * to posts and comments are encapsulated in post-service,
 * which in turn uses this service to perform actual ajax
 * requests.
 */
export default Service.extend({
  ajax: inject.service('ajax'),

  /**
   * constructs a fully-qualified url based on BASE_URL.
   * @method _getUrl
   * @private
   */
  _getUrl: function (route) {
    return BASE_URL + route;
  },

  /**
   * performs a GET request at the specified url.
   * @method doGet
   * @return {Promise} a promise which resolves when the response is received.
   */
  doGet: function (route) {
    var ajax = this.get('ajax');
    var url = this._getUrl(route);

    return ajax.request(url);
  },

  /**
   * performs a POST request at the specified url, sending the specified data.
   * @method doPost
   * @return {Promise} a promise which resolves when the response is received.
   */
  doPost: function (route, data) {
    var ajax = this.get('ajax');
    var url = this._getUrl(route);

    return ajax.post(url, {
      data: data
    });
  },

  /**
   * performs a PUT request at the specified url, sending the specified data.
   * @method doPut
   * @return {Promise} a promise which resolves when the response is received.
   */
  doPut: function (route, data) {
    var ajax = this.get('ajax');
    var url = this._getUrl(route);

    return ajax.put(url, {
      data: data
    });
  }
});
