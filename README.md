# SolarSystemManager

![Solar System Manager](public/assets/img/demoSSM.gif)

Welcome to Solar System Manager V1! 
SSM is a web app with several planets in orbit.


To edit a planet's name or color, you can click on any of the ones provided. To add a new planet, click the "Insert new planet" button & fill in all fields.

You may also delete planets once you click on them and click "delete". 

----

## Getting Started

* You must have an internet connection to load several scripts in the program! However, you may convert it to offline-mode by changing the references of JQuery and MomentJS to the ones in the public > assets > JS folder.

All files are necessary to be downloaded in order for the program to work. 

The program also uses a MySQL Database:
* Online: JawsDB MySQL

* Offline: MySQL DB 

----

### Prerequisites 

* You must install NodeJS for the server to run.

* The app uses Express to host the webpage (Set to process.env.PORT, or default 3000).

* You must install MySQL and change the credentials to be used in the config dir > connection.js. 


  Once these are installed, your app is ready to be initialized.

----

### Installing & Deployment

In order to setup the database, you must run the code within the Schema.sql and Seeds.sql, provided in the "db" directory.

You must also install all dependencies through Node's package manager. The package.json file is provided to you for easy installation, run the command: `npm i`


Once all dependencies are installed, your app is ready to be launched! To launch, run: `node server.js`


## Built With

* JQuery
* MySQL (JAWS DB)
* MomentJS
* HTML5 (Modals and planet alignments)

## Authors

* **Esar Behlum** 

## Acknowledgments

* Inspired by Sajjan Sarkar's CodePen: http://jsfiddle.net/sajjansarkar/zgcgq8cg/

## Future Goals

* DRY up code and use one modal for all planets / confirmations.

* Add picture compatibility to the planets for customization

* Make tooltip thinner, make text-colors pop out

* Add moment.js dynamic updating DateTime to each planet's tooltips

* Convert App to a Three.JS App for 3-Dimensional Effect
