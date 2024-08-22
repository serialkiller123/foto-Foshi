# foto-foshi

FotoFoshi is a photo sharing application built with Next.js, Laravel and React Native. This repository specifically is for the Next.Js frontend.

## Features

-   User authentication with Laravel Sanctum
-   Photo upload and display with Next.js
-   Image upload.
-   Responsive design for mobile and desktop
-   API key generator to access the react native app

## Installation

1. Clone the repository
2. Run `npm install` or `yarn install` to install dependencies
3. Clone the Laravel backend from the repostory provided below.
4. Follow the instruction in the readme to configure the Laravel project.
5. Add `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000` to a `.env.local` file for the backend
6. Run `npm install to install the dependencies.
7. Run `npm run dev` to build the Next.js project

## Backend

[server-fotofoshi](https://github.com/serialkiller123/server-fotofoshi.git)

### Web

![FotoFoshi Web](https://github.com/serialkiller123/foto-Foshi.git)

### Mobile

![fotofoshi - reactNative app](https://github.com/serialkiller123/fotofoshi.git)

## Contributing

Contributions are welcome! Please open a pull request to fix a bug or add a new feature.

## License

FotoFoshi is open-sourced software licensed under the MIT license.
