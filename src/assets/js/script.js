// Tests

var windowsLike = false;
var macLike = false;
var niceOOTB = false;
var bleedingEdge = false;
var cuttingEdge = false;
var stable = false;
var dirtyHands = false;
var newHere = false;
var roundTheBlock = false;
var oldFart = false;
var simple = false;
var gamer = false;
var distros = []

url = document.URL
if (url.includes("?")){
    console.log("Manual distro detected")
    url = url.split("?");
    manual = url[1];
    displayResults(manual);
}

function displayResults(distro) {
    base = distro;
    distro = distro.toLowerCase();
    file = "./assets/json/" + distro +".json";
    console.log(file)

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function (){
        try {
            var info = JSON.parse(this.responseText);
        }
        catch (e){
            console.log("err: " + file + " isn't valid JSON.");
            document.getElementById("content").innerHTML = "Based on what you've told us, we think you should use " + base + ", but we're unfortunately either unable to load the information about it, or we don't seem to have an entry in our database. Please report the error <a href='https://github.com/RiderExMachina/bestdistroforme/issues'>on the Github page</a>, including the distro and what choices you made (if you can't remember, press F12, click on the \"Console\" tab, and then copy/screenshot everything in the window). Sorry for the inconvenience!";
            return;
        } 
        var image = "";
        if (info.screenshots_folder != null) {
            image = "<img src='"+ info.screenshots_folder + "desktop.png' title='Image of the Desktop' style='width:384px;height:216px;'>";
        }
        var logo = "";
        if (info.logo != null || info.logo != undefined) {
            logo = "<img src='"+ info.logo +"' onerror='this.onerror=null; this.src=\'" + info.logo + ".png\'' style='height:50px;width:50px;'>";
        } else
        // Recommended DEs BEGIN
        var recommendedDE = ""
        deCheck = info.desktop_envs
        if (windowsLike) {
            if (deCheck.includes(",")) {
                if (deCheck.includes("Cinnamon")){
                    DE = "Cinnamon";
                }
                else if (deCheck.includes("KDE")) {
                    DE = "KDE";
                }
                else if (deCheck.includes("MATE")) {
                    DE = "MATE";
                }   
                else if (deCheck.includes("Budgie")) {
                    DE = "Budgie";
                }
            recommendedDE = "<br/>Because you said you preferred the Windows desktop experience, we recommend " + DE + ".<br/>";
            }
            if (info.name == "Fedora"){
                recommendedDE = "<br/>Because you said you preferred the Windows desktop experience, we recommend the <a href='https://spins.fedoraproject.org/en/cinnamon/'>Cinnamon</a> spin.<br/>"
            }
            if (info.name == "Debian"){
                recommendedDE = "<br/>Because you said you preferred the Windows desktop experience, we recommend the Cinnamon or KDE desktop environments.<br/>"
            }
        }
        if (macLike) {
            if (deCheck.includes(",")) {
                if (deCheck.includes("GNOME")){
                    DE = "GNOME";
                }
                else if (deCheck.includes("Budgie")){
                    DE = "Budgie";
                }
                else if (deCheck.includes("KDE")) {
                    DE = "KDE with the Latte Dock extension";
                }
                else if (deCheck.includes("XFCE")) {
                    DE = "XFCE";
                }
            recommendedDE = "<br/>Because you said you preferred the macOS desktop experience, we recommend " + DE + ".<br/>";
            }
            if (info.name == "ZorinOS") {
                recommendedDE = "<br/>You will need to purchase ZorinOS Ultimate if you want a macOS-like experience.<br/>";
            }
            if (info.name == "Kubuntu") {
                recommendedDE = "<br/>Because you said you prefer the macOS desktop experience, we recommend installing the Latte Dock extension.<br/>";
            }
        }
        if (info.name == "Ubuntu" || info.name == "Lubuntu" || info.name == "Xubuntu" || info.name == "Ubuntu Budgie" || info.name == "Ubuntu MATE" || info.name == "Pop!_OS") {
            if (stable) {
                recommendedDE = "Because you said you wanted a more stable distribution, we recommend the LTS version."
            }
            recommendedDE = ""
        }
        // RecommendedDEs END
        // Linux Delta
        if (info.linux_delta == null){
            moreInfo = `<br /><br /><span id='more-info'>
                        <a href='`+ info.distro_test +`'>Try it out</a> |
                        <a href='` + info.about_distro + `'>About this distro</a></span> <br /> <br />`
        }
        else {
            moreInfo = `<br /><br /><span id='more-info'>
                        <a href='`+ info.linux_delta +`'>Linux Delta Rating</a> |
                        <a href='`+ info.distro_test +`'>Try it out</a> |
                        <a href='` + info.about_distro + `'>About this distro</a></span> <br /> <br />`
        }
        console.log(info.logo)
        document.getElementById("content").innerHTML = `
        <h3>We recommend <span id='recommended'>` + info.name + logo + `</span></h3>
        <a href='` + info.download_link +`' class='dl-link'>Download it here</a>
        <br />
        <br />
        <b>Desktop Environments:</b>
        <br />
        ` + info.desktop_envs +
        "<br /><span class='information'>" + recommendedDE + "</span>" + image +
        `
        <br/>
        <b>Information:</b>
        <br/>`
        + info.description + moreInfo +
        `<span id="next"><a href="javascript:void(0)" onclick="decision('`+ base +`')">Click here</a> if you've tried this distro before and weren't a fan. |
        If you want to see another option, <a href="javascript:void(0)" onclick="next('`+ base +`')">click here</a>.</span><br/>`;

       /* <section id="sidebar>
          `;
       */
    });
    oReq.addEventListener("error", function (){
        document.getElementById("content").innerHTML = "The system decided you should try " + base + " , but doesn't seem to have an entry in its database. Please report the error <a href='https://github.com/RiderExMachina/bestdistroforme/issues'>on the Github page</a>, including the distro and what choices you made (if you can't remember, press F12, click on the \"Console\" tab, then copy the words from \"Windows-Like\" or \"macOS-like\". Sorry for the inconvenience!";
    });
    oReq.open("GET", file);
    oReq.send();
}

