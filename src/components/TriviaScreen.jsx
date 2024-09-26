import React from 'react';
import { decode } from 'html-entities'
import om from './orderMixer.js'
import ButtonGroup from './ButtonGroup.jsx';

export default function TriviaScreen({isRunning,setIsRunning}) {
    const [formatedQuestions, setFormatedQuestions] = React.useState([])
    const [order, setOrder] = React.useState([])
    const [correctAnswer, setCorrectAnswer] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])
    const [allQuestionsAnswered, setAllQuestionsAnswered] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [totalQuestions, setTotalQuestions] = React.useState(0)
    const [correctUserAnswers, setCorrectUserAnswers] = React.useState(0)


    React.useEffect(() => {

        async function getQuestions() {
            var res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
            var questions = await res.json()
            var questionsResults = await questions.results

            console.log('object :>> ', questionsResults);

            // var questionsResults = [

            //     {
            //         "type": "multiple",
            //         "difficulty": "easy",
            //         "category": "General Knowledge",
            //         "question": "Five dollars is worth how many nickles?",
            //         "correct_answer": "100",
            //         "incorrect_answers": [
            //             "50",
            //             "25",
            //             "69"
            //         ]
            //     },
            //     {
            //         "type": "multiple",
            //         "difficulty": "easy",
            //         "category": "Entertainment: Books",
            //         "question": "&quot;Green Eggs And Ham&quot; is a book by which author?",
            //         "correct_answer": "Dr. Seuss",
            //         "incorrect_answers": [
            //             "Beatrix Potter",
            //             "Roald Dahl",
            //             "A.A. Milne"
            //         ]
            //     },
            //     {
            //         "type": "multiple",
            //         "difficulty": "easy",
            //         "category": "Entertainment: Video Games",
            //         "question": "Which &quot;Fallout: New Vegas&quot; quest is NOT named after a real-life song?",
            //         "correct_answer": "They Went That-a-Way",
            //         "incorrect_answers": [
            //             "Come Fly With Me",
            //             "Ain&#039;t That a Kick in the Head",
            //             "Ring-a-Ding Ding"
            //         ]
            //     },
            //     {
            //         "type": "multiple",
            //         "difficulty": "easy",
            //         "category": "Entertainment: Music",
            //         "question": "Which Canadian reggae musician had a 1993 hit with the song &#039;Informer&#039;?",
            //         "correct_answer": "Snow",
            //         "incorrect_answers": [
            //             "Rain",
            //             "Hail",
            //             "Sleet"
            //         ]
            //     }
            // ]

            questionsResults.forEach(element => {
                setCorrectAnswer(correctAnswer => { return [...correctAnswer, element.correct_answer] })
                const questionsOrder = om(order)
                let questionEl = decode(element.question)
                let cor_answerEl = decode(element.correct_answer)
                let inc_answer1El = decode(element.incorrect_answers[0])
                let inc_answer2El = decode(element.incorrect_answers[1])
                let inc_answer3El = decode(element.incorrect_answers[2])

                setFormatedQuestions(formatedQuestions =>
                    [
                        ...formatedQuestions,
                        {
                            question: questionEl,
                            answer0: cor_answerEl,
                            answer1: inc_answer1El,
                            answer2: inc_answer2El,
                            answer3: inc_answer3El,
                            order: questionsOrder,
                        }
                    ])
            })
        }
        getQuestions()
    }, [])




    function checkAllAnswered() {
        const questionsAmount = formatedQuestions.length
        setTotalQuestions(questionsAmount)
        const amountOfAnwersFromUser = document.querySelectorAll('.selected').length

        if (questionsAmount > amountOfAnwersFromUser) {
            setAllQuestionsAnswered(false)
            const unAnsweredQuestions = questionsAmount - amountOfAnwersFromUser
            alert(`You have not answered all questions!
                 \n You have ${unAnsweredQuestions > 1 ? unAnsweredQuestions : 'one'} more question${unAnsweredQuestions > 1 ? 's' : ''} to answer `)
        } else {
            setAllQuestionsAnswered(true)
            collectUserAnswers()
            collectScore()
        }
    }

    function collectUserAnswers() {
        const AnwersFromUser = document.querySelectorAll('.selected')

        AnwersFromUser.forEach((Answer) => {
            setUserAnswers(userAnswers => { return [...userAnswers, Answer.innerHTML] })

        })
    }

    function collectScore() {
        const btns = document.querySelectorAll('.q-button')
        btns.forEach((buttn) => {
            if (buttn.classList.contains('selected')) {
                if (correctAnswer.includes(buttn.innerHTML)) {
                    setScore(last => last+1)
                }
            }
        })
    }

    function restartGame(e) {
        setIsRunning(false)        
    }


    return (
        <div className='trivia-screen' key={Math.random()}>
            {formatedQuestions.map((question) => (
                <ButtonGroup
                    question={question}
                    key={Math.random()}
                    correctAnswer={correctAnswer}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    allQuestionsAnswered={allQuestionsAnswered}
                    totalQuestions={totalQuestions}
                    correctUserAnswers={correctUserAnswers}
                    setCorrectUserAnswers={setCorrectUserAnswers}
                />
            ))}
            <div className='bottom-div'>
                {allQuestionsAnswered && <p>{`You scored ${score}/${totalQuestions} correct answers`}</p>}
                <button className='action' onClick={allQuestionsAnswered?(e) => restartGame(e):(e)=>checkAllAnswered(e)}>{
                    allQuestionsAnswered?`Play again`:`Check Answers`}</button></div>
        </div>
    )
}