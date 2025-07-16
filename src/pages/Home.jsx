import PitchForm from "../components/PitchForm";
import ArrowsLogo from "../assets/images/arrows.svg";

const Home = () => {
  return (
    <div className="pt-15 flex flex-col items-center border">
      <img src={ArrowsLogo} alt="Logo" className="mb-7 max-w-12 w-full" />
      <span className="font-secondary text-5xl">ELEVATOR</span>
      <span className="mb-15 font-secondary text-4xl ">Pitch</span>
      <PitchForm />
    </div>
  );
};
export default Home;
