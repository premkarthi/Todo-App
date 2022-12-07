import local from "./class.js";
import Store from "./store.js";

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close');
const btnsOpenModal = document.querySelector('.addNew');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  
const closeModal = function (e) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    FormDetail.reset()
    submitBtn.style.display = 'block'
    updateBtn.style.display = 'none'
    document.querySelector('.formTitle').innerHTML = 'Add your task'
}
  
btnsOpenModal.addEventListener('click', openModal)
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
    }
});

//Form Insertion & Validations
const submitBtn = document.querySelector('.submit')
const updateBtn = document.querySelector('.update')
const FormDetail = document.getElementById('form')



submitBtn.addEventListener('click', function(e){
    e.preventDefault()

    const [title, description, statusForm, teamFrom] = FormDetail

    if(FormValidation(title) && FormValidation(description) && FormValidation(statusForm) && FormValidation(teamFrom)){
        let randomNumber = Math.floor(Math.random()*1000)
        let date = new Date().toDateString()
        let data = {
           id : randomNumber,
           date : date,
           title: title.value,
           description: description.value,
           statusForm: statusForm.value,
           teamFrom: teamFrom.value
       }

       local.addTodo(data)
       store.data.push(data)
       FormDetail.reset()
       createListInDom(store.getItems())
   }
 
})

var updateDetail ;
updateBtn.addEventListener('click', function(e){
    e.preventDefault()
    
    if(FormValidation(title) 
        && FormValidation(description) 
        && FormValidation(statusForm)
        && FormValidation(teamFrom)){
        let randomNumber = updateDetail.id
        let date = new Date().toDateString()
        let data = {
           id : randomNumber,
           date : date,
           title: title.value,
           description: description.value,
           statusForm: statusForm.value,
           teamFrom: teamFrom.value
       }
       local.updateTodo(data)
       store.updateTodo(data)
       FormDetail.reset()
       createListInDom(store.getItems())
       closeModal()
    }
})



function FormValidation(detail){
    let errorBlock =  detail.closest('div')
    if(detail.value == '' || detail.value == -1){
        errorBlock.querySelector('.error').innerText = `Please Enter the ${detail.id}`
    }
    else{
        errorBlock.querySelector('.error').innerText = ``
        return true
    }
}



const todoList = document.querySelector('.todoList')
function createListInDom(data){
    todoList.innerHTML = ''
    let todoListsFromLocalStorage = data
    if (todoListsFromLocalStorage.length == 0){
        todoList.innerHTML = '<div class="todo-empty">Your TODO list is empty. Add todo using above button</div>'
    }
    else{
        todoListsFromLocalStorage.forEach((element, index) => {
            let data = ` <div class="listItem">
                            <div class="detail">
                                <h4 class="title">${index+1}. ${element.title} - <span class="date">${element.date}</span> </h4>
                                
                                <p class="description"> ${element.description}.</p>
                                <div class="status">${element.statusForm}</div>
                                <div class="team">${element.teamFrom}</div>
                            </div>
                            <div class="actions">
                                <button id="${element.id}" type="button" class="del">Delete</button>
                                <button id="${element.id}" type="button" class="update">Update</button>
                            </div>
                        </div>`
            
                todoList.insertAdjacentHTML("beforeend", data)
            });
    }
}
 





todoList.addEventListener('click', function(e) {
    if(e.target.classList.contains('del')){
        store.removeItem(e.target.id)
        local.setTodos(store.data)
        createListInDom(store.getItems())
    }
    if(e.target.classList.contains('update')){
        submitBtn.style.display = 'none'
        updateBtn.style.display = 'block'
        document.querySelector('.formTitle').innerHTML = 'Update your task'
        const update = store.getUpdateItem(e.target.id)
        updateDetail = update
        const [title, description, statusForm, teamFrom] = FormDetail
        title.value = update.title
        description.value = update.description
        statusForm.value = update.statusForm
        teamFrom.value = update.teamFrom
        openModal();
    }
})

const statusfilter = document.querySelector('#statusFilter')
const teamfilter = document.querySelector('#teamsFilter')
const sorting  = document.querySelector('#sorting')

statusfilter.addEventListener('change', function (e) {
    var filterData = store.filterBasedOnStatus(e.target.value)
    createListInDom(filterData)
})
teamfilter.addEventListener('change', function (e) {
    var filterData = store.filterBasedOnTeam(e.target.value)
    createListInDom(filterData)
})

sorting.addEventListener('change', function (e) {
       let sortedArray = store.sorting(e.target.value)
       createListInDom(sortedArray)
})


const reset = document.querySelector('.reset')

reset.addEventListener('click', function () {
    document.querySelector('.filters').reset()
})




let datasFromlocal = local.getTodos()
let store = new Store(datasFromlocal)


let createDataAsPerPage = []
let countList = document.querySelector('.pageList')
let item_per_page = 4
let todata = store.getItems()

function Pagination(data, item_per_page){
    let lenthOfData = data.length
    if (lenthOfData == 0){
        return createListInDom(data)
    }
    let pageCount = Math.round(lenthOfData/item_per_page)
    for (let index = 1; index <= pageCount; index++) {
        let createEle = `<li class="pageNum ${(index == 1) ? 'active' : ''}" id="page-${index}">${index}</li>`
        countList.insertAdjacentHTML("beforeend", createEle)
    }
    
    for (let i = 0; i < item_per_page; i++) {
        createDataAsPerPage.unshift(data[i])
    }
    
}   
let paginationDom = document.querySelector('.pagination')

paginationDom.addEventListener('click', function(e){
    if (e.target.classList.contains('pageNum')){
        document.querySelectorAll('.pageNum').forEach((item)=>{
            item.classList.remove('active')
        })
        e.target.classList.add('active')
        let start = (e.target.innerText - 1) * item_per_page
        createPage(start, e.target.innerText *item_per_page)
    }
    
   
    if(e.target.classList.contains('prev')){
        var num =  countList.querySelector('.active')?.previousSibling
        if (num != null || num != undefined){
            document.querySelectorAll('.pageNum').forEach((item)=>{
                item.classList.remove('active')
            })
            num.classList.add('active')
            let start = (num.innerText - 1) * item_per_page
            createPage(start, num.innerText *item_per_page)
        }
        // else{
        //     e.target.style.opacity = 0.5
        // }
    }
    if(e.target.classList.contains('next')){
        var num =  countList.querySelector('.active')?.nextSibling
        if (num != null && num != undefined){
            document.querySelectorAll('.pageNum').forEach((item)=>{
                item.classList.remove('active')
            })
            num.classList.add('active')
            let start = (num.innerText - 1) * item_per_page
            createPage(start, num.innerText *item_per_page)
        }
    }

    function createPage(start, end){
        console.log(start, end);
        createDataAsPerPage = todata.slice(start,end)
        createListInDom(createDataAsPerPage)
    }
})

Pagination(todata, item_per_page)
createListInDom(createDataAsPerPage)
console.log(todata);