import HealthModel from "./healthModel.js";

export default class EnemyModel {
  constructor(x, y, speed = 80) {
    this.initialX = x;  // Store original position
    this.initialY = y;
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
    this.isDead = false;
    this.soulsValue = 5;
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
      x: Phaser.Math.Between(this.initialX - 200, this.initialX + 200),
      y: Phaser.Math.Between(this.initialY - 200, this.initialY + 200),
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

  update(currentTime, deltaTime) {
    if (this.isDead) return
    if (!this.player) return;

    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

    // Check if player is in range to attack
    if (distanceToPlayer <= this.attackRange) {
        this.moving = false;

        // Attack if cooldown allows
        if (this.canAttack(this.player, currentTime)) {
            this.attack(this.player, currentTime);
        }

        return; // Stop moving if within attack range
    }

    // If out of attack range but still within aggro, move toward player
    if (this.isPlayerInAggroRange()) {
        this.moveTo(this.player.x, this.player.y);
    } else if (!this.moving) {
        const newPos = this.getRandomPosition();
        this.moveTo(newPos.x, newPos.y);
    }

    // Handle movement if in motion
    if (!this.moving) return;

    const distance = Phaser.Math.Distance.Between(this.x, this.y, this.targetX, this.targetY);

    if (distance < 5) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;

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

  takeDamage(player) {
    this.health.takeDamage(player.attackDamage);

    if (this.health.currentHealth <= 0)
      this.die();
  }

  die() {
    this.moving = false;
    this.isDead = true;
    this.view.scene.events.emit("enemy_killed", "orc");

    if (this.view) {
        this.view.playDeathAnimation();
        this.view.hide(); // Hide enemy
        this.health.view.hide()
    }

    setTimeout(() => {
        this.respawn();
    }, 5000); // 5-second respawn
  }

  respawn() {
    this.isDead = false;

    this.health.currentHealth = this.health.maxHealth; // Reset health
    this.x = this.initialX; // Move back to original spawn
    this.y = this.initialY;

    if (this.view) {
        this.view.show();
        this.health.view.show()
        this.view.updatePosition();
    }

    this.moving = false;
  }

  canAttack(target, currentTime) {
    if (currentTime - this.lastAttackTime < this.attackCooldown) return false;
    const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    return distance <= this.attackRange;
  }

  attack(target, currentTime) {
    if (this.canAttack(target, currentTime)) {
      target.takeDamage(this.attackDamage);
      this.lastAttackTime = currentTime;
      let direction = target.x < this.view.x ? "left" : "right";
      this.view.playAttackAnimation(direction);
    }
  }
}