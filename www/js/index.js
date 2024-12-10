let page = ["#home", "#aboutUs", "#search", "#createAccount", "#manageUsers", "#accountDetails", "#cart", "#modGames"];
let user;
let userCart =[];
let curPage = page[0];
let inputOrder =["Username", "Password", "Name", "Number", "Email", "Address", "Staff"];

function genreSearch(genre)
{
	//php will process the information and create cookie if log in was successful
	let xhr = new XMLHttpRequest();
	let data = "genre=" + encodeURI(genre);
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState==4 && xhr.status==200)
		{
			if (this.responseText !="false")
			{
				printGameResults(this.responseText);
			}
		}
	}
	//has to be inside the 
	xhr.open ("post", "php/genreSearch.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}

$(document).ready(function(){
	$('#topNav a').click(function(e)
	{
		e.preventDefault();
		var newPage = $(this).attr('href');
		window.location.hash=newPage;
	});
	$(window).on('hashchange', function()
	{
		var newPage = getPage(window.location.hash);
		render(newPage)
	});
});

function verifyInput(who)
{	
	let form = document.getElementById(who.parentElement.id);
	for (let i = 0; i < form.elements.length; i++)
	{

		if(form.elements[i].id.includes("Username"))
		{
			if(!form.elements[i].value)
			{	
				return false;
			}
			if(form.elements[i].value.length > 15)
			{
				return false;
			}
		}
		//Check if empty only
		if(form.elements[i].id.includes("Password"))
		{
			if(form.elements[i].value == "")
			{
				return false;
			}
			if(form.elements[i].value.length > 15)
			{
				return false;
			}
		}
		//Can only have letters and hyphen and spaces
		if(form.elements[i].id.includes("Name"))
		{
			if(form.elements[i].value == "")
			{
				return false;
			}
			if(form.elements[i].value == /[^a-zA-Z]/)
			{
				return false;
			}
			if(form.elements[i].value.length > 15)
			{
				return false;
			}
		}
	//Check if has numbers only and its not too long
		if(form.elements[i].id.includes("Number"))
		{
			if(form.elements[i].value == "")
			{
				return false;
			}
			if(!parseInt(form.elements[i].value))
			{
				return false;
			}
			if(form.elements[i].value.length > 10)
			{
				return false;
			}
		}
//Check if empty only
		if(form.elements[i].id.includes("Email"))
		{
			if(form.elements[i].value == "")
			{
				return false;
			}
			if(form.elements[i].value.length > 25)
			{
				return false;
			}
		}
//Check if empty only
		if(form.elements[i].id.includes("Address"))
		{
			if(form.elements[i].value == "")
			{
				return false;
			}
		}
	}
	return true;	
}

function createAccount()
{
	let xhr = new XMLHttpRequest();
	let data = "username=" + encodeURI($("#createAccountUsername").val());
	data += "&password=" + encodeURI($("#createAccountPassword").val());
	data += "&name=" + encodeURI($("#createAccountName").val());
	data += "&number=" + encodeURI($("#createAccountNumber").val());
	data += "&email=" + encodeURI($("#createAccountEmail").val());
	data += "&address=" + encodeURI($("#createAccountAddress").val());
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status==200)
		{
			alert(this.responseText);
			if (this.responseText)
				populateTable($("#createAccountUsername").val());
			else
				alert(this.responseText);
		}
	}
	xhr.open("post", "php/createAccount.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}
function populateTable(user)
{
	if (userCart.length)
	{
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState == 4 && xhr.status==200)
			{
				alert(this.responseText);
			}
		}
		for (let i = 0; i < userCart.length; i ++)
		{
			xhr.open("post", "php/addToCart.php", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			let data = "name=" + encodeURI(user);
			data += "&gameName="+ encodeURI(userCart[i]);
			xhr.send(data);
		}
	}
}

function logOut()
{
	user = null;
	$("#currentUser").html("");
	$(".admin").hide();
	$(".user").hide();
	$(".noUser").show();
	$("#loginUsername").val("");
	$("#loginPassword").val("");
	render("#home");
}

