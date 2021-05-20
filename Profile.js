function checkcookie() {
    var username = "";
    if (getCookie("username") == false) {
        window.location = "login.html";
    }
}
checkcookie();

function getCookie(name) {
    var value = "";
    try {
        value = document.cookie.split(";").find(row => row.startsWith(name)).split('=')[1]
        return value;
    }
    catch (err) {
        return false;
    }
}

readData();


async function readData() {
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
    console.log(response.username);
    const content = await response.json();
    console.log(content);
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

//   pop up
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }
