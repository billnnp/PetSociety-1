
function checkCookie() {
    var username = "";
    if (getCookie("username") == false) {
        window.location = "login.html";
    }
}
checkCookie();
function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

readData();
async function readData() {
    console.log(getCookie("username"))
    const response = await fetch("/postprofile", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: getCookie("username")
        })
    })
    const content = await response.json();
    showdata(content);
}

function showdata(data) {
    var maindiv = document.getElementById("Datacontainer")
    var userbox = document.getElementById("user")
    userbox.innerHTML = data.username
    var passbox = document.getElementById("password")
    passbox.innerHTML = data.password;
    var emailbox = document.getElementById("email")
    emailbox.innerHTML = data.email;
}

document.getElementById("confirmbtn").onclick= editprofile;

async function editprofile(data) {
        const response = await fetch("/editprofile", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldusername: getCookie("username"),
                username: document.getElementById("Eusername").value,
                password: document.getElementById("Epassword").value,
                email: document.getElementById("Eemail").value
            })
        })
        const content = await response.json();
 
        readData();
}

//   pop up
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }
