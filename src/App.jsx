import Header from "./components/Header";
import Hero from "./components/Hero";
import QuestionForm from "./components/QuestionForm";

function App() {
  return (
    <div>
      <Header/>
      <Hero />
      <div className="bg-white py-20">
        <QuestionForm />
      </div>
    </div>
  );
}

export default App;