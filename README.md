# OmniVision - AI-Powered Content Filter

**OmniVision** is a browser extension and backend-powered tool designed to filter and analyze online content in real time. Leveraging **Google Generative AI**, it processes data across web pages, detects unsafe or harmful contents like toxicity, NSFW content or self-harm content, and provides comprehensive insights. With a Node.js backend and Manifest V3 Chrome Extension support, OmniVision integrates seamlessly into your browsing experience.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)

---

## Project Overview

**OmniVision** is built as a **Chrome Extension** using **Manifest V3**, enabling interaction with active browser tabs and performing custom script injections. It integrates with a Node.js backend that uses **Google Generative AI** to analyze and filter content. The solution is designed to help users **filter harmful content**, and **gain AI-driven insights** while browsing.

---

## Features

- **Browser Extension**: 
  - Manifest V3 compliant extension.
  - Popup interface for user interaction.
  - Scripting permissions to analyze and modify web pages.
- **AI-Powered Backend**:
  - Connects to **Google Generative AI** for advanced content filtering.
  - Processes and returns insights in real time.
- **Cross-Platform Compatibility**:
  - Works across various websites and pages.
- **Secure Environment Configuration**:
  - `.env` file support to manage API keys and credentials.

---

## Technologies Used

- **Frontend / Extension:**
  - HTML5, CSS3, JavaScript (Popup UI)
  - Manifest V3 for Chrome Extension
- **Backend:**
  - Node.js
  - Express.js (API server)
  - Google Generative AI (`@google/generative-ai`)
- **Libraries & Tools:**
  - `axios` (API calls)
  - `cors` (Cross-origin requests)
  - `dotenv` (Environment variables)

---

## Installation

### Prerequisites

- **Node.js** (v16+ recommended)
- **NPM** (comes with Node.js)
- **Google Generative AI API Key** (Required for AI features)
- **Chrome Browser** (for extension usage)

### Steps

#### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Anshuman-Jha-01/OmniVision.git
   cd OmniVision/Backend

2. **Install Dependencies:**
   ```bash
    npm install

3. **Set Up Environment Variables:**
    -Create a .env file in Backend/ and configure the following:
    ```bash
    GEMINI_API_KEY=your_Gemini_API_key

4. **Start the Server:**
    ```bash
    node server.js

#### Extension Setup

1. Open **Chrome** and navigate to:
    ```bash
    chrome://extensions
2. Enable **Developer Mode.**
3. Click **Load unpacked** and select the ```OmniVision``` root folder.
4. The extension should now appear in the browser toolbar.

---

## Usage

1. Click the **OmniVision** extension icon on your browser.
2. Analyze content on the active tab.
3. OmniVision communicates with the backend to process content using AI and returns results.

---

## Project Structure

```bash
   OmniVision/
    ├── index.html                 # Popup UI for the extension
    ├── manifest.json              # Chrome Extension Manifest V3
    ├── popup.js                   # Extension logic
    ├── Backend/
    │   ├── server.js              # Express server handling AI requests
    │   ├── package.json           # Dependencies
    │   ├── .env                   # Environment variables (not tracked)
    │   └── node_modules/          # Backend dependencies
    ├── Assets/                    # Images
    └── README.md                  # Project documentation

    
  ```
## Screenshots

| Column 1 | Column 2 |
|----------|----------|
| <img src="https://github.com/user-attachments/assets/42fd7c32-0996-4f5c-8513-69b8a51bae27" alt="Screenshot (126)" width="250" /> | <img src="https://github.com/user-attachments/assets/d7996c79-e5f9-4447-8cbf-f16e261e735a" alt="Screenshot (127)" width="250" /> |
| <img src="https://github.com/user-attachments/assets/87bb2b4e-1fe1-41c0-b12b-ddeca31f8e1c" alt="Screenshot (128)" width="250" /> | <img src="https://github.com/user-attachments/assets/8b6a36f5-ed1a-4a23-bc51-fa0f15ea795e" alt="Screenshot (130)" width="250" /> |
</div>




