const imageSelector = document.getElementById("imageSelector");
const displayedImage = document.getElementById("displayedImage");

// Load JSON data
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        // Build option list and category filter
        const optionList = document.createElement("select");
        const categoryFilter = new Set();

        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.option;
            option.textContent = item.option;
            optionList.appendChild(option);
            categoryFilter.add(item.category);
        });

        imageSelector.appendChild(optionList);

        // Build category filter options
        const categorySelector = document.createElement("select");
        categoryFilter.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelector.appendChild(option);
        });

        // Attach event listener to category selector
        categorySelector.addEventListener("change", () => {
            const selectedCategory = categorySelector.value;
            optionList.innerHTML = ""; // Clear existing options

            data.forEach(item => {
                if (item.category === selectedCategory) {
                    const option = document.createElement("option");
                    option.value = item.option;
                    option.textContent = item.option;
                    optionList.appendChild(option);
                }
            });

            updateDisplayedImage();
        });

        // Append category selector to the form
        const form = document.getElementById("imageForm");
        form.insertBefore(categorySelector, optionList);

        // Function to update displayed image
        function updateDisplayedImage() {
            const selectedOption = imageSelector.value;
            const selectedData = data.find(item => item.option === selectedOption);
            displayedImage.src = selectedData.imageUrl;
        }

        // Attach event listener to option selector
        optionList.addEventListener("change", updateDisplayedImage);

        // Initialize the displayed image on page load
        updateDisplayedImage();
    })
    .catch(error => console.error("Error loading data:", error));
