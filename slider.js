angular.module('slider',[]).controller('sliderController', function($scope, $interval, $window){
  $scope.speed = 0;
  $scope.acc = 0;
  $scope.deAcc = 0;
  let movement;
  $scope.direction = 0;
  $scope.keyCode = '';

  let positionChange = $interval(() => {
    if($scope.player.pos > $window.innerWidth) {$scope.player.pos = 0;}
    if($scope.player.pos < 0) {$scope.player.pos = $window.innerWidth;}
    $scope.player.pos += $scope.speed;
    $scope.player.pos += $scope.speed;
  }, 20);

  let slowing = $interval(() => {
    if(!movement || $scope.speed * $scope.direction < 0) {
      if (Math.abs($scope.speed) > $scope.deAcc) {
        $scope.deAcc += 2;
        $scope.speed -= ($scope.speed > 0) ? $scope.deAcc : ($scope.deAcc * -1);
      } else {
        $scope.speed = 0;
        $scope.deAcc = 0;
      }
    }
  }, 100);

  $scope.player = {pos: 0};
  $scope.player.style = {position: 'absolute', left: this.pos + 'px', 'image-rendering': 'pixelated'};

  $scope.listen = function(e){
    //$scope.asdf = e.clientX;
  };

  $scope.keyListen = function(e){
    if (e.keyCode == 37) {
      $scope.direction = -1;
    }
    if (e.keyCode == 39) {
      $scope.direction = 1;
    }
    if(!movement || $scope.speed * $scope.direction < 0) {
      movement = $interval(() => {

        $scope.acc += $scope.direction;
        $scope.speed += $scope.acc;
      }, 100);
      $scope.deAcc = 0;
    }
  };

  $scope.keyUpListen = function(e){
    $interval.cancel(movement);
    console.log('cancelling');
    movement = false;
    $scope.acc = 0;
    $scope.direction = 0;
  };
});
