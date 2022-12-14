// Global variables:
var key1Taken = false;
var key2Taken = false;
var escapeTunnelLocked = true;
var beachGateLocked = true;
var spokenToSharkie;
var spokenToPhantasm;
var spokenToWendy;
var escapeAttempt = false;
var timesSpookHasMoved = 0;
var phantasmOptionClicked = 0;
var wendyOptionClicked = 0;
var sharkieOptionClicked = 0;

// Determine if Wendy has been spoken to based on session storage:
if (sessionStorage.getItem("spokenToWendy"))
{
    spokenToWendy = true;
}
else
{
    spokenToWendy = false;
}

// Determine if Sharkie has been spoken to based on session storage:
if (sessionStorage.getItem("spokenToSharkie"))
{
    spokenToSharkie = true;
}
else
{
    spokenToSharkie = false;
}

// Determine if Phantasm has been spoken to based on session storage:
if (sessionStorage.getItem("spokenToPhantasm"))
{
    spokenToPhantasm = true;
}
else
{
    spokenToPhantasm = false;
}

// Arrays containing all the timer stages:
const alphaTimerStages = [
    document.getElementsByClassName("hourGlass1"),
    document.getElementsByClassName("hourGlass2"),
    document.getElementsByClassName("hourGlass3"),
    document.getElementsByClassName("hourGlass4"),
    document.getElementsByClassName("hourGlass5"),
    document.getElementsByClassName("hourGlass6"),
    document.getElementsByClassName("hourGlass7"),
    document.getElementsByClassName("hourGlass8"),
    document.getElementsByClassName("hourGlass9"),
    document.getElementsByClassName("hourGlass10")
]

// The functions (taken from medium.com) allowing us to only show the body content when the page has
// fully loaded:
let domReady = (cb) => {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
  // Display the body when everything has loaded:
  document.body.style.visibility = 'visible';
});

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
        if (room == "keyHall" && !key1Taken && !sessionStorage.getItem('key1_obtained'))
        {
            // Save the fact that this key was taken to session storage:
            sessionStorage.setItem('key1_obtained', true)

            // Make the small key in the background disappear:
            document.getElementById("keyHallSmallKey").style.opacity = "0%";

            // Make the key in the inventory appear:
            document.getElementById("Inv1").style.opacity = "100%";

            // Change the key taken variable to true:
           key1Taken = true;
    
            // Now that the user has this key, the tunnel to the escape screen will behave as if it is unlocked:
            escapeTunnelLocked = false;
    
            // Show the pop-up for a short amount of time (2 seconds):
            document.getElementById("keyHallBigKey").style.opacity = "100%";
            setTimeout(keyPopRemoved, 2000, "keyHall");

            //Show the item in the inventory
            document.getElementById("Inv1").style.opacity = "100%";
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
        if (sessionStorage.getItem('key1_obtained')==false)
        {
            key1Taken=true;

            escapeTunnelLocked=false;

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
            // Only change this element if we're currently in the bear room:
            if (sessionStorage.getItem('bear'))
            {
                document.getElementById("bearRoomNavBlock1").style['pointer-events'] = 'auto';
            }
            document.getElementById("Inv1").style.opacity="100%";
        }

    }
}

function redirectToHallway(door)
{
        if(sessionStorage.getItem("escape_option2") && !sessionStorage.getItem("escape_option"))
        {
            // If the user said yes to Phantasm, redirect them to hallway 1:
            window.location = "/hallway1";
        }
        else if (sessionStorage.getItem("escape_option2") && sessionStorage.getItem("escape_option"))
        {
            // If the use has said both yes and no, let them escape:
            document.getElementById("escapeBackground").style.opacity = "100%";
        }
        else if (!sessionStorage.getItem("escape_option")) {
           // If the user did not say no to Phantasm, redirect them to hallway 1:
           window.location = "/hallway1";
        }
        else
        {
            // Make the background visible:
            document.getElementById("escapeBackground").style.opacity = "100%";
        }
}

function failMsg()
{
    if(sessionStorage.getItem("escape_option2"))
    {
        // If the user did not say no to Phantasm, redirect them to hallway 1:
        document.getElementById("failureMessage").style.opacity="100%"
        setTimeout(removeFailureMessage,3000)
    }
    else if(sessionStorage.getItem("escapeAttempt") && !sessionStorage.getItem("escape_option")
        && !sessionStorage.getItem("escape_option2"))
    {
        // Also redirect if the user hasn't spoken to Phantasm:
        document.getElementById("failureMessage").style.opacity="100%"
        setTimeout(removeFailureMessage,3000)
    }
}
function keyInInventory(room)
{
    if(sessionStorage.getItem('key_obtained')){
            
        document.getElementById("Inv2").style.opacity="100%";
    }

    if(sessionStorage.getItem('key1_obtained')){

        document.getElementById("Inv1").style.opacity="100%";

        // Make the background key invisible if we're currently in the key hall room:
        if (sessionStorage.getItem("keyHall"))
        {
            document.getElementById("keyHallSmallKey").style.opacity = "0%";
        }
    }
}

