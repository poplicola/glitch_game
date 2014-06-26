Strict



Import main
Import json


Const OFFSET_X:Float = 320, OFFSET_Y:Float = 480



Function LoadRube:Void( path:String, _world:b2World )
	Local data:JSONObject = JSONObject( JSONData.ReadJSON( app.LoadString( path ) ) )
	
	Local bodies:JSONArray = JSONArray( data.GetItem( "body" ) )
	
	For Local datum:JSONDataItem = EachIn bodies
		Print "body"
		Local bodyData:JSONObject = JSONObject( datum )
		Local bodyDef:b2BodyDef = New b2BodyDef()
		
		Local bodyType:Int = bodyData.GetItem( "type", 0 )
		
		Select bodyType
			Case 0
				bodyDef.type = b2Body.b2_staticBody
			Case 1
				bodyDef.type = b2Body.b2_kinematicBody
			Case 2
				bodyDef.type = b2Body.b2_Body
			Default
		End
		
		Local body:b2Body = _world.CreateBody( bodyDef )
		
		Local fixtures:JSONArray = JSONArray( bodyData.GetItem( "fixture" ) )
		
		For Local datum2:JSONDataItem = EachIn fixtures
			Local fixtureData:JSONObject = JSONObject( datum2 )
			Local fixtureDef:b2FixtureDef = New b2FixtureDef()
			fixtureDef.density = Physics.BRICK_DENSITY 'fixtureData.GetItem( "density", 0.0 )
			fixtureDef.friction = Physics.BRICK_FRICTION 'fixtureData.GetItem( "friction", 0.0 )
			fixtureDef.restitution = Physics.BRICK_RESTITUTION 'fixtureData.GetItem( "restitution", 0.0 )
			
			Local shapeData:JSONObject = JSONObject( fixtureData.GetItem( "polygon" ) )
			Local verticesData:JSONObject = JSONObject( shapeData.GetItem( "vertices" ) )
			Local xData:JSONArray = JSONArray( verticesData.GetItem( "x" ) )
			Local yData:JSONArray = JSONArray( verticesData.GetItem( "y" ) )
			
			Local xList:FloatList = New FloatList()
			Local yList:FloatList = New FloatList()
			
			For Local datum3:JSONDataItem = EachIn xData
				xList.AddLast( datum3.ToFloat() + OFFSET_X / Physics.SCALE )
			Next
			
			For Local datum3:JSONDataItem = EachIn yData
				yList.AddLast( datum3.ToFloat() + OFFSET_Y / Physics.SCALE )
			Next
			
			Local xArray:Float[] = xList.ToArray()
			Local yArray:Float[] = yList.ToArray()
			Local b2Vec2Array:b2Vec2[] = New b2Vec2[ xArray.Length ]
			
			For Local n:Int = 0 Until xArray.Length()
				b2Vec2Array[n] = New b2Vec2( xArray[n], yArray[n] )
			Next
			
			Local shapeDef:b2PolygonShape = New b2PolygonShape()
			shapeDef.SetAsArray( b2Vec2Array, xArray.Length )
			
			fixtureDef.shape = shapeDef
			
			body.CreateFixture( fixtureDef )
		Next
	Next
End