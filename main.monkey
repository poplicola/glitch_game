Strict



Import mojo
Import dwarf



Global APP:MyApp



Function Main:Int()
	APP = New MyApp()
	Return 0
End



Class MyApp Extends App
	Method OnCreate:Int()
		SetUpdateRate(60)
		Return 0
	End
	
	Method OnUpdate:Int()
		
		Return 0
	End
	
	Method OnRender:Int()
		
		Return 0
	End
End