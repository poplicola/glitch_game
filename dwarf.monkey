Strict



Import main



Global CONTROL_SCHEME_WASD:Int[] = [KEY_W, KEY_D, KEY_S, KEY_A, KEY_T]
Global CONTROL_SCHEME_ARROWS:Int[] = [KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT, KEY_COMMA]
Global CONTROL_SCHEMES:Int[][] = [CONTROL_SCHEME_WASD, CONTROL_SCHEME_ARROWS]
Const CONTROL_UP:Int = 0, CONTROL_RIGHT:Int = 1, CONTROL_DOWN:Int = 2, CONTROL_LEFT:Int = 3, CONTROL_ACTION:Int = 4



Const FACING_LEFT:Int = -1, FACING_RIGHT:Int = 1



Class Dwarf Implements IOnAnimationEnd, IOnAnimationFrameChange
	Global FRAME_START:Int[] = [ 0, 3 * 20 ]
	Global sheet:Image, sheet2:Image
	
	Field player:Int
	Field facing:Int
	Field animationDelegate:AnimationDelegate
	
	Field body:b2Body, head:b2Body, neck:b2RevoluteJoint, feet:b2Fixture, bodyFixture:b2Fixture
	Field feetTouching:Int, feetContactTime:Int, feetValid:Bool
	Field jumpPressed:Int, jumpValid:Bool
	
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

	Method New( player:Int, xStart:Float, yStart:Float )
		Self.player = player;
		facing = 1 - 2 * player
		CreateBody( xStart, yStart )
		
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
				For Local dwarf:Dwarf = EachIn APP.dwarves
					If ( dwarf <> Self )
						Local okay:Bool = True
						
						For Local n:Int = 0 To 1
							If ( fixture = dwarf.hit[n] )
								If dwarf.animationDelegate.currentFrame <> 12 Then okay = False
								If ( dwarf.facing + 1 ) / 2 <> n Then okay = False
							EndIf
						Next
						
						If okay = True
							Local body:b2Body = fixture.GetBody()
							
							If Not bodies.Contains( body )
								bodies.AddLast( fixture.GetBody() )
							EndIf
						EndIf
					EndIf
				Next
			Next
			
			For Local _body:b2Body = EachIn bodies
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
	
	Method CreateBody:Void( xStart:Float, yStart:Float )
		Local world:b2World = APP.world._world
		
		Local bodyDefinition:b2BodyDef = New b2BodyDef()
        bodyDefinition.type = b2Body.b2_Body
		bodyDefinition.position.Set( xStart / Physics.SCALE, yStart / Physics.SCALE )
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
		headDefinition.position.Set( xStart / Physics.SCALE, yStart / Physics.SCALE )
		
		head = world.CreateBody( headDefinition )
		
		Local shapeDefinition2:b2CircleShape = New b2CircleShape( Physics.HEAD_RADIUS / Physics.SCALE + 0.1 )
		shapeDefinition2.SetLocalPosition( New b2Vec2( 0, yNeck ) )
		
		fixtureDefinition.density = Physics.HEAD_DENSITY
		fixtureDefinition.friction = Physics.HEAD_FRICTION
		fixtureDefinition.shape = shapeDefinition2
		
		head.CreateFixture( fixtureDefinition )
		
		
		
		
		CreateNeck()
		
		
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
	
	Method CreateNeck:Void()
		Local world:b2World = APP.world._world
		
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
	End
	
	Method OnUpdate:Void()		
		If ( feetTouching > 0 ) Then feetContactTime = Millisecs()
		Local _feetValid:Bool = ( ( Millisecs() - feetContactTime ) <= Physics.JUMP_FORGIVENESS  )
		feetValid = ( _feetValid Or ( Glitch.JETPACK.state = True ) )
		
		Local keyRight:Int = CONTROL_SCHEMES[player][CONTROL_RIGHT]
		Local keyLeft:Int = CONTROL_SCHEMES[player][CONTROL_LEFT]
		Local keyUp:Int = CONTROL_SCHEMES[player][CONTROL_UP]
		Local keyDown:Int = CONTROL_SCHEMES[player][CONTROL_DOWN]
		Local keyAction:Int = CONTROL_SCHEMES[player][CONTROL_ACTION]
		
		keyRight = [ KEY_JOY0_RIGHT, KEY_JOY1_RIGHT, KEY_JOY2_RIGHT, KEY_JOY3_RIGHT ][ player ]
		keyLeft = [ KEY_JOY0_LEFT, KEY_JOY1_LEFT, KEY_JOY2_LEFT, KEY_JOY3_LEFT ][ player ]
		keyUp = [ KEY_JOY0_UP, KEY_JOY1_UP, KEY_JOY2_UP, KEY_JOY3_UP ][ player ]
		keyDown = [ KEY_JOY0_DOWN, KEY_JOY1_DOWN, KEY_JOY2_DOWN, KEY_JOY3_DOWN ][ player ]
		keyAction = [ KEY_JOY0_A, KEY_JOY1_A, KEY_JOY2_A, KEY_JOY3_A ][ player ]
		
		If ( Not attacking ) And feetValid
			If KeyHit( keyRight ) Then facing = FACING_RIGHT
			If KeyHit( keyLeft ) Then facing = FACING_LEFT
			If KeyDown( keyRight ) And Not KeyDown( keyLeft ) Then facing = FACING_RIGHT
			If KeyDown( keyLeft ) And Not KeyDown( keyRight ) Then facing = FACING_LEFT
		EndIf
		
		If KeyDown( keyRight) And ( facing = FACING_RIGHT )
			If ( feetValid ) Or ( Glitch.TUMBLEWEED.state = True )
				If ( body.GetLinearVelocity().x < Physics.MAX_SPEED )
					body.ApplyForce( New b2Vec2( Physics.WALK_FORCE, 0 ), center )
					If neck <> Null Then head.ApplyForce( New b2Vec2( Physics.WALK_FORCE * Physics.WALK_FORCE_HEAD_MULTIPLIER, 0 ), headCenter )
				EndIf
		
				Local torque:Float = AdjustTorque( 0.0 + DegreesToRadians( Physics.LEAN ) * facing, facing )
				body.ApplyTorque( torque )
			EndIf
		ElseIf KeyDown( keyLeft ) And ( facing = FACING_LEFT )
			If ( feetValid ) Or ( Glitch.TUMBLEWEED.state = True )
				If ( body.GetLinearVelocity().x > - Physics.MAX_SPEED )
					body.ApplyForce( New b2Vec2( -Physics.WALK_FORCE, 0 ), center )
					If neck <> Null Then head.ApplyForce( New b2Vec2( -Physics.WALK_FORCE * Physics.WALK_FORCE_HEAD_MULTIPLIER, 0 ), headCenter )
				EndIf
			
				Local torque:Float = AdjustTorque( 0.0 + DegreesToRadians( Physics.LEAN ) * facing, facing )
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
			jumpValid = False
		EndIf
		
		If KeyDown( keyDown ) And ( feetValid )
			Local torque:Float = AdjustTorque( 0.0, 0.0 )
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
	
	Field v:Float, velocityPrevious:b2Vec2
	
	Field a:Float
	
	Method UpdateNeck:Void()
		#Rem
		If v = 0.0 Then v = ( player * 2 - 1 ) * 0.005
		APP.hud.sticker[player] += v
		If APP.hud.sticker[player] > 1.0
			APP.hud.sticker[player] = 1.0
			v = -v
		EndIf
		If APP.hud.sticker[player] < 0.0
			APP.hud.sticker[player] = 0.0
			v = -v
		EndIf
		#End
		
		APP.hud.sticker[player] = Max( 0.0, APP.hud.sticker[player] - Physics.HEALING )
		
		Local velocity:b2Vec2 = head.GetLinearVelocity()
		If velocityPrevious = Null Then velocityPrevious = velocity.Copy()
		Local velocityTemp:b2Vec2 = velocity.Copy()
		velocityTemp.Subtract( velocityPrevious )
		Local acceleration:Float = velocityTemp.Length()
		acceleration = Abs( acceleration )
		a = acceleration
		If acceleration > Physics.DAMAGE_ACCELERATION_LOW
			Local damage:Float = ( acceleration - Physics.DAMAGE_ACCELERATION_LOW ) / ( Physics.DAMAGE_ACCELERATION_HIGH - Physics.DAMAGE_ACCELERATION_LOW )
			If damage > APP.hud.sticker[player] Then APP.hud.sticker[player] = Min( damage, Physics.DAMAGE_ACCELERATION_CAP / ( Physics.DAMAGE_ACCELERATION_HIGH - Physics.DAMAGE_ACCELERATION_LOW ) )
			If APP.hud.sticker[player] * ( Physics.DAMAGE_ACCELERATION_HIGH - Physics.DAMAGE_ACCELERATION_LOW ) >= Physics.DAMAGE_ACCELERATION_HIGH
				APP.hud.health[player] -= 1
			EndIf
		EndIf
		velocityPrevious = velocity.Copy()

	
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
	
	Method AdjustTorque:Float( desiredAngle:Float, facing:Float )
		If ( Glitch.TUMBLEWEED.state = True ) And Not ( facing = 0.0 ) Then Return Physics.TUMBLE_TORQUE * facing
	
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
		
		'DrawText( "#:" + others[ ( facing + 1 ) / 2 ].Count(), center.x * Physics.SCALE - 15, center.y * Physics.SCALE - 50 )
	'DrawText( "#:" + Int( a ), center.x * Physics.SCALE - 15, center.y * Physics.SCALE - 50 )
		'''DrawText( "#:" + feetTouching + "=" + BoolToString( feetValid ), center.x * Physics.SCALE - 15, center.y * Physics.SCALE - 50 )
	End
End



