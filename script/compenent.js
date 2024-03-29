const layout=`
<div class="main">
    <header> 
        <div class="logosec"> 
            <div class="logo"></div> 
            <img src= 
        "https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
                class="icn menuicn"
                id="menuicn"
                alt="menu-icon"> 
        </div> 

        <div class="searchbar"> 
            <input type="text"
                placeholder="Search"> 
            <div class="searchbtn"> 
            <img src= 
        "https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                    class="icn srchicn"
                    alt="search-icon"> 
            </div> 
        </div> 

        <div class="message"> 
            <div class="circle"></div> 
            <img src= 
        "https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
                class="icn"
                alt=""> 
            <div class="dp"> 
            <img src= 
        "https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                    class="dpicn"
                    alt="dp"> 
            </div> 
        </div> 

    </header> 

    <div class="main-container"> 
    <div class="navcontainer"> 
        <nav class="nav"> 
            <div class="nav-upper-options"> 
                <div class="nav-option option1"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                        class="nav-img"
                        alt="dashboard"> 
                    <h3> Dashboard</h3> 
                </div> 



                <div class="nav-option option2"> 
                    <img src= 
                        "../img/technical.svg"
                        class="nav-img"
                        alt="Skills"> 
                    <h3> Skills</h3> 
                </div> 

                <div class="nav-option option3"> 
                    <img src= 
                        "../img/successor_project.svg"
                        class="nav-img"
                        alt="Valid_project"> 
                    <h3> Valid Projects</h3> 
                </div> 

                <div class="nav-option logout"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                        class="nav-img"
                        alt="logout"> 
                    <h3>Logout</h3> 
                </div> 

            </div> 
        </nav> 
    </div> 
    <div class="main"> 

        <div class="searchbar2"> 
            <input type="text"
                name=""
                id=""
                placeholder="Search"> 
            <div class="searchbtn"> 
            <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                    class="icn srchicn"
                    alt="search-button"> 
            </div> 
        </div> 

        <div class="box-container"> 

            <div class="box box1"> 
                <div class="text"> 
                    <h2 class="topic-heading campus"></h2> 
                    <h2 class="topic zone">zone01 </h2> 
                    <h3 class="topicml mail"> </h3> 
                </div> 

                <img src= 
                "../img/campus.svg"
                    alt="campus"
                    class="campusSvg"> 
            </div> 

            <div class="box box2"> 
                <div class="text"> 
                    <h2 class="topic-heading level"></h2> 
                    <h2 class="topic">Level</h2> 
                </div> 

                <img src= 
                "../img/level.svg"
                    alt="level"> 
            </div> 

            <div class="box box3"> 
                <div class="text"> 
                    <h2 class="topic-heading xp"></h2> 
                    <h2 class="topic">kB</h2> 
                </div> 

                <img src= 
    "../img/xp.svg"
                    alt="comments"> 
            </div> 

            <div class="box box4"> 
                <div class="text"> 
                    <h2 class="topic-heading projet"></h2> 
                    <h2 class="topic">Projects</h2> 
                </div> 

                <img src= 
                "../img/project.svg" 
                alt="projects"> 
            </div> 
        </div> 

        <div class="graph-board"> 
            <h1> Clicquer sur Skills ou Valid Projects</h1>
            <h2>Pour voir les graphs ulistrants</h2>
        </div> 
    </div> 
    </div> 
</div> 
`

const signin = `<div class="signIn">
<!-- <h2>Title</h2> -->
<div class="title">
    <h2>Login to your Account</h2>
</div>
<form action="" method="post" id="form">
    <input type="text" name="nickname_email" placeholder="Email" class="input" required>
    <input type="password" name="password" placeholder="Password" class="input" required>
    <div>
        <input type="checkbox" class="remberYou"> 
        <span class="textForRemember">Remember me </span>
        <span class="forgetPassword">Forget Password?</span>
    </div>
    <h5 id="error-out"></h5>
    <input type="submit" id="Login" value="Log In" class="input">
</form>
</div>`

export {layout, signin}