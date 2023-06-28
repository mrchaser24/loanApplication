import { dateNow } from "../script.js";
import { updatePaymentPaid } from "./loanFunction.js";

//local storage

let pleaseConfirm = "Refresh Page To Load Localstorage!"

let itemID = 0;

export let getPaymentHistory = JSON.parse(localStorage.getItem("paymentHistory"))
export function setPayment(newVal) {
    localStorage.setItem("payment", newVal)
}
export function setPaymentPaid(newVal) {
    localStorage.setItem("paymentPaid", JSON.stringify(parseInt(JSON.parse(localStorage.getItem("paymentPaid"))) + parseInt(newVal)))
}
export function setPaymentHistory(newVal) {
    let historyArray = getPaymentHistory
    let monthNow = dateNow.getMonth()+1
    
    historyArray.push({
        id:++itemID,
        date: `${monthNow}/${dateNow.getDate()}/${dateNow.getFullYear()}`,
        // time: fullTime,
        amountPaid: newVal
    })
    
    localStorage.setItem("paymentHistory", JSON.stringify(historyArray))
}

function reloadPage(){
    if (localStorage.getItem("payment") != null) {
        return
    }
    if (confirm(pleaseConfirm) == true) {
        localStorage.setItem("paymentStart", 100000)
        localStorage.setItem("payment", 100000)
        localStorage.setItem("paymentPaid", 0)
        localStorage.setItem("paymentHistory", "[]")
        localStorage.setItem("paymentList", "[]")
        location.reload();
    } else {
        reloadPage()
    }
}
reloadPage()