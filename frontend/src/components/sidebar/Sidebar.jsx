import Conversations from "./components/Conversations";
import LogoutButton from "./components/LogoutButton";
import SearchInput from "./components/SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
