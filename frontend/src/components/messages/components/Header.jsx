import useConversation from "../../../store/useConversation";
const Header = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="bg-slate-500 px-4 py-2 mb-2">
      <span className="label-text">To:</span>
      <span className="text-gray-900 font-bold"> {selectedConversation?.fullName}</span>
    </div>
  );
};

export default Header;
