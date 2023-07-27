import { ChangeEvent, FC, SyntheticEvent } from "react";
import { AiFillPlusCircle } from 'react-icons/ai';
import { Tasks } from "./Task";
import { OpenTaskMenu } from "./OpenTaskMenu";

interface ToDoProps {
    containerColor: string;
    timerColor: string;
    focusColor: string;
    toDoArray: ToDoValues[];
    completedToDos: ToDoValues[];
    openTask: boolean;
    currentTime: string;
    timerType: string;
    elapsedTime: string;
    studyTimes: number;

}

export interface ToDoValues {
    task: string;
    index: number;
    notes?: string;
    isComplete: boolean;
}

interface ToDoMethods {
    openAddTask: () => void;
    clearTask: (taskID: number) => void;
    clearAllTasks: () => void;
    closeAddTask: () => void;
    onTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onNotesChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: SyntheticEvent) => void;
    handleCompleteTask: (taskID: number) => void;
    handleTimer: (timerType: string) => void;
}


export const ToDo: FC<ToDoProps & ToDoMethods> = ({
    containerColor,
    timerColor,
    focusColor,
    timerType,
    studyTimes,
    elapsedTime,
    currentTime,
    toDoArray,
    completedToDos,
    openAddTask,
    openTask,
    closeAddTask,
    onTaskChange,
    onNotesChange,
    handleCompleteTask,
    handleSubmit,
    clearTask,
    clearAllTasks,
    handleTimer
}) => {

    return (
        <div className="flex flex-col justify-evenly sm:w-[90%] md:w-[55%] lg:w-[40%] xl:w-[35%] xxl:w-[30%] h-[60%]" >
            <div className="h-1/5 flex justify-center items-center">
                <div className="h-1/2 w-full  flex flex-row justify-between items-center border-b border-gray-200">
                    <p className="todo-btns">
                        {toDoArray.length === 0
                            ? "No current Tasks"
                            : `${toDoArray.length} Task(s)`
                        }
                    </p>
                    <button className="todo-btns w-1/4 hover:opacity-60 transition-opacity delay-100 ease-in" style={{ backgroundColor: timerColor }} onClick={clearAllTasks}>Clear tasks</button>
                    <button className="todo-btns w-1/4 hover:opacity-60 transition-opacity delay-100 ease-in" style={{backgroundColor: timerColor}} onClick={() => handleTimer(timerType)}>Reset Timer</button>
                </div>
            </div>
            {toDoArray.length > 0 &&
                <div className="w-full h-[15%] border-transparent rounded-md overflow-y-auto">
                    {toDoArray.map((item) => {
                    return (
                        <Tasks
                            task={item.task}
                            index={item.index}
                            notes={item.notes}
                            isComplete={item.isComplete}
                            containerColor={containerColor}
                            timerColor={timerColor}
                            handleCompleteTask={handleCompleteTask}
                            clearTask={clearTask}
                        />
                    )
                })}
        </div>
            }
{
    openTask
        ? <OpenTaskMenu
            handleSubmit={handleSubmit}
            onTaskChange={onTaskChange}
            onNotesChange={onNotesChange}
            closeAddTask={closeAddTask}
        />
        : <div
            className="flex flex-row items-center justify-center rounded-md cursor-pointer h-[20%] hover:opacity-70 transition-opacity delay-100 ease-in"
            id="add-todo"
            style={{ backgroundColor: timerColor }}
            onClick={openAddTask}
        >
            <AiFillPlusCircle style={{ color: "fff" }} size={15} />
            <p className="text-white ms-5 text-sm sm:text-xsm">Add Task</p>
        </div>
}
            <div>
            </div>
            <div className="flex justify-evenly items-center border-t border-grey-200 h-1/5" style={{ backgroundColor: timerColor }}>
                <p className="todo-progress">Tasks Completed: {completedToDos.length}</p>
                <p className="todo-progress">Study times: {studyTimes}</p>
                <p className="todo-progress">Finished: {completedToDos[0] ? `${currentTime}(${elapsedTime})` : "N/A"}</p>
            </div>
        </div >
    )
}