Strict



Import abutime
Import abutoolbox



Global autoManageAnimations:Bool = False
Global animationJuggler:AnimationJuggler = New AnimationJuggler()



Interface IOnAnimationFrameChange			'messy
	Method OnAnimationFrameChange:Void( name:String, frame:Int, framePrevious:Int )
End



Interface IOnAnimationLoop
	Method OnAnimationLoop:Void( name:String )
End



Interface IOnAnimationEnd
	Method OnAnimationEnd:Void( name:String )
End



Interface IAnimationObject
	Method UpdateAnimation:Void( timeElapsed:Float )
End



Class AnimationJuggler Extends JugglerGeneric<IAnimationObject>
	Method UpdatePin:Void( pin:IAnimationObject, timeElapsed:Float )
		pin.UpdateAnimation( timeElapsed )
	End
End



Class AnimationDelegate Implements IAnimationObject
	Field parent:Object
	Field link:list.Node<IAnimationObject>
	
	Field accumulation:Float, paused:Bool, rate:Float
	Field index:Int, loopCount:Int, stopped:Bool
	Field _currentAnimation:AnimationInfo
	
	Field animations:StringMap<AnimationInfo>
	
	Method currentAnimation:String() Property; Return _currentAnimation.name; End
	Method currentFrame:Int() Property; Return _currentAnimation.sequence[index]; End
	
	Method New( parent:Object = Null )
		Self.parent = parent
		If autoManageAnimations Then link = animationJuggler.Add( Self )
		
		animations = New StringMap<AnimationInfo>()
	End
	
	Method Finalize:Void()
		If link <> Null Then link.Remove()
	End
	
	Method AddAnimation:Void( name:String, sequence:Int[], duration:Float, loop:Bool = True )
		animations.Set( name, New AnimationInfo( name, sequence, Arrays<Float>.Fill( duration, sequence.Length ), loop ) )
	End
	
	Method AddAnimation:Void( name:String, sequence:Int[], durationSequence:Float[], loop:Bool = True )
		animations.Set( name, New AnimationInfo( name, sequence, durationSequence, loop ) )
	End
	
	Method PlayAnimation:Void( name:String )
		If ( _currentAnimation <> Null )
			If ( _currentAnimation.name = name )	'rewrite this block
				If Not _currentAnimation.loop
					ResetAnimation()
				EndIf
			Else
				ResetAnimation()
			EndIf
		EndIf
		
		_currentAnimation = animations.Get( name )
	End
	
	Method SwapAnimation:Void( name:String )
		_currentAnimation = animations.Get( name )
	End
	
	Method ResetAnimation:Void()
		accumulation = 0
		index = 0
		loopCount = 0
		stopped = False
	End
	
	Method UpdateAnimation:Void( timeElapsed:Float )
		If _currentAnimation = Null Then Return
		
		accumulation += timeElapsed
		
		While accumulation >= _currentAnimation.duration[index]
			accumulation -= _currentAnimation.duration[index]
			
			If _IncrementIndex() Then Return
		Wend
	End
	
	Method _IncrementIndex:Bool()
		Local framePrevious:Int = _currentAnimation.sequence[index]
		
		index += 1
		
		If index = _currentAnimation.sequence.Length
			If _currentAnimation.loop
				index = 0
				loopCount += 1
				_OnAnimationLoop( _currentAnimation.name )
			Else
				index = _currentAnimation.sequence.Length - 1
				loopCount = 1	'I DON'T LIKE THIS
				stopped = True
				_OnAnimationEnd( _currentAnimation.name )
				Return True
			EndIf
		EndIf
		
		_OnAnimationFrameChange( _currentAnimation.name, _currentAnimation.sequence[index], framePrevious )
		
		Return False
	End
	
	Method _OnAnimationFrameChange:Void( name:String, frame:Int, framePrevious:Int )
		Local iOnAnimationFrameChange:IOnAnimationFrameChange = IOnAnimationFrameChange( parent )
		If ( iOnAnimationFrameChange <> Null ) Then iOnAnimationFrameChange.OnAnimationFrameChange( name, frame, framePrevious)
	End
	
	Method _OnAnimationLoop:Void( name:String )
		Local iOnAnimationLoop:IOnAnimationLoop = IOnAnimationLoop( parent )
		If ( iOnAnimationLoop <> Null ) Then iOnAnimationLoop.OnAnimationLoop( name )
	End
	
	Method _OnAnimationEnd:Void( name:String )
		Local iOnAnimationEnd:IOnAnimationEnd = IOnAnimationEnd( parent )
		If ( iOnAnimationEnd <> Null ) Then iOnAnimationEnd.OnAnimationEnd( name )
	End
End



Class AnimationInfo
	Field name:String
	Field sequence:Int[]
	Field duration:Float[]
	Field loop:Bool
	
	Method New( name:String, sequence:Int[], duration:Float[], loop:Bool )
		Self.name = name
		Self.sequence = sequence
		Self.duration = duration
		Self.loop = loop
	End
End