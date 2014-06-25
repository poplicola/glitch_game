Strict



Import main



Function RadiansToDegrees:Float( radians:Float )
	Return radians / 3.1415 * 180.0
End



Function DegreesToRadians:Float( degrees:Float )
	Return degrees * 3.1415 / 180.0
End



Function ApplyForceToBody:Void( body:b2Body, x:Float, y:Float )
	body.ApplyForce( New b2Vec2( x, y ), body.GetWorldCenter() )
End



Function ApplyImpulseToBody:Void( body:b2Body, x:Float, y:Float )
	body.ApplyImpulse( New b2Vec2( x, y ), body.GetWorldCenter() )
End



Function BoolToString:String( tf:Bool )
	If tf Return "T"
	Return "F"
End