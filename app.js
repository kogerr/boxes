angular.module('app',[]).controller('appCon', function($scope, $interval, $window, $filter){
  class Box {
    constructor(x, y, size, red, green, blue, horizontalSpeed, verticalSpeed, radius) {
      [this.x, this.y, this.size, this.red, this.green, this.blue,
        this.horizontalSpeed, this.verticalSpeed, this.radius] =
        [x, y, size, red, green, blue, horizontalSpeed, verticalSpeed, radius];
    }

    static random() {
      let r = function(a, b){return Math.floor((Math.random() * (b - a + 1)) + a);}
      return new Box(r(0, $window.innerHeight - 100), r(0, $window.innerWidth - 100),
    		  r(0, 100), r(0, 255), r(0, 255), r(0, 255), r(-10, 10), r(-10, 10), r(0, 50));
    }

    getStyle() {
      return {position: 'absolute', left: this.y + 'px', top: this.x + 'px',
        width : this.size + 'px', height : this.size+ 'px',
    	  'background-color' : `rgb(${this.red}, ${this.green}, ${this.blue})`,
        'border-radius' : this.radius + '%'};
    }

    move() {
      if(this.x <= 0 || this.x + this.size + this.horizontalSpeed >= $window.innerHeight) {
        this.horizontalSpeed = this.horizontalSpeed * -1;
      }
      if(this.y <= 0 || this.y + this.size + this.verticalSpeed >= $window.innerWidth) {
        this.verticalSpeed = this.verticalSpeed * -1;
      }
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
      return new Box(this.x, this.y, this.size, this.red, this.green, this.blue,
        this.horizontalSpeed, this.verticalSpeed, this.radius);
    }
  }

  $scope.boxes = [];
  $scope.userbox = new Box(50, 50, 100, 0, 127, 255, 8, 8, 50);
  $scope.xMax = $window.innerHeight;
  $scope.yMax = $window.innerWidth;

  $scope.addBox = function() {
    $scope.userbox.start();
    $scope.boxes.push($scope.userbox);
    $scope.userbox = $scope.userbox.duplicate();
  }

  $scope.randomize = function() {
    $scope.userbox = Box.random();
  }
});
