import {printLoginForm, printLogoutBtn } from "./userform.js";


if (localStorage.getItem("username")) {
    console.log("ÄR INLOGGAD");
    printLogoutBtn();
} else {
    console.log("ÄR EJ INLOGGAD");
    printLoginForm();
}