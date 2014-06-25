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
	Field body:b2Body, head:b2Body, neck:b2RevoluteJoint, feet:b2Fixture
	Field feetTouching:Int, feetContactTime:Int, feetValid:Bool

	Method New( Player:Int, Start_x:Float, Start_y:Float )
		Self.player = Player;
		Self.x = Start_x;
		Self.y = Start_y;
		facing = 1 - 2 * Player
		CreateBody()
	End
	
	Method OnBeginContact:Void()
		feetTouching += 1
		If ( feetTouching > 0 ) Then feetContactTime = Millisecs()
	End
	
	Method OnEndContact:Void(); feetTouching -= 1; End
	
	Method CreateBody:Void()
		Local world:b2World = APP.universe.m_world
		
		Local bodyDefinition:b2BodyDef = New b2BodyDef()
        bodyDefinition.type = b2Body.b2_Body
		bodyDefinition.position.Set( x / Physics.SCALE, y / Physics.SCALE )
		bodyDefinition.fixedRotation = False
		
        body = world.CreateBody( bodyDefinition )
		
		Local shapeDefinition:b2PolygonShape = New b2PolygonShape()
		shapeDefinition.SetAsBox( 0.5 * WIDTH / Physics.SCALE, 0.5 * HEIGHT / Physics.SCALE )
		
        Local fixtureDefinition:b2FixtureDef = New b2FixtureDef()
        fixtureDefinition.density = Physics.DWARF_DENSITY
        fixtureDefinition.friction = Physics.DWARF_FRICTION
        fixtureDefinition.restitution = Physics.DWARF_RESTITUTION
        fixtureDefinition.shape = shapeDefinition
		
        body.CreateFixture( fixtureDefinition )
		
		
		
		Local yNeck:Float = 0.5 * WIDTH / Physics.SCALE - 0.5 * HEIGHT / Physics.SCALE
		
		
		
		Local headDefinition:b2BodyDef = New b2BodyDef()
		headDefinition.type = b2Body.b2_Body
		headDefinition.position.Set( x / Physics.SCALE, y / Physics.SCALE )
		
		head = world.CreateBody( headDefinition )
		
		Local shapeDefinition2:b2CircleShape = New b2CircleShape( 0.5 * WIDTH / Physics.SCALE + 0.1 )
		shapeDefinition2.SetLocalPosition( New b2Vec2( 0, yNeck ) )
		
		fixtureDefinition.shape = shapeDefinition2
		
		'head.CreateFixture( fixtureDefinition )
		
		
		#Rem
		Local neckDefinition:b2RevoluteJointDef = New b2RevoluteJointDef()
		neckDefinition.bodyA = body
		neckDefinition.bodyB = head
		neckDefinition.collideConnected = False
		neckDefinition.localAnchorA.x = 0; neckDefinition.localAnchorA.y = yNeck
		neckDefinition.localAnchorB.x = 0; neckDefinition.localAnchorB.y = yNeck
		
		neck = b2RevoluteJoint( world.CreateJoint( neckDefinition ) )
		#End
		
		
		Local feetDefinition:b2PolygonShape = New b2PolygonShape()
		feetDefinition.SetAsBox( 0.5 * WIDTH / Physics.SCALE, 0.5 / Physics.SCALE )
		
		For Local vertex:b2Vec2 = EachIn feetDefinition.GetVertices()
			vertex.y += 0.5 * HEIGHT / Physics.SCALE + 0.5 / Physics.SCALE
		Next
		
		Local feetFixtureDefinition:b2FixtureDef = New b2FixtureDef()
		feetFixtureDefinition.isSensor = True
		feetFixtureDefinition.shape = feetDefinition
				
		feet = body.CreateFixture( feetFixtureDefinition )
	End
	
	Method OnUpdate:Void()
		If ( feetTouching > 0 ) Then feetContactTime = Millisecs()
		feetValid = ( ( Millisecs() - feetContactTime ) <= Physics.JUMP_FORGIVENESS  )
		
		Local keyRight:Int = CONTROL_SCHEMES[player][CONTROL_RIGHT]
		Local keyLeft:Int = CONTROL_SCHEMES[player][CONTROL_LEFT]
		Local keyUp:Int = CONTROL_SCHEMES[player][CONTROL_UP]
		Local keyDown:Int = CONTROL_SCHEMES[player][CONTROL_DOWN]
		
		If KeyHit( keyRight ) Then facing = FACING_RIGHT
		If KeyHit( keyLeft ) Then facing = FACING_LEFT
		If KeyDown( keyRight ) And Not KeyDown( keyLeft ) Then facing = FACING_RIGHT
		If KeyDown( keyLeft ) And Not KeyDown( keyRight ) Then facing = FACING_LEFT
		
		If KeyDown( keyRight) And ( facing = FACING_RIGHT ) And ( feetValid )
			ApplyForceToBody( body, Physics.WALK_FORCE, 0 )
			
			If ( feetValid )
				Local torque:Float = AdjustTorque( Physics.WALK_TORQUE )
				body.ApplyTorque( torque )
			EndIf
		ElseIf KeyDown( keyLeft ) And ( facing = FACING_LEFT ) And ( feetValid )
			ApplyForceToBody( body, -Physics.WALK_FORCE, 0 )
			
			If ( feetValid )
				Local torque:Float = AdjustTorque( Physics.WALK_TORQUE )
				body.ApplyTorque( torque )
			EndIf
		Endif
		
		If KeyHit( keyUp ) And ( feetValid )
			body.SetLinearVelocity( New b2Vec2( body.GetLinearVelocity().x, 0 ) )
			ApplyImpulseToBody2( body, -Physics.JUMP_IMPULSE, body.GetAngle() )
		EndIf
		
		If KeyDown( keyDown )
			body.ApplyTorque( 10 )
		EndIf
	End
	
	Method AdjustTorque:Float( torque:Float )
		Local tick:Float = 15.0
		Local desiredAngle:Float = 0.0 + DegreesToRadians( Physics.LEAN ) * facing
		Local bodyAngle:Float = body.GetAngle()
		
		Local nextAngle:Float = bodyAngle + body.GetAngularVelocity() / tick
		Local totalRotation:Float = desiredAngle - nextAngle
		While ( totalRotation < DegreesToRadians(- 180 ) ); totalRotation += DegreesToRadians( 360 ); Wend
		While ( totalRotation > DegreesToRadians( 180 ) ); totalRotation -= DegreesToRadians( 360 ); Wend
		Local desiredAngularVelocity:Float = totalRotation * tick
		Return body.GetInertia() * desiredAngularVelocity / ( 1.0 / tick )
	
		'Return torque * body.GetAngle() / ( 2 * 3.1415 )
	End
	
	Method OnRender:Void()
		Local center:b2Vec2 = body.GetWorldCenter()
		'GLITCH Local orientation:Float = body.GetAngle()
		'GLITCH Local orientation:Float = body.GetAngle() / 3.1415 * 180.0
		Local orientation:Float = RadiansToDegrees( -body.GetAngle() )
		DrawImage( image, center.x * Physics.SCALE, center.y * Physics.SCALE, orientation, facing, 1 )
		
		DrawText( "#:" + feetTouching + "=" + BoolToString( feetValid ), center.x * Physics.SCALE - 15, center.y * Physics.SCALE - 50 )
	End
End




Class DwarfFeetContactListener Implements b2ContactListenerInterface
    Method BeginContact:Void( contact:b2Contact )
		If contact.IsTouching()
			For Local dwarf:Dwarf = EachIn [ APP.dwarf_one, APP.dwarf_two ]
				If ( contact.GetFixtureA() = dwarf.feet ) Or ( contact.GetFixtureB() = dwarf.feet )
					dwarf.OnBeginContact()
				EndIf
			Next
		EndIf
	End
	
    Method EndContact:Void(contact:b2Contact)
		'If contact.IsTouching()
			For Local dwarf:Dwarf = EachIn [ APP.dwarf_one, APP.dwarf_two ]
				If ( contact.GetFixtureA() = dwarf.feet ) Or ( contact.GetFixtureB() = dwarf.feet )
					dwarf.OnEndContact()
				EndIf
			Next
		'EndIf
	End
	
    Method PreSolve:Void( contact:b2Contact, oldManifold:b2Manifold ); End
	
    Method PostSolve:Void( contact:b2Contact, impulse:b2ContactImpulse ); End
End