//Function to remember what room you are in:
function rememberRoom(roomNum)
{
    switch(roomNum) {
        case 1:
            sessionStorage.setItem('bear',true);
            sessionStorage.removeItem('beach');
            sessionStorage.removeItem('keyHall');
            sessionStorage.removeItem('mirror');
            sessionStorage.removeItem('phantasm');
            sessionStorage.removeItem('hall1');
            break;
        case 2:
            sessionStorage.setItem('beach',true);
            sessionStorage.removeItem('bear');
            sessionStorage.removeItem('keyHall');
            sessionStorage.removeItem('mirror');
            sessionStorage.removeItem('phantasm');
            sessionStorage.removeItem('hall1');
          break;
        case 3:
            sessionStorage.setItem('keyHall',true);
            sessionStorage.removeItem('beach');
            sessionStorage.removeItem('bear');
            sessionStorage.removeItem('mirror');
            sessionStorage.removeItem('phantasm');
            sessionStorage.removeItem('hall1');
            break;
        case 4:
            sessionStorage.setItem('mirror',true);
            sessionStorage.removeItem('beach');
            sessionStorage.removeItem('keyHall');
            sessionStorage.removeItem('bear');
            sessionStorage.removeItem('phantasm');
            sessionStorage.removeItem('hall1');
            break;
        case 5:
            sessionStorage.setItem('phantasm',true);
            sessionStorage.removeItem('beach');
            sessionStorage.removeItem('keyHall');
            sessionStorage.removeItem('mirror');
            sessionStorage.removeItem('bear');
            sessionStorage.removeItem('hall1');
            break;
        case 6:
            sessionStorage.setItem('hall1',true);
            sessionStorage.removeItem('beach');
            sessionStorage.removeItem('keyHall');
            sessionStorage.removeItem('mirror');
            sessionStorage.removeItem('phantasm');
            sessionStorage.removeItem('bear');
                  break;
        default:

          // code block
      }
}

