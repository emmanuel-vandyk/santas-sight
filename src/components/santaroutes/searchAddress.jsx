import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react';
import PropTypes from 'prop-types'
import { getAutocompleteSuggestions } from '@/services/santaroutes/santaroutes';

export default function SearchAddress({ onSearch, onSave }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 1) {
                const data = await getAutocompleteSuggestions(searchTerm);
                setSuggestions(data);
                setIsDropdownOpen(true);
            } else {
                setSuggestions([]);
                setIsDropdownOpen(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 200);

        return () => clearTimeout(debounce);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const searchResult = await onSearch(searchTerm);
        if (searchResult && searchResult.length > 0) {
            onSave(searchResult[0]);
        }
        setSearchTerm('');
        setSuggestions([]);
        setIsDropdownOpen(false);
    };

    const handleSuggestionClick = async (suggestion) => {
        setSearchTerm(suggestion.display_name);
        const searchResult = await onSearch(suggestion.display_name);
        if (searchResult && searchResult.length > 0) {
            onSave(searchResult[0]);
        }
        setSuggestions([]);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="flex items-center w-full">
                <div className="relative w-full">
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-full shadow-green-700 shadow-sm border-green-700 pr-10 pl-4 py-2 bg-white"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-green-700 text-zinc-800 hover:bg-green-600 hover:scale-110 transition-all duration-200"
                    >
                        <SearchIcon className="h-4 w-4 text-white font-bold" />
                    </button>
                </div>
            </form>
            {isDropdownOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-start"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <SearchIcon className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm">{suggestion.display_name}</p>
                                {suggestion.address && (
                                    <p className="text-xs text-gray-600">
                                        {[
                                            suggestion.address.road,
                                            suggestion.address.city || suggestion.address.town || suggestion.address.village,
                                            suggestion.address.state,
                                            suggestion.address.country
                                        ].filter(Boolean).join(', ')}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

SearchAddress.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}
