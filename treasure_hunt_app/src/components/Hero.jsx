import treasure  from "../assets/treasure.jpg";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import Quiz from "./Quiz";

const Hero = (props) => {
    return (
      // <section id="home" className={`flex flex-col ${styles.paddingY}`}>
      //   <div className={`flex-1 ${styles.flexStart} flex-col sm:px-16 px-3`}>
      //    <h1 className="text-gradient text-7xl pb-6">Treasure hunt game</h1>
      //   <div className={`flex-1 flex ${styles.flexCenter} flex-row my-10 py-10`}>
      //   {props.showLogin==false ?<RegistrationForm/> : <Login/>}
      //   {/* gradient start */}
      //   <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      //   <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      //   <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      //   {/* gradient end */}
      //   </div>
      // </div>
      // </section>
      <section id="home" className="min-h-screen flex flex-col text-white">
			<div className="container mx-auto px-6 pt-8 flex-1 text-center">
				<h1 className="text-4xl md:text-6xl lg:text:8xl  mt-10">Treasure hunt game</h1>
				<div>
					{props.showLogin == false ? <RegistrationForm /> : <Login />}
				</div>
			</div>
		</section>
    );
};

export default Hero;