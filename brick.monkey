Strict



Import main



Class Brick
	Field body:b2Body
	Field polygon:Float[]
	
	Method New( body:b2Body, polygon:Float[] )
		Self.body = body
		Self.polygon = polygon
	End
	
	Method OnRender:Void()
		PushMatrix()
		
		Translate( MetersToPixels( body.GetWorldCenter().x ), MetersToPixels( body.GetWorldCenter().y ) )
		Rotate( -RadiansToDegrees( body.GetAngle() ) )
		DrawPoly( polygon )
		
		If ( body.GetType() <> b2Body.b2_staticBody )
			Scale( 0.9, 0.9 )
			SetColor( 100, 60, 10 )
			DrawPoly( polygon )
			SetColor( 255, 255, 255 )
		EndIf
		
		PopMatrix()
	End
End