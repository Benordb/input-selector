"use client";
import { countries } from "@/components/Countries";
import { useEffect, useState } from "react";

export default function Home() {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  useEffect(() => {
    const storedCountries = localStorage.getItem("selectedCountries");
    if (storedCountries) {
      setSelectedCountries(JSON.parse(storedCountries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedCountries",
      JSON.stringify(selectedCountries)
    );
  }, [selectedCountries]);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(search.toLowerCase())
  );
  const handleDropdown = (isOpen: boolean) => {
    setDropdown(isOpen);
  };
  const handleAdd = () => {
    setSelectedCountries([]);
    setDropdown(false);
  };
  const selectItemCheck = (item: string) => {
    return selectedCountries.includes(item);
  };
  const toggleSelectedItem = (item: string) => {
    if (selectedCountries.includes(item)) {
      setSelectedCountries(
        selectedCountries.filter((country) => country !== item)
      );
    } else {
      setSelectedCountries([...selectedCountries, item]);
    }
  };
  return (
    <div style={{ maxWidth: "800px" }} className="m-auto px-4 py-8">
      <div>Benordb</div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center gap-4 w-full">
          <div className="relative sm:w-96 w-[320px]">
            <input
              type="text"
              placeholder="Search for a country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => handleDropdown(true)}
              onBlur={() => handleDropdown(false)}
              className="text-black rounded-full w-full pl-4 pr-9 h-8 text-lg"
            />
            <button
              data-testid="dropdown"
              onClick={() => handleDropdown(!dropdown)}
              className="absolute right-2 text-black top-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={dropdown ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
              </svg>
            </button>
          </div>
          <button
            data-testid="addButton"
            onClick={handleAdd}
            className="bg-green-500 text-black px-2 rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1 text-black overflow-y-scroll rounded-xl p-4">
          {selectedCountries.map((country, index) => (
            <button
              data-testid={`select-item-${index}`}
              className="flex items-center gap-1 text-sm bg-yellow-700 rounded-full px-2"
              onClick={() => toggleSelectedItem(country)}
              key={index}
            >
              {country}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          ))}
        </div>
        {dropdown && (
          <div className="bg-white text-black grid grid-cols-3 h-96 overflow-y-scroll z-10 rounded-xl p-4">
            {filteredCountries.map((country, index) => (
              <div
                data-testid={`item-${index}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => toggleSelectedItem(country)}
                className="flex items-center gap-1"
                key={index}
              >
                {selectItemCheck(country) && <CheckIcon />}
                {country}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};
