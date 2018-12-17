<?php header('HTTP/1.0 503 Service Unavailable'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="JEDI is a thriving Star Wars role-playing community offering a complete Jedi curriculum to its members, in an immersive universe set after 250 ABY." />
<title>JEDI HoloNet</title>
<link rel="stylesheet" href="//static.jediholo.net/css/maintenance.css" type="text/css" />
<script src="//static.jediholo.net/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script type="text/javascript">
// <![CDATA[
jQuery(document).ready(function() {
    jQuery('#about').hide();
    jQuery('#aboutToggle').click(function(e) {
        e.preventDefault();
        jQuery('#status').slideUp();
        jQuery('#about').slideDown();
    });
    jQuery('#statusToggle').click(function(e) {
        e.preventDefault();
        jQuery('#status').slideDown();
        jQuery('#about').slideUp();
    });
});
// ]]>
</script>
<!--[if lt IE 7]>
<link rel="stylesheet" href="//static.jediholo.net/css/ie6.css" type="text/css" />
<script src="//static.jediholo.net/js/IE9.js" type="text/javascript">IE7_PNG_SUFFIX='.png';</script>
<![endif]-->
<!--[if lt IE 9]>
<script src="//static.jediholo.net/js/DD_roundies_0.0.2a-min.js" type="text/javascript"></script>
<![endif]-->
</head>

<body>
<div id="mainContainer">

<!-- Main frame -->
<div id="contentContainer">

  <!-- Content frame -->
  <div id="contentFrameTop">
    <div id="contentFrameTopLeft"></div>
    <div id="contentFrameTopSpacer"></div>
    <div id="contentFrameTopRight"></div>
  </div>
  <div id="contentFrameCornerTopLeft"></div>
  <div id="contentFrameCornerTopRight"></div>
  <div id="contentFrameLeft">
    <div id="contentFrameLeftTop"></div>
    <div id="contentFrameLeftSpacer"></div>
    <div id="contentFrameLeftBottom"></div>
  </div>
  <div id="contentFrameRight">
    <div id="contentFrameRightTop"></div>
    <div id="contentFrameRightSpacer"></div>
    <div id="contentFrameRightBottom"></div>
  </div>
  <div id="contentFrameCornerBottomLeft"></div>
  <div id="contentFrameCornerBottomRight"></div>
  <div id="contentFrameBottom">
    <div id="contentFrameBottomLeft"></div>
    <div id="contentFrameBottomSpacer"></div>
    <div id="contentFrameBottomRight"></div>
  </div>

  <!-- Actual content -->
  <div id="content">

    <!-- Logo -->
    <p style="text-align: center;"><img id="logo" src="//static.jediholo.net/img/logo_unavailable.png" alt="JEDI HoloNet Unavailable" title="JEDI HoloNet Unavailable" /></p>

    <!-- General maintenance information -->
    <div class="box">
      <p style="text-align: center;"><strong>The JEDI HoloNet is currently under maintenance.<br />
      The page you requested is not available.</strong></p>

      <p style="text-align: center;">Depending on the tasks at hand, other parts of the site might be unavailable.<br />
      You may try accessing the <a href="//www.jediholo.net" title="www.jediholo.net">home page</a> or the <a href="//comport.jediholo.net" title="comport.jediholo.net">forums</a> instead.</p>

      <p style="text-align: center;">We apologize for the inconvenience. Please try again later and thank you for your patience.</p>

      <!--
      <p style="text-align: center;"><strong>The JEDI HoloNet maintenance is now over.</strong></p>

      <p style="text-align: center;"><strong>All Web-based services (HoloNet, Comport, RPMod Accounts, file downloads) are available again.</strong></p>
      -->
    </div>

    <!-- Detailed information -->
    <p class="nav">
      <a href="#about" id="aboutToggle">About JEDI</a> |
      <a href="#status" id="statusToggle">Status updates</a>
    </p>
    <div id="about" class="box">
      <h4>About JEDI</h4>
      <p>The <strong>JEDI Temple</strong> is a place of <strong>learning</strong> and <strong>peace</strong> that aims to recreate an <strong>immersing Jedi role-playing experience</strong> in the Star Wars universe, from the Jedi Initiates discovering their Force-sensitivity and the constantly learning Padawan Learners, to the Jedi Knights and Jedi Masters studying the deeper mysteries of the Force.</p>
      <p>JEDI mainly uses the <strong>Star Wars: Jedi Knight Jedi Academy</strong> (JKA) game along with its own <strong>RPMod</strong> modification to provide an unique role-playing experience to its members and guests. The main server is called the <strong>JEDI Temple</strong> and is where continuous, strict role-playing occurs. The following servers are available:</p>
      <ul>
        <li><strong>JEDI Temple:</strong> temple.jediholo.net:29070</li>
        <li><strong>JEDI Grounds</strong> grounds.jediholo.net:29071</li>
        <li><strong>JEDI Galaxy:</strong> galaxy.jediholo.net:29073</li>
      </ul>
    </div>
    <div id="status" class="box">
      <h4>Status updates</h4>
      <ul>
        <li>
          <p><strong>yyyy-MM-dd @ HH:mm UTC</strong></p>
          <p>No additional information is available.</p>
        </li>
      </ul>
    </div>

  </div>

</div>

</div>
</body>

</html>