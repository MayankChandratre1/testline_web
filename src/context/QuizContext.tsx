import { QuizData } from "@/types/quiz.types"
import { createContext, useContext, useEffect, useState } from "react"


const quizContext = createContext<{
    data: QuizData | null
}>({data:null})


const QuizProvider = ({children}:{
    children: React.ReactNode
}) => {
    const [data, setData] = useState<QuizData | null>(null)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await fetch('/api/Uw5CrX')
                const data = await res.json()
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    return (
        <quizContext.Provider value={{data}}>
            {children}
        </quizContext.Provider>
    )
}

export const useQuiz = () => {
    const context = useContext(quizContext)
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider')
    }
    return context
}

export default QuizProvider