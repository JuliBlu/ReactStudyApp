const DataStorageHandler = {
    // Method to save data to localStorage
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log("Saved to localStorage:", localStorage);
        } catch (error) {
            console.error('Error saving data to localStorage', error);
        }
    },

    // Method to update POI ratings with both leftRating and rightRating together
    updatePOIRatings: (category, originalPOI, adaptedPOI, answers) => {
        // Retrieve existing data from localStorage or initialize empty data
        const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
        let item = existingData[0] || {};  // Retrieve the first item in formData, or create a new object

        // Log the data before making any changes
        console.log("Before Update:", item);

        // Ensure the ratings object exists within the formData
        if (!item.ratings) {
            item.ratings = {
                culturalandhistoricalsites: [],
                commercialandshopping: [],
                accommodation: [],
                naturalattractions: [],
                entertainment: []
            };
        }

        // Log the category and the ratings being applied
        console.log("Updating Category:", category);
        console.log("originalPOI", originalPOI);
        console.log("adaptedPOI", adaptedPOI);

        // Create a single object combining both left and right ratings
        const combinedRatings = {
            originalPOI: originalPOI,
            adaptedPOI: adaptedPOI,
            answers: answers // Use the answers object to include all question responses
        };

        // Ensure the category exists in the ratings object
        if (!item.ratings[category]) {
            item.ratings[category] = [];
        }

        // Append the new combined ratings to the existing array for the category
        item.ratings[category] = [...item.ratings[category], combinedRatings];

        // Log the updated ratings object
        console.log("Updated Ratings Object:", item.ratings);

        // Save the updated data back to localStorage
        existingData[0] = item;
        localStorage.setItem('formData', JSON.stringify(existingData));

        // Log the final data saved to localStorage
        console.log("After Update:", JSON.parse(localStorage.getItem('formData')));
    },

    // Method to retrieve data from localStorage
    getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error retrieving data from localStorage', error);
            return null;
        }
    },

    // Method to delete data from localStorage
    deleteData(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error deleting data from localStorage', error);
        }
    }
};

export default DataStorageHandler;
