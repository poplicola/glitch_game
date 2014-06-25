Strict


#REFLECTION_FILTER = "rubeloader"
Import reflection



Import main
Import json



Interface IRubeObject
	Method LoadProperties:Void( data:JSONObject )
End



Class RubeObject Implements IRubeObject
	Method LoadProperties:Void( data:JSONObject )
		For Local fieldInfo:FieldInfo = EachIn GetClass( Self ).GetFields( True )
			LoadProperty( data, Self, fieldInfo )
		Next
	End
End



Function LoadProperty:Void( data:JSONObject, instance:Object, fieldInfo:FieldInfo )
	Local name:String = fieldInfo.Name.Replace( "_", "-" )
	Local valueObject:Object
	
	Select fieldInfo.Type
		Case IntClass()
			valueObject = BoxInt( data.GetItem( name, IntObject( fieldInfo.GetValue( instance ) ).value ) )
		Case FloatClass()
			valueObject = BoxFloat( data.GetItem( name, FloatObject( fieldInfo.GetValue( instance ) ).value ) )
		Case BoolClass()
			valueObject = BoxBool( data.GetItem( name, BoolObject( fieldInfo.GetValue( instance ) ).value ) )
		Case StringClass()
			valueObject = BoxString( data.GetItem( name, StringObject( fieldInfo.GetValue( instance ) ).value ) )
		Case GetClass( "RubeShape" )
			For Local shapeName:String = EachIn [ "circle", "polygon", "chain" ]
				Local datum:JSONDataItem = data.GetItem( shapeName )
				If ( datum <> Null )
					Select shapeName
						Case "circle"
							valueObject = New RubeCircleShape()
						Case "polygon"
							valueObject = New RubePolygonShape()
						Case "chain"
							valueObject = New RubeChainShape()
							'todo open or closed
						Default
					End
					
					IRubeObject( valueObject ).LoadProperties( JSONObject( datum ) )
					Exit
				EndIf
			Next
		Default
			valueObject = fieldInfo.Type.NewInstance()
			IRubeObject( valueObject ).LoadProperties( JSONObject( data.GetItem( name ) ) )
	End
	
	If ( valueObject <> Null ) Then fieldInfo.SetValue( instance, valueObject )
End


Class RubeVector Extends RubeObject
	Field x:Float, y:Float
	
	Method Convert:b2Vec2()
		Return New b2Vec2( x, y )
	End
End



Class RubeVectorArray Implements IRubeObject
	Field x:Float[], y:Float[]
	
	Method LoadProperties:Void( data:JSONObject )
		Local xData:JSONArray = JSONArray( data.GetItem( "x" ) )
		Local yData:JSONArray = JSONArray( data.GetItem( "y" ) )
		
		Local xArray:JSONDataItem[] = xData.values.ToArray()
		Local yArray:JSONDataItem[] = yData.values.ToArray()
		
		x = New Float[ xArray.Length ]
		y = New Float[ yArray.Length ]
		
		For Local n:Int = 0 Until x.Length
			x[n] = xArray[n].ToFloat()
			y[n] = yArray[n].ToFloat()
		Next
	End
	
	Method Convert:b2Vec2[]()
		Local vectors:b2Vec2[] = New b2Vec2[ x.Length ]
		
		For Local n:Int = 0 Until x.Length
			vectors[n] = New b2Vec2( x[n], y[n] )
		Next
		
		Return vectors
	End
End



Class RubeArray<T> Implements IRubeObject
	Field values:T[]
	
	Method LoadProperties:Void( data:JSONObject )
		Local arr:JSONArray = JSONArray( data )
		
		values = New T[ arr.values.Count() ]
		
		Local n:Int = 0
		
		For Local value:JSONDataItem = EachIn arr
			values[n] = New T()
			IRubeObject( value[n] ).LoadProperties( JSONObject( value ) )
			n += 1
		Next
	End
End



