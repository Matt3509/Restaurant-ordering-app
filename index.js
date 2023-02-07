import { menuArray } from './data.js'

let orderedItemsArray = []

const blur = document.getElementById('blur')
const modal = document.getElementById('modal')
const menuItems = document.getElementById('menu-items')
const orderedItems = document.getElementById('ordered-items')
const fullPrice = document.getElementById('total-price')
const yourOrder = document.getElementById('your-order')
const loginForm = document.getElementById('pay-form')

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        addToOrder(e.target.dataset.add)
    } else if (e.target.dataset.remove) { 
        orderedItemsArray.pop(e.target.dataset.remove)
        renderOrder()
    } else if (e.target.dataset.complete) {
        displayModal()
    }  
})

function render() {
    let menuHtml = ' ';
    menuArray.forEach((menuItem) => {
        menuHtml += `
            <div class='menuItem'> 
                <div class='flex'>
                    <div>
                        <p class='emoji'>${menuItem.emoji}</p>
                    </div>
                    <div class='items'>
                        <p class='item-name'>${menuItem.name}</p>
                        <p class='item-ingredients'>${menuItem.ingredients}</p>
                        <p class='item-price'>£${menuItem.price}</p>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-plus icon" data-add="${menuItem.id}"></i>
                </div>
            </div>
        </div>
     `   
    })
    menuItems.innerHTML = menuHtml
}

function addToOrder(itemId) {
    const orderedItem = menuArray.filter((item) => {
        return item.id == itemId
    }) [0]
    orderedItemsArray.push(orderedItem)
    renderOrder()
}

function renderOrder() {
   let totalPrice = 0
   let orderHtml = ''
   
   if (orderedItemsArray.length > 0) {
        orderedItemsArray.forEach((item) => {
       
       yourOrder.innerHTML = `<h2 class='order-heading'>Your order</h2>`
       orderHtml += `
       <div class='ordered-items'>
            <div class='flex'>
                <div>
                    <p class='ordered-name'>${item.name}</p>
                </div>
                <div>
                    <button class='remove-btn' id='remove-btn' 
                    data-remove=${item.id}>remove</button>
                </div>
            </div>
            <div>
                <p class='ordered-price'>£${item.price}</p>
            </div>
        </div>
       `
       
       totalPrice += item.price
       
       
       fullPrice.innerHTML = `<div class='price'>
       <p class='full-price'>Total price : £${totalPrice}</p>
       <button class='complete-btn' 
       id='complete-btn' 
       data-complete='complete-btn'>Complete Order</button>
       </div>
       `
}) 
   } else {
       fullPrice.innerHTML = ''
       yourOrder.innerHTML = ''
   }
    orderedItems.innerHTML = orderHtml
}

function displayModal() {
    modal.style.display = 'block'
    blur.style.opacity = '.1'
    orderedItems.innerHTML = ''
    fullPrice.innerHTML = ''
    yourOrder.innerHTML = ''
}


document.getElementById('pay-btn').addEventListener('click', () => {
    modal.style.display = 'none'
    blur.style.opacity = '1'
    orderedItemsArray = []
    const loginFormData = new FormData(loginForm)
    const name = loginFormData.get('name')
    orderedItems.innerHTML = `
        <p class='thank-you'>Thanks ${name} for your order!. It'll be with you shortly.</p> 
    `
})

render()