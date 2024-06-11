import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../../store/useConversation.js";
import useGetConversation from "../../../hooks/useGetConversation.js";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  async function handleSubmit(e) {
    e.preventDefault();
    if (search === "") {
      return;
    }
    if (search.length < 3) {
      toast.error("Please enter more than 3 characters!");
      return;
    }
    const conversation = conversations?.find((e) =>
      e?.fullName.toLowerCase().includes(search?.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
      setSearch("");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
