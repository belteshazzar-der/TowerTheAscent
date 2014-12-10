
var addPost = function() 
{
  console.log('something')
}

var editPost = function() 
{
  console.log('something')
}

function showComments(id) 
{
  if(document.getElementById('abc').style.display == "block")
  {
	document.getElementById('abc').style.display == "none"
  }
  else
  {
	document.getElementById('abc').style.display == "block"
  }
}

function addComment() 
{
  console.log('something')
}

function check_empty() 
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
//Function To Display Popup
function div_show(id) 
{
	document.getElementById(id).style.display = "block";
}
//Function to Hide Popup
function div_hide(id)
{
	document.getElementById(id).style.display = "none";
}