function next(current){
    i = distros.indexOf(current);
    console.log("Index " + i +" = " + distros[i]);
    if (i+1  >= distros.length){
        console.log("Distro is at end of list, restarting.");
        displayResults(distros[0]);
    }
    else{
        console.log("Moving to the next distro")
        displayResults(distros[i+1])
    }
}
function decision(toPop="") {

    if (niceOOTB && macLike) {
        if (distros.includes("Kubuntu")|| distros.includes("Xubuntu")) {
            for (i=0; i < distros.length; i++) {
                if (distros[i] === "Kubuntu") {
                    distros.splice(i, 1);
                }
            }
            for (i=0; i < distros.length; i++) {
                if (distros[i] === "Xubuntu") {
                    distros.splice(i, 1);
                }
            }  
        }
    }

    if (stable || newHere) {
        if (distros.includes("Manjaro") || distros.includes("EndeavourOS")) {
            if (stable) {
                reason = "wanted a stable system";
            }
            if (newHere) {
                reason = "are new to Linux";
            }
            console.log("User said they "+ reason +". Removing Manjaro and EndeavourOS")
            
            for (i=0; i < distros.length; i++) {
                if (distros[i] === "Manjaro") {
                    distros.splice(i, 1)
                }
                if (distros[i] === "EndeavourOS") {
                    distros.splice(i, 1)
                }
            }

        }
    }
  
    if (distros.length == 0) {
        for (i = 0; i < autoDistros.length; i++){
        distros.push(autoDistros[i]);
        }
    }
    if (toPop != "") {
        console.log("Removing " + toPop);
        for (i=0; i < distros.length; i++){
            if (distros[i] == toPop){
                distros.splice(i, 1);
            }
        //distros.shift();
        }
    }
    chosen = distros[Math.round(Math.random() * (distros.length - 1))];
    //chosen = distros[0]
    if (chosen == undefined) {
        decision();
    }
    console.log(distros)
    console.log(chosen)
    displayResults(chosen)
}