function logIn()
{
	//php will process the information and create cookie if log in was successful
	let xhr = new XMLHttpRequest();
	let data = "name=" + encodeURI($("#loginUsername").val());
	data += "&pword=" + encodeURI($("#loginPassword").val());
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState==4 && xhr.status==200)
		{
			if (this.responseText !="false")
			{
				loginLogic(this.responseText);
			}
			else
				alert("Invalid Login Details");
		}
	}
	xhr.open("post", "php/logIn.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}

function makeStaff()
{
	let name = $("#manageUserName").val();
	let data = "name=" + encodeURI(name);
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function()
	{
		if (xhr.readyState==4 && xhr.status==200)
		{
			alert("made staff");
		}
	}
	xhr.open("post", "php/makeStaff.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);

}
function loginLogic(reponse)
{
	let jsonArray =  JSON.parse(reponse);
	$(".noUser").hide();
	user = jsonArray[0][0];
	$("#currentUser").html(jsonArray[0][0]);
	if (jsonArray[0][1] == "0")
	{
		alert ("logged in as user");
		$(".admin").hide();
		$(".user").show();
	}
	if (jsonArray[0][1] == "1")
	{
		alert("logged in as staff");
		$(".user").hide();
		$(".admin").show();
	}
	render("#home");
}
function render(newPage)
{
	if (newPage == curPage) return;
	$(curPage).hide();
	$(newPage).show();
	if (newPage == "#cart")
		getCart(user, newPage);
	if (newPage =="#accountDetails")
		getDetails(user, newPage);
	curPage = newPage;
}
function getPage(hash)
{
	let i = page.indexOf(hash);
	if (i < 0 && hash != "") 
		window.location.hash=page[0];
	return i < 1 ? page[0] : page[i];
}
//add where to print here. for admin manage user, user manage user or cart
function printCart(results, location)
{
	$(location).html("");
	if (results == "false")
	{
		$(location).append("<p> Cart is empty</p>");
		alert("Cart is empty");
		return;
	}
	let jsonArray = JSON.parse(results);
	let table=$("<table id =\"" + location + "\">").addClass("myTable");
	let header =$("<tr>");
	header.append("<th> Game Name </th>");
	header.append("<th> Price </th>");
	header.append("<th> Quantity </th>");
	table.append(header);
	for (let i = 0; i <jsonArray.length; i++)
	{
		let row =$("<tr>");
		row.append("<td>" + jsonArray[i][1] + "</td>");
		row.append("<td>" + jsonArray[i][2] + "</td>");
		row.append("<td>" + jsonArray[i][3] + "</td>");
		let removeButton=$("<button id =\"" + jsonArray[i][1] + "\">").text("Remove Item").click(function(){removeItemCart(this, location); });
		row.append($("<td>").append(removeButton));
		table.append(row);
	}
	$(location).append(table);
	if(!location.includes("manage"))
		$(location).append("<button onclick =\"order(this);\"> Order </button>");
}

function order()
{
	let xhr = new XMLHttpRequest();
	let data = "name=" + encodeURI(user);
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4 && xhr.status == 200)
		{
			alert(this.responseText);
		}
	}
	xhr.open("post", "php/processOrder.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}
function removeItemCart(game, location)
{
	//split it, use 3rd arry entry for updating db.
	if (location == "userCart")
	{
		let index = userCart.indexOf(game.id);
		if (index >-1)
		{
			userCart.splice(index, 1);
			alert("game removed");
		}
		return;
	}
	let data = "&game=" + encodeURI(game.id);
	if (location =="#cart")
		data += "&name=" + encodeURI(user);
	else
		data+= "&name=" + encodeURI($("#manageUserName").val());
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status==200)
		{
			if (this.responseText == "true")
				alert("game removed");
			else 
			alert("error removing game");
		}
	}
	xhr.open("post", "php/removeCart.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}
function printNoUserCart(userCart)
{
	$("#cart").html("");
	let table=$("<table id =\"noUserCart\"/>");
	let header =$("<th> Game Name </th>");
	let location ="userCart";
	table.append(header);
	for (let i = 0; i < userCart.length; i++)
	{
		let row =$("<tr>");
		row.append("<td>" + userCart[i] + "</td>");
		let removeButton =$("<button id = \"" + userCart[i] +  "\">").text("Remove Item").click(function(){removeItemCart(this,location); });
		row.append(removeButton);
		table.append(row);
	}
	$("#cart").append(table);

}
function getCart(name, location)
{
	if (!name)
	{
		printNoUserCart(userCart);
		return;
	}
	let xhr = new XMLHttpRequest();
	let data = "name=" + encodeURI(name);
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4 && xhr.status == 200)
		{
			printCart(this.responseText, location);
		}
	}
	xhr.open("post", "php/getCart.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}

function printDetails(response, location)
{
	let jsonArray = JSON.parse(response);
	$(location+"Name").val(jsonArray[0][0]);
	$(location+"Number").val(jsonArray[0][1]);
	$(location+"Email").val(jsonArray[0][2]);
	$(location+"Address").val(jsonArray[0][3]);
}


function updateDetails(where)
{
	where = where.parentElement.id;
	let form;
	let who;
	if (where.includes("Details"))
	{
		form = document.getElementById("updateAccountForm");
		who = user;
	}
	else
	{
		form = document.getElementById("updateUsersForm");
		who = $("#manageUserName").val();
	}
	let formArray = [];
	for (let i = 0; i < form.elements.length; i++)
	{
		formArray.push(form.elements[i].value)
	}
	let data= "name=" + encodeURI(who);
	data+= "&info=" + formArray.join(',');
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			alert(this.responseText);
		}
	}
	xhr.open("post", "php/updateDetails.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}
function getDetails(name, location)
{
	let xhr = new XMLHttpRequest();
	let data = "name=" + encodeURI(name);
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			printDetails(this.responseText, location);
		}
	}
	xhr.open("post", "php/getDetails.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}
function manageUser()
{
	let name = $("#manageUserName").val();
	getDetails(name, "#manageUsers");
	getCart(name, "#manageUserCart");

}
function adminLogin()
{
	$(".user").hide();
	$(".noUser").hide();
	$(".admin").show();
	$("#currentUser").html(user);
}
function userLogin()
{
	//php will process the information and create cookie if log in was successful
	let xhr = new XMLHttpRequest();
	let data = "name=" + encodeURI($("#userName").val());
	data += "&pword=" + encodeURI($("#password").val());
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState==4 && xhr.status==200)
		{
			alert("loged in as " + this.responseText);
			if (this.responseText)
				user = this.responseText;
		}
	}
	

	xhr.open("post", "php/logIn.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
	$(".noUser").hide();
	$(".admin").hide();
	$(".user").show();
	$("#currentUser").html(user);
}

function noUser()
{
	$(".admin").hide();
	$(".user").hide();
	$(".noUser").show();
}
function dbSearch()
{
	let data = "name=" + encodeURI(user);
	data +="&gameName=" + encodeURI($("#gameName").val());
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status == 200)
			{
				printGameResults(this.responseText);
			}
	}
	xhr.open("post", "php/gameSearch.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
}
function addToCart(id)
{
	if (!user)
	{
		userCart.push(id);
	}
	else
	{
		let data = "name=" + encodeURI(user);
		data += "&gameName=" + encodeURI(id);
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				alert(this.responseText);
			}
		}
 		xhr.open("post", "php/addToCart.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}
}
function printGameResults(jsonData)
{
	$("#resultsHere").html("");
	let temp = JSON.parse(jsonData);
	for (let i =0; i < temp.length; i ++)
	{
		let tempName = temp[i][0];
		$("#resultsHere").append("<figure/><img src = \"img/" + tempName + ".png\">"  + 
		" <figcaption>" + tempName 
		+ " <br /><button id =\"" + tempName + "\"onclick =\"addToCart(this.id);\"> Add To Cart </button> <br />"
		+ "Price: " + temp[i][1] + "</figcaption> </figure>")
	}
}

