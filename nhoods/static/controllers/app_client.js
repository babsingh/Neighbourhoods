var app = angular.module('myApp', []);

app.controller('homeController', ['$scope', '$http',
                                function($scope, $http) {

    $scope.project = 'BlueHack Neighbourhoods';

    $scope.setContent = function(filename) {
        $scope.content = '/static/views/' + filename;
    };

}]);                                	