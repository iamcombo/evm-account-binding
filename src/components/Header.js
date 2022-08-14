import logo from "../assets/logo.png";
import ImportAccount from "./ImportAccount";
import Setting from "./Setting";

export const Header = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between max-w-[71rem] m-auto">
      <img alt='' src={logo} className="w-auto h-14" />
      {/* <ImportAccount /> */}
      <Setting />
    </div>
  )
}