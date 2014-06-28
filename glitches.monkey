Strict



Import main



Class Glitch
	Global HEADLESS:Glitch = New HeadlessGlitch()
	Global JETPACK:Glitch = New JetpackGlitch()
	Global SPACE:Glitch = New SpaceGlitch()
	Global TUMBLEWEED:Glitch = New TumbleweedGlitch()
	
	Global ALL:Glitch[] = [ HEADLESS, JETPACK, SPACE, TUMBLEWEED ]
	Global SEVERITY_PHASES:Int[] = [ 0, 25, 40, 50, 60, 100, 125, 140, 150, 160, 180, 190, 200 ]
									'0,  1,  2,  3,  4,   5,   6,   7,   8,   9,  10,  11,  12 ]
	Global COUNT:Int[] =		   [ 0,  1,  1,  1,  1,   2,   2,   2,   2,   3,   3,   3,   4 ]
	'Global WHICH:IntList[12]
	Global whichPrevious:IntList
	Global severityPrevious:Int
	Global STATE:Bool[ ALL.Length ]
	
	#Rem
	Function Initialize:Void()
		Local options:IntList[ 4 ]
		
		For Local n:Int = 0 To 3
			options[n] = New IntList()
			
			For Local w:Int = 0 To n
				For Local m:Int = 0 To 3
					options[n].AddLast( m )
				Next
			Next
		Next
		
		
		For Local n:Int = 0 Until WHICH.Length()
			WHICH[n] = New IntList()
			
			For Local m:Int = 0 To COUNT[n]
				If m <> 0
					Local valid:Bool = True, choice:Int, iterations:Int
					
					Repeat
						choice = Rnd( ALL.Length + 1 )
						If WHICH[n].Contains( choice ) Or Not options[ COUNT[n] ].Contains( choice )
							valid = False
							'Print "WHICH[" + n + "] already contains " + choice
						EndIf
						
						iterations += 1
					Until ( valid = True ) Or ( iterations = 99 )
					
					WHICH[n].AddLast( choice )
					options[ COUNT[n] ].RemoveEach( choice )
				EndIf
			Next
		Next
	End
	#End
	
	Function Update:Void()
		Local damageTotal:Int = 200 - APP.hud.health[0] - APP.hud.health[1]
		Local severity:Int
		
		For Local n:Int = 0 Until SEVERITY_PHASES.Length()
			If  damageTotal > SEVERITY_PHASES[ n ] Then severity = n
		Next
		
		If severity > severityPrevious
			Seed = Millisecs()
		
			Local which:IntList, valid:Bool = False, iterations2:Int = 0
			
			Repeat
				Local iterations:Int = 0
				which = New IntList()
				
				Repeat
					Local choice:Int = Rnd( 4 )
					If Not which.Contains( choice ) Then which.AddLast( choice )
					iterations += 1
				Until which.Count() = COUNT[ severity ] Or iterations = 99
				
				If iterations = 99
					Local out:String = "Should have: " + COUNT[ severity ] + " actually has: "
					
					For Local i:Int = EachIn which
						out += i + ", "
					Next
					
					Print out	
				EndIf
				
				If whichPrevious = Null
					valid = True
				Else
					For Local i:Int = EachIn which
						If Not whichPrevious.Contains( i ) Then valid = True
					Next
				EndIf
				
				iterations2 += 1
			Until valid = True Or iterations2 = 99
			
			whichPrevious = which
			
			If iterations2 = 99
				Print "something went wrong part 2"
			EndIf
			
			For Local n:Int = 0 To 3
				If which.Contains( n )
				'If WHICH[ severity ].Contains( n )
					ToggleGlitchById( n, True )
				Else
					ToggleGlitchById( n, False )
				EndIf
			Next
			
			APP.hud.EnablePopup()
		EndIf
		
		severityPrevious = severity
	End
	
	Function ToggleGlitchById:Void( id:Int, state:bool )
		If ALL[ id ].state = state Then Return
		ALL[ id ].state = state
		
		If ALL[ id ].state = True
			ALL[ id ].OnStart()
			If ( ALL[ id ].sound <> Null ) Then PlaySound( ALL[ id ].sound )
			Print( ALL[ id ].name + " ON" )
		Else
			ALL[ id ].OnFinish()
			Print( ALL[ id ].name + " OFF" )
		EndIf
	End
	
	Field state:Bool
	Field name:String
	Field sound:Sound
	
	Method OnStart:Void() Abstract
	Method OnFinish:Void() Abstract
End



Class HeadlessGlitch Extends Glitch
	Method New()
		name = "HEADLESS"
	End
	
	Method OnStart:Void()
		For Local dwarf:Dwarf = EachIn APP.dwarves
			APP.world._world.DestroyJoint( dwarf.neck )
			dwarf.neck = Null
			dwarf.headlessFacing = dwarf.facing
			dwarf.head.SetBullet( True )
		Next
	End
	
	Method OnFinish:Void()
		For Local dwarf:Dwarf = EachIn APP.dwarves
			dwarf.CreateNeck()
		Next
	End
End



Class JetpackGlitch Extends Glitch
	Method New()
		name = "JETPACK"	
	End
	
	Method OnStart:Void(); End
	
	Method OnFinish:Void(); End
End



Class SpaceGlitch Extends Glitch
	Method New()
		name = "SPACE"
	End
	
	Method OnStart:Void()
		APP.world._world.SetGravity( New b2Vec2( 0.0, 3.0 ) )
	End
	
	Method OnFinish:Void()
		APP.world._world.SetGravity( New b2Vec2( 0.0, 30.0 ) )
	End
End



Class TumbleweedGlitch Extends Glitch
	Method New()
		name = "TUMBLEWEED"	
	End
	
	Method OnStart:Void(); End
	
	Method OnFinish:Void(); End
End
