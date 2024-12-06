import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [todo, setTodo] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [state, setState] = useState("All");
  const [count, setCount] = useState(0);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (state === "Active") {
      let array = [];
      let activecount = 0;
      for (let i = 0; i < todo.length; i++) {
        if (!todo[i].checked) {
          array.push(todo[i]);
          activecount = activecount + 1;
        }
      }
      setFilterArray(array);
      setCount(activecount);
      return;
    }
    if (state === "Completed") {
      let array = [];
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
          array.push(todo[i]);
        }
      }
      setFilterArray(array);
      setCount(0);
      return;
    } else {
      setFilterArray(todo);
      let activecount = 0;
      for (let i = 0; i < todo.length; i++) {
        if (!todo[i].checked) {
          activecount = activecount + 1;
        }
      }
      setCount(activecount);
    }
  }, [state, todo]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (theme === "dark") {
      htmlElement?.classList.add("dark");
    } else {
      htmlElement?.classList.remove("dark");
    }
  }, [theme]);

  const handledown = (e) => {
    if (e.key === "Enter") {
      const newObj = {
        id: todo.length + 1,
        data: e.target.value,
        checked: false,
      };
      setTodo((prevstate) => [...prevstate, newObj]);
      e.target.value = ""; // Clear input
    }
  };

  const onChecked = (item) => {
    setTodo((prevstate) =>
      prevstate.map((todo) =>
        todo.id === item.id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItemIndex", index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
    const updatedTodo = [...todo];
    const [draggedItem] = updatedTodo.splice(draggedItemIndex, 1);
    updatedTodo.splice(index, 0, draggedItem);
    setTodo(updatedTodo);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleremoveItem = (item) => {
    let newArray = [];
    newArray = filterArray.filter((i) => item.id !== i.id);
    setTodo(newArray);
    setFilterArray(newArray);
  };

  const handleClearcompleted = () => {
    let newArray = [];
    for (let i = 0; i < filterArray.length; i++) {
      if (!filterArray[i].checked) {
        newArray.push(filterArray[i]);
      }
    }
    console.log(newArray);
    setState("All");
    setFilterArray(newArray);
    setTodo(newArray);
  };

  return (
    <div className="w-[100%] font-custom dark:bg-blue-100 dark:h-screen">
      <div className="bg-heromobile dark:bg-herodarkmobile md:bg-hero md:dark:bg-herodark w-[100%] h-[40vh] bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center items-start pt-[10vh] px-4 md:items-center">
          <div className="flex justify-between w-[100%] md:justify-center gap-[30%]">
            <p className="text-xl font-[900] tracking-[10px] text-white ">
              TODO
            </p>
            {theme === "dark" ? (
              <img
                src="/images/icon-sun.svg"
                alt="sun"
                className="w-[10%] md:w-[2%] object-contain"
                onClick={changeTheme}
              />
            ) : (
              <img
                src="/images/icon-moon.svg"
                alt="moon"
                className="h-[10%] object-contain md:w-[2%] "
                onClick={changeTheme}
              />
            )}
          </div>
          <div className="flex justify-start bg-white  dark:bg-blue-300 w-[100%] rounded-md px-2 text-xl dark:text-blue-500 py-2 mt-12  placeholder:dark:text-blue-600 placeholder:text-sm gap-2 items-center md:w-[40%]">
            <div className="rounded-full h-[15px] w-[15px] border-[2px] border-blue-600"></div>
            <input
              placeholder="Create a new Todo..."
              className="flex justify-start gap-2 items-center dark:bg-blue-300 outline-none w-[100%]"
              onKeyDown={handledown}
            />
          </div>

          <div className="shadow-lg mt-[8vh] bg-white dark:bg-blue-300 w-[100%] rounded-md md:w-[40%]">
            {filterArray.map((item, index) => (
              <div
                className="flex justify-between w-[100%] border-b-[1px] border-blue-900 items-center cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                <div
                  key={item.id}
                  className="flex justify-start gap-2 items-center px-2 text-blue-600 py-2 "
                >
                  {item.checked ? (
                    <div className="rounded-full h-[15px] w-[15px]  border-blue-600 flex justify-center items-center bg-gradient-to-r from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] cursor-pointer">
                      <img
                        alt="tick"
                        src="/images/icon-check.svg"
                        className="h-[10px] w-[10px]"
                        onClick={() => onChecked(item)}
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-full h-[15px] w-[15px] border-[1px] border-blue-600 cursor-pointer"
                      onClick={() => onChecked(item)}
                    ></div>
                  )}

                  <div
                    className={`text-black-900 dark:text-blue-500 ${
                      item.checked
                        ? "line-through text-xl text-gray-400"
                        : "text-xl"
                    }`}
                  >
                    {item.data}
                  </div>
                </div>
                <div>
                  <img
                    src="/images/icon-cross.svg"
                    alt='cross'
                    className="w-[60%] cursor-pointer"
                    onClick={() => handleremoveItem(item)}
                  />
                </div>
              </div>
            ))}
            {todo.length > 0 && (
              <div className="flex p-4 justify-between">
                <p className=" text-gray-400 dark:text-blue-900 text-md">
                  {count} items left
                </p>
                <div className="invisible flex dark:bg-blue-300  justify-center gap-4 rounded-md md:visible">
                  <p
                    className={`text-sm  font-bold cursor-pointer hover:text-black-900 dark:hover:text-gray-100 ${
                      state === "All"
                        ? "text-primary"
                        : "text-gray-400 dark:text-gray-400"
                    }`}
                    onClick={() => setState("All")}
                  >
                    All
                  </p>
                  <p
                    className={`text-sm  font-bold cursor-pointer hover:text-black-900 dark:hover:text-gray-100 ${
                      state === "Active"
                        ? "text-primary"
                        : "text-gray-400 dark:text-gray-400"
                    }`}
                    onClick={() => setState("Active")}
                  >
                    Active
                  </p>
                  <p
                    className={`text-sm  font-bold cursor-pointer hover:text-black-900 dark:hover:text-gray-100 ${
                      state === "Completed"
                        ? "text-primary"
                        : "text-gray-400 dark:text-gray-400"
                    }`}
                    onClick={() => setState("Completed")}
                  >
                    Completed
                  </p>
                </div>
                <p
                  className="text-blue-600 hover:text-black-900 dark:text-blue-900 text-md dark:hover:text-blue-500 cursor-pointer"
                  onClick={() => handleClearcompleted()}
                >
                  Clear completed
                </p>
              </div>
            )}
          </div>

          {todo.length > 0 && (
            <div className="flex shadow-lg bg-gray-50 dark:bg-blue-300 my-4 w-[100%] justify-center gap-4 py-2 rounded-md md:invisible">
              <p
                className={`text-sm  font-bold cursor-pointer  ${
                  state === "All"
                    ? "text-primary"
                    : "text-gray-400 dark:text-gray-400"
                }`}
                onClick={() => setState("All")}
              >
                All
              </p>
              <p
                className={`text-sm  font-bold cursor-pointer  ${
                  state === "Active"
                    ? "text-primary"
                    : "text-gray-400 dark:text-gray-400"
                }`}
                onClick={() => setState("Active")}
              >
                Active
              </p>
              <p
                className={`text-sm  font-bold cursor-pointer  ${
                  state === "Completed"
                    ? "text-primary"
                    : "text-gray-400 dark:text-gray-400"
                }`}
                onClick={() => setState("Completed")}
              >
                Completed
              </p>
            </div>
          )}
        </div>
        <p className="absolute text-sm top-[90%] left-[50%] translate-x-[-50%] text-gray-600">
          Drag and drop to a reader list
        </p>
      </div>
    </div>
  );
}

export default App;
