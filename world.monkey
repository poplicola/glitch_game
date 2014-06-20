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
    Field m_physScale:Float = 30
	
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
        m_world = New b2World(gravity, doSleep)
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
        wallBd.position.Set( -95 / m_physScale, height / m_physScale / 2)
        wall.SetAsBox(100/m_physScale, height+100/m_physScale/2)
        wallB = m_world.CreateBody(wallBd)
        wallB.CreateFixture2(wall)
        '// Right
        wallBd.position.Set((width+95) / m_physScale, height / m_physScale / 2)
        wallB = m_world.CreateBody(wallBd)
        wallB.CreateFixture2(wall)
        '// Top
        wallBd.position.Set(width / m_physScale / 2, -95 / m_physScale)
        wall.SetAsBox(width+100/m_physScale/2, 100/m_physScale)
        wallB = m_world.CreateBody(wallBd)
        wallB.CreateFixture2(wall)
        '// Bottom
        wall.SetAsBox(width+100/m_physScale/2, 100/m_physScale)
        wallBd.position.Set(width / m_physScale / 2, (height + 95) / m_physScale)
        wallB = m_world.CreateBody(wallBd)
        wallB.CreateFixture2(wall)
	End
	
	Method Initialize:Void()
		MakeDwarf( APP.dwarf_one, m_world )
		MakeDwarf( APP.dwarf_two, m_world )
	End
	
    Const dwidth := 
    Const dheight := Dwarf.HEIGHT
    Field ddensity:Float
    Const dfriction:Float = 0.6
	
	Method MakeDwarf:Void( dwarf:Dwarf, world:b2World )
		Local x:Float = dwarf.x, y:Float = dwarf.y
		
		
		Local shapeDefinition:b2PolygonShape = New b2PolygonShape()
		shapeDefinition.SetAsBox( 0.5 * Dwarf.WIDTH / m_physScale, 0.5 * Dwarf.WIDTH / m_physScale )
		
        Local fixtureDefinition:b2FixtureDef = New b2FixtureDef()
        fixtureDefinition.density = ddensity
        fixtureDefinition.friction = dfriction
        fixtureDefinition.restitution = 0.2
        fixtureDefinition.shape = shapeDefinition
		
		Local bodyDefinition:b2BodyDef = New b2BodyDef()
        bodyDefinition.type = b2Body.b2_Body
		bodyDefinition.position.Set( x/m_physScale, y/m_physScale)
		
        Local myBody := world.CreateBody(bodyDefinition)
        myBody.CreateFixture(fixtureDefinition)
		
		
		
		
		dwarf.body = myBody
	End
	
	Method OnRender:Void()
		PhysicsUpdate()
		_OnRender()
		m_sprite.OnRender(0,0)
	End
	
    Method _OnRender:Void()
        '// Render
        m_world.DrawDebugData()
    End
	
	Method PhysicsUpdate:Void()
		Local ms:Int = Millisecs()
		
        If nextFrame = 0.0 Or (ms - nextFrame) > (physicsFramesPerRender*physicsFrameMS)
            nextFrame = Float(ms)-physicsFramesPerRender*physicsFrameMS
        End
		
        While nextFrame < ms 
         '// update current test
         Update()'''m_currTest.Update()
         nextFrame += physicsFrameMS
        End
	End
	
	Method Update : void ()
        '// Update mouse joint
        UpdateMouseWorld()
        MouseDestroy()
        MouseDrag()
        '// Update physics
        '''FpsCounter.testInstance.StartPhysics()
        m_world.TimeStep(m_timeStep, m_velocityIterations, m_positionIterations)
        m_world.ClearForces()
        '''FpsCounter.testInstance.EndPhysics()
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
        
        mouseXWorldPhys = (MouseX())/m_physScale
        mouseYWorldPhys = (MouseY())/m_physScale
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