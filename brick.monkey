Strict



Import main



Class Brick
	Global image:Image
	Field body:b2Body
	Field polygon:Float[]
	
	Method New( body:b2Body, polygon:Float[] )
		Self.body = body
		Self.polygon = polygon
	End
	
	Method OnRender:Void()
		PushMatrix()
		Translate( body.GetWorldCenter().x * Physics.SCALE, body.GetWorldCenter().y * Physics.SCALE )
		Rotate( RadiansToDegrees( body.GetAngle() ) )
		'Translate( -body.GetWorldCenter().x * Physics.SCALE, -body.GetWorldCenter().y * Physics.SCALE )
		DrawPoly( polygon )
		PopMatrix()
	End
End