
'use strict';

vipspa.start({
  view: '#ui-view',
  router: {
    'home': {
      templateUrl: 'views/home/home.html',
      controller: ['scripts/home/home.js']
    },
    'button': {
      templateUrl: 'views/button/button.html',
      controller: ['scripts/home/home.js']
    },
    'defaults': 'home', //默认路由
    // errorTemplateId: '#error'
  }
});