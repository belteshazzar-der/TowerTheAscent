var towerApp = angular.module('towerApp', []);
towerApp.controller('towerController', function($scope) {
  $scope.updates = [{id:'1',title:'New Monsters',date:'Jan 10, 2014',content:'10 Additional monsters were added including the marvelous superheros.  These new creatures can be found randomly through attack stuff. The new creatures are as followed:',numComments:'0',comments:[],showComments:false},
  {id:'2',title:'New Heros',date:'Dec 10, 2013',content:'Tons of new stuff was adding in this update.  There just isnt enough room to talk about everything that was updated.  I did just find a bug while type this out though, good to know.',numComments:'2', comments:["I love this update!", "So awesome!"],showComments:false},
  {id:'3',title:'Game Started',date:'Nov 09, 2013',content:'On this artificially created day the game was released.  It instantly soared into popularity and became the best game of all time.',numComments:'0', comments:[],showComments:false}]

  $scope.showForm = false;
  $scope.showTitle = false;

  $scope.toggleComments = function() { 
  	$scope.showComments = !$scope.showComments;
  }

  $scope.addPost = function() 
  {
  	console.log('something')
  }

  $scope.editPost = function(update) 
  {
	$scope.toggleForm();
	$scope.newUpdate = update;
  }

  $scope.toggleComments = function(update) { 
  	update.showComments = !update.showComments 
  }
  
  $scope.addComment = function() 
  {
  	console.log('something')
  }

  $scope.check_empty = function(newUpdate) 
  {
	if (newUpdate == null || newUpdate.title == "" || newUpdate.content == "") 
	{
		alert("Fill All Fields !");
		return
	} 
	for(var i=0;i<$scope.updates.length;i++){
    	if($scope.updates[i].id==newUpdate.id){
        	$scope.toggleForm();
			alert("Updates Saved Successfully...");
        	return;
    	}
    }
	$scope.updates.unshift(newUpdate)
	$scope.toggleForm();
	alert("Form Submitted Successfully...");
  }
  
  $scope.toggleForm = function(){ 
  	$scope.showForm = !$scope.showForm;
  	if($scope.showForm) {
  		$scope.newUpdate = {id:'NA',title:'',date:new Date().toDateString(),content:'',numComments:'0', comments:[], showComments:false};
  	}
  }
});
