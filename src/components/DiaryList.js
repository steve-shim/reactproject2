import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Diary from "../pages/Diary";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
    { value: "all", name: "전부다" },
    { value: "good", name: "좋은 감정만" },
    { value: "bad", name: "안좋은 감정만" },
]

/**
 * value prop: ControlMenu 가 렌더링하고 있는 select가 어떤걸 선택하고 있는지
 * onChange prop: select가 선택하는걸 변화했을 때 바꿀 기능을 하는 함수
 * optionList: select안에 들어가는 옵션 
 */
const ControlMenu = ({ value, onChange, optionList }) => {
    let optionTemplate = optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
            {it.name}
        </option>
    ))
    console.log("optionTemplate",optionTemplate)
    return (
        <select
            name="steve"
            className="ControlMenu"
            value={value}
            onChange={(e) => {
                console.log("value",value); 
                console.log("e.target.name",e.target.name); 
                console.log("e.target.value",e.target.value); 
                onChange(e.target.value)
            }}
        >
            {optionTemplate}
            {/* {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))} */}
        </select>
    );
};


const DiaryList = ({ diaryList }) => {
    //객체로 전달되는 경로로 페이지 이동을 할 수 있다(깜빡임 없이 SPA, CSR방식으로)
    const navigate = useNavigate();
    //select의 option value가 select value가 되고 -> sortType의 state가 변한다
    //최신순인지 오래된순인지 기억하기 위해서 state를 활용했다
    const [sortType, setSortType] = useState("lastest");
    const [filter, setFilter] = useState("all");

    //정렬된 리스트를 반환
    const getProcessedDiaryList = () => {

        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a, b) => {
            if (sortType === "latest") {
                // 큰숫자 -> 낮은숫자
                return parseInt(b.date) - parseInt(a.date);
            } else {
                // 낮은숫자 -> 큰숫자
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        // 배열을 바로 sort하면 원본이 바뀌므로 배열을 복사해서 sort 진행
        const copyList = JSON.parse(JSON.stringify(diaryList));

        const filteredList =
            filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

        const sortedList = filteredList.sort(compare);
        console.log("sortType",sortType,filter, sortedList)
        return sortedList;
    }

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={'positive'}
                        text={'새 일기 쓰기'}
                        onClick={() => navigate('/new')}
                    />
                </div>
            </div>

            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};
//<div key={it.id}>{it.content} {it.emotion}</div>
DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;