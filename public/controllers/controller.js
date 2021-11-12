var app = angular.module('helloapp',[])

app.controller('AppCtrl',['$scope', '$http', function($scope,$http)
{

  var refresh = function() {
     $http({
        method: 'GET',
        url: '/emp'
     }).then(function (response)
     {
        $scope.EmployeeDatalist =response.data.Results;
        $scope.fname ='';
        $scope.fposition ='';
        $scope.foffice ='';
        $scope.fsalary ='';
        console.log(response);
        $scope.token = response.data.token;
     },
     function (error){
  
     });
    };

    refresh();
    
     $scope.addContact = function()
     {
         console.log( 'REQ :'+ $scope.token );
        $http({
        method: 'POST',
        url: '/emp',
        headers:
         {
          'Content-Type': 'application/json',
           'x-access-token' : $scope.token
        },
        data:
         {
          name : $scope.fname,
          position:  $scope.fposition,
          office:  $scope.foffice,
          salary:  $scope.fsalary,
        }}).then(function(response) 
        {
          refresh();
        },
        function (error){
        })
    };

    $scope.edit = function(id) 
    {
      console.log(id);

      $http({
        method: 'GET',
        url: '/emp/' + id,
        headers:
         {
          'Content-Type': 'application/json',
           'x-access-token' : $scope.token
        }
     }).then(function (response)
     {
      $scope.fname = response.data[0].name;
      $scope.fposition = response.data[0].position;
      $scope.foffice = response.data[0].office;
      $scope.fsalary =response.data[0].salary;
      $scope.empId = response.data[0]._id;
     },
     function (error){
  
     });
    };  


    $scope.update = function()
     {

      $http({
        method: 'PUT',
        url: '/emp/' + $scope.empId,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token' : $scope.token
        },
        data:
         {
          name : $scope.fname,
          position:  $scope.fposition,
          office:  $scope.foffice,
          salary:  $scope.fsalary
        }
     }).then(function (response)
     {
        refresh();
     },
     function (error)
     {
  
     });

    };


    $scope.remove = function(id) 
    {
      console.log(id);


      $http({
        method: 'DELETE',
        url: '/emp/' + id,
        headers: 
        {
          'Content-Type': 'application/json',
          'x-access-token' : $scope.token
        }
       }).then(function (response)
       {
        refresh();
       },
       function (error)
      {
  
      });

    };


    $scope.deselect = function() {
      $scope.fname ='';
      $scope.fposition ='';
      $scope.foffice ='';
        $scope.fsalary ='';
    }

    
}])