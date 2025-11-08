import TodoItem from './TodoItem'

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma tarefa nesta lista. Adiciona a primeira tarefa!</p>
        </div>
      ) : (
        <>
          {pendingTodos.length > 0 && (
            <div className="todos-section">
              <h4>Pendentes ({pendingTodos.length})</h4>
              <ul className="list">
                {pendingTodos.map(todo => (
                  <TodoItem 
                    key={todo.id} 
                    {...todo} 
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                ))}
              </ul>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="todos-section">
              <h4>Concluídas ({completedTodos.length})</h4>
              <ul className="list">
                {completedTodos.map(todo => (
                  <TodoItem 
                    key={todo.id} 
                    {...todo} 
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}