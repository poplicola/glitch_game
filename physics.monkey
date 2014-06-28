Class Physics
	Const SCALE:Float = 30
	
	Const GRAVITY:Float = 30
	
	Const HEAD_RADIUS:Float = 10
	Const HEAD_DENSITY:Float = 0.3
	Const HEAD_FRICTION:Float = 2.0
	
	Const DWARF_WIDTH:Int = 30
	Const DWARF_HEIGHT:Int = 30
	Const DWARF_MASS:Float = 30.0 * 50.0 * 0.7
	'Const DWARF_DENSITY:Float = 0.7
	Const DWARF_FRICTION:Float = 0.3'0.3
	Const DWARF_RESTITUTION:Float = 0.6'0.4'0.2
	
	Const BRICK_DENSITY:Float = 0.5
	Const BRICK_FRICTION:Float = 0.3'0.9
	Const BRICK_RESTITUTION:Float = 0.0
	
	Const MAX_SPEED:Float = 8'10
	Const WALK_FORCE_HEAD_MULTIPLIER:Float = 0.4
	Const WALK_FORCE:Float = 60.0 / ( 1 + WALK_FORCE_HEAD_MULTIPLIER )
	Const WALK_TORQUE_TICK:Float = 15
	Const TUMBLE_TORQUE:Float = 35
	Const JUMP_IMPULSE:Float = 20
	
	Const NECK_TORQUE:Float = 3
	Const NECK_TICK:Float = 15
	Const NECK_ANGLE:Float = 50
	
	Const LEAN:Float = 18
	
	Const JUMP_FORGIVENESS:Int = 100
	
	Const ATTACK_IMPULSE:Float = 30
	Const REBOUND_MULTIPLIER_SOFT:Float = 0.2
	Const REBOUND_MULTIPLIER_HARD:Float = 0.8
	
	Const HEALING:Float = 0.05
	
	
	Const DAMAGE_ACCELERATION_LOW:Float = 10
	Const DAMAGE_ACCELERATION_HIGH:Float = 30
	Const DAMAGE_ACCELERATION_CAP:Float = 30
End