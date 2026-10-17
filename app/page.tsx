"use client";

import { useEffect, useMemo, useState } from "react";
import { questions, type Question } from "./questions";

const QUIZ_SIZE = 10;
const QUIZ_SECONDS = 12 * 60;
const letters = ["A", "B", "C", "D"];

function sampleQuestions() {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, QUIZ_SIZE);
}

export default function Home() {
  const [quiz, setQuiz] = useState<Question[]>(() => questions.slice(0, QUIZ_SIZE));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [seconds, setSeconds] = useState(QUIZ_SECONDS);
  const [submitted, setSubmitted] = useState(false);
  const [reviewOnlyWrong, setReviewOnlyWrong] = useState(false);

  useEffect(() => {
    if (submitted || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds(value => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [submitted, seconds]);

  useEffect(() => { if (seconds === 0) setSubmitted(true); }, [seconds]);

  const answered = Object.keys(answers).length;
  const score = useMemo(() => quiz.filter(q => q.answers.includes(answers[q.id])).length, [quiz, answers]);
  const visibleReview = reviewOnlyWrong ? quiz.filter(q => !q.answers.includes(answers[q.id])) : quiz;
  const question = quiz[current];
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remaining = String(seconds % 60).padStart(2, "0");

  function choose(index:number) {
    if (!submitted) setAnswers(prev => ({ ...prev, [question.id]: index }));
  }

  function restart() {
    setQuiz(sampleQuestions()); setCurrent(0); setAnswers({}); setSeconds(QUIZ_SECONDS); setSubmitted(false); setReviewOnlyWrong(false);
  }

  if (submitted) {
    const percent = score * 10;
    return (
      <main className="shell resultsShell">
        <header className="topbar"><div className="brandMark">RN</div><div><p className="eyebrow">115 年第一次護理師國考</p><h1>內外科護理學測驗</h1></div><button className="outlineButton" onClick={restart}>重新抽 10 題</button></header>
        <section className="resultHero">
          <div className="resultCopy"><p className="eyebrow">本次成績</p><h2>{percent}<span>分</span></h2><p>{percent >= 60 ? "通過標準，繼續保持。" : "再複習一下錯題，下次會更好。"}</p></div>
          <div className="resultStats"><div><strong>{score}</strong><span>答對</span></div><div><strong>{QUIZ_SIZE-score}</strong><span>答錯</span></div><div><strong>{answered}</strong><span>已作答</span></div></div>
        </section>
        <section className="reviewHeader"><div><p className="sideLabel">答案檢討</p><h3>逐題回顧</h3></div><label className="filterToggle"><input type="checkbox" checked={reviewOnlyWrong} onChange={e => setReviewOnlyWrong(e.target.checked)} /> 只看錯題</label></section>
        <section className="reviewList">
          {visibleReview.map(q => {
            const picked = answers[q.id]; const correct = q.answers.includes(picked);
            return <article className="reviewCard" key={q.id}>
              <div className="reviewMeta"><span className={correct ? "status correct" : "status wrong"}>{correct ? "答對" : "答錯"}</span><span>原試題第 {q.id} 題 · {q.category}</span></div>
              <h4>{q.text}</h4>
              <div className="reviewChoices">{q.choices.map((choice,index) => <div key={choice} className={`${q.answers.includes(index) ? "answerKey" : ""} ${picked===index && !correct ? "pickedWrong" : ""}`}><b>{letters[index]}</b>{choice}{q.answers.includes(index) && <em>正確答案</em>}{picked===index && !correct && <em>你的答案</em>}</div>)}</div>
            </article>;
          })}
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="topbar"><div className="brandMark">RN</div><div><p className="eyebrow">115 年第一次護理師國考</p><h1>內外科護理學測驗</h1></div><div className="scorePill">隨機 10 題 · {minutes}:{remaining}</div></header>
      <section className="quizGrid">
        <aside className="sidePanel">
          <p className="sideLabel">作答進度</p><strong className="progressNumber">{String(current+1).padStart(2,"0")}<span>/{QUIZ_SIZE}</span></strong>
          <div className="progressTrack"><span style={{width:`${((current+1)/QUIZ_SIZE)*100}%`}} /></div>
          <div className="questionDots">{quiz.map((q,index) => <button key={q.id} aria-label={`前往第 ${index+1} 題`} className={`${index===current ? "active" : ""} ${answers[q.id] !== undefined ? "done" : ""}`} onClick={() => setCurrent(index)}>{index+1}</button>)}</div>
          <p className="sideHint">每次從 50 題題庫隨機抽出 10 題。你可以點選題號自由切換。</p>
        </aside>
        <section className="questionCard">
          <div className="questionMeta"><span>本次第 {current+1} 題 · 原題第 {question.id} 題</span><span>{question.category}</span></div>
          <h2>{question.text}</h2>
          <div className="choices">{question.choices.map((choice,index) => <button key={choice} className={answers[question.id]===index ? "choice selected" : "choice"} onClick={() => choose(index)}><span>{letters[index]}</span>{choice}</button>)}</div>
          <footer className="cardFooter"><button className="ghost" disabled={current===0} onClick={() => setCurrent(v => v-1)}>← 上一題</button><p>已作答 {answered} / {QUIZ_SIZE}</p>{current < QUIZ_SIZE-1 ? <button className="primary" onClick={() => setCurrent(v => v+1)}>下一題 <span>→</span></button> : <button className="submitButton" onClick={() => setSubmitted(true)}>交卷</button>}</footer>
        </section>
      </section>
    </main>
  );
}
