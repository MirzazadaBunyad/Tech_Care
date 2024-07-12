import Logo from "../../public/assets/TestLogo.svg";
import HomeLogo from "../../public/assets/Home.svg";
import GroupLogo from "../../public/assets/Group.svg";
import CalendarLogo from "../../public/assets/Calendar.svg";
import ChatLogo from "../../public/assets/Chat.svg";
import CreditCard from "../../public/assets/Credit_card.svg";
import Profile from "../../public/assets/profileMiddle.png";
import Settings from "../../public/assets/settings.png";
import More from "../../public/assets/more.png";

function Header() {
    return (
        <nav className="flex justify-between bg-white rounded-[70px] py-[12px] px-[32px]">
            <div>
                <img className="w-[211px] h-[48px]" src={Logo} alt="Logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex gap-[40px] items-center">
                    <li className=" cursor-pointer">
                        <a href="/" className="flex gap-[9px] items-center">
                            <img className="w-[16px] h-[17px]" src={HomeLogo} alt="Home" />
                            <p className="font-bold text-[14px] text-[#072635]">Overview</p>
                        </a>
                    </li>
                    <li className="flex gap-[9px] items-center cursor-pointer bg-[#01F0D0] rounded-[41px] py-[11px] px-[16px]  ">
                        <a href="/" className="flex gap-[9px] items-center">
                            <img src={GroupLogo} alt="Group" />
                            <p className="font-bold text-[14px] text-[#072635]">Patients</p>
                        </a>
                    </li>
                    <li className="flex gap-[9px] items-center cursor-pointer">
                        <a href="/" className="flex gap-[9px] items-center">
                            <img src={CalendarLogo} alt="Calendar" />
                            <p className="font-bold text-[14px] text-[#072635]">Schedule</p>
                        </a>
                    </li>
                    <li className="flex gap-[9px] items-center cursor-pointer">
                        <a href="/" className="flex gap-[9px] items-center">
                            <img src={ChatLogo} alt="Chat" />
                            <p className="font-bold text-[14px] text-[#072635]">Message</p>
                        </a>
                    </li>
                    <li className="flex gap-[9px] items-center cursor-pointer">
                        <a href="/" className="flex gap-[9px] items-center">
                            <img src={CreditCard} alt="Credit_Card" />
                            <p className="font-bold text-[14px] text-[#072635]">Transactions</p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-[8px] border-r-[1px] opacity-[1]">
                    <div>
                        <img className="w-[44px] h-[44px]" src={Profile} alt="" />
                    </div>
                    <div className="pr-[12px]">
                        <h3 className="font-bold text-[14px] text-[#072635]">Dr. Jose Simmons</h3>
                        <h5 className="font-normal text-[14px] text-[#707070]">General Practitioner</h5>
                    </div>
                </div>
                <div className="flex items-center gap-[12px] pl-[12px]">
                    <button>
                        <img className="w-[19px] h-[20px]" src={Settings} alt="Settings" />
                    </button>
                    <button>
                        <img className="w-[4px] h-[18px]" src={More} alt="More" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
export default Header;