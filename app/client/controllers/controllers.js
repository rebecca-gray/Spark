angular.module('spark.controller', [])

.controller('registerCtrl', function($scope, $location){

  $scope.load = function(){
    $location.path('/takesurvey');
  }

})

.controller('takesurveyCtrl', function($scope, $location, surveyFactory, takesurveyFactory){

  $scope.data = [];

  $scope.getRequest = surveyFactory.getRequest;
  $scope.getMatches = takesurveyFactory.getRequest;

  $scope.survey = function(){
    //Makes the get for the survey data
    $scope.getRequest()
    .then(function(data){
      console.log('=',data)
      $scope.data = data;
      $location.path('/survey');
    });

    //Re-routes the view to the survey

  };

  $scope.matches = function(){
    //Makes the get for the survey data
    $scope.getMatches();
    //Re-routes the view to the survey
    $location.path('/main');
  };

})

.controller('surveyCtrl', function($scope, $location, surveyFactory){

   $scope.data = surveyFactory.getData();

   $scope.response = [];

   // $scope.getRequest = function(){
   //   surveyFactory.getRequest()
   //     .then(function(data){

   //       $scope.data = data;
   //     }).catch(function(error){
   //       console.log(error);
   //     });
   // };

   $scope.addResponse = function () {
     console.log('addresponse', $scope.response)
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function (matchesData) {
        $scope.loading = false;
        console.log(matchesData);
        // response is matches object
        //$scope.matches = $scope.response;
        //init matches view and show
        $location.path('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
   };

   $scope.yes = function(event, id){
     event = event;
     var obj = {}
     obj.id = id;
     obj.response = event;
     obj.time_taken = 1000;
     $scope.response.push(obj);
   };

   $scope.no = function(event, id){
     event = false;
     var obj = {}
     obj.id = id;
     obj.response = event;
     obj.time_taken = 1000;
     $scope.response.push(obj);
   };

})

.controller('mainCtrl', function($scope, mainFactory){

  $scope.data = ['Test'];

  $scope.getRequest = function(){
    mainFactory.getRequest()
    .then(function(matches){
      $scope.data = matches;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  // $scope.getRequest();
});
