import { FaSearch } from "react-icons/fa";

function SearchBar({ placeholder, value, onChange }) {

    return (

        <div className="relative w-64">

            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

        </div>

    );

}

export default SearchBar;