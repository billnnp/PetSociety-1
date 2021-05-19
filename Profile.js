function checkcookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}

    checkCookie();
    window.onload = 

    function getcookie(name){
        var value = "";
        try{
            value = document.cookie.split(";").find(row =>row.startsWith(name)).split('=')[1]
            return value;
        }
        catch(err){
            return false;
        }

    }
    function pageload(){

    }