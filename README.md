# a3-kdorosch-lizehang-Kuangyou
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

## Story Board

[Story board file](http://i.imgur.com/ANOkMvr.jpg)

Initially, we intended to use two bar plots to represent this data. The first (lefthand side) would split the data based on a given dimension, with the total number of visits associated with that dimension shown on the y-axis. Each bar of this plot would be clickable with an interface that pops up and allows the user to select a second dimension on which to further split that bar. This would enable a deeper view of the data.

However, we felt that this was not a good match for our dataset as it completely ignored the valuable temporal data that we had. Additionally, the “deeper view” with the multiple levels of splitting did not reveal that interesting of information. Instead, we chose a stacked line plot to represent this data, which could be brushed to select different periods of time. This is far more interesting and reveals patterns within and between academic quarters. The right plot would then show the total counts for the selected time period using the same dimension as on the left. We decided this before implementing and so are including it as part of the storyboard.

We feel the stacked line plot is a good choice of a technique for our dataset as it captures the temporal aspects to reveal interesting patterns but also allows for comparison between different categories within each dimension. Our dataset is also dominated by dimensions rather than measures, which in this case makes it even simpler and more visually helpful to use the same visualization techniques for the majority of the dataset. These encodings are also overlapping, with different terms being used to describe the same data points in multiple ways.

The plot on the righthand side eases the ability to see counts and make comparisons between different categories. The colors are consistent with the left plot for quick lookup in the left plot and legend. This plot uses a length encoding to display information in a quick, accessible manner.



### Changes between Storyboard and the Final Implementation

* **Removed uninformative data. --** Two categories in the "subject" dimension were dominating the dataset and not providing very much information about the distribution of visits to the center. These categories were "Anything Goes" and "Commuter Commons." The latter is an open session for any subject and somewhat separate of the main CLUE resources, so we chose to omit these categories.

* **Changed the ordering of the "subject" category. --** Displaying the categories alphabetically was producing somewhat of a false gradient in the visualization. We chose to instead group the categories roughly by subject, i.e. languages and STEM, so these categories could be visually grouped by the eye quite naturally and be easier to compare as a whole.

* **Changed the right plot's axis from fixed to variable. --** Because the brushing can change the range of dates and therefore the total visit count so much, we felt we needed to adjust the y-axis every time this was updated. Although this could potentially be misleading compared to a fixed axis, we felt scaling this was important as the small values got lost and a log plot lost the valuable length comparison. 

* **Unexpected changes to binning of dates. --**  The dates in our original data set are accurate down to the minute that the student checked in to the CLUE center. We quickly discovered that even if this was binned into days or hours, the trends overall were lost due to spikes in the dataset. Smaller bands were entirely lost and it was extremely difficult to read once more than a week or so was in view. To combat this, we made the view such that data is binned by weeks at a broader zoom level and binned by days at closer zoom levels.

## Development Process

#####Katie

#####Zehang
- Implementing the stacked area plot and brush. 

- I spent about 10 hours on the first pass of the project framework, including setting up different scripts for each plots and the methods for the functions to communicate with each other, i.e., let other plots update itself with the time range selected in brush. I spent about another 10 hours on finalizing the visual effects of the two plots, including the color, position, axis, automatic scale change, etc. The most time consuming part for me is to figure out the syntax and flow of js scripts.

 

#####Kuangyou Yao
- PHP/MySQL server that, provides JSON data for the application to visualize.
- Implementing the responsive bar plot.

- I spent like 2.5 hours migrating the Excel data to a programmable MySQL environment and like 4 hours getting the bar plot to behave correctly. I would say the hardest is actually understand how and why D3 works. I actually found most of the useful information at random places on the internet.


Include:
- Breakdown of how the work was split among the group members. 
- A commentary on the development process, including answers to the following questions: 
  - Roughly how much time did you spend developing your application?
  - What aspects took the most time? 

