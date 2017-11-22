<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Paginator</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div id="paginate">

    </div>
  </body>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="js/script.js" charset="utf-8"></script>
  <script type="text/javascript">
  <?php
    if(isset($_GET["page"])){
      $page = $_GET["page"];
    }else{
      $page = 1;
    }
    $url = $_SERVER['REQUEST_URI'];
   ?>
  $(document).ready(function (e) {
    var pageUrl = '<?php echo $url; ?>';
    var pageNo = <?php echo $page; ?>;
      new Paginate({
        selector : "#paginate", //selector of the pagination wrapper
        class : "pagination", //class to be added to the anchor tag
        page : pageNo, //current page number from URI
        limit : 40, //no of results per page
        links : 5, //no of links to be shown (preferably odd number)
        total : 2000, //total number of results
        url : pageUrl, // where the links in pagination to be redirected
        nextPage : 'Next',
        prevPage : 'Prev',
        firstPage : '<<',
        lastPage : '>>',
      });
    });
  </script>
</html>
