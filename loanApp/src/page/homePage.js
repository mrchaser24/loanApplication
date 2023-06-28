
import { setPayment, setPaymentPaid, setPaymentHistory } from "../script/localStore.js";
import { updatePaymentPaid, getLateLoan } from "../script/loanFunction.js";
import { createElement, createInput, appendItem, mainApp, changRoute } from "../script.js";

let section = createElement("section", "home-page-content")

/**
 * Title of user detail
 * user name
 * loan balance
 * paid amount
 * recent payment - date, amount paid
 */

//TOP TITLE SIDE
let sectionTitle = createElement("section", "title-content")
let titleLabel = createElement("h3", "title-Label", "LOAN APP")
sectionTitle.appendChild(titleLabel)

//LEFT SIDE CONTENT
let divLeft = createElement("div", "left-content")
function leftDivContent(){
    divLeft.innerHTML = ""
    let divLeft1 = createElement("div", "field-card-container")
    let userNameLabel = createElement("p", "field-card-label", "Account Name")
    let userNameValue = createElement("p", "field-card-value", "Chase Arcos Hermosisima")
    appendItem(divLeft1, [userNameLabel, userNameValue])

    let divLeft2 = createElement("div", "field-card-container")
    let recentPaymentDateLabel = createElement("p", "field-card-label", "Date")
    let recentPaymentDateValue = createElement("p", "field-card-value", JSON.parse(localStorage.getItem("paymentHistory")).length == 0? "N/A": JSON.parse(localStorage.getItem("paymentHistory")).pop().date)
    appendItem(divLeft2, [recentPaymentDateLabel, recentPaymentDateValue])
    
    let divLeft3 = createElement("div", "field-card-container")
    let recentPaymentAmountPaidLabel = createElement("p", "field-card-label", "Recent Amount Paid")
    let recentPaymentAmountPaidValue = createElement("p", "field-card-value", JSON.parse(localStorage.getItem("paymentHistory")).length == 0? "N/A": JSON.parse(localStorage.getItem("paymentHistory")).pop().amountPaid)
    appendItem(divLeft3, [recentPaymentAmountPaidLabel, recentPaymentAmountPaidValue])

    let divLeft4 = createElement("div", "field-card-container")
    let loanBalanceLabel = createElement("p", "field-card-label", "Loan Balance")
    let loanBalanceValue = createElement("p", "field-card-value", "PHP "+localStorage.getItem("payment"))
    appendItem(divLeft4, [loanBalanceLabel, loanBalanceValue])
    
    let divLeft5 = createElement("div", "field-card-container")
    let recentPaymentPaidLabel = createElement("p", "field-card-label", "Total Paid")
    let recentPaymentPaidValue = createElement("p", "field-card-value", localStorage.getItem("paymentPaid"))
    appendItem(divLeft5, [recentPaymentPaidLabel, recentPaymentPaidValue])
    
    let recentPaymentDiv = createElement("div", "left-card-content")
    appendItem(recentPaymentDiv, [divLeft1, divLeft2, divLeft3, divLeft4, divLeft5])
    divLeft.appendChild(recentPaymentDiv)
    section.appendChild(divLeft)
}


//RIGHT SIDE CONTENT
let divRight = createElement("div", "right-content")
function rightDivContent() {
    divRight.innerHTML = ""
    
    let divRight1 = createElement("div", "field-card-container")
    let userNameLabel = createElement("p", "field-card-label", getLateLoan() > 0?"Total Due Date":"Next Due Amount")
    let userNameValue = createElement("p", "field-card-value "+(getLateLoan() > 0? "late-due-date-field":"due-date-field"), "PHP "+(getLateLoan() > 0? getLateLoan() : JSON.parse(localStorage.getItem("paymentList")).filter(item => item.late == false)[0].remaining))
    appendItem(divRight1, [userNameLabel, userNameValue])
    
    let divRight2 = createElement("div", "field-card-action-container")
    let inputFieldLabel = createElement("p", "field-card-label", "Input Amount")
    let inputFieldValue = createInput("text", "payment-text-field", "Input Amount Here")
    appendItem(divRight2, [inputFieldLabel, inputFieldValue])

    let divRight3 = createElement("div", "field-card-action-container")
    let btnView = createElement("button", "view-btn", "VIEW DETAIL", "viewDetail")
    let btnPay = createElement("button", "submit-btn", "PAY NOW", "payNow")
    appendItem(divRight3, [btnView, btnPay])

    btnView.onclick = function paymentSubmit() {
        changRoute(2)
    }
    btnPay.onclick = function paymentSubmit() {
        if (isNaN(parseInt(inputFieldValue.value)) || parseInt(inputFieldValue.value) <= 0) {
            alert("Value is less than 0 or is not a number!", undefined)
            return
        }
        if (parseInt(inputFieldValue.value) > parseInt(localStorage.getItem("payment"))) {
            alert("Value is bigger than Loan, please input exact amount", undefined)
            return
        }
        
        setPayment(localStorage.getItem("payment") - inputFieldValue.value)
        setPaymentPaid(inputFieldValue.value)
        setPaymentHistory(inputFieldValue.value)
        
        updatePaymentPaid()
        loadDom()
    }

    let recentPaymentDiv = createElement("div", "right-card-content")
    appendItem(recentPaymentDiv, [divRight1, divRight2, divRight3])
    divRight.appendChild(recentPaymentDiv)
    section.appendChild(divRight)
}

function loadDom() {
    // mainApp.appendChild(sectionTitle)
    leftDivContent()
    rightDivContent()
}

export function loadHomePage() {
    loadDom()
    return section
}