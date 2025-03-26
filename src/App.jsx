import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuestionForm from "./components/QuestionForm";
import ResultBox from "./components/ResultBox";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  
  const onComplete = (formData) => {
    console.log(formData);
  }

  return (
    <div className="pt-16">
      <Header/>
      {!isStarted && <Hero onStart={() => setIsStarted(true)} />}
      {isStarted && (
        <div className="bg-white py-20">
          <QuestionForm onComplete={onComplete} />
        </div>
      )}
      {/* <ResultBox /> */}
    </div>
  );
}

export default App;