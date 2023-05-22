import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

const Diary = () => {

    const { id } = useParams();
    console.log("Path variables id", id)
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            console.log(targetDiary);
        }
    })

    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기 상세 페이지</p>
        </div>
    )
}

export default Diary;