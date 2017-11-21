/*
Copyright 2017 Vijay s
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

var Paginate = Class.extend({
  options:{
    selector : "#paginate",
    class : "pagination",
    page : 1,
    limit : 20,
    links : 5,
    total : 200,
    url : '/',
  },
  init: function(option){
    $.extend( this.options, option );
    if(this.options.url.includes("?")){
      this.options.url += '&';
    }else{
      this.options.url += '?';
    }
    this.options.url = this.options.url.replace(/[&?]page=[0-9]*/ig, "");
    this.consrtruct();
  },

  consrtruct : function () {
    this.create();
  },

  create : function () {
     var paginateHtml = '<ul class="pagination-list">';
     var noOfPages = Math.ceil(this.options.total / this.options.limit);
     if(noOfPages < this.options.links){
       this.options.links = noOfPages;
     }
     var halfOfLink = Math.floor(this.options.links/2);

     var start = (this.options.page - halfOfLink > 0 ) ? (this.options.page - halfOfLink) : 1;
     var end = ((this.options.page + halfOfLink) < noOfPages ) ? (this.options.page + halfOfLink) : noOfPages;
     if((end-start) != this.options.links){
       if(end == noOfPages){
          start -= (this.options.links - (end-start))-1;
       }
       if(start == 1){
         end += (this.options.links - (end-start))-1;
       }
     }

     if(this.options.page > (halfOfLink + 1) && start!=1){
       paginateHtml += '<a href="'+this.options.url+"page=1"+'"><li class="'+this.options.class+'"> << </li></a> ';
       paginateHtml += '<a href="'+this.options.url+'page='+(this.options.page-1)+'"><li class="'+this.options.class+'"> < </li></a> ';
     }

     for (var i = start; i <= end; i++) {
       if (this.options.page == i) {
         paginateHtml += '<a href="'+this.options.url+'page='+i+'" class="active"><li class="'+this.options.class+'">'+i+'</li></a> ';
       }else{
         paginateHtml += '<a href="'+this.options.url+'page='+i+'"><li class="'+this.options.class+'">'+i+'</li></a> ';
       }
     }

     if((noOfPages - Math.floor(this.options.links/2) ) > this.options.page && end!=noOfPages){
       paginateHtml += '<a href="'+this.options.url+'page='+(this.options.page+1)+'"><li class="'+this.options.class+'"> > </li></a> ';
       paginateHtml += '<a href="'+this.options.url+"page="+noOfPages+'"><li class="'+this.options.class+'"> >> </li></a> ';
     }
     paginateHtml += '</ul>';
     $(this.options.selector).html(paginateHtml);
  }
});
