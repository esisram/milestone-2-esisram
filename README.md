[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/aNIKLVFm)

## 1. First you need to setup react project with tailwind css. You can install [Tailwind CSS] (https://tailwindcss.com/docs/guides/create-react-app):

### a)Create your project : Start by creating a new React project with Create React App v5.0+ if you don't have one already set up.

```
npx create-react-app project-4
cd project-4
```

### b. Install Tailwind CSS : Install tailwindcss via npm, and then run the init command to generate your tailwind.config.js file.

```
npm install -D tailwindcss
npx tailwindcss init
```

### c. Configure your template paths : Add the paths to all of your template files in your tailwind.config.js file.

```
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./src/**/\*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
```

### d. Add the Tailwind directives to your CSS : Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### e. Start your build process : Run your build process with npm run start.

```
npm run start
```

### f. To setup MultiStepForm Project, you must install the following codes.

```
npm install @hookform/resolvers react-hook-form yup
```

### g. Here is the following folder structure after you do process a to e. please only focus with the file App.js.

```
Project-4/
├── node_modules
├── public
├── src/
│ └── App.css
│ └── App.js
│ └── App.test.js
│ └── index.css
│ └── index.js
│ └── logo.svg
│ └── reportWebVitals.js
│ └── setupTests.js
├── .gitigonore
├── {} package-lock.json
├── {} packagejson
├── README.md
└── tailwind.config.js
README.md
```

## 2. Baseline MultiStepform (App.js) which I started from this [link](https://larainfo.com/blogs/how-to-use-multi-step-form-in-react-with-tailwind-css/) that is already contained MultiStepForm with has informations:

Step1 -> Name and Email
Step2 -> Password.

## 3. To Modify Information like the requirements on the study case:

Step 1:

1. Personal Information
2. Full Name (required)
3. Email Address (required, valid email format)
4. Date of Birth (required, with date validation)

Step 2:

1. Address Information
2. Street Address (required)
3. City (required)
4. State (required)
5. Zip Code (required, valid format)

Step 3:

1. Account Information
2. Username (required)
3. Password (required, strong password validation)

You must create a new js files, there will be 3 new js files, we named it Step1.js, Step2.js, and Step3.js. then this js files will be consumed or imported to the App.js.

## 4. MultiStepForm.js = App.js

This React component implements a multi-step form that guides users through filling out their personal information, address, and account details in three steps. The form uses react-hook-form for form handling and validation, with Yup for schema-based validation.

### Key Features

Multi-Step Navigation: The form allows users to navigate between steps, ensuring they can review and correct their inputs before final submission.
Validation: Each step has its own validation schema, ensuring that user inputs are checked for correctness.
Form State Management: useForm from react-hook-form is used to manage form states, and FormProvider is used to provide form context to all child components.

### Explanation

Imports: The component imports necessary hooks and libraries like useState for state management, useForm and FormProvider from react-hook-form for form state management, yupResolver for integrating Yup validation, and Yup itself for creating validation schemas. Each step component (Step1, Step2, Step3) is also imported.

State Management: useState is used to manage the step state, which tracks the current step of the form. The handleNext and handleBack functions update this state to navigate between steps.

Form Handling: useForm is configured with a validation schema specific to the current step. The FormProvider wraps the form to provide access to form methods throughout the child components.

Validation: Validation schemas (step1Schema, step2Schema, step3Schema) are defined using Yup, ensuring that each field is properly validated according to its type and requirements.

Rendering: The form is conditionally rendered based on the current step. Navigation buttons (Next, Back, Submit) are displayed according to the step, with appropriate functions handling the navigation and final submission.

## 5. Step1.js : add Step1.js

The Step1 component is the first step of the multi-step form, where users enter their personal information, including their full name, email address, and date of birth. This component uses react-hook-form for form handling and validation.

### Explanation

Imports: The useFormContext hook is imported from react-hook-form to access the form's methods and state, such as register and errors.

