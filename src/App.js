import React, { useState } from 'react';
import logo from './logo.svg';
//import './App.css';
import DiffView from './DiffView';
import { GithubPicker, SketchPicker } from 'react-color';

function brightnessByColor (color) {
  var color = "" + color, isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
  if (isHEX) {
    const hasFullSpec = color.length == 7;
    var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m) var r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16), g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16), b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
  }
  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m) var r = m[0], g = m[1], b = m[2];
  }
  if (typeof r != "undefined") return ((r*299)+(g*587)+(b*114))/1000;
}

console.log(brightnessByColor("#FFFFFF"));
console.log(brightnessByColor("#000000"));

function App() {
  // --diff-code-delete-background-color: 
  const [insertColor, setInsertColor] = useState("#eaffee");
  const [deleteColor, setDeleteColor] = useState("#fdeff0");
  const root = document.documentElement;
  const handleChangeComplete = ({hex}) => {
    setInsertColor(hex);
    console.log(hex);
    root.style.setProperty("--diff-code-insert-background-color", hex)
  };

  const handleChangeComplete2 = ({hex}) => {
    setDeleteColor(hex);
    console.log(hex);
    root.style.setProperty("--diff-code-delete-background-color", hex)
  };

  // Build a context for editor colors, for now we'll just treat them as state up here
const colors = [
  //'#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', 
  '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']
  return (
    <div className="App">
      
      <div style={{ margin: "auto", width: "80%", height: "600px", overflow: "auto"}}>
        <h1>Color controls</h1>
        <div style={{display:"flex"}}>
          <div style={{marginLeft: 20}}>
            <div style={{display:"flex", lineHeight: "30px"}}><div className="box" style={{backgroundColor: deleteColor}}></div>Delete Color</div>
            <GithubPicker colors={colors} color={deleteColor} onChangeComplete={ handleChangeComplete2 }/>
          </div>
          <div style={{marginLeft: 20, height: 30}}>
            <div style={{display:"flex", lineHeight: "30px", height:30, marginBottom: 10}}><div className="box" style={{backgroundColor: insertColor}}></div>Insert Color</div>
            <GithubPicker colors={colors} color={insertColor} onChangeComplete={ handleChangeComplete }/>
          </div>
          
        </div>
        <DiffView />
      </div>
    </div>
  );
}

export default App;
