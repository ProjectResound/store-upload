# End to End Test
A couple of end to end tests of uploading a file and all the things you can do with it.  Uses the same file `test-audio-for-testing.wav` for each test.

This assumes you already have resound-store and resound-api up and running on localhost. No need to actually upload to S3.

## requirements
* npm
* [testcafe](https://devexpress.github.io/testcafe/documentation/getting-started/)
* auth0 login and password

## instructions
1. install testcafe
1. populate the environment variables with the appropriate values:
    ```
    TESTCAFE_EMAIL=email_to_login
    TESTCAFE_PW=password_for_login
    ```
1. `testcafe chrome` (or `safari` or `firefox`)