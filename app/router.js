import EmberRouter from '@ember/routing/router';
import config from './config/environment';

var Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('posts');
  //this._resource('post', { path: '/posts/:post_id' });
  this.route('about');
  this.route('contact');
});

export default Router;
