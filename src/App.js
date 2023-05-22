import React, { useReducer, useRef } from "react";
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
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1657436056690
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1657436056691
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1657436056692
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1657436056693
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1657436056694
  },
  {
    id: 6,
    emotion: 6,
    content: "오늘의 일기 6번",
    date: 1757436056694
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  console.log(dataId);
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
            <RouteTest />  {/* 라우팅 되는 페이지랑 무관하게 항상 보임 CSR(client side rendering) 방식으로 빠르게 페이지 전환가능*/}
            <Routes> {/* 페이지 변화할 때 바껴서 보이는 부분*/}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
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