import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import { useSearchParams } from "react-router-dom"; // query string 받아올때 사용

const Edit = () => {
    // HOST:PORT/edit?id=1991&mode=dark
    // 쿼리스트링("id=1991&mode=dark") 받는 API useSearchParams()
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("id:", searchParams.get("id"), "mode:", searchParams.get("mode"))

    //targetDiary가 있을 경우 state에 넣어서 사용
    const [originData, setOriginData] = useState();

    const navigate = useNavigate();
    const { id } = useParams();
    console.log("useParams id:",id)
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    })


    //Edit 컴포넌트가 마운트 되었을 때 useEffect을 이용해서 데이터를 꺼내옴
    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            //targetDiary: {id: 2, emotion: 2, content: '오늘의 일기 2번', date: 1657436056691}
            //targetDiary: undefined (없는 경로로 갔을 경우)
            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert("없는 일기입니다")
                navigate('/', { replace: true });
            }

        };
    }, [id, diaryList]);


    // const [searchParams, setSearchParams] = useSearchParams();
    // const id = searchParams.get('id');
    // console.log("id:", id);
    // const mode = searchParams.get('mode');
    // console.log("mode:", mode);

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    )
}

export default Edit;