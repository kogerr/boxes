angular.module('slider',[]).controller('sliderController', function($scope, $interval, $window){
  $scope.speed = 0;
  $scope.acc = 0;
  $scope.pos = 0;
  let movement;
  let positionChange = $interval(() => {
    if($scope.pos > $window.innerWidth) {$scope.pos = 0;}
    if($scope.pos < 0) {$scope.pos = $window.innerWidth;}
    $scope.pos += $scope.speed;
  }, 100);

  $scope.listen = function(e){
    //$scope.asdf = e.clientX;
  };

  $scope.keyListen = function(e){
    if(!movement) {
      movement = $interval(() => {
        $scope.acc++;
        $scope.speed += $scope.acc;
      } ,100);
    }
  };

  $scope.keyUpListen = function(e){
    $interval.cancel(movement);
    $scope.acc = 0;
    movement = $interval(() => {
      if($scope.speed > $scope.acc) {
        $scope.acc+=2;
        $scope.speed -= $scope.acc;
      } else {
        $scope.speed = 0;
        $scope.acc = 0;
        $interval.cancel(movement);
        movement = false;
      }
    } ,100);
    //movement = false;

    //$scope.speed = 0;
    //console.log(e);
    //alert('error');
  };
});
