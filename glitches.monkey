Strict



Import main



Class Glitch
	Global HEADLESS:Glitch = New HeadlessGlitch()
	Global JETPACK:Glitch = New JetpackGlitch()
	Global SPACE:Glitch = New SpaceGlitch()
	Global TUMBLEWEED:Glitch = New TumbleweedGlitch()
	
	Global ALL:Glitch[] = [ HEADLESS, JETPACK, SPACE, TUMBLEWEED ]
	
	Global current:Glitch
	
	Function SetGlitch:Void( glitch:Glitch )
		If current <> Null Then current.OnFinish()
		current = glitch
		current.OnStart()
		If ( current.name <> "" ) Then Print( current.name )
		If ( current.sound <> Null ) Then PlaySound( current.sound )
	End
	
	Field name:String
	Field sound:Sound
	
	Method OnStart:Void() Abstract
	Method OnFinish:Void() Abstract
End



Class HeadlessGlitch Extends Glitch
	Method New()
		name = "HEADLESS"
	End
	
	Method OnStart:Void()
		For Local dwarf:Dwarf = EachIn APP.dwarves
			APP.universe.m_world.DestroyJoint( dwarf.neck )
			dwarf.neck = Null
			dwarf.headlessFacing = dwarf.facing
			dwarf.head.SetBullet( True )
		Next
	End
	
	Method OnFinish:Void()
		For Local dwarf:Dwarf = EachIn APP.dwarves
			dwarf.CreateNeck()
		Next
	End
End



Class JetpackGlitch Extends Glitch
	Method New()
		name = "JETPACK"	
	End
	
	Method OnStart:Void(); End
	
	Method OnFinish:Void(); End
End



Class SpaceGlitch Extends Glitch
	Method New()
		name = "SPACE"
	End
	
	Method OnStart:Void()
		APP.universe.m_world.SetGravity( New b2Vec2( 0.0, 0.0 ) )
	End
	
	Method OnFinish:Void()
		APP.universe.m_world.SetGravity( New b2Vec2( 0.0, 30.0 ) )
	End
End



Class TumbleweedGlitch Extends Glitch
	Method New()
		name = "TUMBLEWEED"	
	End
	
	Method OnStart:Void(); End
	
	Method OnFinish:Void(); End
End
