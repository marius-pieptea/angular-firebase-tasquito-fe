# TasquitoFe

TasquitoFe is an Angular-based task management application that integrates with Firebase for backend services. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Features 

- Task management and tracking
- User authentication using Firbase
- Real-time data synchronization with Firestore
- Simple Responsive UI using Clarity Design 

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Angular CLI (version 16.2.12)

## Installation

1. Clone the repository:
  `git clone https://github.com/marius-pieptea/TasquitoFe.git`
2. Navigate to the project directory: 
  `cd TasquitoFe`
3. Install dependencies: 
  `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Firebase Configuration

This project uses Firebase for backend services. Make sure to set up your Firebase project and update the configuration in `src/environments/environment.ts`.
Example: 
```typescript
  import { initializeApp } from 'firebase/app';

  export const environment = {
    production: false,
    firebaseConfig: {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    }
  };
  const app = initializeApp(environment.firebaseConfig);
  ```

## Dependencies

- Angular: ^16.2.0
- Angular Fire: ^7.6.1
- Firebase: ^10.5.2
- RxJS: ~7.8.0
- Clarity Design System

For a complete list of dependencies, please refer to the `package.json` file.

## Contributing

Contributions to TasquitoFe are welcome. Please feel free to submit a Pull Request.

## License

MIT

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
