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
Import glitches



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
	Field dwarves:Dwarf[2]
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
		
		dwarves[0] = New Dwarf( 0, 30, 454 )
		dwarves[1] = New Dwarf( 1, 400, 454 )
		
		Return 0
	End
	
	Method OnUpdate:Int()
		Clock.Update()
		
		universe.OnUpdate()
		
		animationJuggler.Update( Clock.Tick() )
		
		dwarves[0].OnUpdate();
		dwarves[1].OnUpdate();
		
		Local keys:Int[] = [ KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6, KEY_7, KEY_8, KEY_9, KEY_0 ]
		
		For Local n:Int = 0 Until Glitch.ALL.Length
			If KeyHit( keys[n] )
				Glitch.ToggleGlitchById( n )
			EndIf
		Next
		
		Return 0
	End
	
	Method OnRender:Int()
		Cls()
		
		SetColor 255, 255, 255
		
		Local x:Int[] = [ 0, 640 - 5, 0, 0 ]
		Local y:Int[] = [ 0, 0, 480 - 5, 0 ]
		Local w:Int[] = [ 640, 5, 640, 5 ]
		Local h:Int[] = [ 5, 480, 5, 480 ]
		
		For Local n:Int = 0 To 3
			DrawRect( x[n], y[n], w[n], h[n] )
		Next
		
		dwarves[0].OnRender()
		dwarves[1].OnRender()
		
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
	Return APP.dwarves[ 1 - dwarf.player ]
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