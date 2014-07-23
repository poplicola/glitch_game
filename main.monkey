Strict



Import mojo



Import box2d.collision
Import box2d.collision.shapes
Import box2d.dynamics.joints
Import box2d.common.math
Import box2d.dynamics.contacts
Import box2d.dynamics
Import box2d.flash.flashtypes



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



Global WORLD_WIDTH:Float = 640.0
Global WORLD_HEIGHT:Int = 480.0



Global APP:MyApp



Function Main:Int()
	APP = New MyApp()
	Return 0
End



Class MyApp Extends App
	Field background:Image
	
	Field world:World
	Field dwarves:Dwarf[2]
	Field bricks:List< Brick > = New List< Brick >()
	Field hud:Hud = New Hud()
	
	Field CombatAttackFighter:Sound
	Field CombatHurtFighter1:Sound
	Field CombatHurtFighter2:Sound
	Field CombatHurtFighter3:Sound
	Field DwarfMoveDeep1:Sound
	Field DwarfMoveDeep2:Sound
	Field WarHornLow:Sound
	
	Method OnCreate:Int()
		SetUpdateRate( 60 )
		
		background = LoadImage( "background.png" )
		
		Dwarf.sheet = LoadImage( "bodies.png", 100, 80, 240 )
		Local xCenter:Float = Dwarf.sheet.Width() / 2.0
		Local yCenter:Float = Dwarf.sheet.Height() / 2.0
		Dwarf.sheet.SetHandle( xCenter + 2, yCenter + 24 )
		Dwarf.sheet2 = LoadImage( "heads.png", 100, 80, 240 )
		Dwarf.sheet2.SetHandle( xCenter + 2, yCenter - 2 )
		
		hud.popup = LoadImage( "glitch.png" )
		
		CombatAttackFighter = LoadSound( "CombatAttackFighter.wav" )
		CombatHurtFighter1 = LoadSound( "CombatHurtFighter1.wav" )
		CombatHurtFighter2 = LoadSound( "CombatHurtFighter2.wav" )
		CombatHurtFighter3 = LoadSound( "CombatHurtFighter3.wav" )
		DwarfMoveDeep1 = LoadSound( "DwarfMoveDeep1.wav" )
		DwarfMoveDeep2 = LoadSound( "DwarfMoveDeep2.wav" )
		WarHornLow = LoadSound( "WarHornLow.wav" )
		
		world = New World()
		world.Load( "delve_deeper_punchy_scene.txt" )
		
		dwarves[0] = New Dwarf( 0, 30, 454 )
		dwarves[1] = New Dwarf( 1, 400, 454 )
		
		'Glitch.Initialize()
		
		PlaySound( WarHornLow )
		
		Return 0
	End
	
	Method OnUpdate:Int()
		Clock.Update()
		
		world.OnUpdate()
		
		animationJuggler.Update( Clock.Tick() )
		
		dwarves[0].OnUpdate()
		dwarves[1].OnUpdate()
		
		#Rem
		Local glitchKeys:Int[] = [ KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6, KEY_7, KEY_8, KEY_9, KEY_0 ]
		
		For Local n:Int = 0 Until Glitch.ALL.Length
			If KeyHit( glitchKeys[n] )
				Glitch.ToggleGlitchById( n, Not Glitch.ALL[n].state )
			EndIf
		Next
		
		If KeyHit( KEY_TAB )
			For Local dwarf:Dwarf = EachIn dwarves
				APP.hud.health[ dwarf.player ] -= 5
			Next
		EndIf
		#End
		
		Glitch.Update()
				
		Return 0
	End
	
	Method OnRender:Int()
		Cls()
		
		SetColor( 255, 255, 255 )
		
		
		'DrawImage( background, 0, 0 )
		'RenderWalls()
		RenderBricks()
		hud.OnRender()
		RenderDwarves()
		
		
		#If CONFIG = "debug"
		world.OnRender()
		#End
		
		Return 0
	End
	
	Method RenderWalls:Void()
		Local x:Int[] = [ 0, 640 - 5, 0, 0 ]
		Local y:Int[] = [ 0, 0, 480 - 5, 0 ]
		Local w:Int[] = [ 640, 5, 640, 5 ]
		Local h:Int[] = [ 5, 480, 5, 480 ]
		
		For Local n:Int = 0 To 3
			DrawRect( x[n], y[n], w[n], h[n] )
		Next
	End
	
	Method RenderDwarves:Void()
		dwarves[0].OnRender()
		dwarves[1].OnRender()
	End
	
	Method RenderBricks:Void()
		For Local brick:Brick = EachIn bricks
			brick.OnRender()
		Next
	End
End



Function OtherDwarf:Dwarf( dwarf:Dwarf )
	Return APP.dwarves[ 1 - dwarf.player ]
End