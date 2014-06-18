Strict

Import mojo
Import dwarf



Global APP:MyApp



Function Main:Int()
	APP = New MyApp()
	Return 0
End



Class MyApp Extends App
	Field dwarf_one:Dwarf, dwarf_two:Dwarf
	
	Method OnCreate:Int()
		SetUpdateRate(60)
		
		dwarf_one = New Dwarf(30,454)
		dwarf_two = New Dwarf(400,454)
		
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