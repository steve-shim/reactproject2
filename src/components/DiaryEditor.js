import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

// process.env.PUBLIC_URL : public 디렉토리의 경로를 바로 가져올 수 있는 명령어

// const getStringDate = (date) => {
//     return date.toISOString().slice(0, 10); // 2022-07-11T06:01:02.470Z
// }

const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef();
    //textarea에 기록되는 text의 state 저장
    const [content, setContent] = useState("");
    //어떤 감정을 선택했는지 저장할 state 생성
    const [emotion, setEmotion] = useState(3);
    //input에 저장되는 숫자를 state로 handling 하기 위함
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit } = useContext(DiaryDispatchContext)
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    };

    const navigate = useNavigate();

    //작성완료가 되면 App 컴포넌트가 가지고 있는 data state를 추가해야한다
    //onCreate함수를 수행해야한다 이용해서..! 
    //dispatch 함수들은 Context.Provider로 공급했던적이 있다
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (
            window.confirm(
                isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
            )
        ) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                // targetId = originData.id
                console.log(`originData.id ${originData.id}`)
                onEdit(originData.id, date, content, emotion)
            }
        }
        navigate('/', { replace: true })
    };

    //edit 페이지에서 랜더하는 경우에만 로직 동작
    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어땠나요"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    )
};

export default DiaryEditor;