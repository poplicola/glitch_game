Strict



Import main



Class World
	Const frameRate:Int = 30
	Const physicsRate:Int = 60
	Const physicsFrameMS:Float = 1000.0/physicsRate
	Const physicsFramesPerRender:Int = Float(physicsRate)/frameRate
	Field nextFrame:Float = 0.0
	
	Field _display:FlashSprite
	Field _sprite:FlashSprite
	Field _world:b2World
	
	Field m_velocityIterations:Int = 10
	Field m_positionIterations:Int = 10
	Field m_timeStep:Float = 1.0/physicsRate
	
	Method New()
		_display = New FlashSprite()
		_sprite = New FlashSprite()
		_display.AddChild( _sprite )
		
		'?
		Local worldAABB:b2AABB = New b2AABB()
		worldAABB.lowerBound.Set( -1000.0, -1000.0 )
		worldAABB.upperBound.Set( 1000.0, 1000.0 )
		
		Local gravity:b2Vec2 = New b2Vec2( 0.0, 30.0 )
		_world = New b2World( gravity, True )
		_world.SetWarmStarting( True )
		
		Local dbgDraw :b2DebugDraw = New b2DebugDraw()
		
		dbgDraw.SetSprite( _display )
		dbgDraw.SetDrawScale( 30.0 )
		dbgDraw.SetFillAlpha( 0.3 )
		dbgDraw.SetLineThickness( 1.0 )
		dbgDraw.SetFlags( b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit )
		_world.SetDebugDraw( dbgDraw )
		
		CreateWalls()
		
		_world.SetContactListener( New MyContactListener() )
	End
	
	Method CreateWalls:Void()
		Local width:Float = WORLD_WIDTH, height:Float = WORLD_HEIGHT
		'// Create border of boxes
        Local wall :b2PolygonShape= New b2PolygonShape()
        Local wallBd :b2BodyDef = New b2BodyDef()
        Local wallB :b2Body
        
        '// Left
        wallBd.position.Set( -95.0 / Physics.SCALE, height / Physics.SCALE / 2.0 )
        wall.SetAsBox( 100.0 / Physics.SCALE, ( height + 100.0 ) / Physics.SCALE / 2.0 )
        wallB = _world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
        '// Right
        wallBd.position.Set( ( width + 95.0 ) / Physics.SCALE, height / Physics.SCALE / 2.0 )
        wallB = _world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
        '// Top
        wallBd.position.Set( width / Physics.SCALE / 2, -95.0 / Physics.SCALE)
        wall.SetAsBox( ( width + 100.0 ) / Physics.SCALE / 2.0, 100.0 / Physics.SCALE )
        wallB = _world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
        '// Bottom
        wall.SetAsBox( ( width + 100.0 ) / Physics.SCALE / 2.0, 100.0 / Physics.SCALE )
        wallBd.position.Set( width / Physics.SCALE / 2.0, ( height + 95.0 ) / Physics.SCALE )
        wallB = _world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
	End
	
	Method Load:Void( path:String )
		LoadRube( path, _world )
	End
	
	Method OnRender:Void()
		_world.DrawDebugData()
		_sprite.OnRender( 0, 0 )
	End
	
	Method OnUpdate:Void()
		Local ms:Int = Millisecs()
		
		If ( nextFrame = 0.0 ) Or ( ms - nextFrame > physicsFramesPerRender * physicsFrameMS )
			nextFrame = Float( ms ) - physicsFramesPerRender * physicsFrameMS
		End
		
		While ( nextFrame < ms )
			_world.TimeStep( m_timeStep, m_velocityIterations, m_positionIterations )
			_world.ClearForces()
			nextFrame += physicsFrameMS
		End
	End
End