function newtoLinux(newness) {
    if (newness == "baby") {
        newHere = true;
        console.log("Brand new");

        newDistros = ["Zorin", "Pop!_OS", "Linux Mint", "elementaryOS", "Ubuntu Mate", "Kubuntu", "Solus"];
        for (i = 0; i< newDistros.length; i++){
            if (!distros.includes(newDistros[i])){
                distros.push(newDistros[i]);    
            }
        }
    }
    if (newness == "arch-user") {
        roundTheBlock = true;
        console.log("Been around the block");
    }    
    if (newness == "old-fart") {
        oldFart = true;
        console.log("Back in my day");
    }
    decision()
}

function softwareRelease(cycle) {
    if (cycle == "no-cares") {
        stable = true;
        console.log("Making sure my computer runs for a long time");

        stableDistros = ["Debian", "CentOS", "Leap"]
        for (i = 0; i< stableDistros.length; i++){
            if (!distros.includes(stableDistros[i])){
                distros.push(stableDistros[i]);    
            }
        }
    }
    else if (cycle == "kinda-quickly") {
        cuttingEdge = true;
        console.log("I'm a tech enthusiast")

        cuttingEdgeDistros = ["Ubuntu", "Kubuntu", "Ubuntu Mate", "Xubuntu", "Ubuntu Budgie", "Debian", "Solus", "Fedora", "Linux Mint"]
        for (i = 0; i< cuttingEdgeDistros.length; i++){
            if (!distros.includes(cuttingEdgeDistros[i])){
                distros.push(cuttingEdgeDistros[i]);    
            }
        }
    }   
    else if (cycle == "arch-user") {
        bleedingEdge = true;
        console.log("I like Arch, BTW")
        
        bleedingEdgeDistros = ["Tumbleweed", "EndeavourOS", "Manjaro"]
        for (i = 0; i< bleedingEdgeDistros.length; i++){
            if (!distros.includes(bleedingEdgeDistros[i])){
                distros.push(bleedingEdgeDistros[i]);    
            }
        }
        
        if (distros.includes("elementaryOS")) {
            for (i=0; i < distros.length; i++) {
                if (distros[i] === "elementaryOS") {
                    distros.splice(i, 1)
                }
            }
        }
    
    }

    document.getElementById("content").innerHTML = `
        <h3>How familiar are you with Linux?</h3>
            <a href="javascript:void(0)" onclick="explanationText('newness')" class="information">Why am I being asked this?</a>
            <p id="why" class="information"> </p>
            <section id="choices">
                <button class="distro-show" onclick="javascript:newtoLinux('baby')">Never used it before</button>
                <button class="distro-show" onclick="javascript:newtoLinux('arch-user')">I've used it a bit</button>
                <button class="distro-show" onclick="javascript:newtoLinux('old-fart')">I've used it a lot</button>
        </section>
    `;
}

function customization(effort){
    if (effort == "none") {
        niceOOTB = true;
        console.log("Gotta look nice");

        prettyDistros = ["elementaryOS", "Pop!_OS", "Zorin", "Kubuntu", "Ubuntu Mate", "Tumbleweed", "Manjaro", "EndeavourOS", "Peppermint"]
        for (i = 0; i< prettyDistros.length; i++){
            if (!distros.includes(prettyDistros[i])){
                distros.push(prettyDistros[i]);    
            }
        }
    }
    else if (effort == "littlebit") {
        console.log("Likes to dabble");
        
        needTLCDistros = ["Xubuntu", "Ubuntu MATE"]
        for (i = 0; i< needTLCDistros.length; i++){
            if (!distros.includes(needTLCDistros[i])){
                distros.push(needTLCDistros[i]);    
            }
        }
        
    }
    else if (effort == "arch-user") {
        dirtyHands = true;
        console.log("Gets hands dirty");

        if (distros.includes("elementaryOS")) {
            for (i=0; i < distros.length; i++) {
                if (distros[i] === "elementaryOS") {
                    distros.splice(i, 1)
                }
            }
        }
    }
    document.getElementById("content").innerHTML = `
        <h3>How quickly do you want new software?</h3>
            <a href="javascript:void(0)" onclick="explanationText('content')" class="information">Why am I being asked this?</a>
            <p id="why" class="information"> </p>
            <section id="choices">
                <button class="distro-show" onclick="javascript:softwareRelease('no-cares')">When it's Stable</button>
                <button class="distro-show" onclick="javascript:softwareRelease('kinda-quickly')">Once it's Been Tested</button>
                <button class="distro-show" onclick="javascript:softwareRelease('arch-user')">As Soon as it's Released</button>
        </section>
    `;

}
function computerAge(age) {
    if (age == "young"){
        console.log("Most distros should be fine")
    }
    if (age == "old"){
        console.log("Should be careful it's not 32-bit")
            oldPCFriendly = ["Xubuntu", "Lubuntu", "Peppermint"]
            for (i = 0; i< oldPCFriendly.length; i++){
                if (!distros.includes(oldPCFriendly[i])){
                    distros.push(oldPCFriendly[i]);    
                }
            }
        distros.push("Lubuntu");
    }
    document.getElementById("content").innerHTML = `
        <h3>How much customization are you willing to do?</h3>
            <a href="javascript:void(0)" onclick="explanationText('customization')" class="information">Why am I being asked this?</a>
            <p id="why" class="information"> </p>
            <section id="choices">
                <button class="distro-show" onclick="javascript:customization('none')">As Little as Possible</button>
                <button class="distro-show" onclick="javascript:customization('littlebit')">A Little is Fine</button>
                <button class="distro-show" onclick="javascript:customization('arch-user')">Change All the Things</button>
        </section>
        `;
}

