import { dateNow } from "../script.js";

export let getPaylistStore = localStorage.getItem("paymentList")
export let getPaylistStateStore = localStorage.getItem("paymentListState")
export let getPaymentPaidStore = JSON.parse(localStorage.getItem("paymentPaid"))
export let getStartPayStore = JSON.parse(localStorage.getItem("paymentStart"))

let perMonth = []
let perMonthState = []

export function paymentDetail(id, month, currentMonth, remaining){
    if (month < currentMonth) {
        return {
            id: id,
            paid: false,
            remaining: Math.round(remaining+(remaining * 0.035)),
            color: "red-color",
            late: true,
            interest: true,
            month: month,
        }
    }
    return {
        id: id,
        paid: false,
        remaining: remaining,
        color: "grey-color",
        late: false,
        interest: false,
        month: month,
    }
}

export function getLateLoan(){
    let lateDues = []
    JSON.parse(localStorage.getItem("paymentList")).filter(item => item.late == true).forEach(item=> lateDues.push(item.remaining))
    return lateDues.reduce((item, index)=> item + index)
}

export function updatePaymentPaid() {
    let localPerMonthArray = JSON.parse(localStorage.getItem("paymentPaid"))
    perMonth = perMonthState.slice()
    
    perMonth.forEach((item, index) => {
        if (localPerMonthArray > perMonth[index] && perMonth[index] > 0) {
            localPerMonthArray -= perMonth[index]
            perMonth[index] = 0
        }
        else if (localPerMonthArray > 0 && perMonth[index] > 0) {
            perMonth[index] -= localPerMonthArray
            localPerMonthArray = 0
        }
    })
    let newPaymentValue = perMonth.reduce((item, index) => item + index)
    
    localStorage.setItem("payment", newPaymentValue)
    updatePaymentList()
    getLateLoan()
}
export function updatePaymentList(){
    let newPaymentList = JSON.parse(getPaylistStore)
    for (let index = 0; index < 12; index++) {
        newPaymentList[index].remaining = perMonth[index]
    }

    localStorage.setItem("paymentList", JSON.stringify(newPaymentList))
}
export function initPaymentList() {
    let payArray = []
    let currentDate =  dateNow.getMonth()+1
    
    let monthlyPayment = Math.round(getStartPayStore / 12)

    for (let index = 0; index < 12; index++) {
        let monthNum = index
        payArray.push(paymentDetail(index, ++monthNum, currentDate, monthlyPayment))
    }
    
    payArray.map(item => perMonth.push(item.remaining))
    payArray.map(item => perMonthState.push(item.remaining))

    localStorage.setItem("paymentList", JSON.stringify(payArray))
    localStorage.setItem("paymentListState", JSON.stringify(payArray))
    updatePaymentPaid()
}