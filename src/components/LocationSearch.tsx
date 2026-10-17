"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/Input";

const BASE_PATH = "/listing/location";

const LocationSearch = () => {
  const router = useRouter();

  const [input, setInput] = useState("");

  const navigate = (term: string) => {
    const value = term.trim();

    router.replace(`${BASE_PATH}/${encodeURIComponent(value)}`);
    setInput("");
  };

  return (
    <div className="relative flex-1">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
      />

      <Input
        placeholder="City, street, zipcode"
        className="pl-10 pr-10 w-full"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(input);
          }
        }}
      />

      {input.length > 0 && (
        <button
          type="button"
          aria-label="Clear location"
          onClick={() => {
            setInput("");
            navigate("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-default cursor-pointer"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default LocationSearch;
