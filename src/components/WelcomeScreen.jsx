import React from 'react'

export default function WelcomeScreen({ setIsRunning }) {
    const [randomFact, setRandomFact] = React.useState('')

    React.useEffect(() => {
        async function getFact() {
            var res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
            var fact = await res.json()
            setRandomFact(fact.text);
        }

        getFact()
    }, [])


    return (
        <div className='welcome-screen'>
            <h1>Quizzical</h1>
            <h3 className='selected fun-fact'>A fun Fact!</h3>
            <p>{randomFact}</p>
            <button onClick={() => setIsRunning(last => !last)}>Start quiz</button>
        </div>
    )
};
