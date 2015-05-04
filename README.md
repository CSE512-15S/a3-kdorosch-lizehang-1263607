# a3-kdorosch-lizehang-1263607
===============
## Team Members

1. Kathryn Doroschak kdorosch@uw.edu
2. Zehang Li lizehang@uw.edu
3. Kuangyou Yao kuangyou@uw.edu

## Visualization of students coming to a study center

###The Dataset

The visualization is based on the check-in system of the UW’s late night study center – Center of learning and undergraduates’ enrichment. The center keeps track of each student coming into the center, including their student ID, class standings, subjects to study, gender, check in time and other miscellaneous. 

###Modification
1. Data was initially in Excel spread sheet. We converted it into a MySQL database accompanied with a PHP-powered JSON server.
2. We excluded the less-so-interesting general data, like students coming in for “general purpose” and some false data like a Swedish session, which CLUE doesn’t have. 

## Running Instructions

Access our visualization at http://cse512-15s.github.io/a3-kdorosch-lizehang-kuangyou/richard_test/ or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

If you put your work online, please also write a [one-line description and add a link to your final work](http://note.io/1n3u46s) so people can access it directly from the CSE512-15S page.

## Story Board

Put either your storyboard content or a [link to your storyboard pdf file](storyboard.pdf?raw=true) here. Just like A2, you can use any software to create a *reasonable* pdf storyboard.


### Changes between Storyboard and the Final Implementation

A paragraph explaining changes between the storyboard and the final implementation.


## Development Process

###Kuangyou Yao
	1. PHP/MySQL server which, provides JSON data for the application to visualize.
	2. Implementing the responsive bar plot.

	..I spent like 2 hours migrating the Excel data to a programmable MySQL environment and like 4 hours getting the bar plot to behave correctly. I would say the hardest is actually understand how and why D3 works. I actually found most of the useful infomation at ramdom places on the internet.


Include:
- Breakdown of how the work was split among the group members. 
- A commentary on the development process, including answers to the following questions: 
  - Roughly how much time did you spend developing your application?
  - What aspects took the most time? 

