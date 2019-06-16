<?php
//session_start(); //No need for a session currently?

//buildToggle gets replaced via gulp prepbuild/prepdev commands - can be manually adjusted if required.
$buildToggle = FALSE;

//Updates automatically via the gulp prepbuild command - dont touch. It should look like this: $cacheBusterNumber="1492994906782";
$cacheBusterNumber="1492994906782";
//Don't mess with the cacheBuster Above


//Base64 blank image src:
$blankImageSRC = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
$blackImageSRC = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";


//set params from URL - ie. /pagename/param1/param2 <-- set in the .htaccess file.
$param1 = isset($_GET['param1']) ? $_GET['param1'] : "";
$param2 = isset($_GET['param2']) ? $_GET['param2'] : "";
$param3 = isset($_GET['param3']) ? $_GET['param3'] : "";
$param4 = isset($_GET['param4']) ? $_GET['param4'] : "";

$pageName = basename($_SERVER['PHP_SELF']);

if ($pageName == "privacy.php") {
	//$privacy_data = getPageData("privacy");
} 


?>