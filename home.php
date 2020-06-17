<!doctype html>
<html lang="en">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-60234062-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-60234062-1');
    </script>



    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Nicolas Toporcov</title>
    <meta property="description" content="My name is Nicolas, but you can call me Nic. I'm a Designer.">
    <meta property="og:title" content="Nic Toporcov Portfolio">
    <meta property="og:description" content="My name is Nicolas, but you can call me Nic. I'm a Designer.">
    <meta property="og:url" content="https://ntoporcov.com">

    <meta property="og:image" content="https://ntoporcov.com/img/meta-cover.png">
    <meta name="image" itemprop="image" content="https://ntoporcov.com/img/meta-cover.png">
    <meta name="thumbnail" itemprop="thumbnailUrl"  content="https://ntoporcov.com/img/meta-cover.png">
    <meta property="twitter:image"  content="https://ntoporcov.com/img/meta-cover.png">

    <link rel="shortcut icon" href="https://ntoporcov.com/img/favicon.ico" type="image/x-icon"/>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/styles.css?version=3" rel="stylesheet">
    <link href="css/svg-with-js.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,700|Montserrat:300,400,700" rel="stylesheet">
</head>

<body>
<ul class="nav align-items-end">
    <li class="nav-item ml-3 d-none d-md-inline">
        <a class="nav-link scrollDown" href="#about" target="_blank">About</a>
    </li>
    <li class="nav-item d-none d-md-inline">
        <a class="nav-link scrollDown" href="#skills" target="_blank">Skills</a>
    </li>
    <li class="nav-item d-none d-md-inline">
        <a class="nav-link scrollDown" href="#experience" target="_blank">Experience</a>
    </li>
    <li class="nav-item d-none d-md-inline">
        <a class="nav-link scrollDown" href="#projects" target="_blank">Projects</a>
    </li>
    <li class="nav-item d-none d-md-inline">
        <a class="nav-link scrollDown" href="#form">Contact</a>
    </li>

    <li class="nav-item ml-auto">
        <a class="nav-link" href="resume.pdf" target="_blank">Resume</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="https://www.dribbble.com/ntoporcov" target="_blank"><i class="fab fa-dribbble"></i></a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="https://www.instagram.com/ntoporcov" target="_blank"><i class="fab fa-instagram"></i></a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="https://www.linkedin.com/in/ntoporcov/" target="_blank"><i class="fab fa-linkedin"></i></a>
    </li>

</ul>



<div class="container-fluid bg-black vh-100" style="position: fixed">
    <div class="row justify-content-center align-items-center vh-100">
        <div class="col">
            <img id="cover" class="img-fluid" src="img/cover.svg" alt="Nicolas Toporcov written in big letters, white on black" onclick="$('#easterEggInput').focus();">
            <p class="white text-center scrollAssistant">Scroll Down or <button class="d-inline-block" id="scrollBtn" href="#">Click Here</button></p>
        </div>
    </div>
</div>
<div style="height:100vh;"></div>