Class RubeWorld Extends RubeObject
	Field gravity:RubeVector
	Field allowSleep:Bool
	Field autoClearForces:Bool
	Field positionIterations:Int
	Field velocityIterations:Int
	Field stepsPerSecond:Int
	Field warmStarting:Bool
	Field coninuousPhysics:Bool
	Field subStepping:Bool
	Field body:RubeArray< RubeBody >
	Field image:RubeArray< RubeImage >
	Field joint:RubeArray< RubeJoint >
	
	Method Convert:b2World()
		Local world:b2World = New b2World( gravity.Convert(), allowSleep )
		'TODO
		world.SetWarmStarting( warmStarting )
		
		Local n:Int, bodies:b2Body[] = New b2Body[ body.values.Length ]
		
		For Local rubeBody:RubeBody = EachIn body.values
			bodies[n] = rubeBody.Convert( world )
			n += 1
		Next
		
		'TODO
		
		For Local rubeJoint:RubeJoint = EachIn joint.values
			rubeJoint.Convert( world, bodies )
		Next
	End
End



Class RubeBody Extends RubeObject
	Field name:String
	Field type:Int
	Field angularDamping:Float
	Field angularVelocity:Float
	Field awake:Bool
	Field bullet:Bool
	Field fixedRotation:Bool
	Field linearDamping:Float
	Field linearVelocity:RubeVector
	Field massData_mass:Float			'not sure
	Field massData_center:RubeVector	'not sure
	Field massData_I:Float				'not sure
	Field position:RubeVector
	Field fixture:RubeArray< RubeFixture >
	'Field customProperties:RubeArray< RubeProperty >
	
	Method Convert:b2Body( world:b2World )
		Local bodyDefinition:b2BodyDef = New b2BodyDef()
		
		Select type
			Case 0 'static
				bodyDefinition.type = b2Body.b2_staticBody
			Case 1 'kinematic
				bodyDefinition.type = b2Body.b2_kinematicBody
			Case 2 'dynamic
				bodyDefinition.type = b2Body.b2_Body
			Default
		End
		
		bodyDefinition.angularDamping = angularDamping
		bodyDefinition.angularVelocity = angularVelocity
		bodyDefinition.awake = awake
		bodyDefinition.bullet = bullet
		bodyDefinition.fixedRotation = fixedRotation
		bodyDefinition.linearDamping = linearDamping
		bodyDefinition.linearVelocity = linearVelocity.Convert()
		
		bodyDefinition.position = position.Convert()
		
		Local body:b2Body = world.CreateBody( bodyDefinition )
		
		For Local rubeFixture:RubeFixture = EachIn fixture.values
			rubeFixture.Convert( body)
		Next
		
		Return body
	End
End



Class RubeFixture Extends RubeObject
	Field name:String
	Field density:Float
	Field filter_categoryBits:Int = 1
	Field filter_maskBits:Int = 65535
	Field filter_groupIndex:Int
	Field friction:Float
	Field restitution:Float
	Field sensor:Bool
	Field shape:RubeShape
	'Field customProperties:RubeArray< RubeProperty >
	
	Method Convert:b2Fixture( body:b2Body )
		Local fixtureDefinition:b2FixtureDef = New b2FixtureDef
		
		fixtureDefinition.density = density
		fixtureDefinition.filter = New b2FilterData()
			fixtureDefinition.filter.categoryBits = filter_categoryBits
			fixtureDefinition.filter.maskBits = filter_maskBits
			fixtureDefinition.filter.groupIndex = filter_groupIndex
		fixtureDefinition.friction = friction
		fixtureDefinition.restitution = restitution
		fixtureDefinition.isSensor = sensor
		fixtureDefinition.shape = shape.Convert()
		
		Return body.CreateFixture( fixtureDefinition )
	End
End



Class RubeShape Extends RubeObject
	Method Convert:b2Shape() Abstract
End



Class RubeCircleShape Extends RubeShape
	Field center:RubeVector
	Field radius:Float
	
	Method Convert:b2Shape()
		Local shape:b2CircleShape = New b2CircleShape( radius )
		shape.SetLocalPosition( center.Convert() )
		Return shape
	End
End



