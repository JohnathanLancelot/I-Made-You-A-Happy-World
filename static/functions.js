// Global variables:
var key1Taken = false;
var key2Taken = false;
var escapeTunnelLocked = true;
var beachGateLocked = true;
var spokenToWendy = false;
var spokenToSharkie = true;
var spokenToPhantasm = false;
var timesSpookHasMoved = 0;

// The two functions enabling a timed (2 second) redirect from the title screen to the load or new game screen:
function timedRedirect()
{
    setTimeout(pageRedirect, 2000);
}

function resetGame()
{
    sessionStorage.clear();
}

function pageRedirect()
{
    window.location = "/load-or-new"
}

// The function for when the user presses down while hovering over a sign:
function showSign(room)
{
    // Check which room this occurred in:
    if (room == "beachRoom")
    {
        // Make the beach room's sign appear as a zoomed-in image:
        document.getElementById("beachSign").style.opacity = "100%";
    }
    else if (room == "keyRoom")
    {
        // Make the sign inside the hallway with a key appear as a zoomed-in image:
        document.getElementById("keyHallSign").style.opacity = "100%";
    }
}

// The function for when the mouse is not being held down when hovering over a sign:
function removeSign(room)
{
    // Check which room the user is in:
    if (room == "beachRoom")
    {
        // Make the beach room's sign disappear:
        document.getElementById("beachSign").style.opacity = "0%";
    }
    else if (room == "keyRoom")
    {
        // Make the sign inside the hallway with a key disappear:
        document.getElementById("keyHallSign").style.opacity = "0%";
    }
}

// The function for when the mouse is being held down when hovering over a note:
function showNote(room)
{
    if (room == "hallway1")
    {
        // Make the note disappear from the background:
        document.getElementById("hall1BackgroundNoteRemoved").style.opacity = "100%";

        // Make the note pop-up appear:
        document.getElementById("hallway1Note").style.opacity = "100%";
    }
    else if (room == "mirrorRoom")
    {
        // Make the mirror room note disappear from the background image:
        document.getElementById("mirrorRoomNoteRemoved").style.opacity = "100%";

        // Bring up the note pop-up:
        document.getElementById("mirrorRoomNote").style.opacity = "100%";
    }
}

// The function for when the mouse is not being held down when hovering over a note:
function hideNote(room)
{
    if (room == "hallway1")
    {
        // Make the note reappear in the background:
        document.getElementById("hall1BackgroundNoteRemoved").style.opacity = "0%";

        // Make the note pop-up disappear:
        document.getElementById("hallway1Note").style.opacity = "0%";
    }
    else if (room == "mirrorRoom")
    {
        // Bring back the note in the background:
        document.getElementById("mirrorRoomNoteRemoved").style.opacity = "0%";

        // Remove the note pop-up:
        document.getElementById("mirrorRoomNote").style.opacity = "0%";
    }
}

// The function for picking up keys:
function keyTaken(room)
{
        if (room == "keyHall" && !key1Taken && !sessionStorage.getItem('key1_obtained'))
        {
            sessionStorage.setItem('key1_obtained', true)
            // Make the small key in the background disappear:
            document.getElementById("keyHallSmallKey").style.opacity = "0%";
    
            document.getElementById("Inv1").style.opacity="100%";
            // Change the key taken variable to true:
           key1Taken = true;
    
            // Now that the user has this key, the tunnel to the escape screen will behave as if it is unlocked:
            escapeTunnelLocked = false;
            document.getElementById("bearRoomNavBlock1").style['pointer-events'] = 'auto';
    
            // Show the pop-up for a short amount of time (2 seconds):
            document.getElementById("keyHallBigKey").style.opacity = "100%";
            setTimeout(keyPopRemoved, 2000, "keyHall");

            //Show the item in the inventory
            document.getElementById("Inv1").style.opacity="100%";

        }


        if (room == "beachRoom" && !key2Taken && !sessionStorage.getItem('key_obtained'))
        {
            
            sessionStorage.setItem('key_obtained', true)

            document.getElementById("Inv2").style.opacity="100%";

            document.getElementById("beachNavBlock2").style['pointer-events'] = 'auto';
            // Show the key pop-up for 2 seconds:
            document.getElementById("beachRoomBigKey").style.opacity = "100%";
            setTimeout(keyPopRemoved, 2000, "beachRoom");

            //Show the item in the inventory
            document.getElementById("Inv2").style.opacity="100%";
        }

        //Check that key has been added to the inventory
        if (sessionStorage.getItem('key1_obtained')==flase)
        {
            key1Taken=true;

            escapeTunnelLocked=flase;

            document.getElementById("keyHallSmallKey").style.opacity = "0%";
            document.getElementById("bearRoomNavBlock1").style['pointer-events'] = 'auto';
            document.getElementById("Inv1").style.opacity="100%";


        }
        if (sessionStorage.getItem('key_obtained')==false)
        {
            // Change the key taken variable to true:
            key2Taken = true;
    
            // With this key in the user's inventory, the gate to the next hallway will be unlocked:
            beachGateLocked = false;
            document.getElementById("beachNavBlock2").style['pointer-events'] = 'auto';
            document.getElementById("Inv2").style.opacity="100%";
    
        }
         
    
    
}

