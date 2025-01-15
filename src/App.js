import './App.css';

import {
 BrowserRouter,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";

import { Slam } from './Slam.js';
import { getSlams, getDefault, NavBar } from './utils.js';

export default function App () {
  return (
   <>
   <BrowserRouter>
     <Routes>
        <Route path="/" element={<Navigate replace to={"/" + getDefault()} />} />
        {getSlams().map(slamInfo => 
          <Route key={"route" + slamInfo.slamNum} path={slamInfo.slamNum} element={<Slam slamInfo={slamInfo}/>}/>
        )}
        <Route path="/*" element={<NotFoundPage />}/>
     </Routes>
   </BrowserRouter>
   </>
 );
}

function NotFoundPage() {
 return (
  <>
   <NavBar slamInfo={getSlams()[getDefault() - 1]} />
   <div>
     Page not found
   </div>
  </>
 );
}

// function NavBar({slamInfo}) {
//   return (
//     <div className="w3-bar w3-white w3-large">
//       <a href="/" className="w3-bar-item w3-button w3-red w3-mobile slam-logo">Sajam Slam {slamInfo.slamNum} - {slamInfo.game}</a>
//       <a href="/1" className="w3-bar-item w3-button w3-mobile">Groups (Sep 4, 3PM PDT)</a>
//       <a href="/2" className="w3-bar-item w3-button w3-mobile">Groups (Sep 6, 3PM PDT)</a>
//       <a href="/3" className="w3-bar-item w3-button w3-mobile">Bracket (Sep 8, 3PM PDT)</a>
//       <a href="/3" className="w3-bar-item w3-button w3-mobile">Bracket (Sep 21, 2:30PM PDT)</a>
//     </div>
//   );
// }