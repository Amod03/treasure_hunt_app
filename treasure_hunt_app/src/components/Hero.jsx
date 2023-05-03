import styles from "../style";
import treasure  from "../assets/treasure.jpg";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";

const Hero = (props) => {
    return (
      <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-3`}>
         <h1 className="text-gradient text-7xl pb-6">Treasure hunt game</h1>
        <div className={`flex-1 flex ${styles.flexCenter} flex-row  md:my-0 my-20 py-10 relative`}>
        {props.showLogin==false ?<RegistrationForm/> : <Login/>}
        <img src={treasure} alt="billing" className="ml-40 max-w-md w-[100%] h-[315px] relative z-[5]" />
        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
        </div>
      </div>
      </section>
    );
};

export default Hero;