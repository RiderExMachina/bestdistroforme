//var ubuntu = $.getJSON("../json/ubuntu.json", function(data) { console.log(data)});

var windowsLike = false;
var macLike = false;
var upstream = false;
var ppaSupport = false;
var companySupported = false;

function displayResults(distro) {
    var results = $.getJSON("../json/" + distro +".json", function(data) { console.log(data) });
}

function windows() {
    windowsLike = true;
    console.log(windowsLike);

};

autoDistros = ["Kubuntu", "Pop!_OS", "elementaryOS", "Linux Mint"];
function autoChoice() {
    distro = autoDistros[Math.round(Math.random() * autoDistros.length)];
    if (distro == undefined) {
        autoChoice()
    }
    distro = distro.lower()
    displayResults(distro)
    
};