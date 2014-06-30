Strict



Import main



Function RadiansToDegrees:Float( radians:Float )
	Return radians / 3.1415 * 180.0
End



Function DegreesToRadians:Float( degrees:Float )
	Return degrees * 3.1415 / 180.0
End



Function MetersToPixels:Float( meters:Float )
	Return meters * Physics.SCALE
End



Function PixelsToMeters:Float( pixels:Float )
	Return pixels / Physics.SCALE
End



Function ApplyImpulseToBody3:Void( body:b2Body, point:b2Vec2, magnitude:Float, angle:Float )
	Local x:Float = Cos( RadiansToDegrees( angle ) + 90 ) * magnitude
	Local y:Float = Sin( RadiansToDegrees( angle ) + 90 ) * magnitude
	body.ApplyImpulse( New b2Vec2( x, y ), point )
End




Function BoolToString:String( tf:Bool )
	If tf Return "T"
	Return "F"
End