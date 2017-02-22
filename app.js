if(angular){
	'use strict';
	var app = angular.module('myApp',[]);
	
	app.controller('ParentController',function($scope){
		$scope.data = {
			userInput: '',
			countHit: 0,
			stringInArray: [],
            radius : 140,
            theta: [],
            colors: [],
            linex1: 183,
            liney1: 179,
            mainDivId: 'main',
            svgId: 'svgMain'
		};
        $scope.onInitialize = function(){
            var colorArray = [];
            for(let count = 0; count<500; count++){
                colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
            };
            $scope.data.colors = colorArray;
            
        };
       
        $scope.getx2 = function(letter,index){
            var main = document.getElementById($scope.data.svgId);
            var r = angular.copy($scope.data.radius);
            var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
            var posx = Math.round(r * (Math.cos($scope.data.theta[index]))) + 'px';
            var x2 = (((mainHeight/ 2 ) + parseInt(posx.slice(0, -2))));
            return x2;
        }
        $scope.gety2 = function(letter,index){
            var main = document.getElementById($scope.data.svgId);
            var r = angular.copy($scope.data.radius);
            var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
            var posy = Math.round(r * (Math.sin($scope.data.theta[index]))) + 'px';
            var y2 = (((mainHeight / 2) - parseInt(posy.slice(0, -2))));
            return y2;
        }
		$scope.generate = function(n, r, id) {
			$scope.data.theta = [];
		    var frags = 360 / n;
		    for (var i = 0; i <= n; i++) {
		        $scope.data.theta.push((frags / 180) * i * Math.PI);
		    }
		}
		$scope.applyStyle = function(i,nodeName){
            var main = document.getElementById($scope.data.mainDivId);
            var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
            var r = $scope.data.radius;
            var n = $scope.data.stringInArray.length;
            var circleStyleObj = {};
            var posx = Math.round(r * (Math.cos($scope.data.theta[i]))) + 'px';
            var posy = Math.round(r * (Math.sin($scope.data.theta[i]))) + 'px';
            circleStyleObj.position = "absolute";
            circleStyleObj['background-color'] = ($scope.data.colors[i])?$scope.data.colors[i]: '#fff';
            circleStyleObj.top = ((mainHeight / 2) - parseInt(posy.slice(0, -2))) + 'px';
            circleStyleObj.left = ((mainHeight/ 2 ) + parseInt(posx.slice(0, -2))) + 'px';
            return circleStyleObj;
        };
		$scope.reCalculate = function(){
			$scope.data.stringInArray = $scope.data.userInput.toUpperCase().replace(/\s/g, '').split("");
            if($scope.data.stringInArray.length <= 30){
                $scope.data.radius = 140;
            }else{
                $scope.data.radius = 190;
            }
			$scope.generate($scope.data.stringInArray.length, $scope.data.radius, $scope.data.mainDivId);
           
		};
	});
}
