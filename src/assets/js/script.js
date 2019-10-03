//var ubuntu = $.getJSON("../json/ubuntu.json", function(data) { console.log(data)});

var windowsLike = false;
var macLike = false;
var upstream = false;
var ppaSupport = false;
var companySupported = false;

function displayResults(distro) {
    distro = distro.toLowerCase()
    var results = $.getJSON("../json/" + distro +".json");
    var info = JSON.parse(results);
    document.getElementById("content").innerHTML = "We recommend <span id='recommended'>" + info.name + "</span><br /><a href='" + info.download_link +"' class='dl-link'>Download it here</a><br /><br />Information<br/>" + info.description + "<br /><br /><span id='more-info'><a href='"+ info.linux_delta +"'>Linux Delta Rating</a> | <a href='"+ info.distro_test +"'>Try it out</a> | <a href='" + info.distro_watch + "'>Distro Watch Page</a></span>";
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