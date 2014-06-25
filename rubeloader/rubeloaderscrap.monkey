Strict


#REFLECTION_FILTER = "rubeloader"
Import reflection



Import main
Import json



Interface IRubeObject
	
End



Class RubeObject Implements IRubeObject
	
End



Class RubeVector Extends RubeObject
	Field x:Float, y:Float
End



Class RubeArray<T> Implements IRubeObject
	'TODO
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



Function LoadRube:RubeWorld( path:String )
	Local world:b2World
		
	Local data:JSONObject = JSONObject( JSONData.ReadJSON(  app.LoadString( path ) ) )
	Local gravity:JSONObject = world.GetItem( "" )
		Local x:Float, y:Float
		
		If gravity <> Null
			x = gravity.GetItem( "x", 0.0 )
			y = gravity.GetItem( "y", 0.0 )
		EndIf
		
	Local allowSleep:Bool = data.GetItem( "allowSleep", False )
	
	world = New b2World( New b2Vec2( x, y ), allowSleep )
	
	'''Local autoClearForces:Bool = data.GetItem( "autoClearForces", False )
	'''Local positionIterations:Int = data.GetItem( "positionIterations", 0 )
	'''Local velocityIterations:Int = data.GetItem( "velocityIterations", 0 )
	'''Local stepsPerSecond:Int = data.GetItem( "stepsPerSecond", 0 )
	Local warmStarting:Bool = data.GetItem( "warmStarting", False )
	Local continuousPhysics:Bool = data.GetItem( "continuousPhysics", False )
	Local subStepping:Bool = data.GetItem( "subStepping", False )
	
	world.SetWarmStarting( warmStarting )
	
	Local bodies:JSONArray = JSONArray( data.GetItem( "body" ) )
		For Local item:JSONDataItem = EachIn bodies
			Local data:JSONObject = JSONObject( item )
			
			Local name:String = data.GetItem( "name", "" )
			Local type:Int = data.GetItem( "type", 0 )
			Local angle:Float = data.GetItem( "angle", 0.0 )
			Local angularDamping:Float = data.GetItem( "angularDamping", 0.0 )
			Local angularVelocity:Float = data.GetItem( "angularVelocity", 0.0 )
			Local awake:Bool = data.GetItem( "awake", False )
			Local bullet:Bool = data.GetItem( "bullet", False )
			Local fixedRotation:Bool = data.GetItem( "fixedRotation", False )
			Local linearDamping:Float = data.GetItem( "linearDamping" )
		Next
		'TODO
	Local images:JSONArray = JSONArray( data.GetItem( "image" ) )
		'TODO
	Local joints:JSONArray = JSONArray( data.GetItem( "joint" ) )
		'TODO
End