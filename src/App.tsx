import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import QuizPage from "./pages/QuizPage"

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  )
}