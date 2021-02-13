import localforage from "localforage";
import { boardDataSubject } from "./state/boardData";

boardDataSubject.subscribe(boardData => {
  localforage.setItem("boardData", boardData);
});

localforage.getItem("boardData").then(function(boardData) {
  // Populate data on first run
  if (boardData === null) {
    boardDataSubject.next(defaultBoardData);
    return;
  }
  boardDataSubject.next(boardData);
});

const defaultBoardData = {
  
};
