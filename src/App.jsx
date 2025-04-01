  import { useState, useEffect } from "react";
  import OpenAI from "openai";
  import Header from "./components/Header";
  import Hero from "./components/Hero";
  import QuestionForm from "./components/QuestionForm";
  import ResultBox from "./components/ResultBox";
  import { promptFunction, responseFormat } from "./prompt";

  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    
    const onComplete = async (formData) => {
      console.log(formData);
      const promptText = promptFunction(formData);

      console.log(promptText);
      setIsLoading(true);
      try {
        const completion = await client.chat.completions.create({
          model: 'gpt-4o',
          store: true,
          messages: [
            { role: 'user', content: promptText },
          ],
          response_format: responseFormat,
        });

        const data = JSON.parse(completion.choices[0].message.content);
        
        setResult(data);
      } catch (err) {
        console.error("Помилка при надсиланні:", err);
      } finally {
        setIsLoading(false);
      }
    };  

    const onReset = () => {
      setIsStarted(false);
    };

    const onStart = () => {
      setIsStarted(true);
    };

    useEffect(() => {
      const handleBeforeUnload = (e) => {
        if (result) {
          e.preventDefault();
          e.returnValue = ""; // Потрібно для деяких браузерів
        }
      };
    
      window.addEventListener("beforeunload", handleBeforeUnload);
    
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [result]);

    return (
      <div className="pt-16">
        <Header onStart={onStart} onLogoClick={onReset}/>

        {!isStarted && <Hero onStart={() => setIsStarted(true)} />}

        {isStarted && isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}
    
        {isStarted && !isLoading && !result && (
          <div className="bg-white py-20">
            <QuestionForm onComplete={onComplete} />
          </div>
        )}
          
        {result && <ResultBox data={result} />}
      </div>
    );
  }  

  export default App;