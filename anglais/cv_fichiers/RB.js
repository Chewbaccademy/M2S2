﻿//<!--
function OpenPrintWindow(vURL,DocID,Guid,IsPremiumUser,Target)
{  
    //alert(IsPremiumUser);
    if(IsPremiumUser=='True')
    {
        //alert('Yes');
    vURL=vURL+'&iefix=fix.pdf';   
    openCenteredWindow(vURL, "print", 600, 640, "location=No,scrollbars=Yes,toolbar=No,resizable=No,directories=No,status=No,menubar=No,hotkeys=No,center=Yes", false);    
    }
    else
    {
        //alert('No');
        if(Guid != '')
        window.location = '../billing/subscriptionmain.aspx?guid=' + Guid + '&targ=' + Target + '&DocID=' + DocID;
        else
            window.location = '../billing/subscriptionmain.aspx?targ=' + Target + '&DocID=' + DocID;
    }
    //alert(vURL );
}

function MovePage(vURL)
{
    location.href = vURL;
}
function BackPage()
{
history.back(); 
}
function OpenSubWindow(vURL)
{  
    //vURL ="/documents/PrintDocument.aspx?DocID=2"; 
    vURL=vURL+'&iefix=fix.pdf';   
    openCenteredWindow(vURL, "print", 600, 400, "location=No,scrollbars=Yes,toolbar=No,resizable=No,directories=No,status=No,menubar=No,hotkeys=No,center=Yes", false);    
    //alert(vURL );
}

function MM_showHideLayers() { //v9.0
    var i, p, v, obj, args = MM_showHideLayers.arguments;
    for (i = 0; i < (args.length - 2); i += 3)
        with (document) if (getElementById && ((obj = getElementById(args[i])) != null)) {
            v = args[i + 2];
            if (obj.style) { obj = obj.style; v = (v == 'show') ? 'visible' : (v == 'hide') ? 'hidden' : v; }
            obj.visibility = v;
        }
}
//-->