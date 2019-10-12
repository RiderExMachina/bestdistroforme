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

function displayResults(distro) {
    base = distro;
    distro = distro.toLowerCase();
    file = "./assets/json/" + distro +".json";
    console.log(file)

    var results = $.getJSON(file, function(info) { 
        var recommendedDE = ""
        deCheck = info.desktop_envs
        if (windowsLike) {
            if (deCheck.includes(",")) {
                if (deCheck.includes("Cinnamon")){
                    DE = "KDE";
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
        }
        
        if (info.name == "Ubuntu" || info.name == "Ubuntu MATE" || info.name == "Kubuntu" || info.name == "Xubuntu" || info.name == "Ubuntu Budgie" || info.name == "Zorin" || info.name == "Pop!_OS") {
            recommendedDE = ""
        }

        document.getElementById("content").innerHTML = `
        We recommend <span id='recommended'>` + info.name + `</span>
        <br />
        <a href='` + info.download_link +`' class='dl-link'>Download it here</a>
        <br />
        <br />
        <b>Desktop Environments:</b>
        <br />
        ` + info.desktop_envs + recommendedDE +
        `
        <br/>
        <b>Information:</b>
        <br/>`
         + info.description + 
         `<br /><br /><span id='more-info'>
         <a href='`+ info.linux_delta +`'>Linux Delta Rating</a> | 
         <a href='`+ info.distro_test +`'>Try it out</a> | 
         <a href='` + info.distro_watch + `'>Distro Watch Page</a></span> <br /> <br />
         <button onclick="javascript:decision('`+ base +`')">Not a fan</button>`;
     });
    
    file.onerror = function() {
        document.getElementById("content").innerHTML = "The system decided you should try " + base + " , but doesn't seem to have an entry in its database. Please report the error <a href='https://github.com/RiderExMachina/bestdistroforme/issues'>on the Github page</a>, including the distro and what choices you made (if you can't remember, press F12, click on the \"Console\" tab, then copy the words from . Sorry for the inconvenience!";
    }
    
}

function decision(toPop="") {
    var distros = []

    if (windowsLike) {
        distros_like_win = ["Manjaro", "Zorin", "Linux Mint", "Ubuntu Mate", "Kubuntu", "Fedora", "openSuse Tumbleweed"];
        for (i = 0; i< distros_like_win.length; i++){
            if (!distros.includes(distros_like_win[i])){
                distros.push(distros_like_win[i]);    
            }
        }
    }
    
    if (macLike) {
        distros_like_mac = ["elementaryOS", "Pop!_OS", "Zorin", "Kubuntu", "Xubuntu", "Ubuntu Mate"]
        for (i = 0; i< distros_like_mac.length; i++){
            if (!distros.includes(distros_like_mac[i])){
                distros.push(distros_like_mac[i]);    
            }
        }
    }

    if (niceOOTB) {
        prettyDistros = ["elementaryOS", "Pop!_OS", "Zorin", "Kubuntu", "Ubuntu Mate", "openSuse Tumbleweed"]
        for (i = 0; i< prettyDistros.length; i++){
            if (!distros.includes(prettyDistros[i])){
                distros.push(prettyDistros[i]);    
            }
        }
    }
    
    if (bleedingEdge) {
        bleedingEdgeDistros = ["openSuse Tumbleweed", "EndeavourOS", "Manjaro"]
        for (i = 0; i< bleedingEdgeDistros.length; i++){
            if (!distros.includes(bleedingEdgeDistros[i])){
                distros.push(bleedingEdgeDistros[i]);    
            }
        }
    }

    if (cuttingEdge) {
        cuttingEdgeDistros = ["Ubuntu", "Kubuntu", "Ubuntu Mate", "Xubuntu", "Ubuntu Budgie", "Debian Testing", "Solus", "Fedora"]
        for (i = 0; i< cuttingEdgeDistros.length; i++){
            if (!distros.includes(cuttingEdgeDistros[i])){
                distros.push(cuttingEdgeDistros[i]);    
            }
        }
    }
    
    if (stable) {
        stableDistros = ["Debian Stable", "CentOS"]
        for (i = 0; i< stableDistros.length; i++){
            if (!distros.includes(stableDistros[i])){
                distros.push(stableDistros[i]);    
            }
        }
        if (distros.includes("Manjaro") || distros.includes("EndeavourOS")) {
            distros.filter(function(item) { 
                notStable = ["Manjaro", "EndeavourOS"]; 
                for (i=0; i< notStable.length; i++) {
                    return item !== notStable[i]
                }
            })
        }
    }

    if (gamer) {
        gamingDistros = ["Pop!_OS", "Manjaro", "EndeavourOS"]
        for (i = 0; i< gamingDistros.length; i++){
            if (!distros.includes(gamingDistros[i])){
                distros.push(gamingDistros[i]);    
            }
        }
    }
    

    if (newHere) {
        newDistros = ["Zorin", "Pop!_OS", "Linux Mint", "elementaryOS", "Ubuntu Mate", "Kubuntu", "Solus"];
        for (i = 0; i< newDistros.length; i++){
            if (!distros.includes(newDistros[i])){
                distros.push(newDistros[i]);    
            }
        }
        if (distros.includes("Manjaro") || distros.includes("EndeavourOS")) {
            console.log("User answered new to Linux. Removing Manjaro and EndeavourOS")
            
            notForNoobs = ["Manjaro", "EndeavourOS"]; 
            for (i=0; i < notForNoobs.length; i++) {
                console.log(notForNoobs[i])
                for (j=0; j < distros.length; j++) {
                    console.log(distros[j])
                    if (distros[j] === notForNoobs[i]) {
                        distros.splice(i, 1)
                    }

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
        for (i=0; i < distros.length; i++)
        distros.splice(i, 1);
        //distros.shift();
    }
    //chosen = distros[Math.round(Math.random() * (distros.length - 1))];
    chosen = distros[0]
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
        niceOOTB = true;
        console.log("Gotta look nice");
    }
    else if (effort == "littlebit") {
        console.log("Likes to dabble");
    }
    else if (effort == "arch-user") {
        dirtyHands = true;
        console.log("Gets hands dirty");
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
        simple = true;
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

autoDistros = ["Kubuntu", "Pop!_OS", "elementaryOS", "Linux Mint", "Zorin"];
function autoChoice() {
    distro = autoDistros[Math.round(Math.random() * autoDistros.length)];
    if (distro == undefined) {
        autoChoice()
    }
    console.log("Choose for me")
    displayResults(distro)
    
};