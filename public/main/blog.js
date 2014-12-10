var towerApp = angular.module('towerApp', []);
towerApp.controller('towerController', function($scope) {
  $scope.updates = [{id:'1',title:'New Monsters',date:'Jan 10, 2014',content:'10 Additional monsters were added including the marvelous superheros.  These new creatures can be found randomly through attack stuff. The new creatures are as followed:',comments:'0'},
  {id:'2',title:'New Heros',date:'Dec 10, 2013',content:'Tons of new stuff was adding in this update.  There just isnt enough room to talk about everything that was updated.  I did just find a bug while type this out though, good to know.',comments:'1'},
  {id:'3',title:'Game Started',date:'Nov 09, 2013',content:'On this artificially created day the game was released.  It instantly soared into popularity and became the best game of all time.',comments:'0'}]

  $scope.showForm = false;

  $scope.toggleComments = function() { 
  	$scope.showComments = !$scope.showComments;
  }

  $scope.addPost = function() 
  {
  	console.log('something')
  }

  $scope.editPost = function() 
  {
  	alert("You are not the owner of this post!");
  }

  $scope.showComments = function(id) 
  {
  	if(document.getElementById('abc').style.display == "block")
  	{
	  document.getElementById('abc').style.display == "none";
  	}
  	else
  	{
	  document.getElementById('abc').style.display == "block";
  	}
  }

  $scope.addComment = function() 
  {
  	console.log('something')
  }

  $scope.check_empty = function() 
  {
	if (document.getElementById('title').value == "" || document.getElementById('msg').value == "") 
	{
		alert("Fill All Fields !");
	} 
	else 
	{
		document.getElementById('form').submit();
		alert("Form Submitted Successfully...");
	}
  }
  $scope.toggleForm = function(){ 
  	$scope.showForm = !$scope.showForm
  }
});
