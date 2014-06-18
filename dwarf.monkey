Strict

Import main


Class Dwarf
	
	Field x:Float, y:Float, player:Int
	
	Method New( Player:Int, Start_x:Float, Start_y:Float )
		Self.player = Player;
		Self.x = Start_x;
		Self.y = Start_y;
		'constructor
	End
	
	Method OnUpdate:Void()
		If (player=1)
			If KeyDown(KEY_D)
				x+=10;
			Elseif KeyDown(KEY_A)
				x-=10;
			Endif
		Elseif (player=2)
			If KeyDown(KEY_RIGHT)
				x+=10;
			Elseif KeyDown(KEY_LEFT)
				x-=10;
			Endif
		Endif
		
		
	End
	
	Method OnRender:Void()
		DrawRect(x,y,30,50);
	End

End