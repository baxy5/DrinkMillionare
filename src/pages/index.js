import Answer from "../../components/Answer";
import Questions from "../../components/Question";
import Head from "next/head";
import { useState, useEffect } from "react";
import Lost from "../../components/Lost";
import Start from "../../components/Start";
import Prizes from "../../components/Prizes";
import Next from "../../components/Next";
import Win from "../../components/Win";
import Helpers from "../../components/Helpers";
import End from "../../components/End";

export default function Home() {
  const [isStart, setIsStart] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [isAudience, setIsAudience] = useState(false);
  const [isTele, setIsTele] = useState(false);
  const [isHalving, setIsHalving] = useState(false);
  const [isHalvingBackg, setHalvingBackg] = useState(false);
  const [teamQuestionsCounter, setTeamQuestionsCounter] = useState(1);

  const questions = [
    {
      1: {
        question: "Kecskemét melyik megyében van?",
        answers: ["A: Pest", "B: Heves", "C: Kecske", "D: Bács"],
        rightAnswerIndex: 4,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [1, 2],
      },
      2: {
        question: "A fötér hol van?",
        answers: ["A: Cegléd", "B: Főtéren", "C: Törtel", "D: Lakitelek"],
        rightAnswerIndex: 2,
        halving: [0, 2],
      },
      3: {
        question: "2+2?",
        answers: ["A: 1", "B: 4", "C: 7", "D: 30"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Egy hét hány napbol áll?",
        answers: ["A: 2", "B: 3", "C: 7", "D: 1"],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      5: {
        question: "Melyik NEM Ázsiában található?",
        answers: ["A: Kina", "B: Magyaro.", "C: Japán", "D: Korea"],
        rightAnswerIndex: 2,
        halving: [0, 3],
      },
      6: {
        question: "1+1=?",
        answers: ["A: 2", "B: 2222", "C: 222", "D: 22"],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      7: {
        question: "Ki volt Neumann?",
        answers: [
          "A: Büfés",
          "B: Közmunkás",
          "C: Informatikus-matematikus",
          "D: Iró",
        ],
        rightAnswerIndex: 3,
        halving: [1, 0],
      },
    },
    {
      1: {
        question: "Melyik igaz Neumannra?",
        answers: [
          "A: Büfés volt a GTK-n",
          "B: Büfés a Gamfon",
          "C: Ö volt a polgi",
          "D: Matematikus informatikus volt",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      2: {
        question: "Elon Musknak melyik NEM a vállalkozása?",
        answers: ["A: Spacex", "B: Tesla", "C: Twitter", "D: Törteli CBA"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      3: {
        question: "Elon Musknak melyik a vállalkozása?",
        answers: ["A: Beszélö köntös", "B: Tesco", "C: Penny", "D: Tesla"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      4: {
        question: "3+3?",
        answers: ["A: 1", "B: 2", "C: 3", "D: 6"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      5: {
        question: "Mi volt Neumann keresztneve?",
        answers: ["A: Gusztáv", "B: Gyuri", "C: Sándor", "D: János"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      6: {
        question: "NJE röviditése Neumann János Egyetem?",
        answers: ["A: Nem", "B: Nem", "C: Nem", "D: Igen"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      7: {
        question: "Kinek a nevéröl szol az egyetem?",
        answers: [
          "A: Kiszel Tünde",
          "B: Elon Musk",
          "C: Bakos János",
          "D: Neumann János",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
    },
  ];
  const prizes = [
    "2 shot",
    "4 pohár sör",
    "4 shot",
    "2 shot",
    "4 hosszúlépés",
    "8 shot",
    "12 shot",
  ];

  // LEJÁR AZ IDO HANDLER
  useEffect(() => {
    if (elapsedTime == 60) {
      setElapsedTime(0);
      setEnd(true);
      setPrizeIndex(0);
    }
  }, [elapsedTime]);

  const currentQuestions = questions[currentTeamIndex];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // COUNTER 60s
  useEffect(() => {
    let timerId = 0;
    if (isStart) {
      timerId = setInterval(() => {
        if (elapsedTime == 60) {
          setElapsedTime(1);
        } else {
          setElapsedTime((prevTime) => prevTime + 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTime, isStart]);

  // Answer handler
  function handleAnswer(index) {
    if (currentQuestion.rightAnswerIndex === index + 1) {
      setTimeout(() => {
        setDisplayFlag(true);
        setPrizeIndex((prev) => prev + 1);
      }, 5000);
    } else {
      setTimeout(() => {
        setEnd(true);
        setPrizeIndex(0);
      }, 5000);
    }
  }

  // NEXT QUESTION HANDLER
  function nextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
    setElapsedTime(0);
    setDisplayFlag(false);
    setIsHalving(false);
  }

  // Next team handler
  function restartNext() {
    setTeamQuestionsCounter((prev) => prev + 1);
    if (questions.length !== teamQuestionsCounter) {
      setCurrentTeamIndex((prev) => prev + 1);
    }
    setCurrentQuestionIndex(1);
    setElapsedTime(0);
    setEnd(false);
    setIsStart(false);
    setDisplayFlag(false);
    setIsAudience(false);
    setIsTele(false);
    setIsHalving(false);
    setHalvingBackg(false);
    setPrizeIndex(0);
  }

  // HALVING HANDLER
  function halving() {
    if (isHalving) {
      delete currentQuestion.answers[currentQuestion.halving[0]];
      delete currentQuestion.answers[currentQuestion.halving[1]];
    }
  }

  useEffect(() => {
    console.log(questions.length);
    console.log(teamQuestionsCounter);
  }, [teamQuestionsCounter]);

  return (
    <>
      <Head>
        <title>Legyen Ön is Ittas! | NJE</title>
        <meta name="description" content="Legyen Ön is Ittas! | NJE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/beer.png" />
      </Head>
      {/* pt-[550px] */}
      <main className="cursor-default">
        <div className="text-white text-[40px] flex justify-center gap-10">
          <p>HÖK LOGO</p>
          <p>KÖNTÖS LOGO</p>
        </div>
        {/* IDE LEHET KELL NEGATIV MARGIN */}
        <div className="">
          <div className="flex justify-between">
            <Prizes prizes={prizes} prizeIndex={prizeIndex} />
            <Helpers
              halving={halving()}
              audience={setIsAudience}
              isAudience={isAudience}
              tele={setIsTele}
              isTele={isTele}
              isHalving={isHalving}
              setHalving={setIsHalving}
              setHalvingBackg={setHalvingBackg}
              isHalvingBackg={isHalvingBackg}
            />
          </div>
          <div className="grid justify-center">
            {isEnd && <Lost restartHandler={restartNext} />}
            {!isStart && <Start startHandler={setIsStart} isStart={isStart} />}
            {displayFlag && prizes.length !== prizeIndex && (
              <Next
                nextQuestion={nextQuestion}
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {prizes.length === prizeIndex && (
              <Win
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {questions.length + 1 === teamQuestionsCounter && <End />}
            <div className="flex justify-center items-center text-white">
              <p className="text-[72px]">{60 - elapsedTime}</p>
            </div>
            <Questions q={currentQuestion.question} />
            <div className="grid grid-cols-2 gap-5">
              {currentQuestion.answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    a={answer}
                    i={index}
                    rightAnswerIndex={currentQuestion.rightAnswerIndex}
                    handleAnswer={handleAnswer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
