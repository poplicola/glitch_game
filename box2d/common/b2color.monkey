Strict
#rem
'/*
'* Copyright (c) 2011, Damian Sinclair
'*
'* This is a port of Box2D by Erin Catto (box2d.org).
'* It is translated from the Flash port: Box2DFlash, by BorisTheBrave (http://www.box2dflash.org/).
'* Box2DFlash also credits Matt Bush and John Nesky as contributors.
'*
'* All rights reserved.
'* Redistribution and use in source and binary forms, with or without
'* modification, are permitted provided that the following conditions are met:
'*
'*   - Redistributions of source code must retain the above copyright
'*     notice, this list of conditions and the following disclaimer.
'*   - Redistributions in binary form must reproduce the above copyright
'*     notice, this list of conditions and the following disclaimer in the
'*     documentation and/or other materials provided with the distribution.
'*
'* THIS SOFTWARE IS PROVIDED BY THE MONKEYBOX2D PROJECT CONTRIBUTORS "AS IS" AND
'* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
'* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
'* DISCLAIMED. IN NO EVENT SHALL THE MONKEYBOX2D PROJECT CONTRIBUTORS BE LIABLE
'* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
'* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
'* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
'* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
'* LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
'* OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
'* DAMAGE.
'*/
#end
Import box2d.flash.flashtypes
Import box2d.common
Import box2d.common.math
#rem
'/**
'* Color for debug drawing. Each value has the range [0,1].
'*/
#end
Class b2Color
    Method New(rr:Float, gg:Float, bb:Float)
        
        _r = Int(255 * b2Math.Clamp(rr, 0.0, 1.0))
        _g = Int(255 * b2Math.Clamp(gg, 0.0, 1.0))
        _b = Int(255 * b2Math.Clamp(bb, 0.0, 1.0))
    End
    Method Set : void (rr:Float, gg:Float, bb:Float)
        
        _r = Int(255 * b2Math.Clamp(rr, 0.0, 1.0))
        _g = Int(255 * b2Math.Clamp(gg, 0.0, 1.0))
        _b = Int(255 * b2Math.Clamp(bb, 0.0, 1.0))
    End
    '// R
    Method Setr : void (rr:Float)
        
        _r = Int(255 * b2Math.Clamp(rr, 0.0, 1.0))
    End
    
    '// G
    Method Setg : void (gg:Float)
        
        _g = Int(255 * b2Math.Clamp(gg, 0.0, 1.0))
    End
    
    '// B
    Method Setb : void (bb:Float)
        
        _b = Int(255 * b2Math.Clamp(bb, 0.0, 1.0))
    End
    '// Color
    Method Getcolor : Int ()
        
        Return (_r Shl 16) | (_g Shl 8) | (_b)
    End
    Field _r:Int = 0
    
    
    Field _g:Int = 0
    
    
    Field _b:Int = 0
    
End


