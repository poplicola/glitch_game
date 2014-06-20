Strict



Import main



Global CONTROL_SCHEME_WASD:Int[] = [KEY_W, KEY_D, KEY_S, KEY_A]
Global CONTROL_SCHEME_ARROWS:Int[] = [KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT]
Global CONTROL_SCHEMES:Int[][] = [CONTROL_SCHEME_WASD, CONTROL_SCHEME_ARROWS]
Const CONTROL_UP:Int = 0, CONTROL_RIGHT:Int = 1, CONTROL_DOWN:Int = 2, CONTROL_LEFT:Int = 3



Class Dwarf
	Const WIDTH:Int = 30, HEIGHT:Int = 50
	Global image:Image
	
	Field x:Float, y:Float, player:Int
	Field body:b2Body

	Method New( Player:Int, Start_x:Float, Start_y:Float )
		Self.player = Player;
		Self.x = Start_x;
		Self.y = Start_y;
		APP.universe.MakeDwarf( Self, APP.universe.m_world )
		'constructor
	End
	
	Method OnUpdate:Void()
		If KeyDown( CONTROL_SCHEMES[player][CONTROL_RIGHT] )
			body.ApplyForce( New b2Vec2( Physics.WALK_FORCE, 0 ), body.GetWorldCenter() )
		ElseIf KeyDown( CONTROL_SCHEMES[player][CONTROL_LEFT] )
			body.ApplyForce( New b2Vec2( -Physics.WALK_FORCE, 0 ), body.GetWorldCenter() )
		Endif
		
		If KeyHit( CONTROL_SCHEMES[player][CONTROL_UP] )
			body.ApplyImpulse( New b2Vec2( 0, -Physics.JUMP_IMPULSE ), body.GetWorldCenter() )
		EndIf
		
		If KeyDown( CONTROL_SCHEMES[player][CONTROL_DOWN] )
			body.ApplyTorque( 10 )
		EndIf
	End
	
	Method OnRender:Void()
		Local center:b2Vec2 = body.GetWorldCenter()
		'GLITCH Local orientation:Float = body.GetAngle()
		'GLITCH Local orientation:Float = body.GetAngle() / 3.1415 * 180.0
		Local orientation:Float = RadiansToDegrees( -body.GetAngle() )
		DrawImage( image, center.x * Physics.SCALE, center.y * Physics.SCALE, orientation, 1, 1 )
	End
End




