import React from "react";

// 몇 번째 리스트가 선택되었는지 알기 위해서 isSelected을 props로 전달 받는다

const EmotionItem = ({
    emotion_id,
    emotion_img,
    emotion_descript,
    onClick,
    isSelected,
}) => {
    return (
        <div
            onClick={() => onClick(emotion_id)}
            className={[
                "EmotionItem",
                isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`
            ].join(" ")}>
            <img src={emotion_img} />
            <span>{emotion_descript}</span>
        </div>
    )
}
export default React.memo(EmotionItem);

// prop을 a로 받으면 console.log(a) a안에는 객체가 담긴다
// {emotion_id: 1, emotion_img: '/assets/emotion1.png', emotion_descript: '완전 좋음', onClick: ƒ}

// prop을 key값으로 받으면
// { emotion_id, emotion_img, emotion_descript, onClick }
// 변수명을 바로 활용할 수 있다