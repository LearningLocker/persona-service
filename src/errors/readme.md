# Notes
- All errors extend https://github.com/HT2-Labs/jscommons/tree/master/src/errors/BaseError.ts

# Creating a new error
1. Check the error you require doesn't exist in https://github.com/HT2-Labs/jscommons/tree/master/src/errors
2. Duplicate one of the existing error files
3. Modify the new file
4. Handle the error in ./../expressPresenter/utils/handleError.ts
5. Define a new translator function in ./../translatorFactory/Translator.ts
6. Implement the new translator function in ./../translatorFactory/en.ts

# Updating an existing error
1. Modify the existing error file
2. Check that the translator function is correct in ./../translatorFactory/en.ts
