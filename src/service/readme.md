# Notes
- All top level files and folders should be functions exposed by this layer, with the following exceptions:
  - "Config.ts"
  - "index.ts"
  - "readme.md"
  - "tests/"
  - "utils/"

# Creating a new service function
1. Create a test folder in ./../tests
2. Create a test file in the new folder with a test that calls the function
3. Define the function in ./../serviceFactory/Service.ts
4. Create a file in this directory for the function with contents like this:
  ```ts
  import YourFunctionOptions from '../serviceFactory/options/YourFunctionOptions';
  import YourFunctionResult from '../serviceFactory/options/YourFunctionResult';
  import Config from './Config';

  export default (config: Config) => {
    return async (opts: YourFunctionOptions): Promise<YourFunctionResult> => {
      // Enter your function content here.
    };
  };
  ```
5. Continue writing your tests
