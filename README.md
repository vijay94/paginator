# paginator
A tiny jquery plugin to create smart paginations 

## Version

1.1.1

## License

MIT Licence

### Dependencies
- [jquery.js]
### Basic usage

- JavaScript

```javascript
      new Paginate({
        selector : "#paginate", //selector of the pagination wrapper
        class : "pagination", //class to be added to the anchor tag
        page : pageNo, //current page number from URI
        limit : 40, //no of results per page
        links : 5, //no of links to be shown (preferably odd number)
        total : 1988, //total number of results
        url : pageUrl, // where the links in pagination to be redirected
        nextPage : 'Next', // Text to be in next page link
        prevPage : 'Prev', // Text to be in prev page link
        firstPage : '<<', // Text to be in first page link
        lastPage : '>>', // Text to be in last page link
      });
```


## Contribute

You're more than welcome to contribute to this project. 

The library is written in jquery.

Enjoy!


## Developer

Developed by S. Vijay
