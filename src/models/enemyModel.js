import HealthModel from "./healthModel.js";

export default class EnemyModel {
  constructor(x, y, speed = 80) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.speed = speed;
    this.moving = false; // Prevents erratic movement
    this.direction = "down"; // Default direction
    this.health = new HealthModel(this, 50); // Orc has 50 health
    this.attackDamage = 5;
    this.attackRange = 50;
    this.attackCooldown = 1200; // 1.2 seconds cooldown
    this.lastAttackTime = 0;
    this.aggroRadius = 200;
    this.player = null;
    this.view = null; // View will be set later
  }

  setView(view) {
    this.view = view;
  }

  setPlayer(player) {
    this.player = player;
  }

  getRandomPosition() {
    return {
      x: Phaser.Math.Between(100, 700),
      y: Phaser.Math.Between(100, 500),
    };
  }

  isPlayerInAggroRange() {
    if (!this.player) return false;
    const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    return distance <= this.aggroRadius;
  }

  updateDirection() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      this.direction = dx > 0 ? "right" : "left";
    } else {
      this.direction = dy > 0 ? "down" : "up";
    }
  }

  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.moving = true;
    this.updateDirection(); // Determine movement direction

    if (this.view) {
      this.view.startMoving(this.direction);
    }
  }

  update(deltaTime, currentTime) {
    if (!this.player) return;

    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    console.log(this.player.x, this.player.y)

    // Check if player is in range to attack
    if (distanceToPlayer <= this.attackRange) {
        console.log("Enemy within attack range, stopping movement.");
        this.moving = false;
        
        if (this.view) {
            this.view.stopMoving();  // Ensure animation stops
        }

        // Attack if cooldown allows
        if (this.canAttack(this.player, currentTime)) {
            console.log("Attacking player!");
            this.attack(this.player, currentTime);
        }

        return; // Stop moving if within attack range
    }

    // If out of attack range but still within aggro, move toward player
    if (this.isPlayerInAggroRange()) {
        console.log("Chasing player...");
        this.moveTo(this.player.x, this.player.y);
    } else if (!this.moving) {
        console.log("Wandering randomly...");
        const newPos = this.getRandomPosition();
        this.moveTo(newPos.x, newPos.y);
    }

    // Handle movement if in motion
    if (!this.moving) return;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, this.targetX, this.targetY);

    if (distance < 5) {
        console.log("Reached target position.");
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;

        if (this.view) {
            this.view.stopMoving();
        }
        return;
    }

    // Move smoothly towards target
    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.targetX, this.targetY);
    this.x += Math.cos(angle) * this.speed * (deltaTime / 1000);
    this.y += Math.sin(angle) * this.speed * (deltaTime / 1000);

    if (this.view) {
        this.view.updatePosition(); // Ensure view syncs with model
    }
}

  takeDamage(amount) {
    this.health.takeDamage(amount);
  }

  canAttack(target, currentTime) {
    if (currentTime - this.lastAttackTime < this.attackCooldown) return false;
    console.log("target:", target.x, target.y)
    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    return distance <= this.attackRange;
  }

  attack(target, currentTime) {
    if (this.canAttack(target, currentTime)) {
      target.takeDamage(this.attackDamage);
      this.lastAttackTime = currentTime;
      let direction = target.x < this.view.sprite.x ? "left" : "right";
      this.view.playAttackAnimation(direction);
    }
  }
}