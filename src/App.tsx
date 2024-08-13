import { lazy, useState } from 'react';
import classnames from './utils/classnames';
import './App.css';

const Bin2Dec = lazy(() => import('./Bin2Dec/Bin2Dec'));
const BorderRadiusPreviewer = lazy(() => import('./Border-Radius-Previewer/BorderRadiusPreviewer'));
const Calculator = lazy(() => import('./Calculator/Calculator'));
const CauseEffect = lazy(() => import('./CauseEffect/CauseEffect'));
const ColorCycle = lazy(() => import('./ColorCycle/ColorCycle'));

enum Apps {
  BorderRadiusPreviewer = "BorderRadiusPreviewer",
  Bin2Dec = "Bin2Dec",
  Calculator = "Calculator",
  CauseEffect = "CauseEffect",
  ColorCycle = 'ColorCycle',
}

const TypeToApp = {
  [Apps.BorderRadiusPreviewer]: BorderRadiusPreviewer,
  [Apps.Bin2Dec]: Bin2Dec,
  [Apps.Calculator]: Calculator,
  [Apps.CauseEffect]: CauseEffect,
  [Apps.ColorCycle]: ColorCycle
};

function App() {
  const [selectedTab, setSelectedTab] = useState(Apps.BorderRadiusPreviewer);
  const BodyComponent = TypeToApp[selectedTab];
  return (
    <div className="body">
      <ul className="tabs">
        {Object.keys(Apps).map(app => (
          <li
            className={classnames('tabItem', selectedTab === app && 'selected')}
            onClick={() => setSelectedTab(app as Apps)}
          >
            {app}
          </li>
        ))}
      </ul>
      <div className="appViewer">
        <BodyComponent />
      </div>
    </div>
  )
}

export default App
