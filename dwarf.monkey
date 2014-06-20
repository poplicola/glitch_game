Strict



Import main



Global CONTROL_SCHEME_WASD:Int[] = [KEY_W, KEY_D, KEY_S, KEY_A]
Global CONTROL_SCHEME_ARROWS:Int[] = [KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT]
Global CONTROL_SCHEMES:Int[][] = [CONTROL_SCHEME_WASD, CONTROL_SCHEME_ARROWS]
Const CONTROL_UP:Int = 0, CONTROL_RIGHT:Int = 1, CONTROL_DOWN:Int = 2, CONTROL_LEFT:Int = 3


Class Dwarf
	Const WIDTH:Int = 30, HEIGHT:Int = 50
	
	Field x:Float, y:Float, player:Int
	
	Field xPull:Float, yPull:Float
	Field body:b2Body, m_mouseJoint:b2MouseJoint
	
	Method SetBody:Void( body:b2Body )
		Self.body = body
	End
	
	Method UpdateBody:Void()
		If xPull <> 0
			If m_mouseJoint = Null
				Local md:b2MouseJointDef = New b2MouseJointDef()
				md.bodyA = APP.universe.m_world.GetGroundBody()
				md.bodyB = body
				md.target.Set( (body.GetLocalCenter().x + xPull)/APP.universe.m_physScale, (body.GetLocalCenter().y + yPull)/APP.universe.m_physScale )
				md.collideConnected = True
				md.maxForce = 300.0 * body.GetMass()
				m_mouseJoint = b2MouseJoint(APP.universe.m_world.CreateJoint(md))
				body.SetAwake(True)
			Else
				Local p2 :b2Vec2 = New b2Vec2( body.GetLocalCenter().x + xPull, body.GetLocalCenter().y + yPull )
				m_mouseJoint.SetTarget(p2)
			EndIf
		EndIf
	End

	Method New( Player:Int, Start_x:Float, Start_y:Float )
		Self.player = Player;
		Self.x = Start_x;
		Self.y = Start_y;
		'constructor
	End
	
	Method OnUpdate:Void()
		If KeyDown( CONTROL_SCHEMES[player][CONTROL_RIGHT] )
			x+=10;
			xPull = 10
		ElseIf KeyDown( CONTROL_SCHEMES[player][CONTROL_LEFT] )
			x-=10;
			xPull = -10
		Else
			xPull = 0
			If m_mouseJoint <> Null Then APP.universe.m_world.DestroyJoint(m_mouseJoint)
			m_mouseJoint = Null
		Endif
		
		UpdateBody()
	End
	
	Method OnRender:Void()
		DrawRect(x,y,WIDTH,HEIGHT);
	End

End