This is the web developer internship test given by Starwisp industries on Sep 3, 2020;

THIS IS SUBMITTED BY SAGAR GARG
mobile - 9711181457
I have used HTML CSS JQUERY for frontend , no outside frontend framework. For Backend I have used Nodejs , express js and MySQL database. Name of the DATABASE I have used is starwisp and all the spellings are matched as per given in the images.

ALL the packages are also uplaoded on github (though i suggest to use npm install before start)
npm start - this will start the application which will then be available on Localhost: 3000;

the app contains the functionality of login and logout, for this I have used passport.js and passport local strategy
5 users were added in the database using insert query and around 10-12 rows were present for the uni-detals. I have created different routes and controllers for each 

After login and authentication, user is redirected to the home page which has a header with three buttons 
- ADD
- VIEW 
- LOGOUT

Name of the login user appear on top right side of the screen below the header. Proper directory structure is given in the code I have tried to put comments also. I have handled the request using ajax to avoid the reloading. 
Here how it works

By default Form is visible and when user clicks on the view button,  an ajax call fetches the data from database and construct the table and load it in the HTML, each row contains 11 coloumns as per the instruction with edit and delete functionality. 

When user clicks on the edit, the form becomes visible with all the values pre filled and are changeable except university name because I  have used university name to update the database,
After the update, form is ready to use again with all the fields removed. 
If user wants to have a new form after clicking in edit - he/she should click on view and then on add button - it will render a new form.

Same submit button and same form is used for both the actions (submit and update).

Traverse buttons are added for traversing to next and previous sections in tables. One page contains only 3 rows as per the instructions.

At deletion a popup first confirms the deletion and then delete it from database. After deletion table re-renders.

