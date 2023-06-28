import { loadViewDetailPage } from "./page/paymentListPage.js";
import { loadHistoryPage } from "./page/historyListPage.js";
import { loadHomePage } from "./page/homePage.js";
import { initPaymentList, updatePaymentList } from "./script/loanFunction.js";
    
//DATE
export let dateNow = new Date();
export let dateTimeZone = dateNow.getTimezoneOffset(-100)

//html APP
export let mainApp = document.getElementById("mainApp")
export let pageTitle = document.getElementById("pageTitle")
export let homeRoute = document.getElementById("homeRoute")
export let historyRoute = document.getElementById("historyRoute")


//PAGE ROUTER
homeRoute.addEventListener("click", ()=>changRoute(0))
historyRoute.addEventListener("click", ()=>changRoute(1))
export let currentPage = 0
export function changRoute(route){
    mainApp.innerHTML = ""
    if (route == 0) {
        mainApp.appendChild(loadHomePage())
    }
    if (route == 1) {
        mainApp.appendChild(loadHistoryPage())
    }
    if (route == 2) {
        mainApp.appendChild(loadViewDetailPage())

    }

}

//Create Element
export function createElement(elementType, className, value, elemID, color) {
    let newElement = document.createElement(elementType)
    if (className != "" && className != undefined) newElement.className = className
    if (value != "" &&  value != undefined) newElement.innerHTML = value
    if (elemID != "" &&  elemID != undefined) newElement.id = elemID
    if (elemID != "" &&  elemID != undefined) newElement.style.backgroundColor = color
    // if (func != "" &&  func != undefined && elementType == "button") newElement.onclick = func
    return newElement
}

export function createInput(inputType, className, placeholder, elemID) {
    let newElement = document.createElement("input")
    if (inputType != "" && inputType != undefined) newElement.type = inputType
    if (className != "" && className != undefined) newElement.className = className
    if (placeholder != "" &&  placeholder != undefined) newElement.placeholder = placeholder
    if (elemID != "" &&  elemID != undefined) newElement.id = elemID
    return newElement
}

export function appendItem(parent, arrayList){
    for (let index = 0; index < arrayList.length; index++) {
        parent.appendChild(arrayList[index])
    }
}

function onLoad() {
    if (localStorage.getItem("payment") != null) {
        initPaymentList()
        updatePaymentList()

        mainApp.appendChild(loadHomePage())
    }
}
onLoad()