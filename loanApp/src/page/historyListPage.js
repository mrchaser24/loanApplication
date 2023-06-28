import { createElement, appendItem } from "../script.js";

let section = createElement("section", "history-page-content")

function displayFieldItemList(){
    let getItemList = JSON.parse(localStorage.getItem("paymentHistory"))
    
    let divDatas = createElement("div", "data-content")
    getItemList.forEach((item, index) => {
        let divData = createElement("div", "data-container")

        let itemID = createElement("p", "item-data-history", ""+item.id)
        let itemAmount = createElement("p", "item-data-history", ""+item.date)
        let itemMonth = createElement("p", "item-data-history", item.amountPaid)

        appendItem(divData, [itemID, itemAmount, itemMonth])
        divDatas.appendChild(divData)
    });
    
    return divDatas
}

function viewTransactionList() {
    section.innerHTML = ""
    let divContainer = createElement("div", "full-content-trans")

    let divHeader = createElement("div", "header-content")
    let itemID = createElement("p", "item-header-history", "ID")
    let itemAmount = createElement("p", "item-header-history", "Amount Paid")
    let itemDate = createElement("p", "item-header-history", "Date")
    appendItem(divHeader, [itemID, itemAmount, itemDate])
    
    let h3Title = createElement("h3", "trancastion-title", "Transaction History")
    divContainer.appendChild(divHeader)
    divContainer.appendChild(displayFieldItemList())
    section.appendChild(h3Title)
    section.appendChild(divContainer)
}

export function loadHistoryPage() {
    viewTransactionList()
    return section
}