function compUse(usecase) {
    if (usecase == "browsing") {
        simple = true;
        console.log("Mostly for browsing");
    }
    else if (usecase == "editing") {
        console.log("Will do some editing");
    }
    else if (usecase == "gaming") {
        gaming = true;
        console.log("Totally a gamer");

        gamingDistros = ["Pop!_OS", "Solus", "Manjaro", "EndeavourOS"]
        for (i = 0; i< gamingDistros.length; i++){
            if (!distros.includes(gamingDistros[i])){
                distros.push(gamingDistros[i]);    
            }
        }
    }
    document.getElementById("content").innerHTML = `
        <h3>How old is your PC?</h3>
            <a href="javascript:void(0)" onclick="explanationText('age')" class="information">Why am I being asked this?</a>
            <p id="why" class="information"> </p>
            <section id="choices">
                <button class="distro-show" onclick="javascript:computerAge('young')">Less than 10 years old</button>
                <button class="distro-show" onclick="javascript:computerAge('old')">Older than 10 years old</button>
        </section>
    `;

}

function desktopType(desktop) {
    if (desktop == "windows") {
        windowsLike = true;
        console.log("I like Windows' desktop");

        distros_like_win = ["Manjaro", "Zorin", "Linux Mint", "Ubuntu Mate", "Kubuntu", "Fedora", "Tumbleweed"];
        for (i = 0; i< distros_like_win.length; i++){
            if (!distros.includes(distros_like_win[i])){
                distros.push(distros_like_win[i]);    
            }
        }
    }
    else if (desktop == "mac") {
        macLike = true;
        console.log("I like macOS' desktop");

        distros_like_mac = ["elementaryOS", "Pop!_OS", "Zorin", "Ubuntu Budgie", "Kubuntu", "Xubuntu", "Ubuntu Mate"]
        for (i = 0; i< distros_like_mac.length; i++){
            if (!distros.includes(distros_like_mac[i])){
                distros.push(distros_like_mac[i]);    
            }
        }
    }
    else if (desktop == "whatever") {
        console.log("I don't care, so long as it works")
    }

    document.getElementById("return-to-start").innerHTML = "<a href='javascript:void('0')' onclick='quizStart()'>Start over</a>";

    document.getElementById("content").innerHTML = `
        <h3>What is your usual computer workload?</h3>
            <a href="javascript:void(0)" onclick="explanationText('usage')" class="information">Why am I being asked this?</a>
            <p id="why" class="information"> </p>
            <section id="choices">
                <button class="distro-show" onclick="javascript:compUse('browsing')">Light (e.g. Web browsing)</button>
                <button class="distro-show" onclick="javascript:compUse('editing')">Medium (e.g. Programming)</button>
                <button class="distro-show" onclick="javascript:compUse('gaming')">Heavy (e.g. Gaming)</button>
            </section>
    `;
}

