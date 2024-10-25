# DSA Challenges using JavaScript/Node.js

This project contains solutions to various Data Structures and Algorithms (DSA) problems using JavaScript. Each problem is implemented in a separate file, and the project is set up to use `nodemon` for automatic reloading during development.

## Project Structure: 


Here's a single-file README.md that includes all the essential information for your DSA project:

markdown
Copy code
# DSA Challenges with Node.js

This project contains solutions to various Data Structures and Algorithms (DSA) problems using JavaScript. Each problem is implemented in a separate file, and the project is set up to use `nodemon` for automatic reloading during development.

## Project Structure

DATA-STRUCTURE-ALGORITHMS/
├── DSA-Challenges/
│ └── README.md
├── problems/
│ ├── problem1.js
│ ├── problem2.js
│ ├── problem3.js
│ └── problem4.js
├── index.js
├── package.json
└── node_modules/

## Setup & Usage

1. **Install Dependencies:**

- Navigate to the project folder and run:```bash npm install.
- npm start

$(function() {
    // Sample Data Source with Competitors and their Images
    var competitorsData = [
        {
            competitorName: 'Competitor 1',
            images: [
                { url: 'https://example.com/image1.jpg', name: 'Image 1' },
                { url: 'https://example.com/image2.jpg', name: 'Image 2' }
            ]
        },
        {
            competitorName: 'Competitor 2',
            images: [
                { url: 'https://example.com/image3.jpg', name: 'Image 3' },
                { url: 'https://example.com/image4.jpg', name: 'Image 4' },
                { url: 'https://example.com/image5.jpg', name: 'Image 5' }
            ]
        }
    ];

    // Initialize dxDataGrid
    $("#gridContainer").dxDataGrid({
        dataSource: competitorsData,
        columns: [
            { dataField: "competitorName", caption: "Competitor Name" },
            {
                caption: "Images",
                cellTemplate: function(container, options) {
                    var images = options.data.images;
                    
                    // Create a container for images and links
                    var imageContainer = $('<div>').css({
                        display: 'flex',
                        'flex-wrap': 'wrap'
                    });
                    
                    // Loop through each image and display it with a download link
                    images.forEach(function(image) {
                        // Display Image
                        var imgElement = $('<img>')
                            .attr('src', image.url)
                            .css({ 
                                width: '50px', 
                                height: '50px', 
                                margin: '5px' 
                            });
                        
                        // Create Download Link
                        var downloadLink = $('<a>')
                            .attr('href', image.url)
                            .attr('download', image.name)
                            .text('Download')
                            .css({ marginRight: '10px' });

                        // Create a wrapper for image and link
                        var imageWrapper = $('<div>')
                            .css({ margin: '5px' })
                            .append(imgElement)
                            .append('<br/>')
                            .append(downloadLink);

                        // Append the image and download link to the image container
                        imageContainer.append(imageWrapper);
                    });

                    // Append the image container to the cell container
                    container.append(imageContainer);
                }
            }
        ],
        showBorders: true
    });
});