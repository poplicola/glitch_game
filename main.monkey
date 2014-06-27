Strict



Import mojo
Import box2d.collision
Import box2d.collision.shapes
Import box2d.dynamics.joints
Import box2d.common.math
Import box2d.dynamics.contacts
Import box2d.dynamics
Import box2d.demo.tests
Import box2d.flash.flashtypes
Import box2d.demo



Import dwarf
Import glue
Import physics
Import world
Import rubeloader
Import abuanimation
Import contact
Import brick
Import hud



Global APP:MyApp



Const CATEGORY_PLAYER_1:Int = 1
Const CATEGORY_PLAYER_2:Int = 2
Const CATEGORY_BRICK:Int = 4
Const CATEGORY_BOUNDARY:Int = 8



Function Main:Int()
	APP = New MyApp()
	Return 0
End



Class MyApp Extends App
	Field universe:Universe
	Field dwarf_one:Dwarf, dwarf_two:Dwarf
	Field bricks:List< Brick > = New List< Brick >()
	Field hud:Hud = New Hud()
	
	Method OnCreate:Int()
		SetUpdateRate( 60 )
		
		Dwarf.image = LoadImage( "dwarf.png" )
		Dwarf.image.SetHandle( Dwarf.image.Width() / 2.0, Dwarf.image.Height() / 2.0 ) 'exclude for GLITCH
		
		Dwarf.sheet = LoadImage( "bodies.png", 100, 80, 240 )
		Dwarf.sheet.SetHandle( Dwarf.sheet.Width() / 2.0 + 2, Dwarf.sheet.Height() / 2.0 + 24 )	'{y} + 15
		Dwarf.sheet2 = LoadImage( "heads.png", 100, 80, 240 )
		Dwarf.sheet2.SetHandle( Dwarf.sheet.Width() / 2.0 + 2, Dwarf.sheet.Height() / 2.0 -2 )
		
		universe = New Universe()
		'universe.Initialize()
		universe.Load( "delve_deeper_punchy_scene.txt" )
		
		dwarf_one = New Dwarf( 0, 30, 454 )
		dwarf_two = New Dwarf( 1, 400, 454 )
		
		Return 0
	End
	
	Method OnUpdate:Int()
		Clock.Update()
		
		universe.OnUpdate()
		
		animationJuggler.Update( Clock.Tick() )
		
		dwarf_one.OnUpdate();
		dwarf_two.OnUpdate();
		
		Local keys:Int[] = [ KEY_O, KEY_P ]
		Local dwarves:Dwarf[] = [ dwarf_one, dwarf_two ]
		For Local n:Int = 0 To 1
			If KeyHit( keys[n] )
				universe.m_world.DestroyJoint( dwarves[n].neck )
				dwarves[n].neck = Null
				dwarves[n].headlessFacing = dwarves[n].facing
				dwarves[n].head.SetBullet( True )
			EndIf
		Next
		
		Return 0
	End
	
	Method OnRender:Int()
		Cls()
		
		SetColor 255, 255, 255'GLITCH
		dwarf_one.OnRender()
		dwarf_two.OnRender()
		For Local brick:Brick = EachIn bricks
			brick.OnRender()
		Next
		
		#If CONFIG = "debug"
		universe.OnRender()
		#End
		
		hud.OnRender()
		
		Return 0
	End
End



Function OtherDwarf:Dwarf( dwarf:Dwarf )
	If dwarf = APP.dwarf_one Then Return APP.dwarf_two
	Return APP.dwarf_one
End



#Rem
Class MyClass
	Global myStatic:Int
	
	Field myField:Float
	
	Method New( x:Int, y:Int )
		Self.x =x; Self.y = y
		'constructor
	End
	
	Function MyStaticFunction:String( myParameter:Int )
		Local temp:Int
		'body
	End

	Method MyMethod:Whatever( someOtherShit:Float )
		'body
	End
End

Function MyFunction:Void( a:Int, b:Int )
End



Global myGlobalVariable:String = "my initialization value"
#End