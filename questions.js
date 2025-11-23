const questionBank = [
    {
        question: "What is the primary purpose of version control systems like Git?",
        options: [
            "To compile source code into executable files",
            "To track changes in source code and coordinate work among multiple developers",
            "To debug applications in real-time",
            "To optimize database queries"
        ],
        correct: 1,
        difficulty: "Easy",
        explanation: "Version control systems like Git track changes in source code over time and enable multiple developers to collaborate on the same project without conflicts."
    },
    {
        question: "Which design pattern ensures a class has only one instance and provides global access to it?",
        options: [
            "Factory Pattern",
            "Observer Pattern",
            "Singleton Pattern",
            "Strategy Pattern"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "The Singleton pattern restricts a class to a single instance and provides a global point of access to that instance. It's commonly used for logging, database connections, and configuration settings."
    },
    {
        question: "What does SOLID stand for in software engineering principles?",
        options: [
            "Simple, Organized, Logical, Integrated, Documented",
            "Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
            "Structured, Object-oriented, Linear, Independent, Distributed",
            "Secure, Optimized, Lightweight, Integrated, Deployable"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "SOLID represents five key principles of object-oriented design: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. These principles help create maintainable and scalable software."
    },
    {
        question: "In Agile methodology, what is a Sprint?",
        options: [
            "A final testing phase before deployment",
            "A time-boxed iteration where development work is completed",
            "A meeting to discuss project requirements",
            "A tool for tracking bugs and issues"
        ],
        correct: 1,
        difficulty: "Easy",
        explanation: "A Sprint is a fixed time period (usually 1-4 weeks) in Agile methodology where a team completes a set amount of work. It's the basic unit of development in Scrum."
    },
    {
        question: "What is the time complexity of binary search algorithm?",
        options: [
            "O(n)",
            "O(n log n)",
            "O(log n)",
            "O(n²)"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity."
    },
    {
        question: "Which HTTP status code indicates a successful GET request?",
        options: [
            "200 OK",
            "201 Created",
            "404 Not Found",
            "500 Internal Server Error"
        ],
        correct: 0,
        difficulty: "Easy",
        explanation: "200 OK indicates the request was successful and the server returned the requested data."
    },
    {
        question: "What is the main advantage of using microservices architecture?",
        options: [
            "Reduced development time",
            "Lower infrastructure costs",
            "Better scalability and maintainability",
            "Simplified deployment process"
        ],
        correct: 2,
        difficulty: "Hard",
        explanation: "Microservices allow independent scaling and maintenance of different components, making systems more flexible and resilient."
    },
    {
        question: "In database design, what is normalization?",
        options: [
            "Converting data to a standard format",
            "Organizing data to reduce redundancy and improve integrity",
            "Encrypting sensitive information",
            "Creating backup copies of data"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "Normalization is the process of organizing data to reduce redundancy and improve data integrity through proper table design."
    },
    {
        question: "What is the purpose of unit testing?",
        options: [
            "Testing the entire application as a whole",
            "Testing individual components or modules in isolation",
            "Testing user interface elements",
            "Testing database connections"
        ],
        correct: 1,
        difficulty: "Easy",
        explanation: "Unit testing focuses on testing individual components or modules in isolation to ensure they work correctly."
    },
    {
        question: "Which of the following is NOT a characteristic of RESTful APIs?",
        options: [
            "Stateless communication",
            "Use of standard HTTP methods",
            "Maintaining session state on the server",
            "Resource-based URLs"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "RESTful APIs are stateless and don't maintain session state on the server. Each request contains all necessary information."
    },
    {
        question: "What is the main purpose of a load balancer?",
        options: [
            "To encrypt network traffic",
            "To distribute incoming requests across multiple servers",
            "To compress data for faster transmission",
            "To monitor system performance"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "Load balancers distribute incoming traffic across multiple servers to improve performance and reliability."
    },
    {
        question: "In object-oriented programming, what is polymorphism?",
        options: [
            "The ability to create multiple instances of a class",
            "The ability of objects to take multiple forms and respond differently to the same interface",
            "The process of hiding internal implementation details",
            "The mechanism of creating new classes from existing ones"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "Polymorphism allows objects to take multiple forms and respond differently to the same method call based on their type."
    },
    {
        question: "What is the primary benefit of using Docker containers?",
        options: [
            "Faster code compilation",
            "Better user interface design",
            "Consistent application deployment across different environments",
            "Improved database performance"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "Docker ensures consistent application deployment across different environments by packaging applications with their dependencies."
    },
    {
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: [
            "Queue",
            "Stack",
            "Linked List",
            "Hash Table"
        ],
        correct: 1,
        difficulty: "Easy",
        explanation: "Stack follows the LIFO principle where the last element added is the first to be removed, like a stack of plates."
    },
    {
        question: "What is the purpose of CI/CD in software development?",
        options: [
            "To create user documentation",
            "To automate the integration, testing, and deployment of code changes",
            "To manage project budgets",
            "To design user interfaces"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "CI/CD (Continuous Integration/Continuous Deployment) automates the process of integrating, testing, and deploying code changes."
    },
    {
        question: "In software architecture, what is the Model-View-Controller (MVC) pattern?",
        options: [
            "A database design pattern",
            "A network communication protocol",
            "An architectural pattern that separates application logic into three interconnected components",
            "A testing methodology"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "MVC separates application into Model (data), View (presentation), and Controller (logic) for better organization."
    },
    {
        question: "What is the main difference between SQL and NoSQL databases?",
        options: [
            "SQL databases are faster than NoSQL databases",
            "SQL databases use structured schemas while NoSQL databases are more flexible with data structure",
            "NoSQL databases can only store text data",
            "SQL databases are newer technology"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "SQL databases use structured schemas with predefined tables, while NoSQL databases offer more flexibility in data structure."
    },
    {
        question: "What is the purpose of API rate limiting?",
        options: [
            "To improve API response speed",
            "To prevent abuse and ensure fair usage of API resources",
            "To encrypt API communications",
            "To compress API responses"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "Rate limiting prevents abuse and ensures fair usage of API resources by limiting the number of requests per time period."
    },
    {
        question: "In software testing, what is the difference between black-box and white-box testing?",
        options: [
            "Black-box testing is automated, white-box testing is manual",
            "Black-box testing focuses on functionality without knowing internal structure, white-box testing examines internal code structure",
            "Black-box testing is for databases, white-box testing is for user interfaces",
            "There is no difference between them"
        ],
        correct: 1,
        difficulty: "Hard",
        explanation: "Black-box testing tests functionality without internal knowledge, while white-box testing examines internal code structure."
    },
    {
        question: "What is the main advantage of using a Content Delivery Network (CDN)?",
        options: [
            "Better code organization",
            "Improved application security",
            "Faster content delivery to users by serving from geographically closer servers",
            "Simplified database management"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "CDNs serve content from servers geographically closer to users, reducing latency and improving load times."
    },
    {
        question: "Which principle suggests that software entities should be open for extension but closed for modification?",
        options: [
            "Single Responsibility Principle",
            "Open-Closed Principle",
            "Liskov Substitution Principle",
            "Dependency Inversion Principle"
        ],
        correct: 1,
        difficulty: "Hard",
        explanation: "The Open-Closed Principle states that software entities should be open for extension but closed for modification."
    },
    {
        question: "What is the purpose of database indexing?",
        options: [
            "To encrypt database records",
            "To create backup copies of data",
            "To improve query performance by creating faster access paths to data",
            "To compress database files"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "Indexes create faster access paths to data, significantly improving query performance for large datasets."
    },
    {
        question: "In Agile development, what is the purpose of a retrospective meeting?",
        options: [
            "To plan the next sprint's tasks",
            "To demonstrate completed features to stakeholders",
            "To reflect on the team's process and identify improvements",
            "To estimate story points for user stories"
        ],
        correct: 2,
        difficulty: "Easy",
        explanation: "Retrospectives help teams reflect on their process and identify improvements for future sprints."
    },
    {
        question: "What is the main characteristic of functional programming?",
        options: [
            "Using only functions without classes",
            "Emphasizing immutability and avoiding side effects",
            "Writing code in a single function",
            "Using only built-in functions"
        ],
        correct: 1,
        difficulty: "Hard",
        explanation: "Functional programming emphasizes immutability and pure functions without side effects, making code more predictable."
    },
    {
        question: "What is the purpose of a message queue in distributed systems?",
        options: [
            "To store user passwords securely",
            "To enable asynchronous communication between different parts of a system",
            "To compress network traffic",
            "To monitor system performance"
        ],
        correct: 1,
        difficulty: "Hard",
        explanation: "Message queues enable asynchronous communication between different parts of a distributed system, improving scalability."
    },
    {
        question: "Which design pattern is used to create objects without specifying their exact class?",
        options: [
            "Singleton Pattern",
            "Observer Pattern",
            "Factory Pattern",
            "Decorator Pattern"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "Factory pattern creates objects without specifying their exact class, providing flexibility in object creation."
    },
    {
        question: "What is the main benefit of using TypeScript over JavaScript?",
        options: [
            "Faster execution speed",
            "Static type checking and better tooling support",
            "Smaller file sizes",
            "Better browser compatibility"
        ],
        correct: 1,
        difficulty: "Easy",
        explanation: "TypeScript provides static type checking and enhanced development tooling, catching errors at compile time."
    },
    {
        question: "In software security, what is the principle of least privilege?",
        options: [
            "Using the simplest possible code",
            "Granting users and processes only the minimum access rights needed to perform their functions",
            "Writing the least amount of documentation",
            "Using the fewest number of servers"
        ],
        correct: 1,
        difficulty: "Medium",
        explanation: "Least privilege grants only the minimum necessary access rights, reducing security risks."
    },
    {
        question: "What is the purpose of code refactoring?",
        options: [
            "To add new features to existing code",
            "To improve code structure and readability without changing its external behavior",
            "To fix bugs in the application",
            "To optimize database queries"
        ],
        correct: 1,
        difficulty: "Easy",
        explanation: "Refactoring improves code structure and readability while maintaining the same external behavior and functionality."
    },
    {
        question: "Which HTTP method is idempotent and safe?",
        options: [
            "POST",
            "PUT",
            "GET",
            "DELETE"
        ],
        correct: 2,
        difficulty: "Medium",
        explanation: "GET is both idempotent (same result on repeated calls) and safe (no side effects on the server)."
    }
];