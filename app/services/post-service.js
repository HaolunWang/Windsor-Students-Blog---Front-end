import Service from '@ember/service';
import { inject } from '@ember/service';

/**
 * post-service encapsulates all functionality related to making
 * ajax requests for posts and comments.  The actual ajax operations
 * are performed by ajax-service.
 */
export default Service.extend({
  ajaxService: inject.service('ajax-service'),

  /**
   * get all posts.
   * @method getPosts
   * @return {Promise} a promise which resolves when the data is received.
   */
  getPosts: function() {
    var ajaxService = this.get('ajaxService');

    return ajaxService.doGet('/posts');
  },

  /**
   * create a new post containing the specified with a POST request.
   * @method createPost
   * @param {object} post an object containg the relevant data for a new post.
   * @return {Promise} a promise which resolves when the data is received.
   */
  createPost: function(post) {
    var ajaxService = this.get('ajaxService');

    return ajaxService.doPost('/posts', post);
  },

  /**
   * gets the data for a single post, including comments, with a GET request.
   * @method getPost
   * @param {string} post_id the database id of a specific post.
   * @return {Promise} a promise which resolves when the data is received.
   */
  getPost: function(post_id) {
    var ajaxService = this.get('ajaxService');

    return ajaxService.doGet('/posts/' + post_id);
  },

  /**
   * updates a specific post with the specified data using a PUT request.
   * @method updatePost
   * @param {string} post_id the database id of a specific post.
   * @param {object} data the data with which to update the post.
   * @return {Promise} a promise which resolves when the data is received.
   */
  updatePost: function(post_id, data) {
    var ajaxService = this.get('ajaxService');

    return ajaxService.doPut('/posts/' + post_id, data);
  },

  /**
   * stores a new comment in the database and associates it with
   * the post specified in the post_id field.
   * @method addCommentToPost
   * @param {string} post_id the database id of a specific post.
   * @param {object} comment the data necessary for a new comment.
   * @return {Promise} a promise which resolves when the operation is complete.
   */
  addCommentToPost: function(post_id, data) {
    var ajaxService = this.get('ajaxService');

    return ajaxService.doPost('/posts/' + post_id + '/addComment', data);
  },

  /**
   * marks a specific comment as the author's "favorite" for an existing
   * post.  Only one comment can be the favorite at any time.
   * @method markCommentAsFavorite
   * @param {string} post_id the database id of a post.
   * @param {object} data a data object containing the id of the comment to mark as favorite.
   * @return {Promise} a promise which resolves when the operation is complete.
   */
  markCommentAsFavorite: function(post_id, data) {
    var ajaxService = this.get('ajaxService');

    return ajaxService.doPut('/posts/' + post_id + '/favoriteComment',
      data);
  }
});