function quiz(){
    questions = ["desktop", "usage", "age", "customization", "updates", "newness"]
    info = {
        "desktop" : [
                    "Pick which type of desktop you're most comfortable with.", 
                    "Windows-like",
                    "Mac-like",
                    "Don't care"
                    ],
        "usage" : [
                    "What is your usual computer workload?",
                    "Light (e.g. Web browsing)",
                    "Medium (e.g. Programming)",
                    "Heavy (e.g. Gaming)"
                  ],
        "age"  : [
                    "How old is your PC?",
                    "Less than 5 years old",
                    "Between 5 and 10 years old",
                    "Older than 10 years old"
                    ], 
        "customization" : [
                    "How much customization are you willing to do?",
                    "As little as possible",
                    "A little is fine",
                    "I want total control"
                    ],
        "updates" : [
                    "How quickly do you want new software?",
                    "When it's stable",
                    "After it's been tested",
                    "As soon as it's released"
                    ],
        "newness" : [
                    "How familiar are you with Linux?",
                    "Never used it before",
                    "I've dabbled with it",
                    "I've used it a lot"
                    ]
    }
    i = 0
        question = info[questions[i]];
        text = question[0];
        helptext = questions[i]
        button_1 = question[1];
        button_2 = question[2];
        button_3 = question[3];

       document.getElementById("content").innerHTML =  `
         <H3>`+ text +`</H3>
            <a href="javascript:void(0)" onclick="explanationText('`+ helptext +`')" class="information">Why am I being asked this?</a>
            <p id="why" class="information"> </p>
            <section id="choices">
                <!-- <img id="windows-like" src="assets/img/windows-like.svg" /> -->
                <button class="distro-show" onclick="javascript:button1()">`+ button_1+`</button>
                <button class="distro-show" onclick="javascript:button2()">`+ button_2 +`</button>
                <button class="distro-show" onclick="javascript:button3()">`+ button_3 +`</button>
            </section>
            <br /> <p id="extra"> <p>`;
        
        if (i = 0) {
            document.getElementById("extra").innerHTML = "Don't want to take the quiz? <a href='javascript:void(0)' onclick='autoChoice()'>We can choose for you</a>";
        }
}
function explanationText(location) {
    console.log("User wanted to know why they were asked about " + location);
    var explanation = document.getElementById("why")
    if (location == "desktop"){
        explanation.innerHTML = "We want to know what kind of desktop experience you are most comfortable with, as this will help decide on the <a href='https://simple.wikipedia.org/wiki/Desktop_environment' target='_blank'>Desktop Environment</a> we recommend. If you have no preference, click the \"Don't care\" button.";
    }
    if (location == "usage") {
        explanation.innerHTML = 'We want to know what kind of user you are. If you only browse the web using Google Chrome or Mozilla Firefox, click "Light". If you do <b>not</b> have a graphics card but do more than just browse the web, click "Medium". If you have a graphics card, click "Heavy".';
    }
    if (location == "age"){
        explanation.innerHTML = 'We want to know if your computer will be fast enough for most distros. If it\'s older than 10 years old it can sometimes lead to a bad experience, which is something we want to avoid.';
    }
    if (location == "customization") {
        explanation.innerHTML = 'Some very good performing distros do not look pretty out of the box. We want to know if you are willing to put a little bit of time in for customization. If you would like a good-looking distro out of the box, choose "As Little as Possible".';
    }
    if (location == "updates") {
        explanation.innerHTML = 'Each distro pushes out updates at different rates and can be more stable than other distros. Distros that push out faster updates can be less stable than distros that push out only stable updates. Click "Once it\'s been tested" for a happy medium.';
    }
    if (location == "newness") {
        explanation.innerHTML = 'Some distros are better than others for people who have never used Linux before. This will help us recommend a distro that will be close to your level of Linux knowlege.';
    }
}

autoDistros = ["Kubuntu", "Pop!_OS", "elementaryOS", "Linux Mint", "Zorin"];
function autoChoice() {
    for (i =0; i < autoDistros.length; i++) {
        distros.push(autoDistros[i])
    }

    distro = distros[Math.round(Math.random() * distros.length)];
    if (distro == undefined) {
        autoChoice()
    }
    console.log("Choose for me")
    displayResults(distro)
};
