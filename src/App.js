import React, { useEffect, useReducer, useRef } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RouteTest from "./components/RouteTest";

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'


const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      )
      console.log("newState")
      console.log(newState)
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState))
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1684805388269
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1684805388270
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1684805388280
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1684805388290
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1684805388300
  },
  {
    id: 6,
    emotion: 5,
    content: "오늘의 일기 6번",
    date: 1684805388310
  },
  {
    id: 7,
    emotion: 5,
    content: "오늘의 일기 7번",
    date: 1689907388310
  },
]

function App() {

  // dummyData를 data state의 기초값으로 설정한다
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if(JSON.parse(localData) && JSON.parse(localData).length > 0) {
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({type: "INIT", data:diaryList})

    } else {
      localStorage.setItem("diary", JSON.stringify(dummyData))
      const localData = localStorage.getItem("diary");
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({type: "INIT", data:diaryList})

    }
  },[])

  const dataId = useRef(0);
  console.log(dataId);
  console.log(new Date().getTime())
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };



  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {/* <RouteTest />  라우팅 되는 페이지랑 무관하게 항상 보임 CSR(client side rendering) 방식으로 빠르게 페이지 전환가능 */}
            <Routes> {/* 페이지 변화할 때 바껴서 보이는 부분*/}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/diary" element={<Diary />} /> {/* diary id가 없는 경우 예외처리*/}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider >
  );
}

export default App;