<div class="container-fluid content-container">
    <div class="container">

        <!--   Introduction -->
        <section id="about" class="row xl">
            <div class="col-12 col-sm-4">
                <img class="myphoto img-fluid" src="img/eu.jpg" alt="Photo of Nicolas Toporcov">
            </div>
            <div class="col col-xs-12">
                <h1>You can call me Nic...</h1>
                <p>...or Nick, or Nicolas Toporcov like my wife does when she's mad. <span class="bg-black white padding-3px d-inline-block">&nbsp;I am a designer & developer. &nbsp;</span><br><br>I've been a Graphic Designer for a newspaper and a freelance Graphic Designer, Web Designer and Developer for a few companies. Currently, I am a Front-End Designer and Developer for GleanView, a Sales and Marketing software based in Jacksonville, FL.<br><br>I also own Lunic Visuals with my wife. We provide professional Photography and Videography services for Weddings, Events and Companies in Florida.<br><br> I was born in São Paulo, Brazil in 1992. 20 years later, I started working for this company that helps students go to college here in the United States.<br><br>One college I was always in contact with was the University of North Florida, and once while talking to one of the international students admission officer from UNF, they told me I could come study here on a scholarship. So I did and I graduated in 2016 with a BS in Communication.</p>
            </div>
        </section>

        <!-- Skills  -->
        <div id="skills" class="row lg">
            <div class="col-12">
                <h2 class="">Things I Know</h2>
                <div class="borderBottom-2px-teal"></div>

                <section class="row section-box-2x align-items-center toggleCenter" data-toggle-count="3">
                    <div class="col-12 col-sm-auto d-flex cursor-pointer toggleBox" data-skill-level="basic">
                        <button class="toggle on d-none d-md-block">
                            <div class="knob"></div>
                        </button>
                        <h4 class="toggleLabel">Basic<br>
                            <i class="fas fa-star teal"></i>
                        </h4>
                    </div>
                    <div class="col-12 col-sm-auto d-flex cursor-pointer toggleBox" data-skill-level="intermediate">
                        <button class="toggle on d-none d-md-block">
                            <div class="knob"></div>
                        </button>
                        <h4 class="toggleLabel">Intermediate<br>
                            <i class="fas fa-star teal"></i><i class="fas fa-star teal"></i>
                        </h4>
                    </div>
                    <div class="col-12 col-sm-auto d-flex cursor-pointer toggleBox" data-skill-level="advanced">
                        <button class="toggle on d-none d-md-block">
                            <div class="knob"></div>
                        </button>
                        <h4 class="toggleLabel">Advanced<br>
                            <i class="fas fa-star teal"></i><i class="fas fa-star teal"></i><i class="fas fa-star teal"></i>
                        </h4>
                    </div>
                </section>

                <section class="row section-box-2x align-items-center skillRow">
                    <div class="col-12 col-md-3 col-xl-2">
                        <h4>Languages</h4>
                    </div>
                    <div class="col-12 col-md-9">
                        <div class="row">
                            <div class="col-auto skillBox advanced">
                                <p>English</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>Portuguese</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>Spanish</p>
                                <p class="appendHere"></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="row section-box-2x align-items-center skillRow">
                    <div class="col-12 col-md-3 col-xl-2">
                        <h4>Design</h4>
                    </div>
                    <div class="col-12 col-md-9 col-xl-10">
                        <div class="row">
                            <div class="col-auto skillBox advanced">
                                <p>Photoshop</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>Illustrator</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>InDesign</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>Branding</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>Product UI</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>Adobe XD</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>After Effects</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>Premiere</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>InVision Studio</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>Product UX</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>Animate CC</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>InVision App</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>Sketch</p>
                                <p class="appendHere"></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="row section-box-2x align-items-center skillRow">
                    <div class="col-12 col-md-3 col-xl-2">
                        <h4>Web Design & Development</h4>
                    </div>
                    <div class="col-12 col-md-9 col-xl-10">
                        <div class="row">
                            <div class="col-auto skillBox basic">
                                <p>ReactJS</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>React Native</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>Vanilla JS</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>JQuery</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>PHP</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>HTML5</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>CSS</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>WordPress</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>Git</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>InVision Studio</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>Sketch</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>InVision App</p>
                                <p class="appendHere"></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="row section-box-2x align-items-center skillRow">
                    <div class="col-12 col-md-3 col-xl-2">
                        <h4>Miscellaneous</h4>
                    </div>
                    <div class="col-12 col-md-9 col-xl-10">
                        <div class="row">
                            <div class="col-auto skillBox advanced">
                                <p>Photography</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox advanced">
                                <p>Videography</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox intermediate">
                                <p>Animation</p>
                                <p class="appendHere"></p>
                            </div>
                            <div class="col-auto skillBox basic">
                                <p>3D Design</p>
                                <p class="appendHere"></p>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="row skillText d-none">
                    <div class="col-12">
                        <h4>Making me look bad over here...</h4>
                    </div>
                </div>

            </div>
        </div>

        <!-- Work Experience  -->
        <div id="experience" class="row lg">
            <div class="col-12">
                <h2 class="">Places I Worked</h2>
                <div class="borderBottom-2px-teal"></div>

                <section class="row section-box-2x">
                    <div class="col-7 col-md-4 col-lg-3">
                        <img class="img-fluid" src="img/TDS-Logo-DarkerText.png" alt="TDS Logo">
                    </div><div class="w-100 d-md-none"></div>
                    <div class="col-12 col-md-8 col-lg-9">
                        <h3 class="d-none d-md-block">TDS | Transcor Data Services</h3>
                        <p>October 2019 – Now</p>
                        <i>UI/UX Designer</i>
                        <p class="section-box">TDS is the leading ground transportation technology provider. At TDS I'm in charge of designing the experience and UI for applications ranging from browser-based webstores to native mobile applications, self-service checkout and several different POS's.</p>
                    </div>
                </section>

                <section class="row section-box-2x">
                    <div class="col-7 col-md-4 col-lg-3 section-box">
                        <img class="img-fluid" src="img/LunicBlack.svg" alt="GleanView Logo">
                    </div><div class="w-100 d-md-none"></div>
                    <div class="col-12 col-md-8 col-lg-9">
                        <h3 class="d-none d-md-block">Lunic Visuals</h3>
                        <p>January 2017 – Now</p>
                        <i>Co-Owner</i>
                        <p class="section-box">Lunic is a company I started with my wife to offer Photography and Videography. We’ve been doing mostly engagement photoshoots and wedding photography and videography. I also designed and developed our website in wordpress.</p>
                    </div>
                </section>

                <section class="row section-box-2x">
                    <div class="col-7 col-md-4 col-lg-3">
                        <img class="img-fluid" src="img/GV_Logo_Blue.svg" alt="GleanView Logo">
                    </div><div class="w-100 d-md-none"></div>
                    <div class="col-12 col-md-8 col-lg-9">
                        <h3 class="d-none d-md-block">GleanView</h3>
                        <p>August 2017 – October 2019</p>
                        <i>Front End Designer and Marketing Designer/Developer</i>
                        <p class="section-box">GleanView is where I started learning about web development and product design from scratch. I’ve been responsible for the entire website and landing pages design and development, all google display ads design, company blog design and setup in wordpress and more recently product design for the software itself.</p>
                    </div>
                </section>

                <section class="row section-box-2x">
                    <div class="col-7 col-md-4 col-lg-3 section-box">
                        <img class="img-fluid" src="img/jbj.jpg" alt="GleanView Logo">
                    </div><div class="w-100 d-md-none"></div>
                    <div class="col-12 col-md-8 col-lg-9 section-box">
                        <h3 class="d-none d-md-block">Jacksonville Business Journal</h3>
                        <p>February 2016 – July 2017</p>
                        <i>Graphic Designer</i>
                        <p class="section-box">The Jacksonville Business Journal was my first full-time employment where I was responsible for design. I was responsible for designing, placing and managing ads being sold for the weekly newspaper as well as the annual Book of Lists. While working at the JBJ I learned a lot about Design in itself, specially how to deal with deadlines and handling super short notices.</p>
                    </div>
                </section>
            </div>
        </div>

        <!-- Projects  -->
        <div id="projects" class="row lg">
            <div class="col-12">
                <h2 class="">Things I Created</h2>
                <div class="borderBottom-2px-teal"></div>

                <!-- Streamutt iOS -->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project98" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>Streamutt Apps</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox">
                                    React Native
                            </span>
                            <span class="col-auto skillBox">
                                    React Navigation
                            </span>
                        </div>
                        <div class="col-12 section-box projectContent section-box collapse show" id="project98">
                            <div class="row">
                                <div class="col-6 col-sm-3 section-box">
                                    <img class="img-fluid" src="img/streamuttios1.jpg" alt="Streamutt on iOS During Search">
                                </div>
                                <div class="col-6 col-sm-3 section-box">
                                    <img class="img-fluid" src="img/streamuttios2.jpg" alt="Streamutt on iOS showing Movie">
                                </div>
                                <div class="col-12 col-sm-6 section-box">
                                    <p>After I finished <a href="https://streamutt.com">streamutt.com</a>, my next goal with that idea was to bring all of the infrastructure I had created to an app.
                                        After all, that was a major reason I chose to build the web app with react.
                                        <br><br>
                                        Porting the current functionality from the web app to a react native app took about a week,
                                        and adding some extra functionality took an extra week. The native app allows users to save all of their favorite movies for easy access and I also added a dark mode.
                                        <br><br>
                                        It's now available on the iOS App Store and the Google Play Store.
                                    </p>
                                    <div style="display: flex">
                                        <a href="https://apps.apple.com/us/app/streamutt/id1475317889" target="_blank">
                                            <img style="margin-top: 10px" class="img-fluid cursor-pointer" src="img/iosDownload.svg" alt="link for app page on app store">
                                        </a>
                                        <a href='https://play.google.com/store/apps/details?id=com.streamuttapp&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                            <img style="max-height: 60px" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- streamutt.com -->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project99" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>streamutt.com</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox">
                                    ReactJS
                            </span>
                            <span class="col-auto skillBox">
                                    Node.JS
                            </span>
                        </div>
                        <div class="col-12 section-box projectContent section-box collapse show" id="project99">
                            <div class="row">
                                <div class="col-12 col-sm-5 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/streamutt-cover.jpg" alt="streamutt cover">
                                </div>
                                <div class="col-12 col-sm-7 section-box">
                                    <p>When I came up with this idea of a website where I would be able to find out where to watch things,
                                        it seemed perfect for React. It's a one page app, running after page load, so no PHP, with tons of AJAX calls to external APIs.
                                        <br><br>
                                        The website uses 4 different APIs and matches some data between them to show search results for records (movies or shows), then when the user clicks a
                                        record, I request that record's IMDB ID, then with that I request other APIs for links to that record and for netflix availability.
                                        <br><br>
                                        <a href="https://streamutt.com" target="_blank">Click Here</a> to check it out.
                                    </p>
                                </div>


                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/streamutt-1.jpg" alt="streamutt.com star wars">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/streamutt-2.jpg" alt="streamutt.com breaking bad">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/streamutt-3.jpg" alt="streamutt.com avengers">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- artrepublicglobal.com -->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project9" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>artrepublicglobal.com</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox">
                                    HTML
                            </span>
                            <span class="col-auto skillBox">
                                    CSS
                            </span>
                            <span class="col-auto skillBox">
                                    Javascript
                            </span>
                            <span class="col-auto skillBox">
                                    PHP
                            </span>
                        </div>
                        <div class="col-12 section-box projectContent section-box collapse show" id="project9">
                            <div class="row">
                                <div class="col-12 col-sm-5 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/ar-cover-pichi.jpg" alt="signinpage.com cover">
                                </div>
                                <div class="col-12 col-sm-7 section-box">
                                    <p>ArtRepublic, a local art organization of Jacksonville chose me to redesign their entire website. They really wanted a fluid experience between artists' videos with parallax effects. I created the website using Bootstrap, JQuery, Animate.css and Jarallax JS libary for parallax effects.<br><br>
                                        Since the website has lots of video, I had to plan several forms of optimization to keep loading times low. The bulk of the optimizations is having different videos for mobile and for desktop experiences. The videos for mobile were re-exported in lower resolutions with a little more compression and lower bitrate. I, then, used PHP to identify the browser agent to load the appropriate videos.
                                        <br><br>
                                        <a href="https://artrepublicglobal.com" target="_blank">Click Here</a> to check it out.
                                    </p>
                                </div>


                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/ar-maxim.jpg" alt="signinpaper.com theme page">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/ar-reo.jpg" alt="signinpaper.com setup page">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/ar-light.jpg" alt="signinpaper.com admin page">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- signinpaper.com -->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project5" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>signinpaper.com</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox">
                                    JQuery
                                </span>
                            <span class="col-auto skillBox">
                                    HTML
                                </span>
                            <span class="col-auto skillBox">
                                    CSS
                                </span>
                        </div>
                        <div class="col-12 section-box projectContent section-box collapse show" id="project5">
                            <div class="row">
                                <div class="col-12 col-sm-5 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/signinpaper1.jpg" alt="signinpage.com cover">
                                </div>
                                <div class="col-12 col-sm-7 section-box">
                                    <p>For a couple years in college I was the president of the International Students Association. Whenever we held an event, we would have a sign-in sheet that every atendee needed to write their name on. After the event I would need to type all of the names into a spreadsheet.<br><br>
                                        So I created a web app that allows users to setup their own Sign-In form for event guests. The app also has an admin mode that can be password protected. The admin mode shows the number of registrations and a table with every registration recorded. It also allows users to download a CSV of all registrations.<br><br>

                                        The app stores all information locally, which means it works without any internet connection after the page is loaded.<br><br>

                                        <a href="https://signinpaper.com" target="_blank">Click Here</a> to try it.
                                    </p>
                                </div>


                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/signinpaper2.jpg" alt="signinpaper.com theme page">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/signinpaper3.jpg" alt="signinpaper.com setup page">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/signinpaper4.jpg" alt="signinpaper.com admin page">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Interactive Resume -->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project5" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>Interactive Resume</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox">
                                    JQuery
                                </span>
                            <span class="col-auto skillBox">
                                    HTML + CSS
                                </span>
                            <span class="col-auto skillBox">
                                    PHP
                                </span>
                        </div>
                        <div class="col-12 section-box projectContent section-box collapse show" id="project5">
                            <div class="row">
                                <div class="col-12 col-sm-4 section-box">
                                    <p>When I was a kid, programming was something that my father did by typing text into a black screen. 20 years later I found out that he was working in some sort of unix terminal. Now that I know a little bit more
                                        about using terminal and servers at least, I had this idea of setting up a terminal-like page as an interactive resume. You can use it right here.<br><br>
                                        Just click on it and you can start playing with it :D
                                    </p>
                                </div>

                                <div class="col-12 col-sm section-box">
                                    <iframe width="100%" height="100%" style="border:none;box-shadow:0 5px 10px rgba(0,0,0,.3)" src="/terminal"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Lunic Photo Delivery System -->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project1" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>Lunic Visuals Delivery System</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox">
                                    PHP
                                </span>
                            <span class="col-auto skillBox">
                                    JQuery
                                </span>
                            <span class="col-auto skillBox">
                                    HTML + CSS
                                </span>
                        </div>
                        <div class="col-12 section-box projectContent section-box collapse show" id="project1">
                            <div class="row">
                                <div class="col-12 col-sm-5 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/lunicPassword.jpg" alt="Lunic Project Password Screen">
                                </div>
                                <div class="col-12 col-sm-7 section-box">
                                    <p>I was never too happy with delivering photos to Lunic's clients by just sending them a Google Drive link, so I took on a task to create my own delivery system from scratch.<br><br>
                                        The first thing I needed to plan for this project was its minimum requirements so that it would make sense to spend time developing it. This new system needed to be as easy to use and update as Google Drive, it needed to look better than Google Drive, and needed to be as secure as Google Drive.
                                    </p>
                                </div>
                            </div>

                            <div class="row section-box">
                                <div class="col-12 col-md-6 section-box">
                                    <h4 class="text-center padding-10px">The Process I Built</h4>
                                    <div class="col-12 ProcessBox">
                                        <p class="padding-3px"><strong>1.</strong> Sends Password entered to handler file by an HTTP POST request</p>
                                    </div>
                                    <div class="col-12 ProcessBox">
                                        <p class="padding-3px"><strong>2.</strong> Handler file checks if password exists, and if it does, it returns that photoshoot's directory</p>
                                    </div>
                                    <div class="col-12 ProcessBox">
                                        <p class="padding-3px"><strong>3.</strong> If password page receives a directory from handler file, it then sends such directory to delivery.php which uses it to populate the entire page with the right photos, sections and files.The bulk of the process is done by using a few glob and each functions.<br><br>The delivery file traverses the directory received and fills the screen based on it. All I do is just organize the directory the following way and upload it to the server.</p><br>
                                        <ul>
                                            <li><strong>Directory's Name</strong> becomes delivery page H1</li>
                                            <ul>
                                                <li><strong>cover.jpg</strong> becomes page's cover background-image</li>
                                                <li><strong>allphotos.zip</strong> is available for user to download all photos at once easily</li><br>
                                                <li><strong>Folder 00-</strong></li>
                                                <ul>
                                                    <li>Hi-Res Files for all sections are stored here for preview and individual downloads</li>
                                                </ul>

                                                <li>
                                                    <strong>Folder 01-Section Name</strong> and forward are used to create sections across the page
                                                </li>
                                                <ul>
                                                    <li>Respective section's thumbnail photos are stored here</li>
                                                </ul>

                                                <li>
                                                    <strong>Folder 02-Section Name</strong>
                                                </li>
                                                <ul>
                                                    <li>Respective section's thumbnail photos are stored here</li>
                                                </ul>

                                                ...
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 section-box">
                                    <h4 class="text-center padding-10px">The End-Result</h4>
                                    <img class="img-fluid shadow-down-light" src="img/lunicPassword2.jpg" alt="Screenshot of Lunic Delivery System">
                                </div>

                                <div class="col-12 text-left">
                                    <button class="bottomCollapse cursor-pointer" data-toggle="collapse" data-target="#project1" role="button"><i class="fas fa-chevron-circle-up" ></i>&nbsp;Close Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ArtRepublic Portfolio-->
                <section>
                    <div class="row section-box align-items-center projectExpand">
                        <div class="col-2 col-md-auto cursor-pointer">
                            <button data-toggle="collapse" data-target="#project4" role="button"><i class="fas fa-chevron-circle-up fa-2x d-inline-block"></i></button>
                        </div>
                        <div class="col-10 col-md-auto section-box cursor-pointer projectTitle">
                            <h3>ArtRepublic Portfolio</h3>
                        </div>
                        <div class="col-12 col-md-auto cursor-pointer projectTitle">
                            <span class="col-auto skillBox intermediate">
                                    Print Design
                                </span>
                            <span class="col-auto skillBox intermediate">
                                    InDesign
                                </span>
                        </div>

                        <div class="col-12 projectContent section-box collapse show" id="project4">
                            <div class="row">
                                <div class="col-12 col-sm-7 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/cover.jpg" alt="ArtRepublic's Portfolio Cover">
                                </div>
                                <div class="col-12 col-sm-5 section-box">
                                    <p>ArtRepublic has been a somewhat constant client of mine and this was the biggest project I did with them. If you are not familiar with their work, they are a non profit that brings in international artists to paint murals and hold art exhibitions in Jacksonville, FL.<br><br>They came to me with this project with the goal of having an overarching portfolio showcasing the murals, events and art exhibits they held in 2016 and 2017. The goal was to have it look close to a magazine but more luxurious.
                                    </p>
                                </div>

                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/okuda.jpg" alt="ArtRepublic's Okuda Pages">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/miguel.jpg" alt="ArtRepublic's Miguel Pages">
                                </div>
                                <div class="col-12 col-sm-4 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/bisco1.jpg" alt="ArtRepublic's Bisco Pages">
                                </div>
                                <div class="col-12 col-sm-6 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/bisco2.jpg" alt="ArtRepublic's Bisco Pages 2">
                                </div>
                                <div class="col-12 col-sm-6 section-box">
                                    <img class="img-fluid shadow-down-light" src="img/patronage.jpg" alt="ArtRepublic's Patronage Pages">
                                </div>

                                <div class="col-12 text-left">
                                    <button class="bottomCollapse cursor-pointer" data-toggle="collapse" data-target="#project4" role="button"><i class="fas fa-chevron-circle-up" ></i>&nbsp;Close Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>

    </div>
</div>


<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/scripts.js?version=4"></script>
<script defer src="js/all.js"></script>
</body>

<form id="easterEggAudio" autocomplete="off" style="position:absolute;top: -200px;" onsubmit="event.preventDefault();if($('#easterEggInput').val()==='boamenina'){$('#boamenina').trigger('play')}">
    <input title="easterEggInput" autocomplete="off" id="easterEggInput" type="text">
    <input title="easterEggSubmit" type="submit">
</form>
<audio id="boamenina">
    <source src="boamenina.mp3" type="audio/mpeg">
</audio>

</html>
