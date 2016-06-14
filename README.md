# Pics order

Small app in order to display pics & make possible for your customer to order the pics of his choice (and for each one, the number of copies).

For a small amount of pics only : all the pics are shown on a single page.

Fits well for example for wedding pics ordering webpages.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Installation

* Apply the mse-ddl.sql file to your SQL backend
* Edit app/php/order.php in order to set the user/passwd of your database
* Edit index.html to link to your Analytics account
* Put pics in a subfolder of app/images + generate-thumbs (change value of PICS_FOLDER before)
* Edit app.js and change the value of PICS_FILENAMES_HERE in order to list exhaustively the pics to show
