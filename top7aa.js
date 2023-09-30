var scriptname = "apple.pie"
UI.AddSubTab(["Rage", "SUBTAB_MGR"], scriptname)
//made exploit on key
//UI.AddCheckbox(["Rage", scriptname, scriptname], "Exploit")
var scriptitems = ["Rage", scriptname, scriptname]
var menu = {
    left_lby:0, left_real:0, left_fake:0,  right_lby:0, right_real:0, right_fake:0, dropdowm: 0, multi_dropdowm: 0
}
UI.AddCheckbox(scriptitems, "Exploit only while not moving")
UI.AddCheckbox(scriptitems, "Defuse with aa")
UI.AddCheckbox(scriptitems, "Legit aa on use")
UI.AddCheckbox(scriptitems, "Slide legs")
UI.AddCheckbox(scriptitems, "Custom Anti Aim")
menu.dropdowm = UI.AddDropdown(scriptitems, "Side", ["Right","Left"], 0)
menu.right_fake =UI.AddSliderInt(scriptitems, "Right Fake Offset", -180, 180)
menu.right_real =UI.AddSliderInt(scriptitems, "Right Real Offset", -60, 60)
menu.right_lby =UI.AddSliderInt(scriptitems, "Right LBY Offset", -90, 90)
menu.left_fake =UI.AddSliderInt(scriptitems, "Left Fake Offset", -180, 180)
menu.left_real =UI.AddSliderInt(scriptitems, "Left Real Offset", -60, 60)
menu.left_lby =UI.AddSliderInt(scriptitems, "Left LBY Offset", -90, 90)
menu.multi_dropdowm = UI.AddMultiDropdown(scriptitems, "Inverter Flip Conditions", ["In air", "Walking", "Running"], 0)
UI.AddSliderInt(scriptitems, "noscope hitchance", 0, 100)
UI.AddSliderInt(scriptitems, "in air hitchance", 0, 100)
//fixed


UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Exploit", "Exploit")
UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Exploit - Experiment", "Exploit - Experiment")
UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Freestand", "Freestand")
UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Ping Spike", "Ping Spike")
function MenuStuff()
{
    if(UI.GetValue(["Rage", scriptname, scriptname, "Custom Anti Aim"]))
    {
        UI.SetEnabled(menu.dropdowm,1)
        UI.SetEnabled(menu.multi_dropdowm,1)
        if(UI.GetValue(["Rage", scriptname, scriptname, "Side"])==0)
        {
            UI.SetEnabled(menu.right_fake,1)
            UI.SetEnabled(menu.right_real,1)
            UI.SetEnabled(menu.right_lby,1)
            UI.SetEnabled(menu.left_fake,0)
            UI.SetEnabled(menu.left_real,0)
            UI.SetEnabled(menu.left_lby,0)
        }
        else if(UI.GetValue(["Rage", scriptname, scriptname, "Side"])==1)
        {
            UI.SetEnabled(menu.left_fake,1)
            UI.SetEnabled(menu.left_real,1)
            UI.SetEnabled(menu.left_lby,1)
            UI.SetEnabled(menu.right_fake,0)
            UI.SetEnabled(menu.right_real,0)
            UI.SetEnabled(menu.right_lby,0)
        }
    }
    else
    {
        UI.SetEnabled(menu.multi_dropdowm,0)
        UI.SetEnabled(menu.dropdowm,0)
        UI.SetEnabled(menu.right_fake,0)
        UI.SetEnabled(menu.right_real,0)
        UI.SetEnabled(menu.right_lby,0)
        UI.SetEnabled(menu.left_fake,0)
        UI.SetEnabled(menu.left_real,0)
        UI.SetEnabled(menu.left_lby,0)
    }



}
function customhc() {

    var target = Ragebot.GetTarget()

    if (Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_hGroundEntity")) {
        if(UI.GetValue(["Rage", scriptname, scriptname, "in air hitchance"]))
        Ragebot.ForceTargetHitchance(target, UI.GetValue(["Rage", scriptname, scriptname, "in air hitchance"]))
    //}
}
else{
    var local = Entity.GetLocalPlayer()
    var scoped = Entity.GetProp(local, "CCSPlayer", "m_bIsScoped")
    var hitchance = UI.GetValue(["Rage", scriptname, scriptname, "noscope hitchance"])
    var hcforce = parseInt(hitchance)
    target = Ragebot.GetTarget()
    if (scoped == 0)
    {
        if(hitchance)
        Ragebot.ForceTargetHitchance(target, hcforce)
    }
    

}
}


