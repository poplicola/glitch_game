Strict



Import main



Class MyContactListener Implements b2ContactListenerInterface
    Method BeginContact:Void( contact:b2Contact )
		If contact.IsTouching()
			For Local dwarf:Dwarf = EachIn [ APP.dwarf_one, APP.dwarf_two ]
				For Local n:Int = 0 To 1
					If ( contact.GetFixtureA() = dwarf.hit[n] )' And Not ( contact.GetFixtureB().GetBody() = dwarf.head )
						dwarf.OnBeginHit( n, contact.GetFixtureB() )
					ElseIf ( contact.GetFixtureB() = dwarf.hit[n] )' And Not ( contact.GetFixtureA().GetBody() = dwarf.head )
						dwarf.OnBeginHit( n, contact.GetFixtureA() )
					EndIf
				Next	
			
				If ( contact.GetFixtureA() = dwarf.feet ) Or ( contact.GetFixtureB() = dwarf.feet )
					dwarf.OnBeginContact()
				EndIf
			Next
		EndIf
	End
	
    Method EndContact:Void(contact:b2Contact)
		'If contact.IsTouching()
			For Local dwarf:Dwarf = EachIn [ APP.dwarf_one, APP.dwarf_two ]
				For Local n:Int = 0 To 1
					If ( contact.GetFixtureA() = dwarf.hit[n] )' And Not ( contact.GetFixtureB().GetBody() = dwarf.head )
						dwarf.OnEndHit( n, contact.GetFixtureB() )
					ElseIf ( contact.GetFixtureB() = dwarf.hit[n] )' And Not ( contact.GetFixtureA().GetBody() = dwarf.head )
						dwarf.OnEndHit( n, contact.GetFixtureA() )
					EndIf
				Next
				
				If ( contact.GetFixtureA() = dwarf.feet ) Or ( contact.GetFixtureB() = dwarf.feet )
					dwarf.OnEndContact()
				EndIf
			Next
		'EndIf
	End
	
    Method PreSolve:Void( contact:b2Contact, oldManifold:b2Manifold ); End
	
    Method PostSolve:Void( contact:b2Contact, impulse:b2ContactImpulse ); End
End