Form Context: The useFormContext hook provides access to register (used to bind input fields to the form's state) and errors (used to display validation error messages).

Form Fields: The component contains three input fields:

Full Name: A text input for the user's full name. It uses register to bind to the form state and displays an error message if the input is invalid.
Email Address: An email input for the user's email address. It uses register to bind to the form state and applies email validation. An error message is displayed if the input is invalid.
Date of Birth: A date input for the user's date of birth. It uses register to bind to the form state and displays an error message if the input is invalid.
Error Handling: Each input field checks for errors using the errors object. If an error exists, the input border turns red, and an error message is displayed below the input field.

## 6. Step2.js : add Step2.js

The Step2 component is the second step of the multi-step form, where users enter their address information, including their street address, city, state, and zip code. This component uses react-hook-form for form handling and validation.

### Explanation

Imports: The useFormContext hook is imported from react-hook-form to access the form's methods and state, such as register and errors.

Form Context: The useFormContext hook provides access to register (used to bind input fields to the form's state) and errors (used to display validation error messages).

Form Fields: The component contains four input fields:

Street Address: A text input for the user's street address. It uses register to bind to the form state and displays an error message if the input is invalid.
City: A text input for the user's city. It uses register to bind to the form state and displays an error message if the input is invalid.
State: A text input for the user's state. It uses register to bind to the form state and displays an error message if the input is invalid.
Zip Code: A text input for the user's zip code. It uses register to bind to the form state and displays an error message if the input is invalid.
Error Handling: Each input field checks for errors using the errors object. If an error exists, the input border turns red, and an error message is displayed below the input field.

## 7. Step3.js : add Step3.js

The Step3 component is the final step in the multi-step form. This step allows users to enter their account information, specifically their username and password. The component leverages react-hook-form to handle form validation and state management.

### Explanation

Imports: The useFormContext hook from react-hook-form is used to access the form's methods and state. This hook allows us to register input fields and handle validation errors.

Form Context: The useFormContext hook provides access to:

register: This function is used to bind the input fields (username and password) to the form's state.
errors: This object contains any validation errors related to the input fields, which are displayed to the user if the input is invalid.
Form Fields: The component includes two input fields:

Username: A text input for the user's username. It uses register to connect the input to the form state, and applies a red border if there's a validation error.
Password: A password input for the user's password. Similarly, it uses register for form state management and applies a red border if there's a validation error.
Error Handling: For each input field, the component checks for validation errors using the errors object. If an error is detected, an error message is displayed beneath the corresponding input field, and the input's border color is changed to red.

## 6. Here is a new folder structure after I add files (Step1.js, Step2.js, Step3.js).

```
Project-4/
├── node_modules
├── public
├── src/
│ └── App.css
│ └── App.js
│ └── App.test.js
│ └── index.css
│ └── index.js
│ └── logo.svg
│ └── reportWebVitals.js
│ └── setupTests.js
│ └── Register.js
│ └── Login.js
│ └── Category.js
│ └── Step1.js
│ └── Step2.js
│ └── Step3.js
├── .gitigonore
├── {} package-lock.json
├── {} packagejson
├── README.md
└── tailwind.config.js
README.md
```

## 7 melanjutkan tugas final checkpoint

1. Install dependencies pada repo https://github.com/revou-fsse-5/module-4-server and https://github.com/revou-fsse-5/module-4-esisram.git setelah di clone

```
npm install
npm install axios
npm install react-router-dom
npm run build
```

2. pada repo module-4-esisram ->coding App.js merupakan file MultiStepForm untuk signup, sehingga bisa dibuat file baru Register.js yang berisi code dari App.js
3. pada repo module-4-esisram ->bikin login.js yang berisi memasukan username dan password untuk masuk.
4. pada repo module-4-esisram -> bikin Category.js untuk memasuka post,delete, etc
5. pada repo module-4-esisram -> berikut App.js code

```
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MultiStepForm from './Register'
import Login from './Login'
import Category from './Category'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <header className='bg-blue-600 text-white p-4'>
          <nav className='container mx-auto flex justify-between items-center'>
            <h1 className='text-xl font-bold'>My Application</h1>
            <div>
              <Link to='/' className='text-white hover:underline mx-2'>
                Home
              </Link>
              <Link to='/register' className='text-white hover:underline mx-2'>
                Register
              </Link>
              <Link to='/login' className='text-white hover:underline mx-2'>
                Login
              </Link>
              <Link to='/categories' className='text-white hover:underline mx-2'>
                Categories
              </Link>
            </div>
          </nav>
        </header>
        <main className='py-6'>
          <Routes>
            <Route path='/' element={<div className='text-center text-lg'>Welcome to the Application!</div>} />
            <Route path='/register' element={<MultiStepForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/categories' element={<Category />} />
            <Route path='*' element={<div className='text-center text-lg'>404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
```

6. Jalankan API module-4-server dengan cara: `npm start` lalu localhost:8080 akan muncul.
7. Jalankan website repo module-4-esisram dengan cara: `npm start` lalu localhost:3000 akan muncul dengan halaman website yang dapat dilihat pada gambar berikut:

Tampilan Home

<img src="./images/Home.png" alt="add relative path to image" 
   width="5000" height='300'/>

Tampilan Register:

<img src="./images/Step1.png" alt="add relative path to image" 
   width="500" height='300'/>
<img src="./images/Step2.png" alt="add relative path to image" 
   width="500" height='300'/>
<img src="./images/Step3.png" alt="add relative path to image" 
   width="500" height='300'/>

Lalu setelah klik submit, maka data tersebut akan tersimpan pada Api localhost:8080. cara aksesnya ada buka -> http://localhost:8080/ -> klik /users -> muncul list register users.
<img src="./images/users.png" alt="add relative path to image" 
   width="500" height='300'/>

Tampilan Login: coba login menggunakan akun yang sudah didaftarkan misalnya akun dengan username 'ahmaddahlan' yang sudah di register lalu klik login.
<img src="./images/Login.png" alt="add relative path to image" 
   width="5000" height='300'/>

Tampilan Categories: misalnya saya ingin memasukan Category Name "Percobaa Memasukan Data Categories"
<img src="./images/Categories.png" alt="add relative path to image" 
   width="5000" height='300'/>
stelah klik add, maka akan menambah pada category list:
<img src="./images/CategoriesList.png" alt="add relative path to image" 
   width="5000" height='300'/>
data category name juga akan ada di Api localhost:8080.
<img src="./images/ApiCategories.png" alt="add relative path to image" 
   width="5000" height='300'/>

## 8. last but not least, the repository will be deployed with netlify

1. open [netlify](https://www.netlify.com/)
2. log in -> Log in with github
3. Add new site -> import an existing project
4. Lets deploy your proeject Github
5. select your repository (module-4-esisram)
6. just fill base directory with project-4
7. click deploy module-4-esisram
8. please wait until deploying process is done
9. please open your website in this [link](https://jolly-kelpie-3b1ada.netlify.app/)