function loadGame(){

    if(sessionStorage.getItem('beach'))
    {
        window.location = "/beach";
    }

    if(sessionStorage.getItem('keyHall'))
    {
        window.location = "/key-hall";
    }
    if(sessionStorage.getItem('mirror'))
    {
        window.location = "/mirror-room";
    }
    if(sessionStorage.getItem('phantasm'))
    {
        window.location = "/phantasm-room";
    }
    if(sessionStorage.getItem('bear'))
    {
        window.location = "/bear-room";
    }
    if(sessionStorage.getItem('hall1'))
    {
        window.location = "/hallway1";
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
    // NOTE: We kept the ability to talk to Phantasm again in order to give the user another chance at winning
    // the game (i.e. escaping).
}

// The function for bringing up the dialogue box:
function bringUpDialogueBox(name)
{
    if (name == "Wendy" && !spokenToWendy)
    {
        // If the user hasn't spoken to Wendy yet, make the dialogue box visible, along with the starting dialogue:
        document.getElementById("bearDialogueBox").style.opacity = "100%";
        document.getElementById("wendyQuestion").style.opacity = "100%";
        document.getElementById("wendyQuestion").style['pointer-events'] = 'auto';
        document.getElementById("answerWendy1").style.opacity = "100%";
        document.getElementById("answerWendy1").style['pointer-events'] = 'auto';
        document.getElementById("answerWendy2").style.opacity = "100%";
        document.getElementById("answerWendy2").style['pointer-events'] = 'auto';
        spokenToWendy = true;

        // Save the fact that Wendy has been spoken to:
        sessionStorage.setItem("spokenToWendy", true);
    }
    else if (name == "Sharkie" && !spokenToSharkie)
    {
        // If the user hasn't spoken to Sharkie yet, make the dialogue box and starting dialogue visible:
        document.getElementById("sharkieDialogueBox").style.opacity = "100%";
        document.getElementById("sharkieQuestion").style.opacity = "100%";
        document.getElementById("sharkieQuestion").style['pointer-events'] = 'auto';
        document.getElementById("answerSharkie1").style.opacity = "100%";
        document.getElementById("answerSharkie1").style['pointer-events'] = 'auto';
        document.getElementById("answerSharkie2").style.opacity = "100%";
        document.getElementById("answerSharkie2").style['pointer-events'] = 'auto';
        spokenToSharkie = true;

        // Save the fact that Sharkie has been spoken to:
        sessionStorage.setItem("spokenToSharkie", true);
    }
    else if (name == "Phantasm")
    {
        // Make the dialogue box and the starting dialogue visible:
        document.getElementById("phantasmDialogueBox").style.opacity = "100%";
        document.getElementById("phantasmQuestion").style.opacity = "100%";
        document.getElementById("phantasmQuestion").style['pointer-events'] = 'auto';
        document.getElementById("answerPhantasm1").style.opacity = "100%";
        document.getElementById("answerPhantasm1").style['pointer-events'] = 'auto';
        document.getElementById("answerPhantasm2").style.opacity = "100%";
        document.getElementById("answerPhantasm2").style['pointer-events'] = 'auto';
        spokenToPhantasm = true;

        // Save the fact that Phantasm has been spoken to:
        sessionStorage.setItem("spokenToPhantasm", true);
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
    else if (name == "Wendy")
    {
        // Which option is being hovered over?
        if (optionNumber == "1")
        {
            // Change text colour:
            document.getElementById("answerWendy1").style.color = "#181c25";
        }
        else if (optionNumber == "2")
        {
            document.getElementById("answerWendy2").style.color = "#181c25";
        }
    }
    else if (name == "Sharkie")
    {
        // Which option is being hovered over?
        if (optionNumber == "1")
        {
            // Change text colour:
            document.getElementById("answerSharkie1").style.color = "#181c25";
        }
        else if (optionNumber == "2")
        {
            document.getElementById("answerSharkie2").style.color = "#181c25";
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
    else if (name == "Wendy")
    {
        // Check which option is not being hovered on, and make sure it hasn't been clicked on:
        if (optionNumber == "1" && wendyOptionClicked != 1)
        {
            // Change the text colour back to white:
            document.getElementById("answerWendy1").style.color = "white";
        }
        else if (optionNumber == "2" && wendyOptionClicked != 2)
        {
            document.getElementById("answerWendy2").style.color = "white";
        }
    }
    else if (name == "Sharkie")
    {
        // Check which option is not being hovered on, and make sure it hasn't been clicked on:
        if (optionNumber == "1" && sharkieOptionClicked != 1)
        {
            // Change the text colour back to white:
            document.getElementById("answerSharkie1").style.color = "white";
        }
        else if (optionNumber == "2" && sharkieOptionClicked != 2)
        {
            document.getElementById("answerSharkie2").style.color = "white";
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

            // Remember the answer
            sessionStorage.setItem("escape_option2", true);

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

            // Remember the answer
            sessionStorage.setItem("escape_option", true);

            // Make the other option disappear:
            document.getElementById("answerPhantasm1").style.opacity = "0%";
            document.getElementById("answerPhantasm1").style['pointer-events'] = 'none';

            // After 1 second, show Phantasm's response:
            setTimeout(npcResponse, 1000, "Phantasm", "2");
        }
    }
    else if (name == "Wendy")
    {
        // Which option was chosen?
        if (optionNumber == "1")
        {
            // Change the colour of the text:
            document.getElementById("answerWendy1").style.color = "#181c25";

            // Record which option was chosen so that it won't change back to white upon the mouse leaving
            // the text:
            wendyOptionClicked = 1;

            // Make the other option disappear:
            document.getElementById("answerWendy2").style.opacity = "0%";
            document.getElementById("answerWendy2").style['pointer-events'] = 'none';

            // After 1 second, show Wendy's response:
            setTimeout(npcResponse, 1000, "Wendy", "1");
        }
        else if (optionNumber == "2")
        {
            // Change the colour of the text:
            document.getElementById("answerWendy2").style.color = "#181c25";

            // Record which option was chosen so that it won't change back to white upon the mouse leaving
            // the text:
            wendyOptionClicked = 2;

            // Make the other option disappear:
            document.getElementById("answerWendy1").style.opacity = "0%";
            document.getElementById("answerWendy1").style['pointer-events'] = 'none';

            // After 1 second, show Wendy's response:
            setTimeout(npcResponse, 1000, "Wendy", "2");
        }
    }
    else if (name == "Sharkie")
    {
        // Which option was chosen?
        if (optionNumber == "1")
        {
            // Change the colour of the text:
            document.getElementById("answerSharkie1").style.color = "#181c25";

            // Record which option was chosen so that it won't change back to white upon the mouse leaving
            // the text:
            sharkieOptionClicked = 1;

            // Make the other option disappear:
            document.getElementById("answerSharkie2").style.opacity = "0%";
            document.getElementById("answerSharkie2").style['pointer-events'] = 'none';

            // After 1 second, show Sharkie's response:
            setTimeout(npcResponse, 1000, "Sharkie", "1");
        }
        else if (optionNumber == "2")
        {
            // Change the colour of the text:
            document.getElementById("answerSharkie2").style.color = "#181c25";

            // Record which option was chosen so that it won't change back to white upon the mouse leaving
            // the text:
            sharkieOptionClicked = 2;

            // Make the other option disappear:
            document.getElementById("answerSharkie1").style.opacity = "0%";
            document.getElementById("answerSharkie1").style['pointer-events'] = 'none';

            // After 1 second, show Sharkie's response:
            setTimeout(npcResponse, 1000, "Sharkie", "2");
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

        // Make the dialogue box clickable:
        document.getElementById("phantasmDialogueBox").style['pointer-events'] = 'auto';
    }
    else if (name == "Wendy")
    {
        // Make all the current text vanish:
        document.getElementById("answerWendy1").style.opacity = "0%";
        document.getElementById("answerWendy1").style['pointer-events'] = 'none';
        document.getElementById("answerWendy2").style.opacity = "0%";
        document.getElementById("answerWendy2").style['pointer-events'] = 'none';
        document.getElementById("wendyQuestion").style.opacity = "0%";
        document.getElementById("wendyQuestion").style['pointer-events'] = 'none';

        // Which response is to be shown?
        if (responseNumber == "1")
        {
            document.getElementById("wendyResponse1").style.opacity = "100%";
        }
        else if (responseNumber == "2")
        {
            document.getElementById("wendyResponse2").style.opacity = "100%";
        }

        // Make the dialogue box clickable:
        document.getElementById("bearDialogueBox").style['pointer-events'] = 'auto';
    }
    else if (name == "Sharkie")
    {
        // Make all the current text vanish:
        document.getElementById("answerSharkie1").style.opacity = "0%";
        document.getElementById("answerSharkie1").style['pointer-events'] = 'none';
        document.getElementById("answerSharkie2").style.opacity = "0%";
        document.getElementById("answerSharkie2").style['pointer-events'] = 'none';
        document.getElementById("sharkieQuestion").style.opacity = "0%";
        document.getElementById("sharkieQuestion").style['pointer-events'] = 'none';

        // Which response is to be shown?
        if (responseNumber == "1")
        {
            document.getElementById("sharkieResponse1").style.opacity = "100%";
        }
        else if (responseNumber == "2")
        {
            document.getElementById("sharkieResponse2").style.opacity = "100%";
        }

        // Make the dialogue box clickable:
        document.getElementById("sharkieDialogueBox").style['pointer-events'] = 'auto';
    }
}

// The function for checking if the failure message should be shown:
function failedEscapeCheck(room)
{
    if (room == "bearRoom")
    {
        // When the user clicks on the escape tunnel in the bear room, change this boolean so that we know there was an
        // escape attempt:
        escapeAttempt = true;

        // Remember the answer
        sessionStorage.setItem("escapeAttempt", true);
    }
    if (room == "hall1")
    {
        // If an escape attempt was made, and the user hasn't said no to Phantasm, show the failure message for 3 seconds:
        if (sessionStorage.getItem("escapeAttempt") && sessionStorage.getItem("escape_option"))
        {
            document.getElementById("failureMessage").style.opacity = "100%";
            setTimeout(removeFailureMessage, 3000);
        }
    }
}

// Function for removing the failure message from the hallway 1 screen:
function removeFailureMessage()
{
    document.getElementById("failureMessage").style.opacity = "0%";
    sessionStorage.removeItem("escapeAttempt");
}

// Function for removing the dialogue from the beach room screen:
function removeDialogue(name)
{
    // Check who the user just spoke to:
    if (name == "Sharkie")
    {
        // Check what Sharkie's response was (this depends on what the user said to him):
        if (sharkieOptionClicked == "1")
        {
            // Make the corresponding dialogue elements disappear:
            document.getElementById("sharkieResponse1").style.opacity = "0%";
            document.getElementById("sharkieResponse1").style['pointer-events'] = 'none';
        }
        else if (sharkieOptionClicked == "2")
        {
            document.getElementById("sharkieResponse2").style.opacity = "0%";
            document.getElementById("sharkieResponse2").style['pointer-events'] = 'none';
        }

        // Make the dialogue box itself disappear:
        document.getElementById("sharkieDialogueBox").style.opacity = "0%";
        document.getElementById("sharkieDialogueBox").style['pointer-events'] = 'none';

        // Make it possible to click through Sharkie:
        document.getElementById("sharkieImage").style['pointer-events'] = 'none';
    }
    else if (name == "Wendy")
    {
        // Check what Wendy's response was (this depends on what the user said to them):
        if (wendyOptionClicked == "1")
        {
            // Make the corresponding dialogue elements disappear:
            document.getElementById("wendyResponse1").style.opacity = "0%";
            document.getElementById("wendyResponse1").style['pointer-events'] = 'none';
        }
        else if (wendyOptionClicked == "2")
        {
            document.getElementById("wendyResponse2").style.opacity = "0%";
            document.getElementById("wendyResponse2").style['pointer-events'] = 'none';
        }

        // Make the dialogue box itself disappear:
        document.getElementById("bearDialogueBox").style.opacity = "0%";
        document.getElementById("bearDialogueBox").style['pointer-events'] = 'none';

        // Make it possible to click through Wendy:
        document.getElementById("wendyImage").style['pointer-events'] = 'none';
    }
    else if (name == "Phantasm")
    {
        // Check what Phantasm's response was (this depends on what the user said to him):
        if (phantasmOptionClicked == "1")
        {
            // Make the corresponding dialogue elements disappear:
            document.getElementById("phantasmResponse1").style.opacity = "0%";
            document.getElementById("phantasmResponse1").style['pointer-events'] = 'none';
        }
        else if (phantasmOptionClicked == "2")
        {
            document.getElementById("phantasmResponse2").style.opacity = "0%";
            document.getElementById("phantasmResponse2").style['pointer-events'] = 'none';
        }

        // Make the dialogue box itself disappear:
        document.getElementById("phantasmDialogueBox").style.opacity = "0%";
        document.getElementById("phantasmDialogueBox").style['pointer-events'] = 'none';

        // Make it possible to click through Phantasm:
        document.getElementById("phantasmImage").style['pointer-events'] = 'none';
    }
}

function timerFunction()
{
    if (sessionStorage.getItem("timerIsActive")) {
        let hourStage = parseInt(sessionStorage.getItem('currentStage'));
        let hourStageToRemove = hourStage - 1;

        // Removing the previous stage and adding a new one
        sessionStorage.removeItem("stage" + hourStageToRemove);
        sessionStorage.setItem("stage" + hourStage, hourStage);

        renderTimer();

        if (hourStage < 10){
            sessionStorage.setItem("currentStage", hourStage + 1);

            // After 1 second, bring up the next hourglass stage:
            setTimeout(timerFunction, 1000);

            if (hourStage == 9)
            {
                sessionStorage.removeItem("escape_option");
            }
        }
        else if (hourStage >= 10)
        {
            // After 1 second, make the hourglass disappear:
            setTimeout(timerGone, 1000);
        }
    }
}

// The function for making the timer disappear:
function timerGone()
{
    // Using an array of timer stages to make all of the last stage hourglasses disappear:
    let hourStage = parseInt(sessionStorage.getItem('currentStage'));
    let hourStageToRemove = hourStage - 1;

    for (let i = 0; i < alphaTimerStages.length; i++)
    {
        // Make the current stage visible:
        alphaTimerStages[i][0].style.opacity = "0%";
    }
}

function renderTimer()
{
    if (sessionStorage.getItem("timerIsActive"))
    {
        let hourStage = parseInt(sessionStorage.getItem('currentStage'));
        let hourStageToRemove = hourStage - 1;

        // Iterating because there is no better way
        for (let i = 0; i < alphaTimerStages.length; i++){
            
            // Make the current stage visible:
            alphaTimerStages[i][0].style.opacity = "100%";

            // Make the last stage invisible:
            if (i != hourStage)
            {
                alphaTimerStages[i][0].style.opacity = "0%";
            }
        }
    }
}

// Start the timer when the user clicks on the spiral staircase in Phantasm's room, IF they answered no to Phantasm:
function startTimer()
{
    if (sessionStorage.getItem("escape_option"))
    {
        sessionStorage.removeItem("timerIsActive");
        sessionStorage.setItem("timerIsActive", true);
        sessionStorage.setItem("currentStage", 1);

        // timerFunction();
         timerLoop();

        // NOTE: Since clicking on the staircase leads the user to a new room, and the timer function is called
        // 'onload' in every in-game room minus the 3 outlined below, there is no need to call it in this function.
    }
}

// Make the timer code run as soon as the window loads, IF it isn't the index, load / new game or escape window:
window.onload = timerLoop = () => {
    if (sessionStorage.getItem("timerIsActive"))
    {
        renderTimer()
        setTimeout(timerFunction, 1000);
    }
}