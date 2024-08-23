import { lazy, Suspense, useState } from 'react';
import classnames from './utils/classnames';
import './App.css';



const Bin2Dec = lazy(() => import('./Bin2Dec/Bin2Dec'));
const BorderRadiusPreviewer = lazy(() => import('./Border-Radius-Previewer/BorderRadiusPreviewer'));
const BookFinder = lazy(() => import('./BookFinder/BookFinder'));
const Calculator = lazy(() => import('./Calculator/Calculator'));
const CauseEffect = lazy(() => import('./CauseEffect/CauseEffect'));
const ColorCycle = lazy(() => import('./ColorCycle/ColorCycle'));
const CountdownTimer = lazy(() => import('./CountdownTimer/CountdownTimer'));
const CardMemoryGame = lazy(() => import('./CardMemoryGame/CardMemoryGame'));

enum Apps {
  Bin2Dec = "Bin2Dec",
  BorderRadiusPreviewer = "BorderRadiusPreviewer",
  BookFinder = 'BookFinder',
  Calculator = "Calculator",
  CardMemoryGame = 'CardMemoryGame',
  CauseEffect = "CauseEffect",
  ColorCycle = 'ColorCycle',
  CountdownTimer = 'CountdownTimer',
}

const TypeToApp = {
  [Apps.Bin2Dec]: Bin2Dec,
  [Apps.BorderRadiusPreviewer]: BorderRadiusPreviewer,
  [Apps.BookFinder]: BookFinder,
  [Apps.Calculator]: Calculator,
  [Apps.CardMemoryGame]: CardMemoryGame,
  [Apps.CauseEffect]: CauseEffect,
  [Apps.ColorCycle]: ColorCycle,
  [Apps.CountdownTimer]: CountdownTimer
};

const Loading = () => "Loading...";

function App() {
  const [selectedTab, setSelectedTab] = useState(Apps.Bin2Dec);
  const BodyComponent = TypeToApp[selectedTab];
  return (
    <div className="body">
      <ul className="tabs">
        {Object.keys(Apps).map(app => (
          <li
            className={classnames('tabItem', selectedTab === app && 'selected')}
            onClick={() => setSelectedTab(app as Apps)}
            key={app}
          >
            {app}
          </li>
        ))}
      </ul>
      <div className="appViewer">
        <Suspense fallback={<Loading />}>
          <BodyComponent />
        </Suspense>
      </div>
    </div>
  )
}

export default App
