#!/usr/bin/osascript

# AppleScript to open HTML and take screenshot
on run
    set htmlPath to "/Users/oleksii/Documents/SOFTDAB/Website new/Git/softdab_new/frontend/public/preloader-screenshot.html"
    set outputPath to "/Users/oleksii/Documents/SOFTDAB/Website new/Git/softdab_new/frontend/public/og-image.jpg"
    
    tell application "Google Chrome"
        activate
        open location ("file://" & htmlPath)
        delay 2
    end tell
    
    tell application "System Events"
        keystroke "i" using {command down, option down}
        delay 1
        keystroke "m" using {command down, shift down}
        delay 1
    end tell
    
    return "Please manually set size to 1200x630 and take screenshot"
end run
