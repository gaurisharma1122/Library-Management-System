import { Route, Routes } from "react-router-dom"
import Authentication from "./pages/Authentication"

function App() {
 
  return (
    <div>
      <Routes>
        <Route path='/' element={<Authentication/>}></Route>
      </Routes>
    </div>
  )
}

export default App
