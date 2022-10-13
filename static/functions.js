// Global variables:
var key1Taken = false;
var key2Taken = false;
var escapeTunnelLocked = true;
var beachGateLocked = true;

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

        // Show the pop-up for a short amount of time (2 seconds):
        document.getElementById("keyHallBigKey").style.opacity = "100%";
        setTimeout(keyPopRemoved, 2000, "keyHall");

        // Now that the user has this key, the tunnel to the escape screen will behave as if it is unlocked:
        escapeTunnelLocked = false;
        document.getElementById("bearRoomNavBlock1").style.pointerEvents = "auto";
    }
    else if (room == "beachRoom" && !key2Taken)
    {
        // Change the key taken variable to true:
        key2Taken = true;

        // Show the key pop-up for 2 seconds:
        document.getElementById("beachRoomBigKey").style.opacity = "100%";
        setTimeout(keyPopRemoved, 2000, "beachRoom");

        // With this key in the user's inventory, the gate to the next hallway will be unlocked:
        beachGateLocked = false;
        document.getElementById("beachNavBlock2").style.pointerEvents = "auto";
    }
}

// The function for removing a key pop-up:
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