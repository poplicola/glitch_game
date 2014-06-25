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
			'TODO
		
		Default
			valueObject = fieldInfo.Type.NewInstance()
			Local parameters:Object[1]; parameters[0] = data.GetItem( name )
			GetClass( "IRubeObject" ).GetMethod( "LoadProperties", [ GetClass( "JSONObject" ) ] ).Invoke( valueObject, parameters )	
	End
	
	If ( valueObject <> Null ) Then fieldInfo.SetValue( instance, valueObject )
End


Class RubeVector Extends RubeObject
	Field x:Float, y:Float
End



Class RubeVectorArray Implements IRubeObject
	'TODO
	
	Method LoadProperties:Void( data:JSONObject )
		'TODO
	End
End



Class RubeArray<T> Implements IRubeObject
	Field values:T[]
	
	Method LoadProperties:Void( data:JSONObject )
		'TODO
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
	Field linearVelocity:Float
	Field massData_mass:Float
	Field massData_center:RubeVector
	Field massData_I:Float
	Field position:RubeVector
	Field fixture:RubeArray< RubeFixture >
	Field customProperties:RubeArray< RubeProperty >
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
	Field customProperties:RubeArray< RubeProperty >
End



Class RubeShape Implements IRubeObject
	Field type:String
	Field _data:RubeShapeData
	
	Method New( type:String )
		Self.type = type
		_data = New RubeShapeData()
	End
	
	Method LoadProperties:Void( data:JSONObject )
		_data.LoadProperties( data )
	End
End



Class RubeShapeData Extends RubeObject
	'circle
	Field center:RubeVector
	Field radius:Float
	
	'polygon
	Field vertices:RubeVectorArray
	
	'chain
	'Field vertices:RubeVectorArray
	Field hasNextVertex:Bool
	Field hasPrevVertex:Bool
	Field nextVertex:RubeVector
	Field prevVertex:RubeVector
End



Class RubeProperty Implements IRubeObject
	Field name:String
	Field type:String
	Field intValue:Int
	Field floatValue:Int
	Field boolValue:Bool
	Field stringValue:String
	Field vectorValue:RubeVector
	
	
	Method LoadProperties:Void( data:JSONObject )
		LoadProperty( data, Self, GetClass( Self ).GetField( "name" ) )
		'TODO
	End
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
	Field customProperties:RubeArray< RubeProperty >
End



Class RubeJoint Extends RubeObject
	Field type:String
	Field name:String
	Field customProperties:RubeArray< RubeProperty>
		
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
	
	'distance
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	Field dampingRatio:Float
	Field frequency:Float
	Field length:Float
	
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
	
	'rope
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	Field maxLength:Float
	
	'motor
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	Field maxForce:Float
	Field maxTorque:Float
	Field correctionFactor:Float
	
	'weld
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	'Field refAngle:Float
	'Field dampingRatio:Float
	'Field frequency:Float
	
	'friction
	'Field anchorA:RubeVector
	'Field anchorB:RubeVector
	'Field bodyA:Int
	'Field bodyB:Int
	'Field collideConnected:Bool
	'Field maxForce:Float
	'Field maxTorque:Float
End



Function LoadRube:RubeWorld( path:String )
	Local world:RubeWorld = New RubeWorld()
	Local data:JSONObject = JSONObject( JSONData.ReadJSON(  app.LoadString( path ) ) )
	world.LoadProperties( data )
	Return world
End