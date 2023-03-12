let loginApp = document.querySelector("#loginApp");
let userMsg = document.querySelector("#userMsg");
let loggedInMsg = document.querySelector("#loggedInMsg");

export function printLoginForm() {
    // SKAPA VY FÖR ATT LOGGA IN
    let formDiv = document.createElement("div");
    formDiv.classList.add("log-in-form");

    let loginHeader = document.createElement("h1");
    loginHeader.innerText = "Login";

    let formWrapper = document.createElement("div");
    formWrapper.setAttribute("id", "formId");

    let inputDivName = document.createElement("div");
    inputDivName.classList.add("txt_field");
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("id", "name");
    let span = document.createElement("span");
    let labelName = document.createElement("label");
    labelName.innerText = "Username";

    let inputDivPassword = document.createElement("div");
    inputDivPassword.classList.add("txt_field");
    let passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "password");
    let spanTwo = document.createElement("span");
    let labelPassword = document.createElement("label");
    labelPassword.innerText = "Password";

    let loginBtn = document.createElement("button");
    loginBtn.setAttribute("id", "loginBtn");
    loginBtn.classList.add("login-btn");
    loginBtn.innerText = "Login";

    let signUpDiv = document.createElement("div");
    signUpDiv.classList.add("signup_link");
    let signUpTxt = document.createElement("p");
    signUpTxt.innerText = "Not a member?";

    let signUpBtn = document.createElement("button");
    signUpBtn.setAttribute("id", "signUpBtn");
    signUpBtn.innerText = "Signup";

    inputDivName.append(nameInput, span, labelName);
    inputDivPassword.append(passwordInput, spanTwo, labelPassword);
    signUpDiv.append(signUpTxt, signUpBtn);
    formWrapper.append(inputDivName, inputDivPassword, loginBtn, signUpDiv);
    formDiv.append(loginHeader, formWrapper);

    signUpBtn.addEventListener("click", () => {
        loggedInMsg.innerHTML = "";
        printSignUpForm();
    });

    loginBtn.addEventListener("click", () => {

        let loginUser = {
            name: nameInput.value,
            password: passwordInput.value
        }
        console.log(loginUser);
        fetch("https://jellyfish-app-lhpfw.ondigitalocean.app/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(loginUser)
           })
           .then(res => res.json())
           .then(data => {
                if (data.name) {
                    loggedInMsg.innerHTML = `<h3>Du är nu inloggad ${data.name}!<br>
                    Hoppas du har en fin dag!</h3>`;
                    localStorage.setItem("username", data.name);
                    printLogoutBtn();
                }
                else {
                    userMsg.innerText = "Inloggning misslyckades, var vänlig och kontrollera användarnamn och lösenord."
                }
           });
        });

        loginApp.innerHTML = "";
        userMsg.innerText = "";
        loginApp.append(formDiv);
}

export function printLogoutBtn() {
    // SKAPA LOGGA UT KNAPP    
    let logoutBtn = document.createElement("button");
    logoutBtn.classList.add("log-out-btn");
    logoutBtn.innerText = "Logga ut";


    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        userMsg.innerText = "";
        printLoginForm();
    })
    loginApp.innerHTML = "";
    loginApp.appendChild(logoutBtn);
}

    function printSignUpForm() {
    loginApp.innerHTML = "";
    userMsg.innerText = "";

    let signupFormDiv = document.createElement("div");
    signupFormDiv.classList.add("signup-form");

    let signupHeader = document.createElement("h1");
    signupHeader.innerText = "Signup!";

    let newUserName = document.createElement("input");
    newUserName.setAttribute("type", "text");
    newUserName.setAttribute("name", "name");
    newUserName.setAttribute("id", "newUserName");
    newUserName.placeholder= "name";

    let newUserPassword = document.createElement("input");
    newUserPassword .setAttribute("type", "password");
    newUserPassword .setAttribute("name", "password");
    newUserPassword .setAttribute("id", "newUserpassword");
    newUserPassword.placeholder = "password";

    let saveNewUserBtn = document.createElement("button");
    saveNewUserBtn.setAttribute("id", "newUserBtn");
    saveNewUserBtn.classList.add("new-user-btn");
    saveNewUserBtn.innerText = "Save";

    signupFormDiv.append(signupHeader, newUserName, newUserPassword, saveNewUserBtn);
    loginApp.append(signupFormDiv);

    saveNewUserBtn.addEventListener("click", () => {
        // SKAPA EN NY ANVÄNDARE
        let user = {userName: newUserName.value, password: newUserPassword.value };
        console.log(user);

        // SKICKA TILL SERVERN
       fetch("https://jellyfish-app-lhpfw.ondigitalocean.app/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(user)
       })
       .then(res => res.json())
       .then(data => {
            console.log(data);
            printLoginForm(); 
       });
    })
}   
