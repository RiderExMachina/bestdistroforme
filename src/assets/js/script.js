// Tests

var windowsLike = false;
var macLike = false;
var upstream = false;
var ppaSupport = false;
var companySupported = false;
var niceOOTB = false;
var bleedingEdge = false;
var cuttingEdge = false;
var stable = false; 
var dirtyHands = false;
var newHere = false;
var roundTheBlock = false;
var oldFart = false;
var gamer = false;

function displayResults(distro) {
    base = distro;
    distro = distro.toLowerCase();
    file = "./assets/json/" + distro +".json";
    console.log(file)

    file.onerror = function() {
        document.getElementById("content").innerHTML = "The system decided you should try " + distro + " , but doesn't seem to have an entry in its database. Please report the error <a href='https://github.com/RiderExMachina/bestdistroforme/issues'>on the Github page</a>, including the distro and what choices you made (if you can't remember, press F12, click on the \"Console\" tab, then copy the words from . Sorry for the inconvenience!";
    }
    var results = $.getJSON(file, function(info) { 

        document.getElementById("content").innerHTML = `
        We recommend <span id='recommended'>` + info.name + `</span>
        <br />
        <a href='` + info.download_link +`' class='dl-link'>Download it here</a>
        <br />
        <b>Desktop Environments:</b>
        <br />
        ` + info.desktop_envs +
        `
        <br/>
        <b>Information:</b>
        <br/>`
         + info.description + 
         `<br /><br /><span id='more-info'>
         <a href='`+ info.linux_delta +`'>Linux Delta Rating</a> | 
         <a href='`+ info.distro_test +`'>Try it out</a> | 
         <a href='` + info.distro_watch + `'>Distro Watch Page</a></span> <br /> <br />
         <button onclick="javascript:decision("`+ base +`")">Not a fan</button>`;
     });
    
}

function decision(toPop="") {
    if (newHere && windowsLike && niceOOTB && (cuttingEdge || stable)) {
        distros = ["Zorin", "Linux Mint", "Solus"];
    }

    else if (!newHere && windowsLike && niceOOTB && (cuttingEdge || bleedingEdge)) {
        distros = ["Manjaro", "Fedora", "openSuse Tumbleweed"];    
    }
    
    else if (newHere && macLike && niceOOTB) {
        distros = ["elementaryOS", "Zorin", "Kubuntu"];
    }
    else if (gamer) {
        distros = ["Pop!_OS", "Manjaro"]
    }


    if (toPop != "") {
        distros = distros.filter(toPop)
    }
    chosen = distros[Math.round(Math.random() * distros.length)];
    if (chosen == undefined) {
        console.log("Decision = " + chosen + "... Re-rolling");
        decision();
    }
    console.log(chosen)
    displayResults(chosen)
}

function newtoLinux(newness) {
    if (newness == "baby") {
        newHere = true;
        console.log("Brand new")
    }
    if (newness == "arch-user") {
        roundTheBlock = true;
        console.log("Been around the block")
    }
    if (newness == "old-fart") {
        oldFart = true;
        console.log("Back in my day")
    }
    decision()
}

function softwareRelease(cycle) {
    if (cycle == "no-cares") {
        console.log("Making sure my computer runs for a long time")
        stable = true;
    }
    else if (cycle == "kinda-quickly") {
        console.log("I'm a tech enthusiast")
        cuttingEdge = true;
    }   
    else if (cycle == "arch-user") {
        console.log("I like Arch, BTW")
        bleedingEdge = true;
    }

    document.getElementById("content").innerHTML = `
        <h3>How familiar are you with Linux?</h3>
            <section id="choices">
                <button class="distro-show" onclick="javascript:newtoLinux('baby')">Never used it before</button>
                <button class="distro-show" onclick="javascript:newtoLinux('arch-user')">I've used it a bit</button>
                <button class="distro-show" onclick="javascript:newtoLinux('old-fart')">I've used it a lot</button>
        </section>   
    `;
}

function customization(effort){
    if (effort == "none") {
        console.log("Gotta look nice");
        niceOOTB = true;
    }
    else if (effort == "littlebit") {
        console.log("Likes to dabble");
    }
    else if (effort == "arch-user") {
        console.log("Gets hands dirty");
        dirtyHands = true;
    }
    document.getElementById("content").innerHTML = `
        <h3>How quickly do you want new software?</h3>
            <section id="choices">
                <button class="distro-show" onclick="javascript:softwareRelease('no-cares')">When it's stable</button>
                <button class="distro-show" onclick="javascript:softwareRelease('kinda-quickly')">Once it's been tested</button>
                <button class="distro-show" onclick="javascript:softwareRelease('arch-user')">As soon as it's released</button>
        </section>   
    `;

}

function compUse(usecase) {
    if (usecase == "browsing") {
        console.log("Mostly for browsing");
    }
    else if (usecase == "editing") {
        console.log("Will do some editing");
    }
    else if (usecase == "gaming") {
        gaming = true;
        console.log("Totally a gamer");
    }

    document.getElementById("content").innerHTML = `
        <h3>How much customization are you willing to do?</h3>
            <section id="choices">
                <button class="distro-show" onclick="javascript:customization('none')">As Little as Possible</button>
                <button class="distro-show" onclick="javascript:customization('littlebit')">A Little is Fine</button>
                <button class="distro-show" onclick="javascript:customization('arch-user')">Change All the Things</button>
        </section>
    `;   
}

function desktopType(desktop) {
    if (desktop == "windows") {
        windowsLike = true;
        console.log("I like Windows' desktop");
    }
    else if (desktop == "mac") {
        macLike = true;
        console.log("I like macOS' desktop");
    }
    else if (desktop == "whatever") {
        windowsLike = true;
        macLike = true;
        console.log("I don't care, so long as it works")
    }

    document.getElementById("content").innerHTML = `
        <h3>What do you use your computer for?</h3>
            <section id="choices">
                <button class="distro-show" onclick="javascript:compUse('browsing')">Browsing the Internet</button>
                <button class="distro-show" onclick="javascript:compUse('editing')">Editing Photos or Videos</button>
                <button class="distro-show" onclick="javascript:compUse('gaming')">Playing Video Games</button>
            </section>
    `;
}
/*function windows() {
    windowsLike = true;
    console.log("Windows-like")
    displayResults("Linux Mint")

};

function mac() {
    macLike = true;
    console.log("Mac-like")
    displayResults("elementaryOS")
};

function whatever() {
    console.log("\"Whatever\"")
    displayResults("Pop!_OS")
}*/

autoDistros = ["Kubuntu", "Pop!_OS", "elementaryOS", "Linux Mint", "Zorin"];
function autoChoice() {
    distro = autoDistros[Math.round(Math.random() * autoDistros.length)];
    if (distro == undefined) {
        autoChoice()
    }
    console.log("Choose for me")
    displayResults(distro)
    
};