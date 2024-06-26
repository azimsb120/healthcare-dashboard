# Patients Dashboard

## About

The Patients Dashboard is a fullstack web application that allows you to browse through patient information, mimicking real-world healthcare data. You can search and filter across columns, with the data displayed in a paginated format.

## Access

Access the app at: https://d2sohhvdr6kfsc.cloudfront.net/

Alternatively: http://healthcare-dashboard-react-app.s3-website.us-east-2.amazonaws.com/

## Technologies

- **Backend**: [Python with FastAPI and Pandas](https://github.com/azimsb120/healthcare-dashboard/tree/main/backend)
- **Frontend**: [JavaScript with React.js](https://github.com/azimsb120/healthcare-dashboard/tree/main/frontend)
- **Hosting**:
  - [AWS Lambda and API Gateway for backend APIs](https://github.com/azimsb120/healthcare-dashboard/blob/main/backend/template.yaml)
  - [AWS S3 and CloudFront for the frontend](https://healthcare-dashboard-react-app.s3.us-east-2.amazonaws.com/index.html)

## Data

The dataset used for this app is available on Kaggle: https://www.kaggle.com/datasets/prasad22/healthcare-dataset

## Improvements

This is a simple app to demonstrate how the technologies integrate. For a production-ready, enterprise application, many improvements are recommended, including but not limited to:

- **Authentication and Authorization**: Implement user authentication and role-based access control to ensure data security and privacy.
- **Advanced Filtering and Sorting**: Add more advanced filtering and sorting options.
- **Pagination**: Enhance pagination to include features like jump to page, items per page selection, and better navigation controls.
- **Data Validation**: Add comprehensive data validation both on the frontend and backend to ensure data integrity.
- **User Interface Enhancements**: Improve the UI/UX with a more responsive design, better aesthetics, and user-friendly interactions.
- **Export Functionality**: Provide options to export the filtered and sorted data in various formats such as CSV, Excel, or PDF.
- **Error Handling and Logging**: Enhance error handling on both frontend and backend, and implement robust logging and monitoring to track issues and performance.
- **Testing**: Implement comprehensive unit, integration, and end-to-end testing to ensure the application’s reliability and robustness.
- **Deployment and CI/CD**: Set up a continuous integration and continuous deployment (CI/CD) pipeline to automate testing and deployment processes.

## Acknowledgements

To complete this project, I acknowledge the use of Kaggle, ChatGPT, StackOverflow, and official documentation for FastAPI, React, and AWS.
