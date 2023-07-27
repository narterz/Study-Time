import { ToDoValues } from "./ToDo"
import { FC } from "react";
import { BsCheckCircleFill } from 'react-icons/bs';

interface TaskProps {
    containerColor: string;
    timerColor: string;
}

interface TaskMethods {
    handleCompleteTask: (taskID: number) => void;
    clearTask: (taskID: number) => void;
}

export const Tasks: FC<TaskProps & TaskMethods & ToDoValues> = ({
    task,
    index,
    notes,
    isComplete,
    containerColor,
    timerColor,
    handleCompleteTask,
    clearTask

}) => {
    return (
        <div className="flex flex-col justify-start items-center w-full h-full bg-white relative border-transparent rounded-md overflow-y-auto" style={{justifyContent: notes ? "start" : "center"}}>
            <div style={{ border: isComplete ? "5px solid lightGreen" : "5px solid black" }} id="vertical" className="absolute left-0 h-full"></div>
            <div className="h-[40%] w-[90%] flex flex-row justify-between items-center mt-2">
                <div className="w-2/3 flex flex-row justify-start items-center">
                    <BsCheckCircleFill
                        title="complete task"
                        className="cursor-pointer"
                        style={{ color: isComplete ? "lightGreen" : containerColor}}
                        size={25}
                        onClick={() => handleCompleteTask(index)}
                    />
                    <p className="text-xsm text-black font-semibold ms-5">{task}</p>
                </div>
                <div className="w-1/3 flex justify-end items-center">
                    <button
                        className="w-2/3"
                        onClick={() => clearTask(index)}
                        style={{ backgroundColor: isComplete? "lightGreen" : containerColor , color: "white" }}>
                        Clear Task
                    </button>
                </div>
            </div>
            {notes &&
                <div className="bg-notesColor w-[98%] absolute bottom-0 left-[2%]">
                    <p className="text-xsm text-black ms-5 font-semibold">{notes}</p>
                </div>
            }
        </div>
    )
}