import BigBox from "./components/BigBox";
import BottomBox from "./components/BottomBox";

function App() {
  return (
    <div className="w-screen h-auto p-0 m-0 flex flex-col justify-start items-center gap-y-4">
      <header className="w-full bg-[#1b3252] text-left px-8 py-3 text-white text-xl">
        Wellness Retreats
      </header>
      <BigBox />
      <BottomBox />
    </div>
  );
}

export default App;