function addVerify()
{
	let valid = true;
	let checkGenres = [];
	if(document.getElementById("addGameName").value == "")
	{
		alert("enter a gamename to add");
		return false;
	}
	if(document.getElementById("stock").value == "")
	{
		alert("enter a stock value");
		return false;
	}
	if(document.getElementById("price").value == "")
	{
		alert("enter a price");
		return false;
	}
	var checkbox = document.forms['addGame'].elements['genres'];
	var empty = true;
	for(var i = 0; i < checkbox.length; i++)
	{
		checkGenres.push(checkbox[i].checked ? 1 : 0);
	}
	alert(checkGenres);
	let xhr = new XMLHttpRequest();
	let data = "genres=" + checkGenres.join(',');
	data += "&gameName=" + encodeURI($("#addGameName").val());
	data +="&stock="  + encodeURI($("#stock").val());
	data += "&price=" + encodeURI($("#price").val());
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status==200)
		{
			alert(this.responseText);
		}
	}
	xhr.open("post", "php/addGame.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
	return false;
}

function removeVerify()
{
	if(document.getElementById("removeGameName").value == "")
	{
		alert("enter a game name to remove");
		return false;
	}
	let xhr = new XMLHttpRequest();
	let data = "gameName=" + encodeURI($("#removeGameName").val());
	alert(data);
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status==200)
		{
			alert(this.responseText);
		}
	}
	xhr.open("post", "php/removeGame.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(data);
	return false;
}
