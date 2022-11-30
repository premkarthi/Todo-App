
class LocalStorageForTodo{
    constructor(){
        this.localData = window.localStorage,
        this.todos = 'todos'
    }

    getTodos(){
        return JSON.parse(this.localData.getItem(this.todos)) || []
    }
    setTodos(data){
        return this.localData.setItem(this.todos, JSON.stringify(data))
    }
    addTodo(todo){
        let todos = this.getTodos()
        todos.push(todo)
        this.setTodos(todos)
    }
    deleteTodo(id){
        let todos = this.getTodos()
        let findtodo = todos.find((ids) =>ids.id == id)
        todos.splice(findtodo, 1)
        this.setTodos(todos)
    }
    updateTodo(data){
        let todos = this.getTodos()
        let findtodo = todos.findIndex((ids) =>ids.id == data.id)
        todos[findtodo].title = data.title
        todos[findtodo].description = data.description
        todos[findtodo].statusForm = data.statusForm
        todos[findtodo].teamFrom = data.teamFrom
        todos[findtodo].date = data.date
        this.setTodos(todos)
    }
    clear(){
        this.localData.clear()
    }
}

let local = new LocalStorageForTodo()


export default local