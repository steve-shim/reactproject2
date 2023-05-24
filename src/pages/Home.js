import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    //console.log(`diaryList ${JSON.stringify(diaryList)}`) // 전체 리스트 (6개)

    // 가공된 데이터를 state로 관리하기 위해서 data state 추가
    const [data, setData] = useState([]);
    //console.log("data") // 년,월에 해당하는 리스트 (5개)
    //console.log(data)
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    // curDate가 변화하는 순간에만 전체 리스트 diaryList에서 
    // 년도와 월에 해당하는 일기 데이터만 뽑아서 data에 상태변화를 저장한다
    useEffect(() => {
        if (diaryList.length >= 1) {

            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();
            console.log("firstDay",new Date(firstDay))
            console.log("lastDay",new Date(lastDay))

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        }
    }, [diaryList, curDate]);

    useEffect(() => {
        // [{"id":7,"emotion":5,"content":"오늘의 일기 7번","date":1689907388310}]
        console.log(`data ${JSON.stringify(data)}`);
    }, [data]);

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        )
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        )
    }


    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
                rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    )
}

export default Home;