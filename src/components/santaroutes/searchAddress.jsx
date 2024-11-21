import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react';
import PropTypes from 'prop-types'

export default function SearchAddress({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
                type="text"
                placeholder="Search for a location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow rounded-full"
            />
            <Button type="submit" variant="outline" className="rounded-full p-2">
                <SearchIcon className="h-4 w-4" />
            </Button>
        </form>
    );
}

SearchAddress.propTypes = {
    onSearch: PropTypes.func.isRequired
}

