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
            return;
        }  
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
        if (info.name == "Ubuntu MATE"){
            recommendedDE = "<br>You can use the MATE Tweak Tool to have a macOS or Windows-like experience.<br/>";
        }
        if (info.name == "Ubuntu" || info.name == "Xubuntu" || info.name == "Ubuntu Budgie" || info.name == "Pop!_OS") {
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
        ` + info.desktop_envs + 
        "<br /><span id='information'>" + recommendedDE + "</span>" +
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
    oReq.addEventListener("error", function (){
        document.getElementById("content").innerHTML = "The system decided you should try " + base + " , but doesn't seem to have an entry in its database. Please report the error <a href='https://github.com/RiderExMachina/bestdistroforme/issues'>on the Github page</a>, including the distro and what choices you made (if you can't remember, press F12, click on the \"Console\" tab, then copy the words from . Sorry for the inconvenience!";
    });
    oReq.open("GET", file);
    oReq.send();
}

function decision(toPop="") {

    if (niceOOTB && macLike) {
        if (distros.includes("Kubuntu")) {
            for (i=0; i < distros.length; i++) {
                if (distros[i] === "Kubuntu") {
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
        if (distros.includes("Manjaro") || distros.includes("EndeavourOS")) {
            console.log("User answered new to Linux. Removing Manjaro and EndeavourOS")
            
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

        stableDistros = ["Debian Stable", "CentOS"]
        for (i = 0; i< stableDistros.length; i++){
            if (!distros.includes(stableDistros[i])){
                distros.push(stableDistros[i]);    
            }
        }
        if (distros.includes("Manjaro") || distros.includes("EndeavourOS")) {
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
    else if (cycle == "kinda-quickly") {
        cuttingEdge = true;
        console.log("I'm a tech enthusiast")

        cuttingEdgeDistros = ["Ubuntu", "Kubuntu", "Ubuntu Mate", "Xubuntu", "Ubuntu Budgie", "Debian", "Solus", "Fedora"]
        for (i = 0; i< cuttingEdgeDistros.length; i++){
            if (!distros.includes(cuttingEdgeDistros[i])){
                distros.push(cuttingEdgeDistros[i]);    
            }
        }
    }   
    else if (cycle == "arch-user") {
        bleedingEdge = true;
        console.log("I like Arch, BTW")
        
        bleedingEdgeDistros = ["openSuse Tumbleweed", "EndeavourOS", "Manjaro"]
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

        prettyDistros = ["elementaryOS", "Pop!_OS", "Zorin", "Kubuntu", "Ubuntu Mate", "openSuse Tumbleweed", "Manjaro", "EndeavourOS"]
        for (i = 0; i< prettyDistros.length; i++){
            if (!distros.includes(prettyDistros[i])){
                distros.push(prettyDistros[i]);    
            }
        }
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

        gamingDistros = ["Pop!_OS", "Solus", "Manjaro", "EndeavourOS"]
        for (i = 0; i< gamingDistros.length; i++){
            if (!distros.includes(gamingDistros[i])){
                distros.push(gamingDistros[i]);    
            }
        }
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

        distros_like_win = ["Manjaro", "Zorin", "Linux Mint", "Ubuntu Mate", "Kubuntu", "Fedora", "openSuse Tumbleweed"];
        for (i = 0; i< distros_like_win.length; i++){
            if (!distros.includes(distros_like_win[i])){
                distros.push(distros_like_win[i]);    
            }
        }
    }
    else if (desktop == "mac") {
        macLike = true;
        console.log("I like macOS' desktop");

        distros_like_mac = ["elementaryOS", "Pop!_OS", "Zorin", "Kubuntu", "Xubuntu", "Ubuntu Mate"]
        for (i = 0; i< distros_like_mac.length; i++){
            if (!distros.includes(distros_like_mac[i])){
                distros.push(distros_like_mac[i]);    
            }
        }
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
