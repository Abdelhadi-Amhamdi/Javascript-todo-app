//selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//events

document.addEventListener("DOMContentLoaded" , getTodos )
todoButton.addEventListener('click' , addTodos );
todoList.addEventListener('click' , deleteChecker);
filterOption.addEventListener('click' , filterTodos);


//functions

function addTodos(event) { 
    event.preventDefault();
    if(todoInput.value === ""){
        alert('You Should Write Somthing First!')
    }else {
        // tododiv
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //todo li
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add('new-item');
        todoDiv.appendChild(newTodo);

        // add todos to localstorage
        saveLocalTodos(todoInput.value)
        //complet Button 
        const  CompletedButton = document.createElement('button');
        CompletedButton.innerText= "Complete";
        CompletedButton.classList.add('complet-btn');
        todoDiv.appendChild(CompletedButton);

        //remove Button 
        const RemoveButton = document.createElement('button');
        RemoveButton.innerText="Remove";
        RemoveButton.classList.add('remove-btn');
        todoDiv.appendChild(RemoveButton);

        //append to list 
        todoList.appendChild(todoDiv);
        //clear input value
        todoInput.value = "";
    }

    

}

function deleteChecker(e){
    const item = e.target;
    if(item.classList[0] === 'remove-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall') ;
        deletTodosFromLocalStorage(todo);
        //remove
        todo.addEventListener('transitionend' , function(){
            todo.remove();
           
        });
    }
    // make it complete
    if(item.classList[0] === 'complet-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        saveTodosOnLocal(todo)
    }

}

function filterTodos(e) {
    
        const mytodo = document.querySelectorAll('.todo');
        for(var i = 0 ; i < mytodo.length ; i++){
            var todo = mytodo[i];
            if(e.target.value === "all"){
                todo.style.display = "flex";
            }else if (e.target.value === "completed"){
                todo.style.display = "none";
            }else{
                todo.style.display = "flex"; 
            }
        }
        const complet = document.querySelectorAll('.completed');
        for(var i = 0 ;i < complet.length ; i++){
            var com = complet[i];
            if(e.target.value === "all"){
                com.style.display="flex";                
            } else if (e.target.value === "completed") {
                com.style.display = "flex";
            }else{
                com.style.display = "none";                
            }
        }  
}

function saveLocalTodos(todo) {
    // check if it is todo on local storage
    let todos ;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}


function getTodos() {
    let todos ;
    let complets;
    // check if it is todo on local storage
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else if(localStorage.getItem('complets') === null){
        complets = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
        complets = JSON.parse(localStorage.getItem('complets'));
    }
    todos.forEach(function(todo) {
                const tt = todo
                createNormalTodo(tt);
    });
    complets.forEach(function(complete) {
        const tt = complete
        createCompletTodo(tt);
});
}


function deletTodosFromLocalStorage(todo) {
    let todos ;
    let complets ;

    // check if there is todos in local storage
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else if(localStorage.getItem('complets') === null ){
        complets = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
        complets = JSON.parse(localStorage.getItem('complets'));
    }
    const TIndex = todo.children[0].innerText;
    console.log(TIndex);

    todos.forEach(function(todo) {
        if(todo === TIndex){
            todos.splice(todos.indexOf(TIndex) , 1) 
             localStorage.setItem("todos" , JSON.stringify(todos)) 
        }
    })
    complets.forEach(function(complet) {
        if(complete === TIndex){
            complets.splice(complets.indexOf(TIndex) ,1 )
            localStorage.setItem("complets" , JSON.stringify(complets))
        }
    })
    
   
}

// save complete todos

function saveTodosOnLocal(todo) {

    let complets ;

    const completTask = todo.children[0].innerText;

    if(localStorage.getItem("complets") === null ){
        complets = []
    }else {
        complets = JSON.parse(localStorage.getItem("complets"));
    }

    complets.push(completTask);
    // deletTodosFromLocalStorage(todo)
    localStorage.setItem("complets" , JSON.stringify(complets));

}


function createNormalTodo(tt) {
     // tododiv
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');

     //todo li
     const newTodo = document.createElement('li');
     newTodo.innerHTML = tt;
     newTodo.classList.add('new-item');
     todoDiv.appendChild(newTodo);

     
     //complet Button 
     const  CompletedButton = document.createElement('button');
     CompletedButton.innerText= "Complete";
     CompletedButton.classList.add('complet-btn');
     todoDiv.appendChild(CompletedButton);

     //remove Button 
     const RemoveButton = document.createElement('button');
     RemoveButton.innerText="Remove";
     RemoveButton.classList.add('remove-btn');
     todoDiv.appendChild(RemoveButton);
     
     //append to list 
     todoList.appendChild(todoDiv);
}

function createCompletTodo(tt){
     // tododiv
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');
     todoDiv.classList.add("completed")

     //todo li
     const newTodo = document.createElement('li');
     newTodo.innerHTML = tt;
     newTodo.classList.add('new-item');
     todoDiv.appendChild(newTodo);

     
     //complet Button 
     const  CompletedButton = document.createElement('button');
     CompletedButton.innerText= "Complete";
     CompletedButton.classList.add('complet-btn');
     todoDiv.appendChild(CompletedButton);

     //remove Button 
     const RemoveButton = document.createElement('button');
     RemoveButton.innerText="Remove";
     RemoveButton.classList.add('remove-btn');
     todoDiv.appendChild(RemoveButton);
     
     //append to list 
     todoList.appendChild(todoDiv);
}