Class RubePolygonShape Extends RubeShape
	Field vertices:RubeVectorArray
	
	Method Convert:b2Shape()
		Local shape:b2PolygonShape = New b2PolygonShape()
		Local _vertices:b2Vec2[] = vertices.Convert()
		shape.SetAsArray( _vertices, _vertices.Length )
		Return shape
	End
End



Class RubeChainShape Extends RubeShape
	Field vertices:RubeVectorArray
	Field hasNextVertex:Bool
	Field hasPrevVertex:Bool
	Field nextVertex:RubeVector
	Field prevVertex:RubeVector
	
	Method Convert:b2Shape()
		'TODO
		Return Null
	End
End



#Rem
Class RubeProperty Implements IRubeObject
	Field name:String
	Field type:String
	Field _value:RubePropertyValue
	
	Method LoadProperties:Void( data:JSONObject )
		LoadProperty( data, Self, GetClass( Self ).GetField( "name" ) )
		'TODO
	End
End



Class RubePropertyValue< T > Implements IRubeObject
	Field _t:T = New T()
	
	Method LoadProperties:Void( data:JSONObject )
		Local valueObject:Object 
		
		Select GetClass( t )
			Case IntClass()
				valueObject = BoxInt( data.GetItem( "int", 0 ) )
			Case FloatClass()
				valueObject = BoxFloat( data.GetItem( "float", 0.0 ) )
			Case BoolClass()
				valueObject = BoxBool( data.GetItem( "bool", False ) )
			Case StringClass()
				valueObject = BoxString( data.GetItem( "string", "" ) )
			Case GetClass( "RubeVector" )
				'TODO
			Case GetClass( "RubeColor" )
				'TODO
			Default
		End
		
		'TODO
	End
End
#End



Class RubeColor
	'TODO
End



Class RubeImage Extends RubeObject
	Field name:String
	Field opacity:Float
	Field renderOrder:Float
	Field scale:Float
	Field aspectScale:Float
	Field angle:Float
	Field body:Int
	Field center:RubeVector
	Field corners:RubeVectorArray
	Field file:String
	Field filter:Int
	Field flip:Bool
	'TODO'Field colorTint:String
	'TODO'Field glDrawElements:
	'TODO'Field glTexCoordPointer:
	'TODO'Field glVertexPointer:
	'Field customProperties:RubeArray< RubeProperty >
End



