Strict

Import main


Class Dwarf
	
	Field x:Float, y:Float
	
	Method New( Start_x:Int, Start_y:Int )
		Self.x =Start_x; Self.y = Start_y
		'constructor
	End
	
	Method OnUpdate:Void()
		If KeyDown(KEY_RIGHT)
			x+=10;
		Elseif KeyDown(KEY_LEFT)
			x-=10;
		Endif
	End
	
	Method OnRender:Void()
		DrawRect(x,y,30,50);
	End

End