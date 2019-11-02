function gaming(distro) {
	ubuntuBased = ["Ubuntu", "Ubuntu Budgie", "Ubuntu MATE", "Kubuntu", "Lubuntu", "Xubuntu", "Pop!_OS", "elementaryOS", "Linux Mint", "Zorin"]
	if (ubuntuBased.contains(distro)) {
		nvidia = "If you have an Nvidia card, install the latest graphics driver by running <code>sudo apt-add-apt-repository ppa:graphics-drivers/ppa && sudo apt install nvidia-graphics-driver</code>" 
		steam = "Install Steam either through Discover or <code>sudo apt install steam</code> in the terminal."
		lutris = "Install Lutris by following the instructions at https://lutris.net/downloads/"
	}
}
function kubuntuNextSteps(){
	
	 instructions = [
		 "Download the latest version of the ISO from https://kubuntu.org/getkubuntu", 
		 "Update either through Discover or using <code>sudo apt update && sudo apt upgrade --y</code>", 
		 "Reboot your computer",
		 "Install Wine Staging using the instructions listed at https://wiki.winehq.org/Ubuntu"
	]

	optionalQualityOfLife = {
		"No Confirmation Shutdown/Logout" : [
			"Open Settings",
			"Navigate to <code>Startup and Shutdown > Desktop Session</code>",
			"Uncheck the box next to <code>Confirm Logout</code>"
		]

		"No Restore" : [
			"Open Settings",
			"Navigate to <code>Startup and Shutdown > Desktop Session</code>",
			"Check the <code>Start with an empty session</code> radio button"
		]
	}
	optionalWindowsLikeInstructions = {
		"Titled Menu" : [
			"Download the OCS Store App Image from https://www.opendesktop.org/p/1175480/",
			"Make it executable by either right-clicking and clicking the checkbox at <code>Properties > Permissions > Is executable</code> or by typing <code>chmod +x Downloads/ocs-store*.AppImage</code> in a terminal",
			"Open the store by double-clicking it",
			"Click on the \"URL\" bar and select <code>store.kde.org</code>",
			"Search for <code>Titled Menu</code> in the top search bar",
			"Select <code>Tiled Menu</code> by user Zren",
			"Click on <code>Install</code> under the <code>Files</code> tab",
			"Right-click the Start Icon and select <code>Alternatives > Tiled Menu</code>"
			]
	}
	
}