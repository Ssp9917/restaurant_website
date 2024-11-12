// Function to filter data based on a search query
export const searchItems = (items, searchQuery, keys) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
        keys.some((key) =>
            String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
};

// Function to paginate data
export const paginateItems = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};


// Sort utility function
export const sortItems = (items, key, order = 'asc') => {
    return [...items].sort((a, b) => {
        if (order === 'asc') return a[key] > b[key] ? 1 : -1;
        return a[key] < b[key] ? 1 : -1;
    });
};
