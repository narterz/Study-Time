import { ChangeEvent, FC, SyntheticEvent, useEffect, useState, useRef} from "react";
import { useTimer } from 'react-timer-hook';
import { LuTimer } from 'react-icons/lu'
import { CurrentTime, handleTime } from "./CurrentTime";
import { ToDo, ToDoValues } from "./ToDo";
import toggle from '../assets/toggleTimer.mp3';
import timesUp from '../assets/timesUp.mp3';

interface StudyTimerProps {
    expiryTimestamp: Date;
    autoStart: boolean;
}

export const ParentHeight = (arrayLen: number, initalHeight: number): string => {
    if (arrayLen > 0) {
        return `${arrayLen * initalHeight}vh`
    } else {
        return `${initalHeight}vh`
    }
};

export const StudyTimer: FC<StudyTimerProps> = ({ expiryTimestamp }) => {
    const [newTimer, setNewTimer] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<string>('0:00');
    const [studyTimes, setStudyTimes] = useState<number>(0);
    const [buttonText, setButtonText] = useState<string>("Start");
    const [timerType, setTimerType] = useState<string>('studyTime');
    const [containerColor, setContainerColor] = useState<string>("#cf4c4c");
    const [timerColor, setTimerColor] = useState<string>("#db5656");
    const [focusColor, setFocusColor] = useState<string>("#a64e4e");
    const [buttonEffect, setButtonEffect] = useState<boolean>(false);

    const [toDoArray, setToDoArray] = useState<ToDoValues[]>([])
    const [tasks, setTasks] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [completedToDos, setCompletedToDos] = useState<ToDoValues[]>([]);
    const [openTask, setOpenTask] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [allToDosComplete, setAllToDosComplete] = useState<boolean>(false);

    const prevToDoArray = useRef<ToDoValues[]>(toDoArray);

    const timesUpAudio = new Audio(timesUp);
    const startSound = new Audio(toggle);

    const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            timesUpAudio.play();
            setContainerColor("#5fdb51");
            setTimerColor("#74d46a");
            setFocusColor("#669960");
            setButtonText("Restart");
            const toNewtimer = (newTimer: string) => {
                setTimeout(() => {
                    handleTimer(newTimer)
                }, 4000)
            }
            if (timerType === "shortBreak" || timerType === "longBreak") {
                toNewtimer("studyTimer")
            } else if (timerType === "studyTime") {
                setStudyTimes(studyTimes + 1);
                toNewtimer("shortBreak");
            }
        },
        autoStart: false,
    });

    const handleTimer = (type: string) => {
        const time = new Date();
        setTimerType(type);
        if (timerType === "studyTime") {
            setContainerColor("#cf4c4c");
            setTimerColor("#db5656");
            setFocusColor("#a64e4e");
            time.setMinutes(time.getMinutes() + 25);
        } else if (timerType === "shortBreak") {
            setContainerColor("#e6d753");
            setTimerColor("#ded162");
            setFocusColor("#aba148");
            time.setMinutes(time.getMinutes() + 5);
        } else if (timerType === "longBreak") {
            setContainerColor("#e39436");
            setTimerColor("#c27f30");
            setFocusColor("#b5782f");
            time.setMinutes(time.getMinutes() + 15);
        }
        restart(time);
        setNewTimer(true);
        pause();
        setButtonText("Start");
    };

    const handleFocusColor = (value: string) => {
        let color;
        if (value === "red") {
            focusColor === "#a64e4e"
                ? color = focusColor
                : color = "inherit"
        }
        if (value === "yellow") {
            focusColor === "#aba148"
                ? color = focusColor
                : color = "inherit"
        }
        if (value === "orange") {
            focusColor === "#b5782f"
                ? color = focusColor
                : color = "inherit"
        }
        return color
    }

    const handleStart = () => {
        startSound.play()
        setNewTimer(!newTimer);
        setButtonEffect(true);
        isRunning ? setButtonText("Resume") : setButtonText("Pause");
    };

    const openAddTask = () => {
        setOpenTask(true);
    };

    const clearTask = (taskID: number) => {
        if (toDoArray.length === 1) {
            setToDoArray([]);
            setTasks("");
            setNotes("");
        } else {
            const newToDos = toDoArray.filter(todo => todo.index !== taskID);
            setToDoArray(newToDos);
        }
        console.log(toDoArray.length)
    }

    const clearAllTasks = () => {
        setToDoArray([]);
        setTasks("");
        setNotes('');
        if (timerType === "studyTime") {
            handleTimer("studyTime")
        }
    }

    const closeAddTask = () => {
        setOpenTask(false);
    }

    const onTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTasks(e.target.value)
    }

    const onNotesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value)
    }

    const handleSubmit = (e: SyntheticEvent | KeyboardEvent) => {
        e.preventDefault();
        setToDoArray((prevToDo) => [
            ...prevToDo,
            {
                task: tasks,
                index: prevToDo.length,
                notes: notes,
                isComplete: false,
            },
        ]);
        setOpenTask(false);
        if (toDoArray.length === 0) {
            handleStart();
        }
        if (allToDosComplete) {
            handleStart();
        }

    };

    const curretTimerSetter = () => {
        const currentHours = handleTime("hours", new Date().getHours() % 12 || 12);
        const currentMins = handleTime("minutes", new Date().getMinutes());
        setCurrentTime(`${currentHours}:${currentMins}`);
    }

    const elapsedTimeSetter = () => {
        const elapsedMins = 24 - minutes;
        const elapsedSecs = 60 - seconds;
        if(elapsedMins >= 1){
            setElapsedTime(`${elapsedMins}:${elapsedSecs}`);
        } else {
            setElapsedTime(`0.${elapsedSecs}s`);
        }
    }

    const handleCompleteTask = (taskIndex: number) => {
        const taskToComplete = toDoArray.find((todo) => todo.index === taskIndex);

        if (taskToComplete && !taskToComplete.isComplete) {
            const completedToDo = [taskToComplete];
            setCompletedToDos((prevComplete) => [...prevComplete, ...completedToDo]);

            const newTodo = toDoArray.map((todo) => {
                if (todo.index === taskIndex) {
                    return {
                        ...todo,
                        isComplete: true
                    }
                }
                return todo
            });
            setToDoArray(newTodo);
            curretTimerSetter();
            elapsedTimeSetter();
            const allCompleted = newTodo.every((todo) => todo.isComplete);
            if (allCompleted) {
                handleStart()
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSubmit(e)
            }
        }
        if (openTask) {
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [openTask, tasks, notes]);

    useEffect(() => {
        handleTimer(timerType)
    }, [timerType])

    useEffect(() => {
        newTimer ? pause() : resume();
    }, [newTimer, pause, resume])

    useEffect(() => {
        prevToDoArray.current = toDoArray;
        setAllToDosComplete(prevToDoArray.current.every((todo) => todo.isComplete));
    }, [toDoArray])

    useEffect(() => {
        const pageTitle = "Study Timer"
        if(timerType === "studyTime") {
            document.title = `${pageTitle} - ${minutes}:${handleTime("seconds", seconds)}`
        } else {
            document.title = `${pageTitle} - ${minutes}:${handleTime("seconds", seconds)} (break)`
        }
    }, [timerType, minutes, seconds])

    return (
        <div className="h-screen overflow-y-auto w-screen flex flex-col items-center text-white transition-colors delay-150 ease-in" style={{ backgroundColor: containerColor }}>
            <audio src={toggle}></audio>
            <audio src={timesUp}></audio>
            <nav className="h-[8vh] sm:w-[90%]  md:w-[55%] lg:w-[40%] xl:w-[35%] xxl:w-[30%] border-b border-grey-200 bg-inherit flex justify-center">
                <div className="h-full w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-between text-start w-[50%]">
                        <LuTimer size={30} style={{ color: 'white' }} className=""/>
                        <p className="text-start font-semibold text-sm w-4/5">Study Time!</p>
                    </div>
                    <div className="flex flex-row items-center justify-end w-[40%]">
                        <CurrentTime />
                    </div>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-around border border-transparent rounded-lg sm:w-[90%] md:w-[55%] lg:w-[40%] xl:w-[35%] xxl:w-[30%] h-[40vh] mt-5 transition-colors delay-150 ease-in" style={{ backgroundColor: timerColor }}>
                <div className="flex flex-row w-full justify-around">
                    <button
                        className="w-[25%] sm:text-xxsm lg:text-xsm"
                        onClick={() => setTimerType("studyTime")}
                        style={{ backgroundColor: handleFocusColor("red") }}>
                        Study Time!
                    </button>
                    <button
                        className="w-[25%] sm:text-xxsm lg:text-xsm"
                        onClick={() => setTimerType("shortBreak")}
                        style={{ backgroundColor: handleFocusColor("yellow") }}>
                        Short Break
                    </button>
                    <button
                        className="w-[25%] sm:text-xxsm  lg:text-xsm"
                        onClick={() => setTimerType("longBreak")}
                        style={{ backgroundColor: handleFocusColor("orange") }}>
                        Long Break
                    </button>
                </div>
                <div>
                    <h1 className="text-white font-bold">{minutes} : {handleTime("seconds", seconds)}</h1>
                </div>
                <div className="h-[15%] w-full text-center">
                    <button
                        onClick={handleStart}
                        onAnimationEnd={() => setButtonEffect(false)}
                        className={`${buttonEffect && 'animate-buttonScale'} bg-white h-full w-[50%] shadow-xl text-md`}
                        style={{ color: containerColor }}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
            <ToDo
                containerColor={containerColor}
                timerColor={timerColor}
                focusColor={focusColor}
                timerType={timerType}
                toDoArray={toDoArray}
                elapsedTime={elapsedTime}
                studyTimes={studyTimes}
                completedToDos={completedToDos}
                openTask={openTask}
                openAddTask={openAddTask}
                clearTask={clearTask}
                closeAddTask={closeAddTask}
                onNotesChange={onNotesChange}
                onTaskChange={onTaskChange}
                handleCompleteTask={handleCompleteTask}
                handleSubmit={handleSubmit}
                clearAllTasks={clearAllTasks}
                currentTime={currentTime}
                handleTimer={handleTimer}
            />
        </div>
    );
}

