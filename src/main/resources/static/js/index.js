// Delcaring the angular module
var app = angular.module("myApp", ["ngRoute"]);

var root = "";

//Configuring the routing
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "homeController"
        })
        .when("/user", {
            templateUrl: "views/user.html",
            controller: "userController"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "loginController"
        })
        .when("/admin", {
            templateUrl: "views/admin.html",
            controller: "adminController"
        })
        .otherwise({
            templateUrl: "views/home.html",
            controller: "homeController"
        });
    //to remove the # in the URL
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});



//HomeController's declaration
app.controller('homeController', function ($scope, $http) {
    $http.get(root + "api/security/home").then(function (response) {
        $scope.hello = response.data.data;
    });
});

//UserController's declaration
app.controller('userController', function ($scope, $http, $location, $rootScope) {
    $http.get(root + "api/security/user").then(function (response) {
        $scope.hello = response.data.data;
    });

    $scope.logout = function () {
        $http.post(root + "logout").success(function () {
            $location.path("/home");
            //initialize the role
            $rootScope.role = "ROLE_ANONYMOUS";
            console.log($rootScope.role);
        });
    };
});

//adminController's declaration
app.controller('adminController', function ($scope, $http, $location, $rootScope) {
    $http.get(root + "api/security/admin").then(function (response) {
        $scope.hello = response.data.data;
    });

    $scope.logout = function () {
        $http.post(root + "logout").success(function () {
            $location.path("/");
            //initialize the role
            $rootScope.role = "ROLE_ANONYMOUS";
            console.log($rootScope.role);
        });
    };
});

//loginController's declaration
app.controller('loginController', function ($scope, $http, $location, $rootScope) {

    $scope.login = function (username, password) {

        //Sending credentials
        $http.post("views/login.html?username=" + username + "&password=" + btoa(password)).success(function () {
            // Getting actual user's role
            $http.get(root + "api/security/role").success(function (response) {
                //Routing according response
                if (angular.equals(response, "ROLE_ADMIN")) {
                    $location.path("/admin");
                    $scope.error = ""
                }
                else if (angular.equals(response, "ROLE_USER")) {
                    $location.path("/user");
                    $scope.error = ""
                }
                else {
                    $scope.error = "bad credentials"
                }
                //getting role
                $rootScope.role = response;
                console.log($rootScope.role);
            });
        })

    }
});

//indexController's declaration
app.controller('indexController', function ($scope, $http, $location, $rootScope) {
    // get URL Base Path and remove /#
    root = $location.$$absUrl;
    //Initializing the user's role
    $rootScope.role = "ROLE_ANONYMOUS";
    //On changing the path, this method checks the user's role and redirect him
    $rootScope.$on("$routeChangeStart", function () {
        //if the user want to access /user whithout privilege, he will be redirected to /login
        if (angular.equals($location.path(), "/user") && (!angular.equals($rootScope.role, "ROLE_USER")) && (!angular.equals($rootScope.role, "ROLE_ADMIN"))) {
            $location.path("/login");
        }
        //if the user want to access /admin whithout privilege, he will be redirected to /login
        if (angular.equals($location.path(), "/admin") && !angular.equals($rootScope.role, "ROLE_ADMIN")) {
            $location.path("/login");
        }
    });
});