function wtf( ) {
    if(UI.GetValue(["Rage", scriptname, scriptname, "Slide legs"]))
    {
        if(Globals.ChokedCommands()!=1 && Globals.ChokedCommands()!=0)
        {
            
            UI.SetValue( [ "Misc.", "Movement", "Leg movement" ], ( Globals.Tickcount( ) % 2 ) ? 1 : 2 );;
        }
        else
        {
                UI.SetValue( [ "Misc.", "Movement", "Leg movement" ], ( Globals.ChokedCommands( ) == 0 ) ? 1 : 2 );
        }
    }
    

}
function PingSpike()
{
    if(UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Ping Spike"]))
    UI.SetValue(["Misc.", "Helpers", "General", "Extended backtracking"], 1)
    else
    UI.SetValue(["Misc.", "Helpers", "General", "Extended backtracking"], 0)
}

function freestand()
{
    if(UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Freestand"]))
    UI.SetValue(["Rage", "Anti Aim", "Directions", "Auto direction"], 1)
    else
    UI.SetValue(["Rage", "Anti Aim", "Directions", "Auto direction"], 0)
}
var defusing = 0
function bagpl()
{
    const want = UI.GetValue(["Rage", scriptname, scriptname, "Defuse with aa"])
    const legitaa = UI.GetValue(["Rage", scriptname, scriptname, "Legit aa on use"])
    const buttons = UserCMD.GetButtons();
    if(/*UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "skeet defuse"])*/ defusing /*&& UserCMD.GetButtons(1 << 5)*/ && want)
    {
        var oldangles = Local.GetViewAngles();
        UserCMD.SetViewAngles([90, oldangles[1]+180, oldangles[2]], true) ;
        UserCMD.SetButtons(UserCMD.GetButtons() | (1 << 5))
        UI.SetValue(["Rage", "Anti Aim", "General", "Enabled"], 0)

        
    }
    else if (buttons & (1 << 5) && legitaa && !defusing)
    {
        desync();
    }
    /*else
    {
        var oldangles = Local.GetViewAngles();
        UserCMD.SetViewAngles([oldangles[0], oldangles[1], oldangles[2]], true) ;
        UserCMD.SetButtons(UserCMD.GetButtons())
        UI.SetValue(["Rage", "Anti Aim", "General", "Enabled"], 1)
        
    }*/

}

function desync() {
    const view_angles = Local.GetViewAngles();
    photosynthesis = parseInt(Globals.Curtime() * 1000);
    switch (photosynthesis % 25)  {
        case 0 : UserCMD.Choke(); UserCMD.SetViewAngles([view_angles[0] + 89, view_angles[1] + 180, 0], true); break;
        case 1 : UserCMD.Choke(); UserCMD.SetViewAngles([view_angles[0] + 89, view_angles[1] - 75, 0], true); break;
        case 2 : UserCMD.Choke(); UserCMD.SetViewAngles([view_angles[0] + 89, view_angles[1] + 60, 0], true); break;
        case 3 : UserCMD.SetViewAngles([view_angles[0], view_angles[1], 0], true); UserCMD.Send(); break;
    }
}




function bomb_being_defused()
{
    var defuser = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    var is_localplayer_defuser = Entity.IsLocalPlayer( defuser )
    var localplayer = Entity.GetLocalPlayer()
    if(is_localplayer_defuser && Entity.IsAlive(localplayer))
        defusing = 1
    Cheat.PrintChat("bomb being defused")
}
function bomb_defused()
{
    Cheat.PrintChat("bomb defused")
    defusing=0
}

function round_start()
{
    Cheat.PrintChat("round started")
    defusing=0
    
}
function round_end()
{
    old_tick_count_ = Globals.Tickcount()
    Cheat.PrintChat("round ended")
    defusing=0
}
var old_tick_count_ = 0
var flick
function antiaim()
{
    //right - - -
    var right_fake = UI.GetValue(["Rage", scriptname, scriptname, "Right Fake Offset"])
    var right_real = UI.GetValue(["Rage", scriptname, scriptname, "Right Real Offset"])
    var right_LBY = UI.GetValue(["Rage", scriptname, scriptname, "Right LBY Offset"])
    //left - - -
    var left_fake = UI.GetValue(["Rage", scriptname, scriptname, "Left Fake Offset"])
    var left_real = UI.GetValue(["Rage", scriptname, scriptname, "Left Real Offset"])
    var left_LBY = UI.GetValue(["Rage", scriptname, scriptname, "Left LBY Offset"])
    //inverter - - -
    var inverter = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA direction inverter"])
    //exploits - - -
    var exploit = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Exploit"])
    var exploit_ex = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Exploit - Experiment"])
    //only whyle not moving - - -
    var only = UI.GetValue(["Rage", scriptname, scriptname, "Exploit only while not moving"])
    //custom antiaim - - -
    var aa = UI.GetValue(["Rage", scriptname, scriptname, "Custom Anti Aim"])
    
//do a check to see if we only want to flick(exploit) while not moving
    if(!getVelocity() && only)
        do_flick =  1
    else if(getVelocity && only)
        do_flick = 0
    else if(!getVelocity && !only)
        do_flick = 1
    else if(getVelocity && !only)
        do_flick = 1
    else
        do_flick = 0
//do aa shit (aa override, fake, real and lby offsets)
    if(aa)
        {
            AntiAim.SetOverride(1)
            if(!flick)
            {
               if(inverter)
                {
                    AntiAim.SetFakeOffset(right_fake)
                    AntiAim.SetRealOffset(right_real)
                    AntiAim.SetLBYOffset(right_LBY)
                }
               else
                {
                    AntiAim.SetFakeOffset(left_fake)
                    AntiAim.SetRealOffset(left_real)
                    AntiAim.SetLBYOffset(left_LBY)
                }
            }
        }
    else if(!exploit && !exploit_ex)
    {
        AntiAim.SetOverride(0)
    }

        if(exploit /*&& aa*/ || exploit_ex)
        {
        if (Globals.Tickcount() - old_tick_count_ > 21 || Globals.Tickcount() - old_tick_count_ > 23)
        {
            flick++
        }
        else
            flick = 0
    
        if (Globals.Tickcount() - old_tick_count_ > 21 && Globals.Tickcount() - old_tick_count_ > 23)
            old_tick_count_ = Globals.Tickcount()
    }
            
    if(exploit_ex && aa)
    {
        
        if(flick>0 && flick<3 && do_flick )
        {
            
            if(inverter)
                AntiAim.SetFakeOffset(-180)
            else
                AntiAim.SetFakeOffset(180)
        }
        /*else if(flick==2 && do_flick)
        {
            if(inverter)
                AntiAim.SetFakeOffset(110)
            else
                AntiAim.SetFakeOffset(-110)
        }*/
        else if(flick>2 && do_flick)
        {
            AntiAim.SetOverride(1)
            if(inverter)
                AntiAim.SetFakeOffset(-110)
            else
                AntiAim.SetFakeOffset(110)
        }
        //Cheat.Print(flick.toString()+"\n")
    }
    else if(exploit && aa)
    {
        AntiAim.SetOverride(1)
        if(flick>2 && do_flick)
        {
        if(inverter)
            AntiAim.SetFakeOffset(-110)
        else
            AntiAim.SetFakeOffset(110)
        }
    }
    else if(!aa)
    {
        AntiAim.SetOverride(0)
    }
}
//pasted get velo func (who tf creates these funcs)
function getVelocity() {
    velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    return speed;
}
//unload
function unload()
{
    AntiAim.SetOverride(0)
    //UserCMD.SetViewAngles(Local.GetViewAngles())
    UI.SetValue(["Rage", "Anti Aim", "Directions", "Auto direction"], 0)
    UI.SetValue(["Misc.", "Helpers", "General", "Extended backtracking"], 0)
    UI.SetValue(["Rage", "Anti Aim", "General", "Enabled"], 1)
    UI.SetValue( [ "Misc.", "Movement", "Leg movement" ], 0)
}
UI.AddSliderInt(["Rage", scriptname, scriptname], "custom scope size", 0, 1000)
//UI.AddSliderInt(["Rage", scriptname, scriptname], "y1", -1000, +1000)
//UI.AddSliderInt(["Rage", scriptname, scriptname], "x2", -1000, +1000)
//UI.AddSliderInt(["Rage", scriptname, scriptname], "y2", -1000, +1000)
//UI.AddColorPicker(["Rage", scriptname, scriptname], "color")
// custom scope/draw testing (testing draw turned into custom scope)
function drawLine()
{
    server = World.GetServerString();
    //var color = UI.GetColor(["Rage", scriptname, scriptname, "color"])
    //var y1 = UI.GetValue(["Rage", scriptname, scriptname, "y1"])
    var x1 = UI.GetValue(["Rage", scriptname, scriptname, "custom scope size"])
    //var y2 = UI.GetValue(["Rage", scriptname, scriptname, "y2"])
    //var x2 = UI.GetValue(["Rage", scriptname, scriptname, "x2"])
    if(Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_bIsScoped")&&server)
    opac = 255
    else
    opac =0
    x=Render.GetScreenSize()[0]/2
    y=Render.GetScreenSize()[1]/2
//Render.Circle( 150, 150, 50, [ 255, 255, 255, opac ] );

Render.Line( x+x1, y+x1, x-x1, y-x1, [ 255, 125, 125, opac ] );
Render.Line( x-x1, y+x1, x+x1, y-x1, [ 255, 125, 125, opac ] );
}
// callbacks:
    Cheat.RegisterCallback("CreateMove", "customhc");
    Cheat.RegisterCallback( "CreateMove", "wtf" );
    Cheat.RegisterCallback("CreateMove", "PingSpike")
    Cheat.RegisterCallback("CreateMove", "freestand")
    Cheat.RegisterCallback("CreateMove", "antiaim")
    Cheat.RegisterCallback("bomb_defused", "bomb_defused")
    Cheat.RegisterCallback("round_start", "round_start")
    Cheat.RegisterCallback("round_end", "round_end")
    Cheat.RegisterCallback("bomb_begindefuse", "bomb_being_defused")
    Cheat.RegisterCallback("CreateMove", "bagpl")
    Cheat.RegisterCallback("Draw", "drawLine")
    Cheat.RegisterCallback("Draw", "MenuStuff")
    Cheat.RegisterCallback("Unload", "unload")

//sunt prea sex pentru lumea asta $$$$$