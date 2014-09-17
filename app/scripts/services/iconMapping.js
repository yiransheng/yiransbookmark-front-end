angular.module('bookmarkApp')
  .factory('iconMapping', function() {
    var map = {
      'facebook.com' : 'icon-facebook-square',
      'twitter.com' : 'icon-twitter',
      'pinterest.com' : 'icon-pinterest-square',
      'plus.google.com' : 'icon-google-plus-square',
      'linkedin.com' : 'icon-linkedin',
      'github.com' : 'icon-github-alt',
      'youtube.com' : 'icon-youtube',
      'dropbox.com': 'icon-dropbox',
      'stackoverflow.com' : 'icon-stack-overflow',
      'wordpress.com' : 'icon-wordpress',
      'reddit.com' : 'icon-reddit',
      'news.ycombinator.com' : 'icon-hacker-news',
      'default' : 'icon-chain'
    }
    return function getIcon(domain) {
      domain = domain || '';
      if(map[domain]) {
        return map[domain]
      }
      var parts = domain.split('.');
      // if no match found for sub-domain, get icon for full domain
      if(parts.length == 3) {
        domain = parts[1] + '.' + parts[2];
        return getIcon(domain);
      }
      return map.default;
    }
  })
