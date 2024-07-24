import './App.css'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import MainlayoutGhoomne from './MainLayoutGhoomne';

function App() {
  
console.log("hello")
  return (
    <>
   <MainlayoutGhoomne />
{/* <LoginLayout /> */}
<ToastContainer />
      
    </>
  )
}

export default App
