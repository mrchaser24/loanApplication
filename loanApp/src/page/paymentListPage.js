import { createElement, createInput, appendItem, mainApp } from "../script.js";

let section = createElement("section", "view-detail-page-content")
let monthName = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function displayFieldItemList(){
    let getItemList = JSON.parse(localStorage.getItem("paymentList"))
    
    let divDatas = createElement("div", "data-content")
    getItemList.forEach((item, index) => {
        let divData = createElement("div", "data-container")

        let itemID = createElement("p", "item-data", ""+item.id)
        let itemRemaining = createElement("p", "item-data", ""+item.remaining)
        let itemMonth = createElement("p", "item-data", monthName[index])
        let itemLate = createElement("p", "item-data "+item.color, ""+ item.late == "true"? "LATE":"GOOD", "")

        appendItem(divData, [itemID, itemRemaining, itemMonth, itemLate])
        divDatas.appendChild(divData)
    });
    
    return divDatas
}

function viewPaymentList() {
    section.innerHTML = ""
    let divContainer = createElement("div", "full-content")

    let divHeader = createElement("div", "header-content")
    let itemID = createElement("p", "item-header", "ID")
    let itemRemaining = createElement("p", "item-header", "Due Amount")
    let itemLate = createElement("p", "item-header", "Status")
    let itemMonth = createElement("p", "item-header", "Month")
    appendItem(divHeader, [itemID, itemRemaining, itemMonth, itemLate])
    
    
    let h3Title = createElement("h3", "view-detail-title", "Loan Detail")
    divContainer.appendChild(divHeader)
    divContainer.appendChild(displayFieldItemList())
    section.appendChild(h3Title)
    section.appendChild(divContainer)
}

export function loadViewDetailPage() {
    viewPaymentList()
    return section
}

/**
    id: id,
    paid: false,
    remaining: remaining,
    color: "grey-color",
    late: false,
    interest: false,
    month: month,
 */