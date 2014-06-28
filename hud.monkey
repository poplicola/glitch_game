Strict



Import main



Class Hud
	Field sticker:Float[2]
	Field health:Float[] = [ 320.0, 320.0 ]
	
	Method OnRender:Void()
		Local X:Int[] = [25, 615], Y:Int[] = [25, 25]
		Local S:Int = 30
		
		For Local n:Int = 0 To 1
			Local value:Float = sticker[n]
			Local r:Float, g:Float
			
			Select True
				Case value < 0.5
					value = value * 2.0
					r = value * 255; g = 255.0
				Case value = 0.5
					r = 255; g = 255
				Case value > 0.5
					value = 2.0 - value * 2.0
					r = 255; g = value * 255.0
				Default
			End
			
			SetColor( r, g, 0 )
			DrawOval( X[n] - S / 2, Y[n] - S / 2, S, S )
			
			SetColor( 255, 255, 255)
			DrawLine( X[n], 50, X[1 - n], 50 )
			Local x:Float
			
			Local t:Float = health[n] / 320.0
			
			Select n
				Case 0
					x = 320.0 * ( 1.0 - t )
				Case 1
					x = 320.0 + 320.0 * t
				Default
			End
			
			'DrawOval( x, 55, 10, 10)
		Next
		
		'SetColor( 255, 255, 255 )
	End
End