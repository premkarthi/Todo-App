class Store{
    constructor(_data){
        this.data = _data
    }

    removeItem(id){
        let todos = this.data
        let findtodo = todos.filter((ids) =>ids.id != id)
        this.data = findtodo
    }

    getItems(){
        return this.data
    }
    getUpdateItem(id){
        let todos = this.data
        let findtodo = todos.find((ids) =>ids.id == id)
        return findtodo
    }
    updateTodo(data){
        let todos = this.getItems()
        let findtodo = todos.findIndex((ids) =>ids.id == data.id)
        todos[findtodo].title = data.title
        todos[findtodo].description = data.description
        todos[findtodo].statusForm = data.statusForm
        todos[findtodo].teamFrom = data.teamFrom
        todos[findtodo].date = data.date
        this.data = todos
    }
    filterBasedOnStatus(value){
        let todos = this.data
        let filterData = todos.filter((item) => item.statusForm == value)
        if (value == 'All'){
            return this.data
        }
        return filterData
    }
    filterBasedOnTeam(value){
        let todos = this.data
        let filterData = todos.filter((item) => item.teamFrom == value)
        if (value == 'All'){
            return this.data
        }
        return filterData
    }
    sorting(value){
        let todos = this.data
        if (value == 'ascending'){
            let sortedArray = todos.sort(function(a,b){
                if (a.title.toLowerCase() < b.title.toLowerCase())
                   return -1;
                else if (a.title.toLowerCase() == b.title.toLowerCase())
                   return 0;
                else
                   return 1;
            })
            return sortedArray
        }
        else{
            let sortedArray = todos.sort(function(a,b){
                if (a.title.toLowerCase() > b.title.toLowerCase())
                   return -1;
                else if (a.title.toLowerCase() == b.title.toLowerCase())
                   return 0;
                else
                   return 1;
            })
            return sortedArray
        }
    }
}


export default Store