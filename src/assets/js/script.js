//var ubuntu = $.getJSON("../json/ubuntu.json", function(data) { console.log(data)});

var windowsLike = false;
var macLike = false;
var upstream = false;
var ppaSupport = false;
var companySupported = false;

function displayResults(distro) {
    console.log(distro);
    distro = distro.toLowerCase();
    file = "./assets/json/" + distro +".json";
    console.log(file)
    var results = $.getJSON(file, function(info) { 
        document.getElementById("content").innerHTML = `
        We recommend <span id='recommended'>` + info.name + `</span>
        <br />
        <a href='` + info.download_link +`' class='dl-link'>Download it here</a>
        <br />
        Desktop Environments:
        <br />
        `
        for (i = 0; i <= info.desktop_envs.length; i++) {
            info.desktop_envs[i]
        }
        `<b>Information:</b>
        <br/>`
         + info.description + 
         `<br /><br /><span id='more-info'>
         <a href='`+ info.linux_delta +`'>Linux Delta Rating</a> | 
         <a href='`+ info.distro_test +`'>Try it out</a> | 
         <a href='` + info.distro_watch + `'>Distro Watch Page</a></span>`;
     });
    
}

function desktopType(desktop) {
    if (desktop == "windows") {
        windowsLike = true;
        console.log("Windows-like");
    }
    else if (desktop == "mac") {
        macLike = true;
        console.log("Mac-like");
    }
    else if (desktop == "whatever") {
        windowsLike = true;
        macLike = true;
        console.log("\"Whatever\"")
    }
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