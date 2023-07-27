import { FC, SyntheticEvent, ChangeEvent } from "react"

interface OpenTaskMethods {
    handleSubmit: (e: SyntheticEvent) => void;
    onTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onNotesChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    closeAddTask: () => void;
}

export const OpenTaskMenu: FC<OpenTaskMethods> = ({
    handleSubmit,
    onTaskChange,
    onNotesChange,
    closeAddTask

}) => {
    return (
        <div
            className="h-1/3 bg-white flex justify-center items-center" id="addTask">
            <form onSubmit={handleSubmit} className="h-full w-full flex flex-col justify-between items-center">
                <input
                    className="w-[90%] mt-5 font-semibold outline-none text-underText"
                    type="text"
                    placeholder="What would you like to work on"
                    onChange={onTaskChange}
                    autoFocus
                />
                <input
                    className="w-[90%] font-semibold outline-none text-underText"
                    type="text"
                    placeholder="+ add notes?"
                    onChange={onNotesChange} />
                <div className="bg-formButtonCont flex justify-end items-center w-full h-1/3">
                    <div className="w-[40%] h-full flex flex-row justify-between items-center me-5">
                        <button onClick={closeAddTask} className="w-[40%] h-[70%] text-underText">Cancel</button>
                        <button className="bg-buttonDark w-[40%] h-[70%]  rounded-sm" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>


    )
}