Class RubeJoint Extends RubeObject
	Field type:String
	Field name:String
	'Field customProperties:RubeArray< RubeProperty>
		
	Method Convert:b2Joint( world:b2World, bodies:b2Body[] )
		Select type
			Case "revolute"
				Return ConvertRevolute( world, bodies )
			Case "distance"
				Return ConvertDistance( world, bodies )
			Case "prismatic"
				Return ConvertPrismatic( world, bodies )
			Case "wheel"
				Return ConvertWheel( world, bodies )
			Case "rope"
				Return ConvertRope( world, bodies )
			'Case "motor"
			'	Return ConvertMotor( world, bodies )
			Case "weld"
				Return ConvertWeld( world, bodies )
			Case "friction"
				Return ConvertFriction( world, bodies )
			Default
		End
		
		Return Null
	End
		
	'revolute
	Field anchorA:RubeVector
	Field anchorB:RubeVector
	Field bodyA:Int
	Field bodyB:Int
	Field collideConnected:Bool
	Field enableLimit:Bool
	Field enableMotor:Bool
	Field jointSpeed:Float
	Field lowerLimit:Float
	Field maxMotorTorque:Float
	Field motorSpeed:Float
	Field refAngle:Float
	Field upperLimit:Float
	
	Method ConvertRevolute:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2RevoluteJointDef = New b2RevoluteJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		jointDefinition.enableLimit = enableLimit
		jointDefinition.enableMotor = enableMotor
		'joint speed
		jointDefinition.lowerAngle = lowerLimit
		jointDefinition.maxMotorTorque = maxMotorTorque
		jointDefinition.motorSpeed = motorSpeed
		jointDefinition.referenceAngle = refAngle
		jointDefinition.upperAngle = upperLimit
		
		Return world.CreateJoint( jointDefinition )
	End
	
	'distance
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	Field dampingRatio:Float
	Field frequency:Float
	Field length:Float
	
	Method ConvertDistance:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2DistanceJointDef = New b2DistanceJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		'jointDefinition.enableLimit = enableLimit
		'jointDefinition.enableMotor = enableMotor
		'joint speed
		'jointDefinition.lowerAngle = lowerLimit
		'jointDefinition.maxMotorTorque = maxMotorTorque
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.referenceAngle = refAngle
		'jointDefinition.upperAngle = upperLimit
		jointDefinition.dampingRatio = dampingRatio
		jointDefinition.frequencyHz = frequency
		jointDefinition.Length = length
		
		Return world.CreateJoint( jointDefinition )
	End
	
	'prismatic
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	'Field enableLimit:Bool
	'Field enableMotor:Bool
	Field localAxisA:RubeVector
	'Field lowerLimit:Float
	Field maxMotorForce:Float
	'Field motorSpeed:Float
	'Field refAngle:Float
	'Field upperLimit:Float
	
	Method ConvertPrismatic:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2PrismaticJointDef = New b2PrismaticJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		jointDefinition.enableLimit = enableLimit
		jointDefinition.enableMotor = enableMotor
		jointDefinition.localAxisA = localAxisA.Convert()
		jointDefinition.lowerTranslation = lowerLimit
		jointDefinition.maxMotorForce = maxMotorForce
		jointDefinition.motorSpeed = motorSpeed
		jointDefinition.referenceAngle = refAngle
		jointDefinition.upperTranslation = upperLimit
		'joint speed
		'jointDefinition.lowerAngle = lowerLimit
		'jointDefinition.maxMotorTorque = maxMotorTorque
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.upperAngle = upperLimit
		'jointDefinition.dampingRatio = dampingRatio
		'jointDefinition.frequencyHz = frequency
		'jointDefinition.Length = length
		
		Return world.CreateJoint( jointDefinition )
	End
		
	'wheel
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	'Field enableMotor:Bool
	'Field localAxisA:RubeVector
	'Field maxMotorTorque:Float
	'Field motorSpeed:Float
	Field springDampingRatio:Float
	Field springFrequency:Float
	
	Method ConvertWheel:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2LineJointDef = New b2LineJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		jointDefinition.enableLimit = enableLimit
		jointDefinition.enableMotor = enableMotor
		jointDefinition.localAxisA = localAxisA.Convert()
		jointDefinition.lowerTranslation = lowerLimit
		jointDefinition.maxMotorForce = maxMotorForce
		jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.referenceAngle = refAngle
		jointDefinition.upperTranslation = upperLimit
		'joint speed
		'jointDefinition.lowerAngle = lowerLimit
		'jointDefinition.maxMotorTorque = maxMotorTorque
		jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.upperAngle = upperLimit
		'jointDefinition.dampingRatio = dampingRatio
		'jointDefinition.frequencyHz = frequency
		'jointDefinition.Length = length
		
		Return world.CreateJoint( jointDefinition )
	End
	
	'rope
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	Field maxLength:Float
	
	Method ConvertRope:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2RopeJointDef = New b2RopeJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		'jointDefinition.enableLimit = enableLimit
		'jointDefinition.enableMotor = enableMotor
		'jointDefinition.localAxisA = localAxisA.Convert()
		'jointDefinition.lowerTranslation = lowerLimit
		'jointDefinition.maxMotorForce = maxMotorForce
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.referenceAngle = refAngle
		'jointDefinition.upperTranslation = upperLimit
		'joint speed
		'jointDefinition.lowerAngle = lowerLimit
		'jointDefinition.maxMotorTorque = maxMotorTorque
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.upperAngle = upperLimit
		'jointDefinition.dampingRatio = dampingRatio
		'jointDefinition.frequencyHz = frequency
		'jointDefinition.Length = length
		jointDefinition.maxLength = maxLength
		
		Return world.CreateJoint( jointDefinition )
	End
	
	'motor
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	Field maxForce:Float
	Field maxTorque:Float
	Field correctionFactor:Float
	
	#Rem
	Method ConvertMotor:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		jointDefinition.enableLimit = enableLimit
		jointDefinition.enableMotor = enableMotor
		jointDefinition.localAxisA = localAxisA.Convert()
		jointDefinition.lowerTranslation = lowerLimit
		jointDefinition.maxMotorForce = maxMotorForce
		jointDefinition.motorSpeed = motorSpeed
		jointDefinition.referenceAngle = refAngle
		jointDefinition.upperTranslation = upperLimit
		'joint speed
		jointDefinition.lowerAngle = lowerLimit
		jointDefinition.maxMotorTorque = maxMotorTorque
		jointDefinition.motorSpeed = motorSpeed
		jointDefinition.upperAngle = upperLimit
		jointDefinition.dampingRatio = dampingRatio
		jointDefinition.frequencyHz = frequency
		jointDefinition.Length = length
		jointDefinition.maxLength = maxLength
		
		Return world.CreateJoint( jointDefinition )
	End
	#End
	
	'weld
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	'Field refAngle:Float
	'Field dampingRatio:Float
	'Field frequency:Float
	
	Method ConvertWeld:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2WeldJointDef = New b2WeldJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		'jointDefinition.enableLimit = enableLimit
		'jointDefinition.enableMotor = enableMotor
		'jointDefinition.localAxisA = localAxisA.Convert()
		'jointDefinition.lowerTranslation = lowerLimit
		'jointDefinition.maxMotorForce = maxMotorForce
		'jointDefinition.motorSpeed = motorSpeed
		jointDefinition.referenceAngle = refAngle
		'jointDefinition.upperTranslation = upperLimit
		'joint speed
		'jointDefinition.lowerAngle = lowerLimit
		'jointDefinition.maxMotorTorque = maxMotorTorque
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.upperAngle = upperLimit
		'jointDefinition.dampingRatio = dampingRatio
		'jointDefinition.frequencyHz = frequency
		'jointDefinition.Length = length
		'jointDefinition.maxLength = maxLength
		
		Return world.CreateJoint( jointDefinition )
	End
	
	'friction
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	'Field maxForce:Float
	'Field maxTorque:Float
	
	Method ConvertFriction:b2Joint( world:b2World, bodies:b2Body[] )
		Local jointDefinition:b2FrictionJointDef = New b2FrictionJointDef()
		
		jointDefinition.localAnchorA = anchorA.Convert()
		jointDefinition.localAnchorB = anchorB.Convert()
		jointDefinition.bodyA = bodies[ bodyA ]
		jointDefinition.bodyB = bodies[ bodyB ]
		jointDefinition.collideConnected = collideConnected
		'jointDefinition.enableLimit = enableLimit
		'jointDefinition.enableMotor = enableMotor
		'jointDefinition.localAxisA = localAxisA.Convert()
		'jointDefinition.lowerTranslation = lowerLimit
		'jointDefinition.maxMotorForce = maxMotorForce
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.referenceAngle = refAngle
		'jointDefinition.upperTranslation = upperLimit
		'joint speed
		'jointDefinition.lowerAngle = lowerLimit
		'jointDefinition.maxMotorTorque = maxMotorTorque
		'jointDefinition.motorSpeed = motorSpeed
		'jointDefinition.upperAngle = upperLimit
		'jointDefinition.dampingRatio = dampingRatio
		'jointDefinition.frequencyHz = frequency
		'jointDefinition.Length = length
		'jointDefinition.maxLength = maxLength
		jointDefinition.maxForce = maxForce
		jointDefinition.maxTorque = maxTorque
		
		Return world.CreateJoint( jointDefinition )
	End
End



Function LoadRube:RubeWorld( path:String )
	Local world:RubeWorld = New RubeWorld()
	Local data:JSONObject = JSONObject( JSONData.ReadJSON( app.LoadString( path ) ) )
	world.LoadProperties( data )
	Return world
End