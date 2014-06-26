Strict



Import main



Global CONTROL_SCHEME_WASD:Int[] = [KEY_W, KEY_D, KEY_S, KEY_A, KEY_T]
Global CONTROL_SCHEME_ARROWS:Int[] = [KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT, KEY_COMMA]
Global CONTROL_SCHEMES:Int[][] = [CONTROL_SCHEME_WASD, CONTROL_SCHEME_ARROWS]
Const CONTROL_UP:Int = 0, CONTROL_RIGHT:Int = 1, CONTROL_DOWN:Int = 2, CONTROL_LEFT:Int = 3, CONTROL_ACTION:Int = 4



Const FACING_LEFT:Int = -1, FACING_RIGHT:Int = 1



Class Dwarf Implements IOnAnimationEnd, IOnAnimationFrameChange
	Global FRAME_START:Int[] = [ 0, 3 * 20 ]
	Global image:Image
	Global sheet:Image, sheet2:Image
	
	Field player:Int
	Field x:Float, y:Float, facing:Int
	Field body:b2Body, head:b2Body, neck:b2RevoluteJoint, feet:b2Fixture, bodyFixture:b2Fixture
	Field feetTouching:Int, feetContactTime:Int, feetValid:Bool
	Field jumpPressed:Int, jumpValid:Bool
	Field animationDelegate:AnimationDelegate
	Field attacking:Bool
	Field hit:b2Fixture[2], others:List< b2Fixture >[2]
	Field headlessFacing:Float
	
	Method _center:b2Vec2() Property
		Local xCenter:Float = ( body.GetWorldCenter().x * body.GetMass() + head.GetWorldCenter().x  * head.GetMass() ) / ( body.GetMass() + head.GetMass() )
		Local yCenter:Float = ( body.GetWorldCenter().y * body.GetMass() + head.GetWorldCenter().y  * head.GetMass() ) / ( body.GetMass() + head.GetMass() )
		Return New b2Vec2( xCenter, yCenter )
	End
	
	Method center:b2Vec2() Property
		Return body.GetWorldCenter()
	End
	
	Method headCenter:b2Vec2() Property
		Return head.GetWorldCenter()
	End

	Method New( Player:Int, Start_x:Float, Start_y:Float )
		Self.player = Player;
		Self.x = Start_x;
		Self.y = Start_y;
		facing = 1 - 2 * Player
		CreateBody()
		
		animationDelegate = New AnimationDelegate( Self )
		
		animationJuggler.Add( animationDelegate )
		
		animationDelegate.AddAnimation( "idle", [ 0, 1, 2, 3 ], 120, True )
		animationDelegate.AddAnimation( "run", [ 4, 5, 6, 7, 8 ], 60, True )
		animationDelegate.AddAnimation( "attack", [ 10, 11, 12, 13 ], [ 100.0, 120, 60, 100 ], False )
		
		animationDelegate.PlayAnimation( "idle" )
		
		For Local n:Int = 0 To 1
			others[n] = New List< b2Fixture >()
		Next
	End
	
	Method OnBeginContact:Void()
		feetTouching += 1
		If ( feetTouching > 0 ) Then feetContactTime = Millisecs()
	End
	
	Method OnEndContact:Void(); feetTouching -= 1; End
	
	Method OnBeginHit:Void( which:Int, other:b2Fixture )
		If Not others[which].Contains( other )
			others[which].AddLast( other )
		EndIf
	End
	
	Method OnEndHit:Void( which:Int, other:b2Fixture )
		others[which].RemoveEach( other )
	End
	
	Method OnAnimationEnd:Void( name:String )
		Select name
			Case "attack"
				attacking = False
		End
	End
	
	Method OnAnimationFrameChange:Void( name:String, frame:Int, framePrevious:Int )
		If ( name = "attack" ) And ( frame = 12 )
			Local rebound:Bool
			
			Local bodies:List< b2Body > = New List< b2Body >()
			
			For Local fixture:b2Fixture = EachIn others[ ( facing + 1 ) / 2 ]
				Local dwarf:Dwarf = OtherDwarf( Self )
				
				Local okay:Bool = True
				
				For Local n:Int = 0 To 1
					If ( fixture = dwarf.hit[n] )
						If dwarf.animationDelegate.currentFrame <> 12 Then okay = False
						If ( dwarf.facing + 1 ) / 2 <> n Then okay = False
					EndIf
				Next
				
				If okay = False Then Exit
			
				Local _body:b2Body = fixture.GetBody()
				
				If Not bodies.Contains( _body )
					bodies.AddLast( _body )
				End
			Next
			
			For Local _body:b2Body = EachIn bodies
				'GLITCH'APP.universe.m_world.DestroyBody( fixture.GetBody() )
				If _body.GetType() = b2Body.b2_staticBody
					rebound = True
				Else
					Local attackVector:b2Vec2 = New b2Vec2()
					body.GetWorldVector( New b2Vec2( Physics.ATTACK_IMPULSE * facing, 0 ), attackVector )
					_body.ApplyImpulse( attackVector, center )
				EndIf
			Next
			
			If Not bodies.IsEmpty()
				Local multiplier:Float = Physics.REBOUND_MULTIPLIER_SOFT
			
				If rebound = True Then multiplier = Physics.REBOUND_MULTIPLIER_HARD
				'replace 'rebound = True' above with this code for glitch
				Local attackVector:b2Vec2 = New b2Vec2()
				body.GetWorldVector( New b2Vec2( -Physics.ATTACK_IMPULSE * facing * multiplier, 0 ), attackVector )
				Local offcenter:b2Vec2 = New b2Vec2( center.x, center.y - 8 / Physics.SCALE )
				body.ApplyImpulse( attackVector, offcenter )
			EndIf
		EndIf
	End
	
	Method CreateBody:Void()
		Local world:b2World = APP.universe.m_world
		
		Local bodyDefinition:b2BodyDef = New b2BodyDef()
        bodyDefinition.type = b2Body.b2_Body
		bodyDefinition.position.Set( x / Physics.SCALE, y / Physics.SCALE )
		bodyDefinition.fixedRotation = False
		
        body = world.CreateBody( bodyDefinition )
		
		Local shapeDefinition:b2PolygonShape = New b2PolygonShape()
		shapeDefinition.SetAsBox( 0.5 * Physics.DWARF_WIDTH / Physics.SCALE, 0.5 * Physics.DWARF_HEIGHT / Physics.SCALE )
		
        Local fixtureDefinition:b2FixtureDef = New b2FixtureDef()
		Local mass:Float = Physics.DWARF_MASS - ( Physics.HEAD_RADIUS * Physics.HEAD_RADIUS ) * 3.1415 * Physics.HEAD_DENSITY
		Local density:Float = mass / ( Physics.DWARF_WIDTH * Physics.DWARF_HEIGHT )
        fixtureDefinition.density = density'Physics.DWARF_DENSITY
        fixtureDefinition.friction = Physics.DWARF_FRICTION
        fixtureDefinition.restitution = Physics.DWARF_RESTITUTION
        fixtureDefinition.shape = shapeDefinition
		
        bodyFixture = body.CreateFixture( fixtureDefinition )
		
		
		
		Local yNeck:Float = -26 / Physics.SCALE
		
		
		
		Local headDefinition:b2BodyDef = New b2BodyDef()
		headDefinition.type = b2Body.b2_Body
		headDefinition.position.Set( x / Physics.SCALE, y / Physics.SCALE )
		
		head = world.CreateBody( headDefinition )
		
		Local shapeDefinition2:b2CircleShape = New b2CircleShape( Physics.HEAD_RADIUS / Physics.SCALE + 0.1 )
		shapeDefinition2.SetLocalPosition( New b2Vec2( 0, yNeck ) )
		
		fixtureDefinition.density = Physics.HEAD_DENSITY
		fixtureDefinition.friction = Physics.HEAD_FRICTION
		fixtureDefinition.shape = shapeDefinition2
		
		head.CreateFixture( fixtureDefinition )
		
		
		
		Local yNeck2:Float = -13 / Physics.SCALE
		
		
		Local neckDefinition:b2RevoluteJointDef = New b2RevoluteJointDef()
		neckDefinition.bodyA = body
		neckDefinition.bodyB = head
		neckDefinition.collideConnected = False
		neckDefinition.localAnchorA.x = 0; neckDefinition.localAnchorA.y = yNeck2
		neckDefinition.localAnchorB.x = 0; neckDefinition.localAnchorB.y = yNeck2
		
		'exclude this for GLITCH
		neckDefinition.enableLimit = True
		neckDefinition.lowerAngle = DegreesToRadians( -Physics.NECK_ANGLE )
		neckDefinition.upperAngle = DegreesToRadians( Physics.NECK_ANGLE )
		
		neckDefinition.enableMotor = True
		neckDefinition.maxMotorTorque = Physics.NECK_TORQUE
		
		neck = b2RevoluteJoint( world.CreateJoint( neckDefinition ) )
		
		
		Local feetDefinition:b2PolygonShape = New b2PolygonShape()
		feetDefinition.SetAsBox( 0.6 * Physics.DWARF_WIDTH / Physics.SCALE, 0.5 / Physics.SCALE )
		
		For Local vertex:b2Vec2 = EachIn feetDefinition.GetVertices()
			vertex.y += 0.5 * Physics.DWARF_HEIGHT / Physics.SCALE + 0.5 / Physics.SCALE
		Next
		
		Local feetFixtureDefinition:b2FixtureDef = New b2FixtureDef()
		feetFixtureDefinition.isSensor = True
		feetFixtureDefinition.shape = feetDefinition
				
		feet = body.CreateFixture( feetFixtureDefinition )
		
		
		
		Local hitDefinition:b2PolygonShape = New b2PolygonShape()
		Local vertices:b2Vec2[] = [ New b2Vec2( ( 29 - 52 ) / Physics.SCALE, ( 6 - 56 ) / Physics.SCALE ), New b2Vec2( ( 57 - 52 ) / Physics.SCALE, ( 14 - 56 ) / Physics.SCALE ), New b2Vec2( ( 23 - 52 ) / Physics.SCALE, ( 36 - 56 ) / Physics.SCALE ), New b2Vec2( ( 6 - 52 ) / Physics.SCALE, ( 65 - 56 ) / Physics.SCALE ), New b2Vec2( ( 1 - 52 ) / Physics.SCALE, ( 54 - 56 ) / Physics.SCALE ), New b2Vec2( ( 4 - 52 ) / Physics.SCALE, ( 29 - 56 ) / Physics.SCALE ) ]
		hitDefinition.SetAsArray( vertices, 6 )
		
		Local hitFixtureDefinition:b2FixtureDef = New b2FixtureDef()
		hitFixtureDefinition.isSensor = True
		hitFixtureDefinition.shape = hitDefinition
		
		hit[0] = body.CreateFixture( hitFixtureDefinition )
		
		vertices =                [ New b2Vec2( -( 29 - 52 ) / Physics.SCALE, ( 6 - 56 ) / Physics.SCALE ), New b2Vec2( -( 57 - 52 ) / Physics.SCALE, ( 14 - 56 ) / Physics.SCALE ), New b2Vec2( -( 23 - 52 ) / Physics.SCALE, ( 36 - 56 ) / Physics.SCALE ), New b2Vec2( -( 6 - 52 ) / Physics.SCALE, ( 65 - 56 ) / Physics.SCALE ), New b2Vec2( -( 1 - 52 ) / Physics.SCALE, ( 54 - 56 ) / Physics.SCALE ), New b2Vec2( -( 4 - 52 ) / Physics.SCALE, ( 29 - 56 ) / Physics.SCALE ) ]
		hitDefinition.SetAsArray( Arrays< b2Vec2 >.Reverse( vertices ), 6 )
		hitFixtureDefinition.shape = hitDefinition
		
		hit[1] = body.CreateFixture( hitFixtureDefinition )
		
			Local massData:b2MassData = New b2MassData()
			body.GetMassData( massData )
			massData.center = New b2Vec2( _center.x - body.GetWorldCenter().x, _center.y - body.GetWorldCenter().y )
			body.SetMassData( massData )
	End
	
	Method OnUpdate:Void()		
		If ( feetTouching > 0 ) Then feetContactTime = Millisecs()
		feetValid = ( ( Millisecs() - feetContactTime ) <= Physics.JUMP_FORGIVENESS  )
		
		Local keyRight:Int = CONTROL_SCHEMES[player][CONTROL_RIGHT]
		Local keyLeft:Int = CONTROL_SCHEMES[player][CONTROL_LEFT]
		Local keyUp:Int = CONTROL_SCHEMES[player][CONTROL_UP]
		Local keyDown:Int = CONTROL_SCHEMES[player][CONTROL_DOWN]
		Local keyAction:Int = CONTROL_SCHEMES[player][CONTROL_ACTION]	
		
		If Not attacking
			If KeyHit( keyRight ) Then facing = FACING_RIGHT
			If KeyHit( keyLeft ) Then facing = FACING_LEFT
			If KeyDown( keyRight ) And Not KeyDown( keyLeft ) Then facing = FACING_RIGHT
			If KeyDown( keyLeft ) And Not KeyDown( keyRight ) Then facing = FACING_LEFT
		EndIf
		
		If KeyDown( keyRight) And ( facing = FACING_RIGHT ) And ( feetValid )
			If ( body.GetLinearVelocity().x < Physics.MAX_SPEED )
				body.ApplyForce( New b2Vec2( Physics.WALK_FORCE, 0 ), center )
				If neck <> Null Then head.ApplyForce( New b2Vec2( Physics.WALK_FORCE * Physics.WALK_FORCE_HEAD_MULTIPLIER, 0 ), headCenter )
			EndIf
			
			If ( feetValid )
				Local torque:Float = AdjustTorque( 0.0 + DegreesToRadians( Physics.LEAN ) * facing )
				body.ApplyTorque( torque )
			EndIf
		ElseIf KeyDown( keyLeft ) And ( facing = FACING_LEFT ) And ( feetValid )
			If ( body.GetLinearVelocity().x > - Physics.MAX_SPEED )
				body.ApplyForce( New b2Vec2( -Physics.WALK_FORCE, 0 ), center )
				If neck <> Null Then head.ApplyForce( New b2Vec2( -Physics.WALK_FORCE * Physics.WALK_FORCE_HEAD_MULTIPLIER, 0 ), headCenter )
			EndIf
			
			If ( feetValid )
				Local torque:Float = AdjustTorque( 0.0 + DegreesToRadians( Physics.LEAN ) * facing )
				body.ApplyTorque( torque )
			EndIf
		Endif
		
		If KeyHit( keyUp )
			jumpPressed = Millisecs()
		EndIf
		
		jumpValid = ( ( Millisecs() - jumpPressed ) <= Physics.JUMP_FORGIVENESS )
				
		If ( jumpValid ) And ( feetValid )
			body.SetLinearVelocity( New b2Vec2( body.GetLinearVelocity().x, 0 ) )
			ApplyImpulseToBody3( body, center, -Physics.JUMP_IMPULSE, body.GetAngle() )
			jumpPressed -= Physics.JUMP_FORGIVENESS
		EndIf
		
		If KeyDown( keyDown ) And ( feetValid )
			Local torque:Float = AdjustTorque( 0.0 )
			body.ApplyTorque( torque )
		EndIf
		
		UpdateNeck()
		
		If KeyHit( keyAction ) And Not attacking
			attacking = True
			animationDelegate.PlayAnimation( "attack" )
		EndIf
		
		If attacking = False
			If ( KeyDown( keyRight ) Or KeyDown( keyLeft ) Or ( KeyDown( keyDown ) And ( Abs( body.GetAngle() ) > 0.1 ) ) ) And ( feetValid )
				animationDelegate.PlayAnimation( "run" ) 
			Else
				animationDelegate.PlayAnimation( "idle" )
			EndIf
		EndIf
	End
	
	Method UpdateNeck:Void()
		If neck = Null Then Return
		
		Local tick:Float = Physics.NECK_TICK
		Local angle:Float = neck.GetJointAngle()
		Local desiredAngle:Float = 0.0
		
		Local nextAngle:Float = angle + neck.GetJointSpeed() / tick
		Local totalRotation:Float = desiredAngle - nextAngle
		While ( totalRotation < DegreesToRadians(- 180 ) ); totalRotation += DegreesToRadians( 360 ); Wend
		While ( totalRotation > DegreesToRadians( 180 ) ); totalRotation -= DegreesToRadians( 360 ); Wend
		Local desiredAngularVelocity:Float = totalRotation * tick
		
		Local torque:Float = body.GetInertia() * desiredAngularVelocity / ( 1.0 / tick )
		
		neck.SetMotorSpeed( desiredAngularVelocity )
	End
	
	Method AdjustTorque:Float( desiredAngle:FLoat )
		Local tick:Float = Physics.WALK_TORQUE_TICK
		Local bodyAngle:Float = body.GetAngle()
		
		Local nextAngle:Float = bodyAngle + body.GetAngularVelocity() / tick
		Local totalRotation:Float = desiredAngle - nextAngle
		While ( totalRotation < DegreesToRadians(- 180 ) ); totalRotation += DegreesToRadians( 360 ); Wend
		While ( totalRotation > DegreesToRadians( 180 ) ); totalRotation -= DegreesToRadians( 360 ); Wend
		Local desiredAngularVelocity:Float = totalRotation * tick
		Return body.GetInertia() * desiredAngularVelocity / ( 1.0 / tick )
	End
	
	Method OnRender:Void()
		Local center:b2Vec2 = New b2Vec2()
		bodyFixture.GetAABB().GetCenter( center )
		'GLITCH Local orientation:Float = body.GetAngle()
		'GLITCH Local orientation:Float = body.GetAngle() / 3.1415 * 180.0
		Local orientation:Float = RadiansToDegrees( -body.GetAngle() )
		Local frame:Int = FRAME_START[player] + animationDelegate.currentFrame
		'DrawImage( image, center.x * Physics.SCALE, center.y * Physics.SCALE, orientation, facing, 1 )
		DrawImage( sheet, center.x * Physics.SCALE, center.y * Physics.SCALE, orientation, -facing, 1, frame )
		
		Local center2:b2Vec2 = head.GetWorldCenter()
		Local orientation2:Float = RadiansToDegrees( -head.GetAngle() )
		Local frame2:Int = frame
		Local facing2:Float = facing
		If neck = Null
			frame2 = FRAME_START[player]
			facing2 = headlessFacing
		EndIf
		DrawImage( sheet2, center2.x * Physics.SCALE, center2.y * Physics.SCALE, orientation2, -facing2, 1, frame2 )
		
		'''DrawText( "#:" + feetTouching + "=" + BoolToString( feetValid ), center.x * Physics.SCALE - 15, center.y * Physics.SCALE - 50 )
	End
End



