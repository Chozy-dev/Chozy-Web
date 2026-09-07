import HomeScreen from "./pages/home/HomeScreen";
import BottomNav from "./components/common/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-100 flex justify-center">
      <div className="w-full max-w-md bg-stone-100 min-h-screen relative">
        <HomeScreen />
        <BottomNav active="home" />
      </div>
    </div>
  );
}
