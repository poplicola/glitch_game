Strict



Import main



Global CONTROL_SCHEME_WASD:Int[] = [KEY_W, KEY_D, KEY_S, KEY_A]
Global CONTROL_SCHEME_ARROWS:Int[] = [KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT]
Global CONTROL_SCHEMES:Int[][] = [CONTROL_SCHEME_WASD, CONTROL_SCHEME_ARROWS]
Const CONTROL_UP:Int = 0, CONTROL_RIGHT:Int = 1, CONTROL_DOWN:Int = 2, CONTROL_LEFT:Int = 3



Const FACING_LEFT:Int = -1, FACING_RIGHT:Int = 1



Class Dwarf
	Const WIDTH:Int = 30, HEIGHT:Int = 50
	Global image:Image
	
	Field player:Int
	Field x:Float, y:Float, facing:Int
	Field body:b2Body, head:b2Body, neck:b2RevoluteJoint

	Method New( Player:Int, Start_x:Float, Start_y:Float )
		Self.player = Player;
		Self.x = Start_x;
		Self.y = Start_y;
		facing = 1 - 2 * Player
		CreateBody()
	End
	
	Method CreateBody:Void()
		Local world:b2World = APP.universe.m_world
		
		Local bodyDefinition:b2BodyDef = New b2BodyDef()
        bodyDefinition.type = b2Body.b2_Body
		bodyDefinition.position.Set( x / Physics.SCALE, y / Physics.SCALE )
		
        body = world.CreateBody( bodyDefinition )
		
		Local shapeDefinition:b2PolygonShape = New b2PolygonShape()
		shapeDefinition.SetAsBox( 0.5 * WIDTH / Physics.SCALE, 0.5 * HEIGHT / Physics.SCALE )
		
        Local fixtureDefinition:b2FixtureDef = New b2FixtureDef()
        fixtureDefinition.density = Physics.DWARF_DENSITY
        fixtureDefinition.friction = Physics.DWARF_FRICTION
        fixtureDefinition.restitution = Physics.DWARF_RESTITUTION
        fixtureDefinition.shape = shapeDefinition
		
        body.CreateFixture( fixtureDefinition )
		
		'below incomplete
		
		Local headDefinition:b2BodyDef = New b2BodyDef()
		headDefinition.type = b2Body.b2_Body
		headDefinition.position.Set( x / Physics.SCALE, y / Physics.SCALE )
		
		head = world.CreateBody( headDefinition )
		
		Local shapeDefinition2:b2CircleShape = New b2CircleShape( 0.5 * WIDTH / Physics.SCALE )
		shapeDefinition2.SetLocalPosition( New b2Vec2( 0, 0.5 * WIDTH / Physics.SCALE - 0.5 * HEIGHT / Physics.SCALE ) )
		
		fixtureDefinition.shape = shapeDefinition2
		
		head.CreateFixture( fixtureDefinition )
		
		
		
		Local neckDefinition:b2RevoluteJointDef = New b2RevoluteJointDef()
		neckDefinition.bodyA = body
		neckDefinition.bodyB = head
		neckDefinition.collideConnected = False
	End
	
	Method OnUpdate:Void()
		Local keyRight:Int = CONTROL_SCHEMES[player][CONTROL_RIGHT]
		Local keyLeft:Int = CONTROL_SCHEMES[player][CONTROL_LEFT]
		Local keyUp:Int = CONTROL_SCHEMES[player][CONTROL_UP]
		Local keyDown:Int = CONTROL_SCHEMES[player][CONTROL_DOWN]
		
		If KeyHit( keyRight ) Then facing = FACING_RIGHT
		If KeyHit( keyLeft ) Then facing = FACING_LEFT
		
		If KeyDown( keyRight) And ( facing = FACING_RIGHT )
			ApplyForceToBody( body, Physics.WALK_FORCE, 0 )
		ElseIf KeyDown( keyLeft ) And ( facing = FACING_LEFT )
			ApplyForceToBody( body, -Physics.WALK_FORCE, 0 )
		Endif
		
		If KeyHit( keyUp )
			ApplyImpulseToBody( body, 0, -Physics.JUMP_IMPULSE )
		EndIf
		
		If KeyDown( keyDown )
			body.ApplyTorque( 10 )
		EndIf
	End
	
	Method OnRender:Void()
		Local center:b2Vec2 = body.GetWorldCenter()
		'GLITCH Local orientation:Float = body.GetAngle()
		'GLITCH Local orientation:Float = body.GetAngle() / 3.1415 * 180.0
		Local orientation:Float = RadiansToDegrees( -body.GetAngle() )
		DrawImage( image, center.x * Physics.SCALE, center.y * Physics.SCALE, orientation, facing, 1 )
	End
End




