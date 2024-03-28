
import React, {useState, useCallback} from 'react'


export default function MAtrix({rows, cols}) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleMouseUp = () => {
    setIsMouseDown(false);
  }

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  }

  const handleMouseEnter = useCallback((boxNumber) => {
    if(isMouseDown) {
      const startBox = selectedBoxes[0];
      const endBox = boxNumber;

      const startBoxRow = Math.floor((startBox-1)/cols);
      const startBoxCol = (startBox-1)%cols;

      const endBoxRow = Math.floor((endBox-1)/cols);
      const endBoxCol = (endBox-1)%cols;

      const startRow = Math.min(startBoxRow, endBoxRow);
      const endRow = Math.max(startBoxRow, endBoxRow);

      const startCol= Math.min(startBoxCol, endBoxCol);
      const endCol = Math.max(startBoxCol, endBoxCol);

      const selected = [startBox];
      for(let i = startRow; i <= endRow; i++) {
        for(let j = startCol; j <= endCol; j++) {
          selected.push(i*cols+j+1);
        }
      }
      setSelectedBoxes(selected);
    }
  }, [isMouseDown]);

  return (
    <div className="container" styles={{"--rows": rows, "--cols": cols}}
      onMouseUp={handleMouseUp}
    >
      {
        [...Array(rows*cols).keys()].map((_, index) => {
          return (
            <div className={`box ${selectedBoxes.includes(index+1) ? "selected" : ""}`}
            onMouseDown={() => handleMouseDown(index+1)}
            onMouseEnter={() => handleMouseEnter(index+1)}
            >
              {index+1}
            </div>
          )
        })
      }
    </div>
  )
}