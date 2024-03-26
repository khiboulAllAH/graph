const layout=`
<div class="main">
    <header> 
        <div class="logosec"> 
            <div class="logo">GeeksForGeeks</div> 
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

                <div class="option2 nav-option"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                        class="nav-img"
                        alt="articles"> 
                    <h3> Articles</h3> 
                </div> 

                <div class="nav-option option3"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                        class="nav-img"
                        alt="report"> 
                    <h3> Report</h3> 
                </div> 

                <div class="nav-option option4"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                        class="nav-img"
                        alt="institution"> 
                    <h3> Institution</h3> 
                </div> 

                <div class="nav-option option5"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                        class="nav-img"
                        alt="blog"> 
                    <h3> Profile</h3> 
                </div> 

                <div class="nav-option option6"> 
                    <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                        class="nav-img"
                        alt="settings"> 
                    <h3> Settings</h3> 
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
                    <h2 class="topic-heading">60.5k</h2> 
                    <h2 class="topic">Article Views</h2> 
                </div> 

                <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                    alt="Views"> 
            </div> 

            <div class="box box2"> 
                <div class="text"> 
                    <h2 class="topic-heading">150</h2> 
                    <h2 class="topic">Likes</h2> 
                </div> 

                <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
                    alt="likes"> 
            </div> 

            <div class="box box3"> 
                <div class="text"> 
                    <h2 class="topic-heading">320</h2> 
                    <h2 class="topic">Comments</h2> 
                </div> 

                <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                    alt="comments"> 
            </div> 

            <div class="box box4"> 
                <div class="text"> 
                    <h2 class="topic-heading">70</h2> 
                    <h2 class="topic">Published</h2> 
                </div> 

                <img src= 
    "https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png" alt="published"> 
            </div> 
        </div> 

        <div class="graph-board"> 
        
        </div> 
    </div> 
    </div> 
</div> 
`

const signin = `<div class="signIn">
<!-- <h2>Title</h2> -->
<div class="title">
    <h2>Log in to your Account</h2>
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