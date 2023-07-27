import { useTime } from 'react-timer-hook';

export const handleTime = (time: string, type: number) => {
    let newTime;
    if (time === "minutes" || time === "seconds") {
      if (type === 0) {
        newTime = "00";
      } else if (type < 10) {
        newTime = "0" + type;
      } else {
        newTime = type.toString();
      }
    } else if (time === "hours") {
      if (type === 0) {
        newTime = "12";
      } else {
        newTime = type.toString();
      }
    } else {
      newTime = type.toString();
    }
    return newTime;
  };
  
export const CurrentTime = () => {
    const {
        minutes,
        hours,
        ampm,
    } = useTime({ format: "12-hour" });

    return (
        <p className='font-semibold'>{handleTime("hours" ,hours)}:{handleTime("minutes", minutes)}{ampm}</p>
    );
}
