import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  const handleEdit = () => {};

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    // newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);

  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };
  const handleChange = (e) => {
    // settodos([...todos, {todo, isCompleted:false}])
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-200 p-5 my-5 rounded-2xl min-h-[80vh]">
        <div className="addTodo my-3">
          <h2 className="flex justify-center items-center text-2xl font-bold">
            Add a Todo
          </h2>
          <input
            onChange={handleChange}
            value={todo}
            className="border border-gray-400 w-96 bg-white rounded-l-lg px-3 py-1.5 text-black focus:outline-none focus:border-violet-500"
            type="text"
            placeholder="write todo... "
          />

          <button
            onClick={handleAdd}
            className="bg-violet-500 hover:bg-violet-800 border rounded-r-lg font-bold border-violet-500 text-white py-1.5 px-2.5"
          >
            Add
          </button>
        </div>
        <h2 className="flex justify-center items-center my-3 text-2xl font-bold">
          Your Todos
        </h2>
        <div className="todos">
          {todos.map((item) => {
            return (
              <div key={item.id} className="todo flex justify-between items-center bg-white p-3 rounded-lg shadow my-2">
              <div className="flex items-center">
                <input 
                  name={item.id} 
                  onChange={handleCheckbox} 
                  type="checkbox" 
                  checked={item.isCompleted} 
                  className="mr-3"
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
            
              <div className="buttons flex">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-violet-500 hover:bg-violet-800 border rounded-lg font-bold border-violet-500 text-white py-1 mx-1 px-2.5"
                >
                  Edit
                </button>
            
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-violet-500 hover:bg-violet-800 border rounded-lg font-bold border-violet-500 text-white py-1 px-2 mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
            
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
