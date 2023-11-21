import ConnectAccount from "./ConnectAccount"
import HeaderTab from "./HeaderTab"

const Header = () => {
  return (
    <div className="w-full border-2 flex justify-between items-center p-3">
      <h1 className="text-3xl font-bold">
        Crowd <span className=" text-purple-500">Funding</span>
      </h1>
      <div className="tab">
            <HeaderTab />
      </div>
      <div className="p-2 bg-white rounded-md">
        <div className="bg-[#efe7fd] p-2 rounded-md font-semibold text-xl">
            <ConnectAccount />
        </div>
      </div>
    </div>
  )
}

export default Header
