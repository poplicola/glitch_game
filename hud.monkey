Strict



Import main



Class Hud
	Field popup:Image
	Field sticker:Float[2]
	Field health:Int[] = [ 100, 100 ]
	
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
			
			Local dx:Int = [ 20, -( 20 + TextWidth("000") ) ][n]
			
			DrawText( health[ n ], X[n] + dx, Y[n] - 6 )
		Next
		
		'SetColor( 255, 255, 255 )
		
		time += direction * Clock.Tick()
		If time > duration / 2
			time = duration / 2
			direction = -1
		ElseIf time < 0
			time = 0
			direction = 0
		EndIf
		
		If direction <> 0
			Local multiplier:Float = 2 * time / duration
		
			Local sliceHeight:Int = 1, slices:Int = 70, offsetMax:Int = 20, frequency:Float = 502, speed:Float = 20, frequency2:Float = 800
			
			Local x:Int = WORLD_WIDTH / 2.0 - popup.Width() / 2.0
			Local y:Int = WORLD_HEIGHT / 2.0 - popup.Height() / 2.0
			
			Local dx:Float, dy:Float
			
			SetAlpha( multiplier  * 0.5 )
			
			For Local n:Int = 0 Until slices
				Local amplitude:Float = 1.0 - Abs( 2 * ( Float( n ) / ( slices - 1 ) ) - 1 )
				amplitude = amplitude * amplitude * multiplier * multiplier
				dx = Sin( n * frequency + phase ) * amplitude * offsetMax + Sin( ( multiplier + Rnd( 0.2 ) ) * frequency2  + phase2 ) * 12
				DrawImageRect( popup, x + dx, y + dy, 0, dy, popup.Width(), sliceHeight )
				dy += sliceHeight
			Next
			
			phase += speed
			
			SetAlpha( 1.0 )
		
		EndIf 
	End
	
	Method EnablePopup:Void()
		direction = 1
		phase2 = Rnd( 360 )
	End
	
	Field phase:Float, time:Float, direction:float, duration:Int = 500, phase2:Float
End