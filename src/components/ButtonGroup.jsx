import React from 'react'

export default function ButtonGroup({ question, correctAnswer, userAnswers,allQuestionsAnswered,correctUserAnswers,setCorrectUserAnswers}) {
    const btn0 = React.useRef()
    const btn1 = React.useRef()
    const btn2 = React.useRef()
    const btn3 = React.useRef()

    React.useEffect(() => {
        const allbtn = document.querySelectorAll('.q-button')

        allbtn.forEach(btn => {
            if (btn.classList.contains('selected')) {
                btn.classList.remove('selected')
            }
            if (userAnswers.includes(btn.innerHTML)) {
                btn.classList.add('selected')
            }
        })

        if (allQuestionsAnswered) {
            allbtn.forEach(btn => {
                btn.setAttribute('disabled', 'true')
                btn.style.opacity = 0.5;
                if (correctAnswer.includes(btn.innerHTML)&& btn.classList.contains('selected')) {
                    btn.classList.add('green')
                    btn.style.opacity = 1;

                    // צריך למצוא דרך לספור כאן את הנקודות של התשובות הנכונות

                } else if (correctAnswer.includes(btn.innerHTML) && !btn.classList.contains('selected')) {
                    btn.classList.add('red')
                    btn.style.opacity = 1;

                }
            })


        }
    }, [allQuestionsAnswered])
    

    function handleClick(e) {
        btn0.current.classList.remove('selected')
        btn1.current.classList.remove('selected')
        btn2.current.classList.remove('selected')
        btn3.current.classList.remove('selected')

        e.target.classList.add('selected')
    }

    return (
        <div className='q-div' >
            <h5 >{question.question}</h5>
            <div className='q-button-group'>
                <button className='q-button' ref={btn0} onClick={(e) => handleClick(e)}>{question[`answer${question.order[0][0]}`]}</button>
                <button className='q-button' ref={btn1} onClick={(e) => handleClick(e)}>{question[`answer${question.order[0][1]}`]}</button>
                <button className='q-button' ref={btn2} onClick={(e) => handleClick(e)}>{question[`answer${question.order[0][2]}`]}</button>
                <button className='q-button' ref={btn3} onClick={(e) => handleClick(e)}>{question[`answer${question.order[0][3]}`]}</button>
            </div>

        </div>
    )
};
