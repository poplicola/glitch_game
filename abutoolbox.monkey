Class Arrays<T>
	Function Fill:T[]( value:T, length:Int )
		Local arr:T[ length ]
		
		For Local n := 0 Until length
			arr[ n ] = value
		Next
		
		Return arr
	End
	
	Function Range:T[]( length:Int )
		Local arr:T[ length ]
		
		For Local n:Int = 0 Until length
			arr[ n ] = n
		Next
		
		Return arr
	End
	
	Function Range:T[]( low:Int, high:Int )
		Local arr:T[ high - low + 1 ]
		
		For Local n:Int = 0 Until arr.Length
			arr[ n ] = n + low
		Next
		
		Return arr
	End
	
	Function Concantenate:T[]( a:T[], b:T[] )
		a = a.Resize( a.Length + b.Length )
		
		For Local n := 0 Until b.Length
			a[ a.Length - n - 1 ] = b[ b.Length - n - 1 ]
		Next
	End
End