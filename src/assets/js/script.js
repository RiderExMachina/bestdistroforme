//var ubuntu = $.getJSON("../json/ubuntu.json", function(data) { console.log(data)});

var windowsLike = false;
var macLike = false;
var upstream = false;
var ppaSupport = false;
var companySupported = false;

function displayResults(distro) {
    distro = distro.toLowerCase().replace(/^a-z/)
    var results = $.getJSON("../json/" + distro +".json", function(data) { document.getElementById("content").innerHTML = data; });
}

function windows() {
    windowsLike = true;
    displayResults("Linux Mint")

};

function mac() {
    macLike = true;
    displayResults("elementaryOS")
};

function whatever() {
    autoChoice()
}

autoDistros = ["Kubuntu", "Pop!_OS", "elementaryOS", "Linux Mint"];
function autoChoice() {
    distro = autoDistros[Math.round(Math.random() * autoDistros.length)];
    if (distro == undefined) {
        autoChoice()
    }
    displayResults(distro)
    
};