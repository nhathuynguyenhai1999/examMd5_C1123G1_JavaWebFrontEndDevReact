/*
    Custom hooks là gì?
    - Một hook do mình tự định nghĩa ra.
    - Custom hook là một function hơi đặc biệt.
    - Có thể sử dụng các hooks khác như useState, useContext hoặc một custom hook khác.
    - Đặt tên custom hooks theo dạng : useClock(), useClickOutside(), useQuery()
*/

const { useEffect } = require("react");
function useMagicColor(){
    const [color,setColor] = useState('green');
    useEffect(() => {
        const intervalRef = setInterval(() => {
            const newColor = randomColor();
            setColor(newColor)
        },2000);
        return () => {
            clearInterval(intervalRef);
        }
    },[])
    // Custom hooks return data instead of JSX
    return color;
}
/*
    Khi nào dùng custom hooks?
    - Tách biệt riêng phần logic ra khỏi phần UI.
    - Chia sẻ logic giữa các component.
*/
function magicBox(){
    const color = useMagicColor();
    return <div class="magic-box" style={{backgroundColor: color}}></div>
}

/* Component hiện tại , trước khi tách logic ra một custom hooks */
function Clock(){
    const [timeString, setTimeString] = useState('');
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            // HH:mm:ss
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        },1000);
        return () => {
            //cleanup
            console.log('====================================');
            console.log('Clock cleanup');
            console.log('====================================');
            clearInterval(clockInterval);
        };
    },[]);
    return (
        <p style={{fontSize: '42px'}}>{timeString}</p>
    )
}
/* Sau khi chuyển sang custom hooks, Nó y chang nhau luôn !!!!. */
function useClock(){
    const [timeString,setTimeString] = useState('');
    useEffect(()=>{
        const clockInterval = setInterval(()=>{
            const now = new Date();
            //HH:mm:ss
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        },1000);
        return () => {
            //cleanup
            console.log("Clock cleanup");
            clearInterval(clockInterval);
        };
    },[]);
    return (<p style = {{fontSize:'42px'}}>{timeString}</p>)
}
/* Một component khác cũng như useClock() hooks: */
function BetterClock(){
    const {timeString} = useClock();
    return (
        <div className="better-clock">
            <p className="better-clock_time">{timeString}</p>
        </div>
    );
}