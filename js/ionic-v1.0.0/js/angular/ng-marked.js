angular.module('ngMarked', [])
  .constant('marked', window.marked)
  .filter('marked', ['marked', '$sce', function (marked, $sce) {
      return function (text) {
          if (!marked) {
            throw new Error('Marked library not found, are you sure it is available');
          }
          var markdown = text || '';
          var html = marked(markdown);
          return $sce.trustAsHtml(html);
      };
  }])
  .directive('marked', ['marked', function (marked) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        marked: '=',
        opts: '=',
      },
      link: function (scope, element, attrs) {
        function set(val) {
          element.html(marked(val || '', scope.opts || null));
        }
        if (attrs.marked) {
          set(scope.marked);
          scope.$watch('marked', set);
        } else {
          set(element.text());
        }
      }
    };
  }]);
