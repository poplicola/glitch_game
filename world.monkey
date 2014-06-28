Strict



Import main



Class Universe
	Field width:Int = 640
    Field height:Int = 480
	
    Const frameRate:Int = 30
    Const physicsRate:Int = 60
    Const physicsFrameMS:Float = 1000.0/physicsRate
    Const physicsFramesPerRender:Int = Float(physicsRate)/frameRate
    Field nextFrame:Float = 0.0
	
	Field m_display:FlashSprite
	Field m_sprite:FlashSprite
	Field m_world:b2World
    Field m_bomb:b2Body
    Field m_mouseJoint:b2MouseJoint
    Field m_velocityIterations:Int = 10
    Field m_positionIterations:Int = 10
    Field m_timeStep:Float = 1.0/physicsRate
	
	Method New()
		m_display = New FlashSprite()
		m_sprite = New FlashSprite()
        m_display.AddChild(m_sprite)
		
		Local m_sprite:FlashSprite = m_display
		
        Local worldAABB :b2AABB = New b2AABB()
        worldAABB.lowerBound.Set(-1000.0, -1000.0)
        worldAABB.upperBound.Set(1000.0, 1000.0)
        '// Define the gravity vector
        Local gravity :b2Vec2 = New b2Vec2(0.0, 30.0)
        '// Allow bodies to sleep
        Local doSleep :Bool = False'''True
        '// Construct a world object
        m_world = New b2World(gravity, True )
        m_world.SetWarmStarting(True)
        '// set debug draw
        Local dbgDraw :b2DebugDraw = New b2DebugDraw()
        
        dbgDraw.SetSprite(m_sprite)
        dbgDraw.SetDrawScale(30.0)
        dbgDraw.SetFillAlpha(0.3)
        dbgDraw.SetLineThickness(1.0)
        dbgDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit)'| b2DebugDraw.e_pairBit)
        m_world.SetDebugDraw(dbgDraw)
        
        '// Create border of boxes
        Local wall :b2PolygonShape= New b2PolygonShape()
        Local wallBd :b2BodyDef = New b2BodyDef()
        Local wallB :b2Body
        
        '// Left
        wallBd.position.Set( -95.0 / Physics.SCALE, height / Physics.SCALE / 2.0 )
        wall.SetAsBox( 100.0 / Physics.SCALE, ( height + 100.0 ) / Physics.SCALE / 2.0 )
        wallB = m_world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
        '// Right
        wallBd.position.Set( ( width + 95.0 ) / Physics.SCALE, height / Physics.SCALE / 2.0 )
        wallB = m_world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
        '// Top
        wallBd.position.Set( width / Physics.SCALE / 2, -95.0 / Physics.SCALE)
        wall.SetAsBox( ( width + 100.0 ) / Physics.SCALE / 2.0, 100.0 / Physics.SCALE )
        wallB = m_world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
        '// Bottom
        wall.SetAsBox( ( width + 100.0 ) / Physics.SCALE / 2.0, 100.0 / Physics.SCALE )
        wallBd.position.Set( width / Physics.SCALE / 2.0, ( height + 95.0 ) / Physics.SCALE )
        wallB = m_world.CreateBody( wallBd )
        wallB.CreateFixture2( wall )
		
		m_world.SetContactListener( New MyContactListener() )
	End
	
	Method Load:Void( path:String )
		LoadRube( path, m_world )
	End
	
	Method OnRender:Void()
		'GLICTH UpdatePhysics() 'have this here instead of Update, rendering is a frame behind
		m_world.DrawDebugData()
		m_sprite.OnRender( 0, 0 )
	End
	
	Method OnUpdate:Void()
		Local ms:Int = Millisecs()
		
        If ( nextFrame = 0.0 ) Or ( ms - nextFrame > physicsFramesPerRender * physicsFrameMS )
            nextFrame = Float( ms ) - physicsFramesPerRender * physicsFrameMS
        End
		
        While ( nextFrame < ms )
         '// update current test
         Update()
         nextFrame += physicsFrameMS
        End
	End
	
	Method Update:Void()
        UpdateMouseWorld()
        MouseDestroy()
        MouseDrag()
		
        m_world.TimeStep( m_timeStep, m_velocityIterations, m_positionIterations )
        m_world.ClearForces()
    End
	
	
	
    '// world mouse position
    Global mouseXWorldPhys:Float
    Global mouseYWorldPhys:Float
    Global mouseXWorld:Float
    Global mouseYWorld:Float
	
    '//===========
    '// Update mouseWorld
    '//===========
    Method UpdateMouseWorld : void ()
        
        mouseXWorldPhys = (MouseX())/Physics.SCALE
        mouseYWorldPhys = (MouseY())/Physics.SCALE
        mouseXWorld = (MouseX())
        mouseYWorld = (MouseY())
    End
    '//===========
    '// Mouse Drag
    '//===========
    Method MouseDrag : void ()
        
        '// mouse press
        If (MouseDown()  And  Not(m_mouseJoint))
            Local body :b2Body = GetBodyAtMouse()
            If (body)
                
                Local md :b2MouseJointDef = New b2MouseJointDef()
                md.bodyA = m_world.GetGroundBody()
                md.bodyB = body
                md.target.Set(mouseXWorldPhys, mouseYWorldPhys)
                md.collideConnected = True
                md.maxForce = 300.0 * body.GetMass()
                m_mouseJoint = b2MouseJoint(m_world.CreateJoint(md))
                body.SetAwake(True)
            End
        End
        '// mouse release
        If (Not(MouseDown()))
            
            If (m_mouseJoint)
                
                m_world.DestroyJoint(m_mouseJoint)
                m_mouseJoint = null
            End
        End
        '// mouse move
        If (m_mouseJoint)
            
            Local p2 :b2Vec2 = New b2Vec2(mouseXWorldPhys, mouseYWorldPhys)
            m_mouseJoint.SetTarget(p2)
        End
    End
    '//===========
    '// Mouse Destroy
    '//===========
    Method MouseDestroy : void ()
        
        '// mouse press
        If (Not(MouseDown()) And KeyHit(68) > 0)
            Local body :b2Body = GetBodyAtMouse(True)
            If (body)
                
                m_world.DestroyBody(body)
                Return
            End
        End
    End
    '//===========
    '// GetBodyAtMouse
    '//===========
    Field mousePVec:b2Vec2 = New b2Vec2()
    
    Method GetBodyAtMouse : b2Body (includeStatic:Bool = False)
        
        '// Make a small box.
        mousePVec.Set(mouseXWorldPhys, mouseYWorldPhys)
        Local aabb:b2AABB = New b2AABB()
        
        aabb.lowerBound.Set(mouseXWorldPhys - 0.001, mouseYWorldPhys - 0.001)
        aabb.upperBound.Set(mouseXWorldPhys + 0.001, mouseYWorldPhys + 0.001)
        
        Local callback:TestQueryAABBCallback = New TestQueryAABBCallback(includeStatic,mousePVec)
        Local fixture:b2Fixture
        
        m_world.QueryAABB(callback, aabb)
        Return callback.body
    End
End