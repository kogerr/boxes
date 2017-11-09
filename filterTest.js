angular.module('filterApp',[])
  .controller('filterController',($scope, $filter) => {
  let testArray = ['alfa', 'beta', 'gamma', 'delta', 'charlie', 'bravo'];

  $scope.refreshArray = function() {
    $scope.array = $filter('filter')(testArray, $scope.filterText);
  }
  $scope.refreshArray();
});
