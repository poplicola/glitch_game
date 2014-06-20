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
Import world



Global APP:MyApp



Function Main:Int()
	APP = New MyApp()
	Return 0
End



Class MyApp Extends App
	Field universe:Universe
	Field dwarf_one:Dwarf, dwarf_two:Dwarf
	
	Method OnCreate:Int()
		SetUpdateRate(60)
		
		dwarf_one = New Dwarf(0,30,454)
		dwarf_two = New Dwarf(1,400,454)
		
		universe = New Universe()
		universe.Initialize()
		
		Dwarf.image = LoadImage( "dwarf.png" )
		'exclude for GLITCH
		Dwarf.image.SetHandle( Dwarf.image.Width() / 2.0, Dwarf.image.Height() / 2.0 )
		
		Return 0
	End
	
	Method OnUpdate:Int()
		dwarf_one.OnUpdate();
		dwarf_two.OnUpdate();
		
		Return 0
	End
	
	Method OnRender:Int()
		Cls()
		
		dwarf_one.OnRender()
		dwarf_two.OnRender()
		universe.OnRender()
		
		Return 0
	End
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