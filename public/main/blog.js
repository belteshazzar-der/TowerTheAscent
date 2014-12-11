var towerApp = angular.module('towerApp', []);
towerApp.controller('towerController', function($scope, $http) {
  $http.get("/updateData")
   .success(function(response) {$scope.updates = response;});

  $scope.showForm = false;
  $scope.showTitle = false;
  $scope.showCommentForm = false;

  $scope.editPost = function(update) 
  {
	$scope.toggleForm();
	$scope.newUpdate = update;
  }

  $scope.addComment = function(comment) 
  {
	if (comment.msg == "") 
	{
		alert("Fill All Fields !");
		return;
	} 
	$http.post('/addComment', {updateId:comment.update.id, comment:comment.msg}).
  		success(function(data, status, headers, config) {
  			$scope.toggleCommentForm();
  		}).
  		error(function(data, status, headers, config) {
  			if(status == 401) {
				alert("You must be logged in to add a comment.  Go to the game page to log in.");
  			}
  			else {
    			alert("Unable To Add Comment...");
    		}
    		return;
  		});
  }

  $scope.check_empty = function(newUpdate) 
  {
	if (newUpdate == null || newUpdate.title == "" || newUpdate.content == "") 
	{
		alert("Fill All Fields !");
		return
	} 

	$http.post('/updateData', newUpdate).
  		success(function(data, status, headers, config) {
  			$scope.toggleForm();
  			location.reload();
  		}).
  		error(function(data, status, headers, config) {
  			if(status == 401) {
				alert("You must be logged in to add a post.  Go to the game page to log in.");
  			}
  			else {
    			alert("Unable To Add Post...");
    		}
    		return;
  		});
  }
  
  $scope.toggleForm = function(){ 
  	$scope.showForm = !$scope.showForm;
  	if($scope.showForm) {
  		$scope.newUpdate = {id:'NA',title:'',date:new Date().toDateString(),content:'',numComments:0, comments:[], showComments:false};
  	}
  }

  $scope.toggleComments = function(update) { 
  	update.showComments = !update.showComments 
  }

  $scope.toggleCommentForm = function(update) { 
  	$scope.showCommentForm = !$scope.showCommentForm;
  	if($scope.showCommentForm) {
		$scope.comment = {msg:"",update:update};
  	}
  }
});
