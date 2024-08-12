import { useState } from 'react';
import './App.css';
import Bin2Dec from './Bin2Dec/Bin2Dec';
import BorderRadiusPreviewer from './Border-Radius-Previewer/BorderRadiusPreviewer';
import Calculator from './Calculator/Calculator';
import CauseEffect from './CauseEffect/CauseEffect';

enum Apps {
  BorderRadiusPreviewer = "BorderRadiusPreviewer",
  Bin2Dec = "Bin2Dec",
  Calculator = "Calculator",
  CauseEffect = "CauseEffect"
}

const TypeToApp = {
  [Apps.BorderRadiusPreviewer]: BorderRadiusPreviewer,
  [Apps.Bin2Dec]: Bin2Dec,
  [Apps.Calculator]: Calculator,
  [Apps.CauseEffect]: CauseEffect,
};

function App() {
  const [selectedTab, setSelectedTab] = useState(Apps.BorderRadiusPreviewer);
  return (
    <div className="body">
      <ul className="tabs">
        {Object.keys(Apps).map(app => (
          <li className="tab">
            {app}
          </li>
        ))}
      </ul>
      <div className="appViewer">
        {ReactDOM.}
      </div>
      {/* <BorderRadiusPreviewer />
      <Bin2Dec /> */}
      {/* <Calculator /> */}
      <CauseEffect />
    </div>
  )
}

export default App
