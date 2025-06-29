import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
    setLoaded(true);
  }, []);

  // Save to localStorage when todos change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (isEditing) {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }

    setTodo("");
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    setIsEditing(true);
    setEditId(id);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.selectionEnd =
        inputRef.current.value.length;
    }, 0);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );

    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-red-100 p-5 my-5 rounded-2xl min-h-[96vh]">
        <div className="addTodo my-3">
          <h2 className="flex justify-center items-center text-2xl font-bold">
            {isEditing ? "Edit Todo" : "Add a Todo"}
          </h2>
          <div className="flex justify-center my-5">
            <input
              ref={inputRef}
              onChange={handleChange}
              value={todo}
              className="border italic border-gray-400 w-2/3 bg-white rounded-l-lg px-3 py-2 text-black focus:outline-none focus:border-violet-500 "
              type="text"
              placeholder="Write todo..."
            />

            <button
              onClick={handleAdd}
              className="cursor-pointer bg-violet-500 hover:bg-violet-800 border rounded-r-lg font-bold border-violet-500 text-white py-1.5 px-2.5 "
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
        {/* <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished */}
        <h2 className="flex justify-center items-center my-3 text-2xl font-bold">
          Your Todos
        </h2>

        <div className="todos">
          {todos.length === 0 && (
            <div className="mx-10 font-bold">Nothing here yet. Add a task!</div>
          )}
          {todos.map((item) => (
            <div
              key={item.id}
              className={`todo flex justify-between items-center p-3 rounded-lg shadow my-1.5 transition-colors duration-300 ${
                item.isCompleted ? "bg-violet-100" : "bg-white"
              }`}
            >
              <div className="flex items-center">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="mr-3 cursor-pointer shadow-md transform transition-transform duration-200 hover:scale-105"
                />
                <div
                  className={`font-medium ${
                    item.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="cursor-pointer bg-violet-500 hover:bg-violet-800 border rounded-lg font-bold border-violet-500 text-white py-2 mx-1 px-4 shadow-md transform transition-transform duration-300 hover:scale-105"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="cursor-pointer bg-violet-500 hover:bg-violet-800 border rounded-lg font-bold border-violet-500 text-white py-2 px-4 mx-1 shadow-md transform transition-transform duration-300 hover:scale-105"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
