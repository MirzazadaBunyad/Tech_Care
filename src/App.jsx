import Aside from "./components/Aside";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  if (!('process' in window)) {
    // @ts-ignore
    window.process = {}
  }
  return (
    <div className="bg-[#F6F7F8] m-[18px]">
      <Header />
      <div className="flex gap-[32px]">
        <Aside />
        <Main />
      </div>
    </div>
  )
}
export default App;