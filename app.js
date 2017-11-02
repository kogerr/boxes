angular.module('app',[]).controller('appCon', function($scope, $interval, $window){
  class Box {
    constructor(x, y, size, colour, horizontalSpeed, verticalSpeed, radius) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.colour = colour;
      this.horizontalSpeed = horizontalSpeed;
      this.verticalSpeed = verticalSpeed;
      this.radius = radius
    }

    getStyle() {
      return {position: 'absolute', left: this.y + 'px', top: this.x + 'px', width : this.size + 'px', height : this.size+ 'px',
      'background-color' : this.colour, 'border-radius' : this.radius + '%'};
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
  }

  $scope.boxes = [];

  $scope.boxes.push(new Box(50, 50, 100, 'blue', 1, 1));
  $scope.addBox = function(newBox) {
    let colours = [newBox.red.toString(16), newBox.green.toString(16), newBox.blue.toString(16)];
    for(let i = 0;i < colours.length;i++){if(colours[i].length < 2){colours[i] = '0' + colours[i];}}
    let colourCode = '#' + colours.join('');
    console.log(colourCode);
    let theBox = new Box(newBox.x, newBox.y, newBox.size, colourCode, newBox.hSpeed, newBox.vSpeed, newBox.radius);
    theBox.start();
    $scope.boxes.push(theBox);
  }
  /*$scope.a = $scope.box.getStyle();
  $scope.box.start();*/
});
