# LightningDataTableCoursesPerContact
<img src="https://travis-ci.org/akkibaddi/LightningDataTableCoursesPerContact.svg?branch=master"></img>
<hr>
LightningDataTableCoursesPerContact is based on LightningDataTable in <a href:"https://appexchange.salesforce.com/listingDetail?listingId=a0N3A00000E9TBZUA3">App Exchange</a>. It is a Lightning Component intended for Lightning developers to let them display courses registered by a contact in a table/grid with the following features.<br/>
* Searching<br/>
* Sorting<br/>
* Pagination<br/>
* Selectable rows<br/>
* Table Level Actions<br/>
* Row Level Actions<br/>

Instructions to use this Component:
1) Install <a href="https://developer.salesforce.com/tools/sfdxcli">SalesforceDX</a>
2) Clone this repo
3) sfdx force:auth:web:login -a DevHub(This command is used to login your <a href="https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_enable_devhub.htm">Dev Hub Org</a>)

4) sfdx force:auth:web:login -a TestingSandbox(login to your sand box or dev or where you need to install this app)
Make sure the org that you are deploying this application is enabled with my domain settings
5) Install the <a href:"https://appexchange.salesforce.com/listingDetail?listingId=a0N3A00000E9TBZUA3">App Exchange</a>.

6) sfdx force:mdapi:deploy -d mdapioutput -u FinalTesting -w 5(Deploy the metadataoutput from this repo)

7) Go to profile settings to set the permissions to tabs for courses and coursemanagement tab

8) Set the feile level security for all the fields for course object

9) test the app by creating necessary courses associated to a contact and open the course management tab

