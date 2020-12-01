

// selectors



const todosection = document.querySelector('.todo-list')
const todoinpt = document.querySelector('.todo-input')
const todoAddButton = document.querySelector('.todo-button')
const buttonsCheker = document.querySelector('.todo-list')
const Editsec = document.querySelector('.edit-form')
const editform = document.querySelector('.edit-form')




// events

document.addEventListener('DOMContentLoaded' , getTodosFromLocal)
document.addEventListener('DOMContentLoaded' , getCompleteTodos)
todoAddButton.addEventListener('click' , addTodo)
buttonsCheker.addEventListener('click' , CheckButton)
Editsec.addEventListener('click' , editsecBtn)




let todoEditIndex ;
let todoslist ;

// functions

function addTodo(event) {
    event.preventDefault();
    if(todoinpt.value === ''){
        alert('add somthing first!')
    }else {
        createTodo(todoinpt.value)
        // save todo on local
        addtoStorage(todoinpt.value)
        todoinpt.value = ''
    }
}

function CheckButton(e) {
    item = e.target
    if(item.classList[0] === 'delete-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        // delete from starage
        deleteTodo(todo)
        // remove 
        todo.remove();
            
    }else if(item.classList[0] === 'complete-button'){
        const todo = item.parentElement;
        todo.classList.add('completed');
        // add to array complete and remove from todos
        addcompletdTostrorage(todo);
        
    }else if(item.classList[0] === 'edit-button'){
        const todo = item.parentElement;
        const input = document.querySelector('.editTodo')
        input.value = todo.textContent;
        editform.classList.add('show')
        todoEditIndex = todo
    }
    
}
function editsecBtn(e) {
    e.preventDefault();
    if(e.target.classList[0] === 'editb'){
        item = todoEditIndex.children[0].textContent
        num = todoslist.indexOf(item)
        const input = document.querySelector('.editTodo');
        todoslist[num] = input.value;
        localStorage.setItem('todos' , JSON.stringify(todoslist));
        editform.setAttribute('class' , 'edit-form');
        todoEditIndex.children[0].textContent = input.value
    }
}
// add todos
function addtoStorage(todo){
    let todos ;
    if(localStorage.getItem('todos') === null ){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos' , JSON.stringify(todos));
}
// add completes
function addcompletdTostrorage(todo){
    let complets ;
    if(localStorage.getItem('complets') === null) {
        complets = [];
    }else{
        complets = JSON.parse(localStorage.getItem('complets'));
    }
    complets.push(todo.children[0].textContent)
    clearfromArrayTodos(todo)
    localStorage.setItem('complets' , JSON.stringify(complets))
}
// get todos
function getTodosFromLocal() {
    let todos ;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todoslist = todos;
    }
    todos.forEach(function(todo) {
        const tt = todo
        createTodo(tt)
    });
}
// get completes
function getCompleteTodos() {
    let complets;
    if(localStorage.getItem('complets') === null){
        complets = []
    }else  {
        complets = JSON.parse(localStorage.getItem('complets'));
    }
    complets.forEach(function(todo) {
        const cc = todo
        createCTodo(cc)
    })
}

function clearfromArrayTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const Tindex = todo.children[0].textContent
    console.log(Tindex)
    todos.forEach(function(item){
        if(item === Tindex){
            todos.splice(item.indexOf(Tindex) , 1)
            localStorage.setItem('todos' , JSON.stringify(todos))
        }
    })   
}
function deleteTodo(todo){
    let complets ; 
    if(localStorage.getItem('complets') === null){
        complets = []
    }else{
        complets = JSON.parse(localStorage.getItem('complets'));
    }
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const Tindex = todo.children[0].textContent
    
    const clas = todo.classList[1]
    // console.log(clas);
    if(clas == 'completed'){
        complets.forEach((item)=> {
            if(item == Tindex){
                complets.splice(item , 1)
                localStorage.setItem('complets' , JSON.stringify(complets))
            }
        })
    }else{
        todos.forEach(function(item){
            if(item == Tindex){
                todos.splice(item , 1)
                localStorage.setItem('todos' , JSON.stringify(todos))
            }
        })
    }
    
    
   
}









































// rests

function createTodo(tt) {
     // create the parent Element
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');
     // create the first child li
     const itemTodo = document.createElement('li');
     itemTodo.classList.add('new-item');
     // set the attribult
     itemTodo.textContent = tt;
     todoDiv.appendChild(itemTodo);
     // create buttons
     // edit
     const editButton = document.createElement('button');
     editButton.classList.add('edit-button');
     const editIcon = document.createElement('i');
     editIcon.setAttribute('class' , 'fa fa-edit');
     editButton.appendChild(editIcon);
     todoDiv.appendChild(editButton);
     // complete
     const completeButton = document.createElement('button');
     completeButton.classList.add('complete-button');
     const completeIcon = document.createElement('i');
     completeIcon.setAttribute('class' , 'fa fa-check-square-o');
     completeButton.appendChild(completeIcon);
     todoDiv.appendChild(completeButton);
     // delete
     const DeleteButton = document.createElement('button');
     DeleteButton.classList.add('delete-button');
     const deleteIcon = document.createElement('i');
     deleteIcon.setAttribute('class' , 'fa fa-trash');
     DeleteButton.appendChild(deleteIcon);
     todoDiv.appendChild(DeleteButton);
     // append all to the todoSection
     todosection.appendChild(todoDiv);
}

function createCTodo(cc) {
    // create the parent Element
    const todoDiv = document.createElement('div');
    todoDiv.setAttribute('class' , 'todo completed')
    
    // create the first child li
    const itemTodo = document.createElement('li');
    itemTodo.classList.add('new-item');
    // set the attribult
    itemTodo.textContent = cc;
    todoDiv.appendChild(itemTodo);
    // create buttons
    // edit
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    const editIcon = document.createElement('i');
    editIcon.setAttribute('class' , 'fa fa-edit');
    editButton.appendChild(editIcon);
    todoDiv.appendChild(editButton);
    // complete
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    const completeIcon = document.createElement('i');
    completeIcon.setAttribute('class' , 'fa fa-check-square-o');
    completeButton.appendChild(completeIcon);
    todoDiv.appendChild(completeButton);
    // delete
    const DeleteButton = document.createElement('button');
    DeleteButton.classList.add('delete-button');
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class' , 'fa fa-trash');
    DeleteButton.appendChild(deleteIcon);
    todoDiv.appendChild(DeleteButton);
    // append all to the todoSection
    todosection.appendChild(todoDiv);
}
