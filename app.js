angular.module('app',[]).controller('appCon', function($scope, $interval, $window){
  class Box {
    constructor(x, y, size, red, green, blue, horizontalSpeed, verticalSpeed, radius) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.horizontalSpeed = horizontalSpeed;
      this.verticalSpeed = verticalSpeed;
      this.radius = radius
    }

    getStyle() {
      return {position: 'absolute', left: this.y + 'px', top: this.x + 'px', width : this.size + 'px', height : this.size+ 'px',
      'background-color' : this.getColourCode(), 'border-radius' : this.radius + '%'};
    }

    getColourCode() {
      let colours = [this.red.toString(16), this.green.toString(16), this.blue.toString(16)];
      for(let i = 0;i < colours.length;i++){if(colours[i].length < 2){colours[i] = '0' + colours[i];}}
      return '#' + colours.join('');
    }

    move() {
      if(this.x <= 0 || this.x + this.size + this.horizontalSpeed >= $window.innerHeight) {this.horizontalSpeed = this.horizontalSpeed * -1;}
      if(this.y <= 0 || this.y + this.size + this.verticalSpeed >= $window.innerWidth) {this.verticalSpeed = this.verticalSpeed * -1;}
      this.x += this.horizontalSpeed;
      this.y += this.verticalSpeed;
    }

    start(){
      let self = this;
      self.movement = $interval(function(){self.move();}, 20);
    }

    toggle() {
      let self = this;
      if(self.movement) {
        $interval.cancel(self.movement);
        self.movement = false;
      } else {
        self.start();
      }
    }

    reverse() {
      this.horizontalSpeed = this.horizontalSpeed * -1;
      this.verticalSpeed = this.verticalSpeed * -1;
    }

    duplicate() {
      return new Box(this.x, this.y, this.size, this.red, this.green, this.blue, this.horizontalSpeed, this.verticalSpeed, this.radius);
    }
  }

  $scope.boxes = [];
  $scope.userbox = new Box(50, 50, 100, 0, 127, 255, 6, 6, 40);

  /*$scope.addBox = function(newBox) {
    let theBox = new Box(newBox.x, newBox.y, newBox.size, newBox.red, newBox.green, newBox.blue, newBox.horizontalSpeed, newBox.verticalSpeed, newBox.radius);
    theBox.start();
    $scope.boxes.push(theBox);
  }*/

  $scope.addBox = function() {
    $scope.userbox.start();
    $scope.boxes.push($scope.userbox);
    $scope.userbox = $scope.userbox.duplicate();
  }

});
