// Global variables:
var key1Taken = false;
var key2Taken = false;
var escapeTunnelLocked = true;
var beachGateLocked = true;
var spokenToWendy = false;
var spokenToSharkie = true;
var spokenToPhantasm = false;
var timesSpookHasMoved = 0;
var phantasmOptionClicked = 0;

// The two functions enabling a timed (2 second) redirect from the title screen to the load or new game screen:
function timedRedirect()
{
    setTimeout(pageRedirect, 2000);
}

function pageRedirect()
{
    window.location = "/load-or-new";
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
    if (room == "keyHall" && !key1Taken)
    {
        // Make the small key in the background disappear:
        document.getElementById("keyHallSmallKey").style.opacity = "0%";

        // Change the key taken variable to true:
        key1Taken = true;

        // Now that the user has this key, the tunnel to the escape screen will behave as if it is unlocked:
        escapeTunnelLocked = false;

        // Show the pop-up for a short amount of time (2 seconds):
        document.getElementById("keyHallBigKey").style.opacity = "100%";
        setTimeout(keyPopRemoved, 2000, "keyHall");
    }
    else if (room == "beachRoom" && !key2Taken)
    {
        // Change the key taken variable to true:
        key2Taken = true;

        // With this key in the user's inventory, the gate to the next hallway will be unlocked:
        beachGateLocked = false;
        document.getElementById("beachNavBlock2").style['pointer-events'] = 'auto';

        // Show the key pop-up for 2 seconds:
        document.getElementById("beachRoomBigKey").style.opacity = "100%";
        setTimeout(keyPopRemoved, 2000, "beachRoom");
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
        document.getElementById("bearDialogueBox").style['pointer-events'] = 'auto';
        spokenToWendy = true;
    }
    else if (name == "Sharkie" && !spokenToSharkie)
    {
        document.getElementById("sharkieDialogueBox").style.opacity = "100%";
        document.getElementById("sharkieDialogueBox").style['pointer-events'] = 'auto';
        spokenToSharkie = true;
    }
    else if (name == "Phantasm" && !spokenToPhantasm)
    {
        document.getElementById("phantasmDialogueBox").style.opacity = "100%";
        document.getElementById("phantasmDialogueBox").style['pointer-events'] = 'auto';
        document.getElementById("phantasmQuestion").style.opacity = "100%";
        document.getElementById("answerPhantasm1").style.opacity = "100%";
        document.getElementById("answerPhantasm1").style['pointer-events'] = 'auto';
        document.getElementById("answerPhantasm2").style.opacity = "100%";
        document.getElementById("answerPhantasm2").style['pointer-events'] = 'auto';
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

// The function for hovering over potential answers to NPC dialogue:
function hoverText(name, optionNumber)
{
    // First check which NPC the user is interacting with:
    if (name == "Phantasm")
    {
        // Then check which option is being hovered over:
        if (optionNumber == "1")
        {
            // Change the colour of the text:
            document.getElementById("answerPhantasm1").style.color = "#181c25";
        }
        else if (optionNumber == "2")
        {
            document.getElementById("answerPhantasm2").style.color = "#181c25";
        }
    }
}

// The function for changing dialogue option text colours back to normal when they are not being hovered over:
function noHover(name, optionNumber)
{
    // Check which character the user is talking to:
    if (name == "Phantasm")
    {
        // Check which option is not being hovered on, and make sure it hasn't been clicked on:
        if (optionNumber == "1" && phantasmOptionClicked != 1)
        {
            // Change the text colour back to white:
            document.getElementById("answerPhantasm1").style.color = "white";
        }
        else if (optionNumber == "2" && phantasmOptionClicked != 2)
        {
            document.getElementById("answerPhantasm2").style.color = "white";
        }
    }
}

// The function for choosing what to say to an NPC:
function chooseAnswer(name, optionNumber)
{
    // Who are we talking to?
    if (name == "Phantasm")
    {
        // Which option was chosen?
        if (optionNumber == "1")
        {
            // Change the colour of the text:
            document.getElementById("answerPhantasm1").style.color = "#181c25";

            // Record which option was chosen so that it won't change back to white upon the mouse leaving
            // the text:
            phantasmOptionClicked = 1;

            // Make the other option disappear:
            document.getElementById("answerPhantasm2").style.opacity = "0%";
            document.getElementById("answerPhantasm2").style['pointer-events'] = 'none';

            // After 1 second, show Phantasm's response:
            setTimeout(npcResponse, 1000, "Phantasm", "1");
        }
        else if (optionNumber == "2")
        {
            // Change the colour of the text:
            document.getElementById("answerPhantasm2").style.color = "#181c25";

            // Record which option was chosen so that it won't change back to white upon the mouse leaving
            // the text:
            phantasmOptionClicked = 2;

            // Make the other option disappear:
            document.getElementById("answerPhantasm1").style.opacity = "0%";
            document.getElementById("answerPhantasm1").style['pointer-events'] = 'none';

            // After 1 second, show Phantasm's response:
            setTimeout(npcResponse, 1000, "Phantasm", "2");
        }
    }
}

// The function allowing NPCs to respond to the user:
function npcResponse(name, responseNumber)
{
    // Who is replying?
    if (name == "Phantasm")
    {
        // Make all the current text disappear:
        document.getElementById("answerPhantasm1").style.opacity = "0%";
        document.getElementById("answerPhantasm1").style['pointer-events'] = 'none';
        document.getElementById("answerPhantasm2").style.opacity = "0%";
        document.getElementById("answerPhantasm2").style['pointer-events'] = 'none';
        document.getElementById("phantasmQuestion").style.opacity = "0%";
        document.getElementById("phantasmQuestion").style['pointer-events'] = 'none';

        // Which response is to be shown?
        if (responseNumber == "1")
        {
            document.getElementById("phantasmResponse1").style.opacity = "100%";
        }
        else if (responseNumber == "2")
        {
            document.getElementById("phantasmResponse2").style.opacity = "100%";
        }
    }
}

// The function for checking if the user should be redirected to the start:
function failedEscapeCheck()
{
    if (phantasmOptionClicked != 2)
    {
        // If the user did not say no to Phantasm, redirect them to hallway 1:
        window.location = "/hallway1";
    }
}