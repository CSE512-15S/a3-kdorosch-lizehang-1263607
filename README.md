# a3-kdorosch-lizehang-1263607
===============
## Team Members

1. Kathryn Doroschak kdorosch@uw.edu
2. Zehang Li lizehang@uw.edu
3. Kuangyou Yao kuangyou@uw.edu

## Visualization of students coming to a study center

####The Dataset

The visualization is based on the check-in system of the UW’s late night study center – Center of learning and undergraduates’ enrichment. The center keeps track of each student coming into the center, including their student ID, class standings, subjects to study, gender, check in time and other miscellaneous. 

####Modification
1. Data was initially in Excel spread sheet. We converted it into a MySQL database accompanied with a PHP-powered JSON server.
2. We excluded the less-so-interesting general data, like students coming in for “general purpose” and some false data like a Swedish session, which CLUE doesn’t have. 

## Running Instructions

Access our visualization at http://cse512-15s.github.io/a3-kdorosch-lizehang-kuangyou/richard_test/ or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

If you put your work online, please also write a [one-line description and add a link to your final work](http://note.io/1n3u46s) so people can access it directly from the CSE512-15S page.

## Story Board

[Story board file](http://i.imgur.com/ANOkMvr.jpg)

Initially, we intended to use two bar plots to represent this data. The first (lefthand side) would split the data based on a given dimension, with the total number of visits associated with that dimension shown on the y-axis. Each bar of this plot would be clickable with an interface that pops up and allows the user to select a second dimension on which to further split that bar. This would enable a deeper view of the data.

However, we felt that this was not a good match for our dataset as it completely ignored the valuable temporal data that we had. Additionally, the “deeper view” with the multiple levels of splitting did not reveal that interesting of information. Instead, we chose a stacked line plot to represent this data, which could be brushed to select different periods of time. This is far more interesting and reveals patterns within and between academic quarters. The right plot would then show the total counts for the selected time period using the same dimension as on the left. We decided this before implementing and so are including it as part of the storyboard.

We feel the stacked line plot is a good choice of a technique for our dataset as it captures the temporal aspects to reveal interesting patterns but also allows for comparison between different categories within each dimension. Our dataset is also dominated by dimensions rather than measures, which in this case makes it even simpler and more visually helpful to use the same visualization techniques for the majority of the dataset. These encodings are also overlapping, with different terms being used to describe the same datapoints in multiple ways.



### Changes between Storyboard and the Final Implementation

* Two categories in the "subject" dimension were dominating the dataset and not providing very much information about the distribution of visits to the center. These categories were "Anything Goes" and "Commuter Commons." The latter is an open session for any subject and somewhat separate of the main CLUE resources, so we chose to omit these categories.

* Displaying the categories alphabetically was producing somewhat of a false gradient in the visualization. We chose to instead group the categories roughly by subject, i.e. languages and STEM, so these categories could be visually grouped by the eye quite naturally and be easier to compare as a whole.

* Adding more 


## Development Process

#####Katie

#####Zehang

#####Kuangyou Yao
- PHP/MySQL server that, provides JSON data for the application to visualize.
- Implementing the responsive bar plot.

- I spent like 2.5 hours migrating the Excel data to a programmable MySQL environment and like 4 hours getting the bar plot to behave correctly. I would say the hardest is actually understand how and why D3 works. I actually found most of the useful infomation at ramdom places on the internet.


Include:
- Breakdown of how the work was split among the group members. 
- A commentary on the development process, including answers to the following questions: 
  - Roughly how much time did you spend developing your application?
  - What aspects took the most time? 

