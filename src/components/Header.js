import logo from "../assets/logo.png";
import ImportAccount from "./ImportAccount";

export const Header = () => {
  return (
    <div className="w-full h-16 flex items-center justify-center max-w-[71rem] m-auto">
      <img alt='' src={logo} className="w-auto h-14" />
      {/* <ImportAccount /> */}
    </div>
  )
}