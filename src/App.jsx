import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import ListManager from './ListManager'
import './App.css'

export default function App() {
  const [lists, setLists] = useState(() => {
    const localValue = localStorage.getItem("TODOLISTS")
    if (localValue == null) return [
      { 
        id: crypto.randomUUID(), 
        name: "Principal", 
        todos: [],
        createdAt: new Date().toISOString()
      }
    ]
    return JSON.parse(localValue)
  })

  const [currentListId, setCurrentListId] = useState(() => {
    const saved = localStorage.getItem("CURRENT_LIST")
    if (saved) return saved
    return lists[0]?.id || ""
  })

  useEffect(() => {
    localStorage.setItem("TODOLISTS", JSON.stringify(lists))
    localStorage.setItem("CURRENT_LIST", currentListId)
  }, [lists, currentListId])

  const currentList = lists.find(list => list.id === currentListId) || lists[0]

  function addTodo(title) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: [
              ...list.todos,
              { id: crypto.randomUUID(), title, completed: false, createdAt: new Date().toISOString() }
            ]
          }
        }
        return list
      })
    })
  }

  function toggleTodo(id, completed) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: list.todos.map(todo => {
              if (todo.id === id) {
                return { ...todo, completed }
              }
              return todo
            })
          }
        }
        return list
      })
    })
  }

  function deleteTodo(id) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: list.todos.filter(todo => todo.id !== id)
          }
        }
        return list
      })
    })
  }

  function addList(name) {
    const newList = {
      id: crypto.randomUUID(),
      name: name.trim(),
      todos: [],
      createdAt: new Date().toISOString()
    }
    
    setLists(currentLists => [...currentLists, newList])
    setCurrentListId(newList.id)
  }

  function deleteList(id) {
    if (lists.length <= 1) {
      alert("Não podes eliminar a última lista!")
      return
    }

    setLists(currentLists => {
      const filteredLists = currentLists.filter(list => list.id !== id)
      
      if (id === currentListId && filteredLists.length > 0) {
        setCurrentListId(filteredLists[0].id)
      }
      
      return filteredLists
    })
  }

  function renameList(id, newName) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === id) {
          return { ...list, name: newName.trim() }
        }
        return list
      })
    })
  }

  return (
    <>
      <ListManager 
        lists={lists}
        currentListId={currentListId}
        onListChange={setCurrentListId}
        onAddList={addList}
        onDeleteList={deleteList}
        onRenameList={renameList}
      />
      
      <div className="current-list-header">
        <h1 className="header">{currentList?.name || "Todo List"}</h1>
        <span className="list-stats">
          {currentList?.todos.filter(t => !t.completed).length} pendentes
        </span>
      </div>
      
      <TodoForm onSubmit={addTodo} />
      
      <TodoList 
        todos={currentList?.todos || []} 
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}