function gateIsUnlocked(door)
{
    if (door === "hallRoomKey")
    {
        if(sessionStorage.getItem('key_obtained'))
        {
            document.getElementById("beachNavBlock2").style['pointer-events'] = 'auto';
            document.getElementById("Inv2").style.opacity="100%";
        }
    }
    if (door==="escapeRoom")
    {
        if(sessionStorage.getItem('key1_obtained'))
        {
            
            document.getElementById("bearRoomNavBlock1").style['pointer-events'] = 'auto';
            document.getElementById("Inv1").style.opacity="100%";
        }
    }

}


function keyInInventory(room)
{
        if(sessionStorage.getItem('key_obtained')){
            
            document.getElementById("Inv2").style.opacity="100%";

        }

        if(sessionStorage.getItem('key1_obtained')){
            //document.getElementById("keyHallSmallKey").style.opacity = "0%";
            document.getElementById("Inv1").style.opacity="100%";

        }
}

// The function for removing a key pop-up, and adding the key to the inventory:
function keyPopRemoved(room)
{
    if (room == "keyHall")
    {
        // Make the pop-up disappear:
        document.getElementById("keyHallBigKey").style.opacity = "0%";
    }
    else if (room == "beachRoom")
    {
        // Remove the pop-up:
        document.getElementById("beachRoomBigKey").style.opacity = "0%";
    }
}

// The function for checking whether the user has spoken to a specific NPC yet:
function checkNPCStatus(name)
{
    if (name == "Wendy" && spokenToWendy)
    {
        // If Wendy has already been spoken to when this page loads, we want her to be invisible and non-clickable:
        document.getElementById("wendyImage").style.opacity = "0%";
        document.getElementById("wendyImage").style['pointer-events'] = 'none';

        // We also want the dialogue and dialogue box to disappear:
        document.getElementById("bearDialogueBox").style.opacity = "0%";
        document.getElementById("bearDialogueBox").style['pointer-events'] = 'none';
    }
    else if (name == "Sharkie" && spokenToSharkie)
    {
        // Sharkie should still be visible, but the user should be able to click through him:
        document.getElementById("sharkieImage").style['pointer-events'] = 'none';

        // The dialogue box should also disappear:
        document.getElementById("sharkieDialogueBox").style.opacity = "0%";
        document.getElementById("sharkieDialogueBox").style['pointer-events'] = 'none';
    }
    else if (name == "Phantasm" && spokenToPhantasm)
    {
        // Phantasm should still be visible, but the user should be able to click through him:
        document.getElementById("phantasmImage").style['pointer-events'] = 'none';

        // Remove the dialogue box:
        document.getElementById("phantasmDialogueBox").style.opacity = "0%";
        document.getElementById("phantasmDialogueBox").style['pointer-events'] = 'none';
    }
}

// The function for bringing up the dialogue box:
function bringUpDialogueBox(name)
{
    if (name == "Wendy" && !spokenToWendy)
    {
        // If the user hasn't spoken to Wendy yet, make the dialogue box visible:
        document.getElementById("bearDialogueBox").style.opacity = "100%";
        spokenToWendy = true;
    }
    else if (name == "Sharkie" && !spokenToSharkie)
    {
        document.getElementById("sharkieDialogueBox").style.opacity = "100%";
        spokenToSharkie = true;
    }
    else if (name == "Phantasm" && !spokenToPhantasm)
    {
        document.getElementById("phantasmDialogueBox").style.opacity = "100%";
        spokenToPhantasm = true;
    }
}

// The function for moving Spook:
function moveSpook()
{
    switch(timesSpookHasMoved)
    {
    case 0:
        // Move spook into position 2:
        document.getElementById("spookImage").style.width = "12.5vw";
        document.getElementById("spookImage").style.height = "57vh";
        document.getElementById("spookImage").style.gridColumn = "1";
        document.getElementById("spookImage").style.gridRow = "1";
        document.getElementById("spookImage").style.marginTop = "0vh";
        document.getElementById("spookImage").style.marginLeft = "0vw";
        break;

    case 1:
        // Switch to using cropped Spook:
        document.getElementById("spookImage").style.opacity = "0%";
        document.getElementById("spookImage").style['pointer-events'] = 'none';
        document.getElementById("spookCropped").style.opacity = "100%";
        document.getElementById("spookCropped").style['pointer-events'] = 'auto';
        break;

    case 2:
        // Make Spook vanish altogether:
        document.getElementById("spookCropped").style.opacity = "0%";
        document.getElementById("spookCropped").style['pointer-events'] = 'none';
        break;
    }

    // Increase the counter:
    timesSpookHasMoved += 1;
}