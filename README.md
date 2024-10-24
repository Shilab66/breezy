

# Breathe Easy with Breezy
## COPD Diagnosis and Prognosis App

This app helps users evaluate and monitor their COPD condition through two primary tools: a symptom-based questionnaire and an audio analysis of cough sounds. The app provides personalized insights based on user inputs, such as symptom severity and sound patterns, and suggests whether the user might be experiencing COPD or related conditions.

## 
[App Video Walkthrough](https://img.youtube.com/vi/fyhJ6fZ59z0/0.jpg)](https://www.youtube.com/watch?v=fyhJ6fZ59z0)
[![Video Watlkthrough](https://img.youtube.com/vi/fyhJ6fZ59z0/0.jpg)](https://www.youtube.com/watch?v=fyhJ6fZ59z0)


## Features

- **Gold Group Questionnaire**: A comprehensive tool that assesses multiple COPD symptoms like coughing, phlegm, chest tightness, breathlessness, energy levels, and more.
- **Tinker Man Audio Analysis**: A cough sound analysis system that provides an initial assessment of potential obstructions based on sound patterns.
- **Diagnosis Results Storage**: Symptom results and audio analysis are stored securely in a Firebase database, enabling long-term tracking and history comparison.
- **Personalized Dashboard**: Users can access a calendar and health data to track the progression of their condition.
- **Professional Resources**: Provides insights and links to studies and further diagnosis information for deeper understanding.

## Example User Information

Login with this inromation to see the app from the perspective of someone who might have COPD:

```plaintext
Email: example@gmail.com
Password: password
```

## Tech Stack

- **Frontend**: React and Next.js for dynamic UI/UX.
- **Backend**: Firebase for user authentication and data storage.
- **ML**: Python Tenserflow for accurate models
- **Hosting**: Vercel for seamless deployment and performance.

## How to Run the Project Locally

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- Firebase account setup for authentication and database management

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/copd-app.git
   cd copd-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Go to your Firebase console and create a project.
   - Enable authentication (Email/Password) and Firestore database.
   - Add Firebase config information to your environment variables:
   
     ```bash
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## Usage

1. **Create an Account**: Users can sign up or log in using email and password.
2. **Complete the Gold Group Questionnaire**: Users answer questions about their symptoms.
3. **Use the Tinker Man Audio Analyzer**: Upload a cough audio file for analysis.
4. **Review Results**: Results for both questionnaires and audio analyses are displayed on the user dashboard.
5. **Track Progress**: Historical data is stored for future comparison.

## Firebase Data Structure

The app stores user data securely in Firebase. Below is an overview of the database structure:

```
users
  ├── user-id
      ├── last-updates
      ├── tinker-man-results
      └── copd-results
          ├── date-1
          │    ├── date
          │    ├── group
          │    └── result
          │        ├── activityLimitations
          │        ├── breathlessness
          │        ├── chestTightness
          │        ├── confidenceLeavingHome
          │        ├── cough
          │        ├── energyLevel
          │        ├── exacerbations
          │        ├── hospitalVisits
          │        ├── phlegm
          │        └── sleepQuality
          ├── date-2
          │    └── ...
```

## License

This project is licensed under the MIT License.
