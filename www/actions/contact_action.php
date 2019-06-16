<?php
 
$code = 0;

if(isset($_POST['theemail'])) {
 
    $email_to = "chenzo@chenzorama.com"; 
    $email_subject = "chenzorama.com form submission";
 

    function died($error) {
        // your error code can go here
        $return['code'] = $error;
        echo json_encode($return);
        die();
    }
 
     
 //hename=123&theemail=123123&comments=123123123
    // validation expected data exists
 
    if(!isset($_POST['theemail']) || !isset($_POST['comments'])) {
        died("0");       
    }
 
     
 
    $thename = $_POST['thename'];
    $theemail = $_POST['theemail']; 
    $comments = $_POST['comments'];
 
    $error_message = "";
 
    /*$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
 
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
 
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
 
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
 
  }
 
  if(!preg_match($string_exp,$last_name)) {
 
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
 
  }
 
  if(strlen($comments) < 2) {
 
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
 
  }*/
 
  if(strlen($error_message) > 0) {
 
    died($error_message);
 
  }
 
    $email_message = "Form details below.\n\n";
 
     
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
    $email_message .= "Name: ".clean_string($thename)."\n"; 
    $email_message .= "Email: ".clean_string($theemail)."\n"; 
    $email_message .= "Comments: ".clean_string($comments)."\n";
 
     
 
     
 
// create email headers
 
$headers = 'From: '.$theemail."\r\n".
 
'Reply-To: '.$theemail."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
@mail($email_to, $email_subject, $email_message, $headers);  
 
  $code = 1;
 
}



$return['code'] = $code;
echo json_encode($return);
 
?>