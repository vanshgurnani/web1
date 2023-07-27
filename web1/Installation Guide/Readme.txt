E-commerce Site (Project Run Guide):

1. Setting Up Databases
Download XAMPP Control Panel v3.3.0.
*(It is to access and manipulate databases in localhost server)
Open it then Install Apache and MySQL Modules.
Starting the Modules
Open the MySQL Admin

Now Go to Import Section and import the SQLs files available in ./InstallationGuide/SQLfiles

Hence, Successfully setup the databases.

(Alternative): If you use MySQL Workbench or others, you can execute the SQL Query taking from the each SQL Files

2. Running the Project

i. Running frontend
 -> Go to web1/frontend directory
 -> Run command "npm install"
 -> Run command "npm start"
 -> Now, Frontend should start running on a domain.
ii. Running backend
 -> Go to web1/backend directory
 -> Run command "myproject\Scripts\activate.bat"
 -> python app.py
 -> Backend server should start running on a domain.

*Make sure both frontend and the backend are concurrently running.

