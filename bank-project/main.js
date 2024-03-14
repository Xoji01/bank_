import moment from "moment"
import { getData } from "./modules/http"
import { createHeader, reload, reloadTransactions, toaster } from "./modules/ui"
let user = JSON.parse(localStorage.getItem('user'))

let body = document.querySelector('.header')
const tbody = document.querySelector('#latest_transactions_tbody')
createHeader(body)


let user_view = document.querySelector('#user')
let email_view = document.querySelector('.email')
let emailHeader_view = document.querySelector('.user_mail')
let rel = document.querySelector('.reload')

user_view.innerHTML = `${user.name} ${user.surname}`
emailHeader_view.innerHTML = user.email
email_view.innerHTML = user.email

// reload(array, rel)

getData('/wallets?user_id=' + user.id)
.then(res => {
    if (res.status === 200 || res.status === 201) {
        reload(res.data.slice(0, 4), rel);
    }
})
getData('/transactions?user_id=' + user.id)
.then(res => {
    if (res.status === 200 || res.status === 201) {
        reloadTransactions(res.data, tbody, 'small');
    }
})
