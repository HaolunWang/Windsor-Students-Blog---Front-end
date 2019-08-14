import Component from '@ember/component';

export default Component.extend({
  logoIsShowing: false,
  actions:{
    showLogo(){
      this.set('logoIsShowing', true);
    },
    hideLogo(){
      this.set('logoIsShowing', false);
    }
  }
});
