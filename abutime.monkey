Strict



Import mojo



'TODO rename this Clock?
Class Clock
	Global timeStep:Int = -1
	
	Global timeCurrent:Int
	Global timePrevious:Int = -1
	Global timeElapsed:Int
	
	
	Function Update:Void()		
		timeCurrent = Millisecs()
		
		If timePrevious = -1
			timePrevious = timeCurrent
		EndIf
		
		timeElapsed = timeCurrent - timePrevious
		
		timePrevious = timeCurrent
	End
	
	Function Tick:Float()
		If timeStep <> -1 Then Return timeStep
		Return timeElapsed
	End
End



Class JugglerGeneric<T>
	Field pins:List<T> = New List<T>()
	Field paused:Bool
	
	Method Pause:Void(); paused = True; End
	Method Unpause:Void(); paused = False; End
	
	Method Add:list.Node<T>( pin:T )
		Return pins.AddLast( pin )
	End
	
	Method Update:Void( timeElapsed:Float )
		If paused Then Return
		
		For Local pin:T = EachIn pins
			UpdatePin( pin, timeElapsed )
		Next
	End
		
	Method UpdatePin:Void( pin:T, timeElapsed:Float ) Abstract
End